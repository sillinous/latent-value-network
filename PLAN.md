# LVN Development Plan

**From Specification to Working Protocol — The Operational Blueprint**

*Version 1.0 · February 2026 · Maintained by all working groups*

---

## Purpose

This document is the actionable plan for turning the Latent Value Network from a set of specifications into working protocol software, standards submissions, and a live pilot deployment. It bridges the intellectual foundation (WD-001 through WD-006) and the protocol strategy (protocol-integration-strategy.md) with concrete work packages, timelines, dependencies, and acceptance criteria.

Every task has an owner role, a definition of done, and a dependency chain. Nothing here is aspirational — if it's in this plan, it gets built or it gets explicitly cut with rationale.

---

## Plan Overview

```
PHASE 0 ─── PHASE 1 ─────── PHASE 2 ─────────── PHASE 3 ──────── PHASE 4
Foundation   Standards &      Build &              Pilot &          Scale &
(done)       Community        Implement            Learn            Formalize
             Mar-May 2026     Jun-Oct 2026         Nov 2026-        Apr 2027+
                                                   Mar 2027
             
Deliverables:                Deliverables:         Deliverables:    
├ Taxonomy v0.1              ├ MCP server          ├ Pilot report
├ MCP SEP draft              ├ A2A agents          ├ Revised specs
├ A2A extension draft        ├ Community relay     ├ Equity audit
├ CIP spec v0.1              ├ Trust bootstrap     ├ Training data
├ Working groups formed       ├ Privacy audit       ├ Standardization
├ Pilot site identified      ├ Pilot deployment       proposal
└ Community charter          └ First matches
```

---

## Phase 1: Standards Engagement & Community Formation

**Timeline:** March — May 2026  
**Gate:** Cannot enter Phase 2 without taxonomy v0.1, at least one standards submission, and 3+ working group leads identified.

### Work Package 1.1: Cooperative Taxonomy v0.1

**Owner:** Theory & Foundations + Community & Practice  
**Effort:** 3-4 weeks  
**Priority:** CRITICAL — blocks everything else  

The taxonomy is the shared vocabulary that makes all protocol components interoperable. Without it, signal vectors can't be compared, agents can't discover capabilities, and the relay can't score complementarity.

**Deliverables:**
- [ ] `specs/taxonomy/lvn-taxonomy-0.1.yaml` — hierarchical skill/need/resource classification
- [ ] `specs/taxonomy/complementarity-map.yaml` — cross-domain mappings (skill X serves need Y)
- [ ] `packages/taxonomy/` — npm package (`@lvn/taxonomy`) and PyPI package (`lvn-taxonomy`)
- [ ] `specs/taxonomy/TAXONOMY-GOVERNANCE.md` — how categories are added, deprecated, versioned

**Structure (from protocol-integration-strategy.md):**
```
Domains: practical, professional, relational, situational
  → Categories: ~40 (home-repair, finance, education, care, etc.)
    → Subcategories: ~200 (plumbing, tax-planning, tutoring, etc.)
      → Complementarity edges: skill→need mappings across domains
```

**Acceptance Criteria:**
- Covers at least 40 categories across all 4 domains
- Every subcategory has at least 1 complementarity mapping
- Published to npm and PyPI with semver
- Community review period (14 days) completed
- Passes adversarial test: can a bad actor infer identity from taxonomy positions alone? (must fail)

**Dependencies:** None (can start immediately)

---

### Work Package 1.2: MCP SEP Draft

**Owner:** AI Integration  
**Effort:** 2 weeks  
**Priority:** HIGH — establishes standards presence  

Draft and submit a Spec Enhancement Proposal to the MCP repository for the `cooperative_context` resource type.

**Deliverables:**
- [ ] `specs/mcp-sep/SEP-cooperative-context.md` — formal SEP following MCP template
- [ ] `specs/mcp-sep/schema.ts` — TypeScript schema definitions
- [ ] `specs/mcp-sep/examples/` — 3+ usage examples
- [ ] Pull request submitted to `modelcontextprotocol/modelcontextprotocol`

