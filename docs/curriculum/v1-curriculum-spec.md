# BADAWI V1 Curriculum — Implementation Reference

**Status:** Derived implementation reference — NOT the archival authority.
**Source:** `docs/curriculum/phase-2-master-specification.md` ("the Master") remains the canonical, archival, locked record of Phase 2. Where this document and the Master conflict, the Master governs. This file exists so engineers do not have to reread the ~31,000-word Master for routine implementation; it extracts and compacts only what is needed to build V1 correctly. It adds nothing, redesigns nothing, and resolves no ambiguity the Master leaves open.

Terminology and IDs below are reproduced exactly as used in the Master (C1–C6, L1–L4, RK1–7, EVM1–5, etc.). Do not rename or renumber them.

---

## 0. How to Use This Document

- Sections 1–5 define the coded taxonomies (competency, evidence, region knowledge). These IDs are referenced throughout every Challenge spec — look them up here rather than re-deriving meaning from context.
- Section 6 gives the 6 Units. Section 8 gives all 28 Challenges. Together these are the curriculum's implementation core.
- Sections 9–12 give the systems (assessment, safety, research/verification, traditional-knowledge governance) that every Challenge's metadata plugs into.
- Sections 13–15 mark scope boundaries and outstanding work — read these before assuming a gap is a bug.
- Section 16 lists points where the Master itself is internally ambiguous or leaves something unresolved. Do not silently pick a resolution — escalate per `CLAUDE.md`.

---

## 1. Canonical Hierarchy & V1 Scope — LOCKED

Hierarchy: **Region → Environment → Pack → Unit → Challenge**

V1 scope: **Arabian Peninsula → Desert → one foundational V1 Desert Pack → 6 Units → 28 Challenges**

V1 learning arc: **READ → UNDERSTAND → PREPARE → ORIENT → MOVE → INTEGRATE**

Universal competency loop: **OBSERVE → REASON → ACT → ADAPT → REFLECT**, with **SAFETY surrounding the entire process**.

Safety loop: **CHECK → MONITOR → REASSESS → STOP → ESCALATE**

Geographic scope (Arabian Peninsula, for V1): Saudi Arabia, Yemen, Oman, UAE, Qatar, Bahrain, Kuwait. Arabian Peninsula ≠ GCC (GCC excludes Yemen). Political borders are used for learner orientation only, never as boundaries of environments, ecosystems, or traditional knowledge.

Definitions:
- **Region** — broad geographic/cultural context.
- **Environment** — environmental category.
- **Pack** — a structured BADAWI learning experience within a Region + Environment.
- **Unit** — major curriculum section within the Pack.
- **Challenge** — individual learning/action experience.

"Desert Pack" is a working curriculum label, not required final UI naming. The Pack should not simply repeat the Environment name in learner-facing UI.

---

## 2. Competency Framework — LOCKED

### 2.1 Definition of competency
BADAWI competency = "the demonstrated ability to observe an environment, interpret relevant conditions, make appropriate decisions, perform safe practical actions, and reflect on and adapt those actions based on the outcome." Sequence: Observe → Understand/Reason → Decide → Act → Adapt → Reflect. **Completion does not equal competency.** A BADAWI competency claim is not a professional qualification.

### 2.2 Six competency domains (C1–C6)

| ID | Domain | Core question |
|---|---|---|
| C1 | Environmental Observation & Awareness | Can the learner notice what matters? |
| C2 | Environmental Reasoning & Decision-Making | Can the learner interpret what they observe and make sensible decisions? |
| C3 | Practical Field Capability | Can the learner actually do things appropriately? |
| C4 | Adaptation & Problem-Solving | Can the learner respond when circumstances change or the first approach doesn't work? |
| C5 | Safety & Risk Management | Can the learner recognize limits and behave responsibly? |
| C6 | Reflection & Transfer | Can the learner understand what they learned and carry it forward? |

A strong Challenge rarely tests only one competency; it typically has a primary competency plus supporting secondaries.

### 2.3 Four competency levels (L1–L4)

| ID | Level | Learner statement | Characteristic |
|---|---|---|---|
| L1 | Aware | I can recognize it. | Recognition with guidance. |
| L2 | Capable | I can apply it. | Application with structure. |
| L3 | Independent | I can assess, decide, and act. | Independent judgment/execution with limited procedural guidance. |
| L4 | Adaptive | I can adjust and transfer it. | Adaptation/transfer under changing conditions. |

**No "Expert" level exists — this is a permanent ceiling.** Levels attach to competencies per-domain, not globally to a learner (a learner may be L3 in C1 and L1 in a newly introduced skill).

### 2.4 Demonstration types (K/A/P)

| ID | Type | Meaning |
|---|---|---|
| K | Knowledge | I understand. |
| A | Application | I can use what I know. |
| P | Performance | I can perform the relevant action. |

A Challenge may test K, A, P, K+A, A+P, or K+A+P. Not every competency requires physical performance — Safety may be demonstrated by correctly deciding not to act.

### 2.5 Mandatory Challenge curriculum mapping (2A.6)
Every V1 Challenge must internally specify: Primary Competency (C1–C6), Secondary Competencies where applicable, Target Level (L1–L4), Demonstration Type (K/A/P), Evidence Method (EVM1–5), Required Evidence Strength (E1–E3), Verification Mode (V1–V3). This metadata is internal — learners see the Challenge, not the taxonomy.

### 2.6 Ten permanent competency rules (2A.6)
1. BADAWI assesses applied competence, not content consumption.
2. Challenge completion alone does not automatically establish competency.
3. Competency claims must match the strength of available evidence.
4. Higher competency levels generally require stronger and more contextual evidence.
5. Evidence should only be requested when it serves a meaningful learning/assessment purpose.
6. Not every competency requires physical performance.
7. Choosing not to act can demonstrate competence when action would be inappropriate/unsafe.
8. Safety overrides Challenge completion, evidence collection, and progression.
9. An unsuccessful practical attempt may still demonstrate reasoning, observation, adaptation, safety, or reflection.
10. BADAWI competency levels represent progression within BADAWI's system, not professional certification.

---

## 3. Evidence & Verification — LOCKED

### 3.1 Five Evidence Methods (EVM1–5)

| ID | Method | Primary evidence type |
|---|---|---|
| EVM1 | Knowledge Response (MC, ordering, matching, ID, scenario choice, short response) | K |
| EVM2 | Observation Record (structured fields, notes, photos, environmental context) | K+A |
| EVM3 | Decision & Reasoning Record (decision + why) | A |
| EVM4 | Performance Evidence (photos/video/before-after/measured results/produced outputs) | P (often w/ supporting A) |
| EVM5 | Reflection Record (what happened / what worked / what would change) | C6 evidence |

### 3.2 Three Evidence Strengths (E1–E3)

| ID | Strength | Typically appropriate for |
|---|---|---|
| E1 | Indicative (quiz response, ID, self-report, simple reflection) | L1-type evidence |
| E2 | Applied (observation, scenario judgment, decision+reasoning, documented application) | many L2 outcomes |
| E3 | Demonstrated (documented field activity, observable output, measurable result, performance+reasoning) | L3/L4 claims |

**Permanent rule: evidence strength must never exceed what the submitted evidence can reasonably demonstrate.**

Guidance (not a rigid formula): L1 Aware → primarily E1. L2 Capable → E1+E2. L3 Independent → E2+E3. L4 Adaptive → E3 + adaptation/reflection evidence.

### 3.3 Three Verification Modes (V1–V3)

| ID | Mode | Meaning |
|---|---|---|
| V1 | Self-Recorded | Learner records/confirms own experience. |
| V2 | Evidence-Supported | Learner provides an artifact (photo, video, measurement, written reasoning, output, observation record). |
| V3 | System-Assessed | BADAWI evaluates a response/evidence through an assessment mechanism. |

AI may assist V3 later but must never be treated as an infallible verifier of real-world competency ("AI found evidence consistent with X" ≠ "BADAWI verified you safely and correctly performed X").

### 3.4 Seven governing evidence rules (2A.5)
1. Evidence strength cannot exceed what the evidence reasonably demonstrates.
2. Stronger competency claims require stronger evidence.
3. Challenges should combine evidence methods only where it meaningfully improves assessment.
4. Not every Challenge requires photographic/video evidence.
5. Evidence should never be collected without a curriculum/assessment purpose.
6. Safety always overrides evidence collection and Challenge completion.
7. An unsuccessful practical attempt can still demonstrate some competencies — assess what was actually demonstrated.

**Safety overrides evidence (2A.5):** never take additional risk to capture evidence; no filming while full attention is needed; no holding phones on hazardous terrain; no staying in unsafe locations to finish recordings; no recreating a missed hazard; no continuing an unsafe activity to preserve Challenge completion. Evidence may be captured after a safe portion of the activity.

---

## 4. Region Knowledge Structures — LOCKED

Needed to interpret each Challenge's RK mapping field.

### 4.1 Seven Region Knowledge Domains (RK1–7)

| ID | Domain | Core question |
|---|---|---|
| RK1 | Physical Geography & Landscapes | Where am I? |
| RK2 | Climate, Weather & Seasonal Patterns | What forces shape this place? |
| RK3 | Water & Natural Resources | How are essential resources distributed? |
| RK4 | Ecology, Flora & Fauna | What lives here and why? |
| RK5 | Human Adaptation & Ways of Life | How have people lived with these environments? |
| RK6 | Cultural Landscape, Heritage & Local Knowledge | What knowledge and meaning are connected to this place? |
| RK7 | Stewardship & Responsible Exploration | How should I interact with this place responsibly? |

Intellectual structure: LAND → CLIMATE → WATER → LIFE → PEOPLE → KNOWLEDGE → RESPONSIBILITY. These are internal knowledge domains, not learner-facing Units — human-adaptation/local knowledge and ecology are threaded through practical Units, never isolated into a standalone "culture" or "plants and animals" Unit.

### 4.2 Three Region Knowledge Depths (R1–R3)

| ID | Depth | Learner statement |
|---|---|---|
| R1 | Orientation | I know where I am and what kind of place this is. |
| R2 | Contextual Understanding | I understand why things here are the way they are. Pattern: Environment → Need → Adaptation. |
| R3 | Applied Regional Understanding | I can use regional context to interpret what I encounter. |

RK/R depth is distinct from C/L competency levels.

### 4.3 Five Region Knowledge Integration Modes (RI1–5)

| ID | Mode | Purpose |
|---|---|---|
| RI1 | Essential Context | Know this before acting. |
| RI2 | Observation Prompt | Now look for it. |
| RI3 | Contextual Reveal | Here is why what you just saw matters. |
| RI4 | Local/Traditional Knowledge Connection | Connect experience to documented place-based knowledge (subject to Section 12 governance). |
| RI5 | Regional/Environmental Comparison | This works here; what changes elsewhere? |

### 4.4 Concept Progression Status (I/R/E/A)
Every substantial concept tracked as **I**ntroduced → **R**einforced → **E**xtended → **A**pplied, maintained in an internal BADAWI Concept Registry. Repetition rule: **repeat to reinforce or transfer; never repeat merely to refill curriculum.**

### 4.5 Challenge Region Knowledge mapping fields (2B.5)
Where regional knowledge is present, a Challenge internally specifies: RK Domain(s) (RK1–7), Knowledge Depth (R1–R3), Integration Mode (RI1–5), Concept Status (I/R/E/A).

### 4.6 Governing content-inclusion rule
Regional knowledge belongs in V1 only if it materially improves environmental understanding, field reasoning, cultural understanding, responsible engagement, or practical decision-making. Prioritize explanatory/applicable knowledge over trivia. Avoid false universality — prefer "In parts of…", "Among certain communities…", "Historically documented among…" over blanket Arabian statements. **"Bedouin" must never be used as catch-all shorthand** for every traditional inhabitant/knowledge system of the Peninsula — use the specific community/location/period where evidence allows.

---

## 5. Eight Desert Learning Outcomes (DLO1–8) — LOCKED

V1 target competency ceiling (Pack-wide):

| Competency | V1 target |
|---|---|
| C1 Observation | L3 Independent |
| C2 Reasoning | L2 required; emerging L3 evidence expected |
| C3 Practical Field Capability | L2 Capable |
| C4 Adaptation | L2 Capable |
| C5 Safety | L3 Independent |
| C6 Reflection | L2 required; emerging L3 evidence expected |

| ID | Outcome | Primary competencies | Primary RK |
|---|---|---|---|
| DLO1 | Read the Desert Environment | C1+C2 | RK1+RK2 |
| DLO2 | Understand Desert Climate & Exposure | C1+C2+C5 | RK2 |
| DLO3 | Understand Water in the Desert Landscape | C1+C2+C5 | RK3+RK5+RK6 |
| DLO4 | Navigate & Maintain Environmental Orientation | C1+C2+C3+C5 | RK1+RK6 |
| DLO5 | Move, Prepare & Operate Safely in Desert Terrain | C2+C3+C5 | RK1+RK2 |
| DLO6 | Observe Desert Life | C1+C2+C5 | RK4+RK7 |
| DLO7 | Understand Human Desert Adaptation & Knowledge | C1+C2+C6 | RK5+RK6 |
| DLO8 | Explore Responsibly, Assess Risk & Reflect | C2+C4+C5+C6 | RK7 |

