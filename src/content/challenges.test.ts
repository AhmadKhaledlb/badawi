import { challenges, findChallengesForUnit } from './challenges';
import { units } from './units';

// Spot-checks of the most consequential locked mappings from
// docs/curriculum/v1-curriculum-spec.md §8, so a future edit to the
// dataset that silently drifts from the spec fails a test rather than
// only being caught by manual review.
describe('V1 challenge dataset — locked mapping fidelity', () => {
  it('lists all 28 working titles in spec order (spec §8 / Master §2K.4 audit list)', () => {
    const expectedTitles = [
      'First Read',
      'Not All Desert Is the Same',
      'Read the Invisible',
      'The Desert Is Alive',
      'Read Before You Move',
      'Follow the Shade',
      'Read the Conditions',
      'Where Water Moves',
      'Water Shapes Life',
      "Go / Change / Don't Go",
      'Start With the Mission',
      'Build the Plan',
      'Pack for a Reason',
      'The Final Check',
      'Find Your Bearings',
      'Build a Mental Map',
      'Map ↔ World',
      'More Than One Way North',
      'Stay Oriented',
      'Feel the Difference',
      'Choose Your Line',
      'Pace the Desert',
      'Change of Plan',
      'Move Without a Trace',
      'Read the Situation',
      'Make the Plan',
      'The Field Challenge',
      'Read It Again',
    ];

    expect(challenges.map((challenge) => challenge.name)).toEqual(expectedTitles);
  });

  it('has no prerequisites for Challenge 1 (the Pack entry point)', () => {
    expect(challenges[0].name).toBe('First Read');
    expect(challenges[0].prerequisiteChallengeIds).toEqual([]);
  });

  it('marks Challenge 27 (The Field Challenge) as the only explicit SG2 Enhanced Field Gate', () => {
    const gatedChallenges = challenges.filter((challenge) => challenge.safetyGateClass !== undefined);

    expect(gatedChallenges).toHaveLength(1);
    expect(gatedChallenges[0].name).toBe('The Field Challenge');
    expect(gatedChallenges[0].safetyGateClass).toBe('SG2');
  });

  it('makes FC4 (Safety, Limits & Stewardship) the only safety-critical dimension in the Challenge 27 special rubric', () => {
    const fieldChallenge = challenges.find((challenge) => challenge.name === 'The Field Challenge');

    const safetyCriticalDimensions = fieldChallenge?.specialRubric?.filter(
      (dimension) => dimension.safetyCritical
    );

    expect(fieldChallenge?.specialRubric).toHaveLength(5);
    expect(safetyCriticalDimensions).toHaveLength(1);
    expect(safetyCriticalDimensions?.[0].id).toBe('FC4');
  });

  it('gives Challenge 28 (Read It Again) a 5-dimension special rubric with no safety-critical dimension', () => {
    const finalReflection = challenges.find((challenge) => challenge.name === 'Read It Again');

    expect(finalReflection?.specialRubric).toHaveLength(5);
    expect(finalReflection?.specialRubric?.every((dimension) => !dimension.safetyCritical)).toBe(true);
  });

  it('has every challenge at research status RQ0 (Research Matrix workstream has not yet run)', () => {
    expect(challenges.every((challenge) => challenge.researchStatus === 'RQ0')).toBe(true);
  });

  it("gives every challenge's competency mapping at least one primary competency and one demonstration type", () => {
    for (const challenge of challenges) {
      expect(challenge.competency.primary.length).toBeGreaterThan(0);
      expect(challenge.competency.demonstrationTypes.length).toBeGreaterThan(0);
    }
  });

  it("finds each unit's challenges via findChallengesForUnit matching its own challenge count", () => {
    const expectedCounts = [5, 5, 4, 5, 5, 4];
    const sortedUnits = [...units].sort((a, b) => a.order - b.order);

    sortedUnits.forEach((unit, index) => {
      expect(findChallengesForUnit(unit.id)).toHaveLength(expectedCounts[index]);
    });
  });

  // spec §8 states these five Challenges' prerequisites at the Unit level
  // ("Prereq: Unit 1" / "Units 1–3" / etc.), not as an enumerated list of
  // every individual Challenge inside that Unit. Flattening "Units 1–3"
  // into 14 individual prerequisiteChallengeIds would assert a stronger,
  // uninvented claim — that every one of those 14 must individually be
  // complete — which the spec does not establish (spec §16). These
  // Challenges must carry the dependency via prerequisiteUnitIds instead.
  it('models Unit-level prerequisites via prerequisiteUnitIds, not a flattened per-Challenge list', () => {
    const sortedUnits = [...units].sort((a, b) => a.order - b.order);
    const unitIdFor = (order: number) => sortedUnits[order - 1].id;

    const cases: { name: string; expectedUnitOrders: number[]; expectedAtomicChallengeIds: string[] }[] = [
      { name: 'Follow the Shade', expectedUnitOrders: [1], expectedAtomicChallengeIds: [] },
      {
        name: 'Where Water Moves',
        expectedUnitOrders: [1],
        expectedAtomicChallengeIds: ['desert-foundations-challenge-6', 'desert-foundations-challenge-7'],
      },
      { name: 'Find Your Bearings', expectedUnitOrders: [1, 2, 3], expectedAtomicChallengeIds: [] },
      { name: 'Feel the Difference', expectedUnitOrders: [1, 2, 3, 4], expectedAtomicChallengeIds: [] },
      { name: 'Read the Situation', expectedUnitOrders: [1, 2, 3, 4, 5], expectedAtomicChallengeIds: [] },
    ];

    for (const testCase of cases) {
      const challenge = challenges.find((c) => c.name === testCase.name);

      expect(challenge?.prerequisiteUnitIds).toEqual(testCase.expectedUnitOrders.map(unitIdFor));
      expect(challenge?.prerequisiteChallengeIds).toEqual(testCase.expectedAtomicChallengeIds);
    }
  });

  it('never claims a Unit-level prerequisite by individually listing every Challenge inside that Unit', () => {
    for (const challenge of challenges) {
      if (!challenge.prerequisiteUnitIds || challenge.prerequisiteUnitIds.length === 0) continue;

      for (const prerequisiteUnitId of challenge.prerequisiteUnitIds) {
        const challengesInThatUnit = challenges.filter((c) => c.unitId === prerequisiteUnitId);
        const allIndividuallyListed = challengesInThatUnit.every((c) =>
          challenge.prerequisiteChallengeIds.includes(c.id)
        );

        expect(allIndividuallyListed).toBe(false);
      }
    }
  });
});
