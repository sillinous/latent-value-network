# WD-007 — LVN Metamodel & Typed Ontology
## A Formal Conceptual Architecture for Post-Labor Cooperative Infrastructure

**Status:** Working Draft v0.1  
**Authors:** LVN Initiative  
**License:** CC BY-SA 4.0  
**Companion docs:** WD-001 (White Paper), WD-002 (Evidence Base), WD-003 (Signal Protocol), WD-005 (Trust Fabric), WD-006 (Governance)

---

## Preface: Why This Document Exists

The existing working documents define *what* the LVN does and *how* its protocol layers function. What they don't yet provide is a formal answer to: *what are the things in this world, what types are they, and what precise relationships hold between them?*

Without a metamodel, every working group reasons from its own implicit schema. Engineers model agents differently than economists do. Community practitioners use "trust" to mean something categorically different from cryptographers. This document establishes the shared conceptual substrate — the typed ontology — from which all working documents, implementations, and governance structures derive.

This is also the first document to situate LVN inside the broader Post-Labor Economics intellectual landscape. LVN is not a standalone idea; it is a specific protocol-layer answer to a macro-structural shift. The metamodel must reflect that.

---

## Part I: Synthesis — What LVN Actually Models

Before defining the metamodel, an honest account of the current model's scope and its gaps.

### 1.1 What the Current Architecture Models Well

The five protocol layers (WD-001 through WD-006) together model:

- **Agents as nodes** with capabilities, needs, and contextual AI representations
- **Privacy-preserving signals** as the bridge between private context and public matching
- **Complementarity** (not similarity) as the matching criterion
- **Relational trust** as chains of vouching rather than centralized scores
- **Commons governance** via Ostrom's eight principles

These are genuinely strong design choices. The complementarity-over-similarity distinction alone separates this from every existing platform. The governance model is among the most sophisticated attempts to operationalize Ostromian principles in a digital protocol.

### 1.2 What the Current Architecture Does Not Yet Model

Seven structural gaps require the metamodel to address them explicitly:

**Gap 1 — Temporality.** Every entity in the current model is implicitly static. But capacities atrophy or deepen. Needs emerge and resolve. Trust builds and erodes. A retired engineer's HVAC expertise was formed over decades and may decay without practice. A new parent's needs change radically within months. The model needs temporal attributes and decay/growth functions on every entity type.

**Gap 2 — Emergence.** Cooperative acts don't merely transfer value; they *generate* new capacities and reveal new needs. Maria helps James with his drainage problem. James now holds basic drainage knowledge — a new latent capacity. James, grateful, tells three neighbors. Maria discovers she loves teaching practical skills to people who genuinely need them — a new *identity element* she didn't have before. The model treats cooperation as a terminus when it is actually a generative process.

**Gap 3 — Power and Value Capture.** The current model assumes cooperative matches are mutually beneficial by construction. Real exchanges have power differentials. Who articulates the terms? Who can afford to walk away? Whose time is implicitly worth less? The least-connected people, who need the network most, may become dependent on the most-connected in ways that replicate existing inequities. This is not a peripheral concern — it is the central equity risk of the entire project.

**Gap 4 — Meaning as a First-Class Value.** Post-Labor Economics is not primarily about economic efficiency; it is about human flourishing in a world where wage labor no longer structures social life and identity. The current model treats purpose, belonging, and meaning as byproducts of economic exchange. They should be primary entities. Maria's retirement purposelessness is not incidental context; it is a *latent need of the highest order*, and "feeling useful again" is a *value type* as real as skill transfer.

**Gap 5 — The Labor Market Interface.** The current model treats the formal labor economy as background context. But the transition to post-labor is a structural process, not a clean break. LVN must model the relationship between cooperative exchange and formal employment — whether they are complementary, substitutive, or phase-dependent. A person who finds deep cooperative engagement through LVN may reduce labor market participation, which affects their income, which affects their cooperation capacity. These feedback loops are load-bearing.

**Gap 6 — Failure Mode Formalization.** The site names five failure cascade layers (cognitive blindness, homophily, market failure, institutional gap, scale mismatch) but treats them as narrative explanation rather than as typed entities in the model. To observe, measure, and intervene in failure, failure modes must be first-class objects with attributes, causes, effects, and remediation relationships.

**Gap 7 — Negative Outcomes.** The model currently has no representation of defection, exploitation, harm, or bad-faith matching. Any protocol designed for real-world adoption must model the full outcome distribution, not only the cooperative ideal. Ignoring negative outcomes in the ontology guarantees they will be under-designed for in the implementation.

---

## Part II: The Metamodel — Entity Type System

### 2.1 Type Hierarchy Overview

