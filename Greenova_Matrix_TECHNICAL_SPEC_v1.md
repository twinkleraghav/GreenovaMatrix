# Greenova Matrix — Technical Specification v1

**Status:** Draft for implementation planning  
**Scope:** MVP / Prototype  
**Purpose:** Translate the approved PRD, UX Specification, Design System, and Motion System into an implementation-ready technical architecture.

> This document preserves the source requirements. Where the existing product documents do not specify an implementation detail, it is marked **TBD / implementation decision** rather than presented as an established fact.

---

# 1. Technical Product Definition

Greenova Matrix is a web/mobile Progressive Web App that converts:

```text
Food properties
      ↓
Packaging requirements
      ↓
Deterministic safety / compatibility gate
      ↓
Ranking / optimization
      ↓
Shelf-life estimation
      ↓
Compliance retrieval
      ↓
Structured recommendation
      ↓
AI explanation
      ↓
UI / Packaging Passport / QR
      ↓
End-of-life guidance
```

The system is a **decision-support product**, not an unrestricted chatbot.

The central architectural rule is:

```text
Safety = Gate
Ranking = Optimization
LLM = Explanation
```

The LLM must never become the source of truth for safety, eligibility, scoring, or regulatory status.

---

# 2. MVP Scope

The MVP must support:

1. Food/product profile
2. Storage and distribution conditions
3. Packaging requirement derivation
4. Deterministic safety/compatibility filtering
5. Ranking of eligible packaging materials
6. Top-3 recommendations
7. Cost, shelf life, carbon/sustainability, protection and availability trade-offs
8. Explainable recommendation
9. What-If analysis
10. India-first compliance workflow where validated data exists
11. Packaging Passport
12. QR representation
13. Responsible end-of-life / food-waste guidance
14. Evidence-status labels
15. Decision-support disclaimer

Future capabilities remain outside MVP unless explicitly promoted:
- photo-to-pack assistance
- multilingual / voice interaction
- supplier discovery
- export-mode compliance
- EPR audit tracking
- crowd-sourced shelf-life feedback
- smart-packaging add-ons

---

# 3. Architecture Principles

## 3.1 Deterministic core

The recommendation engine must be reproducible from:

- input profile
- normalized features
- requirement rules
- material dataset version
- rule-set version
- ranking weights
- model versions where applicable

The same versioned inputs should produce the same deterministic recommendation result.

## 3.2 Safety before ranking

```text
ALL MATERIALS
      ↓
SAFETY / COMPATIBILITY FILTER
      ↓
ELIGIBLE MATERIALS
      ↓
RANKING
      ↓
TOP 3
```

An ineligible material must never enter the ranking stage.

## 3.3 AI is downstream of structured results

AI may:
- explain a recommendation
- summarize trade-offs
- answer compliance questions using retrieved sources

AI may not:
- declare a material safe
- override a failed compatibility rule
- invent a score
- invent a regulatory status
- replace retrieved regulatory evidence
- turn an estimate into a validated measurement

## 3.4 Version everything that affects decisions

At minimum:
- material dataset version
- safety rule-set version
- ranking configuration version
- shelf-life model version
- compliance knowledge-base version
- explanation prompt/version where relevant

---

# 4. Proposed System Architecture

The implementation may be organized into the following logical layers:

```text
┌─────────────────────────────────────┐
│              PWA / UI               │
│ Forms • Results • What-If • Passport│
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│          Application/API Layer      │
│ Validation • Orchestration • Auth   │
└──────────────────┬──────────────────┘
                   │
          ┌────────┼─────────┐
          ▼        ▼         ▼
     Requirement  Safety   Ranking
       Engine      Gate     Engine
          │         │         │
          └─────────┼─────────┘
                    ▼
             Shelf-Life Model
                    │
                    ▼
           Compliance Retrieval
                    │
                    ▼
          Structured Result Object
             │              │
             ▼              ▼
       LLM Explanation   Passport/QR
```

### Implementation stack

The source documents do not prescribe a final framework or hosting provider.

