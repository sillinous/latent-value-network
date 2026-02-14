# LVN Outreach Materials
## Audience-Specific Posts for Community Engagement

---

## 1. For David Shapiro's Post-Labor Economics (Skool)
**[Already written — see community/skool-post.md]**
**Status:** Ready to post

---

## 2. For AI/ML Research Communities (Reddit r/MachineLearning, HuggingFace, Twitter/X)

### Title: "Privacy-preserving semantic matching: an open research problem in cooperative AI"

We're working on a protocol for AI agents to discover cooperative matches between people without exposing private context. The core technical challenge: can you do meaningful fuzzy/semantic matching on encrypted embedding vectors?

Standard ZK proofs handle exact attribute verification well. But our use case requires approximate nearest-neighbor search where "complementary" ≠ "similar" (a person who needs plumbing help should match with a plumber, not with another person who needs plumbing help).

The **Signal Exchange Protocol** (open spec, CC BY-SA 4.0) defines:
- Signal vectors: d=128 embeddings + Bloom filter capability/need sketches
- A composite complementarity function that distinguishes semantic complementarity from similarity
- Progressive disclosure handshake with formal privacy properties
- Differential privacy feedback for match quality calibration

**Open research questions we can't solve alone:**
1. Can FHE support approximate embedding comparison at practical latencies for non-real-time matching?
2. What training objective produces an embedding space where *complementary* (not similar) situations cluster?
3. How do you federate embedding model training without producing inconsistent signal spaces?

