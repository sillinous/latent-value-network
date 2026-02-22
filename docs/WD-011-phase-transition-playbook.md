# WD-011 — The Phase Transition Playbook
## Community Pilot Design for Cooperative Critical Mass

**Status:** Working Draft v0.1  
**Authors:** LVN Initiative  
**License:** CC BY-SA 4.0  
**Companion docs:** WD-007 through WD-010  
**Companion tool:** lvn-pilot-navigator.html  
**Audience:** Community organizers, pilot coordinators, implementation teams

---

## Preface: The Document That Bridges Theory and Tuesday

The previous working documents in this series have built a rigorous theoretical architecture: a typed metamodel, a flourishing layer, a temporal model, a power governance framework. These documents are necessary. They determine whether the LVN is something genuinely new or just another platform with better branding.

But they don't answer the question a community organizer faces on the first day of a pilot: *What do I actually do first?*

This document answers that. It is organized around the practitioner's real questions — not the protocol designer's ideal model. It is honest about failure modes, about the gap between the theory and the ground, about the many ways a community deployment can go wrong even when the underlying architecture is sound.

A brief framing note before we begin:

**The protocol's job is to create conditions. The community's job is to cooperate.** Confusing these roles is probably the single most common deployment failure. The LVN relay, the PersonalContextEngine, the matching algorithm — these are tools that reduce the friction of discovering cooperative connections. They cannot generate the cooperative acts themselves. A community that is not yet ready to cooperate will not be made cooperative by deploying a matching platform, no matter how technically sophisticated. The deployment playbook is therefore partly about technical implementation and largely about community readiness: building the trust, norms, and shared understanding that make the platform valuable rather than irrelevant.

---

## Part I: Is Your Community Ready?

### 1.1 The Readiness Assessment

Before configuring a single protocol parameter, answer these questions honestly. There are no correct answers — there are answers that inform which deployment approach to use.

**Question 1: What is the current baseline of cooperative behavior?**

Not aspirational ("we want to help each other") but actual ("here is evidence that members of this community have helped each other in the past 6 months"). Communities that have zero existing cooperative behavior are not ready for the LVN protocol — they need community-building first. Communities with active but informal cooperative behavior are the ideal deployment target.

Evidence of baseline cooperation: mutual aid incidents, informal skill-sharing, resource lending, collective responses to challenges. Absence of evidence doesn't mean absence — it means the mapping hasn't been done yet.

**Question 2: What is the existing trust topology?**

Is there a core of people who trust each other and have cooperated before? Are there identifiable clusters with weak inter-cluster connections (high bridging opportunity)? Is there a recognized community leader or connector whose endorsement would give the platform credibility?

The trust topology determines where you start. Deploying the platform to people who don't trust each other and hoping the protocol generates trust is backwards. Trust enables cooperation; cooperation generates more trust. You need a small trust seed to start the cycle.

**Question 3: Who are the likely early adopters and who are the likely holdouts?**

In any community, some people are constitutionally oriented toward cooperative experimentation. They will engage early, provide feedback, and generate the first cooperative acts that others can observe and be encouraged by. Identifying these people before launch is critical — they are the seed from which the network grows.

The holdouts are equally important to understand. Some people will be skeptical of any platform ("another tech thing that won't last"), some will be protective of their privacy, some will have had bad experiences with previous cooperative attempts. Their resistance is information about what the deployment needs to address. Ignoring them doesn't make them go away.

**Question 4: What are the community's dominant failure modes?** *(from WD-007)*

The five-layer cascade (cognitive blindness, homophily, market failure, institutional gap, scale mismatch) affects different communities in different proportions. A tight-knit rural community may have low homophily failure but high scale mismatch (too small for critical density). A large urban neighborhood may have low scale mismatch but extreme homophily (segregated social clusters with almost no cross-cluster connection). Understanding which failure modes dominate tells you which protocol features to weight most heavily.

**Question 5: What is the community's relationship with data and technology?**

Specific things to understand: What privacy norms are current? Has a previous technology deployment violated trust? Are there significant portions of the community with limited digital fluency? What languages are actively used?

The answers determine what PCE signal extraction methods are viable, what onboarding process is appropriate, and how much human mediation is needed to supplement AI matching.

---

### 1.2 The Four Readiness Profiles

Based on the assessment, communities will typically fall into one of four profiles:

**Profile A — Ready to Deploy**  
Active baseline cooperation, identifiable trust seed, mix of early adopters, dominant failure modes are cognitive (CurseOfKnowledge, MetaIgnorance) rather than relational (homophily) or structural (scale). These communities can move directly to the seeding phase.