**TBD / recommended decision for implementation planning:**
- Frontend: modern React-based PWA
- Backend/API: TypeScript-based service
- Database: relational database
- Validation: schema-based validation
- Authentication: managed authentication provider or application auth layer
- Object storage: for optional food images and generated assets
- LLM: provider selected during implementation
- Vector/retrieval layer: only if needed for compliance RAG
- QR generation: deterministic QR library
- Deployment: managed web + API infrastructure

The exact vendor choices should be locked only after the implementation environment is inspected.

---

# 5. Core Domain Model

## 5.1 Food Product Profile

A profile should contain the structured inputs required by the UX.

```text
FoodProfile
- id
- category
- name / product label
- moisture
- waterActivity
- fatContent
- pH
- oxygenSensitivity
- lightSensitivity
- heatSensitivity
- targetShelfLife
- storageTemperature
- humidity
- distributionRoute
- transportDuration
- budget
- priorities
- optionalImage
- createdAt
- updatedAt
```

The product documents specify these fields conceptually; exact data types, units, ranges, and validation rules are an implementation task.

---

# 6. Feature Normalization

Raw user inputs must be converted into normalized internal features before rule evaluation.

Examples:

```text
Temperature
°C → normalized operating range

Shelf life
days/months → canonical duration

Budget
user-entered amount → normalized cost constraint

Priority
user slider → normalized ranking weight
```

Normalization must:
- validate units
- reject impossible values
- preserve original user values for display
- produce canonical internal values for calculations

Do not allow arbitrary strings to enter the decision engine where a structured value is required.

---

# 7. Food-to-Packaging Requirement Engine

The requirement engine converts food characteristics into structured packaging requirements.

Example:

```text
High oxygen sensitivity
+
High fat content
+
Long target shelf life
        ↓
High oxygen-barrier requirement
+
Oxidation protection requirement
+
Long-term barrier performance
```

Potential requirement dimensions:

- moisture barrier
- oxygen barrier
- light protection
- heat tolerance
- physical protection
- food-contact suitability
- shelf-life suitability

The engine should return structured requirements rather than prose.

Example:

```json
{
  "oxygenBarrier": "high",
  "moistureBarrier": "high",
  "lightProtection": "medium",
  "heatTolerance": "medium",
  "physicalProtection": "medium",
  "foodContactSuitability": "required",
  "shelfLifeSuitability": "high"
}
```

Exact thresholds are **TBD** and must be validated before production use.

---

# 8. Material Dataset

The MVP source blueprint proposes approximately 12–15 materials.

Candidate MVP materials include:

- LDPE
- HDPE
- PET
- PP
- BOPP laminate
- Metallised film
- Aluminium laminate
- Kraft paper with coating
- Glass
- Tin
- Bagasse
- PLA
- Areca leaf
- Cellulose film

Each material record should contain, where validated:

```text
Material
- id
- name
- category
- barrier properties
- heat tolerance
- food-contact suitability
- recyclability
- compostability
- approximate cost
- carbon factor
- availability
- supplier information if applicable
- protection characteristics
- relevant restrictions
- evidence status
- dataset version
```

### Critical rule

A material is not eligible merely because it has strong sustainability attributes.

It must first satisfy food-specific safety and packaging requirements.

---

# 9. Safety / Compatibility Gate

The safety gate is deterministic.

Potential checks include:

- food-contact suitability
- food/material compatibility
- temperature limitations
- relevant restrictions
- regulatory conditions
- known material exclusions

Output should distinguish:

```text
eligible
ineligible
insufficient-data
```

An `insufficient-data` state must not silently become `eligible`.

Example:

```json
{
  "materialId": "pet",
  "eligible": true,
  "checks": [
    {
      "rule": "food_contact",
      "status": "pass"
    },
    {
      "rule": "temperature",
      "status": "pass"
    }
  ],
  "ruleSetVersion": "..."
}
```

For an ineligible material, preserve the reason codes.

Example:

```text
temperature_limit_exceeded
food_contact_requirement_not_met
material_restriction
insufficient_evidence
```

The UI can translate these structured reasons into user-friendly language.

---

# 10. Ranking / Optimization Engine

Only eligible materials enter ranking.

The PRD proposes weighted scoring or TOPSIS.

Conceptual scoring:

```text
Score(material) =
    w1 × Protection
  + w2 × Safety/Compliance
  + w3 × Sustainability
  + w4 × Cost
  + w5 × Availability
```

The broader ranking dimensions include:

- protection
- safety/compliance
- sustainability
- cost
- availability
- shelf-life suitability
- carbon impact

### Important architecture rule

Safety/compliance is fundamentally a gate.

It should not be treated as a normal trade-off where an unsafe material can compensate with low cost or high sustainability.

### Ranking output

The engine should return:

```text
rank
material
overallScore
dimensionScores
strengths
limitations
estimatedShelfLife
costEstimate
carbon/sustainability information
availability
compliance status
```

### User priorities

The UI priority controls should map to ranking weights.

Weights must be:
- normalized
- versioned
- persisted in the recommendation record
- visible in the audit record

Exact default weights are **TBD**.

---

# 11. Shelf-Life Estimation

The PRD describes a possible regression/gradient-boosting model supported by barrier properties and temperature-related models.

Potential inputs:

- WVTR
- OTR
- water activity
- storage temperature
- target shelf life
- food properties
- packaging barrier characteristics

The source also mentions Q10 / Arrhenius temperature models as possible supporting methods.

### Evidence status

Every shelf-life result must expose one of the supported evidence categories:

- Validated / measured
- Published-case validated
- Model estimate
- Physics-based simulation

The system must never present a model estimate or simulation as laboratory measurement.

Example:

```json
{
  "value": 42,
  "unit": "days",
  "evidenceStatus": "model_estimate",
  "modelVersion": "..."
}
```

If evidence is insufficient, return an uncertainty/insufficient-data state rather than fabricating precision.

---

# 12. Recommendation Result Contract

All downstream systems should consume a structured result.

Conceptual shape:

```json
{
  "requestId": "...",
  "profileId": "...",
  "datasetVersion": "...",
  "ruleSetVersion": "...",
  "rankingVersion": "...",
  "modelVersions": {},
  "safety": {
    "eligibleCount": 0,
    "rejectedCount": 0
  },
  "requirements": {},
  "recommendations": [
    {
      "rank": 1,
      "materialId": "...",
      "score": 0,
      "dimensionScores": {},
      "shelfLife": {},
      "cost": {},
      "carbon": {},
      "availability": {},
      "compliance": {},
      "strengths": [],
      "limitations": []
    }
  ]
}
```

This object is the source used by:
- Results UI
- What-If
- Explanation service
- Compliance display
- Packaging Passport
- QR payload/reference

---

# 13. Explainability Layer

The explanation service receives structured recommendation data.

It should not independently calculate the result.

Input:

```text
Food profile
+
Packaging requirements
+
Safety result
+
Ranking result
+
Evidence status
+
Compliance sources
```

Output:

```text
Why this packaging?
Key strengths
Key limitations
Trade-offs
Evidence labels
```

### LLM constraints

The explanation prompt must explicitly instruct the model to:
- use only supplied structured facts
- preserve evidence status
- never invent values
- never override safety
- never invent regulatory claims
- distinguish estimates from measurements
- acknowledge missing data

The UI should identify AI-generated explanatory content appropriately.

---

# 14. What-If Engine

What-If is a recalculation, not a visual-only simulation.

Supported conceptual controls:

- temperature
- humidity
- target shelf life
- budget
- priorities

Flow:

```text
Original Profile
      ↓
User changes variable
      ↓
Validate changed profile
      ↓
Normalize features
      ↓
Re-derive requirements
      ↓
Re-run safety gate
      ↓
Re-run ranking
      ↓
Recalculate shelf-life estimates
      ↓
Return new structured result
      ↓
Animate changed UI
```

### Critical rule

What-If must not merely alter the displayed score.

It must actually recalculate:
- eligibility
- requirements
- shelf life
- scores
- ranking
- relevant compliance state where conditions affect it

The UX motion system then visualizes the difference.

---

# 15. Compliance Architecture

The MVP is India-first where validated data exists.

Potential areas:
- FSSAI
- EPR
- single-use plastic checks
- export-related requirements in future

The compliance assistant may use retrieval-augmented generation.