```
LVN_ENTITY
├── AGENT                    # Active participants
│   ├── Person
│   ├── Community
│   ├── Institution
│   └── AIComponent
│       ├── PersonalContextEngine
│       ├── RelayNode
│       └── GovernanceAgent
├── VALUE_ELEMENT            # What flows through the network
│   ├── Capacity
│   │   ├── ExplicitCapability
│   │   ├── LatentCapacity
│   │   │   ├── TacitKnowledge
│   │   │   ├── ExperientialWisdom
│   │   │   └── InformalSkill
│   │   ├── ResourceHolding
│   │   ├── NetworkPosition
│   │   └── AttentionalCapacity
│   ├── Need
│   │   ├── ExplicitNeed
│   │   ├── LatentNeed
│   │   ├── UnarticuatedNeed
│   │   └── EmergentNeed
│   └── MeaningElement       # NEW — PLE-critical
│       ├── Purpose
│       ├── Belonging
│       ├── Recognition
│       └── AgencyExpression
├── SIGNAL_ARTIFACT          # Privacy layer representations
│   ├── ContextBundle
│   ├── SignalVector
│   │   ├── CapacityDimensions
│   │   └── NeedDimensions
│   ├── BloomFilter
│   ├── ComplementarityScore
│   └── PrivacyBudget
├── EXCHANGE_EVENT           # What happens when agents connect
│   ├── CooperativeAct
│   │   ├── GiftExchange
│   │   ├── DirectReciprocity
│   │   ├── IndirectReciprocity
│   │   └── GeneralizedExchange
│   ├── MissingExchange      # The gap — critically first-class
│   ├── NegativeOutcome      # NEW
│   │   ├── Defection
│   │   ├── Exploitation
│   │   └── Harm
│   └── PlatformExchange     # Legacy market mediation
├── TRUST_ARTIFACT           # The social glue
│   ├── TrustRelation
│   │   ├── DirectTrust
│   │   ├── RelationalTrust
│   │   └── InstitutionalTrust
│   ├── TrustContext
│   ├── ReputationRecord
│   └── VouchChain
├── FAILURE_MODE             # NEW — first-class
│   ├── CognitiveBias
│   │   ├── CurseOfKnowledge
│   │   ├── MetaIgnorance
│   │   └── InverseExpertiseBlindness
│   ├── StructuralBarrier
│   │   ├── Homophily
│   │   ├── AlgorithmicReinforcement
│   │   └── DunbarLimitExhaustion
│   ├── EconomicBarrier
│   │   ├── MissingMarket
│   │   ├── TransactionCostExcess
│   │   └── UnpricedValue
│   └── InstitutionalGap
├── GOVERNANCE_ELEMENT       # Protocol stewardship
│   ├── ProtocolRule
│   │   ├── ConstitutionalRule
│   │   ├── CollectiveChoiceRule
│   │   └── OperationalRule
│   ├── AntiCaptureMechanism
│   │   ├── TermLimit
│   │   ├── FundingCap
│   │   ├── ForkingRight
│   │   └── EquityVeto
│   └── EquityMonitor
└── PLE_CONTEXT              # Macro structural frame
    ├── LaborMarket
    ├── PostLaborTransition
    ├── AutomationWave
    ├── MutualAidNetwork
    ├── CooperativeEconomy
    ├── MeaningEconomy
    └── PolicyInstrument
        ├── UniversalBasicIncome
        ├── TimeBanking
        └── CommonsDividend
```

---

### 2.2 Typed Entity Definitions

Each entity type carries a schema. The following uses a concise notation:
- `attr:Type` — required attribute
- `attr?:Type` — optional attribute
- `attr[]:Type` — array attribute
- `[min..max]` — cardinality constraint

---

#### AGENT :: Person

The fundamental unit of cooperative potential. A Person is not merely a user profile — it is the full context of a human being embedded in social, economic, and cognitive reality.

```
Person {
  id:              UUID
  contextBundle:   ContextBundle           // owned by PersonalContextEngine
  capacities[]:    Capacity                // [0..n]
  needs[]:         Need                    // [0..n]
  meaningElements[]: MeaningElement        // [0..n] — often the most urgent
  socialPosition:  SocialPosition          // class, network centrality, etc.
  dunbarGroup[]:   Person[]               // the ~150 people in cognitive range
  trustRelations[]: TrustRelation         // [0..n]
  laborStatus:     LaborStatus            // employed|unemployed|retired|gig|disengaged
  transitionStage: PLETransitionStage     // pre|early|mid|post-labor orientation
  timeHorizon:     TemporalHorizon        // planning horizon affecting cooperation risk-tolerance
  privacyBudget:   PrivacyBudget          // epsilon — how much can be disclosed
  createdAt:       Timestamp
  lastActive:      Timestamp
}

LaborStatus = enum { employed | underemployed | unemployed | retired | 
                     gig_dependent | gig_supplemental | fully_disengaged }

PLETransitionStage = enum { labor_anchored | transitioning | 
                             post_labor_oriented | meaning_economy_native }
```

**Design note:** `transitionStage` is not demographic — it captures a person's *orientation* toward the post-labor transition. A 25-year-old fully employed in tech may be `labor_anchored`; a 60-year-old retiree who volunteers everywhere is effectively `post_labor_oriented`. This matters enormously for how the system surfaces matches and what value types it prioritizes.

---

#### AGENT :: Community

Communities are not just collections of people. They are structured social environments with distinct trust topologies, tie-strength distributions, and failure mode profiles.