**Profile B — Ready with Scaffolding**  
Moderate baseline cooperation, trust seed exists but is thin or fragile, some early adopters, dominant failure modes include homophily or institutional gaps. These communities need 4-8 weeks of structured community-building events before protocol deployment — not to introduce the technology, but to build the relational substrate that makes the technology useful.

**Profile C — Preconditions Absent**  
Little or no documented cooperative behavior, no identifiable trust seed, dominant failure modes are structural (scale mismatch, institutional gap). These communities need significant investment in community infrastructure before LVN deployment. Attempting protocol deployment without this groundwork will generate adoption data that appears to show the protocol failed, when in fact the community was not ready for it.

**Profile D — Active Harm Risk**  
Communities with active internal conflict, significant power imbalances that have already generated exploitation dynamics, or recent history of trust violation. Deploying a cooperative matching platform into these conditions without first addressing the underlying conflict may accelerate harm rather than generating cooperative value. The equity governance from WD-010 is essential here — but it must be configured before deployment, not retrofitted after damage is done.

---

## Part II: The Seeding Phase (Days 0–45)

### 2.1 The First Fifteen

Don't launch to the entire community. Launch to fifteen people.

This is the most counterintuitive and most important instruction in this playbook. Platform logic says you need scale to be useful — more users means more matches means more value. This is true at steady state. In the seeding phase, it is backwards.

A large initial deployment to a community that hasn't been prepared generates what we call the Empty Protocol problem: many people, few cooperative acts, and a platform that appears to do nothing. The social proof from those early non-experiences persists. "I tried that thing and it didn't do anything" is the most damaging message a deployment can generate, and it will spread faster than any positive outcome from later activity.

Fifteen people, well-chosen, will generate more cooperative acts — and more visible evidence of value — in the first 45 days than 200 poorly-chosen people. The network effect kicks in when there is actual cooperative activity to spread; it doesn't kick in from the announcement of a platform.

**How to choose the first fifteen:**

The first fifteen should include:
- Three to five people who are already known connectors in the community (they will naturally generate bridges)
- Three to five people with significant LatentCapacity that the community doesn't know about yet (their first match will be visibly surprising and validating)
- Three to five people with acute, articulable needs that are highly matchable (early successes are needed)
- Two or three people who are skeptical but respected — getting their buy-in early converts the most persuasive critics into the most credible advocates

The first fifteen should *not* be the most digitally fluent, the most platform-comfortable, or the most enthusiasm-ready. The temptation to start with people who will generate the most positive early noise leads to a sample that is unrepresentative of the community and produces deployment data that is misleadingly optimistic.

---

### 2.2 The Trust Priming Conversation

Before anyone joins the platform, hold a conversation — not a presentation, a conversation — about what the platform does with their data and why.

This sounds obvious and is consistently skipped. It is not obvious and should not be skipped.

The conversation needs to cover:
- What the PCE observes and stores (specific, not vague)
- What it never shares with other participants (specific, especially meaning state data per WD-010 §5.2)
- How the matching works at a conceptual level
- What the person can control: disclosure tiers, vulnerability shield, opt-out of specific feature categories
- What happens to their data if they leave

This conversation has two functions. The first is informed consent — people need to actually understand what they're agreeing to. The second is trust calibration — a person who has been clearly told what the protocol does and doesn't do with their information will trust it more, not less, when cooperative acts start producing valuable results. Surprise generates distrust even when the surprise is positive. Prior understanding generates reinforcement.

The conversation also generates important information for the deployment: objections and concerns raised by the first fifteen will predict the objections of the broader community. Document them. Address them in the wider rollout.

---

### 2.3 First Act Design

The first cooperative act in a community deployment should be designed, not waited for.

Designed means: identify a high-probability match based on pre-deployment community mapping, route it through the platform, and support it with human facilitation to ensure it succeeds. The purpose is not to demonstrate that the algorithm works — it is to give the community a concrete story. "Maria helped James figure out his drainage in 45 minutes. He would have paid $3,000." That story travels. The algorithm is invisible; the story is not.

**First act design criteria:**

High task complementarity: The match should be genuinely useful, not artificially constructed. A forced match that produces weak results generates the wrong story.

High legibility: The capacity being activated should be something the community will immediately recognize as valuable and perhaps surprising. "I didn't know she knew how to do that" is the ideal response.