DLO8 is threaded throughout the Pack, not taught once at the end. Pack-level emphasis: **heavy** recurring emphasis on DLO1, DLO2, DLO8; **strong practical** emphasis on DLO4, DLO5; **strong contextual** emphasis on DLO3, DLO6, DLO7. Pack identity line: *"Learn to read the desert before trying to conquer it."*

Each DLO's numbered sub-outcomes (e.g. DLO1.1–DLO1.5) are defined in Master §2C if finer-grained detail is needed; not reproduced here as they are not referenced by individual Challenge specs at that granularity.

---

## 6. The Six V1 Units — LOCKED

Six-Unit journey: **SEE → UNDERSTAND → PREPARE → ORIENT → OPERATE/MOVE → INTEGRATE** (equivalent to the Pack arc READ → UNDERSTAND → PREPARE → ORIENT → MOVE → INTEGRATE).

| # | Working title | Challenges | Core question | Progression |
|---|---|---|---|---|
| 1 | Reading the Desert | 1–5 | What am I actually looking at? | Observe → Compare → Interpret → Expand → Prioritize |
| 2 | Heat, Weather & Water | 6–10 | What forces shape the desert, and what do they mean for me? | See §16.1 (Master gives two conflicting statements) |
| 3 | Preparing for the Field | 11–14 | What should I decide before entering the desert? | Define → Plan → Prepare → Verify |
| 4 | Orientation & Navigation | 15–19 | Where am I, where am I going, and how do I keep knowing? | Orient → Represent → Connect → Compare → Maintain |
| 5 | Moving With the Desert | 20–24 | How should the environment change the way I move and act? | Experience → Choose → Manage → Adapt → Respect |
| 6 | Desert Field Integration | 25–28 | Can I bring everything together? | Assess → Plan → Execute → Reflect |

Unit titles are **working curriculum names**, not locked learner-facing UI copy (Phase 3 may improve them without changing educational purpose — see Section 14).

### Unit 1 — Reading the Desert
- **Purpose:** establish desert literacy and the habit "observe before acting."
- **Transformation:** "I'm in a desert." → "This terrain differs from that terrain. I can identify several environmental signals, recognize some immediate implications, and determine which observations matter before I act."
- **Primary DLO:** DLO1 (supported by DLO6, DLO8). **Primary competencies:** C1, C2, C5, C6. **Expected level:** mostly L1→L2 with early L3 observation behavior.
- **Challenges:** 1–5.

### Unit 2 — Heat, Weather & Water
- **Purpose:** deepen reasoning about heat, exposure, wind, seasons, rain, wadis, water distribution, and traditional water management.
- **Transformation:** "It's hot and dry." → "Exposure changes with time, location, and conditions; weather and water shape the landscape, and I need to read those conditions before deciding."
- **Primary DLOs:** DLO2+DLO3 (supported DLO1, DLO8). **Primary competencies:** C1, C2, C5. **Expected level:** mainly L2; selected safety outcomes toward L3.
- **Challenges:** 6–10.

### Unit 3 — Preparing for the Field
- **Purpose:** planning as environmental reasoning before entering the environment (explicitly **not** a gear-shopping Unit).
- **Transformation:** "I'll pack some things and go." → "I should understand the environment, objective, route, timing, resources, communication, access, and my limits before leaving."
- **Primary DLOs:** DLO5+DLO8 (supported DLO2). **Primary competencies:** C2, C3, C5. **Expected level:** L2 with movement toward L3 safety judgment.
- **Challenges:** 11–14.

### Unit 4 — Orientation & Navigation
- **Purpose:** cardinal directions, landmarks, maps, compass, sun/celestial context, modern navigation, traditional/local navigation context, and knowing when uncertainty means stop.
- **Transformation:** "My phone tells me where I am." → "I maintain environmental and directional awareness, can use basic orientation tools, understand natural cues and their limitations, and recognize when uncertainty becomes unsafe."
- **Primary DLO:** DLO4 (supported DLO1, DLO5, DLO7, DLO8). **Primary competencies:** C1, C2, C3, C5. **Expected level:** mainly L2 with controlled L3 decision-making.
- **Challenges:** 15–19.

### Unit 5 — Moving With the Desert
- **Purpose:** combine earlier knowledge into terrain/movement, pacing, effort, exposure, route choice, rest, obstacles, ecology, adaptation; scaffolding lightens.
- **Transformation:** "I choose where I want to walk." → "I assess terrain, exposure, effort, conditions, and impact before deciding how—or whether—to move."
- **Primary DLOs:** DLO5+DLO1 (supported DLO2, DLO6, DLO8). **Primary competencies:** C1, C2, C3, C4, C5. **Expected level:** L2→L3 in observation, reasoning, safe decision-making.
- **Challenges:** 20–24.

### Unit 6 — Desert Field Integration
- **Purpose:** integration, not a new topic Unit — should introduce very little genuinely new knowledge.
- **Transformation:** "I've completed several desert Challenges." → "I can approach a controlled desert experience systematically: observe, assess, prepare, orient, move, adapt, act responsibly, and reflect."
- **Primary DLOs:** DLO1, DLO4, DLO5, DLO8 (contextual DLO2/3/6/7). **Competencies:** all C1–C6. **Target Pack ceiling:** C1 L3; C2 L3 where appropriate; C3 L2; C4 L2; C5 L3; C6 L2–L3.
- **Challenges:** 25–28.

### Unit-level architecture rules (2D)
- No artificial prerequisites: the Pack is sequential overall, but prerequisites should exist only where understanding X is genuinely needed to safely/meaningfully apply Y.
- Human adaptation/local knowledge and ecology are **threaded**, not isolated into dedicated Units.
- Safety has no single Unit — it is present in every Challenge's safety logic; U2/U3 concentrate more explicit instruction.
- Scaffolding reduces across the Pack (early: "look for these three things" → late: "determine what matters and proceed safely").
- Challenge count is curriculum-determined, not pre-fixed: final split is U1:5, U2:5, U3:4, U4:5, U5:5, U6:4 = 28 total.

---

## 7. Challenge Design Rules — LOCKED (2F permanent rules)

1. A Challenge's learning objective and its field setting are distinct. If a learning objective can be achieved safely without a hazardous setting, use the safer setting.
2. BADAWI distinguishes teaching a technique from teaching dependence on a technique — learners should understand what a tool/method can and cannot tell them.
3. Successful learning does not always require physical completion — stopping, changing, postponing, or refusing can demonstrate judgment, adaptation, or safety.
4. Challenge difficulty increases through independence and integration, **not** through danger.

---

## 8. All 28 Challenges — LOCKED

Each entry preserves: number, working title, Unit, purpose/objective, prerequisites, competency mapping, demonstration/evidence/verification, RK mapping, and safety/assessment notes as specified in the Master. Fields the Master does not specify for a given Challenge are omitted rather than invented.

### Unit 1 — Reading the Desert (Challenges 1–5)

**Challenge 1 — First Read**
- Purpose: introduce "observe before interpreting or acting."
- Objective: slow down, read surroundings, record direct observations without explaining yet.
- Prereq: BADAWI onboarding/safety acknowledgment; safe outdoor environment; no Challenge prerequisite.
- Est: 15–25 min. Environments: accessible desert rec area / controlled camp / safe natural open landscape / outdoor ed location / desert-edge; **not** roadside, active vehicle route, extreme weather, restricted property, or remote location entered solely for the Challenge.
- Mapping: Primary C1; Secondary C5, C6; Target L1→L2; Demo A.
- DLO1 (supporting DLO8); RK1/R1; Integration RI2; Concepts: Desert Diversity—I, Observation vs Interpretation—I.
- Evidence: EVM2 required (+optional photo); Strength E2; Verification V1 (V2 if artifact used).
- Completion: records required observation categories, demonstrates obs/interp distinction, completes safety check, submits reflection.
- Safety gate: explicit yes/no "safe location" check before Field Mode; if No, Challenge does not proceed.
- Retry: non-punitive ("look again and describe something more specific").
- Alt: appropriate outdoor landscape usable as "Foundation practice — not Desert Field verification"; later desert-specific application still needed for desert-specific evidence.
- Source req: minimal; regional examples/terminology need normal §11 (2I) verification.

**Challenge 2 — Not All Desert Is the Same**
- Purpose: comparison; dismantle the "desert = one uniform terrain" mental model.
- Objective: compare two nearby areas, identify differences that could matter for movement/interaction.
- Prereq: Challenge 1.
- Est: 20–30 min. Env: safe location with ≥2 meaningfully different surfaces/terrain conditions; never seek hazardous terrain merely to create contrast.
- Mapping: Primary C1; Secondary C2; Target L2; Demo A.
- DLO1; RK1/R1→R2; Integration RI2+RI3; Concepts: Terrain Characteristics—I, Desert Diversity—R, Obs vs Interp—A.
- Evidence: EVM2+EVM3; Strength E2; V1/V2; paired photos optional only where safe.
- Completion: meaningful comparison, ≥3 relevant differences, basic reasoning linking environment to movement implications.
- Safety: no entering steep/unstable slopes, active dune vehicle areas, loose cliff edges, hazardous surfaces; visual comparison from a safe point is valid.
- Retry: pick a better safe comparison if areas are effectively identical.
- Alt: verified regional landscape photographs = K+A evidence, not equivalent to direct field application.
- Source req: regional landscape examples require authoritative geographic sources.

**Challenge 3 — Read the Invisible**
- Purpose: infer environmental forces from observable effects while explicitly preserving uncertainty.
- Objective: find evidence of sun/shade/wind effects; separate what's known from what's inferred.
- Prereq: Challenges 1–2.
- Est: 15–25 min. Env: safe outdoor area with observable exposure/wind effects.
- Mapping: Primary C1; Secondary C2; Target L2; Demo K+A.
- DLO1, early DLO2; RK2/R1; Integration RI2; Concepts: Sun/Shade—I, Wind Evidence—I, Uncertainty—I, Obs vs Interp—R/A.
- Reasoning structure taught: "I observe X. This might suggest Y. My confidence is…" — not "see X, therefore Y with certainty." At least one intentionally ambiguous example should allow "Not enough information," positively reinforced.
- Evidence: observation + reasoning record; Strength E2.
- Completion: ≥3 direct observations, reasonable evidence/inference distinction, appropriate use of uncertainty.
- Safety: no touching dangerously hot surfaces, no entering blowing dust/sand, no remaining exposed solely for comparison, no staring at the sun.
- Retry: interpretations may be revised after feedback.
- Alt: photo/video-based interpretation where safe real effects unavailable.
- Source req: scientific claims about wind-formed features, solar exposure, dune morphology require verified sources before production copy.

**Challenge 4 — The Desert Is Alive**
- Purpose: ecological awareness without taxonomy or wildlife interference.
- Objective: find evidence the desert is a living ecosystem without disturbing plants/animals/signs.
- Prereq: Challenges 1–3.
- Est: 20–30 min. Env: safe natural/desert outdoor area.
- Mapping: Primary C1; Secondary C2, C5, C6; Target L2; Demo A.
- DLO6+DLO1+DLO8; RK4+RK7/R1; Integration RI2+RI3; Concepts: Vegetation Patterns—I, Signs of Life—I, Responsible Observation—I.
- Evidence: observation record, optional non-intrusive photo; Strength E2.
- Completion: multiple legitimate biological observations + adherence to non-disturbance rules; correct species identification not required.
- Safety (absolute): no handling wildlife; no hands inside burrows/rocks; no handling droppings/carcasses; no eating/tasting plants; no approaching potentially dangerous animals.
- Retry: lack of animal sightings is not failure — vegetation/indirect evidence can satisfy the objective.
- Alt: verified imagery can support knowledge, but direct ecological observation is stronger evidence.
- Source req: species-specific examples require authoritative ecological/conservation sources and correct geographic distribution.

**Challenge 5 — Read Before You Move**
- Purpose: integrate Unit 1, reduce scaffolding.
- Objective: read a safe outdoor area independently and decide which observations matter most before moving through it.
- Prereq: Challenges 1–4.
- Est: 25–35 min.
- Mapping: Primary C1; Secondary C2, C5, C6; Target C1 early L3, others L2; Demo A.
- DLO1+DLO8; RK1+RK2+RK4+RK7/R1–R2; Integration RI2+RI3; Concepts: Unit 1 concepts—A.
- Pre-Challenge teaching: almost none — BADAWI does not tell the learner which categories to check first.
- Task: identify the three observations that would most influence movement, one uncertainty, and one condition that could cause modification/abandonment.
- Evidence: EVM2+EVM3+EVM5; Strength E2.
- Completion: independent observation selection, prioritization, cautious reasoning, uncertainty awareness, safety judgment.
- Safety gate: only a safe controlled amount of movement is required, if any — the core skill is reading *before* movement.
- Retry: if a system scenario contains an obvious safety feature the learner misses, ask them to reassess (BADAWI should not pretend it knows every real-world hazard).
- Source req: inherited from Unit 1 verified content.

