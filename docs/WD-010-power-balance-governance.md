# WD-010 — Power Balance Governance
## Equity Thresholds, the Veto Mechanism, and Why Every Cooperative Platform That Achieved Scale Became Extractive

**Status:** Working Draft v0.1  
**Authors:** LVN Initiative  
**License:** CC BY-SA 4.0  
**Companion docs:** WD-006 (Governance), WD-007 (Metamodel §Gap 3), WD-009 (Temporal Modeling)  
**Companion tool:** lvn-power-network.html

---

## Preface: The Graveyard of Good Intentions

There is a graveyard of cooperative platforms — digital and physical, technologically sophisticated and deliberately primitive — that began with genuine commitments to mutual aid, equity, and shared value. Most of them are either dead or extractive now. The pattern is consistent enough to deserve a name:

**The Cooperative Platform Capture Sequence:**

1. Platform achieves sufficient scale to become valuable
2. Highly-connected participants discover they can extract disproportionate value from their position
3. Platform mechanics (ratings, visibility, algorithm exposure) begin favoring the already-advantaged
4. New entrants face a steeper slope; existing power holders face a shallower one
5. The platform's nominal cooperative framing persists while the actual dynamic becomes extractive
6. The least-connected — who needed the platform most — are served worst

This sequence has played out in forms ranging from Mechanical Turk (started as peer-to-peer task sharing; became an exploitative piece-rate labor market) to TaskRabbit (started as neighbor-helping-neighbor; became a gig platform with all the usual pathologies) to certain mutual aid networks (started as true reciprocity; evolved into small circles of already-trusted people serving each other while the periphery remained isolated).

The LVN faces this failure mode structurally. Not because of bad intent — but because the underlying network dynamics are indifferent to intent. **Preferential attachment** — the empirically observed tendency of new connections in a network to form with already-connected nodes — will produce power concentration in any cooperative network that doesn't actively counteract it. This is not a conjecture. It is one of the most robustly replicated findings in network science (Barabási & Albert, 1999; subsequent literature spanning two decades across social, biological, and technological networks).

This document specifies the governance mechanisms that counteract this tendency. It does not claim to eliminate power asymmetry — that is not achievable. It claims to detect, measure, flag, and respond to power asymmetry in ways that prevent the Cooperative Platform Capture Sequence from completing. The difference between those two claims is the difference between utopian aspiration and engineered robustness.

---

## Part I: Power in Cooperative Networks — A Formal Account

### 1.1 What Power Means Here

"Power" in the LVN context is not primarily economic. Economic power (wealth, income, accumulated assets) is an input variable — it shapes who enters the network and with what initial conditions. What matters for governance is **cooperative network power**: the structural position that determines how much of the network's cooperative value flows through and to a given participant.

Cooperative network power has five distinguishable components:

**P1 — Degree Centrality:** Raw count of active cooperative relationships. The more connections, the more opportunities for cooperation and the more visibility within the protocol. High degree = more matches surfaced, more reputation records accumulated, higher trust signal strength. *The rich get richer by default in degree centrality.*

**P2 — Betweenness Centrality (Structural Holes):** Position between otherwise-disconnected clusters. The person who bridges two previously separate communities controls the flow of cooperative opportunity between them. This position is extraordinarily valuable — Burt (2004) documents that structural hole occupants earn more, advance faster, and receive better evaluations in organizational settings. In cooperative networks, structural hole occupants can extract rent from the connection they facilitate or monopolize the match opportunity rather than passing it on.

**P3 — Trust Centrality:** Degree to which one's trust endorsements are widely relied upon by others. A highly trusted person's vouching carries more weight, which means their assessments of others shape who gets matched and who doesn't. This is a form of epistemic power — the power to define who is trustworthy.

**P4 — Temporal Advantage:** Being in the network earlier means more accumulated reputation, more established relationships, more cooperative history. Cooperative infrastructure exhibits strong first-mover advantages because trust and reputation compound over time (WD-009 §2.3 sigmoidal trust growth). A person who joined the network three years ago and a person who joined last week face categorically different matching environments.

**P5 — Capacity Premium:** Holding a rare or high-demand capacity — expert ML engineering, immigration law knowledge, structural engineering — commands a higher ratio of need-satisfaction to capacity-deployment. People with in-demand capacities can be selective about which needs they meet, which constitutes power over those with the needs.

```
PowerIndex(P) = w₁·DegreeCentrality(P) 
              + w₂·BetweennessCentrality(P)
              + w₃·TrustCentrality(P)  
              + w₄·TemporalAdvantage(P)
              + w₅·CapacityPremium(P)
              
normalized to [0,1] within the active community

where weights wᵢ are context-dependent and community-set,
with constraint: Σwᵢ = 1
Default weights: w₁=0.20, w₂=0.30, w₃=0.25, w₄=0.15, w₅=0.10
(betweenness centrality weighted highest because it is the primary capture mechanism)
```