```
Community {
  id:              UUID
  type:            CommunityType
  size:            Integer
  members[]:       Person[]
  institutions[]:  Institution[]
  boundaryType:    BoundaryType
  tieDistribution: TieDistribution       // ratio of weak:strong ties
  crossClassIndex: Float [0..1]          // Chetty: key predictor of mobility
  trustDensity:    Float [0..1]          // average trust level across member pairs
  dominantFailureModes[]: FailureMode[]  // which failure modes most afflict this community
  pilotStatus:     PilotStatus
  governedBy?:     GovernanceElement[]
}

CommunityType = enum { 
  geographic_neighborhood | geographic_rural | geographic_urban |
  affinity_online | affinity_professional | affinity_cultural |
  institutional_nonprofit | institutional_mutual_aid |
  cooperative_formal | cooperative_informal
}

BoundaryType = enum { hard | permeable | fluid | distributed }
```

**Design note:** `crossClassIndex` is the single highest-leverage community attribute per Chetty's research. Communities with low cross-class connection are the most urgent intervention targets — and the hardest to change. The metamodel must track this explicitly.

---

#### AGENT :: AIComponent :: PersonalContextEngine

The sovereign AI agent that holds a person's contextual understanding. Critically: it never transmits the ContextBundle itself, only derived SignalVectors.

```
PersonalContextEngine {
  id:              UUID
  owner:           Person                // 1:1 — sovereign to the person
  contextBundle:   ContextBundle         // private, never transmitted
  signalHistory[]: SignalVector[]        // what has been emitted
  matchHistory[]:  ComplementarityScore[] // what has been returned
  disclosureLog[]: DisclosureEvent[]     // progressive disclosure audit trail
  localModel:      ModelVersion          // which embedding model is in use
  privacyBudget:   PrivacyBudget         // epsilon tracking across all emissions
  consentRecord:   ConsentRecord         // explicit agent authorization
}
```

---

#### VALUE_ELEMENT :: Capacity (abstract supertype)

All capacity subtypes share this schema. The most important attributes are `visibility` (is the person aware they have it?) and `confidence` (how certain is the AI assessment?).

```
Capacity {
  id:              UUID
  holder:          Agent                 // usually Person
  domain:          CapacityDomain        // from cooperative taxonomy v0.1
  description:     String
  visibility:      VisibilityLevel       // latent | partial | explicit
  confidence:      Float [0..1]          // AI certainty in the assessment
  depth:           DepthLevel            // surface | working | expert | master
  transferability: TransferabilityLevel  // highly_contextual | moderate | general
  temporalState:   TemporalState         // active | atrophying | growing | dormant
  evidenceSource[]: EvidenceSignal[]     // what signals led to its detection
  lastValidated:   Timestamp
  decayRate?:      Float                 // optional: how fast does it atrophy without use?
}

VisibilityLevel = enum { latent | partial | explicit }
DepthLevel      = enum { surface | working | expert | master }
TemporalState   = enum { active | atrophying | growing | dormant | transferred }
```

#### VALUE_ELEMENT :: Capacity :: LatentCapacity

The subtype that defines the LVN's core proposition. A LatentCapacity is a Capacity where `visibility = latent` — the holder does not recognize it as valuable to others.

```
LatentCapacity extends Capacity {
  visibility:       VisibilityLevel = latent   // fixed
  discoveryMethod:  DiscoveryMethod            // how the AI surfaced it
  curseOfKnowledge: Float [0..1]               // estimated degree of expert blindness
  socialProof?:     EvidenceSignal[]           // external confirmation it has value
  promoteToExplicit?: Boolean                  // flag: worth surfacing to the holder?
}

DiscoveryMethod = enum {
  conversation_pattern | problem_solving_trace | 
  self_description_inference | peer_attestation | 
  behavioral_signal | expertise_gap_reversal
}
```

---

#### VALUE_ELEMENT :: Need

```
Need {
  id:              UUID
  holder:          Agent
  domain:          NeedDomain
  description?:    String                // may not be articulable
  articulability:  ArticulabilityLevel   // explicit | partial | latent | emergent
  urgency:         Float [0..1]
  temporalWindow:  TemporalWindow        // when must this be met?
  substitutability: Float [0..1]         // can market alternatives satisfy it?
  meaningWeight:   Float [0..1]          // how much does meeting this contribute to flourishing vs. utility?
}

ArticulabilityLevel = enum { explicit | partial | latent | emergent | unarticulated }
```

---

#### VALUE_ELEMENT :: MeaningElement — NEW

This is the most important addition to the current model. In a post-labor world, purpose, belonging, and recognition are not byproducts of exchange — they are primary goods that many people are acutely short of and cannot obtain through market mechanisms.

```
MeaningElement {
  id:              UUID
  holder:          Person
  type:            MeaningType
  currentLevel:    Float [0..1]          // experienced level
  desiredLevel:    Float [0..1]          // aspired level
  gap:             Float                 // desiredLevel - currentLevel = latent need
  socialSource?:   Agent                 // who/what currently provides this
  vulnerabilityIndex: Float [0..1]       // risk of losing current source
}

MeaningType = enum { 
  purpose          | // sense that one's activities matter
  belonging        | // felt membership in a community
  recognition      | // being seen and valued for contributions
  agency_expression| // ability to act on one's values and interests
  competence       | // experience of growing mastery
  generativity     | // contributing to something beyond oneself
  narrative_identity  // coherent story of who one is and why
}
```

