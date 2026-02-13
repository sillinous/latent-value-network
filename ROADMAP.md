# Latent Value Network — Project Roadmap

**Version 0.1 · February 2026 · Living Document**

---

## Current Status: Phase 0 — Foundation

The LVN has completed its initial specification phase and is transitioning to community building and early prototyping. All foundational documents are published, the GitHub repository is live with seeded discussions, and outreach to target communities has begun.

---

## Phase 0: Foundation (Current — February 2026)

**Goal:** Establish the intellectual and community infrastructure needed for collaborative development.

**Completed:**
- [x] WD-001: Foundational White Paper (5-layer architecture, 6 principles)
- [x] WD-002: Evidence Base (22 academic citations, 6 evidence streams)
- [x] WD-003: Signal Exchange Protocol Specification (Layer 3)
- [x] WD-004: Explainer Video Script/Storyboard
- [x] WD-005: Trust & Reputation Fabric Specification (Layer 4)
- [x] Interactive Concept Demo
- [x] 10 Provocations Discussion Document
- [x] Architecture Diagram
- [x] GitHub repository with issue templates and seeded discussions
- [x] 6 audience-specific outreach posts
- [x] Unified project hub website

**Next immediate actions:**
- [ ] Deploy project site to Netlify (connected to GitHub repo)
- [ ] Post outreach materials to target communities
- [ ] Begin collecting contributor introductions

---

## Phase 1: Community Formation (March — May 2026)

**Goal:** Build the contributor base needed to move from specification to implementation. Target: 20-50 active contributors across at least 4 of the 5 working groups.

**Working Groups to Establish:**

| Group | Focus | Critical Mass Needed | Key Deliverable |
|-------|-------|---------------------|-----------------|
| AI Integration | Context engines, embeddings, MCP/A2A | 5-8 engineers | Reference implementation architecture |
| Privacy & Cryptography | Signal protocol, ZK matching, threat model | 3-5 cryptographers | Feasibility assessment of OQ-2 |
| Theory & Foundations | Mechanism design, network science, incentives | 3-5 researchers | Formal analysis of complementarity function |
| Ethics & Equity | Red-teaming, equity analysis, governance | 4-6 practitioners | Adversarial review of WD-003 and WD-005 |
| Community & Practice | Pilot design, practitioner input, impact | 5-10 organizers | Pilot community identification and assessment |

**Milestones:**
- [ ] WD-006: Governance Framework specification drafted (Layer 5)
- [ ] LVN Cooperative Taxonomy v0.1 (shared by L3 signal filters and L4 trust domains)
- [ ] Community Charter establishing decision-making processes
- [ ] At least 3 Provocation discussions with substantive multi-participant debate
- [ ] Working group leads identified for each group
- [ ] First adversarial review of WD-003 completed

**Community Targets:**
- [ ] David Shapiro's Post-Labor Economics Skool community engaged
- [ ] MCP/A2A developer community awareness
- [ ] At least 2 academic research groups reviewing specifications
- [ ] At least 1 mutual aid network providing practitioner feedback
- [ ] At least 1 local institution (library, community center) expressing pilot interest

---

## Phase 2: Prototype (June — October 2026)

**Goal:** Build a minimum viable implementation that tests the core matching concept with real people.

**MVP Scope (deliberately constrained):**
- Community-anchored discovery only (no relay infrastructure)
- Pre-defined cooperative taxonomy (not learned embeddings)
- Manual scoped context packages (user-written, not AI-generated)
- Single community pilot (target: 50-200 participants)
- Trusted community coordinator for relay functions
- Simple cosine-similarity matching (not full complementarity function)

**Milestones:**
- [ ] MVP architecture document approved by AI Integration and Privacy groups
- [ ] Signal vector structure implemented and tested with synthetic data
- [ ] Handshake state machine implemented with human-in-the-loop testing
- [ ] MCP integration proof-of-concept (cooperative_context resource type)
- [ ] Trust bootstrap pathway implemented for pilot community
- [ ] Privacy audit by Ethics & Equity group
- [ ] Pilot community selected and onboarded
- [ ] First real-world matches surfaced

