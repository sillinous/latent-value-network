# WD-005: Trust & Reputation Fabric

**Layer 4 Specification — Distributed Contextual Trust**

*Version 0.1 · February 2026 · Draft*

---

## Abstract


This document specifies the Trust & Reputation Fabric (Layer 4) of the Latent Value Network. The Trust Fabric provides the relational trust infrastructure that the Signal Exchange Protocol (WD-003) requires for handshake evaluation, relay reputation, and Sybil resistance. It defines a distributed, contextual, privacy-preserving trust system that flows through relational chains rather than centralized scores.
The specification addresses three core problems: how trust is established between strangers who have no prior relationship (the bootstrap problem), how trust signals are transmitted without revealing the social graph (the privacy problem), and how trust remains meaningful across social and cultural boundaries (the boundary problem). Each of these maps to specific evidence from WD-002 and requirements from WD-003.


## I. Design Principles For Trust


The Trust Fabric must satisfy constraints derived from the foundational principles (WD-001) and operational requirements of the Signal Exchange Protocol (WD-003). These constraints are non-negotiable and distinguish the LVN’s trust model from existing approaches.

## 1.1 What Trust Is Not

The Trust Fabric explicitly rejects several common trust model patterns that conflict with LVN principles:
Not a trust score. A single number attached to an identity that represents general trustworthiness. These are surveillance instruments that create permanent reputation records, enable discrimination, and collapse the multidimensional reality of trust into a single axis.
Not a permanent record. A record of every cooperation, rating, and interaction that follows a person across contexts. The Trust Fabric does not build dossiers.
Not a certification authority. A system where a few highly-trusted nodes grant or withhold access. This recreates the centralized power structures the LVN exists to avoid.
Not a rating system. A subjective, post-interaction assessment that creates incentive for performative behavior. Star ratings measure compliance, not trustworthiness.

## 1.2 What Trust Is


## Ii. The Relational Trust Model


Trust in the LVN is modeled as a weighted, directed, contextual graph where nodes are agents and edges represent trust relationships scoped to specific cooperative domains.

## 2.1 Trust Edge Structure


Trust edges are created through three mechanisms, each with different initial strength and decay characteristics:
Direct experience. Formed through successful cooperative interactions between the two agents. Starts at moderate strength (0.4-0.6) and increases with repeated positive interactions. Slowest decay rate (most durable).
Intermediary vouching. Agent A trusts Agent B because Agent C, whom A trusts, vouches for B. Strength is attenuated: if A trusts C at strength s1, and C vouches for B at strength s2, then A’s derived trust in B is s1 × s2 × attenuation_factor (proposed: 0.7). Chain length is capped at 3 hops.
Institutional anchoring. Libraries, clinics, community organizations, and other institutions serve as trust anchors. Their trust edges carry a special institutional flag that gives them higher initial strength (0.5-0.7) for first-interaction bootstrapping, but the institutional basis MUST be disclosed to the trusting party.

## 2.2 Contextual Decomposition

Trust is never general-purpose. The Trust Fabric decomposes trust into domains drawn from the LVN Cooperative Taxonomy (the same taxonomy used for Bloom filter entries in the Signal Exchange Protocol). An agent might be highly trusted for home repair advice (strength 0.9) and untrusted for financial guidance (no edge). Cross-domain trust inference is explicitly prohibited — trust in domain X provides zero information about trust in domain Y unless the domains share a defined relationship in the taxonomy.


## 2.3 Trust Decay and Renewal

Trust is not permanent. All trust edges decay over time according to their decay_rate parameter. The decay function is exponential: trust_current = trust_initial × e^(-decay_rate × time_since_last_confirmation). This means trust that is not periodically reinforced through continued cooperation or renewed vouching will eventually fall below the usable threshold and be pruned from the graph.
Decay rates vary by trust basis: direct experience decays slowest (proposed half-life: 18 months), intermediary vouching decays faster (proposed half-life: 6 months), and institutional anchoring decays at a moderate rate (proposed half-life: 12 months) unless renewed by the institution.


### III. PRIVACY-PRESERVING TRUST VERIFICATION


The central technical challenge of the Trust Fabric is enabling trust queries without revealing the social graph. When Agent A asks “is Agent B trustworthy for home repair?” during the negotiation handshake, the system must answer this question without revealing who trusts whom, how many trust edges exist, or the structure of the relational chain.

## 3.1 The Trust Query Protocol

Trust queries are performed during Phase 3 (Negotiation Handshake) of the Signal Exchange Protocol. When Agent A is evaluating a candidate match with Agent B, Agent A’s trust query proceeds as follows:
Query formulation. Agent A constructs a query: “Does there exist a trust path of length ≤ 3 from me to Agent B in domain D with aggregate strength ≥ T_trust?”
ZK verification. The query is submitted to the Trust Fabric as a zero-knowledge verification request. The protocol verifies the existence of a qualifying path without revealing the path itself, the intermediate nodes, or the individual edge strengths.
Response. The response is a boolean (path exists / does not exist) plus a coarse trust tier (HIGH / MODERATE / LOW / NONE) derived from the aggregate path strength. No additional information is revealed.