High personal resonance: The person whose capacity is being activated should be someone who will clearly benefit from the meaning activation, not just the completion of the task. This is the synergy multiplier (WD-008) made visible: the match should be obviously good for both parties in ways that go beyond the immediate transaction.

Low stakes for failure: The first act should not involve anything that, if it goes wrong, will be a public failure story. Medium-complexity tasks with clear success criteria work better than ambitious collaborations that could take weeks and might fizzle.

**Document it.** Write a brief case study of the first cooperative act. This becomes the first piece of community evidence that the platform is real and useful. It will be cited in every conversation about whether to expand the deployment.

---

### 2.4 The 45-Day Metrics

At the end of the seeding phase, the following metrics tell you whether to proceed to cultivation or recalibrate:

| Metric | Minimum Threshold | Healthy Range |
|---|---|---|
| Active participants (had ≥1 cooperative act) | 9 of 15 (60%) | 12–15 (80%+) |
| Total cooperative acts | 12 | 20–35 |
| Acts with follow-on (second cooperation same pair) | 3 | 7+ |
| Participants who told someone else about it | 5 | 10+ |
| Meaning shift detected (any participant, any type) | 2 | 5+ |
| Cross-cluster connections formed | 2 | 5+ |
| Serious concerns raised (privacy, accuracy, fairness) | document all | address all |

If you are below minimum thresholds on more than two metrics: pause and diagnose before expanding. The most common causes: trust priming conversation was inadequate, first fifteen composition was wrong, first act design failed. All of these are recoverable.

If you are in healthy range on most metrics: proceed to cultivation. The seeding has worked.

---

## Part III: The Cultivation Phase (Days 45–120)

### 3.1 The Hardest Period

The cultivation phase is where most deployments fail. Not with a dramatic collapse — with a slow attenuation. Cooperative activity peaks around day 50–60 (new participants, novelty effect, facilitated first acts), then plateaus or declines as novelty fades and the protocol has to demonstrate sustained value rather than just initial interesting-ness.

The cultivation phase is hard because the protocol is transitioning from "a thing someone is helping you use" to "a thing that exists in the background and routes value to you when you need it." Most people don't check a platform regularly looking for cooperative opportunities. They engage when something is salient — when they have an acute need, when someone they trust tells them about a connection, when the platform surfaces something that feels genuinely relevant.

The cultivation phase is therefore primarily about building the habitual behaviors and social norms that make LVN engagement feel natural rather than effortful. This is a community organizing challenge more than a technical one.

---

### 3.2 Expansion from Fifteen to Fifty

At day 45, expand from fifteen to approximately fifty participants. The expansion should be sequential, not simultaneous.

Sequential means: each new cohort is brought in by existing participants, not recruited by the deployment team. "Maria, who would you most want to have in the network? Would you be willing to do the trust priming conversation with them?" This preserves the relational credibility established in the seeding phase. People who join because someone they trust invited them are more likely to engage and less likely to drop off than people who join because they saw an announcement.

The expansion should prioritize:
- People who were mentioned by seeding participants as potential connections ("you should talk to José — he knows everyone in the south side")
- People whose profiles suggest they have latent capacities not represented in the current network (capacity coverage gaps)
- People who are currently in active Regime D meaning spirals (WD-009), particularly if they have significant LatentCapacity (the Maria archetype)
- At least one person from each social cluster in the community who is not already represented

---

### 3.3 The Protocol Transparency Ritual

At day 60, do something that feels counterintuitive: show the community how the matching algorithm is working.

Not a technical explanation. A story. "Here is who matched with whom this month. Here is why the protocol routed them together. Here is what happened."

The purpose: cooperative infrastructure works when people trust it enough to act on its routing suggestions. That trust is built not just through positive experiences but through understanding. A match that feels mysterious generates less behavioral follow-through than a match where the person roughly understands why they were connected.

The transparency ritual also serves the equity governance function (WD-010). It surfaces the community-level power distribution in a way that is accessible rather than technical: "Here is who is participating most, who is benefiting most, who we haven't connected yet." Communities that can see their own cooperative topology make better governance decisions about it.

This ritual should happen monthly from day 60 forward. It is not a reporting exercise — it is a community sense-making practice.

---

### 3.4 The Dropout Recovery Protocol

Some people who joined in the seeding phase will have stopped engaging by day 60. This is expected. It is also important data.

For each dropout, the deployment coordinator should have a brief conversation: "You haven't had a cooperative act in the past few weeks. Is everything okay? Did the platform not work the way you expected?"