**SEP Contents (from protocol-integration-strategy.md Section I):**
- `CooperativeContextResource` interface with sovereignty controls
- `SignalVector` interface with differential privacy metadata
- `DisclosureScope` interface for progressive handshake
- MCP server implementation pattern
- Privacy analysis: why signal vectors are safe to transmit
- Relationship to existing MCP resource types

**Acceptance Criteria:**
- Follows MCP SEP template (see SEP-1865 as model)
- Schema compiles in TypeScript strict mode
- Examples demonstrate: signal generation, disclosure approval, preference query
- Reviewed by at least 2 contributors before submission
- Submitted as PR to MCP repo

**Dependencies:** Taxonomy v0.1 (for taxonomy_version field)

---

### Work Package 1.3: A2A Extension Draft

**Owner:** AI Integration  
**Effort:** 1-2 weeks  
**Priority:** HIGH — establishes standards presence  

Draft an extension proposal for the A2A Agent Card to support cooperative capability advertising.

**Deliverables:**
- [ ] `specs/a2a-extension/cooperative-agent-card.md` — extension specification
- [ ] `specs/a2a-extension/agent-card-schema.json` — JSON Schema for extended card
- [ ] `specs/a2a-extension/task-flows.md` — A2A task patterns for cooperative matching
- [ ] Issue/discussion opened on `a2aproject/A2A`

**Extension Contents (from protocol-integration-strategy.md Section II):**
- `cooperativeCapabilities` field in Agent Card
- Signal vector availability and parameters
- Handshake capability declaration
- Community membership and relay endpoint
- Task flow diagrams for match discovery and progressive disclosure

**Acceptance Criteria:**
- Valid JSON Schema that extends existing Agent Card
- Task flows use standard A2A primitives (tasks/send, artifacts, SSE)
- Compatible with A2A v0.3 specification
- Posted to A2A GitHub for community review

**Dependencies:** Taxonomy v0.1

---

### Work Package 1.4: CIP Specification v0.1

**Owner:** AI Integration + Privacy & Cryptography  
**Effort:** 3 weeks  
**Priority:** MEDIUM — can overlap with 1.2/1.3  

Formalize the Cooperative Intelligence Protocol as a specification document that composes MCP and A2A extensions into a coherent system.

**Deliverables:**
- [ ] `specs/cip/CIP-SPEC-0.1.md` — full protocol specification
- [ ] `specs/cip/messages.proto` — protobuf message definitions
- [ ] `specs/cip/threat-model.md` — security analysis
- [ ] `specs/cip/privacy-analysis.md` — differential privacy parameters and guarantees

**Specification Contents:**
- Protocol architecture (4-layer: privacy, CIP, transport bindings, application)
- Message types: SignalSubmission, MatchCandidate, HandshakeMessage, TrustQuery
- State machines: handshake lifecycle, trust chain traversal
- Transport bindings: MCP (resources + tools), A2A (agent cards + tasks), direct (HTTP/gRPC)
- Privacy layer: differential privacy, Bloom filters, ZK trust queries, consent management
- Complementarity scoring function (formal definition, NOT similarity)
- Parameter governance: which values are global vs. community-tunable

**Acceptance Criteria:**
- Uses RFC 2119 keywords (MUST, SHOULD, MAY)
- Protobuf compiles without errors
- Threat model covers: signal reconstruction, handshake fingerprinting, relay collusion, Sybil attacks
- Privacy analysis provides concrete ε values for MVP deployment
- Reviewed by Privacy & Cryptography working group

**Dependencies:** WP 1.2, WP 1.3 (aligns with both submissions)

---

### Work Package 1.5: Working Group Formation

**Owner:** Community & Practice  
**Effort:** Ongoing (March-May)  
**Priority:** CRITICAL — blocks Phase 2  

