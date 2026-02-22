# WD-009 — Temporal Modeling: Decay, Growth, and Emergent Value
## Why the $1.3T Figure Understates the Case by an Order of Magnitude

**Status:** Working Draft v0.1  
**Authors:** LVN Initiative  
**License:** CC BY-SA 4.0  
**Companion docs:** WD-007 (Metamodel), WD-008 (Flourishing Layer)  
**Companion tool:** lvn-temporal-simulator.html

---

## Preface: The Static Snapshot Problem

Every number in the LVN's evidence base — the $1.3T latent value gap, the 76% of mutual aid requests unfulfilled, the 42% of organizational skills invisible — is a *static snapshot*. Each measures the value of cooperative connections that failed to form in a given period. None of them measures what happens after a cooperative connection *does* form: what compounds, what cascades, what grows, what decays, and what entirely new value emerges from the act itself.

This is a structural limitation of the evidence, not a failure of the researchers. Static snapshots are what cross-sectional studies produce. But they systematically understate the value of cooperative infrastructure because they miss three dynamic phenomena that only reveal themselves over time:

**Phenomenon 1 — Decay without intervention.** Human capacities, social trust, and meaning states are not static. In the absence of use and reinforcement, they deteriorate. The retired engineer's HVAC expertise atrophies without practice. The weak tie to the community organizer dissolves without contact. The sense of purpose erodes as months of retirement pass without contribution. The latent value gap is not a fixed number — it grows year over year as human potential deteriorates without the cooperative connections that would sustain it.

**Phenomenon 2 — Compounding with intervention.** A cooperative act does not merely satisfy one need. It generates trust, which enables riskier and higher-value future cooperation. It generates reputation, which surfaces the participant to potential matches they were previously invisible to. It may generate new capacities and reveal new needs that create entirely new matching opportunities. The value of a single cooperative match is not the value of the immediate transaction — it is the net present value of the cooperative *trajectory* the match initiates.

**Phenomenon 3 — Emergence.** Maria doesn't just fix James's drainage problem. She discovers — for the first time in her retirement — that she loves teaching practical skills to people who genuinely need them. This discovery is a new entity: a `MeaningElement` of type `generativity` that did not exist before the cooperative act. It will reshape her subsequent matching profile, her engagement with the community, and the trajectory of her remaining years. The cooperative act created something from nothing. The static model has no mechanism to capture this — and therefore cannot be used to argue for the infrastructure that enables it.

This document formalizes all three phenomena. The result is not just a more accurate model of cooperative value — it is a fundamentally different argument for why the LVN matters, and a set of protocol-level design requirements that flow directly from the dynamics.

---

## Part I: Decay Dynamics

### 1.1 The Taxonomy of Decay

Not everything decays at the same rate, by the same mechanism, or toward the same floor. A formal temporal model requires distinguishing at least four decay regimes:

**Regime A — Linear decay (use-it-or-lose-it)**  
Skills that require active maintenance. A language spoken fluently deteriorates roughly linearly without practice. An accounting certification becomes stale at a predictable rate as regulations change. These decay toward a non-zero floor (residual knowledge) but the degradation is approximately proportional to time without use.

**Regime B — Logarithmic decay (embodied, slow erosion)**  
Deep experiential knowledge. A retired surgeon doesn't lose surgical intuition at the same rate as procedural technique. Tacit knowledge — the pattern recognition built over decades — is embodied in a way that resists rapid decay. These capacities erode slowly, with diminishing returns to time without practice.

**Regime C — Threshold decay (stable then catastrophic)**  
Trust. Long-established trust between two people can remain essentially stable for years without active reinforcement — until it crosses a threshold event (betrayal, perceived abandonment, discovered deception) at which point it collapses non-linearly. The decay is not gradual; it is punctuated and asymmetric (easier to destroy than to build).

**Regime D — Reinforcing decay (spiral dynamics)**  
Meaning states. A person with low `purpose` reduces their cooperative activity, which removes the primary source of purpose-restoration, which deepens the purpose deficit, which further reduces cooperative activity. This is a reinforcing negative feedback loop: meaning deprivation is self-amplifying without external intervention. The same dynamic operates in the positive direction — meaning activation increases engagement, which produces more meaning activation.

This taxonomy has direct implications for matching priority. Regime D entities (meaning states in active spiral) require most urgent intervention — delay deepens the deficit. Regime A entities (actively decaying skills) have a time window before the cooperative value diminishes below threshold. Regime B entities (embodied wisdom) have a longer time horizon. Regime C entities (trust) should be prioritized for match-timing immediately following potential disruption events.

