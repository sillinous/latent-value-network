# Reference Implementation Outline

**Signal Exchange Protocol — Minimum Viable Implementation**

*Not production code. A structural sketch for the AI Integration working group.*

---

## Scope

This outlines the minimum components needed to test the core hypothesis: **can ambient AI context, transformed into abstract signal vectors, surface cooperative matches that neither party would have searched for?**

This MVP deliberately omits: relay infrastructure (community-anchored only), learned embeddings (pre-defined taxonomy), ZK proofs (trusted coordinator), and the full trust fabric (simple vouching). See WD-003 for the complete specification.

---

## Architecture Overview

```
┌──────────────────────────────────────────────┐
│  User's AI Assistant (MCP Context Provider)   │
│                                              │
│  ┌──────────┐   ┌────────────────────────┐   │
│  │ Context  │──▶│ Signal Generation      │   │
│  │ Model    │   │ Engine                 │   │
│  │ (L1/L2)  │   │ context → vector       │   │
│  └──────────┘   └──────────┬─────────────┘   │
│                            │                 │
│                     signal_vector             │
│                            │                 │
└────────────────────────────┼─────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Community Hub   │
                    │  (Coordinator)   │
                    │                 │
                    │  Match Engine   │
                    │  Handshake Mgr  │
                    └────────┬────────┘
                             │
                      match_candidates
                             │
                    ┌────────▼────────┐
                    │  Progressive    │
                    │  Disclosure     │
                    │  Handshake      │
                    └─────────────────┘
```

---

## Component 1: Context Model (Layer 1)

The context model represents a user's situation. In the MVP, this is structured data derived from conversation, not a learned embedding.

```
ContextModel:
  skills: List[SkillEntry]       # what they can do
  needs: List[NeedEntry]         # what they're dealing with
  resources: List[ResourceEntry] # what they have access to
  trajectory: TrajectoryEntry    # where they're heading
  preferences: CoopPreferences   # how they want to cooperate

SkillEntry:
  taxonomy_id: str               # e.g., "home-repair.plumbing"
  confidence: float              # 0-1, how sure the AI is
  basis: str                     # "self-reported" | "inferred" | "demonstrated"
  detail: str                    # freetext context (never leaves device)

NeedEntry:
  taxonomy_id: str               # e.g., "housing.maintenance.drainage"
  urgency: float                 # 0-1
  context: str                   # private detail

ResourceEntry:
  type: str                      # "equipment" | "space" | "time" | "access"
  description: str
  availability: Schedule

CoopPreferences:
  max_distance: float            # km
  time_budget: str               # "1hr/week" | "flexible" | etc.
  exchange_mode: str             # "reciprocal" | "gift" | "any"
  comfort_level: str             # "low-stakes-first" | "open"
```

### MCP Integration

The context model exposes itself as an MCP resource:

```
Resource: cooperative_context
  URI: lvn://context/{user_id}
  Type: application/lvn.context+json
  Access: read-only, local agent only
  
  Methods:
    get_signal_vector() → SignalVector  # abstract, safe to transmit
    get_full_context() → ContextModel   # private, never transmitted
    approve_disclosure(scope) → ScopedContext  # user-approved subset
```

---

## Component 2: Signal Generation Engine (Layer 3, Phase 1)

Transforms the private context model into an abstract signal vector that can be compared without revealing the underlying context.

```
SignalVector:
  embedding: float[128]         # dense representation of situation
  bloom_skills: BloomFilter     # probabilistic skill membership
  bloom_needs: BloomFilter      # probabilistic need membership
  meta:
    generated_at: timestamp
    taxonomy_version: str
    agent_id: str               # pseudonymous, rotatable
    
generate_signal(context: ContextModel) → SignalVector:
  # Step 1: Map skills/needs to taxonomy
  skill_ids = [resolve_taxonomy(s) for s in context.skills]
  need_ids = [resolve_taxonomy(n) for n in context.needs]
  
  # Step 2: Generate Bloom filters
  bloom_skills = BloomFilter(capacity=256, fp_rate=0.01)
  for sid in skill_ids:
    bloom_skills.add(sid)
    bloom_skills.add(parent_category(sid))  # add parent for fuzzy matching
  
  bloom_needs = BloomFilter(capacity=256, fp_rate=0.01)
  for nid in need_ids:
    bloom_needs.add(nid)
    bloom_needs.add(parent_category(nid))
  
  # Step 3: Generate dense embedding
  # MVP: simple TF-IDF or sentence transformer on taxonomy descriptions
  # Production: trained complementarity model (see OQ-1)
  embedding = embed_situation(skill_ids, need_ids, context.trajectory)
  
  return SignalVector(embedding, bloom_skills, bloom_needs, meta)
```

