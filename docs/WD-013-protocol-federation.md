# WD-013 — Protocol Federation
## How LVN Communities Connect Without Merging

**Status:** Working Draft v0.1  
**Authors:** LVN Initiative  
**License:** CC BY-SA 4.0  
**Companion docs:** WD-007 through WD-012  
**Companion tool:** lvn-federation-map.html

---

## Preface: The Scale Trap

Every cooperative infrastructure project eventually confronts the scale trap.

Scale is necessary. A cooperative matching protocol serving fifty people has limited capacity to route high-value connections — the probability that any individual's latent capacity is complementary to another person in a pool of fifty is low. A protocol serving five hundred has dramatically higher matching quality. A protocol serving five thousand approaches the capacity for highly specific, high-synergy matches across most capacity types. The cooperative value per participant increases with network size.

But scale is dangerous. A single organization governing a network of five thousand people has concentrated power that invites capture. A centralized reputation database is a surveillance and manipulation target. A universal matching algorithm optimizing across communities will optimize for the metrics that are easiest to measure, which are not the metrics that matter most, and will do so at the expense of community-specific values and governance.

Most platforms resolve this tension by choosing scale. They build central databases, centralize governance, optimize for aggregate engagement metrics, and call it efficiency. The result is what we have: platforms owned by capital, governing the social and economic relationships of millions, extracting value from those relationships, accountable to shareholders rather than communities.

The LVN must not do this. The question this document answers: **how do communities get the benefits of scale without surrendering governance sovereignty?**

The answer is federation — the same architectural principle that has allowed the internet, email, and the ActivityPub protocol (Mastodon, Pixelfed, etc.) to achieve massive scale without central control. But cooperative network federation is harder than technical protocol federation, because what needs to travel between communities is not just messages or posts — it is **trust**, which is contextual, relational, and cannot be transferred without distortion.

---

## Part I: What Federation Means

### 1.1 The Core Distinction

A **platform** is a single organization that operates matching infrastructure for multiple communities. It sets the rules. It owns the data. It determines what crosses community boundaries. Communities on a platform are tenants, not sovereigns.

A **federation** is a set of independently governed communities that have agreed to interoperate using shared protocols. Each community owns its own data and governance. The federation protocol specifies only what travels between communities and how — not what happens within them.

The LVN is a protocol, not a platform. This is not just a philosophical stance — it is a specific set of architectural choices that prevent any single entity from accumulating the power to capture the entire cooperative network.

**The test:** If the organization that created the LVN protocol disappeared tomorrow, could communities that use it continue to operate and interoperate? If the answer is no — if interoperation depends on infrastructure controlled by the founding organization — then it is a platform, not a protocol, regardless of what it calls itself.

The LVN's federation design must pass this test.

---

### 1.2 What Communities Are

In the federation model, a **Community** is the fundamental unit of governance. Every participant belongs to at least one Community. The Community governs:

- Local equity thresholds and power balance monitoring (WD-010)
- Local matching weight configurations (WD-008)
- Local data retention policies
- Local trust validation standards
- Local governance structure and representation requirements

Communities are not defined by geography, though most will have significant geographic overlap with a place. They may be organized around a neighborhood, a professional domain, an affinity group, a religious community, a housing cooperative, or any other organizing principle that generates the relational density needed for a healthy cooperative network.

```
Community {
  id:               UUID (decentralized identifier, not registry-assigned)
  name:             String
  description:      String
  governanceModel:  GovernanceSpec
  
  // Federation settings
  federationStatus: isolated | federated | bridged
  trustedFederates: [Community.id]  // communities with bidirectional trust
  bridgeCommunities: [Community.id] // communities with partial trust
  
  // Data sovereignty
  dataResidency:    'local_only' | 'federated_with_consent' | 'federated_default'
  exportPolicy:     ExportPolicy    // what can leave this community's servers
  importPolicy:     ImportPolicy    // what can enter from other communities
  
  // Equity governance (WD-010)
  equityThresholds: EquityThresholds
  ombudsperson:     Agent.id
  
  // Temporal state (WD-009)
  cooperativeR0:    Float          // current reproductive number
  phaseStatus:      'subcritical' | 'approaching' | 'supercritical'
}
```

---

### 1.3 The Three Federation Modes

Communities can relate to each other in three modes, each with different trust levels and data sharing implications:

**Mode 1 — Isolated**
No inter-community data sharing. No cross-community matching. Each community is an island. This is the default state for new communities and the appropriate state for communities that have not yet established the internal trust infrastructure needed to manage federation safely.

*Appropriate for:* New deployments, communities in Phase 1–2 of cooperative engagement, communities with unresolved internal equity concerns, communities in high-risk deployment contexts.

**Mode 2 — Federated**
Full bidirectional trust between two communities. Cross-community matching is enabled. Reputation records are portable with participant consent. Trust chains extend across community boundaries. Both communities have reviewed each other's equity governance and found it adequate.

*Appropriate for:* Post-transition communities (R₀ > 1) with established equity governance, with verified governance equivalence between federated partners.

**Mode 3 — Bridged**
Partial trust with specific, consent-gated data sharing. A participant can access cross-community matching without their full reputation record traveling. Useful for extending cooperative capacity across communities that don't share full governance equivalence — a wealthy community and an under-resourced community can bridge without creating the power asymmetries that would occur in full federation.

*Appropriate for:* Communities at different development stages, communities with different governance models who want limited interoperation, emergency mutual aid contexts.

---

## Part II: What Travels and What Doesn't

### 2.1 The Trust Export Problem

Trust is the most valuable and most dangerous thing that could travel between communities. It is valuable because a person who has built trust in one community should be able to leverage that trust when engaging with a new community — otherwise every cross-community connection starts from zero, which defeats much of the purpose of federation. It is dangerous because trust is contextual: the trust someone has earned in their home community is evidence about their behavior in that community's specific cooperative context, not universal evidence about their character.

A carpenter who is a highly trusted cooperative partner in her neighborhood homeowners' community may be unknown or even distrusted in a professional design community where different norms govern contribution quality. Her neighborhood reputation is not transferable to the design context without distortion.

**The distortion risk:** If reputation is exported too completely, the federation creates an implicit caste system where high-reputation participants from large, established communities have structural advantages in all communities they enter. This replicates class dynamics within the cooperative network — precisely what WD-010's equity governance is designed to prevent.

**The isolation risk:** If reputation is not portable at all, every cross-community connection starts from zero, and the cooperative value of federation is severely limited.

The resolution: **graduated, consent-gated, context-tagged trust portability.**

---

### 2.2 The Trust Portability Protocol

```
TrustRecord {
  holder:        Agent.id
  community:     Community.id
  
  // What travels (with consent) in federation
  portable: {
    cooperativeActCount:   Integer         // number of cooperative acts
    followOnRate:          Float [0..1]    // proportion with follow-on relationships
    trustReciprocity:      Float [0..1]    // mutual trust in relationships
    governanceParticipation: Float [0..1]  // engagement in community governance
    
    // Deliberately NOT included in portable record:
    // - specific cooperative acts (privacy)
    // - names of cooperative partners (privacy + consent)
    // - meaning state data (maximum protection, WD-010 §5.2)
    // - internal community reputation scores (context-specific, not transferable)
    // - financial exchange history (if any)
  }
  
  // Context tags: what community context produced this record?
  contextTags: {
    communityType:     neighborhood | professional | affinity | care | other
    cooperativeDomain: skills | mutual_aid | knowledge | care | creative | other
    communitySize:     Float      // helps receiving community weight the record
    communityAge:      Integer    // months; older communities have more calibrated records
    governanceRating:  ExternalAuditRating?  // if external audit has been conducted
  }
  
  // Consent management
  holderConsent:     Boolean   // participant has explicitly consented to this export
  consentScope:      ConsentScope  // what specific use is consented
  consentExpiry:     Timestamp?
  revocable:         true      // always; participant can withdraw at any time
  
  // Federation trust
  issuingCommunity:  Community.id
  signature:         CryptographicSignature  // issued community vouches for the record
  importValidAt:     [Community.id]  // communities that have agreed to accept this record
}
```

**Key design choices:**

*Aggregate, not specific:* What travels is aggregate behavioral signals (act count, follow-on rate, reciprocity) not specific acts or relationships. This preserves privacy while conveying the signal that matters: does this person show up, follow through, and sustain cooperative relationships over time?

*Context-tagged, not context-stripped:* The record carries information about what community context it came from. A receiving community can weight the import appropriately — a neighborhood cooperative record doesn't automatically confer status in a professional domain community.

*Consent-gated, always:* No trust record leaves a community without explicit participant consent. Consent is revocable at any time. The participant can withdraw their exported record from a specific receiving community at any time with immediate effect.