---

### 1.2 Formal Decay Functions

Let `E(t)` = the value of entity `E` (capacity, trust, meaning state, tie strength) at time `t`. Let `t₀` = last activation event (use, reinforcement, or cooperative act involving this entity).

**Regime A — Linear:**
```
E(t) = E(t₀) · max(0, 1 - α·(t - t₀)) + E_floor

where:
  α       = decay rate (domain-specific, calibrated from research)
  E_floor = residual value floor (knowledge never reaches zero)
  t - t₀  = days since last activation

Typical α values:
  procedural_skill.professional:  α = 0.004  (≈50% in 250 days without use)
  procedural_skill.informal:      α = 0.002  (≈50% in 500 days)
  regulatory_knowledge:           α = 0.008  (≈50% in 125 days — changes with regulation)
  language_fluency:               α = 0.003  (≈50% in 333 days without speaking)
```

**Regime B — Logarithmic:**
```
E(t) = E(t₀) · (1 - β·log(1 + γ·(t - t₀))) + E_floor

where:
  β, γ = shape parameters controlling onset and steepness of decay
  
Typical parameters:
  tacit_knowledge.expert:       β = 0.08, γ = 0.01  (very slow)
  experiential_wisdom:          β = 0.05, γ = 0.005 (extremely slow)
  pattern_recognition.domain:   β = 0.10, γ = 0.02
```

**Regime C — Threshold:**
```
E(t) = E(t₀) · (1 - δ·(t - t₀)/(τ + (t - t₀)))  [gradual erosion]

+ discrete_events(t):
  on_betrayal:           E(t) → E(t) · 0.15  [catastrophic collapse]
  on_long_absence_>365d: E(t) → E(t) · 0.70  [significant erosion]
  on_cooperative_act:    E(t) → E(t) + Δtrust  [reinforcement]

where:
  δ = slow background erosion rate (trust without reinforcement, not betrayal)
  τ = time constant for gradual erosion (typically 180-360 days for established trust)
```

**Regime D — Reinforcing (meaning states):**
```
dM/dt = -λ·M + μ·Cooperative_Acts(t) + σ·Social_Contact(t) - ρ·(M_desired - M)

where:
  λ = intrinsic decay rate of meaning state without inputs
  μ = meaning restoration per cooperative act (weighted by synergyMultiplier)
  σ = meaning restoration from social contact (lower than cooperative acts)
  ρ = "pull toward desired" parameter — people experience tension toward their gap
  
Note: when M < threshold_spiral (≈0.20), the feedback becomes:
  dM/dt = -λ·M - κ·(threshold_spiral - M)  [negative reinforcement]
  
i.e., meaning deprivation actively inhibits the activities that would restore it.
This is the spiral dynamic. Without intervention, the system accelerates toward M = 0.
```

---

### 1.3 The Decay Horizon

For each entity, we can define a **decay horizon** — the time window within which a cooperative act that activates this entity is most valuable:

```
DecayHorizon(E) = time until E(t) < E_threshold_useful

For LatentCapacity:
  if decay_regime = A: DecayHorizon ≈ -ln(threshold/E₀) / α
  if decay_regime = B: DecayHorizon ≈ much longer (logarithmic)

For TrustRelation:
  DecayHorizon with no events ≈ τ (the time constant, typically months to years)
  DecayHorizon after threshold event ≈ hours to days (need immediate reinforcement)

For MeaningElement in Regime D spiral:
  DecayHorizon = now (urgent: delay deepens the spiral)
```

**Protocol implication:** The PersonalContextEngine should compute `DecayHorizon(E)` for all entities and surface this to matching prioritization. A person with a high-value `LatentCapacity` approaching its decay horizon should receive elevated matching priority — not because they are more "deserving" of a match, but because the cooperative value window is closing. This is the temporal optimization layer absent from the current architecture.

---

### 1.4 Tie Decay: The Granovetter Erosion Problem

Weak ties are the most cooperative-value-dense relationship type (83% of job discovery via weak/occasional contacts; cross-class weak ties the strongest predictor of economic mobility). They are also the fastest-decaying.

A weak tie between two people who have had a single meaningful cooperative interaction and then no contact for 18 months is functionally extinct. The latent value — the trust, the complementarity, the mutual awareness — has dissipated. This is why "staying in touch" is simultaneously so important and so effortful: it is active combat against the natural decay of weak ties.