### Privacy Boundary

```
INVARIANT: Nothing above the signal generation step can reconstruct the
original context. The signal vector is a lossy, abstract representation.

Specifically:
- Bloom filters have false positives by design
- Embedding is trained to capture complementarity, not identity  
- Agent IDs are pseudonymous and rotated periodically
- No freetext, names, locations, or identifiable details cross this boundary
```

---

## Component 3: Match Discovery (Layer 3, Phase 2)

In the MVP, a trusted community coordinator collects signal vectors and computes matches.

```
complementarity_score(a: SignalVector, b: SignalVector) → float:
  # Component 1: Can A help B?
  a_skills_b_needs = bloom_intersection(a.bloom_skills, b.bloom_needs)
  
  # Component 2: Can B help A?
  b_skills_a_needs = bloom_intersection(b.bloom_skills, a.bloom_needs)
  
  # Component 3: Embedding similarity (complementarity, not similarity)
  # Note: we want COMPLEMENTARY situations, not SIMILAR ones
  emb_score = complementarity_function(a.embedding, b.embedding)
  
  # Component 4: Cross-boundary bonus
  skill_overlap = bloom_intersection(a.bloom_skills, b.bloom_skills)
  cross_bonus = 1.0 - (skill_overlap / max(bloom_count(a.bloom_skills), 1))
  
  # Weighted combination
  score = (
    0.3 * normalize(a_skills_b_needs + b_skills_a_needs) +  # mutual help
    0.3 * emb_score +                                        # embedding match
    0.2 * cross_bonus +                                      # cross-boundary
    0.2 * mutual_bonus(a_skills_b_needs, b_skills_a_needs)   # bidirectionality
  )
  
  return score

complementarity_function(emb_a, emb_b) → float:
  # NOT cosine similarity (that finds similar people)
  # We want a learned function that maps to cooperative potential
  # MVP: use inverse skill overlap as proxy
  # Production: train on cooperative outcome data
  return 1.0 - cosine_similarity(emb_a, emb_b)  # rough proxy

discover_matches(signals: List[SignalVector], threshold=0.3) → List[Match]:
  matches = []
  for i, a in enumerate(signals):
    for j, b in enumerate(signals):
      if i >= j: continue
      score = complementarity_score(a, b)
      if score >= threshold:
        matches.append(Match(a.agent_id, b.agent_id, score))
  
  # Sort by score, return top candidates per agent
  return ranked_per_agent(matches, max_per_agent=5)
```

---

## Component 4: Negotiation Handshake (Layer 3, Phase 3)

Progressive disclosure — both parties gradually reveal more context, with consent at each step.