*Cryptographically signed:* The issuing community signs the record. This prevents forgery and enables the receiving community to verify the record's authenticity without contacting the issuing community's central server in real time.

---

### 2.3 Capacity and Need Records: Different Rules

Capacity and need records have different portability logic from trust records:

**Capacity records** can travel more freely. If someone has a skill, it's useful in any context where that skill is needed. A retired plumber's expertise is relevant to neighborhood communities and professional communities equally. However:
- Capacity records still require participant consent for export
- Self-assessment capacity records (CurseOfKnowledge risk: will be undervalued) should be distinguished from protocol-assessed capacity records
- Domain-specific capacity records should be tagged with domain context

**Need records** are the most sensitive. An acute meaning need (purpose deprivation, belonging collapse) is simultaneously the signal that most warrants cross-community routing and the most dangerous data to export without strict controls. WD-010's maximum protection tier for meaning state data applies with even greater force in federation contexts.

```
FederationDataTiers {
  // What may cross community boundaries (with participant consent):
  Tier_A — Safe to federate:
    - Aggregate trust signals (cooperativeActCount, followOnRate)
    - Capacity records (skill domains, experience level, availability)
    - Public community reputation (opt-in)
    
  // May cross with elevated consent and community-to-community agreement:
  Tier_B — Federate with care:
    - Specific capacity descriptions (more identifying)
    - Need types (not intensity)
    - Geographic availability
    
  // Never crosses community boundaries without extraordinary consent:
  Tier_C — Do not federate without special process:
    - Meaning state data (purpose, belonging, recognition scores)
    - Relationship-specific trust data
    - Sensitive personal context (health, financial, family)
    
  // Never crosses community boundaries, period:
  Tier_D — Never federate:
    - Raw behavioral inference data
    - PCE model parameters for individual participants
    - Internal governance records (dispute history, flag history)
    - Identifying information that enables tracking across communities
}
```

---

### 2.4 What Stays Local

To be concrete: here is what the federation protocol explicitly prohibits from crossing community boundaries, regardless of participant consent:

**The community's aggregate equity data.** The CommunityPowerProfile (WD-010) — distributions, quartile balances, extraction signals — is internal governance data. Another community has no standing to audit it, and its disclosure could create the conditions for inter-community power dynamics that the protocol cannot govern.

**Individual relationship histories.** The specific pattern of who cooperated with whom over time is highly identifying and highly sensitive. Even with consent, exporting this creates surveillance risk.

**Meaning state data.** The maximum protection tier applies across all boundaries. No community's participants' meaning state data travels to another community. This is absolute.

**Internal governance records.** Disputes, flags, governance decisions, ombudsperson findings. These are the community's own institutional records. They are not the federation's.

**PCE model parameters.** The behavioral inference model the PCE has built for a specific participant in a specific community context is a product of that community's specific cooperative culture. It is not portable and should not be exported — doing so would send a model trained in one context to be applied in another, producing systematically distorted inferences.

---

## Part III: Cross-Community Trust Building

### 3.1 The Trust Chain Extension

When two communities federate, trust chains can extend across the community boundary — but with explicit crossing costs that reflect the reduced information available about cross-community actors.

```
TrustChain {
  // Within a community:
  A → B → C  (A trusts B; B trusts C; A has some indirect trust in C)
  
  // Across a federation boundary:
  A [Community X] → Bridge → D [Community Y]
  
  CrossCommunityTrustCost: {
    base_attenuation:    0.40  // cross-community trust starts at 40% of within-community
    portable_record_boost: 0.25 // if D has an accepted portable trust record
    shared_federate_boost: 0.15 // if A and D share a trusted intermediate community
    governance_equivalence_boost: 0.10 // if X and Y have verified governance equivalence
    
    // Maximum starting trust for cross-community connection (no prior relationship):
    max_cold_start: 0.60  // compared to 0.85 within-community cold start
  }
}
```

This attenuation is intentional and important. A person who is highly trusted in their home community should have a meaningful head start in a federated community — but not a complete transfer of earned status. The difference reflects real epistemic uncertainty: behavior in one cooperative context is evidence, not proof, of behavior in another.

The attenuation decreases as cross-community cooperative acts accumulate. After five successful cooperative acts in a federated community, the trust record begins to be calibrated by that community's own data rather than relying primarily on the imported record.

---