### Unit 2 — Heat, Weather & Water (Challenges 6–10)

**Challenge 6 — Follow the Shade**
- Purpose: extend Unit 1 shade observation into dynamic exposure understanding.
- Objective: observe how shade/exposure change; explain why a currently comfortable place may not remain so.
- Prereq: Unit 1.
- Est: two short observations separated in time (or controlled equivalent); active time ~15–25 min.
- Mapping: Primary C1; Secondary C2, C5; Target L2; Demo A.
- DLO2; RK2/R2; Integration RI2+RI3; Concepts: Sun/Shade—E, Environmental Change—E.
- Evidence: observation + reasoning; Strength E2.
- Safety: never remain in dangerous heat waiting for shade to move; separated observations only if naturally and safely present.
- Alt: time-separated imagery or safe simulated sun/shadow examples.
- Source req: accurate solar/shade sources; do not hard-code local timing without verified calculation/data.

**Challenge 7 — Read the Conditions**
- Purpose: break the misconception that air temperature alone describes field conditions.
- Objective: assess a planned outdoor activity using several environmental/personal factors, not a single temperature number.
- Prereq: Challenge 6.
- Est: 15–20 min.
- Mapping: Primary C2; Secondary C1, C5; Target L2; Demo K+A.
- DLO2; RK2/R2; Integration RI1+RI5 (comparative scenarios); Concepts: Heat≠Air Temperature—I, Conditions Interact—I.
- Not a medical-risk calculator. Compares controlled scenarios where the same temperature occurs under different wind/shade/activity conditions.
- Evidence: scenario response + applied condition assessment; Strength E2.
- Completion: recognizes multiple interacting variables, identifies relevant risk factors.
- Safety: medical symptoms/numerical thresholds must come from the verified §10 (2H) implementation standard; passing an app assessment does not mean conditions are guaranteed safe.
- Alt: fully scenario-based if actual conditions unsuitable.
- Source req: **HIGH** — one of the most rigorously sourced Challenges in the Pack (strong authoritative health/environment sources).

**Challenge 8 — Where Water Moves**
- Purpose: teach learners to read water movement — not to hunt for water.
- Objective: identify how terrain could influence where rainfall/runoff move through a desert landscape.
- Prereq: Unit 1 + Challenges 6–7.
- Est: 20–30 min.
- Mapping: Primary C1; Secondary C2, C5; Target L2; Demo K+A.
- DLO3+DLO2; RK1+RK3/R2; Integration RI1+RI2+RI3; Concepts: Rainfall/Runoff—I, Wadis—I.
- Teaching: a dry channel is evidence of water movement, not proof of permanent safety.
- Evidence: annotated observation/sketch/selection + reasoning; Strength E2.
- **Safety gate (hard):** never enter or remain in a drainage channel merely to complete this Challenge — read-from-safety only; must not direct the learner into a wadi/channel/drainage area/flood-prone depression/watercourse.
- Retry: correct simplified terrain reasoning using diagrams/verified imagery.
- Alt: high-quality map/terrain scenario fully acceptable.
- Source req: strong hydrology + regional flash-flood sources.

**Challenge 9 — Water Shapes Life**
- Purpose: connect water, vegetation, landscape, settlement, human adaptation — without implying vegetation means potable water.
- Objective: trace how water availability can influence where life and human activity concentrate.
- Prereq: Challenge 8.
- Est: 20–30 min.
- Mapping: Primary C2; Secondary C1, C6; Target L2; Demo K+A.
- DLO3+DLO6+DLO7; RK3+RK4+RK5+RK6/R2; Integration RI2+RI3+RI4; Concepts: Water Distribution—I, Vegetation-Water Relationship—E, Human Water Adaptation—I.
- Local knowledge: strong RI4 opportunity — verified regional water-management/oasis example usable once §12 (2I/2J) sourcing/attribution is complete. Structure: environmental problem → locally developed response → limits/context.
- Evidence: observation or regional-case analysis + reasoning; Strength E2.
- Completion: connect ≥3 system components without unsupported "water finding" claims.
- Safety: no sampling, tasting, entering, or drinking unknown water.
- Alt: verified regional case material may strongly satisfy this Challenge if direct oasis/wadi/agricultural access unavailable.
- Source req: **HIGH** — traditional irrigation/oasis/well/settlement/local-knowledge examples need exact geographic attribution and strong sourcing.

**Challenge 10 — Go / Change / Don't Go**
- Purpose: integrate Unit 2 into explicit safety judgment.
- Objective: use environmental conditions to decide whether a planned desert activity should go ahead, be changed, or be cancelled.
- Prereq: Challenges 6–9.
- Est: 20–25 min.
- Mapping: Primary C5; Secondary C1, C2, C4; Target C5 early L3, C2 L2–L3; Demo K+A.
- DLO2+DLO3+DLO8; RK2+RK3/R2–R3; Integration RI1+RI5; Concepts: Unit 2 conditions—A.
- Task: evaluate scenarios → GO / CHANGE / DON'T GO + explain what matters, what's missing, what could change, what would make it unacceptable. ≥1 scenario should reward "insufficient information"; ≥1 should clearly make Don't Go correct.
- Applied component: apply same reasoning to the next planned real BADAWI field activity (does not auto-authorize it).
- Evidence: EVM3; Strength E2 (stronger only when paired with later actual behavior).
- Completion: demonstrates temperature alone is insufficient, conditions interact, plans can change, cancelling is valid, uncertainty matters.
- Safety gate: BADAWI must never say "Safe to go" — must use hedged language (e.g. "No obvious issue identified within the factors BADAWI asked you to review. You remain responsible for current conditions and local guidance."). Final wording belongs to safety/UX implementation.
- Retry: poor decisions receive targeted feedback and scenario reassessment.
- Source req: **HIGH** — risk logic/thresholds must derive from verified §10 (2H), not improvised rules.

### Unit 3 — Preparing for the Field (Challenges 11–14)

**Challenge 11 — Start With the Mission**
- Purpose: preparation begins with the objective and context, not a generic packing list.
- Objective: define what you're actually trying to do before deciding what you need.
- Prereq: Challenges 1–10 (assumes changing conditions, exposure, water/resource basics, go/change/stop judgment).
- Est: 15–20 min. Env: none required — may be completed indoors (planning task).
- Mapping: Primary C2; Secondary C5; Target L2; Demo K+A.
- DLO5+DLO8; RK2+RK7 where relevant; Integration RI5 (contrasting scenarios); Concept: Objective Before Equipment—I.
- Teaching: relationship is Mission → Conditions → Requirements, not Gear → adventure. No universal desert packing list.
- Evidence: EVM3; Strength E2; V3 for structured portions + V1 for reasoning.
- Completion: demonstrates context-dependent preparation.
- Safety: do not normalize unsupported remote travel or imply more gear makes risky plans acceptable.
- Source req: low–moderate; specific equipment/safety recommendations must align with §10 (2H).

**Challenge 12 — Build the Plan**
- Purpose: turn Unit 2 environmental knowledge into a basic field plan.
- Objective: create a simple plan for a safe, controlled desert activity using expected conditions.
- Prereq: Challenge 11.
- Est: 20–30 min. Env: planned activity should be short, accessible, non-technical, appropriate, within V1 scope; Challenge may occur before entering the field.
- Mapping: Primary C2; Secondary C5, C3; Target L2; Demo A.
- DLO5+DLO8 (supporting DLO2); RK1+RK2+RK7; Integration RI1 (current/local conditions); Concepts: Conditions Check—A, Route & Access—I, Planning—I.
- Plan must contain: objective, location, approx. duration, expected conditions, intended start/end window, access/permission considerations, basic route/location boundaries, water/resource plan, communication/check-in plan, relevant equipment categories, clear cancellation/change conditions. Do not force false precision when reliable information is unavailable.
- Evidence: structured plan + reasoning; Strength E2.
- Completion: plan connects conditions to preparation, realistic scope, ≥1 explicit stop/change criterion.
- Safety gate: redirect obviously out-of-scope plans (solo remote expeditions, extreme-weather outings, technical off-road travel, unsupported overnight survival exercises).
- Alt: use a realistic controlled scenario if no real outing is planned.
- Source req: local access/closure/protected-area/weather/legal guidance requires current verification in product implementation.

**Challenge 13 — Pack for a Reason**
- Purpose: teach functional equipment selection rather than gear accumulation.
- Objective: choose what you need based on function, not because it's on a generic checklist.
- Prereq: Challenge 12.
- Est: 20–30 min.
- Mapping: Primary C3; Secondary C2, C5; Target L2; Demo A + light P.
- DLO5; RK2 where exposure-related; Concepts: Equipment by Function—I, Clothing & Protection—I, Water Planning—A.
- Functional categories: hydration; sun/weather protection; footwear/mobility; navigation; communication; visibility/illumination where relevant; emergency contingency; Challenge-specific materials. No brand recommendations or tactical aesthetic requirement.
- Evidence: EVM4 where physical kit is prepared + EVM3 reasoning; Strength E2; photo optional.
- Completion: covers appropriate functional categories, explains why important items are present, does not substitute irrelevant gear for planning.
- Safety: no weaponry, hazardous tools, medical interventions, or specialist equipment required for V1.
- Retry: missing functional category triggers reassessment rather than failure.
- Source req: any numeric/medical claims (sun protection, water quantity, emergency equipment) require authoritative safety sourcing.

**Challenge 14 — The Final Check**
- Purpose: make preparation a go/no-go judgment, not a completed checklist.
- Objective: before beginning, decide whether your plan still makes sense under the conditions that actually exist now.
- Prereq: Challenges 11–13.
- Est: 10–15 min immediately before controlled field activity.
- Mapping: Primary C5; Secondary C2, C3; Target C5 introductory L3; Demo A.
- DLO5+DLO8; RK2+RK7; Concepts: Final Readiness Check—I, Go/Change/Stop—A.
- Check: current conditions, objective, available time, resources, access, communication, personal readiness, changes since planning → choose PROCEED AS PLANNED / MODIFY / DO NOT START + explain.
- Scaffolding reduction: earlier Challenges give detailed categories; here reminders can be more compact (Unit 6 expects even more independent assessment).
- Evidence: Decision & Reasoning; becomes part of the later evidence chain if followed by real field activity.
- Completion: demonstrates plans remain revisable until the activity starts.
- Safety gate: completing a checklist never guarantees safety.
- Source req: any objective safety gates must come from §10 (2H), not invented thresholds.

### Unit 4 — Orientation & Navigation (Challenges 15–19)

**Challenge 15 — Find Your Bearings**
- Purpose: develop practical cardinal-direction awareness.
- Objective: establish the cardinal directions around you and connect them to the actual landscape.
- Prereq: Units 1–3.
- Est: 20–25 min. Env: safe accessible outdoor area with enough visibility to establish reference points; remote terrain unnecessary.
- Equipment: phone/BADAWI; basic compass if used in V1; verified device compass may support foundation practice.
- Mapping: Primary C3; Secondary C1, C2, C5; Target L2; Demo K+A+P.
- DLO4; RK1; Concepts: Cardinal Directions—I, Orientation Before Navigation—I.
- Teaching distinguishes: Direction (where something lies relative to you) vs Route (how you get there) vs Orientation (knowing your relationship to known directions/features).
- Decision point (perspective check): "If you turn around, which direction is now on your right?"
- Evidence: EVM4+EVM3; Strength E2–E3 for the narrow task.
- Completion: correctly establishes cardinal directions using an appropriate tool and relates them to visible references.
- Safety: remain stationary or move only in a controlled area while using the device.
- Alt: indoor foundational compass exercise possible, but field orientation must later be applied.
- Source req: standard authoritative navigation references.

**Challenge 16 — Build a Mental Map**
- Purpose: develop spatial awareness without constant screen dependence.
- Objective: choose useful reference points and build a simple mental picture of the surrounding area.
- Prereq: Challenge 15.
- Est: 20–30 min.
- Mapping: Primary C1; Secondary C2, C3; Target L2–L3; Demo A+P.
- DLO4+DLO1; RK1/R2; Concepts: Landmarks & Reference Points—E, Shape/Relief—E.
- Decision point: "Which reference would be least useful if you moved behind this terrain feature — and why?" (introduces visibility loss).
- Evidence: sketch/structured map record + reasoning; Strength E2.
- Safety: no requirement to climb higher ground for visibility.
- Source req: mostly instructional.