```
HandshakeState: enum
  CANDIDATE      # match discovered, not yet notified
  NOTIFIED       # both parties informed a potential match exists
  INTEREST       # both parties expressed willingness to learn more
  SCOPED_REVEAL  # limited context exchanged (user-approved)
  IDENTIFIED     # identities revealed, connection made
  DECLINED       # either party declined (no penalty)
  COMPLETED      # cooperation occurred

ScopedContext:
  # User-approved subset of their context, for this specific match
  relevant_skills: List[str]     # just the skills relevant to this match
  relevant_needs: List[str]      # just the needs relevant to this match  
  comfort_text: str              # user-written message ("I could help with...")
  # NO: name, location, full profile, or anything beyond what user approves

handshake_flow(match: Match):
  # Step 1: Notify both agents
  notify(match.agent_a, "A potential cooperative match has been found.")
  notify(match.agent_b, "A potential cooperative match has been found.")
  match.state = NOTIFIED
  
  # Step 2: Check interest (both must opt in)
  interest_a = await prompt_interest(match.agent_a,
    "Someone nearby might benefit from your experience with [category]. 
     Want to learn more?")
  interest_b = await prompt_interest(match.agent_b,
    "Someone nearby might be able to help with [category]. 
     Want to learn more?")
  
  if not (interest_a and interest_b):
    match.state = DECLINED
    return  # No penalty, no record
  
  match.state = INTEREST
  
  # Step 3: Scoped reveal (user approves what to share)
  scope_a = await request_scoped_context(match.agent_a,
    "Here's what you might share. Edit or remove anything:")
  scope_b = await request_scoped_context(match.agent_b,
    "Here's what you might share. Edit or remove anything:")
  
  exchange(match.agent_a, scope_b)  # A sees B's approved context
  exchange(match.agent_b, scope_a)  # B sees A's approved context
  match.state = SCOPED_REVEAL
  
  # Step 4: Identity reveal (both must opt in again)
  reveal_a = await prompt_reveal(match.agent_a,
    "Would you like to connect with this person?")
  reveal_b = await prompt_reveal(match.agent_b,
    "Would you like to connect with this person?")
  
  if reveal_a and reveal_b:
    exchange_identity(match.agent_a, match.agent_b)
    match.state = IDENTIFIED
  else:
    match.state = DECLINED
```

---

## Component 5: Cooperative Taxonomy (Shared)

Used by both signal generation (Bloom filters) and trust domains.

```
Taxonomy (MVP - flat, pre-defined):
  home-repair
    home-repair.plumbing
    home-repair.electrical
    home-repair.structural
    home-repair.general
  technology
    technology.web-development
    technology.data-management
    technology.device-support
    technology.automation
  finance
    finance.tax-planning
    finance.budgeting
    finance.small-business
    finance.benefits-navigation
  healthcare
    healthcare.navigation
    healthcare.elder-care
    healthcare.translation
    healthcare.wellness
  education
    education.tutoring
    education.career-guidance
    education.curriculum-design
    education.mentoring
  community
    community.organizing
    community.food-access
    community.transportation
    community.social-connection
  legal
    legal.contracts
    legal.rights-navigation
    legal.small-business
  creative
    creative.design
    creative.writing
    creative.music
    creative.crafts
  logistics
    logistics.transportation
    logistics.equipment
    logistics.space-access
    logistics.time
```

---

## MVP Technical Stack (Suggested)

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Context model | JSON schema + TypeScript types | Simple, portable |
| MCP integration | MCP SDK (TypeScript) | Standard protocol |
| Signal generation | Python + sentence-transformers | Embedding ecosystem |
| Bloom filters | Python `pybloom_live` or custom | Lightweight |
| Match engine | Python | Prototyping speed |
| Handshake state | SQLite or Postgres | Simple state machine |
| Community hub | FastAPI | Quick API prototype |
| Frontend | HTML/JS (no framework) | Accessible to practitioners |

---

## What This Doesn't Cover

These are explicitly deferred to later phases:

- **Relay infrastructure** — MVP uses a single community coordinator
- **ZK proofs** — MVP uses trusted coordinator; privacy is architectural, not cryptographic
- **Learned embeddings** — MVP uses pre-defined taxonomy; training requires pilot data
- **Trust fabric** — MVP uses simple vouching through community coordinator
- **Governance** — MVP uses informal consensus; formal governance after pilot
- **Multi-community federation** — MVP is single-community
- **Differential privacy feedback** — MVP collects no training data

---

## Open Implementation Questions

**IQ-1:** Should the MVP use a real embedding model or just Bloom filter intersection? The embedding adds sophistication but the Bloom approach is more transparent and debuggable.

**IQ-2:** How does the community coordinator authenticate agents without creating a user database? Options: anonymous tokens, institutional vouching, or community-generated invite codes.

**IQ-3:** What's the right notification UX for "a potential match exists"? Too vague and people ignore it. Too specific and you've violated privacy before the handshake starts.

**IQ-4:** How do we measure whether the MVP is working? Proposed metrics: match acceptance rate, cross-boundary ratio, cooperative completion rate, user-reported value.

---

*This outline is a starting point, not a specification. Fork it, break it, rebuild it.*

*The Latent Value Network · CC BY-SA 4.0*