### 3.2 The Bridge Agent Role

In practice, federation works best when specific participants take on a **bridge agent** role — a person who is an active member of two or more federated communities and who can vouch for participants crossing community boundaries through their direct trust relationships.

```
BridgeAgent {
  // A participant active in multiple federated communities
  homeCommunity:       Community.id
  federatedCommunities: [Community.id]
  
  // Bridge capacity: how many cross-community introductions have they made?
  bridgeActCount:      Integer
  bridgeSuccessRate:   Float  // proportion of cross-community introductions
                              // that resulted in cooperative acts
  bridgeTrustCalibration: Float // how accurately do their introductions predict
                                 // cross-community cooperative success?
}
```

Bridge agents are the human infrastructure of federation. They are the connectors whose multiple community membership reduces the trust attenuation of cross-community connections — because their vouching carries actual information about both sides of the connection.

**Equity implication:** Bridge agents tend to be higher-network-position participants — people with the time, energy, and social capital to sustain active membership in multiple communities. The governance must watch for bridge agent concentration: if cross-community routing is dominated by a small number of highly-connected bridge agents, those agents accumulate significant power over who can access cross-community cooperative value. The equity monitoring from WD-010 must be extended to cover cross-community routing patterns.

---

### 3.3 Federation Trust Governance

How do two communities decide to federate? The process must itself embody the governance principles of both communities.

**Federation requires:**

1. **Governance equivalence review.** Each community reviews the other's equity thresholds, representation requirements, and ombudsperson structure. Full federation is only appropriate between communities whose equity governance meets minimum standards — specifically, the WD-010 representation requirements (Q1+Q2 hold ≥35% of governance seats, Q4 holds ≤25%).

2. **Community consent.** The decision to federate cannot be made by the founding team or governance executives alone. It requires ratification by the full governance body meeting the representation requirements.

3. **Participant transparency.** All participants in both communities are informed that federation is being considered, what data will become portable, and what protections remain in place. A public comment period is required before federation takes effect.

4. **Equity impact assessment.** Given the power asymmetry risks of federation (established communities have structural advantages in cross-community routing), an equity impact assessment must be conducted: which participants in each community are most likely to benefit from federation? Which are most at risk? What mitigations are planned?

5. **Revocability.** Federation can be dissolved by either community through its governance process. Data portability agreements dissolve with the federation — exported records are no longer valid in the other community from the date of dissolution.

**De-federation:** When two communities de-federate, all cross-community trust records become invalid. The receiving community must purge the imported records. Cross-community connections that formed during the federation period are not invalidated — the relationships continue — but the community-mediated trust infrastructure no longer supports them.

---

## Part IV: The Scale/Capture Tradeoff

### 4.1 Why Federation Is Not Enough

Federation prevents platform capture — no single organization controls the entire network. But federation does not prevent **protocol capture**: the situation where the federation protocol itself becomes controlled by a small number of powerful communities.

Protocol capture operates through a different mechanism than platform capture. In platform capture, a single organization gains control of the platform's infrastructure. In protocol capture, the most powerful communities in the federation accumulate disproportionate influence over how the protocol evolves — what gets added, what gets changed, what counts as "governance equivalence," what federation standards look like.

Large, resource-rich communities can afford to participate heavily in protocol governance. They can fund protocol development, convene working groups, write proposals, and advocate for changes that serve their interests. Small, resource-constrained communities cannot. Over time, the protocol comes to reflect the preferences of its most powerful participants.

This is the history of internet standards governance. The technical protocols of the internet are nominally open — anyone can participate in their development. In practice, the organizations that shape those standards are the ones with the resources to participate: large technology companies, well-funded research institutions, and governments. The interests of the majority of users are structurally underrepresented in the governance of the protocols they depend on.

**The LVN federation must design against protocol capture from the beginning.**

---

### 4.2 Protocol Governance Architecture

The federation protocol is governed by a **Protocol Stewardship Council** (PSC) with the following structural features:

**Representation requirement:**
- Small communities (< 200 participants) hold ≥40% of PSC seats, proportional to the number of small communities in the federation (even if their aggregate participation is a fraction of total federation participation)
- Large communities (> 1000 participants) hold ≤25% of PSC seats regardless of aggregate participation
- Communities undergoing equity governance review are suspended from PSC participation until review is complete
- At least 20% of seats are held by community members who are in Q1 network position in their home communities