Recruit and organize the five working groups defined in ROADMAP.md.

**Deliverables:**
- [ ] `community/working-groups/README.md` — overview and how to join
- [ ] `community/working-groups/ai-integration.md` — charter, members, meetings
- [ ] `community/working-groups/privacy-crypto.md` — charter, members, meetings
- [ ] `community/working-groups/theory-foundations.md` — charter, members, meetings
- [ ] `community/working-groups/ethics-equity.md` — charter, members, meetings
- [ ] `community/working-groups/community-practice.md` — charter, members, meetings
- [ ] `community/CHARTER.md` — community decision-making processes (derived from WD-006)

**Working Group Charter Template:**
```markdown
# [Group Name] Working Group

## Mission
[One paragraph]

## Scope
- In scope: [list]
- Out of scope: [list]
- Advisory to: [other groups]

## Members
| Name | Role | Joined | Expertise |
|------|------|--------|-----------|

## Meeting Cadence
[Weekly/biweekly, day/time, timezone, link]

## Current Focus
[What the group is working on right now]

## Decision Log
| Date | Decision | Rationale | Dissent |
|------|----------|-----------|---------|
```

**Minimum Viable Working Groups for Phase 2 Gate:**
- AI Integration: 3+ members (need at least 1 MCP expert, 1 A2A expert)
- Privacy & Crypto: 2+ members
- Ethics & Equity: 2+ members (at least 1 non-technical)
- Community & Practice: 2+ members (at least 1 community organizer)
- Theory & Foundations: 1+ member (can operate as advisors initially)

**Outreach Targets:**
- MCP developer community (Discord, GitHub discussions)
- A2A contributor community (GitHub, Google Cloud events)
- Linux Foundation Agentic AI Foundation members
- Academic: network science, mechanism design, privacy-preserving computation
- Practitioner: mutual aid networks, community development, libraries
- Local: Newton, IL community organizations for pilot site

**Dependencies:** Outreach posts ready (done), site deployed (pending Netlify connect)

---

### Work Package 1.6: Pilot Community Identification

**Owner:** Community & Practice + Ethics & Equity  
**Effort:** 4-6 weeks  
**Priority:** HIGH — long lead time  

Identify, assess, and begin relationship-building with 2-3 candidate pilot communities. Primary target: Newton, IL area.

**Deliverables:**
- [ ] `community/pilot/assessment-criteria.md` — what makes a good pilot community
- [ ] `community/pilot/candidate-profiles.md` — assessed communities
- [ ] `community/pilot/newton-il/` — specific materials for Newton engagement
- [ ] `community/pilot/consent-framework.md` — IRB-style informed consent approach
- [ ] At least 1 community institution expressing interest (library, community center, etc.)

**Assessment Criteria:**
```
Required:
- Geographic coherence (people can actually meet)
- Institutional anchor (library, church, community center willing to host)
- Diverse skill mix (not homogeneous)
- 50-200 potential participants
- Community leader(s) willing to champion

Preferred:
- Existing unmet cooperative potential (visible latent value gap)
- Technology access (smartphones, basic internet)
- Not already well-served by existing platforms (timebanks, etc.)
- Rural or small-town (where the gap is largest)
```

**Dependencies:** WP 1.5 (need Ethics & Equity input on consent framework)

---

## Phase 2: Build & Implement

**Timeline:** June — October 2026  
**Gate:** Cannot enter Phase 3 without: MCP server passing test suite, relay handling 50+ concurrent signals, handshake state machine completing full lifecycle, privacy audit signed off.

### Work Package 2.1: MCP Cooperative Context Server

**Owner:** AI Integration  
**Effort:** 4-6 weeks  
**Priority:** CRITICAL — the core component  

Build the reference implementation MCP server that generates and serves cooperative context.

