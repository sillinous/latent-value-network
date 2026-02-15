# WD-006: Governance Framework

**Layer 5 Specification — Commons-Based Protocol Governance**

*Version 0.1 · February 2026 · Draft*

---

## Abstract

This document specifies the Governance Layer (Layer 5) of the Latent Value Network, defining how the protocol evolves, how disputes are resolved, how parameters are tuned, and how the system prevents capture by any single entity. The framework applies Elinor Ostrom's principles for governing commons to the specific challenges of a digital cooperative infrastructure.

The governance challenge is distinctive: the LVN must remain open enough to evolve but structured enough to protect the people who depend on it. It must distribute power broadly enough to prevent capture but concentrate enough authority to make decisions when they matter. And it must do all of this for an infrastructure that crosses communities, cultures, and jurisdictions.

---

## I. Design Principles

The governance framework follows six non-negotiable constraints derived from WD-001's foundational principles:

**Principle 1: Protocol, not platform.** Governance controls the protocol specification, parameter ranges, and community standards. It does not control individual deployments, community choices, or personal decisions. Any community can fork the protocol — governance exists to make forking unnecessary by being responsive.

**Principle 2: No permanent authority.** Every governance role has term limits. Every decision is revisable. No individual or organization can accumulate permanent veto power. The founding contributors explicitly commit to relinquishing any special status by the end of Phase 2.

**Principle 3: Affected parties decide.** Decisions are made by the people affected by them. Parameter changes that affect matching quality are decided by the AI Integration and Community & Practice working groups. Trust fabric changes are decided by the Privacy and Ethics groups. Protocol-level changes require broad consensus.

**Principle 4: Transparency by default.** All governance proceedings, decisions, rationales, and dissenting positions are publicly documented. "We decided X" is never sufficient — "We decided X because Y, over objections Z which we addressed by W" is the minimum standard.

**Principle 5: Ethics & Equity veto.** The Ethics & Equity working group retains advisory veto power over any deployment decision that fails an equity review. This is the only asymmetric governance power in the system, and it exists because equity failures compound in ways that are difficult to reverse.

**Principle 6: Subsidiarity.** Decisions are made at the lowest level competent to handle them. Community-level parameter tuning is a community decision. Protocol-level changes require cross-community process. Global architectural decisions require the broadest consensus.

---

## II. Governance Bodies

### 2.1 Working Groups

Five working groups (defined in ROADMAP.md) form the operational core of governance. Each group has authority over its domain and advisory input on adjacent domains.

| Working Group | Governance Domain | Decision Authority |
|---|---|---|
| AI Integration | Context engines, embeddings, MCP/A2A | Signal generation parameters, matching algorithms, integration specs |
| Privacy & Cryptography | ZK proofs, threat models, encryption | Privacy parameters, cryptographic primitive selection, threat model updates |
| Theory & Foundations | Mechanism design, network science | Complementarity function, incentive structures, formal analysis |
| Ethics & Equity | Red-teaming, equity, governance | Equity review of all deployments, ethics guidelines, advisory veto |
| Community & Practice | Pilot design, practitioner input | Pilot selection, community onboarding, impact measurement |

### 2.2 Working Group Leads

Each working group selects a lead through internal consensus. Leads serve 6-month terms, renewable once. Leads are responsible for: facilitating group decisions, representing the group in cross-group discussions, and documenting all decisions with rationale.

No individual may lead more than one working group simultaneously. Leads may be removed by two-thirds vote of their working group.

### 2.3 Stewardship Council

The Stewardship Council consists of all working group leads plus up to 3 community-elected at-large members. It handles cross-group disputes, protocol-level decisions, and public representation.

The Council operates by rough consensus (see Section III). It has no authority to override working group decisions within their domains. Its role is coordination, not command.

---

## III. Decision-Making Processes

### 3.1 Rough Consensus

