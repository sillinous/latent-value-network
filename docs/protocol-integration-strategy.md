# AI Protocol Integration Strategy

**Building Cooperative Intelligence Into the AI Infrastructure Layer**

*From concept to protocol proposal — concrete paths to standardization*

---

## Strategic Position

The AI protocol ecosystem in early 2026 looks like this:

- **MCP** (Model Context Protocol) — Anthropic, now Linux Foundation. The standard for agent-to-tool and agent-to-data connections. 97M+ monthly SDK downloads. Backed by Anthropic, OpenAI, Google, Microsoft. November 2025 spec added async tasks, OAuth 2.1, and the Extensions framework (SEPs). MCP Apps just shipped UI capabilities across ChatGPT, Claude, and VS Code.

- **A2A** (Agent-to-Agent Protocol) — Google, Linux Foundation. The standard for inter-agent communication. Agent Cards for capability discovery, JSON-RPC 2.0 transport, task lifecycle management. 150+ partner organizations. v0.3 shipped with gRPC and signed agent cards.

- **ACP** (Agent Communication Protocol) — IBM. Structured messaging within localized environments.

The LVN's core thesis maps precisely onto the gap between what these protocols do and what they *don't* do. MCP connects agents to tools and data. A2A lets agents collaborate on tasks. But neither protocol addresses a fundamental capability: **agents discovering cooperative opportunities across human users without those users explicitly requesting collaboration.**

That gap is our entry point.

---

## I. MCP Extension: Cooperative Context Resource

### The Proposal

Submit a **Spec Enhancement Proposal (SEP)** to the MCP repository for a new resource type: `cooperative_context`. This is a privacy-preserving abstraction that lets an AI assistant expose a user's cooperative potential (skills, needs, capacity) without exposing the underlying private context.

### Why It Fits MCP

MCP already defines Resources as "data that servers expose to clients." The current resource types include files, databases, and API endpoints. A `cooperative_context` resource extends this pattern naturally — it's data about a user's situation that the agent has already accumulated through normal interaction. The key difference: this resource is designed to be *compared across users* through a relay, not consumed directly.

### Proposed Schema

```typescript
// SEP: cooperative_context resource type
// Extension to MCP Resources specification

interface CooperativeContextResource {
  uri: `lvn://context/${string}`;  // user-scoped
  type: "application/lvn.context+json";
  
  // Methods
  getSignalVector(): Promise<SignalVector>;      // abstract, safe to transmit
  approveDisclosure(scope: DisclosureScope): Promise<ScopedContext>;
  getCooperativePreferences(): Promise<CoopPreferences>;
  
  // Privacy controls
  sovereignty: {
    localOnly: boolean;           // full context never leaves device
    signalApproval: "automatic" | "per-query" | "manual";
    disclosureRequiresConsent: true;  // always true, not configurable
  };
}

interface SignalVector {
  embedding: number[];            // d=128 float32, situation representation
  bloomSkills: Uint8Array;        // probabilistic skill membership
  bloomNeeds: Uint8Array;         // probabilistic need membership
  meta: {
    generatedAt: string;          // ISO timestamp
    taxonomyVersion: string;      // cooperative taxonomy version
    agentId: string;              // pseudonymous, rotatable
    privacyBudget: number;        // remaining ε for this epoch
  };
  
  // Differential privacy noise applied at generation time
  noiseProfile: {
    mechanism: "laplace" | "gaussian";
    epsilon: number;              // privacy parameter
    delta?: number;               // for gaussian mechanism
  };
}

interface DisclosureScope {
  matchId: string;                // which match this disclosure is for
  categories: string[];           // taxonomy categories to disclose
  depth: "category" | "subcategory" | "detail";
  duration: number;               // seconds before disclosure expires
}
```

### MCP Integration Pattern

```typescript
// Server implementation
class CooperativeContextServer implements McpServer {
  resources = [{
    uri: "lvn://context/current-user",
    name: "Cooperative Context",
    description: "Privacy-preserving representation of cooperative potential",
    mimeType: "application/lvn.context+json"
  }];
  