The answers cluster into a small number of categories:

**Category 1 — Timing mismatch:** "I was interested but I'm in a busy period right now." Response: note for follow-up in 30 days, lower engagement expectations, surface only high-relevance routing.

**Category 2 — Unmet expectation:** "I thought it would be more like X." This reveals a calibration failure in the trust priming conversation — the person's mental model of the platform didn't match the actual experience. Document and address in subsequent onboarding.

**Category 3 — Bad first experience:** "I connected with someone and it was awkward/didn't work/they never followed up." This is important and painful. These cases need individual attention — what happened, whether the protocol routing was appropriate, whether the facilitation was adequate. A single bad first experience is more persistent than multiple good ones.

**Category 4 — Privacy discomfort:** "I don't love the idea of an AI keeping track of what I say." This person may need an alternative onboarding approach — lower disclosure tier, different signal extraction methods, more human mediation rather than AI routing.

**Category 5 — It just didn't seem relevant:** "Nothing came up that felt worth pursuing." This is the signal that the person's signal vector is too sparse to generate good matches, or that the network doesn't yet have their complementary partners. Both are solvable; the protocol is working as designed, but the specific conditions for this person's value aren't yet present.

The dropout recovery protocol is not about preventing all attrition — some level of dropout is healthy and expected. It is about distinguishing recoverable departures from diagnostic information about deployment failures.

---

### 3.5 The First Governance Crisis

At some point during the cultivation phase — typically between day 60 and 90 — the first governance crisis will occur.

It won't usually be a WD-010 Level-3 escalation. It will be smaller: someone feels a match was unfair, or someone's LatentCapacity was activated in a way that felt exploitative, or someone is concerned that a specific connection is serving one party much more than the other. It may not even be formally reported — it may circulate as social friction, as whispered concern, as someone asking the connector "I don't know, that situation with María and the consulting thing feels weird to me."

How this crisis is handled determines everything about the community's long-term relationship with the governance structure.

**Handle it publicly** (with consent of those involved). The worst outcome is a governance incident that is handled privately while the community senses something is being managed. Even if the incident is minor and the resolution is clear, transparency signals that governance is real and responsive.

**Handle it proportionately.** A Level-1 issue does not need a Level-3 response. Over-escalation generates anxiety and chilling effects. Under-escalation signals that the governance doesn't take equity concerns seriously.

**Handle it without assigning blame before you understand.** The first governance response should be inquiry — what happened, from whose perspective, what was each party's experience — before judgment. Most early governance incidents are produced by calibration failures (unclear expectations, inadequate facilitation, inadequate prior understanding of the platform's matching logic) rather than by bad actors.

**Thank the person who raised the concern.** They are providing the most valuable early feedback the deployment will receive. Without their willingness to name the discomfort, it would have become silent attrition or community mistrust. The signal that concerns are welcome — genuinely, not just formally — is itself equity infrastructure.

---

## Part IV: Signs of Approaching Phase Transition

### 4.1 What You're Looking For

The phase transition (R₀ > 1) is not announced. It is recognized retrospectively — at some point, you notice that cooperative activity is self-sustaining rather than protocol-dependent. People are making connections the protocol didn't route, acting on trust relationships that formed through protocol-mediated meetings but now persist independently, and creating new cooperative acts without prompting.

The leading indicators of approaching phase transition, in order of reliability:

**Indicator T1 — Organic referrals exceed protocol-routed connections.** When more cooperative connections are initiated because "someone told me about you through the network" than because the relay suggested them, the network is beginning to self-propagate.

**Indicator T2 — Follow-on acts exceed first acts.** More than 50% of cooperative acts are continuations of existing relationships rather than new connections. The network is deepening, not just widening.

**Indicator T3 — Trust path length shortens.** The average number of relationship hops between any two community members through trust chains decreases measurably. This is the small-world network signature.

**Indicator T4 — Unprompted governance participation.** Community members raise equity concerns, suggest protocol improvements, and engage in governance without being specifically invited. They have internalized the cooperative infrastructure as theirs to steward.

**Indicator T5 — The protocol becomes invisible.** People describe cooperative connections without mentioning the platform. "María helped me figure out my drainage problem" — not "the app matched me with María." When the platform disappears from the story, it has become infrastructure rather than feature.

**Indicator T6 — Meaning state improvements precede task completions.** When meaning state metrics (inferred by PCE) are improving faster than task completion metrics, the network has begun activating the flourishing layer functions, not just task matching. This is the signal that the cooperative acts are generating synergy multipliers above 1.0.