**Protocol amendment process:**
- Protocol changes that expand federation capabilities (new data types that can travel, new federation modes) require 2/3 supermajority of PSC, plus ratification by 60% of active communities
- Protocol changes that restrict federation capabilities (narrowing what can travel, adding protections) require simple majority of PSC
- No protocol change can be initiated exclusively by large communities; minimum 30% of supporting communities must be small
- Emergency protocol changes (addressing active security or exploitation risks) can be implemented by an Emergency Protocol Committee with immediate effect, pending 30-day community review

**Protocol stewardship, not protocol ownership:**
The PSC does not own the protocol. The protocol is a public commons. The PSC is a stewardship body that manages its evolution according to the community's collective values. The PSC cannot monetize the protocol, cannot require communities to pay for access, cannot restrict implementation of the protocol by any community.

Any community can implement the federation protocol from its published specification without permission. The PSC governs the evolution of the specification; it cannot prevent the existence of alternative implementations.

---

### 4.3 The Size Asymmetry Problem

Federation creates a structural problem that has no clean solution: **large communities have more to offer in cross-community connections, and therefore more power over smaller communities that want access to their cooperative capacity.**

A large, mature, post-transition community (R₀ > 1, rich trust infrastructure, diverse cooperative capacity) is a more attractive federation partner than a small, subcritical community. The smaller community benefits more from federation with the large community than the reverse. This creates an asymmetric dependency that can be exploited — the larger community can set terms, require concessions, or simply be indifferent in ways that harm the smaller community.

**Mitigations (none perfect):**

*Capacity-not-size weighting in cross-community routing:* The matching protocol should weight cross-community connections by cooperative value to the receiving community, not by the size or reputation of the sending community. A small, highly specialized community may have extremely high cooperative value for specific capacity types in a large community.

*Bridging support for small communities:* The federation protocol includes a **solidarity bridging** mechanism: large communities can commit a portion of their high-capacity participants' time to mentorship and bridge connections specifically with smaller, developing communities. This is not charity — it is recognizing that the federation as a whole benefits from having a healthy ecosystem of small communities at various development stages.

*Small community consortia:* Small communities can federate with each other to form a consortium that presents as a single federation partner to larger communities. The consortium shares governance resources, bridge agent capacity, and bargaining position.

*Anti-absorption rule:* A community cannot merge into another community through federation. Federation is interoperation, not absorption. If two communities want to merge, they must go through a separate governance process with explicit consent from all participants in both communities. Federation itself never produces merger — the communities remain separately governed regardless of how deeply they interoperate.

---

### 4.4 The Monopoly Prevention Protocol

If federation works well, some communities will grow to very large size. A community of 50,000 participants in a large city, with deep trust infrastructure and post-transition cooperative dynamics, is an enormously attractive federation partner. It may effectively become a hub that smaller communities must federate with to access adequate cooperative capacity.

This creates a de facto monopoly risk even within a formally federated protocol: the largest community accumulates network effects that make alternatives unattractive, even if no formal exclusivity mechanism exists.

**The monopoly prevention protocol:**

*Size ceiling for federation hubs:* Communities above 10,000 participants are required to federate in "bridged" mode rather than "full" mode with communities below 2,000 participants. This prevents the direct trust chain extension that would allow large communities to dominate smaller ones' matching landscapes.

*Geographic diversity requirement:* A community cannot be the sole federation partner for more than 40% of communities in a given geographic area. If this threshold is approached, the PSC can require the large community to actively support the development of alternative federation partners in that area.

*Cooperative infrastructure sharing:* Large communities above 5,000 participants must contribute protocol development resources and governance participation proportional to their size. They cannot extract scale benefits from the federation without contributing to its maintenance.

*Interoperability testing:* The PSC maintains an open interoperability testing environment that ensures any compliant implementation of the protocol can federate with any other compliant implementation. This prevents large communities from drifting their implementation in ways that create de facto incompatibility with smaller communities.

---

## Part V: Cross-Community Equity

### 5.1 The Between-Community Power Balance

WD-010 established power balance governance within communities. Federation creates a new governance challenge: power balance *between* communities.

A wealthy neighborhood community federating with a low-income neighborhood community creates an inter-community power asymmetry. The wealthy community's participants have more resources, more time, more social capital, and more developed cooperative infrastructure. In cross-community matching, their advantages compound: they are more legible to the matching algorithm, more confident in offering their capacities, and more able to sustain cooperative relationships that require investment.

