# WD-003: Signal Exchange Protocol

**Formal Specification for Privacy-Preserving Cooperative Matching**

*Version 0.1 · February 2026*

---

## Abstract


This document specifies the Signal Exchange Protocol (SEP), the core technical mechanism of the Latent Value Network. The SEP enables AI agents acting on behalf of sovereign individuals to discover cooperative matches without exposing private context. It defines the data structures, message flows, cryptographic primitives, and behavioral contracts required for privacy-preserving ambient matching at scale.
The specification covers four interrelated subsystems: the Signal Generation Engine, which transforms private context into abstract, non-identifying signal vectors; the Match Discovery Protocol, which enables agents to detect complementary patterns through progressive disclosure; the Negotiation Handshake, which mediates the transition from anonymous match to identified connection; and the Feedback Loop, which enables the system to improve match quality over time without compromising privacy.
This is a working document intended to invite rigorous critique, not to prescribe a final design. Every component described here should be treated as a hypothesis to be tested, challenged, and refined through collaborative engagement.


## I. Design Requirements


The Signal Exchange Protocol must satisfy requirements derived from the six foundational principles established in WD-001 and the empirical findings documented in WD-002. These requirements are not aspirational; they are hard constraints that any valid implementation must satisfy.

## 1.1 Privacy Requirements

P1: Context Sovereignty. Private context (the full output of the Personal Context Engine) MUST never leave the user’s sovereign boundary in unencrypted form.
P2: No Reconstruction. No entity — including relay nodes, match brokers, or governance participants — SHALL be able to reconstruct a user’s full context model from observed protocol traffic.
P3: Unlinkability. Users who do not proceed to the Negotiation Handshake MUST remain unlinkable across signal emissions. Repeated signal generation from the same user MUST NOT be correlatable by external observers.
P4: Progressive Disclosure. Information disclosed during match discovery MUST follow a monotonically increasing disclosure schedule: each step reveals strictly more than the previous, and no step can be reversed.
P5: Graceful Forgetting. If a match is not consummated, the receiving agent MUST NOT retain any information beyond the fact that a candidate was evaluated and rejected.

## 1.2 Matching Requirements

M1: Semantic Complementarity. The protocol MUST support semantic matching — discovering complementarity between situations described in natural language, not just exact attribute matching. This is the key requirement that distinguishes the SEP from existing ZK-based credential verification.
M2: Cross-Boundary Priority. Per Chetty et al. (2022) findings in WD-002, the protocol SHOULD prioritize matches that bridge social, economic, or informational boundaries. Same-cluster matches are the easiest to find but generate the least marginal value.
M3: Ambient Discovery. Per evidence that ambient discovery outperforms explicit search (WD-002 §3), the protocol MUST support matching without either party having articulated a specific need or offer. The system must be capable of surfacing matches that neither party would have searched for.
M4: Behavioral Derivation. Per Dunning-Kruger and expertise blindness research (WD-002 §6), the protocol MUST NOT rely on user self-report for capability assessment. Signal generation MUST be derived from observed behavior, not declared attributes.

## 1.3 Equity Requirements

E1: Resource Independence. Low-resource participants (fewer signals, less interaction history, lower digital literacy) MUST NOT be systematically disadvantaged in match quality.
E2: Intermediary Support. The protocol MUST support intermediary agents that act on behalf of individuals or communities with limited direct AI access, per the asymmetry problem identified in WD-001 §V.
E3: Bias Detection. The protocol MUST include mechanisms to detect and correct systematic matching bias toward already-advantaged populations.

## 1.4 Architectural Requirements

A1: Decentralization. The protocol MUST operate without requiring a trusted central coordinator. Any relay or broker infrastructure MUST be replaceable without protocol modification.
A2: Platform Independence. Signal format and matching logic MUST be implementable across different AI assistant platforms without requiring a shared AI model or inference infrastructure.
A3: Standards Compatibility. The protocol MUST integrate with existing AI coordination standards — specifically MCP (Model Context Protocol), A2A (Agent-to-Agent), and emerging agent communication frameworks — as a cooperative layer, not a replacement.