**Deliverables:**
- [ ] `src/mcp-server/` — FastMCP (Python) implementation
- [ ] `src/mcp-server-ts/` — TypeScript implementation (for JS ecosystem)
- [ ] Published to PyPI as `lvn-mcp-server` and npm as `@lvn/mcp-server`
- [ ] `tests/mcp/` — test suite (unit + integration)
- [ ] `docs/guides/mcp-quickstart.md` — 5-minute setup guide

**Components:**
```
mcp-server/
├── context_engine.py       # Builds ContextModel from conversation data
├── signal_generator.py     # Transforms context → SignalVector
├── privacy.py              # Differential privacy noise injection
├── taxonomy.py             # Taxonomy resolution and validation
├── disclosure_manager.py   # Progressive disclosure state machine
├── server.py               # FastMCP server implementation
├── tests/
│   ├── test_signal_generation.py
│   ├── test_privacy_bounds.py
│   ├── test_disclosure_lifecycle.py
│   └── test_taxonomy_resolution.py
└── config.yaml             # Tunable parameters
```

**Key Implementation Decisions:**
- Embedding model for MVP: sentence-transformers (all-MiniLM-L6-v2) on taxonomy descriptions
- Bloom filter: 256-bit capacity, 1% false positive rate
- Differential privacy: Laplace mechanism, ε=1.0 for MVP
- Signal refresh: regenerated every 24 hours or on significant context change
- Storage: local SQLite (context never leaves device)

**Acceptance Criteria:**
- All tests pass
- Signal vectors from identical contexts produce different outputs (privacy noise works)
- Signal vectors from similar contexts cluster closer than dissimilar (signal has meaning)
- Full MCP resource + tools interface works with Claude desktop, Cursor, or any MCP client
- Privacy audit: cannot reconstruct original context from 1000 signal samples

**Dependencies:** Taxonomy v0.1 (WP 1.1)

---

### Work Package 2.2: A2A Cooperative Discovery Agents

**Owner:** AI Integration  
**Effort:** 3-4 weeks  
**Priority:** HIGH  

Build reference A2A agents that implement cooperative discovery using Google ADK.

**Deliverables:**
- [ ] `src/a2a-agents/discovery-agent/` — agent that submits signals and receives matches
- [ ] `src/a2a-agents/relay-agent/` — agent that aggregates signals and computes matches
- [ ] `src/a2a-agents/agent-cards/` — cooperative-extended Agent Cards
- [ ] `tests/a2a/` — test suite
- [ ] `docs/guides/a2a-quickstart.md` — setup guide

**Agent Architecture:**
```
Discovery Agent (per-user):
  - Reads cooperative_context from local MCP server
  - Publishes cooperative Agent Card
  - Submits signal vectors to relay via A2A tasks
  - Receives match candidates
  - Manages handshake lifecycle with user approval at each step

Relay Agent (per-community):
  - Aggregates signal vectors from discovery agents
  - Computes complementarity scores (NOT similarity)
  - Returns match candidates to both parties
  - Mediates progressive disclosure handshake
  - Never stores raw signals (process and discard)
```

**Acceptance Criteria:**
- Discovery agent registers valid Agent Card with cooperative extensions
- Relay agent discovers and connects with 10+ discovery agents simultaneously
- Complementarity scoring produces different results than cosine similarity
- Full handshake lifecycle completes (signal → match → disclosure → connection)
- Agent-to-agent communication uses standard A2A task flows

**Dependencies:** MCP server (WP 2.1), Taxonomy v0.1 (WP 1.1)

---

### Work Package 2.3: Community Relay

**Owner:** AI Integration + Privacy & Cryptography  
**Effort:** 4-6 weeks  
**Priority:** CRITICAL  

Build the relay service that connects MCP context providers through A2A task flows.