**Technical Deliverables:**
- Reference implementation (open source, language TBD by community)
- MCP cooperative_context extension specification
- A2A message schemas for signal exchange
- Test harness for adversarial evaluation
- Privacy impact assessment

---

## Phase 3: Pilot and Learn (November 2026 — March 2027)

**Goal:** Run the MVP with real people, collect data, and iterate based on evidence.

**Pilot Operations:**
- Deploy MVP in selected community
- Monitor match quality, acceptance rates, cooperative outcomes
- Collect qualitative feedback on user experience of progressive disclosure
- Run adversarial testing against threat model
- Measure cross-boundary matching rates vs. same-cluster rates
- Track equity metrics (are all participants generating matches?)

**Research Outputs:**
- [ ] Pilot results report (quantitative + qualitative)
- [ ] Revised protocol specifications based on pilot learnings
- [ ] Embedding model training dataset from pilot matches
- [ ] Trust Fabric performance analysis
- [ ] Equity audit: who benefited, who didn't, and why

**Decision Gates:**
- Does ambient matching surface connections that explicit search would not?
- Is the progressive disclosure handshake acceptable to users?
- Are privacy properties maintained under real-world conditions?
- Does the trust bootstrap work for underconnected participants?
- Is the cross-boundary matching rate meaningfully above baseline?

---

## Phase 4: Scale and Formalize (April 2027+)

**Goal:** Expand from single pilot to multi-community deployment and formalize the protocol for standardization.

**This phase is deliberately underspecified.** What we build in Phase 4 depends entirely on what we learn in Phase 3. The pilot data will determine whether we're solving a real problem, whether our approach works, and what needs to change.

**Possible directions (to be determined by evidence):**
- Multi-community deployment with relay infrastructure
- Trained embedding models replacing simple similarity
- Formal standardization proposal to relevant bodies
- Integration partnerships with AI assistant providers
- Governance transition from founding contributors to community-elected stewards

---

## Governance Scaffold

### Decision Making (Phase 0-1)

During the foundation and community formation phases, decisions are made through:

1. **Specification changes:** Proposed via GitHub Discussion, evaluated by relevant working group, accepted by rough consensus (no formal vote — if nobody objects strongly after 2 weeks, it's accepted)
2. **Parameter changes:** Proposed with rationale, reviewed by Theory & Foundations group, accepted by working group leads
3. **Community policy:** Proposed via Discussion, open comment period (2 weeks), accepted by rough consensus
4. **Pilot decisions:** Joint decision of Community & Practice and Ethics & Equity working groups

### Escalation

If rough consensus cannot be reached, the decision is escalated to:
1. Extended discussion period (4 weeks)
2. If still unresolved: formal poll of all working group leads
3. If still unresolved: the decision is tabled until new evidence or arguments emerge

### Transition (Phase 2+)

As the community grows, governance will transition from the founding scaffold to a more formal structure. The specifics will be determined by the community through the WD-006 Governance Framework specification. The founding contributors commit to:
- Transparent documentation of all decisions
- No veto power for any individual or organization
- Governance transition timeline agreed before pilot deployment
- Ethics & Equity group retains advisory veto on deployments that fail equity review

---

## How to Contribute Right Now

1. **Read** the specifications (start with the README, then WD-001, then whatever interests you)
2. **Pick** a provocation that interests you and respond in GitHub Discussions
3. **Open** an Introduction issue to tell us who you are and where you want to contribute
4. **Critique** — the most valuable contributions right now identify what's wrong with our approach
5. **Share** — help us reach the audiences listed in community/outreach-posts.md

**The hardest problems are open by design. Come help us solve them.**

---

*This roadmap is a living document. It will evolve as the community grows and as we learn from implementation. Suggest changes via GitHub Discussion or pull request.*

*The Latent Value Network · CC BY-SA 4.0*