```
WeakTie_strength(t) = S₀ · exp(-η · DaysSinceContact)

where:
  η ≈ 0.003 for casual professional weak ties (≈50% decay in 231 days)
  η ≈ 0.001 for meaningful cooperative weak ties (≈50% decay in 693 days)
  η ≈ 0.006 for minimal-contact weak ties (≈50% decay in 115 days)

Note: strong ties decay much more slowly:
  StrongTie_strength(t) = S₀ · (1 - ε · DaysSinceContact/(τ_strong + DaysSinceContact))
  where τ_strong ≈ 1095 days (3 years), ε ≈ 0.30
```

The LVN's relay protocol should implement **tie maintenance routing**: periodically surfacing light-touch cooperative opportunities between weak-tie pairs whose tie strength is approaching critical decay threshold. A 15-minute cooperative act (sharing a resource, answering a question, making an introduction) is sufficient to reset the decay clock on a weak tie — restoring it to near-original strength at minimal cost to both parties.

This is the mathematical justification for the "everyone helps one another with whatever they do" vision. The cooperative acts don't need to be large. They need to be *frequent enough* to prevent tie decay in the network.

---

## Part II: Growth Dynamics

### 2.1 The Growth Taxonomy

Growth dynamics are the mirror of decay — but they are not simply the inverse. Several growth phenomena are qualitatively different from decay reversal:

**Phenomenon G1 — Restoration:** A decayed capacity is re-activated through use. The growth curve is faster than initial acquisition (relearning is easier than first learning). The entity returns toward its previous peak but may not exceed it without additional investment.

**Phenomenon G2 — Genuine growth:** An entity grows beyond its previous peak through new experience, cooperation, or challenge. This requires the entity to be *used at or near its current capacity frontier* — the learning zone. Cooperation within the comfort zone does not produce G2 growth. Cooperation at the frontier does.

**Phenomenon G3 — Emergence:** A cooperative act produces a *new entity* — a capacity, need, or meaning state that did not exist before. This is categorically different from G1 or G2. The entity was not previously decayed; it simply didn't exist. Emergence is the most important growth phenomenon and the least modeled in cooperative systems.

**Phenomenon G4 — Network position growth:** A cooperative act changes not just the entities involved but the position of the participants in the cooperative network. A previously isolated person gains a connection. A person who was unknown gains reputation. Network position is a multiplicative — it amplifies the value of all other entities the person holds.

---

### 2.2 Growth Functions

**G1 — Restoration (relearning):**
```
E(t) = E_floor + (E_peak - E_floor) · (1 - exp(-ψ · N_activations))

where:
  E_peak       = previous peak before decay
  N_activations = number of use/cooperative events since re-activation
  ψ            = restoration rate (faster than initial acquisition)

Key insight: restoration is concave — fast early (large gains from initial re-activation),
slowing as the entity approaches E_peak. This means the FIRST cooperative act after
a long dormancy has the highest restoration value.
```

**G2 — Genuine growth (frontier learning):**
```
ΔE_per_act = ξ · max(0, E_challenge - E_current)

where:
  E_challenge  = the capability level demanded by the cooperative act
  E_current    = person's current capability level
  ξ            = learning efficiency (domain-specific)

Key insight: cooperative acts at or slightly above current capability produce G2 growth.
Acts well below current capability produce neither G1 nor G2 — they may even contribute
to boredom signals (competence.LOW through understimulation).

Protocol implication: matching should consider the challenge gradient, not just fit.
A perfect-fit match (E_challenge ≈ E_current) is optimal for task completion but
suboptimal for growth. A slight over-challenge match is optimal for G2 growth
at modest task efficiency cost.
```

**G3 — Emergence (new entity creation):**

This is the phenomenon that makes cooperative systems qualitatively different from transactional ones. A cooperative act can create entities — capacities, needs, meaning states, relationships — that did not previously exist in any decayed form. They emerge from the act itself.

```
P(emergence | CooperativeAct) = f(depth, novelty, relationship_quality, reflection_opportunity)

where:
  depth                 = how deeply the parties engaged (time, complexity, stakes)
  novelty               = how different the cooperative partner's world is from one's own
  relationship_quality  = trust level, mutual respect, communication quality
  reflection_opportunity = whether the parties had space to integrate the experience

Emerged entity types:
  LatentCapacity.new:  new skill/knowledge acquired from the partner
  MeaningElement.new:  new understanding of what one values (Maria discovers love of teaching)
  Need.revealed:       previously unarticulated need made visible through the interaction
  TrustRelation.new:   new trust relationship (always emerges from successful cooperation)
  Interest.new:        new domain of curiosity opened by exposure to partner's world
```