## 3.2 Implementation Approaches

Two candidate approaches for privacy-preserving trust verification are proposed for community evaluation:

## Approach A: Blind Intermediary Protocol

Trust verification is mediated by a set of blind intermediary nodes that each hold a partial view of the trust graph. No single intermediary can reconstruct the full graph. Queries are split across multiple intermediaries using secret sharing, and the result is reconstructed only by the querying agent. This approach is simpler to implement but requires trust in the intermediary set (mitigated by rotation and redundancy).

## Approach B: ZK-SNARK Trust Proofs

Each agent maintains a local proof that they are part of a trust chain. When queried, they produce a zero-knowledge proof that a qualifying path exists without revealing any component of the path. This approach provides stronger privacy guarantees but is computationally expensive and requires a trusted setup for the proof system (which conflicts with the decentralization requirement).


## Iv. The Bootstrap Problem


A new participant in the LVN has no trust edges. Without trust, they cannot participate in the Negotiation Handshake (Phase 3 of the SEP requires trust verification). This creates a cold-start problem that, if solved badly, will exclude exactly the populations the LVN is designed to serve.

## 4.1 Bootstrap Pathways

The Trust Fabric provides four bootstrap pathways, each designed for different contexts:
Institutional introduction. Community organizations that already serve the new participant can create initial trust edges. A library, clinic, community center, or mutual aid network vouches for the participant based on their existing relationship. This is the fastest bootstrap path and the one most likely to reach underconnected populations.
Graduated stakes ladder. New participants are offered a sequence of low-stakes cooperative interactions (proposed: help with a minor task, share a small resource, provide brief advice) that generate direct experience trust edges. Stakes start very small and increase as trust accumulates.
Personal vouching with presence proof. An existing participant who knows the new participant in person can create a trust edge through in-person vouching. This requires physical copresence verification (proposed: mutual QR code scan or shared location proof) to prevent remote Sybil vouching.
Trust-lite mode with disclosure. In the absence of any other bootstrap path, a new participant can operate in a limited mode where they can receive matches but with a transparent disclosure to the other party: “This participant is new and has limited trust history.” The other party can choose to proceed or wait.


## V. Trust Across Boundaries


The LVN’s highest-value matches are cross-boundary — connecting people from different social clusters. But trust is inherently local and homophilous. How does trust flow across the boundaries that the matching protocol is designed to bridge?

## 5.1 Bridge Institutions

Institutions that serve diverse populations create natural trust bridges. A library serves both the retired engineer and the single dad. A clinic serves both the immigrant family and the longtime resident. When these institutions serve as trust anchors for participants on both sides of a social boundary, they create the trust infrastructure that enables cross-boundary matching.
The protocol explicitly incentivizes institutional bridge-building by giving cross-boundary matches a trust bonus when both parties share an institutional trust anchor. This mirrors the evidence from WD-002 that institutional settings are where most cross-class friendships form.

## 5.2 The Homophily Trap

Without deliberate countermeasures, the trust graph will become increasingly homophilous over time — trust flowing preferentially within existing social clusters. The Trust Fabric includes three countermeasures:
Homophily monitoring. The Governance Layer (L5) continuously measures the ratio of within-cluster to cross-cluster trust edges. If this ratio exceeds a threshold (proposed: 3:1), the system flags a homophily warning and triggers interventions.
Cross-boundary decay bonus. Cross-boundary trust edges receive a slower decay rate than within-boundary edges, reflecting their higher value to the network. This is a protocol-level incentive, not a manipulation of individual trust.
Institutional diversity incentive. Institutional trust anchors that demonstrate diverse participation (serving people from multiple social clusters) receive enhanced trust anchor status, which in turn enhances the trust edges they create.


## Vi. Sybil Resistance


The Trust Fabric must resist Sybil attacks — adversaries who create multiple fake identities to manipulate the trust graph. This is especially critical because the LVN’s decentralized architecture lacks a central identity authority.

## 6.1 Sybil Defense Layers


### VII. INTERFACE WITH SIGNAL EXCHANGE PROTOCOL


The Trust Fabric interacts with the Signal Exchange Protocol at three specific points:
Match Discovery (Phase 2): Relay trust filtering. During Phase 2, relay nodes use trust signals to prioritize signal routing. Signals from agents with higher aggregate trust are relayed with higher priority, reducing spam and improving match quality for trusted participants. However, priority MUST NOT create a two-tier system where low-trust participants are effectively invisible.
Negotiation Handshake (Phase 3): Trust verification. During Phase 3, both parties query the Trust Fabric to evaluate the candidate match. The trust tier (HIGH / MODERATE / LOW / NONE) is displayed alongside the scoped context package, giving both parties information to make an informed consent decision.
Feedback Loop (Phase 4): Trust edge creation. Successful cooperations (reported through the feedback loop) create or strengthen direct trust edges. Declined handshakes do NOT create negative trust edges — declining is a legitimate exercise of agency, not evidence of untrustworthiness.


## Viii. Trust Fabric Parameters


## Ix. Open Questions


## TQ-1: Negative Trust