Without governance, federation between unequal communities will systematically route value from the less-resourced community to the more-resourced one. The cross-community routing becomes another mechanism for extracting value from communities that can least afford to lose it.

**The cross-community equity protocol:**

*Routing equity targets:* Cross-community matching should target symmetric exchange over time. If community A participants are consistently receiving more value from cross-community connections with community B than community B participants are receiving from connections with community A, the routing algorithm should adjust to correct the imbalance.

*Cross-community power balance monitoring:* The same PowerBalance metric from WD-010 applies to cross-community acts. The cross-community power balance distribution should be monitored by both communities' equity ombudspersons jointly. Systematic imbalances trigger the same graduated response ladder.

*Capacity building priority:* When cross-community connections reveal that one community has significantly lower cooperative capacity in specific domains, the more resource-rich federate has a governance obligation to route capacity-building connections to address the gap — not just to extract value from the cross-community connection.

---

### 5.2 The Identity Continuity Problem

A person who moves between communities — geographically or otherwise — faces an identity continuity problem. Their cooperative identity, trust network, and meaning restoration trajectory are embedded in their home community's data. When they move, they carry none of it automatically.

This is not merely inconvenient. For people in active meaning restoration trajectories (Regime D recovery), community relocation during the critical compounding period can collapse the trajectory — not because their underlying state has changed, but because the social infrastructure supporting the recovery is no longer present.

**Trust portability addresses the aggregate behavioral signal problem** — the new community knows they have been a reliable cooperative partner. But it does not address:
- The specific trust relationships they built (those remain in the old community)
- The specific meaning restoration trajectory they were on (context-embedded)
- The specific roles they had taken in governance and community life

**Transition support protocol:**

When a participant moves from one LVN community to another, the protocol should:
1. Generate a transition trust record with the participant's consent: the aggregate portable record plus a human-written narrative about their cooperative role and trajectory
2. Identify cross-community connection opportunities that can provide continuity — bridge agents in the new community who know people from the old community
3. Flag the participant's meaning state trajectory to the new community's deployment coordinator (with participant consent) so the trajectory context isn't lost
4. Maintain a "returning" category in the trust record: if the participant rejoins their original community, their history is not lost — it resumes

This is not just protocol convenience. For people in post-labor transition trajectories, the loss of cooperative community through geographic mobility can be economically and psychologically catastrophic. The protocol has an obligation to treat community transition as a first-class life event requiring explicit support design.

---

## Part VI: Federated Governance at Scale

### 6.1 The Legitimacy Challenge

As the federation grows — tens of communities, hundreds, potentially thousands — the governance challenge becomes acute. The PSC with 20 seats cannot meaningfully represent hundreds of communities. Protocol evolution becomes increasingly disconnected from the communities it governs. The federation begins to behave like a platform even if its technical architecture is distributed.

**The nested governance response:**

*Regional councils:* Communities form regional groupings (geographic, linguistic, cultural) that elect regional representatives to the PSC. Regional councils handle governance issues specific to their regional context without requiring PSC involvement.

*Delegated protocol governance:* Specific aspects of the protocol are delegated to specialist governance bodies:
- The Trust Portability Council governs what trust data can travel and under what conditions
- The Equity Standards Council governs cross-community equity thresholds and inter-community power balance protocols
- The Technical Architecture Council governs protocol specification and interoperability standards
- The Emergency Response Council handles active exploitation or security incidents

*Subsidiarity principle:* Every governance decision should be made at the most local level capable of making it. The PSC governs only what communities cannot govern for themselves. Regional councils govern only what local communities cannot govern for themselves. This is Ostrom's nested governance principle applied to protocol governance.

*Sunset clauses:* Every governance body has a mandatory review every 3 years. Bodies that have become captured or ineffective can be dissolved and reconstituted through a community-governed process.

---

### 6.2 The Exit Right

The most important governance right in a federation is the right to leave.

**Exit must be:**

*Technically straightforward:* A community can export all of its own data in a standard format at any time. This data is its own — the federation has no claim on it. The export process should take hours, not weeks.

*Governmentally unilateral:* No other community or governance body can prevent a community from leaving the federation. Exit is the community's sovereign right, exercised through its own governance process.

*Consequence-transparent:* Participants must be informed clearly what exit means for their cross-community relationships, trust records, and match quality. Exit should not be a surprise — it should be a governed decision with full information.