## Ii. Protocol Overview


The Signal Exchange Protocol operates through four sequential phases, each with distinct privacy properties and information flow characteristics. The design follows a progressive disclosure model: information is revealed in strictly increasing increments, and each phase requires explicit consent from both parties before proceeding.


## Iii. Phase 1: Signal Generation Engine


The Signal Generation Engine transforms the rich, private output of the Personal Context Engine (Layer 1) and Latent Capacity Discovery Module (Layer 2) into abstract signal vectors suitable for privacy-preserving comparison. This is the most technically novel component of the protocol and the hardest to get right.

## 3.1 Input: The Context Model

The Personal Context Engine produces a structured representation of an individual’s situation across multiple dimensions. The SEP does not prescribe the internal format of this model (that is the responsibility of Layer 1/2 specifications), but it requires the following output interface:
Latent capabilities. Observed behavioral patterns that indicate capabilities the user may not have explicitly claimed. Examples: successfully resolved three insurance disputes (latent negotiation expertise), consistently explains technical concepts to family (latent teaching capacity).
Latent needs. Inferred from behavioral patterns, resource utilization, and trajectory analysis. Includes problems the user hasn’t diagnosed as well as those they’re aware of.
Available resources. Physical, temporal, social, financial, knowledge-based resources with slack capacity (underutilization detected by behavioral observation).
Cooperation preferences. What kinds of cooperation the user has historically engaged in, what they’ve declined, and what interaction modalities they prefer.
Trajectory signals. Where the user is heading — upcoming life events, projects, challenges — that create future cooperative opportunities not yet manifest.

## 3.2 The Transformation Function

The signal generation function f(context) → signal_vector must satisfy three competing properties simultaneously:
Informativeness. The signal must encode enough about the agent’s cooperative posture that complementary agents can detect potential matches. A signal that reveals nothing is useless.
Non-identifiability. The signal must not allow reconstruction of the underlying context, identification of the individual, or correlation with other signals from the same individual across time.
Complementarity detection. Agents with genuinely complementary situations should produce signals that register as potential matches with high probability. Non-complementary agents should not.


## 3.3 Signal Vector Structure

A signal vector S consists of the following components:

The domain_embedding is the core matching signal. It encodes the agent’s cooperative posture in a d-dimensional space (d is a protocol parameter; initial proposal: d=128). The capability_sketch and need_sketch use Bloom filters to enable fast pre-filtering: agents can quickly discard obviously non-complementary signals before performing the more expensive embedding comparison.

### 3.4 Bloom Filter Design for Capability/Need Sketches

Bloom filters are used because they provide a critical privacy property: false positives. A Bloom filter that reports a capability match may be wrong, which provides plausible deniability. The filter parameters must be tuned to maintain a meaningful false positive rate (proposed: 15-25%) while keeping the false negative rate near zero.
Capabilities and needs are mapped to filter entries through a standardized taxonomy (the LVN Cooperative Taxonomy, to be specified separately) that groups similar capabilities into categories coarse enough to prevent identification but specific enough to enable useful pre-filtering.

## 3.5 Temporal Emission Strategy

Agents MUST NOT emit signals continuously or at predictable intervals (which would enable traffic analysis). Instead, agents follow a randomized emission schedule:
Poisson-process emission. Agents emit at intervals drawn from an exponential distribution with a mean of T_emit (protocol parameter; proposed: 4-8 hours).
Batch emission. Agent emits the same signal vector multiple times across different relay nodes, with different nonces, to prevent single-relay deanonymization.
Cover traffic. Even when context has not changed, the agent periodically re-generates and re-emits signals with fresh nonces to maintain cover traffic and prevent inference from emission silence.


## Iv. Phase 2: Match Discovery Protocol


