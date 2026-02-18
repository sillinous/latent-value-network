# Taxonomy Governance

**How the LVN Cooperative Taxonomy Evolves**

---

## Principles

1. **Inclusive by default.** If a skill or need exists in a community, it belongs in the taxonomy.
2. **No value judgments.** The taxonomy describes capabilities and needs, not their worth.
3. **Complementarity-first.** Every subcategory must have at least one complementarity mapping. Skills without need connections are incomplete.
4. **Community-driven.** Taxonomy changes are proposed and reviewed by the people who use them.
5. **Versioned.** Breaking changes increment the major version. Additions increment the minor version.

## Change Process

### Adding a Subcategory
1. Open a GitHub Discussion with the proposed addition
2. Include: domain, category, subcategory name, and at least 1 complementarity mapping
3. Comment period: 7 days
4. Accepted if no strong objections and Theory & Foundations confirms it doesn't duplicate existing entries

### Adding a Category
1. Open a GitHub Issue using the Technical Proposal template
2. Include: domain, category name, at least 3 subcategories, complementarity mappings for each
3. Comment period: 14 days
4. Requires approval from Theory & Foundations and Community & Practice

### Removing or Renaming
1. Deprecation notice in taxonomy file (6 month sunset)
2. Renamed entries maintain backward-compatible aliases
3. Removal only after no active deployments reference the entry

### Complementarity Mappings
1. Anyone can propose new mappings via PR
2. Each mapping must include a weight (0.1-1.0) with brief justification
3. Mappings are reviewed by Theory & Foundations for consistency

## Versioning

- **Major version** (1.0 → 2.0): Breaking changes — removed categories, restructured domains
- **Minor version** (0.1 → 0.2): New categories, subcategories, or mappings
- **Patch version** (0.1.0 → 0.1.1): Weight adjustments, description corrections

All deployed systems should handle unknown taxonomy entries gracefully (ignore, don't crash).

## Anti-Bias Review

The Ethics & Equity working group reviews the taxonomy quarterly for:
- Cultural bias (are Western professional categories overrepresented?)
- Class bias (are skills requiring formal education privileged?)
- Missing domains (are informal economy skills represented?)
- Mapping fairness (do all communities have equal complementarity potential?)

---

*The Latent Value Network · CC BY-SA 4.0*