### Required architecture

```text
User question / compliance context
            ↓
Retrieve approved source
            ↓
Relevant rule / clause
            ↓
Structured compliance result
            ↓
Optional LLM explanation
```

The LLM must not replace the underlying rule.

### Compliance result should include

```text
status
requirement
source
clause/reference where available
retrieval timestamp/version
evidence status
```

The system should maintain an audit trail of regulatory information used.

Do not present unvalidated regulatory content as authoritative.

---

# 16. Packaging Passport

After a packaging selection, generate a digital Packaging Passport.

Required fields from the PRD:

- food/product
- packaging material
- recommended conditions
- estimated shelf life
- recyclability
- compostability
- carbon information
- compliance information
- disposal instructions
- relevant packaging specifications

The passport should be generated from the structured recommendation result, not from free-form LLM output.

---

# 17. QR Architecture

Flow:

```text
Recommendation
      ↓
Packaging Passport
      ↓
QR generation
      ↓
QR scan
      ↓
Packaging information
```

### Recommended MVP behavior

The QR should preferably contain a stable passport identifier or URL rather than duplicating the entire passport payload.

Example conceptual payload:

```text
https://greenova.example/passport/{passportId}
```

The exact domain and hosting strategy are **TBD**.

QR generation should be deterministic from the passport reference.

---

# 18. End-of-Life Guidance

The MVP includes responsible food-waste guidance.

Examples in the PRD include:
- suitable vegetable peels → composting
- banana peels → cut smaller before composting
- eggshells → clean, dry, crush
- tea/coffee grounds → compost in appropriate amounts
- potato peels → compost when properly handled

The UI should provide step-by-step guidance rather than only saying “compost it.”

The experience must distinguish food that is still suitable for consumption from food that is no longer intended for consumption.

---

# 19. Frontend Architecture

The frontend should be organized around reusable domain components rather than page-specific duplicated UI.

Suggested structure:

```text
app/
  home/
  product-profile/
  analysis/
  results/
  what-if/
  compliance/
  passport/
  end-of-life/

components/
  ui/
  forms/
  recommendation/
  safety/
  compliance/
  passport/
  motion/

domain/
  profile/
  requirements/
  safety/
  ranking/
  shelf-life/
  compliance/
  passport/
```

The exact framework/router/state-management choices remain implementation decisions.

### UX requirements to preserve

- mobile-first
- progressive disclosure
- preserve inputs when navigating back
- safety before ranking
- visible evidence status
- clear loading/error/empty states
- responsive without becoming a dense dashboard

---

# 20. State Management

The client should maintain a clear separation between:

### User-editable state

```text
Food profile
Storage conditions
Distribution
Budget
Priorities
```

### Derived state

```text
Requirements
Eligibility
Scores
Ranking
Shelf-life
Compliance
```

### Presentation state

```text
Expanded card
Selected material
Active tab
Loading state
Animation state
```

Derived state should be reproducible from the canonical profile + versioned engine outputs.

Do not store presentation state as business truth.

---

# 21. API Boundaries

Suggested logical API operations:

```text
POST   /profiles
GET    /profiles/:id

POST   /recommendations
POST   /recommendations/:id/what-if

GET    /materials
GET    /materials/:id

POST   /compliance/check
POST   /compliance/ask

POST   /explanations

POST   /passports
GET    /passports/:id

GET    /passports/:id/qr

GET    /end-of-life/guidance
```

These are **conceptual interfaces**, not final production endpoints.

API contracts should use explicit schemas and versioning.

---

# 22. Data Versioning

A recommendation record should preserve enough information to reproduce the decision.

Minimum audit fields:

- timestamp
- model version
- rule-set version
- material dataset version
- input profile
- filtered materials
- eligible materials
- ranking weights
- Top-3 result
- evidence status

This follows the PRD's observability/audit requirement.

---

# 23. Observability

Recommended events:

```text
profile.created
recommendation.requested
material.filtered
recommendation.generated
whatif.executed
compliance.checked
explanation.generated
passport.created
qr.generated
waste_guidance.viewed
```

Events should avoid storing unnecessary sensitive user data.