**Design note:** Maria's retirement "purposelessness" is a `MeaningElement` of type `purpose` and `generativity` with `currentLevel ≈ 0.2` and `gap ≈ 0.6`. James's woodworking-for-the-library match doesn't just solve Maria's drainage problem — it addresses her `generativity` gap. This is the hidden reason the connection is so valuable and so sticky. Without modeling MeaningElements, the system can only optimize for task completion. With it, it can optimize for flourishing.

---

#### SIGNAL_ARTIFACT :: SignalVector

```
SignalVector {
  id:              UUID
  sourceAgent:     Person               // never transmitted with the vector
  emittedBy:       PersonalContextEngine
  emittedAt:       Timestamp
  capacityDimensions: Float[]           // compressed representation of capacity space
  needDimensions:  Float[]              // compressed representation of need space
  bloomFilter:     BloomFilter          // membership-test without exposure
  privacyEpsilon:  Float               // differential privacy parameter consumed
  semanticHash:    Hash                 // for deduplication without content exposure
  expiresAt:       Timestamp            // signals are not permanent
  progressiveDisclosureTier: Integer [1..5]  // 1=most anonymous, 5=fully identified
}
```

---

#### EXCHANGE_EVENT :: CooperativeAct

```
CooperativeAct {
  id:              UUID
  participants[]:  Agent[]              // [2..n]
  type:            ExchangeType
  domain[]:        CapacityDomain[]
  capacitiesExchanged[]: Capacity[]
  needsMet[]:      Need[]
  meaningElementsAddressed[]: MeaningElement[]   // NEW — often the real outcome
  initiatedAt:     Timestamp
  completedAt?:    Timestamp
  outcome:         OutcomeAssessment
  reputationGenerated[]: ReputationRecord[]
  emergentCapacities[]: Capacity[]     // NEW — what was created that didn't exist before
  emergentNeeds[]:  Need[]             // NEW — what new needs arose through the act
  powerBalance:    Float [-1..1]       // -1 = fully A-favoring, 0 = symmetric, +1 = B-favoring
  followOnProbability: Float [0..1]    // likelihood of future cooperation
}

ExchangeType = enum { 
  gift | direct_reciprocity | indirect_reciprocity | 
  generalized_exchange | market_hybrid | mentorship |
  collaborative_creation | mutual_aid
}
```

---

#### EXCHANGE_EVENT :: MissingExchange — The Gap as a First-Class Entity

This is the most conceptually important entity in the entire ontology. The LVN's purpose is to eliminate MissingExchanges. To do that, they must be modeled explicitly — not just as an absence, but as a structured failure with a traceable cause.

```
MissingExchange {
  id:              UUID
  potentialParticipants[]: Agent[]     // inferred or hypothetical
  capacityAvailable:  Capacity         // what existed but wasn't found
  needUnmet:          Need             // what needed to be met
  estimatedValue:     ValueEstimate    // what would have been created
  primaryCause:       FailureMode      // which failure mode was decisive
  contributingCauses[]: FailureMode[]  // secondary factors
  detectionMethod:    DetectionMethod  // how was the gap identified?
  remediable:         Boolean          // could intervention have prevented this?
  geographicProximity?: Distance       // how close were the parties?
  temporalWindow:     TemporalWindow   // when would the match have been timely?
}

ValueEstimate {
  economicValue?:   Float              // avoided cost or created economic value
  meaningValue?:    Float              // flourishing impact
  communityValue?:  Float              // network externality
  confidence:       Float [0..1]
  methodology:      EstimationMethod
}
```

**Design note:** The $1.3T "Latent Value Gap" statistic is an aggregate of MissingExchange.estimatedValue across all instances. Building this into the ontology makes the gap measurable at the protocol level, not just in research papers.

---

#### EXCHANGE_EVENT :: NegativeOutcome — NEW

```
NegativeOutcome {
  id:              UUID
  type:            NegativeOutcomeType
  participants[]:  Agent[]
  description:     String
  severity:        Severity             // minor | moderate | serious | critical
  affectedParty:   Agent               // who was harmed
  causedBy:        Agent               // who caused harm (if attributable)
  trustImpact[]:   TrustRelation[]     // which trust relations were damaged
  governanceResponse?: ProtocolRule[]  // what rules were triggered
  appealed:        Boolean
  resolved:        Boolean
  resolution?:     ResolutionRecord
}

NegativeOutcomeType = enum { 
  defection | exploitation | deception | privacy_violation |
  power_abuse | discriminatory_matching | reputational_harm
}
```

---

#### FAILURE_MODE — All Types (First-Class)

```
FailureMode {
  id:              UUID
  type:            FailureModeType
  affectedAgents[]: Agent[]
  affectedCommunities[]: Community[]
  severity:        Float [0..1]
  prevalence:      Float [0..1]         // how common in this context
  detectability:   Float [0..1]         // how observable is this failure?
  remediations[]:  Remediation[]        // what interventions address it?
  compoundsWith[]: FailureMode[]        // which other failures amplify this one?
  evidenceBase[]:  Citation[]           // academic grounding
}
```