---

### 4.2 False Positives — What Looks Like a Phase Transition But Isn't

Several conditions produce the superficial metrics of a phase transition without the underlying dynamics:

**The Enthusiasm Plateau:** A strong founding group generates high cooperative activity, all metrics look healthy, and then activity gradually declines as the founding cohort's novelty wanes. The network never became self-sustaining — it was sustained by the specific energy of specific people. Distinguishing the enthusiasm plateau from true phase transition: does activity continue when the founding group is less active? Is new cooperative behavior initiated by participants who joined after the founding period?

**The Small Cluster Trap:** A high-density cluster forms (a tight group of people who cooperate frequently and enthusiastically), metrics look supercritical, but the cluster is isolated from the broader community. The cluster has crossed its own phase transition but the community as a whole has not. Distinguishing feature: crossClassIndex and inter-cluster connection rates remain low even as intra-cluster metrics are high.

**The Transactional Loop:** A small number of participants engage in high-frequency, low-meaning cooperative exchanges that inflate activity metrics without generating emergent value or trust depth. Two people swapping tasks every week but never having a conversation that matters. Distinguishing feature: synergyMultiplier average remains near 1.0; follow-on relationships don't form; meaning state metrics are flat.

---

### 4.3 What Changes After the Transition

A community that has crossed the phase transition has a qualitatively different relationship with its cooperative infrastructure:

**The protocol's role shifts from initiation to amplification.** The relay no longer needs to work hard to create cooperative activity — it needs to work smart to ensure the cooperative activity that's already happening is generating maximum temporal and meaning value.

**Governance becomes community-owned.** The equity monitoring, the governance participation, the concern-raising — these are no longer things a deployment coordinator facilitates. They are things the community does. The coordinator's role shifts from facilitator to auditor and documentarian.

**Failure modes shift.** Pre-transition, the dominant failure modes are the five-layer cascade (WD-007): not knowing what others have to offer, not having bridges across homophily clusters, markets not forming. Post-transition, the dominant failure modes shift to the WD-010 concerns: power asymmetry deepening as high-network-position participants accumulate cooperative advantage, governance capture becoming possible as the stakes of governance rise.

**The network develops its own culture.** Norms form — about what cooperative offers look like, about what adequate reciprocity means, about how to raise concerns. These norms are the most powerful governance mechanism in the network, more powerful than any formal rule. They are also the hardest to change if they calcify in ways that harm equity.

---

## Part V: The 10 Most Common Failure Modes

These failure modes are listed in approximate order of frequency, based on cooperative network deployments in related domains (mutual aid, time banking, platform cooperatives). They are not ranked by severity.

---

**Failure Mode 1 — The Connector Dependency**

What happens: One or two high-energy community connectors drive most of the cooperative activity. The network appears healthy. When those individuals burn out, go on vacation, or leave, activity collapses.

Why it happens: The protocol's matching replaces the connector's social labor, but only if people are using the protocol. If the connector is routing connections manually and the protocol is nominally present but not actually generating matches, the connector is doing the protocol's job. When they stop, the protocol can't step in because it hasn't been used enough to build signal quality for the network.

Early warning: If you remove the top two connectors from your activity log, does the remaining activity still show a healthy distribution? If not, you have connector dependency.

Recovery: Deliberately reduce the connectors' visible facilitation role (with their understanding). Surface protocol-generated matches and attribute them to the protocol, not to the connector. Help the connector articulate their matching intuition in ways the protocol can learn from.

---

**Failure Mode 2 — The Privacy Chilling Effect**

What happens: Initial participation is high, then gradually declines as more people understand that the PCE is analyzing their conversations and building meaning state inferences. The decline is particularly pronounced among lower-income and marginalized community members, who have historical reasons to distrust data collection.

Why it happens: The trust priming conversation was inadequate, or the community's prior experience with surveillance or data extraction makes even well-intentioned data collection feel unsafe, or specific incidents (a data breach, a misinterpreted inference) generate disproportionate community anxiety.

Early warning: Dropout rates higher than average for participants who are newer to the community or who have lower expressed trust in institutions. Qualitative feedback that includes privacy language ("I don't know who can see what" is the clearest signal).

Recovery: More aggressive transparency about the specific data being held and who can see it. Human-mediated matching options that bypass the PCE. Community governance of data retention policies. Possibly: public deletion of data for participants who request it, with documentation.

---