**Challenge 17 — Map ↔ World**
- Purpose: teach the relationship between map representation and physical surroundings.
- Objective: connect what a map shows with what you can actually see around you.
- Prereq: Challenges 15–16.
- Est: 25–35 min. Env: controlled area with a suitable simple map, BADAWI-prepared map, or legally usable mapping layer.
- Mapping: Primary C3; Secondary C1, C2; Target L2; Demo K+A+P.
- DLO4; RK1/R2–R3; Concepts: Basic Maps—I, Landmarks—A.
- Teaching: beginner concepts only (map orientation, symbols, scale concept, major features, matching representation to reality). No advanced coordinate systems.
- Evidence: structured map task + reasoning; Strength E2–E3.
- Completion: basic map-environment correspondence.
- Safety: no route-following into uncontrolled terrain.
- Alt: high-quality simulated landscape + map can teach the concept; direct field matching is stronger.
- Source req: accurate/current geographic data in the eventual product.

**Challenge 18 — More Than One Way North**
- Purpose: compare orientation methods; teach reliability, assumptions, and limitations.
- Objective: compare more than one way of establishing direction and decide how much confidence each method deserves.
- Prereq: Challenges 15–17.
- Est: 25–35 min.
- Mapping: Primary C2; Secondary C1, C3, C5; Target L2–L3; Demo K+A+P.
- DLO4+DLO7; RK6/R2; Integration RI4+RI5; Concepts: Sun Orientation—I, Celestial Orientation—I (where appropriate), Method Reliability—I.
- Categories: Instrument/tool method (compass), Environmental/celestial cue (sun/night-sky), Known-landmark method. Lesson: different methods have different assumptions, precision, availability, and failure modes — not that all are equally accurate.
- Local knowledge: strong opportunity for documented Arabian Peninsula navigation knowledge — final examples must pass §12 (2I/2J); frame as sophisticated observation, not a mystical trick.
- Decision point: "If the two methods disagree, which should you trust more — and what might explain the disagreement?" ("I need more information" may be correct.)
- Evidence: comparison + reasoning + practical orientation; Strength E2–E3.
- Safety: no sun-gazing; no unsafe night activity solely for Challenge completion.
- Retry: explain violated assumptions and retry.
- Alt: celestial elements may be scenario-based.
- Source req: **HIGH** — sun/celestial techniques and traditional navigation examples require rigorous verification and explicit limitations.

**Challenge 19 — Stay Oriented**
- Purpose: integrate Unit 4 into a controlled movement task.
- Objective: move through a short, safe area while maintaining awareness of direction, reference points, and uncertainty.
- Prereq: Challenges 15–18 + Unit 3 readiness check.
- Est: 30–45 min. Env: short, bounded, familiar/controlled outdoor area (defined camp perimeter, educational field site, safe recreation area, short marked route with environmental references) — **not** remote wilderness, trackless desert crossing, complex dune navigation, or unsupported solo routefinding.
- Equipment: appropriate preparation + basic orientation tool.
- Mapping: Primary C3; Secondary C1, C2, C5, C4; Target C1 L3, C2 L2–L3, C3 L2, C5 L3; Demo A+P.
- DLO4+DLO5+DLO8; RK1; Concepts: Orientation, Landmarks, Map Use, Uncertainty—A.
- Pre-Challenge readiness gate: abbreviated Unit 3 Final Check (conditions, route, resources, access, readiness) — cross-Unit accumulation, not reteaching.
- Field task: before starting, record starting orientation, 2–4 reference points, intended bounded route, expected turning/decision points. During the activity, BADAWI prompts only at safe stopping points; do not navigate while staring at the screen.
- Controlled uncertainty element: a chosen landmark may become less useful, or an assumption must be rechecked (natural or via a safe scenario layer).
- Decision point: if uncertain → Continue / Re-check / Return / Stop (reward Re-check/Stop where appropriate).
- Evidence: EVM4+EVM3+EVM5; Strength E3 for limited V1 orientation capability.
- Completion: initial orientation, reference-point use, periodic checking, appropriate response to uncertainty, safe completion of controlled route.
- Failure/retry: a navigation mistake is not automatically a failed Challenge — detecting, stopping, reassessing, and correcting safely may provide stronger Adaptation evidence than a mistake-free run; recklessly continuing despite uncertainty should not count as successful C5 performance.
- Safety gate: if genuinely uncertain about real location/safety, stop following Challenge logic and prioritize real-world safety procedures (specific emergency guidance belongs to §10/2H).
- Alt: supervised mapped course is strongest accessible alternative; pure simulation teaches reasoning but not field-performance evidence for C3.
- Source req: navigation procedures and lost-person guidance require strong authoritative sources.

### Unit 5 — Moving With the Desert (Challenges 20–24)

**Challenge 20 — Feel the Difference**
- Purpose: turn terrain knowledge into embodied understanding by comparing how safe terrain types affect movement.
- Objective: compare how two safe terrain types change your effort, stability, pace, and attention.
- Prereq: Units 1–4.
- Est: 20–30 min. Env: controlled area with two safely traversable surfaces (e.g. firm ground vs loose sand, level vs gentle incline, compact gravel vs softer surface); **no** steep dunes, unstable slopes, cliffs, active vehicle tracks, or technical terrain.
- Mapping: Primary C3; Secondary C1, C2, C5; Target C3 L2, C1 L3; Demo A+P.
- DLO5+DLO1; RK1/R2–R3; Integration RI2+RI3; Concepts: Terrain Characteristics—A, Terrain Has a Cost—I.
- Not a fitness test. Records: perceived stability, effort, pace, footing demands, attention required, exposure/route-preference differences.
- Evidence: EVM4+EVM3; Strength E3 for this narrow beginner capability.
- Completion: recognizes that terrain changes movement cost and should affect route choice.
- Safety: no race, timed performance, endurance benchmark, or pressure to continue through discomfort; substitute unsafe surfaces.
- Retry: use a better safe contrast if surfaces are too similar.
- Alt: accessible terrain-comparison path; visual simulation does not fully replace P evidence.
- Source req: low except any specific biomechanical claims.

**Challenge 21 — Choose Your Line**
- Purpose: teach route choice as a trade-off rather than shortest-path selection.
- Objective: compare possible routes and choose one using terrain, exposure, effort, hazards, and environmental impact.
- Prereq: Challenge 20 + Unit 4 orientation skills.
- Est: 25–35 min. Env: bounded controlled area with two or more safe route options evaluable visually or physically.
- Mapping: Primary C2; Secondary C1, C3, C5, C6; Target C2 introductory L3, C3 L2; Demo A+P.
- DLO5 (supporting DLO1/DLO8); RK1+RK7/R3; Concepts: Route Choice as Trade-Off—I, Terrain Cost—A.
- Teaching: shortest ≠ easiest ≠ safest ≠ lowest impact.
- Decision point: "What did you optimize for?" — no single universal correct route.
- Evidence: EVM2+EVM3+light EVM4 if route is safely completed; Strength E2–E3.
- Completion: justified route choice using multiple factors rather than distance alone.
- Safety: all presented route alternatives must already fall within Challenge scope — learners never need to enter an obviously hazardous route to compare it.
- Alt: map/photographic scenario can teach reasoning.
- Source req: environmental-impact claims align with RK7 + source standards.

**Challenge 22 — Pace the Desert**
- Purpose: teach pace as a decision responsive to terrain, exposure, effort, and objective, not speed.
- Objective: adjust pace based on conditions and notice how pace changes effort and attention.
- Prereq: Challenges 20–21.
- Est: 20–30 min.
- Mapping: Primary C3; Secondary C2, C5; Target C3 L2, C2 L2–L3; Demo A+P.
- DLO5+DLO2; RK1+RK2; Concepts: Pace & Effort—I, Exposure—A.
- Teaching: the appropriate pace fits the conditions and objective, not the fastest maintainable pace. Compares naturally comfortable pace vs a deliberately slower, more observant pace — no maximal effort required.
- Evidence: EVM4+EVM3; Strength E3 for narrow movement behavior.
- Completion: demonstrates pace is an environmental decision, not a performance score.
- Safety: no fitness thresholds, heart-rate targets, speed goals, or endurance tests; the learner may stop at any time.
- Retry: moving slowly or pausing is not failure and may be correct.
- Alt: accessible variants should preserve changing pace/effort relative to conditions rather than require a specific walking ability.
- Source req: any health/exertion recommendation requires §10 (2H) verification.

**Challenge 23 — Change of Plan**
- Purpose: make adaptation explicit — the original plan is no longer the best plan.
- Objective: recognize a meaningful change in conditions and decide whether to continue, modify, reroute, or stop.
- Prereq: Challenges 20–22 + Unit 3 planning logic.
- Est: 20–30 min.
- Mapping: Primary C4; Secondary C2, C5, C6; Target C4 L2, C2/C5 introductory L3; Demo A (potentially P).
- DLO5+DLO8; RK1/RK2/RK7 depending on scenario; Concepts: Change the Plan—I, Go/Change/Stop—E.
- Task design uses a controlled change only — never manufactured real danger (e.g. route unavailable, shade disappears, wind increases within safe bounds, terrain softer than expected, section closed/restricted, wildlife/sensitive vegetation makes route inappropriate, time reduced).
- Learner response: CONTINUE / MODIFY / REROUTE / STOP + explain what changed, why it matters, which assumption is invalid, preferred new plan.
- Evidence: EVM3+EVM5 (+EVM4 where modified activity is actually performed); Strength E2–E3.
- Completion: competence is appropriate adaptation, not persistence.
- Safety: change is simulated or safely bounded — never rely on actual dangerous deterioration as the teaching mechanism.
- Retry: poor adaptation can be reconsidered; persisting with an unsafe option does not demonstrate C5.
- Source req: scenario risk content aligns with §10 (2H).

**Challenge 24 — Move Without a Trace**
- Purpose: make stewardship operational rather than informational.
- Objective: complete a short movement activity while reducing unnecessary impact on the landscape and explaining the choices made.
- Prereq: Challenges 20–23.
- Est: 25–35 min.
- Mapping: Primary C2+C5; Secondary C3, C6; Target L2–L3; Demo A+P.
- DLO8+DLO5; RK7/R3; Concepts: Responsible Movement—I, Route Choice—A.
- Teaching content (depending on verified regional rules/context): vegetation, wildlife, fragile/sensitive surfaces, waste, archaeological/cultural features, property/access, existing tracks/routes, unnecessary disturbance — localized to Arabian Peninsula contexts, not generic outdoor-ethics language.
- Documents ≥2 choices made to reduce disturbance.
- Evidence: EVM3+EVM4+EVM5; Strength E3 for limited activity.
- Completion: active stewardship choices during movement.
- Safety: environmental protection never overrides immediate human safety — if avoiding an area creates danger, stop/redesign the activity.
- Retry: if the site cannot support low-impact participation, correct action is "do not perform the Challenge there."
- Alt: site-evaluation scenario can supplement but not fully replace practical behavior evidence.
- Source req: protected-area, archaeological, environmental, and access rules require authoritative/local verification.

### Unit 6 — Desert Field Integration (Challenges 25–28)

**Challenge 25 — Read the Situation**
- Purpose: test independent environmental assessment at the Pack's intended C1 ceiling.
- Objective: assess today's environment independently and decide what information matters for the activity ahead.
- Prereq: Units 1–5.
- Est: 15–25 min immediately before integration activity. Env: controlled, accessible, appropriately bounded, non-technical desert environment — not a remote expedition.
- Mapping: Primary C1; Secondary C2, C5; Target C1 L3, C2/C5 introductory L3; Demo A.
- DLO1+DLO2+DLO8; RK applicable domains/R3; Concept status: A.
- Pre-Challenge teaching: none beyond "Use what you've learned"; a blank assessment structure may be offered, but not a full factor checklist.
- Field task: learner decides what to observe (BADAWI does not tell them which factors matter today). Prioritizes 3 conditions that matter most + 1 uncertainty.
- Evidence: EVM2+EVM3; Strength E3 for independent observation/assessment.
- Completion: independently selects relevant observations, prioritizes them, recognizes uncertainty, avoids unsupported claims.
- Safety gate: if conditions exceed scope, integration activity stops/reschedules/relocates — appropriate cancellation does not fail Challenge 25.
- Retry: reassess another suitable day/location.
- Source req: mostly inherited.

**Challenge 26 — Make the Plan**
- Purpose: integrate preparation, navigation, movement, risk, and stewardship into one learner-generated field plan.
- Objective: turn your environmental assessment into a short, realistic plan for the field activity.
- Prereq: Challenge 25.
- Est: 20–30 min.
- Mapping: Primary C2; Secondary C3, C4, C5; Target C2 L3, C3/C4 L2, C5 L3; Demo A.
- DLO4+DLO5+DLO8; RK7+relevant context; Concepts: Planning, Orientation, Route Choice, Stop Criteria—A.
- Plan defines: objective, approximate route/activity boundary, timing, orientation method, reference points, water/resources, pace/rest considerations, environmental-impact considerations, stop/change criteria, communication/return logic. **Unlike Unit 3, BADAWI should not walk the learner line by line through the reasoning.**
- Decision point: "What is the weakest assumption in your plan? How will you detect if that assumption stops being true?"
- Evidence: EVM3 structured plan + reasoning; Strength E2–E3.
- Completion: plan is coherent, scoped, connected to the actual assessment, explicit about uncertainty/stop-change criteria.
- Safety: BADAWI may reject plans outside V1 field boundaries.
- Retry: revise before Challenge 27.
- Alt: planning may use a supervised/accessible course, but final integration requires eventual field application.
- Source req: no major new content.