The five canonical failure modes from WD-001, typed:

```
CurseOfKnowledge extends FailureMode {
  // "The skills that feel most natural are most invisible"
  expertiseDepth:  Float               // higher depth → higher curse
  domain:          CapacityDomain
  remediation:     [ AI_surfacing, peer_attestation, reflection_prompts ]
}

Homophily extends FailureMode {
  // "We cluster with similar others"
  similarityDimension: SimilarityDim  // class | geography | culture | profession
  networkEnforcement:  Boolean         // are algorithms reinforcing it?
  remediation:     [ complementarity_matching, bridge_agent_introduction ]
}

MissingMarket extends FailureMode {
  // "Markets can't discover unarticulated exchanges"
  articulabilityBarrier: Float         // how hard is it to put a price on this?
  transactionCostRatio:  Float         // discovery cost / expected return
  remediation:     [ ambient_matching, meaning_exchange_protocol ]
}

InstitutionalGap extends FailureMode {
  // "Nobody's job to find these connections"
  responsibleInstitution?: Institution // who *should* own this?
  coverageVacuum:          Boolean
  remediation:     [ relay_node_deployment, community_coordinator_role ]
}

DunbarLimitExhaustion extends FailureMode {
  // "Cooperative instincts evolved for 150 people"
  communitySize:   Integer             // actual size
  dunbarNumber:    Integer = 150       // cognitive limit
  overflowRatio:   Float               // communitySize / 150
  remediation:     [ AI_prosthetic_perception, community_segmentation ]
}
```

---

#### TRUST_ARTIFACT :: TrustRelation

```
TrustRelation {
  id:              UUID
  truster:         Agent
  trustee:         Agent
  type:            TrustType
  context:         TrustContext         // trust is ALWAYS contextual
  strength:        Float [0..1]
  basis:           TrustBasis           // how was this trust established?
  vouchChain?:     VouchChain           // for relational trust
  lastValidated:   Timestamp
  decayRate:       Float                // trust erodes without reinforcement
  privacyLevel:    PrivacyLevel         // is this trust relation itself visible?
}

TrustType  = enum { direct | relational | institutional | reputational | provisional }
TrustBasis = enum { 
  direct_experience | vouching | institutional_anchor | 
  behavioral_signal | cooperative_history | zk_proof
}

TrustContext {
  domain:          CapacityDomain      // trusted for *what*?
  communityScope:  Community[]         // trusted within which community/ies?
  temporalScope:   TemporalWindow      // trusted for how long?
  stakes:          StakeLevel          // low | medium | high | critical
}
```

---

#### GOVERNANCE_ELEMENT :: ProtocolRule

```
ProtocolRule {
  id:              UUID
  type:            RuleType
  text:            String
  rationale:       String
  evolvability:    EvolvabilityLevel   // immutable | slow | adaptive
  changeProcess:   GovernanceProcess
  ostromPrinciple?: Integer [1..8]     // which Ostrom principle does this implement?
  antiCaptureRole?: AntiCaptureMechanism
  evidenceBase?:   Citation[]
  lastRevisedAt:   Timestamp
  version:         SemanticVersion
}
```

---

#### PLE_CONTEXT :: PostLaborTransition

The macro-structural frame that gives LVN its urgency and purpose.

```
PostLaborTransition {
  id:              UUID
  phase:           TransitionPhase
  automationPressure: Float [0..1]     // rate of labor displacement
  laborMarketHealth:  LaborMarketIndicators
  meaningEconomyMaturity: Float [0..1] // how much is post-labor exchange normalized?
  cooperativeInfrastructureCapacity: Float [0..1]  // how ready is the cooperative sector?
  policyContext[]:  PolicyInstrument[]
  
  // The core PLE claim: as automationPressure rises, 
  // cooperativeInfrastructureCapacity must rise proportionally
  // or meaningEconomy.flourishing crashes.
  // This is why LVN is urgent.
}

TransitionPhase = enum { 
  pre_disruption | early_disruption | 
  peak_disruption | cooperative_emergence | 
  post_labor_equilibrium 
}
```

---

## Part III: The Relationship Graph

### 3.1 Core Relationship Types

All relationships in the LVN graph are *typed, directed, and attributed*. An untyped edge is an assertion with unknown semantics — insufficient for reasoning.