*Non-punitive:* A community that exits the federation does not lose access to the protocol specification. It can continue to operate an isolated LVN community. It can re-federate in the future. There is no penalty for exit.

The exit right is the single most important anti-capture mechanism in the federation design. A federation from which exit is difficult or costly is a platform, not a federation, regardless of its technical architecture. The credible threat of exit disciplines governance bodies to serve communities rather than extracting from them.

---

## Part VII: Technical Architecture Notes

### 7.1 Decentralized Identifiers

Participants and communities in the federation use **Decentralized Identifiers (DIDs)** — cryptographic identifiers that are not controlled by any central registry. A DID is owned by the entity it identifies (the participant or community) and can be verified by any federation member without contacting a central authority.

This is the technical foundation of federation sovereignty: identifiers are not assigned by the federation. They are created by the communities and participants themselves. If the federation dissolves, the identifiers remain valid.

```
Participant DID: did:lvn:community_id:participant_uuid
Community DID:   did:lvn:region_id:community_uuid

Verification: cryptographic, not registry-dependent
Portability: identifiers travel with participants across communities
```

### 7.2 Local-First Data Architecture

Each community's data lives on infrastructure controlled by that community. The federation protocol defines how data is queried across community boundaries — it does not define a central database that communities upload to.

This is the **local-first** architecture: data is local by default, shared only by explicit protocol operations, and always remains under community control.

*Practical implication:* Communities can use different database implementations, different server infrastructure, different operational approaches. The protocol defines the API — the interface between communities — not the internal implementation. A community running on a single shared server and a community running distributed infrastructure on participant devices are both first-class protocol participants.

### 7.3 Trust Record Verification Without Central Authority

When Community B receives a trust record issued by Community A, how does it verify that the record is authentic — that it was actually issued by Community A and not forged?

*Cryptographic signing:* Community A signs trust records with its private key. Community B has Community A's public key (established during the federation agreement) and can verify the signature without contacting Community A in real time.

*Record freshness:* Trust records have a maximum validity period (default: 90 days). After expiry, they must be re-issued by Community A with a fresh signature. This prevents stale records from continuing to convey trust after the relationship has changed.

*Revocation:* A participant can revoke their exported trust records at any time. Community A maintains a revocation list. Community B periodically fetches Community A's revocation list to ensure they aren't accepting records that have been withdrawn.

---

## Appendix A: Open Questions

1. **The governance participation cost problem.** Federated governance requires time. Small communities in under-resourced contexts may not be able to participate in PSC and regional council governance with the frequency that effective governance requires. How does the federation support meaningful participation without tokenizing under-resourced communities?

2. **The AI bias in cross-community routing.** The matching algorithm optimizing across communities will encode biases from training data. Cross-community routing may systematically favor participants from communities whose behavioral signals are more legible — which tends to correlate with higher-income, more digitally fluent, more Anglo-American cultural context. How is cross-community algorithmic equity monitored and corrected?

3. **The language and culture barrier.** Federation across language boundaries presents specific challenges for behavioral signal extraction (the PCE is language-dependent) and for trust assessment (norms around cooperative contribution vary significantly across cultures). What are the minimum requirements for cross-linguistic federation to be equitable?

4. **The temporal mismatch problem.** Communities at very different stages of development (a 2-year-old post-transition community and a 2-month-old seeding community) may have such different cooperative cultures that federation produces more harm than value. What is the minimum development stage for federation eligibility?

5. **Protocol forking.** What happens when a community (or group of communities) disagrees with PSC decisions strongly enough to fork the protocol — implementing a modified version that is incompatible with the main federation? Is this a failure mode to be prevented, or a governance right to be preserved? The internet has resolved this through rough consensus and running code; the LVN federation may need a different approach given the equity stakes.

6. **The monopoly alternative.** This document assumes that federation is preferable to a centralized platform. But a well-governed centralized platform might provide better equity outcomes than a federation that produces size asymmetry and governance fragmentation. Under what conditions is federation clearly preferable? Under what conditions might centralization be the lesser evil?

---

*This document is a working draft. Everything is wrong in some way. Find the flaws.*  
*Released under CC BY-SA 4.0 — fork, critique, extend.*

---

**The series is now complete through WD-013.**

**What remains:** Empirical calibration. Real communities. Pilots that generate data against which every assumption in this series can be tested, refined, or discarded. The documents are not the work. They are the preparation for the work.