  async readResource(uri: string): Promise<ResourceContents> {
    if (uri === "lvn://context/current-user") {
      // Returns ONLY the signal vector, never raw context
      const signal = await this.contextEngine.generateSignal();
      return {
        uri,
        mimeType: "application/lvn.context+json",
        text: JSON.stringify(signal)
      };
    }
  }
  
  tools = [{
    name: "approve_cooperative_disclosure",
    description: "Approve sharing specific context with a matched party",
    inputSchema: {
      type: "object",
      properties: {
        matchId: { type: "string" },
        categories: { type: "array", items: { type: "string" } },
        depth: { enum: ["category", "subcategory", "detail"] }
      },
      required: ["matchId", "categories", "depth"]
    }
  }];
}
```

### Submission Path

1. **Draft SEP** following MCP's governance process (modelcontextprotocol.io)
2. **Reference implementation** as an MCP server in Python (FastMCP) and TypeScript
3. **Target working group:** The MCP Extensions working group, which reviews new resource types and capabilities
4. **Precedent:** MCP Apps (SEP-1865) followed this exact path — proposed as extension, built reference implementation, got adopted across ChatGPT/Claude/VS Code

---

## II. A2A Extension: Cooperative Discovery Agent Card

### The Proposal

Extend the A2A Agent Card specification to include a `cooperativeCapabilities` field that allows agents to advertise their user's cooperative potential without exposing the user's identity or context.

### Why It Fits A2A

A2A already defines Agent Cards as JSON metadata describing what an agent can do. Adding cooperative capability advertising is a natural extension — it's just another kind of capability. The key innovation: these capabilities represent the *human behind the agent*, not the agent itself. The agent advertises that its user has certain skills and needs, with privacy-preserving abstractions.

### Proposed Agent Card Extension

```json
{
  "name": "cooperative-discovery-agent",
  "description": "Discovers cooperative matches for the user",
  "url": "https://agent.example.com/a2a",
  "version": "1.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true
  },
  "skills": [
    {
      "id": "cooperative-match-discovery",
      "name": "Cooperative Match Discovery",
      "description": "Discovers mutually beneficial connections through privacy-preserving signal comparison"
    },
    {
      "id": "cooperative-handshake",
      "name": "Cooperative Handshake",
      "description": "Manages progressive disclosure between matched parties"
    }
  ],
  "extensions": {
    "cooperativeCapabilities": {
      "version": "0.1.0",
      "protocol": "lvn-sep",
      "signalVector": {
        "available": true,
        "dimensions": 128,
        "taxonomyVersion": "lvn-taxonomy-0.1",
        "privacyMechanism": "differential-privacy",
        "epsilon": 1.0
      },
      "handshake": {
        "supported": true,
        "progressiveDisclosure": true,
        "maxChainLength": 3,
        "trustVerification": "community-anchored"
      },
      "community": {
        "id": "newton-il-pilot",
        "relayEndpoint": "https://relay.community.example.com/a2a",
        "trustAnchor": "newton-public-library"
      }
    }
  }
}
```

### A2A Task Flow for Cooperative Matching

```
Agent A                    Relay Agent                   Agent B
  │                           │                            │
  ├─── tasks/send ───────────►│                            │
  │    (signal_vector)        │                            │
  │                           │◄──── tasks/send ───────────┤
  │                           │      (signal_vector)       │
  │                           │                            │
  │                    ┌──────┴──────┐                     │
  │                    │ Complementarity                   │
  │                    │ Scoring      │                    │
  │                    └──────┬──────┘                     │
  │                           │                            │
  │◄── tasks/send ────────────┤──── tasks/send ───────────►│
  │    (match_candidate)      │    (match_candidate)       │
  │                           │                            │
  │     User A approves       │      User B approves       │
  │                           │                            │
  ├─── tasks/send ───────────►│◄──── tasks/send ───────────┤
  │    (disclosure_l1)        │      (disclosure_l1)       │
  │                           │                            │
  │◄── tasks/send ────────────┤──── tasks/send ───────────►│
  │    (mutual_disclosure)    │    (mutual_disclosure)     │
  │                           │                            │
  │           Progressive disclosure continues...          │
  │           Until both parties have enough to connect     │