---

### 1.2 The Preferential Attachment Dynamic

New cooperative connections in the LVN will, by default, tend to form with already-highly-connected participants. This happens through at least four distinct mechanisms:

**Mechanism 1 — Visibility asymmetry:** The matching algorithm surfaces candidates ranked partly by reputation and cooperative history. New entrants with no history are systematically less visible than established participants. Even with equal capability, the established participant gets more matches.

**Mechanism 2 — Trust bootstrapping advantage:** Trust in cooperative networks propagates through vouching chains. If you know no one, no one can vouch for you. The first few cooperative acts — which establish the initial trust anchor — are hardest to form precisely because they require trust that doesn't yet exist. Participants who successfully bootstrapped their trust base face no further bootstrapping cost, while every new entrant must climb the same cold-start slope from scratch.

**Mechanism 3 — Capacity discovery asymmetry:** The PersonalContextEngine is better at surfacing latent capacities in people who have rich conversational history with it. New entrants have thin histories; the engine's model of their capacities is underspecified. They appear less capable than they are relative to established participants, which suppresses their matching rate.

**Mechanism 4 — Emergence compounding (from WD-009):** Participants who have completed many cooperative acts have generated more emergent capacities, more trust edges, and more meaning-state improvements. Their cooperative profile compounds over time. The gap between an active participant and an inactive one grows not linearly but exponentially.

The combined effect is a **power-law degree distribution** — a small number of highly-connected participants accumulating a large fraction of cooperative activity, while many participants remain peripheral. This is precisely the structure of scale-free networks, and precisely the structure that produces extractive dynamics as scale increases.

---

### 1.3 The Capture Sequence in the LVN Context

For the LVN specifically, the Cooperative Platform Capture Sequence would proceed as follows:

**Stage 1 (early, latent):** A small number of participants — probably those with rare, high-demand capacities and early network access — begin accumulating significantly more cooperative activity than the median. Their `PowerIndex` diverges upward. This is not yet problematic; it reflects genuine capacity value.

**Stage 2 (intermediate, concerning):** The high-`PowerIndex` participants discover that their structural position is itself a resource. They begin, perhaps unconsciously, routing cooperative opportunities toward their existing trust network rather than to unknown newcomers. The matching algorithm — which weights trust history — reinforces this tendency. The periphery sees declining match rates; the core sees increasing ones.

**Stage 3 (critical, protocol failure):** High-`PowerIndex` participants begin capturing governance mechanisms. They are the most active voices in governance discussions because they have the most invested. They shape protocol rules that, while not explicitly self-serving, consistently favor participants with established trust histories and high cooperative activity. The equity monitoring system — if it exists but lacks enforcement — becomes theater.

**Stage 4 (terminal, capture):** The LVN serves its most connected participants excellently and its least connected participants poorly. The communities with the highest cross-class connection deficit — the exact communities that most need cooperative infrastructure — receive the worst service. The stated mission and the actual outcome have completely inverted.

This is not a hypothetical. Every element of this sequence is empirically documented in the platform cooperative literature.

---

## Part II: The Equity Monitoring System

### 2.1 What Must Be Measured

Governance without measurement is aspiration. The equity monitoring system requires continuous measurement of four key indicators:

**Indicator I — PowerIndex Gini Coefficient:**
```
PowerGini(community, t) = Gini(PowerIndex[] for all active members at time t)

Interpretation:
  PowerGini = 0.00: perfectly equal power distribution (impossible in practice)
  PowerGini < 0.30: healthy distribution, intervention not required
  PowerGini 0.30-0.45: elevated inequality, monitoring intensified
  PowerGini 0.45-0.60: significant inequality, equity interventions activated
  PowerGini > 0.60: severe inequality, escalated governance response required
```

**Indicator II — Periphery Service Rate (PSR):**
The proportion of cooperative needs successfully met among the bottom 20% by `PowerIndex`.
```
PSR(community, t) = CooperativeActsCompleted(PowerIndex_bottom_20%, period) 
                  / CooperativeNeedsSurfaced(PowerIndex_bottom_20%, period)

Healthy PSR: > 0.65 (periphery needs met at 65%+ rate)
Concerning:   0.45-0.65
Critical:     < 0.45 (the core is being served; the periphery is not)
```

The **Rawlsian design constraint** is formalized here: a governance intervention is warranted whenever the PSR drops below threshold, regardless of median or mean outcomes. The protocol's success is defined by its worst-served participants, not its average-served ones.

