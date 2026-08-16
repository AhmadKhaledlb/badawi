import { CLAIM_CLASSES } from '@/domain/claim-class';
import { CONTENT_PRODUCTION_STAGES } from '@/domain/content-production-stage';
import { REVIEW_CATEGORIES } from '@/domain/review-category';

import { challenges, V1_CHALLENGE_COUNT } from './challenges';
import { findResearchMatrixEntry, RESEARCH_MATRIX } from './research-matrix';

describe('Research Matrix', () => {
  it('represents all 28 canonical Challenges, one entry each', () => {
    expect(RESEARCH_MATRIX).toHaveLength(V1_CHALLENGE_COUNT);
    expect(new Set(RESEARCH_MATRIX.map((entry) => entry.challengeId)).size).toBe(V1_CHALLENGE_COUNT);
  });

  it('only references real Challenge ids', () => {
    const realIds = new Set(challenges.map((challenge) => challenge.id));

    for (const entry of RESEARCH_MATRIX) {
      expect(realIds.has(entry.challengeId)).toBe(true);
    }
  });

  it('gives every Challenge a findable matrix entry, and no others', () => {
    for (const challenge of challenges) {
      expect(findResearchMatrixEntry(challenge.id)?.challengeId).toBe(challenge.id);
    }
    expect(findResearchMatrixEntry('not-a-real-challenge')).toBeUndefined();
  });

  it('only uses valid statuses, claim classes, review categories, and priority tiers', () => {
    for (const entry of RESEARCH_MATRIX) {
      expect(Object.keys(CONTENT_PRODUCTION_STAGES)).toContain(entry.productionStage);
      expect(['safety-critical', 'traditional-local-knowledge', 'challenge-mechanics']).toContain(
        entry.priorityTier
      );

      for (const claimClass of entry.claimClasses) {
        expect(Object.keys(CLAIM_CLASSES)).toContain(claimClass);
      }
      for (const category of entry.requiredReviewCategories) {
        expect(Object.keys(REVIEW_CATEGORIES)).toContain(category);
      }
    }
  });

  it('every entry starts as Research Needed, matching every Challenge being RQ0', () => {
    for (const entry of RESEARCH_MATRIX) {
      expect(entry.currentResearchStatus).toBe('RQ0');
      expect(entry.productionStage).toBe('research-needed');
    }
  });

  it('flags Challenge 27 (the SG2 Field Challenge) as safety-critical, top priority tier, Master-stated Critical', () => {
    const entry = findResearchMatrixEntry('desert-foundations-challenge-27');

    expect(entry?.safetyCritical).toBe(true);
    expect(entry?.priorityTier).toBe('safety-critical');
    expect(entry?.claimClasses).toContain('CC3');
    expect(entry?.explicitResearchMatrixPriority).toBe('Critical');
  });

  it("flags Challenge 8 (the flash-flood/wadi hard gate) as safety-critical even without an explicit Safety Gate Class, Master-stated Critical", () => {
    const challenge8 = challenges.find((c) => c.id === 'desert-foundations-challenge-8');
    expect(challenge8?.safetyGateClass).toBeUndefined();

    const entry = findResearchMatrixEntry('desert-foundations-challenge-8');
    expect(entry?.safetyCritical).toBe(true);
    expect(entry?.priorityTier).toBe('safety-critical');
    expect(entry?.explicitResearchMatrixPriority).toBe('Critical');
  });

  it('flags Challenge 7 (heat-physiology assessment) as safety-critical and CC2, Master-stated Critical', () => {
    const challenge7 = challenges.find((c) => c.id === 'desert-foundations-challenge-7');
    expect(challenge7?.competency.primary).not.toContain('C5');
    expect(challenge7?.safetyGateClass).toBeUndefined();

    const entry = findResearchMatrixEntry('desert-foundations-challenge-7');
    expect(entry?.safetyCritical).toBe(true);
    expect(entry?.priorityTier).toBe('safety-critical');
    expect(entry?.claimClasses).toEqual(expect.arrayContaining(['CC2', 'CC3']));
    // Two distinct axes: §8's inline note says "HIGH"; §11.10's dedicated
    // Research Matrix entry says "Critical" — both preserved, not merged.
    expect(entry?.explicitSourceRequirementLevel).toBe('HIGH');
    expect(entry?.explicitResearchMatrixPriority).toBe('Critical');
  });

  it('flags Challenge 22 (pacing/exertion) as safety-critical and CC2, Master-stated Critical', () => {
    const challenge22 = challenges.find((c) => c.id === 'desert-foundations-challenge-22');
    expect(challenge22?.competency.primary).not.toContain('C5');

    const entry = findResearchMatrixEntry('desert-foundations-challenge-22');
    expect(entry?.safetyCritical).toBe(true);
    expect(entry?.priorityTier).toBe('safety-critical');
    expect(entry?.claimClasses).toContain('CC2');
    // Challenge 22's own §8 note has no leading level word ("Any health/exertion...").
    expect(entry?.explicitSourceRequirementLevel).toBeUndefined();
    expect(entry?.explicitResearchMatrixPriority).toBe('Critical');
  });

  it('does NOT let a bare Medium/High Research Matrix value put Challenge 3 or Challenge 6 into the safety-critical category on its own', () => {
    const challenge3 = challenges.find((c) => c.id === 'desert-foundations-challenge-3');
    const challenge6 = challenges.find((c) => c.id === 'desert-foundations-challenge-6');
    expect(challenge3?.competency.primary).not.toContain('C5');
    expect(challenge6?.competency.primary).not.toContain('C5');

    const ch3 = findResearchMatrixEntry('desert-foundations-challenge-3');
    const ch6 = findResearchMatrixEntry('desert-foundations-challenge-6');

    // The explicit Master value is still preserved exactly...
    expect(ch3?.explicitResearchMatrixPriority).toBe('Medium');
    expect(ch6?.explicitResearchMatrixPriority).toBe('High');
    // ...but neither Challenge has any OTHER locked signal that says
    // "safety", so the broad category stays challenge-mechanics.
    expect(ch3?.safetyCritical).toBe(false);
    expect(ch3?.priorityTier).toBe('challenge-mechanics');
    expect(ch6?.safetyCritical).toBe(false);
    expect(ch6?.priorityTier).toBe('challenge-mechanics');
  });

  it('preserves the explicit High navigation priority for each of Challenges 15–19 individually, without letting it alone move any of them into safety-critical', () => {
    for (const n of [15, 16, 17, 19]) {
      const entry = findResearchMatrixEntry(`desert-foundations-challenge-${n}`);
      expect(entry?.explicitResearchMatrixPriority).toBe('High');
      expect(entry?.safetyCritical).toBe(false);
      expect(entry?.priorityTier).toBe('challenge-mechanics');
    }

    // Challenge 18 is the exception, and NOT because of its "High" value —
    // it independently carries RI4 (Local/Traditional Knowledge Connection),
    // which keeps it in the traditional-knowledge tier. See the dedicated
    // Challenge 18 test below.
    const ch18 = findResearchMatrixEntry('desert-foundations-challenge-18');
    expect(ch18?.explicitResearchMatrixPriority).toBe('High');
  });

  it('only the 12 Master-named Challenges get an explicit Research Matrix priority; every other Challenge stays unset', () => {
    const named = new Set([3, 6, 7, 8, 9, 15, 16, 17, 18, 19, 22, 27].map((n) => `desert-foundations-challenge-${n}`));

    for (const entry of RESEARCH_MATRIX) {
      if (named.has(entry.challengeId)) {
        expect(entry.explicitResearchMatrixPriority).toBeDefined();
      } else {
        expect(entry.explicitResearchMatrixPriority).toBeUndefined();
      }
    }
  });

  it('only assigns CC2 to Challenges 7 and 22, never broadly (e.g. not Challenge 13, which only mentions "medical" equipment scope)', () => {
    const cc2Entries = RESEARCH_MATRIX.filter((entry) => entry.claimClasses.includes('CC2')).map(
      (entry) => entry.challengeId
    );

    expect(cc2Entries.sort()).toEqual(
      ['desert-foundations-challenge-7', 'desert-foundations-challenge-22'].sort()
    );
  });

  it("extracts each Challenge's own explicit leading source-requirement level verbatim, never inventing Critical/Medium", () => {
    expect(findResearchMatrixEntry('desert-foundations-challenge-1')?.explicitSourceRequirementLevel).toBe(
      'Minimal'
    );
    expect(findResearchMatrixEntry('desert-foundations-challenge-11')?.explicitSourceRequirementLevel).toBe(
      'Low–moderate'
    );
    expect(findResearchMatrixEntry('desert-foundations-challenge-20')?.explicitSourceRequirementLevel).toBe(
      'Low'
    );
    expect(findResearchMatrixEntry('desert-foundations-challenge-9')?.explicitSourceRequirementLevel).toBe(
      'HIGH'
    );
    expect(findResearchMatrixEntry('desert-foundations-challenge-27')?.explicitSourceRequirementLevel).toBe(
      'HIGH'
    );

    for (const entry of RESEARCH_MATRIX) {
      if (entry.explicitSourceRequirementLevel !== undefined) {
        expect(entry.explicitSourceRequirementLevel).not.toMatch(/critical|medium/i);
      }
    }
  });

  it('keeps Challenge 9 (oasis/local water) in the traditional-knowledge tier via its Master-stated "High cultural" value — distinct from plain "High"', () => {
    const ch9 = findResearchMatrixEntry('desert-foundations-challenge-9');

    expect(ch9?.explicitResearchMatrixPriority).toBe('High cultural');
    expect(ch9?.priorityTier).toBe('traditional-local-knowledge');
    expect(ch9?.safetyCritical).toBe(false);
    expect(ch9?.traditionalKnowledgeReviewNeeded).toBe(true);
  });

  it('keeps Challenge 18 in the traditional-knowledge tier via its own RI4 tag — its plain "High" Research Matrix value does not move it to safety-critical', () => {
    const ch18 = findResearchMatrixEntry('desert-foundations-challenge-18');

    expect(ch18?.explicitResearchMatrixPriority).toBe('High');
    expect(ch18?.priorityTier).toBe('traditional-local-knowledge');
    expect(ch18?.safetyCritical).toBe(false);
    expect(ch18?.traditionalKnowledgeReviewNeeded).toBe(true);
  });

  it('never conflates "High cultural" with plain "High" as strings', () => {
    const ch9 = findResearchMatrixEntry('desert-foundations-challenge-9');
    const ch6 = findResearchMatrixEntry('desert-foundations-challenge-6');

    expect(ch9?.explicitResearchMatrixPriority).not.toBe(ch6?.explicitResearchMatrixPriority);
    expect(ch9?.explicitResearchMatrixPriority).toBe('High cultural');
    expect(ch6?.explicitResearchMatrixPriority).toBe('High');
  });

  it('flags the two Challenges tagged RI4 (Local/Traditional Knowledge Connection) for traditional-knowledge review', () => {
    const flagged = RESEARCH_MATRIX.filter((entry) => entry.traditionalKnowledgeReviewNeeded).map(
      (entry) => entry.challengeId
    );

    expect(flagged.sort()).toEqual(
      ['desert-foundations-challenge-9', 'desert-foundations-challenge-18'].sort()
    );
    for (const id of flagged) {
      expect(findResearchMatrixEntry(id)?.requiredReviewCategories).toContain('traditional-local-attribution');
    }
  });

  it('never assigns the two priority tiers this file has no per-Challenge basis to distinguish', () => {
    const tiers = new Set(RESEARCH_MATRIX.map((entry) => entry.priorityTier));

    expect(tiers.has('supporting-regional-context' as never)).toBe(false);
    expect(tiers.has('optional-explore-more' as never)).toBe(false);
  });

  it('requires baseline claim/source/regional/safety/expert review categories for every Challenge', () => {
    for (const entry of RESEARCH_MATRIX) {
      expect(entry.requiredReviewCategories).toEqual(
        expect.arrayContaining([
          'claim-verification',
          'source-traceability',
          'regional-scope-validation',
          'safety-verification',
          'required-expert-review',
        ])
      );
    }
  });
});