Match Discovery is the process by which agents identify potentially complementary signals without learning anything about non-matching agents. This phase operates entirely on abstract signal vectors; no private context is exchanged.

## 4.1 Discovery Architecture

The protocol supports three discovery topologies, and implementations MAY support any combination:
Relay-Mediated Discovery. Agents submit encrypted signals to relay nodes that perform oblivious comparison. The relay learns only that a comparison was performed, not the signal content or the result. This uses techniques from private set intersection (PSI) and oblivious transfer.
Peer-to-Peer Discovery. Agents directly compare signals with encountered peers (e.g., agents whose users are in physical proximity or share a community context). This requires no infrastructure but limits discovery radius.
Community-Anchored Discovery. Community organizations or mutual aid networks operate discovery nodes that aggregate signals from their members and perform matching within the community context. This supports the Intermediary requirement (E2) and provides a trust anchor.

## 4.2 The Complementarity Function

Two signal vectors S_a and S_b are considered potentially complementary if they satisfy a composite scoring function:

match_score(S_a, S_b) =
w_1 * embedding_complementarity(S_a.domain_embedding, S_b.domain_embedding)
+ w_2 * sketch_overlap(S_a.capability_sketch, S_b.need_sketch)
+ w_3 * sketch_overlap(S_b.capability_sketch, S_a.need_sketch)
+ w_4 * proximity_bonus(S_a.proximity_hash, S_b.proximity_hash)
+ w_5 * temporal_overlap(S_a.temporal_window, S_b.temporal_window)
+ w_6 * mode_compatibility(S_a.cooperation_mode, S_b.cooperation_mode)

Where embedding_complementarity is NOT simple cosine similarity. Complementary situations are not similar situations — they are situations that fit together. The embedding space must be trained such that someone who needs plumbing help is proximate to someone with plumbing expertise, not to another person who needs plumbing help.


## 4.3 Threshold and Candidate Generation

A match score above the threshold T_match (protocol parameter; dynamically calibrated) generates a candidate entry. The candidate set for each agent is maintained locally and capped at K_max candidates (proposed: 20-50) to bound computational and cognitive load.
Candidates are ranked by match score, but the ranking MUST include a diversity bonus that promotes cross-boundary matches (per requirement M2). Specifically, candidates from demographic, geographic, or social clusters different from the agent’s own receive a multiplicative boost to their ranking score.

### 4.4 Privacy Properties of Match Discovery

The Match Discovery phase must satisfy the following privacy properties:
Match confidentiality. No relay or peer learns which signals matched; only the two matching agents learn of their candidacy.
Traffic analysis resistance. Observing the discovery protocol traffic does not reveal which agents are matching with which, even to infrastructure operators.
Non-candidate obliviousness. Agents that are evaluated but not selected as candidates learn nothing about the evaluating agent, not even that evaluation occurred.


## V. Phase 3: Negotiation Handshake


When Match Discovery produces a candidate pair, the agents enter the Negotiation Handshake — a structured protocol for transitioning from anonymous complementarity detection to identified, consensual connection. This is the phase where privacy is deliberately and incrementally relaxed under the control of both parties.

## 5.1 Handshake State Machine


At every state transition, both parties MUST explicitly consent to proceed. Either party MAY decline at any point without penalty and without revealing information beyond what was already disclosed in previous states.

## 5.2 Scoped Context Packages

The Scoped Context Package is a carefully constructed subset of the agent’s full context model, tailored to the specific match and designed to reveal only what is necessary for the other party to evaluate fit. It includes:
Match-relevant narrative. A natural-language description of the capability or need relevant to this specific match. This is generated by the AI agent, not extracted verbatim from the context model.
Credibility signals. Verifiable attributes relevant to the match (e.g., “has professional experience in domain X” verified through the Trust Fabric), without revealing the evidence.
Cooperation parameters. What kind of interaction is proposed (one-time help, ongoing mentorship, resource sharing, etc.).
Reciprocity framing. What the agent needs from the other party — making the exchange legible and preventing exploitation of asymmetric information.