**Deliverables:**
- [ ] `src/relay/` — relay service implementation
- [ ] `src/relay/scoring/` — complementarity scoring engine
- [ ] `src/relay/handshake/` — progressive disclosure state machine
- [ ] `src/relay/trust/` — trust bootstrap for MVP (simple vouching)
- [ ] `infrastructure/` — deployment configs (Docker, Fly.io or Railway)
- [ ] `tests/relay/` — test suite including load testing
- [ ] `docs/guides/relay-operator.md` — community relay operator guide

**Key Design Decisions:**
- Relay is stateless for signals (processes and discards — never stores raw vectors)
- Relay is stateful for handshakes (tracks disclosure state per match)
- MVP trust: simple vouching by community anchor (library, community center)
- Complementarity scoring function (from WD-003):
  ```
  complementarity(A, B) = 
    bloom_overlap(A.skills, B.needs) + bloom_overlap(B.skills, A.needs)
    + cross_boundary_bonus(A, B)
    + mutual_exchange_bonus(A, B)
    - similarity_penalty(A, B)  // penalize same-cluster matches
  ```
- Rate limiting: max 1 signal submission per agent per hour
- Match threshold: configurable per community (default: top 5 matches)

**Acceptance Criteria:**
- Handles 200+ concurrent signal submissions
- Complementarity scores are reproducible given same inputs
- Handshake state machine handles all edge cases (timeout, withdrawal, asymmetric disclosure)
- Zero signal vectors retained after processing epoch
- Relay operator guide is sufficient for a non-developer to run the service

**Dependencies:** MCP server (WP 2.1), A2A agents (WP 2.2)

---

### Work Package 2.4: Trust Bootstrap

**Owner:** Privacy & Cryptography + Community & Practice  
**Effort:** 2-3 weeks  
**Priority:** MEDIUM (MVP uses simplified trust)  

Implement the minimum trust system needed for pilot deployment.

**Deliverables:**
- [ ] `src/trust/bootstrap.py` — trust anchor vouching system
- [ ] `src/trust/verification.py` — chain-of-vouching verification
- [ ] `community/pilot/trust-anchors.md` — identified trust anchors for pilot
- [ ] `tests/trust/` — test suite including Sybil resistance tests

**MVP Trust Model (simplified from WD-005):**
- Community institution serves as trust anchor
- Participants are vouched in-person by trust anchor or by 2 existing members
- Trust is binary for MVP (vouched / not vouched)
- Vouch chain max depth: 2 (friend-of-friend)
- No ZK proofs in MVP (trusted coordinator model)

**Acceptance Criteria:**
- Cannot submit signals without being vouched
- Sybil test: creating fake identities requires physical presence at anchor
- Vouch chain verification completes in <100ms
- Trust anchor can revoke vouches

**Dependencies:** Pilot site identified (WP 1.6)

---

### Work Package 2.5: Privacy Audit

**Owner:** Ethics & Equity + Privacy & Cryptography  
**Effort:** 3-4 weeks (parallel with 2.1-2.3)  
**Priority:** CRITICAL — gate for pilot deployment  

Formal privacy review of the entire system before any real user data is processed.

**Deliverables:**
- [ ] `docs/audits/privacy-impact-assessment.md` — formal PIA
- [ ] `docs/audits/threat-model-review.md` — adversarial analysis of implemented system
- [ ] `docs/audits/differential-privacy-analysis.md` — formal ε accounting
- [ ] `docs/audits/consent-review.md` — review of informed consent materials

**Audit Scope:**
1. **Signal reconstruction attack:** given N signal vectors from the same user over time, can context be reconstructed?
2. **Correlation attack:** can signals be correlated with external data (social media, public records)?
3. **Relay collusion:** what can a compromised relay learn?
4. **Handshake fingerprinting:** can disclosure patterns identify participants?
5. **Trust graph inference:** can vouch relationships reveal social structure?
6. **Consent adequacy:** do participants understand what they're sharing?