**Indicator III — Capture Risk Index (CRI):**
Probability that the highest-`PowerIndex` participants are shaping governance decisions in self-serving ways, measured by:
- Correlation between `PowerIndex` rank and governance participation rate
- Correlation between `PowerIndex` rank and outcome of contested governance decisions
- Concentration of vouch-chain authority in high-`PowerIndex` participants
```
CRI = α·GovParticipationCorr + β·OutcomeCorr + γ·VouchConcentration

High CRI: governance is being shaped by those with most to protect
Low CRI: governance reflects broad community participation
```

**Indicator IV — Trust Network Clustering:**
```
ClusteringCoeff(trust_network) = measure of how insular trust clusters are

High clustering: trust circulates within established groups; newcomers can't enter
Low clustering: trust chains cross cluster boundaries; newcomers can access trust
```

---

### 2.2 The Early Warning System

Equity monitoring operates in three modes:

**Mode 1 — Background surveillance (continuous):** The `GovernanceAgent` continuously tracks the four indicators. Changes are logged. Trend analysis is run weekly. No action unless thresholds are approached.

**Mode 2 — Alert (approaching threshold):** When any indicator approaches threshold:
- Community equity dashboard becomes visible to all participants (transparency trigger)
- `EquityMonitor` AI component is activated with elevated scanning priority
- Community governance council is notified
- Optional: the matching algorithm's equity weights are incrementally adjusted

**Mode 3 — Escalated response (threshold crossed):** When any indicator crosses threshold:
- Automatic equity interventions activated (see §2.3)
- Human governance council convened within 7 days
- `EquityVeto` mechanism becomes available (see §3)
- Escalated transparency: specific power concentration patterns published to community (with privacy-preserving aggregation, not individual exposure)

---

### 2.3 Automatic Equity Interventions

Before the veto mechanism is required, a set of automatic interventions can rebalance power dynamics without human deliberation:

**Intervention A — Periphery-first routing boost:**
When `PSR < 0.65`, the matching algorithm's priority queue applies a `periphery_boost` weight to cooperative needs from bottom-20% participants. This increases the probability that their needs are surfaced to potential helpers first, compensating for visibility asymmetry.

```
match_priority_score = ComplementarityScore · SynergyMultiplier · TimingMultiplier 
                     · PeripheryBoost(seeker.PowerIndex)

PeripheryBoost(p) = 1.0 + max(0, (0.30 - p) · 3.0)
// linear boost from 1.0 at PowerIndex 0.30 to 1.9 at PowerIndex 0.00
// participants at the very bottom get 90% higher surfacing probability
```

**Intervention B — Trust bootstrapping subsidy:**
New entrants and low-`PowerIndex` participants receive a **trust subsidy** — the system treats their first cooperative acts as if they had one additional pre-existing trusted voucher. This flattens the cold-start slope without falsifying any actual trust history.

The subsidy is:
- Transparent: the matched party knows the subsidy exists
- Time-limited: expires after 5 completed cooperative acts (enough to establish real trust)
- Non-inflationary: doesn't dilute the value of trust earned by others

**Intervention C — Discovery equalization:**
The `PersonalContextEngine` applies additional effort to surfacing latent capacities in new entrants and low-activity participants. Thin conversational history triggers a structured elicitation flow — not a survey, but a targeted conversational probe designed to surface the specific capacity types most likely to be latent given the person's disclosed life context.

**Intervention D — High-`PowerIndex` routing friction:**
When `PowerGini > 0.45`, the matching algorithm applies a mild friction multiplier to additional cooperative acts for participants already above a high-activity threshold. This does not prevent them from cooperating — it slightly increases the effort required to arrange further matches, creating space for lower-activity participants to be served.

This is the most politically sensitive automatic intervention. It will be experienced as "being made to wait" by highly-active participants. The governance framing is essential: this is not punishment for contribution. It is capacity management for a commons with limited attention and a responsibility to serve all members.

---

## Part III: The Veto Mechanism

### 3.1 What the Veto Is

The **EquityVeto** is a community governance instrument that allows the duly constituted equity council to:

1. **Block a specific match** that would further concentrate power without serving equity goals
2. **Suspend a participant** whose cooperative activity pattern has become systematically extractive
3. **Override an algorithmic decision** that the governance council determines is producing inequitable outcomes
4. **Force a protocol parameter change** that the equity monitoring system has flagged but the development process has not yet addressed

The veto is not an AI decision. It is a human governance decision, made by a council with formal legitimacy, after deliberative process, subject to appeal. The AI monitoring system triggers the *availability* of the veto; it does not exercise it.