```

### Submission Path

1. **Propose as A2A extension** via their GitHub contribution process (a2aproject/A2A)
2. **Align with existing extension pattern:** Tavro's Agent Metadata Specification already extends Agent Cards — this follows the same model
3. **Build reference agents** using Google ADK, demonstrating cooperative discovery in a multi-agent system
4. **Target:** A2A's next spec cycle, which is actively soliciting extension proposals

---

## III. New Standard Proposal: Cooperative Intelligence Protocol (CIP)

### The Gap Neither Protocol Fills

MCP handles agent-to-tool. A2A handles agent-to-agent. But neither addresses:

- **Cross-user context aggregation** — how do agents from different users compare situations?
- **Privacy-preserving semantic matching** — how do you find complementarity without revealing identity?
- **Progressive disclosure handshakes** — how do you go from anonymous match to identified connection with human consent at every step?
- **Trust fabric queries** — how do agents verify reputation without exposing the social graph?
- **Cooperative taxonomy** — how do heterogeneous agents agree on what "skills" and "needs" mean?

These are the problems WD-003 through WD-006 already solve. The question is how to package them as a formal protocol.

### CIP Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌──────────┐  ┌────────────┐  ┌─────────────────────────┐ │
│  │ User's   │  │ Community  │  │ Trust Fabric            │ │
│  │ AI Agent │  │ Dashboard  │  │ Service                 │ │
│  └────┬─────┘  └──────┬─────┘  └──────────┬──────────────┘ │
│       │               │                    │                │
├───────┴───────────────┴────────────────────┴────────────────┤
│                    CIP Protocol Layer                        │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Signal   │  │ Match      │  │Handshake │  │ Trust    │ │
│  │ Exchange │  │ Discovery  │  │ Manager  │  │ Queries  │ │
│  └────┬─────┘  └──────┬─────┘  └────┬─────┘  └────┬─────┘ │
│       │               │              │              │       │
├───────┴───────────────┴──────────────┴──────────────┴───────┤
│                    Transport Bindings                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ MCP          │  │ A2A          │  │ Direct       │      │
│  │ (Resources + │  │ (Agent Card +│  │ (HTTP/gRPC)  │      │
│  │  Tools)      │  │  Tasks)      │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                    Privacy Layer                              │
│  Differential Privacy · Bloom Filters · ZK Trust Queries     │
│  Progressive Disclosure · Consent Management                 │
└──────────────────────────────────────────────────────────────┘
```

### CIP Message Types

```protobuf
// CIP core message definitions

message SignalSubmission {
  string agent_id = 1;              // pseudonymous
  string community_id = 2;
  bytes signal_vector = 3;          // encrypted signal
  string taxonomy_version = 4;
  PrivacyMetadata privacy = 5;
}

message MatchCandidate {
  string match_id = 1;
  float complementarity_score = 2;  // NOT similarity
  string match_type = 3;            // "mutual" | "offer" | "need"
  repeated string overlap_categories = 4;  // taxonomy categories
  DisclosureTier disclosure_tier = 5;
}

message HandshakeMessage {
  string match_id = 1;
  HandshakeState state = 2;
  oneof payload {
    DisclosureLevel1 category_disclosure = 3;
    DisclosureLevel2 subcategory_disclosure = 4;
    DisclosureLevel3 detail_disclosure = 5;
    ConnectionProposal connection = 6;
    HandshakeTermination termination = 7;
  }
  ConsentProof consent = 8;         // cryptographic proof of user consent
}

message TrustQuery {
  string source_agent = 1;
  string target_agent = 2;
  string domain = 3;               // taxonomy domain for trust scope
  float minimum_threshold = 4;
  // Response is boolean + tier, never reveals chain details
}

enum HandshakeState {
  INITIATED = 0;
  CATEGORY_SHARED = 1;
  SUBCATEGORY_SHARED = 2;
  DETAIL_SHARED = 3;
  CONNECTION_PROPOSED = 4;
  CONNECTED = 5;
  TERMINATED = 6;
}

enum DisclosureTier {
  ANONYMOUS = 0;    // only match type and score
  CATEGORY = 1;     // broad capability areas
  SUBCATEGORY = 2;  // specific skills/needs
  DETAIL = 3;       // contextual specifics
  IDENTIFIED = 4;   // real identity (requires mutual consent)
}
```