**Failure Mode 3 — The Reciprocity Imbalance**

What happens: High-capacity participants engage enthusiastically but primarily as givers. Lower-capacity participants (by self-assessment — not necessarily by reality) engage primarily as receivers. The network develops an unequal reciprocity norm. Givers eventually feel unappreciated or used; receivers feel dependent and awkward. Both disengage.

Why it happens: The CurseOfKnowledge effect (WD-007) means many lower-network-position participants genuinely don't know what they have to offer. Without active LatentCapacity surfacing, they present themselves as need-only and receive that role from the network.

Early warning: Average powerBalance scores for new participants are more negative than for established participants, and the gap is widening rather than narrowing as they become more established.

Recovery: Capacity mapping workshops where participants are explicitly helped to articulate what they know and can do. First match design that prioritizes activating the latent capacity of the receiver — making sure their first cooperative act as a giver happens in the seeding phase, not months later. Reframe the platform's purpose explicitly: "This is about activating what you have, not just finding what you need."

---

**Failure Mode 4 — The Meaning Layer Bypass**

What happens: The network becomes highly effective at task matching and completely ineffective at meaning activation. People connect, complete tasks, and feel nothing significant has changed. Engagement is transactional. Retention is poor. The network functions as a low-friction favor exchange that doesn't generate the compounding temporal value or meaning restoration that the architecture promises.

Why it happens: Meaning-first and balanced matching modes (WD-008 §3.3) were not configured or were miscalibrated. Facilitators focused on task completion metrics without meaning metrics. First act design prioritized obvious task complementarity without synergy multiplier optimization.

Early warning: Task completion rates are high but follow-on rates are low (people connect, complete the task, never talk again). Meaning state metrics are flat across the community despite active cooperative activity. The "who told someone else about it" metric stays low even when task satisfaction is high.

Recovery: Reconfigure matching weights toward balanced or meaning-first mode for participants showing flat meaning state profiles. Introduce reflection practices — brief prompts after cooperative acts asking participants what was meaningful about the interaction. Redesign the first act to prioritize high-synergy connections even at modest task score cost.

---

**Failure Mode 5 — The Platform Substitution**

What happens: The LVN protocol begins to substitute for direct human relationship rather than facilitating it. People interact through the platform interface rather than with each other. Trust is placed in the algorithm's matching judgment rather than in personal relationship development. Cooperative activity is high; cooperative depth is low.

Why it happens: Platform design defaults pull toward mediated interaction. The PCE's signal vectors are convenient; human relationship development is effortful. Participants take the path of least resistance.

Early warning: The protocol becomes visible in the stories participants tell — they describe their connections in terms of what the app did rather than what happened between two people. Relationship persistence scores are low despite high act frequency.

Recovery: Explicitly design cooperative acts that require extended in-person or video interaction. Create protocol-free community spaces (physical or virtual) where relationships formed through the platform can deepen without it. Set a protocol availability norm: "The relay helps you find each other. After that, it gets out of the way."

---

**Failure Mode 6 — The Governance Theater Problem**

What happens: Governance mechanisms are nominally operational but functionally inert. The equity monitor shows data. The equity ombudsperson exists. Governance meetings happen. Nothing changes. Participants eventually learn that governance produces documents, not outcomes, and stop engaging with it.

Why it happens: Governance was designed for legitimacy rather than effectiveness. The decision rights are unclear (who can actually change what?). The governance bodies have no real authority over protocol configuration. The metrics are tracked but not acted upon.

Early warning: Governance body recommendations that have no documented follow-up. Equity metrics that are consistently in the yellow zone but never trigger changes to protocol configuration. Ombudsperson reviews that are acknowledged but not resolved.

Recovery: Establish explicit decision rights: what specific things can the governance body actually change? Create documented feedback loops between equity metrics and protocol configuration. Hold the deployment coordinator accountable to specific metric improvement targets.

---

**Failure Mode 7 — The Scaling Cliff**

What happens: The network operates well at 50 participants, remains healthy at 150, and then encounters a qualitative breakdown around 300-500 participants. Community norms that were self-maintaining in a smaller, more familiar group can no longer be enforced through social pressure. Governance processes designed for small groups are overwhelmed. Power differentials that were invisible at small scale become visible and unaddressed.

Why it happens: Social norming works differently at different scales. Below Dunbar's number (~150), norm enforcement is personal and direct. Above it, norms must be institutionalized to survive. The governance design that was adequate for 50 people is categorically inadequate for 300.