## 5.3 The Decline Path

Declining a match is a first-class protocol operation, not an error state. The protocol MUST ensure:
No information leakage on decline. No information beyond what was disclosed at the current state leaks to the declining or declined party.
No repeated proposals. Declined matches are not re-proposed within the same emission epoch. Repeated proposals from the same source constitute a protocol violation.
No decline penalty. The system does not track or penalize decline rates. Declining is a legitimate exercise of agency, not a signal of uncooperativeness.
Feedback without attribution. A decline generates a calibration signal (Phase 4) that improves future match quality without revealing why the match was declined.


## Vi. Phase 4: Feedback Loop


The Feedback Loop enables the protocol to improve match quality over time without compromising privacy. This is the mechanism by which the system learns which kinds of matches succeed and which fail, calibrating the Complementarity Function and signal generation parameters.

## 6.1 Feedback Signals

Feedback signals are generated at three points in the protocol lifecycle:
Post-decline signal. When a user declines at any point in the Negotiation Handshake. The signal encodes the handshake state at which decline occurred (INTEREST, SCOPED_REVEAL, EVALUATION) and the match category, but NOT the identity of either party or the specific content of the scoped context package.
Post-commit signal. When both parties commit to a connection. The signal encodes the match category, cooperation type, and cross-boundary indicators.
Outcome signal. Generated after a user-defined interval following commitment. Encodes whether the cooperation occurred, whether it was perceived as valuable, and whether it led to further cooperation. This signal is entirely optional.

## 6.2 Differential Privacy in Feedback

All feedback signals are processed through a differential privacy mechanism before they influence system parameters. Specifically:
Feedback signals are aggregated across a minimum of N_batch users (proposed: 100-500) before being used to adjust any system parameter. Individual signals are perturbed with calibrated Laplace noise before aggregation. The privacy budget ε is tracked cumulatively across feedback cycles, with a hard cap per user per epoch.
This ensures that no individual’s matching behavior — including patterns of accepting and declining — can be inferred from observed parameter changes.


## Vii. Integration Architecture


The Signal Exchange Protocol is designed to operate as a cooperative layer atop existing AI coordination standards. This section specifies how the SEP maps to the protocols that the AEGIS framework and broader AI ecosystem are converging on.

### 7.1 MCP (Model Context Protocol) Integration

The Personal Context Engine (Layers 1-2) naturally maps to MCP’s context management capabilities. The SEP extends MCP by defining a new context type — cooperative context — that represents the subset of an agent’s context model relevant to inter-agent matching. An MCP-compliant AI assistant can implement Layers 1-2 within its existing context management framework and expose cooperative context through a standardized MCP resource interface.

## 7.2 A2A (Agent-to-Agent) Integration

The Match Discovery and Negotiation Handshake phases map directly to A2A communication patterns. The SEP defines specific A2A message types for signal emission and relay, candidate notification, handshake state transitions, and scoped context package exchange. Implementations SHOULD use existing A2A transport and authentication mechanisms rather than defining new ones.

### 7.3 UCP (Unified Context Protocol) Integration

The UCP framework’s envelope architecture provides a natural container for LVN signal vectors. A UCP Implementation Envelope (UIE) carrying LVN cooperative signals can traverse the standard UCP pipeline: UIE envelopes carry signal vectors through the API layer, shared services handle relay and discovery infrastructure, the event bus manages handshake state transitions, and the AI orchestration layer coordinates between the Personal Context Engine and the Signal Generation Engine.


## Viii. Threat Model & Security Analysis


This section identifies the primary threat vectors against the Signal Exchange Protocol and specifies the mitigations that implementations MUST provide. The threat model assumes a powerful adversary with the ability to operate relay nodes, observe network traffic, and control multiple agent identities.

## 8.1 Threat Vectors