**G4 — Network position growth:**
```
NetworkPosition(t) = NetworkPosition(t-1) 
  + α_new  · (new_connections_formed)
  + α_rep  · (reputation_records_received)
  + α_bridge · (cross_community_bridges_made)
  - β_decay · (DaysSinceLastCooperativeAct)

where α_bridge > α_rep > α_new > β_decay

Key insight: bridging connections (cross-community, cross-class) contribute more to
network position growth than same-community connections. This is the Burt structural
holes theorem: the most valuable network positions are at the interfaces between clusters.
A person who bridges two previously disconnected communities captures the highest
network position growth per cooperative act.
```

---

### 2.3 Trust Growth: The Sigmoidal Dynamic

Trust growth through cooperation follows a sigmoidal pattern — slow initial growth (uncertainty), accelerating growth through repeated cooperation, plateau at high trust levels:

```
Trust(n) = T_max · 1 / (1 + exp(-k · (n - n₀)))

where:
  n    = number of successful cooperative acts
  n₀   = inflection point (typically n₀ ≈ 3-5 acts for most relationship types)
  k    = steepness (higher for higher-stakes cooperation)
  T_max = maximum achievable trust for this relationship type

Implication: the first few cooperative acts are the hardest and produce the least
visible trust return per act. This is the "cold start" problem in cooperative networks.
Trust must be earned through low-stakes acts before high-stakes cooperation becomes possible.
```

**Protocol design implication:** The relay node should surface low-stakes cooperative opportunities first for new matches — deliberately calibrated to the early portion of the sigmoidal curve where low risk, low stakes, and high repeatability accelerate trust accumulation. High-value, high-stakes cooperation should be reserved for warm relationships with established trust history.

This is the formalization of the **progressive disclosure handshake** in WD-003, extended to the trust domain: not just progressively disclosing identity, but progressively escalating cooperative stakes as trust accumulates.

---

## Part III: Emergence — The Generative Core

### 3.1 What Emergence Changes

The static model treats cooperative value as a transfer: Capacity A satisfies Need B. Value is exchanged. Total cooperative value = sum of individual match values.

The temporal model reveals this is wrong. Cooperative value is not transferred — it is *generated*. The cooperative act creates entities that did not exist before, which in turn create new matching opportunities, new trust edges, new meaning states, and new latent capacities in an expanding wave of value creation.

Consider the Maria-James connection fully traced through time:

**Act 0** (t=0): Maria diagnoses James's drainage problem in 45 minutes.

**Immediate generation:**
- New `TrustRelation`: Maria → James (direct, domain: practical_home_problems)
- New `TrustRelation`: James → Maria (direct, domain: practical_expertise)
- New `ReputationRecord` for Maria in the community relay
- New `LatentCapacity` for James: basic drainage knowledge (Regime B, slow decay)
- New `MeaningElement.generativity` activation for Maria: first significant meaning event in 18 months

**t = 7 days:**
- James tells three neighbors: "There's a retired engineer on Maple Street who's remarkable."
- Three new `WeakTie` edges added to Maria's network position
- Maria's relay signal gains new `CapacityDimension` weight: community_knowledge.elevated

**t = 14 days:**
- James approaches Maria about building bookshelves for the library (his woodworking capacity, her connection).
- New `CooperativeAct` initiated — the reciprocal direction
- Maria's `recognition` MeaningElement receives second activation: someone using her connection, not just her expertise

**t = 30 days:**
- One of the three neighbors (Alicia, 29, first-gen homeowner) contacts Maria about a different structural issue.
- Maria's relay now shows significantly elevated `generativity` capacity signal: she is recognized as someone who helps
- Alicia and James become a new weak tie through Maria — a bridge connection that didn't previously exist

**t = 90 days:**
- Maria has had 7 cooperative acts (up from 0 in the preceding 18 months)
- Her `purpose` MeaningElement has moved from 0.18 to 0.52
- Her `narrative_identity` is reconstructing: "retired engineer" → "the person who helps the neighborhood solve problems it doesn't know it can solve"
- Three people have a resolved home issue they would have paid $3,000-$8,000 to contractors for
- The community has a new informal resource topology: practical home expertise is no longer scattered and invisible

**t = 365 days:**
- Maria has become an informal neighborhood resource
- Two of her "students" have helped others with simpler versions of what she taught them (knowledge cascade)
- The community relay has surfaced her to 23 people for 14 different cooperative acts
- Her `CooperativeActs.followOnProbability` average: 0.68 (most matches become ongoing relationships)
- Estimated economic value created: $47,000 in avoided professional fees
- Estimated meaning value: immeasurable in economic terms; Maria describes this as "the best period of my retirement"