### Standardization Path

The CIP doesn't need to be a wholly separate standard — it can be a **profile** that composes MCP and A2A extensions into a coherent system. This is similar to how FHIR profiles compose HL7 primitives for specific healthcare use cases.

1. **Phase 1 (Q1-Q2 2026): Extension Proposals**
   - Submit MCP SEP for `cooperative_context` resource type
   - Submit A2A extension for cooperative Agent Card capabilities
   - Publish CIP as an informational RFC-style document
   
2. **Phase 2 (Q2-Q3 2026): Reference Implementation**
   - Build MCP server (FastMCP) that implements `cooperative_context`
   - Build A2A agents (Google ADK) that implement cooperative discovery
   - Build a community relay that connects MCP contexts to A2A tasks
   - Deploy in Newton, IL pilot community
   
3. **Phase 3 (Q3-Q4 2026): Standards Engagement**
   - Present at MCP community events and A2A partner meetings
   - Engage the Linux Foundation Agentic AI Foundation (which governs both MCP and A2A)
   - Propose CIP as a formal protocol under the Agentic AI Foundation
   - Publish pilot results as evidence for the protocol's viability
   
4. **Phase 4 (2027): Formal Standardization**
   - With pilot data and multiple implementations, propose CIP for formal adoption
   - Target: Agentic AI Foundation working group or IETF informational RFC

---

## IV. Cooperative Taxonomy as Shared Vocabulary

### The Problem

For agents to compare cooperative potential, they need a shared vocabulary for skills, needs, and resources. No such taxonomy exists that's designed for human cooperation (as opposed to job markets or product categories).

### The Proposal: LVN Cooperative Taxonomy

A hierarchical, extensible taxonomy that:
- Covers human skills, needs, resources, and situations
- Is designed for *complementarity matching*, not *similarity matching*
- Maps cross-domain (a "teaching" skill maps to "education" AND "technology" AND "career" needs)
- Is community-governed and version-controlled

```yaml
# LVN Cooperative Taxonomy v0.1 (excerpt)
# Structure: domain → category → subcategory

practical:
  home-repair:
    - plumbing
    - electrical
    - structural
    - appliance
    - general-maintenance
  agriculture:
    - crop-management
    - irrigation
    - livestock
    - soil-science
    - equipment-operation
  food:
    - cooking
    - preservation
    - nutrition
    - commercial-kitchen
    - dietary-specialization
  transportation:
    - driving
    - logistics
    - vehicle-maintenance

professional:
  technology:
    - programming
    - web-development
    - database
    - networking
    - tech-support
  finance:
    - accounting
    - tax-planning
    - budgeting
    - investment
    - insurance-navigation
  legal:
    - contracts
    - property
    - employment
    - small-business
    - immigration
  healthcare:
    - clinical
    - navigation
    - elder-care
    - mental-health
    - health-literacy
  education:
    - curriculum
    - tutoring
    - mentoring
    - skill-assessment
    - language

relational:
  community:
    - organizing
    - event-planning
    - conflict-resolution
    - volunteer-coordination
  care:
    - childcare
    - elder-care
    - companion
    - crisis-support
  communication:
    - translation
    - writing
    - public-speaking
    - mediation

# Cross-domain complementarity mappings
# These define which skills map to which needs
complementarity:
  "practical.home-repair.plumbing": 
    serves: ["housing.maintenance.drainage", "housing.maintenance.water"]
  "professional.finance.tax-planning":
    serves: ["financial.tax", "business.compliance", "career.freelance"]
  "professional.education.curriculum":
    serves: ["career.transition", "business.training", "community.programming"]
  "relational.communication.translation":
    serves: ["healthcare.navigation", "legal.immigration", "community.inclusion"]
```

