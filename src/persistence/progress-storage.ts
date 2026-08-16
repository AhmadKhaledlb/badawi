import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createInitialProgressState,
  isValidProgressState,
  type ProgressState,
} from '@/state/progress-types';

export const PROGRESS_STORAGE_KEY = 'badawi.progress.v1';

// Loads persisted progress. Falls back to a fresh initial state — never
// throws — if nothing is stored yet, storage itself fails, the stored
// value isn't valid JSON, or it doesn't match the current schema version.
// Corrupted local data must not crash the app (docs/architecture/README.md,
// "Failure Handling"; docs/architecture/README.md, "Offline-First
// Architecture").
export async function loadProgress(): Promise<ProgressState> {
  let raw: string | null;
  try {
    raw = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
  } catch (error) {
    console.warn('BADAWI: failed to read persisted progress', error);
    return createInitialProgressState();
  }

  if (raw === null) {
    return createInitialProgressState();
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.warn('BADAWI: persisted progress was not valid JSON', error);
    return createInitialProgressState();
  }

  // No prior schema versions exist yet, so there is nothing to migrate —
  // an unrecognized version (or any other shape mismatch) simply falls
  // back to a fresh state rather than guessing at a migration.
  if (!isValidProgressState(parsed)) {
    console.warn('BADAWI: persisted progress failed shape/version validation');
    return createInitialProgressState();
  }

  return parsed;
}

export async function saveProgress(state: ProgressState): Promise<void> {
  await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
}