Sybil probing. An adversary creates multiple agent identities to probe the signal space, attempting to reconstruct individual context models by observing which signals match synthetic probes.
Traffic analysis. An adversary operating relay infrastructure performs timing analysis on signal emissions, candidate notifications, and handshake initiations to deanonymize participants.
Signal fabrication. A malicious AI assistant generates false signals (inflated capabilities, fabricated needs) to attract matches for exploitation.
Match pattern inference. An adversary uses match patterns over time to build a behavioral profile of a target, even without accessing their private context.
Relay collusion. Entities controlling large numbers of agents use their position to observe or manipulate matching patterns across the network.

## 8.2 Required Mitigations


## Ix. Protocol Parameters


The following parameters govern protocol behavior. Initial values are proposals based on theoretical analysis; they MUST be validated through simulation and pilot deployment before standardization.


### X. OPEN QUESTIONS FOR COLLABORATIVE RESOLUTION


This specification deliberately leaves several critical questions open for community resolution. These are not oversights — they represent design decisions that require input from cryptographers, mechanism designers, ethicists, and practitioners that exceeds what any single working group can provide.


## OQ-1: Embedding Model Governance

Who trains, maintains, and updates the embedding model that maps context to signal space? Options include a federated training approach where each community trains on local data and models are averaged, a foundation model approach where a single model is trained on synthetic or donated data and published as a public good, or a marketplace approach where multiple competing embedding models operate simultaneously. Each has different trust, equity, and coordination implications.

### OQ-2: Semantic Matching Under Encryption

Can meaningful semantic complementarity detection be performed on encrypted signal vectors using current homomorphic encryption or secure multi-party computation techniques? If not, what is the minimum plaintext exposure required, and how does this interact with the Non-Reconstruction requirement (P2)?

## OQ-3: Cold Start for Individuals

A new participant has no behavioral history from which to derive signals. How does the protocol handle the bootstrap period? Options include allowing limited self-report during bootstrap (with a trust discount), relying on intermediary agents who can vouch for the individual, or accepting lower match quality during the bootstrap period and communicating this transparently to the user.

### OQ-4: Cross-Community Signal Compatibility

If different communities use different embedding models or taxonomies, how are signals translated at community boundaries? This is analogous to the internet’s protocol translation challenges but in a semantic rather than syntactic domain.

## OQ-5: Value Exchange Integration

How does the protocol interact with the pluralistic value exchange spectrum described in WD-001? When a match involves both a gift component and a transactional component, how is this represented in the handshake? How do we prevent the protocol from inadvertently commodifying non-market cooperation?

## OQ-6: Governance of Parameter Evolution

Protocol parameters (Section IX) will need to evolve as the network grows and learns. What governance mechanism determines parameter changes? How do we prevent parameter manipulation by actors who would benefit from biasing the matching process?


## Xi. Relationship To Other Lvn Layers


The Signal Exchange Protocol (Layer 3) depends on and supports the other four layers of the LVN architecture:


## Xii. Implementation Guidance


This section provides non-normative guidance for implementers, particularly for the initial reference implementation.

### 12.1 Recommended Implementation Sequence

Signal structure and basic matching. Implement the signal vector structure and Bloom filter components. Use synthetic data and a simple cosine-similarity complementarity function (replacing the full embedding approach) to validate the protocol flow end-to-end.
Handshake protocol. Implement the full handshake state machine with scoped context packages. Test with human participants in a controlled pilot setting to validate the user experience of progressive disclosure.
Relay infrastructure and privacy layer. Integrate with MCP/A2A transports. Implement relay-mediated discovery with cover traffic. This is where the privacy properties become real.
Embedding model training. Replace the simple similarity function with a trained embedding model. This requires a training dataset of cooperative matches, which may come from the pilot phase or from synthetic generation.
Feedback loop and adversarial testing. Implement the differential privacy feedback mechanism and parameter calibration. Run adversarial testing against the threat model.

## 12.2 Minimum Viable Protocol (MVP)