**Challenge 27 — The Field Challenge**
- Purpose: practical culmination of the V1 Desert Pack.
- Objective: complete a short controlled desert activity using your own observation, preparation, orientation, movement, adaptation, and safety decisions.
- Positioning: **not** a survival test, race, endurance event, unsupported navigation, remote expedition, or test of bravado — **is** "a bounded demonstration of foundational desert competence."
- Prereq: Challenges 25–26 + final readiness check.
- Est: likely 45–90 min depending on final activity/accessibility pathway; exact duration not hard-locked until safety/implementation design is complete.
- Env (strict): controlled location; known entry/exit; appropriate access; non-technical terrain; suitable forecast/current conditions; reliable communication context; defined activity boundary. V1 should be compatible with supervised/companion-based completion rather than incentivizing solo execution (exact supervision rules belong in final safety/product implementation).
- Mapping: Primary C3 + integrative C1/C2; Secondary C4, C5, C6; Targets: C1 L3, C2 L3 where appropriate, C3 L2, C4 L2, C5 L3, C6 supporting L2–L3; Demo A+P.
- DLO1+DLO4+DLO5+DLO8 primarily (contextual DLO2/3/6/7); RK contextual R2–R3; Concepts: Pack-wide A.
- Safety gate class: **SG2 — Enhanced Field Gate** (per §10/2H.3).
- Structure: begin at Start Point; complete planned bounded route/activity; maintain orientation; make appropriate movement decisions; conduct one deliberate environmental observation; respond to one controlled change/decision point; return/finish within defined boundary.
- During-field interaction: minimize phone attention — prompts only at start, designated safe checkpoints, intentional rest/observation points, and finish. Explicit rule: **"Stop moving before using BADAWI."**
- Controlled adaptation element: one safe controlled change (e.g. unavailable reference point or route segment) — never manufacture real danger.
- Evidence (strongest chain): EVM2 Observation, EVM3 Decision/Reasoning, EVM4 Performance, EVM5 Reflection (in Challenge 28). Potential: safe checkpoint confirmations, limited photos, route/activity record, decision responses, final output. No continuous filming.
- Evidence strength: **E3** — Demonstrated within explicitly limited V1 scope; does not verify wilderness survival competence.
- Completion: sufficiently demonstrates environmental assessment, orientation maintenance, safe movement, ≥1 relevant decision, appropriate response to change/uncertainty, stewardship, and completion or appropriate early termination.
- Safety note: a learner who safely terminates because conditions exceed the plan may strongly demonstrate C5/C4 even if the intended route is not completed (§9/2G defines how this affects status).
- Unsafe behavior: material unsafe actions can block full "Demonstrated" safety status even if the destination is reached (continuing after a failed safety gate, entering prohibited terrain, ignoring explicit access restrictions, taking meaningful risk for evidence). Exact rubric belongs to §9/2G and §10/2H.
- Retry: on another suitable occasion; never encourage an immediate repeat when conditions caused the first stop.
- Alt/Accessibility: retain core competencies while adapting physical execution (shorter route, accessible surface, mobility-compatible bounded course, supervised field site, altered movement task) — do not lower the intellectual objective merely because the physical pathway changes.
- Source req: **HIGH** — inherits the strongest verification requirements from all embedded safety, navigation, environmental, and local-knowledge content.
- **Special rubric (2G.23):** FC1 Environmental Assessment; FC2 Plan & Decision Quality; FC3 Orientation & Field Execution; FC4 Safety, Limits & Stewardship (**safety-critical, non-compensatory**); FC5 Adaptation. Full Demonstrated requires FC1–FC5 at "Competent for Target." If safely terminated, FC3 may remain incomplete while FC4/FC5 are strongly demonstrated — the learner later returns for missing field-performance evidence.

**Challenge 28 — Read It Again**
- Purpose: close the Pack by measuring transformation, transfer, and self-awareness — not another knowledge quiz.
- Objective: look back at how you approached the desert before BADAWI and explain how your observation, decisions, and limits have changed.
- Prereq: Challenge 27, including a safely terminated attempt where relevant.
- Est: 20–30 min.
- Mapping: Primary C6; Secondary C1, C2, C4, C5; Target C6 L2–L3; Demo K+A through reflection on demonstrated experience.
- DLO8 + Pack-wide synthesis; RK applicable domains; Concepts: entire Pack synthesized.
- Reflection structure (7 parts): (1) Before/After — what you'd have noticed first vs now; (2) Decisions — most influential observation, most confident decision; (3) Mistakes & uncertainty — what was misread/assumed, what's still uncertain (should not produce false certainty); (4) Adaptation — when a plan changed, what evidence drove it; (5) Safety — an example where not continuing would demonstrate competence; (6) Transfer — what you'd do first in a different desert landscape tomorrow; (7) Boundaries — what desert activity you would not consider yourself qualified to attempt (a good answer shows calibrated confidence, not overconfidence).
- Evidence: EVM5 Reflection Record + cross-reference to earlier Challenge evidence; Strength E2–E3 for C6 depending on quality/prior evidence.
- Completion: genuine before/after comparison, evidence-based reflection, awareness of mistakes/uncertainty, transfer of BADAWI process, appropriate recognition of limits.
- System feedback: avoid unsupported wording like "You are now desert-ready" — prefer accurate scoped completion wording (e.g. "You've completed BADAWI's foundational Arabian Desert curriculum and demonstrated the Pack's required competencies within its controlled learning scope"); final learner-facing wording is a later production/UX task.
- **Special rubric (2G.24):** FR1 Evidence-Based Reflection; FR2 Self-Correction; FR3 Uncertainty & Limits; FR4 Transfer; FR5 Integration. No writing-style scoring.
- Source req: not explicitly specified in the Master for this Challenge (not invented here — treat as inherited/none beyond Pack-wide content).

---

## 9. Assessment Architecture — LOCKED (2G)