```
RELATIONSHIP TYPE CATALOG

// ── AGENT ↔ VALUE ──────────────────────────────────────────────────────────

hasCapacity(Agent, Capacity)
  confidence:    Float [0..1]
  discoveredBy:  PersonalContextEngine | Self | PeerAttestation
  since:         Timestamp

hasNeed(Agent, Need)
  urgency:       Float [0..1]
  articulability: ArticulabilityLevel
  since:         Timestamp

hasMeaningElement(Person, MeaningElement)
  // PLE-critical — the flourishing layer

// ── CAPACITY ↔ NEED ─────────────────────────────────────────────────────────

satisfies(Capacity, Need)
  // THE KEY MATCHING RELATIONSHIP
  fitScore:      Float [0..1]            // complementarity score
  context:       String
  partialOnly:   Boolean
  conditions:    String[]                // under what conditions?

partiallyAddresses(Capacity, Need)
  // when fitScore > 0 but < threshold

// ── AGENT ↔ AGENT ───────────────────────────────────────────────────────────

knows(Person, Person)
  tieStrength:   TieStrength            // strong | weak | absent
  context:       String
  crossBoundary: Boolean                // does this cross class/culture/geography?
  // weak crossBoundary=true ties are highest-value for cooperative discovery

complementsWith(Agent, Agent)
  score:         ComplementarityScore
  domains[]:     CapacityDomain[]       // which domains drive complementarity?
  detectedBy:    RelayNode
  detectedAt:    Timestamp
  disclosureTier: Integer [1..5]

trusts(Agent, Agent, TrustContext)
  strength:      Float [0..1]
  type:          TrustType
  via?:          VouchChain

cooperatedWith(Agent, Agent)
  act:           CooperativeAct
  role[]:        ParticipantRole[]
  
// ── AGENT ↔ SIGNAL ──────────────────────────────────────────────────────────

emits(PersonalContextEngine, SignalVector)
  privacyEpsilonConsumed: Float
  relayedTo:     RelayNode

// ── SIGNAL ↔ SIGNAL ─────────────────────────────────────────────────────────

matchedTo(SignalVector, SignalVector)
  score:         ComplementarityScore
  matchedBy:     RelayNode
  matchedAt:     Timestamp
  // Note: neither SignalVector reveals its Person at this stage

// ── FAILURE ↔ EXCHANGE ──────────────────────────────────────────────────────

inhibits(FailureMode, CooperativeAct | MissingExchange)
  severity:      Float [0..1]
  causal:        Boolean                // direct cause vs. contributing factor

causes(FailureMode, MissingExchange)
  estimatedFrequency: Float             // how often does this failure cause this gap?

compoundsWith(FailureMode, FailureMode)
  amplificationFactor: Float            // how much worse when combined?

// ── COOPERATIVE ACT → OUTCOMES ───────────────────────────────────────────────

generates(CooperativeAct, ReputationRecord)
generates(CooperativeAct, Capacity)    // emergence: new capacity from cooperation
generates(CooperativeAct, Need)        // emergence: new needs revealed

reinforces(CooperativeAct, TrustRelation)
  delta:         Float                  // trust change from this act

// ── AGENT ↔ COMMUNITY ───────────────────────────────────────────────────────

memberOf(Agent, Community)
  role:          CommunityRole
  since:         Timestamp
  bridgingRole:  Boolean                // does this agent bridge communities?

bridges(Agent, Community, Community)
  bridgingCapital: Float [0..1]         // Burt's structural holes measure

// ── PLE_CONTEXT ↔ EVERYTHING ────────────────────────────────────────────────

contextualizes(PostLaborTransition, CooperativeAct)
  // UBI raises risk-tolerance → more cooperative experimentation
  // This relationship explains *why* policy matters to protocol design

necessitates(AutomationWave, MeaningEconomy)
  // As wage labor recedes, meaning economy must expand or flourishing collapses
  // This is the macro PLE thesis in edge form

enables(PolicyInstrument, CooperativeAct)
  mechanism:     String                 // how does UBI/timebank/etc enable cooperation?

// ── PROTOCOL EVOLUTION ──────────────────────────────────────────────────────

governedBy(Protocol, ProtocolRule)
evolvedBy(ProtocolRule, GovernanceProcess)
supersedes(ProtocolRule_v2, ProtocolRule_v1)
challenges(Provocation, ProtocolRule)   // the 10 Provocations as first-class objects
```

---

### 3.2 The Central Graph — Core Narrative Paths

Several narrative paths through this graph are worth naming explicitly, as they represent the LVN's core use cases and causal claims:

**Path A — The Discovery Path (happy case)**
```
Person_A [hasCapacity] → LatentCapacity
PersonalContextEngine_A [detects] → LatentCapacity
PersonalContextEngine_A [emits] → SignalVector_A
RelayNode [matches] → (SignalVector_A, SignalVector_B) via ComplementarityScore
Person_A [complementsWith] → Person_B
CooperativeAct [meets] → Need_B
CooperativeAct [generates] → ReputationRecord
CooperativeAct [addresses] → MeaningElement_A (e.g., Maria's purposelessness)
CooperativeAct [generates] → Capacity_B (James now knows basic drainage)
```

**Path B — The Failure Path (what LVN prevents)**
```
Person_A [hasCapacity] → LatentCapacity (undetected)
LatentCapacity [inhibitedBy] → CurseOfKnowledge
Person_B [hasNeed] → Need (unarticulated)
Need [inhibitedBy] → MetaIgnorance
CurseOfKnowledge [compoundsWith] → Homophily
CurseOfKnowledge [compoundsWith] → DunbarLimitExhaustion
→ MissingExchange [causes] → ValueEstimate.loss
```

**Path C — The PLE Context Path**
```
AutomationWave [increases] → unemployed.Person[]
PostLaborTransition [raises] → MeaningElement.gap for many Persons
MeaningEconomy [requires] → CooperativeInfrastructure
LVN Protocol [provides] → CooperativeInfrastructure
PolicyInstrument.UBI [enables] → CooperativeAct (reduced risk-aversion)
CooperativeAct [addresses] → MeaningElement (purpose, belonging, recognition)
```