Early warning: Increasing frequency of unresolved disputes that "used to resolve themselves." Governance body unable to process its review queue within 48-hour response targets. Equity metrics drifting without corresponding governance response. New participants reporting that the community "doesn't feel cohesive anymore."

Recovery: Design the governance architecture for the target scale, not the launch scale. This is a structural change — not incremental adjustment. Plan for it before deployment rather than reactively.

---

**Failure Mode 8 — The Adjacent Predator**

What happens: A well-resourced external actor (a corporation, a competing platform, a consultant with extractive intent) identifies the cooperative network as a talent or intelligence source and begins to mine it — approaching network participants with employment or partnership offers that extract the cooperative value the network has created without contributing to it.

Why it happens: The LVN, if successful, concentrates visible information about people's capacities and cooperative tendencies in a way that is attractive to extractive actors. The network's success creates the conditions for its exploitation from outside.

Early warning: Multiple participants receiving unsolicited external approaches within a short period. The approaches are suspiciously well-calibrated to the individual's specific capacities — as if the approacher had access to the network's data.

Recovery: Data protection review. Community notification. Governance protocols for external engagement by participants that protects network relationships from extraction. This is a WD-010 failure mode that extends outside the network boundary.

---

**Failure Mode 9 — The Measurement Trap**

What happens: The deployment team begins optimizing for the metrics that are easiest to measure rather than the outcomes that matter. Task completion rate goes up; meaning state metrics are deprioritized because they're harder to track. Cooperative acts per participant goes up; act quality (synergy multiplier, follow-on rate, emergence yield) is ignored. The metrics look good. The community isn't flourishing.

Why it happens: Measurement pressure and organizational accountability structures reward visible progress. Meaning state improvement, narrative identity reconstruction, community phase transition — these are real outcomes that are genuinely hard to measure. The protocol's technical capabilities make task matching metrics easy to track and tempting to optimize.

Early warning: A disconnect between reported metrics and the stories community members tell about their experiences. High satisfaction scores on automated surveys combined with low organic enthusiasm in conversations. Governance body discussions dominated by task completion data and not meaning outcomes.

Recovery: Insist on meaning metrics in governance reporting, even if the estimates are rough. Design qualitative data collection — conversations, not surveys — as a formal protocol component. Hold the platform accountable to "is this community flourishing?" not "are these metrics trending upward?"

---

**Failure Mode 10 — The Founder's Shadow**

What happens: The founding team's values, assumptions, and relationships become embedded in the protocol's configuration in ways that limit the community's ability to make the infrastructure genuinely its own. The governance bodies feel like they're managing something that was handed to them rather than something they built. The equity thresholds reflect the founders' risk tolerance. The matching weights reflect the founders' sense of what matters.

Why it happens: Every protocol configuration choice encodes values. The founders' values are not neutral. Without explicit attention to this, the community inherits a governance structure optimized for someone else's understanding of what cooperative equity looks like.

Early warning: Governance meetings where community members frequently say "but we can't change that" or "that was decided before we got here." Low participation in governance by newer or lower-network-position participants who don't feel ownership. Founders who are hesitant to cede protocol configuration authority.

Recovery: Explicit 18-month governance review designed from the beginning. Documentation of every founding configuration choice and the alternative that was considered. Formal transfer of protocol configuration authority to the community governance structure. The founders' hardest governance act is letting go of the thing they built.

---

## Part VI: The Deployment Coordinator's Practice

### 6.1 What the Job Actually Is

The deployment coordinator's job description: to make themselves unnecessary.

More specifically: to build the community's capacity to sustain and govern its own cooperative infrastructure without dependence on the coordinator's time, expertise, or facilitation. This means the coordinator's attention should be constantly moving from doing to enabling — from facilitating individual matches to training community connectors to facilitate matches, from running governance meetings to building the community's governance capacity, from diagnosing protocol failures to documenting diagnostic frameworks the community can use independently.

A coordinator who is still necessary at month 12 has partially failed. A coordinator whose community doesn't miss them when they leave has fully succeeded.

---

### 6.2 The Weekly Practice

**Every week:**
- Review the 10 most recent cooperative acts. What emerged that wasn't there before? What needed better facilitation?
- Check the temporal priority queue. Who has entities approaching decay horizon or in active meaning spirals? What matches are available for them?
- Check power balance flags. Are any relationships trending toward governance thresholds?
- Have one informal conversation with a participant who is not in your usual contact orbit.