This distinction is critical. Algorithmic equity enforcement is technically appealing — it's fast, consistent, and doesn't require messy human deliberation. It is also fragile: algorithms optimize for the metrics they're given, and equity is not fully capturable in any metric. The veto mechanism preserves human judgment precisely at the edge cases where metrics are most likely to fail.

---

### 3.2 The Equity Council — Structure and Legitimacy

The equity council must solve a fundamental legitimacy problem: it governs the distribution of cooperative power, which means it is itself a significant power concentration. How is the council's power legitimated?

**Legitimacy Principle 1 — Inverse representation:** The council must include a majority of participants from the bottom 40% of the `PowerIndex` distribution. Those with the least cooperative network power must have the most governance voice over equity decisions. The people most affected by power concentration must control the mechanism that responds to it.

```
CouncilComposition:
  seats_bottom_40%:  ≥ 60% of total seats
  seats_middle_40%:  ≤ 30% of total seats  
  seats_top_20%:     ≤ 10% of total seats
  
High-PowerIndex participants have restricted council access not because they are 
suspected of bad faith, but because governance of equity by those with high power 
is structurally compromised regardless of intent.
```

**Legitimacy Principle 2 — Term limits and rotation:** No council member may serve more than one consecutive term. Council composition must rotate. This prevents the governance mechanism from becoming its own power concentration.

**Legitimacy Principle 3 — Open deliberation with private voting:** Council deliberations are public (any community member may observe). Votes are private (council members vote without knowledge of how others are voting, to prevent social pressure dynamics). Decisions are published with full rationale.

**Legitimacy Principle 4 — Appeal to community referendum:** Any veto decision may be appealed to a community-wide referendum within 30 days. The council's decision stands during the appeal period but is subject to reversal.

---

### 3.3 Veto Trigger Conditions

The veto mechanism becomes available when:

```
VetoAvailable = true  when any of:

1. PowerGini > 0.55  (severe inequality threshold)
2. PSR < 0.45        (periphery critically underserved)
3. CRI > 0.70        (capture risk very high)
4. SpecificPatternDetected:
   a. Single participant's PowerIndex growing > 0.08 per 90 days (rapid concentration)
   b. Trust chain depth > 6 from periphery to high-power participant 
      (periphery locked out of trust network)
   c. >40% of cooperative acts in a 30-day period involving <5% of participants
      (extreme activity concentration)
```

When `VetoAvailable` triggers, the protocol:
1. Notifies the equity council
2. Activates automatic interventions A-D if not already active
3. Opens a 14-day deliberation window for the council
4. At 14 days: council votes on whether to exercise a specific veto action, and which

---

### 3.4 Veto Actions — A Taxonomy

The veto is not a single instrument. The council selects from a graduated set of actions:

**Action Level 1 — Transparent disclosure (lightest):**
Publish the specific power concentration pattern to the full community — not to shame individuals, but to make the structural dynamic visible and subject to community response. "Our network is concentrating: 8% of participants are completing 47% of cooperative acts."

Rationale: many inequitable dynamics persist because they're invisible. Making them visible sometimes corrects them without further intervention, through community social norms.

**Action Level 2 — Algorithmic parameter adjustment:**
Direct the protocol to adjust matching weights, routing priorities, or trust-subsidy parameters more aggressively than the automatic interventions allow.

Example: "Increase `PeripheryBoost` multiplier from 1.9 cap to 2.5 for 60 days, then reassess."

**Action Level 3 — Participant-specific routing restriction:**
Apply routing friction to specific participants whose `PowerIndex` is above the concern threshold and whose activity pattern contributes measurably to the concentration. This is the most controversial action at Level 3. It requires:
- Specific evidence of the participant's contribution to concentration
- Proportional restriction (not a ban, not punitive, duration-limited)
- Public rationale (the affected participant knows why and can respond)

**Action Level 4 — Protocol suspension (nuclear option):**
Suspend a specific protocol feature that is producing systemic inequity. Example: suspend automated reputation-weighted visibility if it is the primary driver of power concentration. This is analogous to a court injunction — a temporary halt to a harmful activity while a remedy is developed.

This action requires a supermajority (75%+) of the council and triggers an automatic community referendum.

---

### 3.5 What the Veto Cannot Do

The veto mechanism has hard limits. These are not limitations — they are features. Clear limits prevent scope creep and protect the council's own legitimacy.

The veto **cannot:**
- Target a specific participant's cooperative *choices* — only systemic *patterns*
- Override a participant's refusal to cooperate with a specific match
- Redistribute already-created cooperative value
- Punish participants for holding rare or high-demand capacities
- Compel any specific cooperative act
- Operate anonymously — all veto actions require public rationale