**Acceptance Criteria:**
- All 6 attack vectors analyzed with concrete mitigations
- ε budget formally accounted across all system operations
- Consent materials tested with 5+ non-technical reviewers
- Ethics & Equity group signs off before pilot deployment
- Identified risks documented with severity ratings and mitigations

**Dependencies:** WP 2.1, 2.2, 2.3 (needs working system to audit)

---

### Work Package 2.6: Pilot Deployment

**Owner:** Community & Practice + AI Integration  
**Effort:** 4-6 weeks  
**Priority:** CRITICAL — the evidence generation step  

Deploy the complete system in the pilot community.

**Deliverables:**
- [ ] `infrastructure/pilot/` — production deployment configs
- [ ] `community/pilot/onboarding/` — participant onboarding materials
- [ ] `community/pilot/facilitator-guide.md` — for community facilitators
- [ ] `community/pilot/feedback-instruments/` — surveys, interview guides
- [ ] Running relay serving pilot community
- [ ] At least 50 participants onboarded
- [ ] First cooperative matches surfaced

**Pilot Design:**
```
Participants: 50-200 community members in Newton, IL area
Duration: 8-12 weeks (overlapping with Phase 3)
Trust anchor: local institution (library or community center)
Onboarding: in-person workshops (3-4 sessions over 2 weeks)
Support: dedicated facilitator + async help channel
Metrics: match rate, acceptance rate, cooperative outcome rate,
         cross-boundary rate, equity distribution, user satisfaction
Exit: participants can withdraw at any time, data deleted within 48hrs
```

**Acceptance Criteria:**
- 50+ active participants submitting signals
- System uptime >99% during pilot period
- At least 10 cooperative matches accepted by both parties
- At least 3 matches result in actual cooperative action
- No privacy incidents

**Dependencies:** Privacy audit passed (WP 2.5), trust bootstrap (WP 2.4), pilot site confirmed (WP 1.6)

---

## Phase 3: Pilot & Learn

**Timeline:** November 2026 — March 2027  
**Detailed planning deferred until Phase 2 data is available.**

### Expected Work Packages:
- 3.1: Pilot monitoring and support
- 3.2: Data collection and analysis
- 3.3: Pilot results report
- 3.4: Specification revision based on evidence
- 3.5: Equity audit
- 3.6: Embedding model training (if pilot generates sufficient match data)
- 3.7: Standards body engagement with pilot evidence

### Decision Gates (from ROADMAP.md):
- Does ambient matching surface connections that explicit search would not?
- Is the progressive disclosure handshake acceptable to users?
- Are privacy properties maintained under real-world conditions?
- Does the trust bootstrap work for underconnected participants?
- Is the cross-boundary matching rate meaningfully above baseline?

---

## Phase 4: Scale & Formalize

**Timeline:** April 2027+  
**Planning contingent on Phase 3 results.**

### Expected Directions:
- Multi-community deployment with relay federation
- Formal CIP standardization proposal to Linux Foundation Agentic AI Foundation
- Trained complementarity embeddings replacing simple taxonomy matching
- Integration partnerships with AI assistant providers
- Governance transition per WD-006

---

## Repository Structure (Target)