### 9.1 Assessment philosophy (six permanent principles)
1. Assess the intended competency (don't grade photography quality on an observation Challenge).
2. Judge evidence only within its limits.
3. Process can matter as much as result (reassessment → safe correction may beat accidental correctness).
4. Safety can override technical success.
5. Mistakes are assessable, not automatic failures.
6. Reward calibrated confidence ("I don't have enough information" can beat unsupported certainty).

No learner-facing numerical percentages for field competency — ever.

### 9.2 Four Challenge assessment states + Safety Override

| ID | State | Meaning |
|---|---|---|
| A1 | Demonstrated | Required competency evidence sufficiently demonstrated (not necessarily flawless). |
| A2 | Developing | Meaningful evidence demonstrated, but not enough for the full requirement. |
| A3 | Not Yet Demonstrated | Available evidence does not yet support the intended claim. Use this term, never "Failed." |
| A4 | Safely Terminated | Activity was stopped/modified/declined for a legitimate safety/environmental reason — describes what happened to the *activity*, not whether competencies succeeded; can coexist with valid competency evidence (e.g. C5/C4/C2 Demonstrated, C3 Not Yet Demonstrated). |

**Safety Override:** if evidence shows a material violation of an explicit BADAWI safety gate, the Challenge cannot receive full Demonstrated status regardless of technical task success. **Safety-critical dimensions are non-compensatory** — cannot be averaged away by strong performance elsewhere.

### 9.3 Five universal assessment dimensions (R1–R5)

| ID | Dimension | Question |
|---|---|---|
| R1 | Accuracy & Relevance | Did the learner identify/apply materially correct and relevant information? |
| R2 | Reasoning & Judgment | Does the learner connect evidence to decisions appropriately? |
| R3 | Execution | Was the practical task appropriately carried out? (only where genuinely testing performance) |
| R4 | Safety & Responsibility | Did the learner act within safety/environmental/access/responsible-behavior boundaries? |
| R5 | Reflection & Adaptation | Can the learner evaluate what happened and adjust thinking/behavior? |

Not every Challenge uses all five; each Challenge specifies its own critical vs supporting dimensions (2G.7/2G.8) rather than a universal formula.

### 9.4 Four internal performance bands (0–3)

| Band | Meaning |
|---|---|
| 0 | Insufficient Evidence |
| 1 | Emerging — partial understanding requiring substantial guidance/correction |
| 2 | Competent for Target — successful performance *at the Challenge's target level* (not universally "advanced") |
| 3 | Strong Demonstration — exceeds minimum target; does not auto-promote to next competency level |

### 9.5 Competency-level earning (2G.10–2G.11)
A competency level is established through a **pattern of evidence across multiple relevant Challenges and contexts**, never after one Challenge. BADAWI maintains a lightweight internal **Competency Evidence Portfolio** per competency, recording contributing Challenges, target levels, rubric dimensions, evidence strength, context variation, and repeated performance.

### 9.6 Pack completion requirements (2G.12–2G.13)
Three layers, all required:
1. **Required Challenge completion** — core Challenges reach Demonstrated or an approved valid alternative pathway. Current V1 treats all 28 as the core sequence unless later product testing justifies optionalization.
2. **Competency coverage** — sufficient evidence meets the Pack target across C1–C6 (operational target: C1 L3 required; C2 L2 required, emerging L3 expected; C3 L2 required; C4 L2 required; C5 L3 required; C6 L2 required, emerging L3 expected).
3. **Safety requirement** — C5 must meet the Pack-required safety standard; a learner cannot complete the Pack with unresolved material safety-judgment deficiencies merely because other content was completed.

Pack completion states are binary and simple: **In Progress** / **Completed** — no "Completed With Further Practice Recommended" half-state.

### 9.7 Retry & remediation
- **Targeted remediation (2G.14):** retry the competency gap, not the entire Challenge, unless another full field performance is genuinely needed.
- **Retry philosophy (2G.15):** no punitive attempt limit; no unsafe immediate retries (wait for appropriate conditions); preserve earlier valid evidence, reassess only the deficient dimension unless context materially changed; repeated prompting may cap the evidence level achievable.
- **Scaffolding effect on evidence (2G.16):** L1 substantial prompts expected; L2 structured guidance acceptable; L3 learner determines approach with limited procedural prompting; L4 adaptation/transfer under changing conditions. Completing a task after major rescue prompting does not establish L3 independence.
- **Hint classes (2G.17):** H1 Clarification (no material evidence change); H2 Directional Hint (may reduce independence evidence); H3 Procedural Assistance (may prevent an L3 independence claim for that attempt). Not punitive — assessment honesty.

### 9.8 Reflection, media, and AI assessment
- **Reflection (2G.18):** do not grade eloquence/spelling/length. Assess whether it references actual experience, identifies relevant observations/decisions, recognizes mistakes/uncertainty, explains adaptation, demonstrates transfer. Bands: Insufficient / Emerging / Competent / Strong.
- **Photo/video (2G.19):** assess what the artifact actually proves, not what BADAWI wishes it proved. Aesthetic quality is irrelevant.
- **AI-assisted assessment (2G.20):** AI may categorize evidence, detect missing requirements, compare reasoning to rubric, surface contradictions, suggest feedback, identify inconclusive evidence — but must never automatically claim "verified safe real-world completion." Uncertain assessment → "Evidence unclear — submit another form of evidence or use an alternative assessment," not automatic failure.
- **Knowledge questions (2G.21):** conventional automatic scoring is acceptable but should favor scenario judgment/comparison/application/uncertainty recognition over recall. Use the simplest valid format.
- **Unsafe scenario answers (2G.22):** instructional correction (what's concerning / why it matters / safer reasoning / effect on retry), never a game-like "Incorrect, try again" penalty.

### 9.9 Learner-facing feedback structure (2G.25)
Every assessment ends with: **What you demonstrated** (specific evidence-based) → **What to strengthen** (specific gap/caution) → **What happens next** (retry instruction / future guidance / reinforcement).

### 9.10 Other locked assessment rules
- **2G.26:** checkpoint-level competency progression display allowed at meaningful checkpoints, not every micro-interaction (Phase 3 decides visualization).
- **2G.27:** no "Expert"/"Master"/"Survival Expert"/"Ready for Anything" completion messaging — prefer accurate wording like "Arabian Desert Foundations Completed."
- **2G.29:** internal tracking of attempted/submitted/assessed/demonstrated may differ from learner-facing status, but required-progression status must ultimately reflect the assessment requirement.
- **2G.30 (Integrity without surveillance):** BADAWI designs for meaningful evidence and honest participation, not perfect anti-cheating surveillance; a future accredited-certification product would need a different verification standard.
- **2G.31:** each Challenge's final rubric architecture specifies Assessment Dimensions (R1–R5), critical dimensions, target performance band, Safety-Critical yes/no, accepted EVM1–5, evidence strength E1–E3, verification V1–V3, hint impact H1/H2/H3, retry logic, and competency contribution.

---

## 10. Safety Architecture — LOCKED (2H)

### 10.1 Governing doctrine
No BADAWI learning objective, Challenge completion, badge, evidence requirement, streak, progression mechanic, or field experience outranks the learner's real-world safety. BADAWI is **not**: an emergency-response service, a medical provider, a wilderness-rescue service, a substitute for professional instruction, a guarantee that conditions are safe, a substitute for local authorities/weather warnings/protected-area rules/emergency services, or an authorization to undertake an activity. This distinction must appear throughout the product, not only in Terms & Conditions.

### 10.2 Safety hierarchy (S0–S4)

| ID | Level | Meaning |
|---|---|---|
| S0 | Never in BADAWI V1 | Outside acceptable risk — not taught, required, scored, or encouraged. |
| S1 | Avoid/Prevent | Teach prevention of hazardous situations. |
| S2 | Recognize | Identify warning conditions and hazards. |
| S3 | Decide | Proceed → modify → postpone → stop. |
| S4 | Escalate | Recognize when the situation has left BADAWI's scope and requires real-world assistance. |

Progression: PREVENT → RECOGNIZE → DECIDE → STOP → ESCALATE.

### 10.3 Challenge safety-gate classes (SG0–SG2)

| ID | Class | Meaning |
|---|---|---|
| SG0 | No field safety gate required | Knowledge/reflection activity, no meaningful real-world exposure. |
| SG1 | Standard Field Gate | Low-risk outdoor observation/activity; short readiness check. |
| SG2 | Enhanced Field Gate | Movement, orientation, prolonged outdoor exposure, weather-sensitive tasks. **Challenge 27 is SG2.** |

Critical gates are not dismissible merely by accepting liability — where an explicit condition fails, the Challenge pauses/becomes unavailable until a suitable alternative exists.

### 10.4 Safety domain standards

| Domain | Key locked rules |
|---|---|
| Heat (2H.4–2H.8) | No single universal temperature threshold — logic = Weather + Exposure + Activity + Duration + Learner Context + Escape/Recovery Options. General (non-diagnostic) medical-circumstance guidance only; no forced disclosure of diagnoses. No universal litres-per-hour hydration formula. Symptom-based stop logic (serious neurological signs → emergency escalation, not app coaching). **No "push through" language ever** ("Keep going," "Almost there," "Push yourself," "Prove you can finish" are all prohibited); prefer "Conditions changed. Reassess." / "Stopping can be the correct decision." / "Your Challenge progress is preserved." |
| Weather (2H.9) | SG2 Challenges use near-real-time weather, not stale forecasts. Lightning: if thunder is audible, stop and seek real shelter — never teach improvised "safe positions" as a substitute for reachable shelter. |
| Flash floods / wadis (2H.9) | **Hard gate:** BADAWI never requires entering a wadi/drainage channel/wash/low depression/flood path. Challenge 8 is read-from-safety only. No entering active floodwater, no crossing flowing floodwater, no driving into flooded roads, no remaining in low channels when significant rainfall/flood risk exists. |
| Wind/sand/visibility (2H.9) | No arbitrary "wind challenge" thresholds — govern via visibility/balance/exposure/navigation implications; if visibility/orientation is inadequate or conditions worsen materially, stop/relocate. |
| Water (2H.13) | V1 assumes learner brings known-safe drinking water; never depends on finding/consuming environmental water. Never imply clear water, springs, wells, vegetation presence, or animal use prove potability. No universal numerical consumption rule. |
| Navigation (2H.15) | Orientation reduces (does not eliminate) risk of becoming lost. If a learner indicates genuine navigational uncertainty, normal instruction stops (conceptual state: "CHALLENGE PAUSED — ORIENTATION UNCERTAIN"); BADAWI must not improvise location-specific rescue instructions. **BADAWI itself must never become the learner's sole navigation dependency.** |
| Movement/terrain (2H.18) | V1 = non-technical, controlled, appropriately accessible terrain only. No cliff edges, scrambling, climbing, steep unstable dune faces, unstable rock, caves, confined spaces, deep/fast water, or technical off-road travel. |
| Vehicles (2H.19) | V1 does not teach/assess dune bashing, sand recovery, vehicle extraction, tire-pressure technique, convoy driving, or steep dune crossings. |
| Wildlife (2H.20) | Observe, do not interfere. Never require catching, chasing, cornering, feeding, handling, relocating, provoking, killing, or close approach. No hands into burrows/rock gaps/vegetation that can't be safely inspected. |
| Plants/food (2H.20) | No eating, tasting, brewing, applying, burning, or medicinal use of unidentified wild plants as part of a Challenge; traditional uses may be discussed contextually only. |
| Biological material (2H.20) | No handling droppings, carcasses, nests, eggs, or unknown biological material. |
| Fire (2H.23) | Not a V1 core competency — no fuel collection, ignition, friction fire, or emergency fire construction required. |
| Shelter (2H.24) | V1 teaches protection/shade/site-evaluation/preparation, not emergency shelter-construction competence. |
| Tools (2H.25) | Default: no knives, axes, saws, fire-starting equipment, or similar tools required for V1 competence. |
| Environmental/cultural (2H.26) | Avoid trespassing, restricted land, archaeological-site damage, artifact removal, habitat/plant damage, livestock disruption, intrusive photography, protected-area violations. |
| Local-rule supremacy (2H.26) | **Current local authorities/site managers/weather services/protected-area staff/landowners/emergency services/posted restrictions always override BADAWI.** Safety content requires ongoing review — BADAWI cannot know every temporary closure/flood risk/road restriction/security issue. |
| Alone vs with others (2H.28) | Low-risk observation Challenges may be solo-compatible in safe settings. Meaningful movement/navigation Challenges should prefer/encourage companion or supervised completion, especially for inexperienced users. **The Final Field Challenge should not incentivize unsupported solo desert completion.** Exact supervision rules are product/legal decisions. |
| Age (2H.29) | Adult pathway = normal V1 restrictions. Minor pathway may require guardian consent, adult-supervised field Challenges, no independent navigation/movement assessment, reduced location/evidence collection. Exact age thresholds require later legal/product review — **do not invent them in curriculum.** |
| Accessibility (2H.30) | Never imply competence requires walking a fixed distance, moving quickly, climbing, enduring heat, or standing for long periods. Alternative pathways preserve the learning objective while changing physical execution. |
| No risk competition (2H.31) | No leaderboards/rewards for fastest route, longest time outside, highest temperature completed, longest distance, most remote Challenge, fewest breaks, least water consumed, or "hardest conditions." Achievements may reward observation, completion, consistency, adaptation, stewardship, knowledge, reflection — never risky exposure. |
| Evidence safety (2H.32) | Never perform an unsafe action to capture evidence; no app interaction while moving; stop somewhere safe before photos/video; no repeating an action for missed evidence if repetition adds risk; no selfie requirement; better evidence never means closer proximity to a hazard. |
| Field Mode UX (2H.33) | Locked curriculum requirement (Phase 3 designs the UI): large controls, minimal text, minimal interaction, obvious stop/pause behavior; always provide a clear conceptual **STOP CHALLENGE** and **CONDITIONS CHANGED** action; termination should never require navigating menus. |
| Progress preservation (2H.34) | If a learner stops for heat/fatigue/weather/access/wildlife/orientation-uncertainty/equipment-failure/changed conditions, BADAWI preserves legitimate completed evidence (ties to A4 Safely Terminated, §9.2). |
| Emergency Mode (2H.35) | If an actual emergency is reported, BADAWI exits educational-coach behavior entirely — no badges/quiz/reflection/progression; transitions to concise emergency-support behavior only within properly validated capabilities. Integration/location-sharing/offline/contacts/UI = later product/legal work. |
| No diagnosis (2H.36) | BADAWI may say symptoms "may indicate a serious heat-related emergency," never assert a diagnosis ("You have heat stroke") unless in a validated medical-device context (outside V1). Same rule for dehydration, bites, allergic reactions, fractures, concussion, cardiac symptoms. |
| First-aid scope (2H.37) | V1 is not a complete first-aid curriculum — focuses on prevention, recognition of obvious warning signs, stop/escalate logic, and calling appropriate help. Any emergency advice included must be authoritative and narrowly scoped. |

### 10.5 Safety content classification (SC1–SC5)

| ID | Class | Example |
|---|---|---|
| SC1 | General Principle | "Stop and reassess when conditions change." |
| SC2 | Operational Rule | "Do not interact with BADAWI while walking." |
| SC3 | Hazard Rule | "Do not enter floodwater." |
| SC4 | Medical Warning | "Confusion during heat exposure may indicate a medical emergency." |
| SC5 | Local Rule | "A protected area closes under specific conditions." |

### 10.6 Source standard by safety type (2H.39)

| Safety type | Preferred sources |
|---|---|
| Medical/physiological | WHO, national public-health authorities, recognized clinical/public-health guidance, peer-reviewed consensus. |
| Weather/hydrology | National meteorological agencies, civil-defense/emergency authorities, authoritative hydrology/weather agencies. |
| Site/access/environment | Government ministries, protected-area authorities, municipal/site management, official legal/regulatory sources. |
| Traditional practice w/ safety implications | Requires **both** credible traditional/local documentation **and** contemporary safety verification — traditional status never bypasses modern safety review. |

Localized safety layer (2H.40): **Universal Safety Core + Country/Location Safety Layer + Current Conditions Layer.**

### 10.7 Mandatory Safety Matrix per field Challenge (2H.41)

| Field | Requirement |
|---|---|
| Safety Gate | SG0 / SG1 / SG2 |
| Primary Hazards | heat, terrain, weather, navigation, etc. |
| Preconditions | conditions required before starting |
| Hard Stops | conditions requiring termination |
| Prohibited Behaviors | Challenge-specific |
| Evidence Restrictions | safe evidence rules |
| Supervision | solo-compatible / companion preferred / supervised |
| Emergency Boundary | when BADAWI exits curriculum mode |
| Local Rules Needed | yes/no |
| Source Class | SC1–SC5 |
| Review Date | latest verification |

### 10.8 Pre-shipping safety review (2H.42–2H.45)
Every field Challenge requires: Curriculum review (does it teach what it claims?), Safety review (can the same objective be achieved with less risk?), Scientific/content review (are claims accurate?), Regional/legal review (are location-dependent actions permissible?), UX safety review (could the interface distract or incentivize unsafe behavior?). If a safer method produces equivalent learning, **use the safer method.**

**Residual-risk principle (2H.43):** outdoor activity cannot be made risk-free — BADAWI aims to eliminate unnecessary risk, reduce foreseeable risk, teach better judgment, and avoid false confidence, not claim field activity is completely safe.

**Safety feedback structure (2H.44):** what was concerning → why it matters → what safer reasoning/action would have been → how this affects the next attempt/future Challenges.

**Fading judgment, not fading gates (2H.45):** early Pack = explicit warnings; middle = learner identifies hazards; late = learner determines whether to proceed. Hard safety information/gates are never hidden merely to make a Challenge harder.

### 10.9 Formally prohibited V1 practical Challenge categories (2H.46)
Unsupported remote desert travel; extreme-heat endurance; intentional dehydration; deliberate severe-weather exposure; flood/wadi entry under hazardous conditions; floodwater crossing; advanced/unsupported navigation; dangerous animal handling; wild-food ingestion; hunting/trapping; open-fire construction as a required competency; emergency shelter construction requiring hazardous tools/material collection; climbing/scrambling/technical terrain; caves/confined spaces; off-road driving technique; vehicle recovery; weapon use; risky tool use; intentional overnight survival; any activity requiring the learner to become genuinely lost, stranded, or distressed. (May be discussed educationally; V1 never manufactures them as experiences.)

### 10.10 Final V1 safety architecture (2H.47)
CHECK (conditions, objective, environment, readiness, access, resources) → MONITOR (environment, body, orientation, changes, boundaries) → REASSESS (Continue/Modify/Stop, when something changes) → STOP (Challenge is secondary, when boundaries fail) → ESCALATE (BADAWI exits normal learning mode, when genuine emergency exists). Wraps the competency loop OBSERVE → REASON → ACT → ADAPT → REFLECT.

### 10.11 V1 Safety Promise (2H.48)
BADAWI will never intentionally make an activity more dangerous to make it more exciting/authentic/difficult/rewarding. Where the same competency can be developed through a safer activity, BADAWI chooses the safer activity. Where conditions make a Challenge inappropriate, stopping is competence — not failure. Where BADAWI's educational scope ends, it clearly says so.

**Implementation boundary retained:** exact numerical thresholds, symptom wording, country-specific restrictions, emergency flows, and supervision rules are **not** hard-coded by the Master. They require authoritative source verification, expert/medical review, regional authority validation, legal/product review, and implementation testing before release. Example authorities referenced during Phase 2 (illustrative only — final V1 source set must be independently compiled/reviewed under §11/2I): WHO heat/health guidance, CDC/NIOSH heat-stress guidance, CDC heat-health information, CDC water-treatment guidance, US NWS lightning/flood guidance, US NPS navigation/trip-planning guidance, Qatar Ministry of Labour outdoor heat-related regulatory guidance (cited as an example of why country-local rules matter).

---

## 11. Research, Sources & Verification States — LOCKED (2I)

Governing rule: BADAWI never publishes a factual claim merely because it is plausible, traditional, widely repeated, visually convincing, or commonly found online. Every claim must answer: (1) What exactly are we claiming? (2) What type of claim? (3) What evidence supports it? (4) How confident are we? (5) When does it need rechecking?

### 11.1 Seven Claim Classes (CC1–CC7)

| ID | Class | Scope |
|---|---|---|
| CC1 | Scientific/Environmental | Climate, weather, geology, hydrology, ecology, animal behavior, plant biology, astronomy. |
| CC2 | Health/Medical/Human Performance | Heat illness, hydration, exertion, sun exposure, symptoms, physiological responses. One of the strictest standards. |
| CC3 | Operational Safety | Behavior-changing instructions (stop/enter/technique-appropriate). Very high verification standard. |
| CC4 | Geographic/Regional | Locations, landforms, environmental distribution, named places, boundaries. |
| CC5 | Historical/Cultural | Past practices, livelihoods, routes, settlement, material culture, terminology, heritage. |
| CC6 | Traditional/Local/Community Knowledge | Claims attributed to a specific community/tribe/tradition — further governed by §12 (2J). |
| CC7 | Current Local/Regulatory | Closures, permissions, protected-area rules, weather restrictions, laws — requires freshness controls. |

### 11.2 Five Source Tiers (A–E)

| Tier | Description |
|---|---|
| A | Primary Authoritative — national government authorities, official meteorological agencies, ministries, public-health authorities, civil defense, WHO-type bodies, official protected-area/site authorities, peer-reviewed research, primary historical documentation. |
| B | High-Quality Scholarly/Institutional — peer-reviewed reviews, academic books from reputable publishers, university research centers, museums/heritage research, major scientific institutions, professional field standards. |
| C | Specialist Secondary — respected specialist books, established conservation orgs, professional associations, expert technical resources, reputable ethnographic/historical scholarship. Not normally sole basis for a high-risk operational rule. |
| D | Contextual/Discovery — quality journalism, documentaries, educational sites, enthusiast orgs, travel writing. Useful to discover a source trail, not final authority. |
| E | Unverified/Informal — social media, forums, anonymous sites, unsourced blogs, AI-generated text, reposted "survival tips." May reveal a claim worth investigating but does not verify it. |

**AI is never an evidentiary source** (2I.4) — this applies to Claude/ChatGPT/Gemini/any AI system, including BADAWI's own future AI. AI may search, summarize, organize, compare sources, and flag missing evidence; every substantive claim must still trace to an external source.

### 11.3 Evidence strength by claim type (2I.5–2I.6)
- Low-risk descriptive claim: one strong authoritative source may suffice.
- Significant scientific claim: ≥1 strong primary/scientific source + corroboration where interpretation is non-trivial.
- Health/safety claim: authoritative primary guidance + independent corroboration when the claim materially changes learner behavior; wording must not exceed the source.
- High-consequence safety rule (e.g. "block the Challenge," "seek emergency assistance," "do not enter"): ideally two independent authoritative supports unless a single governing authority is clearly definitive.
- Local regulation: one current competent local authority can be definitive for its jurisdiction.
- **No blind two-source rule:** source quality/independence matters more than count; repetition of the same underlying claim across sources is not independent corroboration (2I.32).

### 11.4 Freshness/Review Classes (F0–F4)

| ID | Class | Review cadence |
|---|---|---|
| F0 | Stable | When material evidence changes (e.g. basic geology). |
| F1 | Slow Review | 2–3 years or sooner if evidence changes (ecology, regional science, historical scholarship). |
| F2 | Safety/Medical | At least annual + trigger-based whenever major authorities update guidance. |
| F3 | Regulatory/Operational | Whenever presented / current-data integration — annual static checks are insufficient. |
| F4 | Real-Time | Weather alerts, active closures, hazard warnings — must come from current authoritative data, never static curriculum copy. |

Content should carry a `VALID UNTIL / REVIEW BY` field where applicable; expired high-risk content should be disable-able, not silently left live (2I.15).

### 11.5 Research Quality status (RQ0–RQ4)

| ID | Status |
|---|---|
| RQ0 | Unresearched — concept only. |
| RQ1 | Research in Progress — evidence being collected. |
| RQ2 | Verified — core claims supported. |
| RQ3 | Reviewed — required domain/safety/regional review complete. |
| RQ4 | Production Approved — final copy, sources, safety, cultural review, visual/translation checks, versioning complete. |

**A Challenge cannot ship until RQ4.**

### 11.6 Evidence Record fields (2I.8)
Claim ID (e.g. `AP-DES-U4-014`); exact claim; Claim Class; used in Unit/Challenge; Source 1 bibliographic record + tier; supporting passage/page/section; Source 2 where applicable; geographic scope; historical period where relevant; Confidence (High/Moderate/Limited); last reviewed date; review trigger/frequency.

### 11.7 Confidence levels and language (2I.10–2I.11)
High Confidence → state directly ("X occurs…"). Moderate Confidence → qualify ("X can occur…", "Research indicates…"). Limited/Contextual → "In parts of…", "Among documented communities in…", "One documented account describes…". Unverified → not publishable as fact; stays in research backlog. Disputed → "Accounts differ…". **BADAWI tone must not be more certain than the evidence.**

### 11.8 Minimum publication gate (2I.44)
Before learner-facing release: Claim verification ✓, Source traceability ✓, Regional scope validation ✓, Safety verification where applicable ✓, Traditional/local attribution where applicable ✓, Visual verification ✓, Translation verification if localized ✓, Required expert review ✓, Review date assigned ✓. Only then Production Approved (RQ4).

### 11.9 V1 research priority order (2I.45)
1. Safety-Critical (heat, weather, water, floods/runoff, navigation, symptoms, stopping/escalation).
2. Traditional/Local Knowledge (careful sourcing, possibly external contributors).
3. Challenge Mechanics (scientific/environmental claims required for activities).
4. Supporting Regional Context (geography, ecology, history).
5. Optional Explore-More content (only after core is sound).

### 11.10 V1 Research Matrix — identified examples (2I.46)

A dedicated matrix should derive research requirements from all 28
Challenges. The Master gives named examples rather than a full 28-row
table; per §16 extraction rules, only those named examples are reproduced
below — the remaining Challenges are not assigned a Priority/Risk value
here, and none should be invented (see also §15, item 1, the "Research
Matrix" workstream, which is the eventual full-coverage exercise this table
anticipates).

| Challenge | Research need | Priority/Risk |
|---|---|---|
| Ch3 — Read the Invisible | Wind/sand/sun interpretation | Medium |
| Ch6 — Follow the Shade | Solar/exposure principles | High |
| Ch7 — Read the Conditions | Heat physiology | Critical |
| Ch8 — Where Water Moves | Flash flooding/hydrology | Critical |
| Ch9 — Water Shapes Life | Oasis/local water systems | High cultural |
| Ch15–19 — Navigation | Navigation science + local knowledge | High |
| Ch22 — Pace the Desert | Exertion/heat | Critical |
| Ch27 — Field Challenge | Integrated safety systems | Critical |

"High cultural" (Ch9) is a distinct value from plain "High" — the Master
does not equate the two, so this document does not normalize them together
(2I.46). The Master states Ch15–19 as a single range entry, not five
individual per-Challenge values; this document preserves that as given
rather than inventing an individual value per Challenge (§16 extraction
rule: ambiguity is preserved, not silently resolved). This table is a
separate axis from each Challenge's own inline "Source requirements" note
in §8 (2F) — the two do not always use the same wording (e.g. Ch7's §8
source-requirements note says "HIGH," while this Master-stated Research
Matrix entry says "Critical") because they come from different parts of
the Master and serve different purposes; neither overrides the other.

**Provenance note (added after initial extraction):** this subsection was
not present in the first pass of this document and was added in a later
correction after being identified as an omission from the original
~31,000-word Master. It is reproduced here as given, without independent
verification beyond internal consistency with the rest of this document.

### 11.11 Ten-rule Source Doctrine (2I.47, condensed)
1. AI is a research tool, never an evidentiary source. 2. Every meaningful factual claim traces to supporting evidence. 3. Source quality matters more than citation count. 4. Claims must not exceed geographic/cultural/temporal/scientific scope. 5. Safety/medical claims require the highest verification standard. 6. Local/traditional knowledge is legitimate but must remain contextualized and attributed. 7. Historical authenticity does not establish modern safety. 8. Uncertainty/disagreement is disclosed, not hidden. 9. Time-sensitive information is reviewed/retrieved at a rate matching its change rate. 10. BADAWI corrects or disables content when evidence no longer supports it.

Evidence ladder: **QUESTION → RESEARCH → VERIFY → CONTEXTUALIZE → REVIEW → PUBLISH → RECHECK.**

Other locked rules worth flagging for implementers: claim granularity — break claims into smallest supportable components (2I.7); citation ≠ verification — a cited source may not actually support the precise claim in context (2I.30); no citation laundering — trace to original evidence rather than a blog citing an article (2I.31); Survival Myth Audit required before including any "commonly known" technique (2I.33); scientific and traditional claims may coexist as *separate* questions — historical/knowledge claim vs. modern scientific-reliability claim (2I.34); AI-generated educational visuals still require human subject-matter review (2I.36); translation workflow = source meaning verification → translation → fluent human review → terminology review → safety review where relevant (2I.37).

---

## 12. Traditional / Local / Tribal Knowledge Governance — LOCKED (2J)

Governing principle: traditional/local/tribal knowledge is not decorative content — it is knowledge held in social, geographic, historical, and sometimes restricted contexts, and BADAWI must preserve those contexts. **Publicly available ≠ automatically ethically free to use** (2J.2) — legal availability and ethical appropriateness are separate review questions.

### 12.1 Knowledge categories (TK1–TK5)

| ID | Category |
|---|---|
| TK1 | Publicly documented traditional practice (navigation, water management, material adaptations, environmental observation, etc.) |
| TK2 | Local ecological knowledge (place-specific weather/terrain/water/plants/animals/seasons/movement) |
| TK3 | Community/tribal knowledge (explicitly associated with a particular community/tribe/lineage/region) |
| TK4 | Contemporary lived knowledge (current guides, pastoralists, farmers, fishers, craftspeople, elders — traditional knowledge is not necessarily historical) |
| TK5 | Restricted/sensitive knowledge (private, sacred, ceremonial, gender-specific, lineage-specific, commercially/location/environmentally sensitive — generally not suitable for BADAWI without explicit informed authorization) |

### 12.2 Knowledge Permission levels (KP1–KP4)

| ID | Level |
|---|---|
| KP1 | Open/Public — normal sourcing/attribution. |
| KP2 | Public but Attribution-Sensitive — community/location attribution must be retained. |
| KP3 | Permission Required — do not publish until permission is recorded. |
| KP4 | Restricted/Do Not Publish. |

Permanent rule: **BADAWI does not need every interesting piece of knowledge it discovers — sometimes responsible research ends with "do not publish this."**

### 12.3 Attribution Basis categories (AT1–AT5)

| ID | Basis |
|---|---|
| AT1 | Scholarly documented |
| AT2 | Institutional/heritage documented |
| AT3 | Multiple community sources |
| AT4 | Single contributor (legitimate but narrowly scoped) |
| AT5 | Oral tradition/uncertain attribution (preserve contextually, do not generalize) |

### 12.4 Knowledge Sensitivity levels (KS0–KS4)

| ID | Level |
|---|---|
| KS0 | No special sensitivity — normal public material. |
| KS1 | Attribution-sensitive — use only with correct context. |
| KS2 | Permission-sensitive — explicit authorization required. |
| KS3 | High sensitivity — publication needs exceptional justification + community review. |
| KS4 | Restricted — do not publish. |

### 12.5 Traditional-Practice Delivery categories (TP1–TP3)

| ID | Category | Requirement |
|---|---|---|
| TP1 | Context Only | Learner learns about the practice, does not perform it. |
| TP2 | Safe Adapted Learning | Safe modern activity demonstrates the underlying principle without pretending to recreate original context. |
| TP3 | Direct Practice | Learner performs an authentic/substantially authentic technique — requires strong sourcing, safety validation, legal/environmental appropriateness, no restriction issue, cultural permission where necessary. |

**V1 should use TP1/TP2 far more often than TP3.** If a technique is adapted, say so explicitly ("This activity is adapted from principles documented in…") — never claim it is the exact historical/community practice (2J.37).

### 12.6 "Bedouin" usage test (2J.5)
Before using "Bedouin," ask: (1) Does the source specifically refer to Bedouin communities? (2) Which community/location? (3) Which period? (4) Is the practice actually nomadic/pastoral, or is this a lazy label for any desert practice? (5) Is a more precise description available? Use specificity where evidence allows it. Never manufacture one universal "Bedouin system" by combining navigation from one region, water practice from another, clothing from a third (2J.4).

### 12.7 Consent, compensation, and review (2J.13–2J.20)
- Informed consent for direct contributors must cover: who BADAWI is, product purpose, what is recorded, how knowledge may be used, commercial use, naming/community attribution, media use, anonymity options, compensation, restriction options. "Can we interview you?" alone is insufficient.
- Consent should be **granular** (separate permissions for quote/paraphrase/audio/video/photograph/name/community attribution/commercial use/educational use/future Packs).
- Contributors need reasonable mechanisms to correct misrepresentation, update attribution, raise concerns, and request removal.
- **Compensation should be the norm**, not assumed unpaid cultural labor, when BADAWI materially benefits from someone's time/expertise/community knowledge.
- **Community review triggers** when content: names a living tribe/community; describes contemporary practice; depicts distinctive clothing/material culture; uses local terminology prominently; explains traditional environmental knowledge; presents oral knowledge; claims cultural significance; could affect reputation/identity. Review intensity matches representation risk — not every historical sentence needs a committee.
- **Who speaks for a community?** One person is not automatically a representative of an entire tribe/community — "in my family/area" must not be silently generalized to "the community believes" (2J.18).

### 12.8 Representation rules
- Traditional ≠ primitive; avoid "old-fashioned," "primitive," "pre-scientific," "mysterious," "magical," "clever hacks" (2J.8).
- Traditional ≠ automatically scientifically correct — BADAWI may say "Historical/local accounts describe X. Contemporary evidence does not establish X as a reliable method." (2J.9)
- No "culture-as-survival-hacks" sensational framing (e.g. "Ancient Bedouin Trick to Find Water") (2J.11).
- No gender erasure — don't center only male-coded themes (navigation, camels, hunting); include water, plants, food systems, textiles, shelter, household adaptations, childcare, medicinal traditions, animal care where safely/properly sourced (2J.22).
- No exoticism — avoid "mysterious desert wanderers," "timeless nomads," "noble savages," "costumes in a landscape" (2J.23).
- No tokenism — RI4 appears only when it improves understanding; some Challenges may contain no local knowledge (2J.24).
- Historical ≠ contemporary — tag claims as Historical / Contemporary / Continuing tradition / Uncertain-variable (2J.7).
- No disputed-origin claims ("X tribe invented Y," "this is the oldest") unless strong evidence + educational value exist (2J.43).
- Heritage sites: teach settlement/movement/water/trade/adaptation, but never incentivize climbing ruins, removing artifacts, disturbing sites, entering restricted areas, or sharing sensitive archaeological coordinates (2J.30).
- Location-sensitive knowledge (rare species, archaeological sites, vulnerable water sources, grazing areas, culturally sensitive spaces): verification may justify showing *less* information, not more (2J.31).
- Storytelling must distinguish: Documented account / Oral tradition (explicitly labeled) / Folklore-legend (not literal fact) / Fictional learner narrative (clearly fictional) — never quietly turn folklore into environmental instruction (2J.32).

### 12.9 AI and cultural representation (2J.35)
BADAWI must not use generative AI to invent a supposedly authentic named tribe/community member, garment, ritual, or historical scene and present it as culturally accurate without expert verification. Particularly risky: invented tribal dress, mixed regional clothing, fabricated motifs, incorrect headwear, hybrid architecture, imaginary "traditional symbols." This directly constrains Phase 3 visual/character/pattern work (see §14).

### 12.10 Cultural IP principle (2J.45–2J.46)
Some knowledge/patterns/designs/motifs/stories/symbols/names/practices carry collective cultural ownership/expectations even where conventional IP law is limited — "legally unprotected" ≠ "ethically available for unlimited commercial use." If authenticity of a motif/pattern cannot be established: **prefer original abstract environmental forms over fake cultural specificity.**

### 12.11 Fourteen red lines BADAWI must never cross (2J.50)
1. Invent a traditional practice. 2. Attribute knowledge to a tribe/community without evidence. 3. Use "Bedouin" as shorthand for all Arabian traditional knowledge. 4. Publish restricted/sensitive knowledge without authorization. 5. Represent a historical practice as universally contemporary. 6. Turn local knowledge into sensational survival hacks. 7. Treat traditional knowledge as automatically scientifically validated. 8. Dismiss traditional knowledge merely because it's oral or absent from Western scholarship. 9. Use community knowledge commercially while obscuring its source. 10. Use AI-generated cultural representation as evidence of authenticity. 11. Combine unrelated regional practices into a fictional pan-Arabian tradition. 12. Make a learner perform a culturally derived practice when safe/contextual learning is more appropriate. 13. Publish sensitive locations merely because BADAWI knows them. 14. Ignore credible correction because content already shipped.

### 12.12 Knowledge relationship workflow (2J.51)
**LISTEN → LOCATE → VERIFY → PERMISSION → ATTRIBUTE → CONTEXTUALIZE → ADAPT RESPONSIBLY → REVIEW → ACKNOWLEDGE.** BADAWI teaches *with* the knowledge, never claims to have invented it (2J.39).

### 12.13 V1 strategy (2J.48–2J.49)
Conservative approach: rely heavily on high-confidence, publicly documented knowledge; add carefully selected regional/local expert review; deepen through community partnerships over time. **Less local knowledge represented properly is better than lots of shallow "heritage content."** Suggested strong early areas: water (management, settlement adaptation, oasis systems), navigation (celestial/landscape traditions with precise attribution), climate adaptation (shelter, timing, clothing/material principles), environmental observation (place-based terrain/plant/animal/weather knowledge), movement/routes (historical travel/trade/pastoral context).

---

## 13. V1 Omissions & Boundaries — LOCKED

### 13.1 What Pack completion deliberately does not claim (2C)
Completion does **not** imply competence in: solo desert survival; emergency medicine; advanced wilderness first aid; advanced navigation; extreme heat exposure; remote expedition planning; advanced off-road driving; technical climbing; dangerous wildlife handling; consuming unidentified wild plants; drinking untreated natural water; hunting/trapping; advanced fire-making under hazardous conditions; prolonged unsupported desert travel; emergency rescue; professional guiding. Some topics may be discussed educationally — "learning about something ≠ BADAWI authorizing the learner to perform it."

### 13.2 No "survival hacks" rule (2C)
BADAWI avoids sensational "10 Desert Survival Tricks" content. If a technique only works under particular conditions, say so; if evidence is uncertain, say so; if a practice is local, identify it as local. BADAWI teaches principles, observation, reasoning, limitations, and context — not tricks.

### 13.3 Formally prohibited practical Challenge categories
See §10.9 (2H.46) — reproduced there in full; this is the authoritative boundary on what V1 will never require as a graded practical activity.

### 13.4 Intentional curriculum omissions confirmed during 2E
- **Shelter:** teach shelter/protection principles and site choice, but "build an emergency desert shelter" is not a core V1 competency. Advanced shelter construction may belong in a later Pack.
- **Fire:** no core "make a desert fire" Challenge in V1 (legal, environmental, injury risk; limited value to foundational desert literacy).
- **Food procurement:** no edible-plant foraging, hunting, trapping, or starvation simulation. Ecology is learned through observation, not consumption.

### 13.5 Real-world access framing
Desert access does not require dangerous remoteness — activities should be possible in safe desert recreation areas, accessible natural landscapes, controlled camps, outdoor education locations, appropriate outskirts/natural areas, and supervised environments. BADAWI must not imply authentic learning requires driving far into an uninhabited desert.

---

## 14. Locked vs Working vs Unverified — LOCKED (2K.17)

This distinction governs what an engineer may treat as fixed vs what remains subject to future revision through the normal (non-casual) channels.

### LOCKED — Curriculum architecture
Competency framework; competency levels; Region framework; RK domains; DLOs; the six Units; the 28 Challenge purposes/specifications; Challenge progression; assessment model; evidence model; safety framework; research/verification standard; traditional/local knowledge governance; V1 scope boundaries.

### NOT FINAL — Learner-facing wording
Working copy only, freely improvable by Phase 3/production **without changing the underlying learning objective**: Challenge titles; Unit titles; exact prompts; instructional copy; reflection wording; feedback wording; safety-message wording.

### NOT FINAL — Verified factual content
Requires research before shipping: exact historical practices; local navigation techniques; named ecological examples; heat thresholds; local safety requirements; medical language.

### NOT FINAL — Product implementation
Later work, not defined by Phase 2: GPS integration; weather integration; evidence-upload UI; Field Mode interaction; offline behavior; emergency UI; accessibility mechanisms; competency visualization; Pack map; badges; animations.

**Meaning of "locked" (2K.18):** locked decisions are not casually reopened. They may be reopened only for: (1) new research demonstrating inaccuracy, (2) safety review exposing unacceptable risk, (3) community/cultural review identifying a substantive representation problem, (4) usability testing showing the learning objective cannot work as designed, (5) evidence from real learners demonstrating a significant curriculum flaw, or (6) a material product contradiction that cannot be resolved without revision. Per `CLAUDE.md`, Claude may challenge a locked decision but must not silently override it — surface the conflict instead.

---

## 15. Five Pre-Production Content Workstreams — LOCKED (2K.19)

These are production work *generated by* Phase 2, not new architecture questions. All five remain outstanding before V1 can ship:

1. **Research Matrix** — convert all 28 Challenges into claim/research requirements (per §11/2I).
2. **Safety Verification** — populate §10 (2H) with authoritative operational rules (thresholds, symptom wording, country-specific restrictions, emergency flows, supervision rules).
3. **Regional Knowledge Research** — populate RK content (§4) with accurate, sourced Arabian Peninsula examples.
4. **Traditional/Local Knowledge Review** — add carefully selected, attributed content under §12 (2J) governance.
5. **Final Content Writing** — turn curriculum specs into polished learner-facing content only after evidence is complete (RQ4 per §11.5).

Nothing in this repository should treat curriculum copy, safety thresholds, or cultural content as production-ready until the relevant workstream above has been completed and the content has reached **RQ4 — Production Approved**.

---

## 16. Known Ambiguities in the Master (flagged, not resolved)

Per extraction rules, ambiguities are surfaced here rather than silently resolved:

### 16.1 Unit 2 progression — conflicting statements
- **§2E ("Unit 2 — Heat, Weather & Water")** states the Unit 2 progression as: **FEEL → OBSERVE → CONNECT → PLAN → JUDGE**.
- **§2F ("2F final architecture" table)** states it as: **Observe Change → Evaluate → Read → Connect → Judge**.

These do not match (different verbs, different count/order of stages), and neither section cross-references the other. All other five Units' progression statements in §2E and §2F agree exactly. This appears to be an internal inconsistency in the Master, not an intentional dual-framing. **Do not silently pick one** — flag for curriculum-authority clarification before this progression string appears in shipped UI or internal tooling.

### 16.2 Unit 5 core question — two phrasings, not clearly a conflict
§2D phrases Unit 5's core question as "How should the environment change the way I move and act?"; §2E phrases it as "How should what I observe change how I move?" These are close enough in meaning that they may simply be the same idea restated across two drafting passes rather than a substantive conflict — included here for completeness, lower concern than §16.1.

### 16.3 Challenge 28 source-requirement level not stated
Every other Challenge (1–27) has an explicit "Source requirements" line in §2F. Challenge 28 does not. This document does not invent one (see §8, Challenge 28) — treat source requirements for Challenge 28 as inherited from Pack-wide content already sourced elsewhere until the Research Matrix workstream (§15, item 1) addresses it explicitly.

### 16.4 Challenge 27 duration not hard-locked
The Master explicitly states Challenge 27's estimated commitment ("likely 45–90 minutes") is *not* to be hard-locked until safety and implementation design are complete (§2F, Challenge 27). This is not an ambiguity to resolve — it is an intentionally open value; flagged here so it isn't mistaken for a firm spec during implementation.

### 16.5 §11.10 (2I.46) added after initial extraction — not independently re-verified
The first pass of this document omitted 2I.46 ("V1 Research Matrix after Phase 2"), which was later identified and added as §11.10. Unlike the rest of this document, that addition was not produced by re-reading the full Master end-to-end in this session — it was transcribed from the specific excerpt supplied at correction time. It is internally consistent with the rest of the Master as extracted here (its priority order restates §11.9/2I.45 exactly, and its companion 2I.47 excerpt matches the already-extracted §11.11 word-for-sense), which is why it was accepted, but if the Master is ever re-read in full, §11.10 specifically should be the first section double-checked against the original.