The veto **should not** (soft constraints, subject to community deliberation):
- Reduce total cooperative activity in the network (interventions that shrink the commons to equalize it are worse than targeted redistribution)
- Create perverse incentives to hide cooperative activity to avoid concentration detection
- Become a tool for addressing interpersonal disputes (it is a structural governance instrument, not a conflict resolution process)

---

## Part IV: The Anti-Capture Design

### 4.1 The Meta-Problem

The equity governance system is itself a power concentration. Whoever controls the veto mechanism controls the distribution of cooperative opportunity in the community. This is the meta-problem of governance in cooperative systems: governance requires power, power concentrates, concentrated governance power replicates the dynamic it was designed to prevent.

Ostrom's design principles for common-pool resource governance (1990) address this. Her eighth principle — "governance activities are organized in multiple layers of nested enterprises" — is the foundational insight. No single governance mechanism should be sovereign. Governance must be layered, with each layer checking the others.

The LVN governance architecture implements this as:

```
Layer 1 — Algorithmic monitoring (continuous, automated):
  GovernanceAgent tracks PowerGini, PSR, CRI, ClusteringCoeff
  Triggers alerts and automatic interventions
  Checked by: human council can override algorithmic decisions
  Cannot: exercise the veto, make public statements, suspend participants

Layer 2 — Community equity council (deliberative, human, rotating):
  Exercises veto mechanism when available
  Checked by: community referendum on appeal
  Term-limited, inversely representative
  Cannot: act without documented rationale, act outside deliberation period

Layer 3 — Community referendum (slow, high-legitimacy):
  Can reverse any council decision
  Can amend protocol parameters (requires 60% supermajority)
  Can dissolve and reconstitute the equity council (requires 70% supermajority)
  Checked by: constitutional commitments that even referenda cannot override

Layer 4 — Constitutional commitments (immutable, highest authority):
  The Rawlsian constraint: the protocol serves its least-connected participants
  The anti-capture clause: no participant may hold concurrent seats across layers
  The transparency mandate: all governance decisions are public
  The exit right: any participant may export their data and leave without penalty
```

---

### 4.2 The Anti-Capture Clause in Detail

The most dangerous failure mode is not external capture (a corporate actor buying control) but internal capture: the protocol's most active and valuable participants gradually acquiring disproportionate governance influence simply by being most invested.

This is not bad intent. A person who has contributed 400 hours of cooperative acts to the network over three years *is* more invested in its success than someone who joined last month. Their interest in good governance is genuine. The problem is structural: their vision of "good governance" will be systematically influenced by their own position, even unconsciously.

The anti-capture clause operationalizes this concern:

**Rule A — Activity-governance inversion:** Governance participation rates must be inversely correlated with cooperative activity rates. The most active cooperators have the least governance influence (by design). They are the most valuable service providers; they are not the appropriate governors.

**Rule B — PowerIndex-gated access:** Participation in any governance role requiring discretion (council membership, veto vote, parameter recommendation) is restricted to participants with `PowerIndex < 0.65`. Those above the threshold may observe, may testify, may appeal — but may not vote.

**Rule C — Declaration of interest:** Any governance participant with a direct cooperative relationship to a participant affected by a pending veto decision must recuse from that specific decision. Standard conflict-of-interest practice applied to the cooperative domain.

**Rule D — Protocol fork right:** Any 10% minority of active community members may propose a fork of the protocol — a competing implementation with different governance parameters. This is the ultimate anti-capture mechanism: if the governance system is captured, the community can exit and reestablish without losing their cooperative history (data export right is constitutional). The threat of fork disciplines governance behavior.

---

### 4.3 The Power Paradox of the Founders

There is an unavoidable founding paradox in any governance design: the people who design the governance mechanism have maximal power over it precisely in the moment it is most malleable. The founders set the initial parameters — the initial threshold values, the initial council composition rules, the initial constitutional commitments — and these choices have lasting effects.

The LVN's response to this is not a solution but a mitigation:

**Sunset clauses:** Every parameter in the governance framework has a mandatory 24-month sunset. If not explicitly reaffirmed by community referendum, it reverts to the most equity-protective available alternative. Inaction is not permission to continue.

**Founder exclusion from governance:** The founding team is explicitly excluded from council membership and veto participation for the first 48 months of operation. They may contribute technically, may advise, may observe — but the governance of equity must be in community hands from the start, not transitioned from founder control after the critical early decisions have been made.

**Transparent founding record:** All founding decisions — initial parameter choices, constitutional commitments, council composition rules — are published with full rationale before the first community member joins. The community accepts (or rejects) these terms with full knowledge.