**Total value created by a single cooperative match:**
The immediate task value was approximately $3,000 (James's avoided contractor fee). The temporal value — including compound emergence, cascade, trust accumulation, meaning restoration, and community topology change — is conservatively $47,000 over 12 months, with significant non-economic value beyond that.

**Ratio: 15.7x**

The immediate transaction captured by the static model is approximately 6% of the 12-month value created by that single cooperative act.

---

### 3.2 The Emergence Taxonomy

Not all cooperative acts generate the same emergent entities. The emergence profile depends on:

**E-Type 1 — Tacit knowledge transfer:** When one party teaches the other implicitly through doing (not explaining), the learner acquires tacit knowledge that they may not consciously register. James doesn't just learn "drainage diagnosis" — he learns *how to think about his house* as a system. This new cognitive framework is a latent capacity of significant generative value.

**E-Type 2 — Domain revelation:** Exposure to someone else's domain of expertise reveals to the person that the domain *exists and is interesting to them*. A cooperative act between a community organizer and a data scientist doesn't just solve an immediate problem — it may reveal to the data scientist that community organizing is a domain they want to engage with, creating a new `Interest` entity that reshapes their future matching profile.

**E-Type 3 — Identity crystallization:** The cooperative act provides an experience that clarifies who the person is or wants to be. Maria discovers she loves teaching. This is not a preference she had before — it is a new self-understanding that emerges from the experience. In the WD-008 taxonomy, this is a new `MeaningElement` of type `narrative_identity` update: the life story now has a new chapter.

**E-Type 4 — Relationship emergence:** The trust relationship itself is an emergent entity. But beyond the direct trust edge, each cooperative act generates *potential trust edges* — people who learn about the act and extend provisional trust to participants they've never met. James's three neighbors extend provisional trust to Maria on the basis of his testimony. These are emergent trust edges that didn't require Maria's involvement.

**E-Type 5 — Need revelation:** The cooperative act makes visible a need that neither party had articulated. Maria and James's conversation about drainage reveals that James has a broader need he hadn't named: *he needs a mental model for understanding his home*. This is a new `LatentNeed` entity — inarticulate, but now detectable to the PersonalContextEngine and matchable.

**E-Type 6 — Capability crystallization:** Doing something for someone else often reveals to the doer that they are more capable than they thought. Maria's 45-minute drainage consultation produces — for her — a new piece of self-knowledge: "I can still do this, and I'm good at it." Her `LatentCapacity.confidence` attribute increases. Her `CapacityDimension` weights in the signal shift upward. She becomes more matchable.

---

### 3.3 Emergence Yield by Cooperative Act Type

Different cooperative act types have characteristically different emergence profiles:

| Act Type | Tacit Knowledge | Domain Revelation | Identity | Need Revelation | Capability |
|---|---|---|---|---|---|
| Gift (pure giving) | Low | Low | Moderate | Low | Low |
| Direct Reciprocity (task exchange) | Moderate | Low | Low | Moderate | Moderate |
| Mentorship | High | High | High | High | High |
| Collaborative Creation | High | High | High | High | Very High |
| Mutual Aid (crisis support) | Low | Moderate | High | Moderate | Low |
| Teaching | Very High | Moderate | High | High | Moderate |

**Implication:** The LVN should not optimize purely for match efficiency (finding the most complementary pair for a given task). It should also optimize for emergence yield — matches that are likely to generate high emergent value even if the immediate task complementarity is slightly lower.

In particular, **mentorship** and **collaborative creation** have dramatically higher emergence profiles than simple reciprocal task exchange. The protocol should bias toward these act types where possible — not by forcing them, but by weighting the matching algorithm toward connections that have structural potential for mentorship or collaborative depth.

---

## Part IV: The Net Present Value of a Cooperative Match

### 4.1 Static vs. Dynamic Value

The static model evaluates a cooperative match as:

```
V_static = task_value(A→B) + task_value(B→A)
```

The temporal model evaluates it as:

```
V_temporal = Σ(t=0 to T) [ discount(t) · (
    task_value(t) 
  + meaning_value(t)
  + emergent_capacities_value(t)
  + trust_accumulated(t) · future_cooperation_probability(t)
  + network_position_change(t) · network_leverage(t)
  + cascade_acts_value(t)
)]

where:
  discount(t) = 1/(1+r)^t  (standard NPV discount at rate r)
  T           = relationship lifetime horizon (uncertain, must be modeled probabilistically)
```

The ratio V_temporal / V_static is the **Temporal Value Multiplier** for a given match.

From the Maria-James example:
- V_static ≈ $3,000 (James's avoided contractor fee)
- V_temporal ≈ $47,000 (12-month horizon) + non-economic meaning value
- **Temporal Value Multiplier ≈ 15.7x at 12 months**

This multiplier varies significantly by match type:

| Match Characteristics | Approx. Temporal Multiplier (12 months) |
|---|---|
| One-off task, no relationship | 1.0x |
| Task with single follow-on | 1.8x |
| Task that initiates ongoing relationship | 4-8x |
| Mentorship or teaching dynamic | 8-15x |
| Match with high emergence yield + community cascade | 12-25x |
| Network bridge (two previously disconnected communities) | 20-50x |

**Revised economic case:** The $1.3T static latent value gap, when multiplied by a conservative average Temporal Value Multiplier of 5x across all match types, suggests the true economic cost of the cooperative failure cascade is in the range of $5-10T annually in forgone *dynamic* value — compounded value that is never initiated because the first match never forms.

This is not speculation. It is the mechanistic consequence of compounding dynamics in cooperative networks. Every missed cooperative connection is not just a missed transaction — it is a missed trajectory.

---

### 4.2 The Optimal Intervention Timing Problem

Given decay dynamics and temporal value multipliers, *when* the LVN routes a match matters as much as *which* match it routes.

**The Early Window:** Cooperative acts routed early in an entity's decay trajectory capture full value. The act also resets the decay clock, preventing further degradation. Early intervention has compounding benefits: it preserves the entity AND initiates the cooperative trajectory.

**The Late Window:** A cooperative act routed near the end of a decay trajectory still captures some value — but less, because the entity has degraded. The relationship initiated will have a shorter effective horizon because the capacity or meaning state is near its functional floor.

**The Spiral Entry Point:** For Regime D entities (meaning states), there is a critical threshold below which the reinforcing decay spiral becomes difficult to reverse without significant external intervention. Above the threshold, a single well-timed cooperative act can initiate a recovery trajectory. Below it, multiple acts and sustained community support may be required.

```
Optimal_intervention_timing = argmax_t [ V_temporal(t) ]

where V_temporal(t) is highest when:
  - Entity is still above Regime D spiral threshold (meaning states)
  - Decay horizon not yet crossed (capacities)
  - Trust still recoverable (relationships)
  - Person is at high receptivity (not in acute crisis, has attention and energy)
```

**Protocol implication:** The PersonalContextEngine should maintain a **temporal priority queue** — a ranked list of cooperative opportunities ordered by urgency of intervention. A person whose `generativity` state has been in Regime D spiral for 3 months is a higher temporal priority than a person whose primary issue is a convenient task need. The meaning deficit is deepening; the task need is not.

---

## Part V: System Dynamics — The Community Level

### 5.1 Cooperative Network Density and Compounding

At the community level, the value of the LVN is not the sum of individual match values. It is a function of network density — the proportion of potentially cooperative pairs who actually cooperate. As density increases beyond a critical threshold, the network enters a compounding phase where each new connection generates more future connections than the one it required to form.

This is the cooperative equivalent of epidemic dynamics. Below a critical reproductive number (R₀ < 1), cooperation is isolated and episodic. Above it (R₀ > 1), cooperation self-reinforces and the community cooperative infrastructure grows autonomously.

```
R₀_cooperative = avg(connections_per_act) · avg(connection_persistence) · avg(new_matches_per_connection)

For R₀_cooperative < 1: cooperative network is subcritical — cooperation is isolated
For R₀_cooperative = 1: cooperative network is stable — cooperation maintains but doesn't grow
For R₀_cooperative > 1: cooperative network is supercritical — cooperation self-reinforces

LVN's goal: raise R₀_cooperative from subcritical to supercritical through:
  1. Increasing connection discovery rate (relay matching efficiency)
  2. Increasing connection persistence (meaning-augmented matches last longer)
  3. Increasing new-match generation per connection (emergence yield)
```

---

### 5.2 The Phase Transition

Perhaps the most important insight in the temporal model: cooperative networks can undergo **phase transitions** — sudden qualitative shifts in the character of the community's cooperative behavior. Below the critical density threshold, most cooperative value is trapped in isolated dyads. Above it, the network becomes a genuine cooperative commons where most participants are connected to most others through short trust paths.

The LVN cannot force a phase transition. But it can accelerate the approach to critical density by routing connections strategically:

**Bridging > bonding at early stages:** Early-phase community deployment should prioritize cross-cluster connections (bridging) over same-cluster connections (bonding). Bridging connections have higher network-position value and higher cascade potential. They reduce the number of cooperative acts required to reach critical density.

**High-emergence matches first:** Matches with high emergence yield generate more new matching opportunities per act. A community seeded with mentorship and collaborative-creation type connections will approach critical density faster than one seeded with equivalent-value but low-emergence transactional matches.

**Spiral-in-progress priority:** Persons in active Regime D spirals are both the highest-need and highest-reward targets for early routing. Successfully arresting a spiral creates a visibly meaningful outcome that increases protocol trust and participation rates. Protocol trust is itself a positive feedback variable — higher trust → more participation → higher density → faster approach to phase transition.

---

## Part VI: Temporal Protocol Extensions

### 6.1 Entity Temporal Attributes (Additions to WD-007)

Every entity in the metamodel requires temporal attributes that the current WD-007 specification treats as absent. These should be added to the formal entity schema:

```
TemporalAttributes {  // mixin added to all VALUE_ELEMENT entities
  
  lastActivated:    Timestamp             // last cooperative act involving this entity
  decayRegime:      RegimeA|B|C|D        // which decay function applies
  decayRate:        Float                 // domain-specific, calibrated
  currentValue:     Float [0..1]          // present estimated value
  peakValue:        Float [0..1]          // highest observed value
  floorValue:       Float [0..1]          // minimum floor (not zero for most entities)
  decayHorizon:     Timestamp             // when will value drop below useful threshold?
  growthTrajectory: GrowthRegime          // G1 | G2 | emerging | stable | declining
  spiralStatus?:    SpiralStatus          // for Regime D entities only
  interventionUrgency: Float [0..1]       // computed: how urgent is a cooperative act?
  temporalPriority: Integer               // ranking in the intervention queue
  
}

SpiralStatus = enum {
  stable     | // above spiral threshold, normal dynamics
  at_risk    | // approaching spiral threshold (0.20-0.30 range for meaning states)
  entering   | // crossing threshold, early spiral
  active     | // in spiral, reinforcing decay in progress
  recovering   // below threshold but receiving intervention, recovery in progress
}
```

---

### 6.2 Temporal Matching Algorithm

The naive matching algorithm finds:
```
BestMatch = argmax(ComplementarityScore)
```

The temporal matching algorithm finds:
```
BestMatch = argmax(TemporalValue)

where:
TemporalValue = ComplementarityScore 
  · SynergyMultiplier          // from WD-008
  · EmergenceYieldFactor       // from this document
  · TimingMultiplier           // urgency of intervention
  · RelationshipPersistencePrior  // estimated match longevity

TimingMultiplier = {
  2.0 if SpiralStatus = active     // urgent: spiral deepening
  1.5 if SpiralStatus = entering
  1.2 if SpiralStatus = at_risk
  1.0 otherwise
  
  × 1.5 if DecayHorizon < 90 days  // capacity about to fall below threshold
  × 1.2 if DecayHorizon < 180 days
  × 1.0 otherwise
}

EmergenceYieldFactor = 
  1.0 + P(mentorship_dynamic) · 0.4
      + P(collaborative_creation) · 0.5
      + P(cross_community_bridge) · 0.3
      + P(novel_domain_exposure) · 0.2
```

---

### 6.3 The Decay Clock Reset

Every cooperative act resets the decay clock for all entities it activates:

```
on CooperativeAct {
  for each entity E in [capacities_used, needs_met, trust_relations, meaning_elements_addressed]:
    E.lastActivated = now()
    E.growthTrajectory = compute_new_trajectory(E, act)
    E.decayHorizon = recompute_decay_horizon(E)
    E.temporalPriority = recompute_priority(E)
    
  for each emerged entity E' in [emergent_capacities, emergent_needs, new_trust_edges]:
    E'.create(parentAct = this)
    E'.lastActivated = now()
    E'.growthTrajectory = G1 | emerging
}
```

**The decay clock reset is why frequent small cooperative acts are more valuable than infrequent large ones**, holding total cooperative value constant. The act-frequency curve is not linear in value — it is convex, because each act resets multiple decay clocks and potentially initiates emergence.

---

## Part VII: The Revised Economic Argument

### 7.1 From $1.3T to $13T+

The existing LVN evidence base cites $1.3T as the annual latent value gap. This is the best available static estimate. The temporal model suggests this understates the true cost by roughly an order of magnitude, for three compounding reasons:

**Reason 1 — Decay of untapped value.** The $1.3T gap grows year-over-year as unactivated capacities atrophy. Maria's HVAC expertise, uncalled upon for 18 months, has already partially decayed. The cost of the missing connection includes not just the immediately missed task value but the permanent value destroyed by the decay that occurred while the connection was absent.

**Reason 2 — Compounding of initiated trajectories.** Each static-model "missed transaction" is also a missed trajectory. The $3,000 avoided contractor fee is 6% of the 12-month cooperative value that Maria-James generates. Aggregating across all missed connections, the difference between static transaction value and dynamic trajectory value is approximately the 15.7x temporal multiplier applied to the $1.3T base — yielding a revised estimate of $20T+ in forgone dynamic value annually.

**Reason 3 — Phase transition delay.** The cost of maintaining communities below the cooperative phase transition threshold is not just the sum of individual missed connections. It is the ongoing absence of the autonomous, self-reinforcing cooperative commons that communities above the threshold enjoy. This is a systemic cost that does not appear in any per-connection estimate.

**Conservative revised estimate: $6-15T annually in dynamic cooperative value forgone.**

This is not a precise number — the uncertainty is large. But the direction is robust: the static estimate is a floor, not a ceiling. The temporal model systematically adds value that the static model systematically misses.

---

### 7.2 The Intervention Leverage Calculation

If the LVN can route even a fraction of currently-missing connections, and if those connections have the temporal value profile described here, the leverage is extraordinary:

```
For a community of 10,000 people:

Estimate: 
  ~1,200 person-years of latent capacity at active-decay risk per year
  ~340 persons in active Regime D meaning spirals at any given time
  ~14,000 potential cooperative matches that fail to form per year
  Average temporal value per match: $4,000-$12,000 (wide range by type)

Total dynamic value latent: $56M - $168M annually
Value currently captured by serendipity and existing platforms: ~$8M (est.)
Remaining latent: $48M - $160M

Protocol target (year 1-2, partial penetration):
  Route 5% of currently-missing matches: $2.4M - $8M in dynamic value activated
  Route 20% (mature deployment): $9.6M - $32M
  
Community cooperative phase transition (if achieved):
  Autonomous value generation beyond direct protocol routing: difficult to estimate,
  likely 2-5x the directly-routed value
```

These numbers are illustrative and uncertain. The point is structural: even modest protocol penetration, applied to the right connections (high temporal multiplier, high emergence yield, spiral intervention), generates community-level value that justifies significant investment in the infrastructure.

---

## Appendix A: Open Questions

1. **Decay rate calibration.** The decay rate parameters (α, β, γ, η) in this document are informed by research in skill decay, social network dynamics, and psychological wellbeing — but they have not been empirically calibrated for the specific population and context of cooperative network participation. Pilot communities will provide the calibration data. How confident can we be in matching decisions made with uncalibrated decay rates?

2. **The emergence measurement problem.** Emergence events (new entities created by cooperative acts) are by definition unobserved before they occur and often unobserved immediately after — Maria may not consciously recognize for weeks that she loves teaching. How does the PersonalContextEngine detect emergence events? What is the minimum temporal resolution for emergence detection?

3. **The temporal multiplier distribution.** The 15.7x multiplier for Maria-James is a specific case, likely in the upper tail of the distribution. What does the full distribution of temporal multipliers look like? Is the median closer to 3x or 8x? The answer significantly changes the revised economic argument.

4. **Phase transition identification.** The cooperative phase transition (R₀ > 1) is theoretically well-defined but practically hard to detect in advance. What leading indicators predict whether a community is approaching or has crossed the transition? Can the protocol identify this and shift strategy (from seeding to amplifying) accordingly?

5. **The anti-dependency constraint revisited.** WD-008 §6.3 raised the anti-addiction constraint applied to meaning. The temporal model sharpens this: a community that becomes deeply LVN-dependent for cooperative discovery is fragile. If the protocol fails or is captured, the community has lost the infrastructure for a cooperative commons it no longer knows how to build without it. Does the temporal model suggest a protocol usage ceiling — a point beyond which more protocol penetration increases fragility?

6. **Cooperative phase transition and inequality.** Phase transitions have winners and losers. Communities that cross the cooperative threshold may do so by concentrating cooperative activity among their most connected members, leaving the periphery more isolated than before. The temporal model predicts this as a natural consequence of preferential attachment dynamics. What governance mechanisms prevent this?

---

*This document is a working draft. Everything is wrong in some way. Find the flaws.*  
*Released under CC BY-SA 4.0 — fork, critique, extend.*

---

**Next:** WD-010 — Power Balance Governance: Equity Thresholds and the Veto Mechanism  
**Next:** WD-011 — The Phase Transition Playbook: Community Pilot Design for Cooperative Critical Mass