**Path D — The Power Risk Path (equity concern)**
```
Person_A [highNetworkPosition] bridges [Community_1, Community_2]
Person_A [complementsWith] → Person_B [lowNetworkPosition]
CooperativeAct [powerBalance] → -0.7 (A-favoring)
→ Dependency [forms] → Person_B → Person_A
→ NegativeOutcome.exploitation [risk]
EquityMonitor [detects] → powerBalance.skew in community
EquityVeto [triggers] → GovernanceResponse
```

---

## Part IV: PLE Integration — The Macro Frame

The LVN is not an island. It is a response to a specific civilizational moment. The metamodel must make this explicit.

### 4.1 The PLE Thesis in Formal Terms

Post-Labor Economics proposes:

1. `AutomationWave` increases `unemployed.Person[]` faster than new labor markets can absorb them
2. This creates a crisis in `MeaningElement` — wage labor was the primary source of `purpose`, `recognition`, `competence`, and `narrative_identity` for most people
3. Markets cannot solve this because `MeaningElements` are not priceable goods — they are `UnpricedValue` barriers
4. Therefore, the `MeaningEconomy` — informal, cooperative, relational — must scale dramatically
5. LVN provides the missing infrastructure layer for this scaling

In the metamodel: `LVN Protocol.purpose = eliminateMissingExchanges(MeaningEconomy)`

### 4.2 Policy Instruments as Cooperative Enablers

The relationship between policy instruments and cooperative capacity is load-bearing but currently implicit in LVN documents:

```
UniversalBasicIncome → reduces(cooperationRiskTolerance.barrier)
  // When basic needs are met, people can afford to help without payment
  // UBI is cooperative infrastructure as much as economic policy

TimeBanking → provides(valuationMechanism for MeaningElements)
  // Time banking is a primitive version of the LVN signal exchange
  // LVN is what time banking becomes when AI handles the matching

CommonsDividend → distributes(value from CooperativeInfrastructure)
  // If the network creates $1.3T in latent value, who captures it?
  // A commons dividend ensures it flows to participants, not platform owners
```

### 4.3 The Transition Map

Different people exist at different stages of the post-labor transition. The LVN must serve all of them differently:

| PLETransitionStage | Primary ValueType | Primary FailureMode | LVN Priority |
|---|---|---|---|
| `labor_anchored` | Economic exchange | MissingMarket | Surface economic complementarity |
| `transitioning` | Mixed | All five cascade layers | Gentle discovery, low risk |
| `post_labor_oriented` | Meaning + economic | MetaIgnorance, DunbarLimit | Surface LatentCapacity, MeaningElement |
| `meaning_economy_native` | Meaning primarily | Homophily (affinity silos) | Cross-community bridging |

---

## Part V: The 10 Provocations as Metamodel Stress Tests

The 10 open provocations listed on the LVN site are not just discussion prompts — they are *design failure modes for the metamodel itself*. Each targets a specific type or relationship:

1. **Centralized vs. federated embedding** → `RelayNode.embeddingModel` — this attribute determines what "complementarity" means. It is not a technical choice; it is a political one. The metamodel must version-track it and tie it to governance.

2. **Privacy-preserving semantic matching** → `SignalVector` schema validity. Can `CapacityDimensions` and `NeedDimensions` be represented with sufficient semantic richness while maintaining differential privacy? This is an open mathematical question, not just an engineering one.

3. **Ambient matching as surveillance** → `PersonalContextEngine.contextBundle` — the same model that surfaces cooperative opportunities models vulnerabilities. The metamodel needs explicit `vulnerabilityShielding` attributes.

4. **Serving the least-connected** → `Person.socialPosition` + `EquityMonitor`. Low-position persons have the most to gain but the most friction to onboard. The model needs an explicit `onboardingPathway` for low-capital participants.

5. **Should matches include a price?** → `CooperativeAct.type` — does adding `market_hybrid` to the enum commodify what should be a gift? This is a values question with metamodel consequences.

6. **Trust bootstrapping without bias** → `TrustRelation.basis`. Institutional anchors (trusted employers, universities) encode existing social hierarchies. The metamodel needs `biasAudit` on trust basis types.

7. **Equity of value capture** → `CooperativeAct.powerBalance`. Already in the model but needs explicit monitoring and intervention thresholds.

8. **AI assistant interoperability** → `PersonalContextEngine.localModel` compatibility across vendors. The metamodel needs a `ProtocolCompatibility` schema.

9. **Is the gap even real?** → `MissingExchange.detectionMethod` validity. The metamodel's credibility depends on this being falsifiable and measurable.

10. **Where to pilot first?** → `Community.pilotStatus` + `Community.dominantFailureModes`. The metamodel provides the criteria: pilot in communities with high `DunbarLimitExhaustion`, high need, and existing `MutualAidNetwork` infrastructure.

---

## Part VI: Implementation Notes

### 6.1 Graph Database Schema

The natural implementation substrate is a property graph database (Neo4j, Amazon Neptune, or similar). The type hierarchy maps to node labels; the relationship catalog maps to typed edges.