Should the Trust Fabric support negative trust edges (explicit distrust)? Negative trust provides useful information but creates risks: false accusations, reputation attacks, and social weaponization. The current specification omits negative trust deliberately, but this may leave the system unable to propagate legitimate safety warnings.

## TQ-2: Trust Portability

If a participant moves communities, can they bring their trust history? Portability increases user autonomy but enables trust laundering (building trust in one context, exploiting it in another). The decay mechanism provides some protection, but deliberate portability controls may be needed.

## TQ-3: Institutional Accountability

Institutions serve as trust anchors, but what happens when an institution’s trust is misplaced? If a library vouches for someone who exploits the trust, does the library lose trust anchor status? How do we prevent institutional risk-aversion that would make institutions unwilling to vouch?

## TQ-4: Trust and Power Asymmetry

In any trust system, those with more trust have more power. How do we prevent the Trust Fabric from creating a trust aristocracy where early, well-connected participants accumulate disproportionate influence? The trust budget and decay mechanisms provide some constraint, but may not be sufficient.


Trust is the infrastructure of cooperation.
Get it wrong and nothing else matters.
That’s why this document is open.

The Latent Value Network  •  Trust & Reputation Fabric  •  WD-005 v0.1
Creative Commons Attribution-ShareAlike 4.0

| Document Status
Maturity: Initial draft, pre-review
Dependencies: WD-001 principles, WD-003 handshake requirements, WD-002 trust evidence
Open for: Structural critique, alternative models, adversarial analysis |
| --- |


| Trust in the LVN
Trust is a contextual, relational signal that expresses: “People I trust have had positive
cooperative experiences with this person in domains relevant to our potential interaction.”
It is always scoped to a domain, always relational (flowing through chains of people),
always privacy-preserving (verifiable without revealing the chain), and always revocable. |
| --- |


| Component | Type | Description |
| --- | --- | --- |
| source | Agent ID | The agent expressing trust |
| target | Agent ID | The agent being trusted |
| domain | Taxonomy ref | Cooperative domain (e.g., “home-repair”, “financial-advice”) |
| strength | Float [0,1] | Degree of trust in this domain |
| basis | Enum | How trust was established: direct experience, intermediary vouching, institutional anchor |
| recency | Timestamp | When trust was last confirmed or updated |
| decay_rate | Float | How quickly trust decays without reinforcement |


| [OPEN] Domain Granularity
How fine-grained should trust domains be? Too coarse (e.g., “practical skills”) and trust
becomes meaningless. Too fine (e.g., “copper pipe soldering”) and trust can never accumulate.
The granularity must match the level at which people actually form trust judgments.
We need input from social psychologists and community practitioners on this. |
| --- |


| Critical Privacy Constraint
The Trust Fabric MUST NOT enable social graph reconstruction. An adversary who issues many
trust queries MUST NOT be able to infer the structure of the underlying trust graph. This
requires rate-limiting trust queries, adding noise to responses at the boundary between trust
tiers, and preventing correlation between queries about the same target from different sources. |
| --- |


| [OPEN] Which Approach?
Approach A is practical today but introduces intermediary trust assumptions.
Approach B is theoretically superior but may be impractical at scale.
A hybrid (Approach A for bootstrap, migrating to B as ZK tooling matures) is possible.
We need cryptographers to evaluate feasibility and propose alternatives. |
| --- |


| Equity Constraint: Bootstrap Must Not Exclude
Any bootstrap mechanism that requires existing social connections to enter the network
will systematically exclude the most isolated individuals — the exact people with the highest
latent value gap. Institutional introduction and graduated stakes MUST be available in every
community before the network launches. This is a hard prerequisite for pilot deployment. |
| --- |


| Defense Layer | Mechanism | What It Prevents |
| --- | --- | --- |
| Rate limiting | Maximum trust edges created per time period | Rapid trust graph flooding |
| Presence proofs | In-person vouching requires physical copresence | Remote fake identity creation |
| Institutional gating | Initial trust requires institutional introduction | Mass identity bootstrap |
| Graph analysis | Detecting anomalous trust graph patterns (clusters of mutually-trusting new accounts) | Coordinated Sybil rings |
| Stake-weighted trust | Trust from accounts with successful cooperative history weighted higher | Value extraction without contribution |
| Trust budget | Each agent has limited trust capital to allocate per epoch | Trust inflation attacks |


| Parameter | Description | Proposed Value |
| --- | --- | --- |
| max_chain_length | Maximum trust path hops | 3 |
| attenuation_factor | Trust reduction per hop | 0.7 |
| T_trust | Minimum trust for handshake | 0.15 (aggregate) |
| direct_half_life | Direct experience trust decay | 18 months |
| vouch_half_life | Intermediary vouching decay | 6 months |
| institutional_half_life | Institutional anchor decay | 12 months |
| trust_budget_per_epoch | Max new trust edges per agent per epoch | 10 |
| homophily_threshold | Max within/cross-cluster trust ratio | 3:1 |
| cross_boundary_decay_bonus | Decay rate reduction for cross-boundary edges | 0.5x |
| institutional_initial_strength | Starting strength for institutional anchoring | 0.5-0.7 |