**Every month:**
- Run the community transparency ritual (§3.3)
- Review equity metrics against the WD-010 thresholds
- Review dropout data and run recovery conversations
- Document one failure mode observation and one success story

**Every quarter:**
- Assess readiness for scale expansion
- Review governance body composition against representation requirements
- Update the community's failure mode prevalence assessment
- Publish a community equity report (aggregate, not individual)

---

### 6.3 The Questions That Matter

At every stage of deployment, the following questions are the most useful diagnostics:

**"If the protocol disappeared tomorrow, what would be lost?"** If the answer is "nothing" — the community's cooperative activity is entirely protocol-dependent. If the answer is "the connections we've made" — the protocol has created relational value that would persist. If the answer is "the ability to find people we didn't know to look for" — the protocol is doing its core job.

**"Who is the community cooperating with least?"** Not who is participating least — who is cooperating with the rest of the community least. These are the people whose CurseOfKnowledge is still operative, whose signal vector is too sparse, whose needs haven't been surfaced. They are the highest-priority protocol improvement targets.

**"What is the community learning about itself?"** The cooperative act of mapping what a community knows and needs is itself valuable, independent of any matching that results. A community that can see its own cooperative topology — the latent capacities, the invisible connections, the unmet needs — has gained something important regardless of what the relay does with that information.

**"Are we building power or concentrating it?"** This is the equity question at its sharpest. Cooperative infrastructure can build distributed power — giving more people more leverage, more connection, more capacity to act. Or it can concentrate power — making the already-connected more connected and leaving the isolated more isolated. The answer to this question is in the equity metrics, but it's also in the qualitative texture of community life. Trust your ears as well as your dashboard.

---

## Appendix A: Deployment Timeline at a Glance

```
WEEK 0-2:   Community readiness assessment
            Identify and approach first fifteen
            Trust priming conversations (individual)
            
WEEK 2-4:   Platform configuration (PCE, matching weights, disclosure tiers)
            Equity governance configuration (EquityOmbudsperson, thresholds)
            First act design and facilitation
            
WEEK 4-6:   Seeding phase active
            Weekly check-ins with all fifteen
            Document early concerns and surprises
            
WEEK 6:     45-day metrics review → proceed or recalibrate?
            
WEEK 6-8:   Expansion planning (fifteen → fifty, sequential invitations)
            
WEEK 8-12:  Cultivation phase active
            Protocol transparency ritual (month 1)
            Dropout recovery conversations
            First governance crisis (expect it, prepare for it)
            
WEEK 12-16: 90-day comprehensive review
            Phase transition leading indicator assessment
            Governance capacity building with community members
            
WEEK 16+:   Scale assessment
            Governance transfer planning
            External equity audit scheduling (at 12 months)
            
MONTH 12:   Governance transfer complete (community owns the protocol)
            18-month governance review design finalized
            Coordinator transition or role shift
            
MONTH 18:   Mandatory governance review (founding configuration reassessment)
```

---

## Appendix B: The Honest Probability Estimate

Based on comparable cooperative infrastructure deployments (mutual aid networks, platform cooperatives, community time banks, collaborative housing):

- Communities that complete a proper readiness assessment: ~40% of those who initiate deployment
- Communities that reach the cultivation phase with healthy seeding metrics: ~60% of those who begin seeding
- Communities that cross the phase transition: ~25% of those who complete cultivation
- Communities that maintain post-transition cooperative density at 12 months: ~60% of those who cross it
- Communities that successfully transfer governance ownership by month 18: ~35% of those at 12 months

**Overall: approximately 3-5% of communities that inquire about the LVN will reach stable, community-owned cooperative infrastructure at 18 months.**

This number is not a reason for despair. It is a reason for honesty. Cooperative infrastructure is hard to build, for reasons that have nothing to do with protocol quality and everything to do with the genuine difficulty of sustained, equitable, community-governed cooperation. The protocol can reduce the friction. It cannot replace the human work.

The communities that succeed are distinguished not primarily by the quality of their technical deployment — though that matters — but by three human factors: a founding group with realistic expectations and genuine patience, active attention to equity throughout (not just at the crisis points), and willingness to let the governance structure grow into something the founders didn't design.

---

*This document is a working draft. Everything is wrong in some way. Find the flaws.*  
*Released under CC BY-SA 4.0 — fork, critique, extend.*

---

**Next:** WD-012 — The Labor Market Interface: Complementarity, Substitution, and the Feedback Loop  
**Next:** WD-013 — Protocol Federation: How LVN Communities Connect Without Merging