The primary decision-making mechanism is rough consensus, following the IETF model: a decision is accepted when there is broad agreement and no strong, unaddressed objections. "No strong objection" does not mean "everyone agrees" — it means objections have been heard, addressed with evidence or argument, and the remaining disagreements are acknowledged but not blocking.

The process:
1. **Proposal** posted as a GitHub Discussion with rationale and evidence
2. **Comment period** of 14 days (28 days for protocol-level changes)
3. **Synthesis** by the relevant working group lead, addressing all objections
4. **Acceptance** if no strong unaddressed objections remain
5. **Documentation** of the decision, rationale, and remaining disagreements

### 3.2 Formal Votes

If rough consensus fails (strong objections that cannot be resolved through discussion), the decision escalates to a formal vote:

1. **Extended discussion** period (28 additional days)
2. **Structured debate** with each position given equal presentation time
3. **Vote** among eligible participants (working group members for domain decisions, all active contributors for protocol decisions)
4. **Threshold:** Two-thirds majority for protocol changes, simple majority for parameter changes
5. **Cooling period:** Decisions that pass by less than two-thirds cannot be implemented for 90 days, allowing further debate

### 3.3 Emergency Decisions

If a security vulnerability, active exploitation, or safety issue requires immediate action:

1. Any two working group leads can invoke emergency authority
2. Temporary mitigation may be deployed immediately with public documentation
3. Full governance process must begin within 48 hours
4. Emergency actions automatically expire after 30 days without normal governance approval

---

## IV. Applying Ostrom's Principles

Elinor Ostrom's 8 design principles for managing commons, applied to the LVN:

### 4.1 Clearly Defined Boundaries

**Boundary definition:** The LVN commons includes the protocol specification, shared parameters, the cooperative taxonomy, the trust fabric rules, and the governance process itself. It does not include individual deployments, community-specific configurations, or user data.

**Membership:** Active contributors are those who have made substantive contributions (code, specifications, analysis, testing, community organizing) within the past 6 months. Contribution is tracked transparently through GitHub and community records.

### 4.2 Proportional Equivalence Between Benefits and Costs

**Those who benefit more contribute more.** Organizations deploying the protocol at scale are expected to contribute to maintenance and governance proportional to their deployment size. Individual contributors are never charged, and there is no pay-to-play governance mechanism.

### 4.3 Collective Choice Arrangements

**Affected parties participate in rule-making.** Protocol parameter changes require input from communities that will be affected. No parameter can be changed without a comment period that reaches the affected communities.

### 4.4 Monitoring

**Transparent, distributed monitoring.** All protocol operations are auditable. Equity metrics (cross-boundary matching rates, bootstrap success rates, participation distribution) are published quarterly. The Ethics & Equity group monitors for systematic bias.

### 4.5 Graduated Sanctions

**Response proportional to violation.** First violation of community standards: warning. Second: temporary restriction. Third: removal from governance roles (not from protocol use). The protocol itself cannot be used as a punishment mechanism — access is a right of protocol compliance, not a privilege of governance approval.

### 4.6 Conflict Resolution Mechanisms

**Multi-level dispute resolution:**
- Level 1: Direct discussion between parties
- Level 2: Working group mediation
- Level 3: Stewardship Council arbitration
- Level 4: Community vote (last resort)

### 4.7 Minimal Recognition of Rights to Organize

**No external authority can override community governance.** If a government or corporation attempts to mandate protocol changes, the governance process treats this as any other proposal — it must survive the normal consensus process. The protocol can be forked by any community at any time.

### 4.8 Nested Enterprises

**Governance at multiple scales.** Individual communities govern their own configurations. Regional clusters coordinate on interoperability. The global protocol specification is governed by the full contributor community. Each level has autonomy within its scope.

---

## V. Anti-Capture Mechanisms

The greatest existential risk to the LVN is capture — by a corporation, government, or entrenched contributor faction. The following mechanisms are structural defenses:

**Term limits.** No governance role exceeds 12 continuous months. Founding contributors have no special permanent status.