For initial pilot deployment, an MVP implementation MAY simplify by using community-anchored discovery only (no relay infrastructure needed), a pre-defined cooperative taxonomy instead of learned embeddings, manual scoped context packages (user writes their own) instead of AI-generated ones, and a trusted community coordinator for relay functions with a commitment to migrate to decentralized infrastructure. This MVP sacrifices scalability and some privacy properties but enables early testing of the core matching concept.


“A protocol for human cooperation must be designed with the same rigor and care as protocols for human communication. The internet didn’t emerge from a single design — it emerged from a community of designers who held each other accountable to shared principles. We aim for no less.”


## ──────────────────────────────

This specification is deliberately incomplete.
It identifies what must be solved, proposes how, and marks where it needs help.
The hardest problems are open by design.

The Latent Value Network  •  Signal Exchange Protocol  •  WD-003 v0.1
Released under Creative Commons Attribution-ShareAlike 4.0

| Document Status
Maturity: Draft specification, pre-implementation
Dependencies: Assumes WD-001 (White Paper) architecture and WD-002 (Evidence Base) findings
Open questions: Marked throughout with [OPEN] tags for collaborative resolution
Normative language: MUST, SHOULD, MAY follow RFC 2119 conventions |
| --- |


| Phase | Input | Output | Privacy Property |
| --- | --- | --- | --- |
| 1. Signal Generation | Private context model | Abstract signal vector | Non-identifying; unlinkable |
| 2. Match Discovery | Signal vectors from multiple agents | Candidate match set | Zero-knowledge complementarity |
| 3. Negotiation Handshake | Candidate match pair | Mutual consent + scoped disclosure | Progressive; revocable until commit |
| 4. Feedback Loop | Match outcome (accepted/declined/completed) | Calibration signal | Differentially private; non-attributable |


| Key Abstraction: The Signal Vector
A signal vector is a fixed-dimensional, abstract representation of an agent’s cooperative posture —
what it might offer and what it might benefit from — that is designed to be meaningless in isolation
but detectable by agents with complementary patterns. Think of it as a lock that only reacts to
specific key shapes, without revealing the lock’s internal mechanism. |
| --- |


| [OPEN] The Embedding Question
The most promising approach uses learned embeddings: a neural model that maps natural-language
context descriptions into a latent space where complementary situations are geometrically proximate.
However, this raises a critical question: who trains the embedding model? A centrally trained model
creates a single point of trust (and capture). A federated approach preserves sovereignty but may
produce inconsistent signal spaces across communities. This is perhaps the most important open
design question in the entire protocol. We solicit proposals from the community. |
| --- |


| Component | Type | Purpose | Privacy Level |
| --- | --- | --- | --- |
| domain_embedding | Float[d] | Position in cooperative latent space | Non-identifying |
| capability_sketch | Bloom filter | Probabilistic capability fingerprint | False-positive preserving |
| need_sketch | Bloom filter | Probabilistic need fingerprint | False-positive preserving |
| resource_flags | Bit vector | Coarse resource availability categories | Category-level only |
| cooperation_mode | Enum set | Preferred interaction types | Self-declared |
| temporal_window | Time range | When cooperation is relevant | Coarse granularity |
| proximity_hash | Geohash(precision=3) | Approximate geographic region | ~78km resolution |
| nonce | Random bytes | Prevents cross-emission linkage | Unique per emission |
| emission_epoch | Integer | Protocol time period of generation | Coarse temporal anchor |


| [OPEN] Complementarity vs. Similarity
Standard embedding approaches optimize for similarity (items that are alike cluster together).
The SEP requires complementarity (items that fit together cluster together). This may require
a novel training objective — potentially based on historical cooperative matches, or on
contrastive learning where positive pairs are successful cooperations and negative pairs are
failed or non-occurring matches. The training data bootstrapping problem is significant.
Community proposals for training approaches are actively solicited. |
| --- |