Core node labels:
```
:Person :Community :Institution
:PersonalContextEngine :RelayNode :GovernanceAgent
:ExplicitCapability :LatentCapacity :TacitKnowledge
:ExplicitNeed :LatentNeed :EmergentNeed
:MeaningElement
:SignalVector :ComplementarityScore
:CooperativeAct :MissingExchange :NegativeOutcome
:TrustRelation :VouchChain :ReputationRecord
:FailureMode  // subtypes as additional labels
:ProtocolRule :AntiCaptureMechanism :EquityMonitor
:PostLaborTransition :MeaningEconomy :PolicyInstrument
```

### 6.2 OWL / JSON-LD Representation

For semantic web interoperability, the ontology maps to OWL with JSON-LD context. Critical for integration with W3C DID standards (for sovereign identity) and Verifiable Credentials (for reputation records).

```json
{
  "@context": {
    "lvn":        "https://lvn.coop/ontology/v1/",
    "prov":       "http://www.w3.org/ns/prov#",
    "schema":     "https://schema.org/",
    "skos":       "http://www.w3.org/2004/02/skos/core#"
  },
  "@type":        "lvn:LatentCapacity",
  "lvn:holder":   { "@type": "lvn:Person", "@id": "did:lvn:person:abc123" },
  "lvn:domain":   { "@id": "lvn:domain:MechanicalEngineering" },
  "lvn:visibility": "lvn:Latent",
  "lvn:confidence": 0.82,
  "prov:generatedAtTime": "2026-02-20T00:00:00Z"
}
```

### 6.3 MCP Extension Points

Per the protocol integration strategy (WD-003), PersonalContextEngine functions as an MCP server. The metamodel maps to MCP tool schemas:

- `lvn_emit_signal` → emits(PersonalContextEngine, SignalVector)
- `lvn_receive_match` → matchedTo(SignalVector, SignalVector)
- `lvn_disclose_tier` → DisclosureEvent at specified progressiveDisclosureTier
- `lvn_vouch_for` → vouchesFor(Agent, Agent, domain)
- `lvn_record_act` → CooperativeAct creation

---

## Part VII: What This Metamodel Changes

This document is not merely descriptive. Its existence changes the project in four ways:

**1. It makes the gap measurable.** MissingExchange is now a typed entity with a ValueEstimate. The $1.3T figure becomes a research target, not just a headline. Communities can track their own gap reduction.

**2. It makes failure debuggable.** FailureMode is a first-class entity with detectability, prevalence, and remediation relationships. When the protocol underperforms, there is now a structured vocabulary for why.

**3. It forces the equity question into the design.** PowerBalance on CooperativeAct and CrossClassIndex on Community are not optional analytics — they are protocol-level attributes. The system is only working if the least-connected are being served.

**4. It elevates meaning to the primary design criterion.** MeaningElement is now in the model. The system can no longer be evaluated only by number of matches or economic value created. Flourishing is the goal. This document makes that a testable proposition.

---

## Appendix A: Key Citations Mapped to Entity Types

| Entity / Relationship | Primary Citation |
|---|---|
| Homophily | McPherson et al. 2001; Chetty et al., Nature 2022 |
| CurseOfKnowledge | Camerer, Loewenstein & Weber 1989 |
| MetaIgnorance | Fischhoff 1975; Kruger & Dunning 1999 |
| weak knows(crossBoundary=true) → opportunity | Granovetter 1973; Rajkumar et al., Science 2022 |
| CrossClassIndex | Chetty et al., Nature 2022 (21B friendships) |
| MissingMarket | Arrow 1962; Coase 1960; Akerlof 1970 |
| DunbarLimitExhaustion | Dunbar 1992; Nowak 2006 |
| ProtocolRule (Ostrom) | Ostrom 1990 |
| MissingExchange.prevalence (76%) | Bender et al. 2024 |
| trusts → cooperates correlation r=.58 | Xue et al. 2025 meta-analysis |
| MeaningEconomy | Putnam 2000; Sennett 2012; Arendt 1958 |

---

## Appendix B: Open Questions This Document Raises

1. **Temporal modeling** — what is the correct decay function for LatentCapacity.confidence over time? Exponential? Context-dependent?

2. **MeaningElement measurement** — how is `currentLevel` of purpose or belonging measured without invasive self-reporting? Can AI infer it from behavioral signals?

3. **PowerBalance threshold** — at what PowerBalance score should the EquityVeto trigger? Who decides this, and under what governance process?

4. **MissingExchange detection** — how do you know a MissingExchange occurred if neither party knows the other exists? This is the detection paradox that drives the protocol's core design challenge.

5. **PLE Transition Phase assessment** — how does the system determine which `PLETransitionStage` a Person occupies without the person self-reporting? Can labor status, cooperation history, and meaning element signals triangulate this?

6. **Cross-ontology alignment** — how does this ontology align with existing schemas (Schema.org, FOAF, W3C DID, ActivityPub)? Alignment enables interoperability; divergence enables precision. What are the tradeoffs?

---

*This document is a working draft. Everything is wrong in some way. Find the flaws.*

*Released under CC BY-SA 4.0 — fork, critique, extend.*
