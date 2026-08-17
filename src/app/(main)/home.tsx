import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Plate } from '@/components/plate';
import { Screen } from '@/components/screen';
import { Eyebrow, ScreenHeading } from '@/components/section-heading';
import { TerritoryCanvas } from '@/components/territory-canvas';
import { TextLink } from '@/components/text-link';
import { arabianPeninsulaRegion } from '@/content';
import { BadawiMark } from '@/design/brand/badawi-mark';
import { HairlineRule } from '@/design/illustration/notebook';
import { colors, contentEnter, fadeEnter, radii, spacing, typography } from '@/design/tokens';
import { useLayout } from '@/design/use-layout';

// ── THE BLUEPRINT MAP ────────────────────────────────────────────────────
//
// Home is a survey sheet you choose a destination from, not a menu
// (docs/design/README.md, "Navigation Model"). The spatial composition lives
// in src/components/territory-canvas.tsx; this screen supplies the real
// content and the map's furniture — title block and legend.
//
// PRODUCT SEMANTICS UNCHANGED: Arabian Peninsula is the single active V1
// territory and comes from src/content/region.ts. Other territory stays
// visibly unsurveyed and UNNAMED — inventing a specific future region name to
// make the map look fuller would be inventing product scope. Nothing here
// gates, scores, or ranks anything.
export default function HomeScreen() {
  const layout = useLayout();

  return (
    <Screen measure="canvas" atmosphere="survey" backdropHeight={280}>
      <Animated.View entering={contentEnter} style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.identity}>
            <BadawiMark size={26} compact />
            <ScreenHeading>Blueprint Map</ScreenHeading>
          </View>
          <TextLink label="Profile" onPress={() => router.push('/profile')} />
        </View>
        <HairlineRule />
        <View style={styles.introRow}>
          <Eyebrow>Territory survey</Eyebrow>
          <Text style={styles.intro}>Choose where to begin.</Text>
        </View>
      </Animated.View>

      <View style={layout.isMedium ? styles.wideRow : undefined}>
        <Animated.View entering={fadeEnter} style={layout.isMedium ? styles.canvasWide : undefined}>
          <TerritoryCanvas
            activeName={arabianPeninsulaRegion.name}
            activeState="Active"
            unsurveyedLabel="Coming soon"
            onPressActive={() =>
              router.push({
                pathname: '/explore/region/[regionId]',
                params: { regionId: arabianPeninsulaRegion.id },
              })
            }
          />
        </Animated.View>

        <Animated.View entering={fadeEnter} style={layout.isMedium ? styles.legendWide : undefined}>
          <Plate variant="paper" style={styles.legend}>
            <Eyebrow>Legend</Eyebrow>
            <LegendRow
              marker={<View style={styles.legendActive} />}
              title="Active territory"
              note="Surveyed and open to explore."
            />
            <HairlineRule weight="faint" />
            <LegendRow
              marker={<View style={styles.legendGhost} />}
              title="Unsurveyed"
              note="Not part of this version. No content exists for it yet."
            />
          </Plate>
        </Animated.View>
      </View>
    </Screen>
  );
}

function LegendRow({
  marker,
  title,
  note,
}: {
  marker: React.ReactNode;
  title: string;
  note: string;
}) {
  return (
    <View style={styles.legendRow}>
      <View style={styles.legendMarker}>{marker}</View>
      <View style={styles.legendText}>
        <Text style={styles.legendTitle}>{title}</Text>
        <Text style={styles.legendNote}>{note}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flexShrink: 1,
  },
  introRow: {
    gap: spacing.xs,
  },
  intro: {
    ...typography.body,
    color: colors.textSecondary,
  },
  // On tablet/desktop the map and its legend sit side by side, so a wide
  // viewport gets a composed sheet rather than a stretched phone column.
  wideRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    alignItems: 'flex-start',
  },
  canvasWide: {
    flex: 1.7,
  },
  legendWide: {
    flex: 1,
  },
  legend: {
    gap: spacing.md,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  legendMarker: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendActive: {
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  legendGhost: {
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.textSecondary,
    opacity: 0.5,
  },
  legendText: {
    flex: 1,
    gap: 2,
  },
  legendTitle: {
    ...typography.bodyEmphasis,
    color: colors.textPrimary,
  },
  legendNote: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