**Mandatory review at scale:** Specific scale thresholds trigger mandatory governance review. At 1,000 active participants, at 5,000, at 20,000, the governance architecture must be reviewed and affirmatively renewed by community referendum. The governance system that works for 300 people may be inadequate for 10,000.

---

## Part V: Historical Case Studies in Cooperative Capture

### 5.1 Mechanical Turk — The Piece-Rate Trap

Amazon Mechanical Turk (2005-present) began as a peer-to-peer marketplace for human intelligence tasks — the kind of judgment, creativity, and situational understanding that automated systems couldn't yet provide. Workers were described as "human intelligence task" providers, not employees. The cooperative framing was explicit: people with time and skill connecting with people who need tasks done.

By 2020, the median wage on Mechanical Turk was $2/hour after accounting for unpaid time (rejections, waiting, reading task descriptions). Workers with high `PowerIndex` equivalents — high ratings, high approval rates, long tenure — earned approximately $7-9/hour. New entrants earned $1-2/hour or less.

**Which capture mechanisms applied:**
- Requester ratings created severe temporal advantage (Rule C captures this)
- High-reputation workers received preferential task routing (Mechanism 1: visibility asymmetry)
- No governance mechanism existed — workers had no collective voice in platform rules
- The PSR equivalent was never measured because the platform had no equity mandate

**The governance failure:** There was no governance system. Mechanical Turk had no equity monitoring, no periphery service mandate, no council, no veto. Power concentrated without mechanism of response.

**The LVN distinction:** The LVN is not an employment platform. But the structural dynamic — preferential attachment producing power concentration, no active counterbalance, exploitation of the least-connected — would operate identically without this document's provisions.

---

### 5.2 Time Banks — The Activation Gap

Time banking — where participants earn and spend "time dollars" for cooperative acts, with all time valued equally — is perhaps the closest existing precedent to LVN cooperative economics. The largest time banking networks (hOurworld, TimeBanks USA, Timebanking UK) have operated for decades and represent serious attempts at alternative economic exchange.

The persistent finding in time banking research: 20-30% of participants generate 70-80% of exchanges. The remaining 70-80% join, earn some time dollars, and then stop participating. The less active participants are consistently those with fewer initial social connections, lower English literacy (in English-language networks), higher rates of disability, and lower economic privilege — precisely the people time banking is theoretically best positioned to serve.

**Which capture mechanisms applied:**
- Trust bootstrapping advantage: participants who knew other participants already had easier first exchanges
- Capacity discovery asymmetry: participants who could articulate their skills in standard categories were more matchable
- No periphery-boost mechanism: the matching algorithm (often human-mediated) defaulted to known and trusted
- Community orgs that ran time banks served their existing constituencies better than newcomers

**The key insight:** Time banks solved the economic justice problem (all time is equal) but not the *access* problem. The equity of the nominal exchange rate is irrelevant if 70% of participants can't get their first exchange started. The LVN's automatic interventions (trust bootstrapping subsidy, periphery-first routing, discovery equalization) are direct responses to the time banking activation gap.

---

### 5.3 Platform Cooperatives — The Scale Ceiling

The platform cooperative movement (Scholz & Schneider, 2016) has produced dozens of worker-owned alternatives to extractive platforms — Stocksy (photography), Up&Go (cleaning services), Resonate (music streaming), and many others. These represent serious attempts to build cooperative governance into digital platforms from the start.

The consistent challenge: platform cooperatives have difficulty scaling past a size threshold (~500-2,000 active members) while maintaining meaningful democratic governance. At small scale, all members know each other, governance is tractable, and capture risk is low. At large scale, governance participation rates fall, decisions are made by an active minority, and the cooperative structure becomes nominal rather than functional.

**The relevant failure pattern:** The governance mechanism that works at 300 people fails at 3,000 — not because people become less cooperative, but because participation costs rise with scale while individual governance influence falls. Rational participation in governance declines as the community grows. The people who continue to participate in governance are those with the most at stake — which means, typically, those with the most accumulated cooperative power.

**The LVN response:** Layered governance (§4.1) with explicit scale-triggered review requirements (§4.3). The mandatory review at scale thresholds is a direct response to the platform cooperative governance ceiling. What the governance system becomes at 10,000 participants must be redesigned for that scale — not imported from the design that worked at 300.

---

## Part VI: Power Balance as Protocol Feature

### 6.1 The PowerBalance Attribute on CooperativeActs

WD-007 introduced `CooperativeAct.powerBalance: Float[-1..1]` as a proposed attribute. This section specifies it precisely.