Recommendation audit records should be separate from lightweight product analytics where practical.

---

# 24. Error Handling

The system should distinguish:

### Validation error

Example:
- invalid pH
- missing required profile field
- invalid temperature

### Insufficient-data state

Example:
- material has no validated compatibility evidence

### Safety rejection

Example:
- temperature limit exceeded

### Engine failure

Example:
- ranking service unavailable

### Compliance unavailable

Example:
- source retrieval unavailable

### AI explanation unavailable

The core recommendation should remain usable when explanation generation fails.

The UI should never imply that an AI explanation failure invalidates the deterministic recommendation.

---

# 25. Security / Trust Boundaries

The architecture should treat the following as protected decision inputs:

- material dataset
- safety rules
- ranking configuration
- compliance knowledge
- model versions

Users should not be able to alter these through ordinary UI input.

Administrative/data-maintenance interfaces, if introduced, require separate authorization.

The exact authentication/authorization implementation is **TBD**.

---

# 26. Data Quality and Evidence

Every important scientific output should carry evidence metadata.

For shelf life, explicitly distinguish:
- validated/measured
- published-case validation
- model estimate
- physics-based simulation

For compliance:
- source-backed
- source/version
- clause/reference where available

For material properties:
- dataset version
- evidence source/status where available

The system must avoid presenting a single “green score” as the complete sustainability truth.

Sustainability should expose multiple relevant factors and trade-offs.

---

# 27. PWA / Offline Considerations

Greenova is intended as a PWA.

The MVP should support:
- responsive mobile experience
- installable web app behavior
- appropriate loading/offline states

The PRD identifies **offline data staleness** as a risk and recommends version/sync knowledge data.

Therefore:

- stale material/compliance data must not silently appear current
- version metadata should be available
- compliance content should indicate when it cannot be refreshed
- safety-critical decisions should not rely on silently stale regulatory data

Exact offline capability is **TBD**; do not assume full offline recommendation capability unless the underlying dataset/rules are explicitly packaged for it.

---

# 28. Performance Targets

Implementation should prioritize:

- fast initial mobile render
- low JavaScript overhead
- lazy loading for non-critical modules
- efficient recommendation recalculation
- no unnecessary animation
- responsive interaction on low-power devices

Motion should follow the finalized Motion System:
- primarily transform/opacity
- no continuous decorative animation
- reduced-motion support

Exact numerical performance budgets are **TBD** after the stack is selected.

---

# 29. Testing Strategy

## 29.1 Unit tests

Test:
- input normalization
- requirement derivation
- safety rules
- ranking calculations
- weight normalization
- evidence labels
- passport serialization
- QR payload generation

## 29.2 Integration tests

Test complete pipelines:

```text
Profile
→ requirements
→ safety
→ ranking
→ shelf life
→ result
```

and:

```text
Profile change
→ What-If
→ new requirements
→ new eligibility
→ new ranking
```

## 29.3 Compliance tests

Verify:
- retrieval source is attached
- source/clause information is preserved
- generated text cannot alter structured compliance status

## 29.4 UI tests

Test:
- mobile layouts
- progressive disclosure
- back navigation preserves inputs
- loading/error states
- What-If visual update
- reduced motion
- accessibility

## 29.5 Safety regression tests

Maintain fixtures for:
- known eligible materials
- known ineligible materials
- boundary temperature cases
- missing-data cases
- changed rule-set versions

A ranking change must never accidentally turn an ineligible material into an eligible recommendation.

---

# 30. MVP Seed Data

For the prototype, create a versioned seed dataset covering:

### Food categories

1. Dairy
2. Bakery
3. Fresh produce
4. Dry snacks
5. Ready-to-eat
6. Pickles and sauces
7. Frozen
8. Beverages

### Material candidates

Use the proposed 12–15 material set from the PRD.

### Important

Seed values must be clearly labeled as:
- prototype/demo
- validated source data
- estimate
- placeholder

Do not invent scientific values and label them as measured.

---

# 31. AI Boundary

The following table is mandatory architecture policy:

| Task | Deterministic / Structured | AI |
|---|---|---|
| Input validation | Yes | No |
| Feature normalization | Yes | No |
| Requirement derivation | Yes | No |
| Safety gate | Yes | No |
| Eligibility | Yes | No |
| Ranking | Yes / configured algorithm | No |
| Shelf-life model | Validated/model pipeline | No free-form LLM |
| Compliance source retrieval | Yes | AI may explain retrieved content |
| Recommendation explanation | Structured input | Yes |
| Passport facts | Structured result | No free-form substitution |
| End-of-life content | Curated structured guidance | Optional explanatory layer |

---

# 32. Decision-Support Disclaimer

The product must clearly communicate that it is decision support and not a replacement for:

- laboratory validation
- final regulatory approval
- professional packaging validation where required

The disclaimer should be visible in relevant decision surfaces rather than hidden only in a legal page.

Evidence labels are part of the trust model.

---

# 33. Build Order

Implementation should proceed in this order:

### Phase 1 — Foundation
- project setup
- routing
- design tokens
- reusable UI primitives
- responsive shell
- motion primitives
- PWA foundation

### Phase 2 — Product Profile
- food categories
- profile schema
- validation
- storage/distribution inputs
- priorities

### Phase 3 — Decision Engine
- normalization
- requirement engine
- material dataset
- safety gate
- ranking engine

### Phase 4 — Results
- Top-3 cards
- scores
- trade-offs
- explanation
- evidence status

### Phase 5 — What-If
- editable conditions
- recalculation endpoint
- changed metrics
- ranking reorder
- motion behavior

### Phase 6 — Compliance
- source-backed retrieval
- checklist
- source references
- Q&A

### Phase 7 — Passport
- passport generation
- QR
- stable public/passport view

### Phase 8 — End-of-Life
- guidance dataset
- pathways
- step-by-step instructions

### Phase 9 — Hardening
- tests
- accessibility
- performance
- audit events
- error states
- trust/disclaimer review

---

# 34. Technical Definition of Done

The technical MVP is complete when:

1. A structured food profile can be created and validated.
2. Food properties produce structured packaging requirements.
3. All candidate materials pass through deterministic safety/compatibility rules.
4. Ineligible materials cannot enter ranking.
5. Eligible materials are ranked using configurable criteria.
6. Top-3 recommendations are returned with structured scores and trade-offs.
7. Shelf-life outputs expose evidence status.
8. What-If changes actually recalculate the decision pipeline.
9. Compliance results retain source/reference information where available.
10. LLM explanations are downstream of structured results.
11. Passport data is generated from structured recommendation data.
12. QR references the correct passport.
13. End-of-life guidance is available.
14. Audit information can reproduce the recommendation context.
15. The PWA works responsively on mobile.
16. Reduced-motion behavior is supported.
17. Safety, compliance, and evidence disclaimers are visible.
18. No generated language can override safety, eligibility, scoring, or regulatory truth.

---

# 35. Open Technical Decisions

These must be decided before production implementation, but should not block the product architecture:

- Exact frontend framework
- Exact backend framework
- Database provider
- Authentication strategy
- Hosting/deployment provider
- LLM provider/model
- Compliance retrieval/vector architecture
- Exact material dataset source
- Exact safety rule thresholds
- Exact ranking weights/default priorities
- Shelf-life model implementation and validated training data
- Public passport URL/domain
- QR library
- Analytics provider
- Exact offline/PWA caching strategy

These are implementation choices, not reasons to redesign the product.

---

# 36. Final Architecture Principle

> **Greenova is a deterministic packaging decision engine with AI around it — not an AI chatbot that happens to recommend packaging.**

The implementation must preserve this sequence:

```text
INPUT
  ↓
SCHEMA VALIDATION
  ↓
FEATURE NORMALIZATION
  ↓
REQUIREMENT DERIVATION
  ↓
RULE-BASED SAFETY GATE
  ↓
MCDA / TOPSIS RANKING
  ↓
SHELF-LIFE MODEL
  ↓
COMPLIANCE RETRIEVAL
  ↓
STRUCTURED RESULT
  ↓
LLM EXPLANATION
  ↓
UI / PASSPORT / QR
```

This architecture is the technical foundation for the Greenova Matrix MVP.