```
latent-value-network/
├── README.md
├── PLAN.md                          ◄ this document
├── ROADMAP.md
├── CONTRIBUTING.md
├── LICENSE
├── netlify.toml
│
├── docs/                            # Specifications & research
│   ├── WD-001-white-paper.md
│   ├── WD-002-evidence-base.md
│   ├── WD-003-signal-exchange-protocol.md
│   ├── WD-004-explainer-script.md
│   ├── WD-005-trust-fabric.md
│   ├── WD-006-governance-framework.md
│   ├── protocol-integration-strategy.md
│   ├── reference-implementation.md
│   ├── research-landscape.md
│   └── guides/                      ◄ new
│       ├── mcp-quickstart.md
│       ├── a2a-quickstart.md
│       └── relay-operator.md
│
├── specs/                           ◄ new: formal specifications
│   ├── taxonomy/
│   │   ├── lvn-taxonomy-0.1.yaml
│   │   ├── complementarity-map.yaml
│   │   └── TAXONOMY-GOVERNANCE.md
│   ├── mcp-sep/
│   │   ├── SEP-cooperative-context.md
│   │   ├── schema.ts
│   │   └── examples/
│   ├── a2a-extension/
│   │   ├── cooperative-agent-card.md
│   │   ├── agent-card-schema.json
│   │   └── task-flows.md
│   └── cip/
│       ├── CIP-SPEC-0.1.md
│       ├── messages.proto
│       ├── threat-model.md
│       └── privacy-analysis.md
│
├── src/                             ◄ new: implementation
│   ├── mcp-server/                  # Python FastMCP server
│   ├── mcp-server-ts/               # TypeScript MCP server
│   ├── a2a-agents/
│   │   ├── discovery-agent/
│   │   └── relay-agent/
│   ├── relay/
│   │   ├── scoring/
│   │   ├── handshake/
│   │   └── trust/
│   └── trust/
│
├── packages/                        ◄ new: publishable packages
│   └── taxonomy/
│
├── tests/                           ◄ new
│   ├── mcp/
│   ├── a2a/
│   ├── relay/
│   └── trust/
│
├── infrastructure/                  ◄ new
│   └── pilot/
│
├── community/
│   ├── outreach-posts.md
│   ├── skool-post.md
│   ├── working-groups/              ◄ new
│   │   ├── README.md
│   │   ├── ai-integration.md
│   │   ├── privacy-crypto.md
│   │   ├── theory-foundations.md
│   │   ├── ethics-equity.md
│   │   └── community-practice.md
│   ├── CHARTER.md                   ◄ new
│   └── pilot/                       ◄ new
│       ├── assessment-criteria.md
│       ├── consent-framework.md
│       └── newton-il/
│
├── site/                            # Project website
│   ├── index.html
│   ├── demo.html
│   ├── provocations.html
│   └── architecture.html
│
└── .github/
    ├── ISSUE_TEMPLATE/
    └── DISCUSSION_TEMPLATE/         ◄ new
```

---

## Dependency Graph

```
                    ┌──────────────┐
                    │ Taxonomy v0.1│ WP 1.1
                    │  (CRITICAL)  │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────▼────┐ ┌────▼─────┐ ┌───▼──────┐
        │ MCP SEP  │ │A2A Ext.  │ │CIP Spec  │ WP 1.2-1.4
        │ Draft    │ │Draft     │ │v0.1      │
        └─────┬────┘ └────┬─────┘ └───┬──────┘
              │            │            │
              └────────────┼────────────┘
                           │
              ┌────────────┼───────────────────┐
              │            │                   │
        ┌─────▼────┐ ┌────▼─────┐     ┌───────▼────┐
        │MCP Server│ │A2A Agents│     │Trust Boot. │ WP 2.1-2.4
        └─────┬────┘ └────┬─────┘     └───────┬────┘
              │            │                   │
              └────────────┼───────────────────┘
                           │
                    ┌──────▼───────┐
                    │Community     │ WP 2.3
                    │Relay         │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │Privacy Audit │ WP 2.5
                    │  (GATE)      │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │Pilot Deploy  │ WP 2.6
                    └──────────────┘
```

---

## How to Contribute to This Plan

1. **Claim a work package.** Open an issue titled "WP X.Y: [name] — [your name]" to signal you're working on it.
2. **Propose changes.** Submit PRs against this document for scope changes, timeline adjustments, or new work packages.
3. **Report blockers.** If a dependency is blocking you, open an issue immediately. Don't wait.
4. **Disagree openly.** If you think a work package is wrong-headed, say so in Discussions. Better to course-correct early.

The plan is a living document. It changes when evidence says it should.

---

*The Latent Value Network · Development Plan v1.0 · CC BY-SA 4.0*