### Distribution

Publish the taxonomy as:
- **MCP Resource:** `lvn://taxonomy/v0.1` — agents can discover and consume it
- **A2A Shared Artifact:** Agents reference it in Agent Cards
- **npm/PyPI package:** `@lvn/taxonomy` / `lvn-taxonomy` for embedding in applications
- **GitHub:** Version-controlled, community-governed, semver releases

---

## V. Implementation Priority

### What to Build First (the leverage points)

| Priority | Deliverable | Effort | Impact | Ecosystem |
|----------|------------|--------|--------|-----------|
| 1 | MCP `cooperative_context` server (reference impl) | 2-3 weeks | Proves concept in existing ecosystem | MCP |
| 2 | Cooperative taxonomy v0.1 (npm + PyPI) | 1-2 weeks | Shared vocabulary for all agents | Both |
| 3 | A2A cooperative discovery agent (ADK) | 2-3 weeks | Demonstrates inter-agent matching | A2A |
| 4 | MCP SEP draft submission | 1 week | Formal standards engagement | MCP |
| 5 | Community relay prototype | 3-4 weeks | Connects MCP contexts via A2A tasks | Bridge |
| 6 | Pilot deployment (Newton, IL) | 4-6 weeks | Real-world evidence | Both |
| 7 | CIP specification document | 2 weeks | Formal protocol definition | New |
| 8 | A2A extension proposal | 1 week | Formal standards engagement | A2A |

### The Critical Insight

We don't need permission to start. Both MCP and A2A are designed for extensions. The MCP SEP process is open to anyone. A2A's Agent Card is explicitly designed to be extended. The taxonomy can be published as an independent package.

**The fastest path to standardization is a working implementation that solves a real problem.** If a community relay running in Newton, IL demonstrates that MCP-connected agents can discover cooperative matches through A2A task flows, that's not a proposal — it's evidence. Standards bodies adopt things that already work.

---

## VI. The Vision: Cooperative Intelligence as Infrastructure

Today, the AI infrastructure stack looks like this:

```
Models (GPT, Claude, Gemini, Llama)
  ↓
Frameworks (LangChain, ADK, CrewAI)
  ↓  
Protocols (MCP for tools, A2A for agents)
  ↓
Applications (chatbots, code assistants, search)
```

We're proposing an addition:

```
Models (GPT, Claude, Gemini, Llama)
  ↓
Frameworks (LangChain, ADK, CrewAI)
  ↓  
Protocols (MCP for tools, A2A for agents, CIP for cooperation)
  ↓
Applications (chatbots, code assistants, search, COOPERATIVE MATCHING)
```

The Cooperative Intelligence Protocol doesn't compete with MCP or A2A — it *composes* them into something neither can do alone. It adds a cooperative dimension to the AI infrastructure layer, so that every AI assistant can participate in surfacing connections between the humans it serves.

This is how you build cooperative infrastructure at internet scale: not by creating a new platform, but by adding a cooperative capability to the platforms that already exist.

---

*The protocol layer is where lasting change happens. Platforms come and go. Protocols endure.*

---

The Latent Value Network · Protocol Integration Strategy
Creative Commons Attribution-ShareAlike 4.0