```
CooperativeAct.powerBalance = perceived distribution of value and risk between parties

Range:
  -1.0: fully A-favoring (B does all the work, A captures all the benefit)
   0.0: symmetric (both parties perceive equal value exchange)
  +1.0: fully B-favoring (A does all the work, B captures all the benefit)

Measurement:
  powerBalance is NOT an objective calculation — it is a governance monitoring input.
  It is estimated by the GovernanceAgent from:
    1. Post-act outcome signals (optional self-report from both parties)
    2. Comparison of capacity deployed by A and B
    3. Comparison of need met for A and B
    4. Economic value proxies where available
    5. Contextual signals (power differential indicators)
    
Privacy:
  powerBalance is a protocol-internal monitoring attribute
  It is NEVER shared with participants
  It is ONLY used to:
    a. Track aggregate patterns for equity monitoring
    b. Inform EquityVeto trigger calculations
    c. Inform automatic intervention calibration

Governance note:
  A single act with powerBalance = -0.7 is not a governance concern.
  A participant with avg(powerBalance) = -0.65 across 20+ acts IS a concern.
  The pattern, not the incident, triggers governance response.
```

---

### 6.2 The Dependency Risk Monitor

The most acute equity risk in the LVN is not explicit exploitation but **structural dependency**: a person with low cooperative network power becoming deeply reliant on a small number of highly-connected participants, with no exit options and no alternative sources of cooperative support.

This replicates the informal economy dependency patterns that structurally disadvantage the poorest communities: the one car owner in the neighborhood who everyone depends on for rides, the one person with immigration knowledge that everyone consults, the one trusted elder whose death leaves a community functionally helpless. These are not exploitative individuals — they are structural bottlenecks, and their scarcity is what makes them structurally powerful.

```
DependencyRisk(person_A) = f(
  number_of_distinct_persons_A_cooperates_with,
  concentration_of_A's_cooperative_acts_with_top_1_person,
  A.PowerIndex,
  A.alternative_cooperative_sources_available
)

High DependencyRisk signals:
  - >60% of A's cooperative acts with a single other person
  - A.PowerIndex < 0.25 AND primary cooperative partner PowerIndex > 0.70
  - No alternative sources for A's top 3 cooperative needs

Response:
  - Automatic: route alternative sources to A's needs; don't suppress existing relationship
  - Monitoring: watch for pattern of high-power partner reducing responsiveness 
    (a common precursor to dependency exploitation)
  - If high-power partner becomes unavailable: immediate alternative-source routing surge
```

---

### 6.3 Exit Rights as Anti-Capture Insurance

The most powerful anti-capture mechanism is the credible threat of exit. A participant who cannot leave — because their cooperative history, trust network, and reputation are locked into the LVN — cannot credibly threaten to exit, which removes their primary governance leverage.

Exit rights are therefore not a courtesy feature. They are a structural governance requirement:

**Right 1 — Full data portability:** Any participant may export their complete cooperative history, capacity profile, trust network graph (nodes and edge strengths, with consent of other parties), and MeaningElement history in a standard open format at any time, for any reason, at no cost, within 72 hours of request.

**Right 2 — Protocol interoperability:** The LVN protocol is open-source and the data formats are open standards. Any community may run their own instance. Any participant may migrate their data to an alternative instance. The LVN has no proprietary lock on the cooperative infrastructure it provides.

**Right 3 — Gradual exit:** A participant who is reducing engagement may gradually reduce their cooperative activity without penalty. There is no engagement requirement for continued data access, no "inactive account" deletion without explicit notice and consent.

**Right 4 — Collective exit:** A group of participants may collectively organize to fork the protocol, establish a new instance, and migrate their cooperative histories to it. This is the nuclear anti-capture option — the community equivalent of leaving the platform entirely. The governance system must not make this prohibitively difficult.

The exit rights exist in tension with network effects: a protocol with strong exit rights is less powerful than one with lock-in, because participants can leave and take their cooperative history with them. This is the right tradeoff. A cooperative commons that you cannot leave is no longer a commons — it is a captive market.

---

## Part VII: The Equity Imperative — A Closing Argument

### 7.1 Why Equity Cannot Be Added Later

The history of digital platforms is littered with equity provisions added late — after the growth phase, after the power dynamics have crystallized, after the participants who would have constrained power concentration have already been marginalized.

Adding equity provisions late is like adding fire exits to a building after it's full of people. The exits can still prevent casualties — but the building wasn't designed for them, the paths are awkward, and there are structural elements in the way that can't be removed without threatening the whole edifice.

The LVN's equity architecture must be present from the first deployment, not because it is politically necessary (though it is) but because the power dynamics that equity governance responds to begin operating from the first interaction. The first match in the first pilot community begins accumulating trust, reputation, and matching history that will compound for years. Getting it wrong from the start means the error compounds.