Full spec: [https://github.com/sillinous/latent-value-network/blob/main/docs](https://github.com/sillinous/latent-value-network)
GitHub: [https://github.com/sillinous/latent-value-network](https://github.com/sillinous/latent-value-network)

We're looking for adversarial thinkers, not cheerleaders. If you think this can't work, we want to know why.

---

## 3. For Commons/Governance Communities (Ostrom Workshop, P2P Foundation, RadicalxChange)

### Title: "Designing a digital commons for cooperative matching — applying Ostrom to AI-mediated cooperation"

What if an AI system could surface cooperative connections between people in a community — the retired engineer who could help with your drainage problem, the college student whose web skills match the food bank's needs — without any central platform owning the data?

We're designing the **Latent Value Network**, an open protocol for ambient human cooperation. The architecture explicitly follows Ostrom's principles for commons governance, and we're grappling with questions her framework raises at digital scale:

**Clearly defined boundaries:** How do you define community membership in a protocol that's designed to bridge boundaries? The value comes from cross-boundary connections, but governance requires boundaries.

**Collective choice arrangements:** Protocol parameters (match thresholds, privacy budgets, trust requirements) need to evolve. Who decides? How do you prevent parameter manipulation by actors who'd benefit from biased matching?

**Anti-capture by design:** Email is a protocol; Gmail dominates it. HTTP is a protocol; five companies control the web. Can we design structural anti-capture mechanisms that actually hold, or is "protocol not platform" naive?

We've written a foundational white paper, an evidence base drawing on Chetty's social capital research, Granovetter's weak ties work, and cooperative game theory, and a formal protocol specification with six open questions.

We need governance thinkers. Read our **10 Provocations** — especially #4 (equity), #6 (trust bootstrapping), #7 (protocol vs. platform), and #10 (where to pilot) — and tell us where we're getting it wrong.

Full materials: [https://latent-value-network.netlify.app](https://latent-value-network.netlify.app)
GitHub: [https://github.com/sillinous/latent-value-network](https://github.com/sillinous/latent-value-network)

---

## 4. For MCP/AI Agent Developer Communities (Anthropic Discord, MCP GitHub, AI agent builders)

### Title: "MCP extension proposal: cooperative context for inter-agent matching"

**tl;dr:** We're proposing a new MCP context type — *cooperative context* — that enables AI agents to discover matches between users without transmitting private data.

**The problem:** Your AI assistant understands your situation deeply. Your neighbor's AI understands theirs. But there's no protocol for these agents to discover that you could help each other — even when the match would be obvious to any human who knew both of you.

**The proposal:** The Latent Value Network defines a Signal Exchange Protocol that maps naturally to existing AI coordination standards:

- **Layer 1-2 → MCP:** Personal context engine and latent capacity discovery implement as MCP context resources. A new `cooperative_context` resource type exposes the subset relevant to matching.
- **Layer 3 → A2A:** Signal emission, relay, and negotiation handshake use A2A message types. We define specific message schemas for candidate notification, handshake state transitions, and scoped context packages.
- **UCP Integration:** Signal vectors travel as UIE envelopes through the standard UCP pipeline.

**What we need from this community:**
1. Feedback on the MCP/A2A integration architecture (Section VII of WD-003)
2. Input on whether the signal vector structure is compatible with how you're building agent systems
3. Red-teaming of the privacy model — can the handshake protocol be implemented with current MCP capabilities?

Protocol spec: [https://github.com/sillinous/latent-value-network/blob/main/docs](https://github.com/sillinous/latent-value-network)
GitHub: [https://github.com/sillinous/latent-value-network](https://github.com/sillinous/latent-value-network)

This is pre-implementation. We're soliciting architectural critique before writing code.

---

## 5. For Mutual Aid / Community Organizing (mutual aid networks, community toolkits)

### Title: "What if your mutual aid network could match people automatically — without a platform owning the data?"

You know what it's like. Someone posts in the group: "Does anyone know how to fix a leaky faucet?" Three people see it who could help, but they're busy that day and forget. Meanwhile, the person with the leaky faucet doesn't know that their neighbor — who isn't even in the group — is a retired plumber with free mornings.

**76% of mutual aid requests go unfilled** not because nobody could help, but because the right people never see the request.

We're building an open protocol called the **Latent Value Network** that could change this. The idea:

Your AI assistant (Claude, ChatGPT, whatever you use) already knows what you're dealing with and what you're good at — because you talk to it. What if it could quietly notice that someone in your community has exactly the skills your situation needs, and let you both know? Without either of you having to post, search, or fill out a form. Without any company seeing your data.

**We need a reality check from people who do this work.** We've written a white paper and a technical specification, but we're designers and engineers. We need to hear from people who actually coordinate cooperation:

- Does this match how people actually cooperate?
- What would break in your community? What would help?
- Where should we pilot this first?

Try the interactive demo: [https://latent-value-network.netlify.app/demo](https://latent-value-network.netlify.app/demo)
Read the provocations (especially #4, #9, #10): [https://latent-value-network.netlify.app/demo](https://latent-value-network.netlify.app/demo)

We're not selling anything. This is an open protocol released under Creative Commons. We're looking for partners, not customers.

---

## 6. For Local Government / Civic Innovation (Code for America, civic tech, local gov innovation)

### Title: "Civic infrastructure for the cooperation economy: an open protocol proposal"

Every local government struggles with the same invisible problem: residents have capabilities and needs that match, but no mechanism connects them. The retired teacher who could tutor struggling students. The contractor with slack capacity who could help with the neighbor's accessibility ramp. The community garden with unused space.

Existing platforms (Nextdoor, TaskRabbit, VolunteerMatch) capture some of this — but they require people to articulate needs they can't describe, search for help they don't know exists, and surrender data to platforms that profit from community connection.

**The Latent Value Network** proposes a different model: an open protocol (like email or HTTP) for AI-mediated cooperative matching that:
- Operates without a central platform or data warehouse
- Preserves individual privacy through cryptographic protocols
- Surfaces matches *ambient* — no searching, posting, or profile-building required
- Is governed as a commons, not a product

We've published four working documents, an interactive concept demo, and 10 open questions that we need civic practitioners to weigh in on.

**Pilot opportunity:** We're looking for a community of ~500 people to run the first real-world test. Ideal: diverse population, existing cooperative culture, institutional trust anchors (library, community center, clinic). If your community might be interested, we want to talk.

Hub: [https://latent-value-network.netlify.app/demo](https://latent-value-network.netlify.app/demo)
GitHub: [https://latent-value-network.netlify.app/demo](https://latent-value-network.netlify.app/demo)
Contact: [https://github.com/sillinous/latent-value-network/discussions](https://github.com/sillinous/latent-value-network/discussions)