**Forking rights.** The CC BY-SA 4.0 license and open protocol specification ensure that any community can fork if governance fails. This is not a bug — it is the ultimate check on governance power.

**Funding transparency.** All funding sources for governance activities are publicly disclosed. No single funder may provide more than 30% of governance operational costs.

**Diversity requirements.** The Stewardship Council must include members from at least 3 different communities, 2 different countries, and both technical and non-technical backgrounds. Failure to meet diversity requirements triggers a special election.

**No sell-out clause.** The protocol specification and governance process cannot be transferred, sold, or exclusively licensed to any entity. This is encoded in the license and is not revisable through normal governance.

---

## VI. Parameter Governance

Many protocol behaviors depend on tunable parameters (see WD-003 Section XII and WD-005 Section VIII). Parameters are governed at three levels:

| Level | Example Parameters | Who Decides | Process |
|---|---|---|---|
| Global | Signal vector dimensions, handshake timeout, max trust chain length | Stewardship Council | Full consensus process |
| Domain | Taxonomy entries, trust domain definitions | Relevant working group | Working group consensus |
| Community | Local trust thresholds, bootstrap pathway preferences, matching sensitivity | Community operators | Community decision, within global bounds |

**Parameter bounds:** The global governance process sets acceptable ranges for community-level parameters. Communities may tune within these ranges but not exceed them. This prevents a community from, for example, disabling trust verification entirely.

---

## VII. Evolution Path

### Phase 0-1 (Current): Founder Scaffold

Decisions are made by active contributors through GitHub Discussions. Working group leads are self-selected or appointed by consensus. The founding contributors act as initial stewards with explicit sunset dates.

### Phase 2: Formalized Governance

Working groups formally constitute with elected leads. Stewardship Council forms. The governance process described in this document becomes operational. Founding contributors' special status ends.

### Phase 3: Community Governance

As pilot communities join, governance expands to include community representatives. The Stewardship Council adds at-large members. Equity monitoring begins with real deployment data.

### Phase 4+: Mature Governance

Full multi-scale governance with nested community autonomy. Potential transition to a formal legal structure (cooperative, foundation, or DAO — to be determined by the community). The governance framework itself becomes subject to amendment through its own processes.

---

## VIII. Open Governance Questions

### GQ-1: Legal Structure

Should the LVN adopt a formal legal structure? Options include: nonprofit foundation (like Apache or Linux Foundation), cooperative (member-owned), DAO (blockchain-based governance), or remain an unincorporated commons. Each has trade-offs for legitimacy, liability, fundraising, and decentralization.

### GQ-2: Compensation

Should governance participants be compensated? Volunteer governance favors those with existing economic security. Compensated governance introduces funding dependency and compensation politics. Hybrid models (stipends for underrepresented participants) may balance both.

### GQ-3: Protocol Versioning

How do we handle protocol versions? If communities run different protocol versions, interoperability degrades. But mandatory upgrades concentrate power. Semantic versioning with deprecation windows and backward compatibility requirements is one approach.

### GQ-4: Jurisdictional Conflicts

If a jurisdiction mandates protocol changes (e.g., data retention requirements) that conflict with privacy principles, how does governance respond? Options range from jurisdiction-specific protocol variants to principled non-compliance to diplomatic engagement.

---

## IX. Relationship to Other Specifications

The Governance Framework interacts with every other layer:

- **WD-003 (SEP):** Governance controls global parameters and taxonomy evolution
- **WD-005 (Trust Fabric):** Governance monitors homophily metrics and equity thresholds
- **ROADMAP.md:** Governance oversees phase transitions and milestone evaluation
- **CONTRIBUTING.md:** Governance maintains contributor standards and community norms

---

*Trust is the infrastructure of cooperation. Governance is the infrastructure of trust.*

*This document is itself subject to the governance process it describes. Change it.*

---

The Latent Value Network · Governance Framework · WD-006 v0.1
Creative Commons Attribution-ShareAlike 4.0