| State | Initiator Action | Responder Action | Information Disclosed |
| --- | --- | --- | --- |
| CANDIDATE | Agent surfaces match to user | Agent surfaces match to user | Match category only (e.g., “someone nearby with relevant expertise”) |
| INTEREST | User expresses interest | User expresses interest | Mutual interest confirmed; cooperation type revealed |
| SCOPED_REVEAL | Agent shares scoped context package | Agent shares scoped context package | Task-relevant details only (not full context) |
| EVALUATION | User evaluates revealed context | User evaluates revealed context | Both parties see scoped packages |
| COMMIT | User confirms connection | User confirms connection | Identity exchange; communication channel opened |
| DECLINE | User or agent declines | User or agent declines | No additional information; graceful exit |


| Security Constraint: No Raw Context Leakage
The Scoped Context Package MUST be generated by the AI agent, not extracted from the raw context
model. This prevents inadvertent disclosure of sensitive information. The agent acts as a privacy
firewall: it understands the full context but reveals only a curated, purpose-built narrative.
Implementation MUST include a review step where the user can inspect and modify the package
before it is transmitted. |
| --- |


| Threat | Mitigation | Implementation Requirement |
| --- | --- | --- |
| Sybil probing | Rate-limited signal comparison; Trust Fabric gating | MUST implement; Trust Fabric bootstrapping required |
| Traffic analysis | Cover traffic; batch emission; mix networks | MUST implement cover traffic; SHOULD use mix networks |
| Signal fabrication | Behavioral derivation (M4); Trust Fabric verification | MUST implement behavioral derivation; verification via Layer 4 |
| Match pattern inference | Nonce rotation; unlinkability (P3); emission randomization | MUST implement; pattern ceiling of K_max candidates per epoch |
| Relay collusion | Multi-relay emission; relay rotation; relay reputation | MUST emit through ≥3 independent relays per signal |


| Critical Security Principle: Harm Inversion
Per foundational Principle 6 (Harm Inversion), if any component of the SEP cannot be made
resistant to a threat vector by design, that component MUST NOT be deployed. Security is not
a feature to be balanced against functionality — it is a constraint that defines the space of
acceptable designs. The Ethics & Equity working group retains veto power over any component
that fails adversarial review. |
| --- |


| Parameter | Description | Proposed Value | Governance |
| --- | --- | --- | --- |
| d | Signal embedding dimensionality | 128 | Protocol-level; requires consensus |
| T_emit | Mean signal emission interval | 4-8 hours | Agent-level; within protocol bounds |
| T_match | Match score threshold | Dynamic (calibrated) | Community-level; tunable |
| K_max | Maximum candidate set size per agent per epoch | 20-50 | Protocol-level |
| N_batch | Minimum aggregation batch for feedback | 100-500 | Protocol-level; privacy-critical |
| ε_epoch | Differential privacy budget per user per epoch | 1.0 | Protocol-level; privacy-critical |
| FP_rate | Target Bloom filter false positive rate | 15-25% | Protocol-level |
| geohash_precision | Geographic proximity resolution | 3 (~78km) | Protocol-level; equity-relevant |
| relay_min | Minimum relay diversity per emission | 3 | Protocol-level; security-critical |
| handshake_timeout | Maximum time in any handshake state | 72 hours | Protocol-level |


| Layer | Relationship to SEP | Interface |
| --- | --- | --- |
| L1: Personal Context Engine | Provides the private context model that SEP transforms into signals | Context → Signal Generation input |
| L2: Latent Capacity Discovery | Provides latent capability assessments that enrich signal content | Capability model → Signal components |
| L3: Signal Exchange Protocol | THIS SPECIFICATION | — |
| L4: Trust & Reputation Fabric | Provides trust signals used in handshake evaluation and relay reputation | Trust queries during Phase 3 |
| L5: Governance Layer | Governs protocol parameter evolution and dispute resolution | Parameter updates; violation adjudication |