**There is no "grow first, fix equity later" path for a platform that claims to address inequality.** If the LVN achieves scale with unremediated power concentration, it will have succeeded in the narrow sense (millions of interactions, large cooperative value) while failing in the essential sense (serving those who need it most with what they need most). That is not a success worth having.

---

### 7.2 The Standard of Success

The LVN's equity performance should be evaluated by one question above all others:

**Are the least-connected members of the communities we serve better off — in material, meaning, and cooperative terms — than they would be without the LVN?**

Not: is the median participant better off?  
Not: has total cooperative value increased?  
Not: have the most active participants flourished?  

These matter. But they are not sufficient. The standard of success for a cooperative infrastructure that claims to serve communities is the standard appropriate to the claim: does it serve those communities — all of them, including their periphery — or does it serve a well-connected fraction while adding complexity and capture risk for the rest?

The governance mechanisms in this document exist to make that standard enforceable. Not aspirational. Not nominal. Enforceable.

---

## Appendix A: PowerIndex Calculation — Reference Implementation

```python
def compute_power_index(participant_id, community_id, window_days=90):
    """
    Compute PowerIndex for a participant within a community.
    Returns float in [0,1], community-normalized.
    """
    
    # P1: Degree Centrality
    active_connections = count_active_cooperative_relationships(
        participant_id, community_id, days=window_days
    )
    degree_raw = active_connections / community_max_connections
    
    # P2: Betweenness Centrality (structural holes)
    betweenness_raw = compute_trust_network_betweenness(
        participant_id, community_id
    )  # normalized 0-1 within community
    
    # P3: Trust Centrality
    trust_centrality_raw = compute_trust_eigenvector_centrality(
        participant_id, community_id
    )  # how much is one's trust relied on by others?
    
    # P4: Temporal Advantage
    tenure_days = (today() - participant.join_date).days
    acts_completed = count_cooperative_acts(participant_id, community_id)
    temporal_raw = min(1.0, (tenure_days/365 * 0.4 + acts_completed/200 * 0.6))
    
    # P5: Capacity Premium  
    capacity_demand_ratio = get_capacity_demand_ratio(participant_id, community_id)
    # ratio of how often participant's capacity is sought vs. available supply
    capacity_raw = min(1.0, capacity_demand_ratio / 3.0)
    
    # Weighted combination (default weights)
    raw_index = (
        0.20 * degree_raw +
        0.30 * betweenness_raw +
        0.25 * trust_centrality_raw +
        0.15 * temporal_raw +
        0.10 * capacity_raw
    )
    
    # Community normalize
    community_distribution = get_community_power_raw_scores(community_id)
    normalized = percentile_rank(raw_index, community_distribution) / 100.0
    
    return normalized
```

---

## Appendix B: Open Questions

1. **The measurement validity problem.** `powerBalance` is estimated, not observed. The estimation depends on proxies (capacity deployed, needs met) that may systematically misestimate actual power balance in ways that track existing social inequities. A white professional's deployed capacity may be overvalued by the proxy; a person of color's may be undervalued. How is the estimation method validated for bias?

2. **The governance participation cliff.** The council requires participation from bottom-40% `PowerIndex` participants — but those participants may have the least capacity to participate in governance (time scarcity, language barriers, caregiving demands, distrust of institutional processes). How is meaningful governance participation enabled for the people with the least governance experience and the most structural barriers to participation?

3. **The PowerIndex gaming problem.** Once participants know their `PowerIndex` affects their governance access and routing, they have incentives to manage it. A high-`PowerIndex` participant might reduce their cooperative activity to keep their index low enough to maintain governance access. A low-`PowerIndex` participant might perform low-value cooperative acts to inflate their activity count. How robust is the metric to strategic manipulation?

4. **The cross-community equity problem.** Communities with high existing social capital (well-resourced neighborhoods, professional communities) will achieve cooperative phase transitions faster than communities with low existing social capital (high-poverty, high-distrust neighborhoods). Does the LVN's deployment sequence, pricing, and resource allocation actively compensate for this? Or does it follow the market and serve the already-served first?

5. **The founder paradox without resolution.** This document acknowledges the founding paradox (§4.3) but the mitigation — transparency, founder exclusion from governance, sunset clauses — is not a solution. The founding choices still have lasting effects. What additional mechanisms might address this, and are there design traditions (constitutional democracy, indigenous governance structures) that have found better solutions?

---

*This document is a working draft. Everything is wrong in some way. Find the flaws.*  
*Released under CC BY-SA 4.0 — fork, critique, extend.*

---

**Next:** WD-011 — The Phase Transition Playbook: Community Pilot Design for Cooperative Critical Mass  
**Next:** WD-012 — The Signal Protocol: Privacy-Preserving Matching Without a Central Database
