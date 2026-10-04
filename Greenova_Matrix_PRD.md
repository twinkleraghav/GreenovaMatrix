# Greenova Matrix --- Product Requirements Document (PRD)

**Product:** Greenova Matrix\
**Document Type:** Product Requirements Document\
**Version:** 1.0\
**Status:** Prototype / MVP\
**Primary Goal:** AI-based intelligent food packaging material
recommendation with explainable, safety-first ranking and sustainable
end-of-life guidance.

------------------------------------------------------------------------

## 1. Product Overview

Greenova Matrix is a web/mobile Progressive Web App (PWA) that
recommends suitable food-packaging materials based on the scientific
properties of a food product and its operating conditions.

The system converts:

**Food properties → Packaging requirements → Safety/compatibility filter
→ AI ranking → Explainable recommendation → Compliance and
sustainability information**

The product is designed as decision support for food businesses, MSMEs,
FPOs, farmers, exporters, cloud kitchens, and sustainability/regulatory
users. It is not a replacement for laboratory validation or final
regulatory approval.

The core product differentiator is that Greenova Matrix does not simply
display packaging products. It evaluates the food's properties, filters
unsuitable materials, and ranks eligible options across protection,
shelf life, safety/compliance, cost, sustainability, carbon impact, and
availability.

------------------------------------------------------------------------

## 2. Problem Statement

Choosing food packaging is a multi-variable decision. An apparently
inexpensive or sustainable material may fail because it does not provide
sufficient moisture/oxygen protection, is unsuitable for the
food-contact conditions, cannot support the required shelf life, is
unavailable to the user, or creates regulatory/compliance problems.

Existing packaging/LCA tools described in the source blueprint generally
compare packaging designs or environmental impacts after options have
already been selected. The proposed opportunity is to connect food
science, packaging requirements, compliance, sustainability, cost, and
availability in one recommendation workflow.

------------------------------------------------------------------------

## 3. Product Vision

> **Choose the right packaging for the right food, under the right
> conditions, while making the decision understandable and supporting
> responsible end-of-life.**

Greenova Matrix should evolve from a packaging recommender into a
circular decision-support platform:

**Food → Smart Packaging → Extended Shelf Life → Packaging Passport →
Responsible End-of-Life**

------------------------------------------------------------------------

## 4. Goals

### 4.1 MVP Goals

1.  Collect a structured food/product profile.
2.  Convert food properties into packaging requirements.
3.  Apply deterministic safety and compatibility rules before AI
    ranking.
4.  Rank eligible materials using transparent multi-criteria scoring.
5.  Provide a Top-3 recommendation.
6.  Show estimated shelf life, cost, carbon/sustainability information,
    and availability.
7.  Explain why the recommended material was selected.
8.  Provide a What-If simulator for temperature, humidity, target shelf
    life, and budget.
9.  Provide an India-first compliance workflow for FSSAI/EPR-related
    checks where validated data is available.
10. Generate a Packaging Passport and QR representation for the selected
    packaging.
11. Provide a responsible food-waste end-of-life guidance feature,
    including composting guidance for suitable organic waste.

### 4.2 Future Goals

-   Photo-to-pack profile assistance.
-   Multilingual and voice interaction.
-   Local sustainable-material and supplier discovery.
-   Export-mode compliance.
-   EPR tracking/audit support.
-   Crowd-sourced actual shelf-life feedback.
-   Smart-packaging add-on recommendations.

------------------------------------------------------------------------

## 5. Non-Goals

The MVP will not:

-   Replace laboratory shelf-life testing.
-   Claim that a photograph can determine exact pH, water activity,
    oxygen sensitivity, or shelf life.
-   Allow an LLM to make the final safety decision.
-   Treat a high sustainability score as sufficient reason to recommend
    an unsuitable material.
-   Present simulated shelf-life values as experimentally validated
    measurements.
-   Guarantee regulatory approval.
-   Build a full packaging marketplace in the MVP.

------------------------------------------------------------------------

## 6. Target Users

### Primary Users

  -----------------------------------------------------------------------
  Persona                             Primary Need
  ----------------------------------- -----------------------------------
  MSME food manufacturer              Affordable, understandable
                                      packaging decision support

  FPO / farmer                        Practical packaging options for
                                      produce and distribution

  Small food business                 Balance cost, shelf life, and
                                      availability

  Export-oriented producer            Stronger compliance and
                                      distribution-condition awareness

  Sustainability officer              Compare carbon, recyclability,
                                      compostability, and alternatives

  Packaging professional              Explainable material comparison and
                                      what-if analysis
  -----------------------------------------------------------------------

### Secondary Users

-   Regulatory/compliance teams
-   Researchers and students
-   Packaging consultants
-   Consumers accessing Packaging Passport QR information

------------------------------------------------------------------------

## 7. Core User Journey

``` text
Landing Page
    ↓
Select Persona / Language
    ↓
Create Food Product Profile
    ↓
Enter Scientific + Operating Properties
    ↓
(Optional) Upload Food Photo
    ↓
Convert Food Properties → Packaging Requirements
    ↓
Safety + Compatibility Hard Filter
    ↓
Eligible Material Set
    ↓
Multi-Criteria AI Ranking
    ↓
Top-3 Recommendations
    ↓
Compare Cost / Shelf Life / Carbon / Protection / Availability
    ↓
Explain "Why This Packaging?"
    ↓
Run What-If Scenarios
    ↓
Check Compliance
    ↓
Select Packaging
    ↓
Generate Packaging Passport + QR
    ↓
View Disposal / End-of-Life Guidance
```

------------------------------------------------------------------------

# 8. Functional Requirements

## FR-01 --- Smart Product Profiler

The system shall allow the user to create a food-product profile.

### Required inputs

-   Food category/type
-   Moisture level
-   Water activity
-   Fat content
-   pH/acidity
-   Oxygen sensitivity
-   Light sensitivity
-   Heat sensitivity
-   Target shelf life
-   Storage temperature
-   Distribution route
-   Transportation duration where applicable
-   Budget
-   User priorities

### Preset food categories

The source blueprint proposes:

-   Dairy
-   Bakery
-   Fresh produce
-   Dry snacks
-   Ready-to-eat
-   Pickles and sauces
-   Frozen
-   Beverages

The user must also be able to provide custom values.

------------------------------------------------------------------------

## FR-02 --- Food-to-Packaging Requirement Engine

The system shall translate food properties into packaging requirements.

Example:

``` text
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

The requirement engine should produce structured requirements such as:

-   Moisture barrier
-   Oxygen barrier
-   Light protection
-   Heat tolerance
-   Physical protection
-   Food-contact suitability
-   Shelf-life suitability

------------------------------------------------------------------------

## FR-03 --- Safety and Compatibility Hard Filter

Safety must be evaluated before AI ranking.

### Rule checks may include

-   Food-contact suitability
-   Food/material compatibility
-   Temperature limitations
-   Relevant restrictions
-   Regulatory conditions
-   Known material exclusions

### Required behavior

``` text
ALL MATERIALS
      ↓
SAFETY / COMPATIBILITY FILTER
      ↓
REMOVE INELIGIBLE MATERIALS
      ↓
ELIGIBLE MATERIALS
      ↓
AI / MCDA RANKING
```

The LLM must never override the hard safety gate.

------------------------------------------------------------------------

## FR-04 --- Material Recommendation Engine

The system shall rank only eligible materials.

### Ranking dimensions

-   Protection
-   Safety/compliance
-   Sustainability
-   Cost
-   Availability
-   Shelf-life suitability
-   Carbon impact

The source blueprint proposes weighted scoring or TOPSIS.

Conceptual scoring model:

``` text
Score(material) =
    w1 × Protection
  + w2 × Safety/Compliance
  + w3 × Sustainability
  + w4 × Cost
  + w5 × Availability
```

Safety/compliance remains a gate rather than merely a score.

### Output

The system shall return:

1.  Recommended material
2.  Alternative #1
3.  Alternative #2
4.  Overall score
5.  Key strengths
6.  Key limitations
7.  Estimated shelf life
8.  Cost estimate
9.  Carbon/sustainability information
10. Availability
11. Compliance status

------------------------------------------------------------------------

## FR-05 --- Shelf-Life Estimation

The prototype may use a regression/gradient-boosting model supported by
barrier properties and temperature-related models.

Potential model inputs:

-   WVTR
-   OTR
-   Water activity
-   Storage temperature
-   Target shelf life
-   Food properties
-   Packaging barrier characteristics

The source blueprint mentions Q10 / Arrhenius temperature models as
possible supporting methods.

### Trust requirement

Every shelf-life result shall display its evidence status, such as:

-   Validated / measured
-   Published-case validated
-   Model estimate
-   Physics-based simulation

If real shelf-life data is limited, the system must not present
simulation as laboratory measurement.

------------------------------------------------------------------------

## FR-06 --- Explain "Why This Packaging?"

Every recommendation shall provide an explanation.

### Example structure

``` text
Why this packaging?

Oxygen protection: High
Moisture protection: High
Cost: Medium
Sustainability: Medium
Availability: High
Shelf-life suitability: High

Reason:
The food has high oxygen sensitivity and requires a long shelf life.
The recommended material provides strong oxygen protection while
remaining within the selected cost and availability constraints.
```

The explanation layer may use an LLM, but the underlying facts and
scores must come from the deterministic/ranking pipeline.

------------------------------------------------------------------------

## FR-07 --- What-If Packaging Simulator

Users shall be able to modify:

-   Storage temperature
-   Humidity
-   Target shelf life
-   Budget
-   User priority weights

The system shall recalculate:

-   Eligibility where applicable
-   Shelf-life estimate
-   Material score
-   Ranking
-   Top-3 recommendations

### Example

``` text
Initial:
Temperature = 10°C
Humidity = 50%
Shelf life = 15 days
Budget = ₹2/package

User changes:
Temperature → 30°C

System:
Recalculate requirements
→ Recalculate estimates
→ Recalculate scores
→ Update Top-3
```

------------------------------------------------------------------------

## FR-08 --- Cost + Shelf-Life + Carbon Dashboard

The results screen shall make trade-offs visible.

Example data structure:

  Material      Cost   Shelf Life Carbon   Protection
  ---------- ------- ------------ -------- ------------
  A            ₹1.00      10 days Low      Medium
  B            ₹1.50      20 days Medium   High
  C            ₹2.00      30 days Higher   Very High

Users should understand that there may be no single option that is best
across every dimension.

------------------------------------------------------------------------

## FR-09 --- User Priority Weights

Users shall be able to indicate priorities such as:

-   Lowest cost
-   Longest shelf life
-   Lowest carbon impact
-   Highest protection
-   High availability
-   Strong compliance preference

The ranking engine shall adapt the relative weights while maintaining
safety eligibility.

------------------------------------------------------------------------

## FR-10 --- Compliance Assistant

The system shall provide an India-first compliance workflow where
validated source data exists.

Potential compliance areas:

-   FSSAI
-   EPR
-   Single-use plastic checks
-   Export-related requirements in future versions

The regulation assistant may use retrieval-augmented generation (RAG).

### Requirements

-   Retrieve from an approved regulation knowledge base.
-   Show the source clause/reference when available.
-   Never let generated text replace the underlying rule.
-   Maintain an audit trail of the regulatory information used.

------------------------------------------------------------------------

## FR-11 --- Distribution and Transportation Conditions

The product profile shall account for distribution route.

Supported conceptual categories:

-   Local
-   Regional
-   Long-distance
-   Export

Additional inputs:

-   Transportation duration
-   Temperature exposure
-   Humidity
-   Storage conditions

The system shall be able to change recommendations when distribution
conditions materially change packaging requirements.

------------------------------------------------------------------------

## FR-12 --- Material Availability

Availability shall be a ranking factor.

Material records may contain:

-   Availability: High / Medium / Low
-   Approximate cost
-   Supplier information
-   Protection characteristics
-   Carbon factor
-   Recyclability
-   Other material properties

Future versions may provide local supplier discovery.

------------------------------------------------------------------------

## FR-13 --- Local Sustainable Alternatives

The system may recommend locally relevant materials such as:

-   Areca leaf
-   Bagasse
-   Jute
-   Banana fibre
-   PLA
-   Millet-based films

A sustainable alternative must still pass food-specific safety and
packaging-requirement checks.

The system shall not recommend a material solely because it is perceived
as "greener."

------------------------------------------------------------------------

## FR-14 --- Photo-to-Pack Assistance

The optional computer-vision module shall:

1.  Accept a food image.
2.  Predict a likely food category.
3.  Pre-fill relevant form fields.
4.  Ask the user to confirm or edit the information.

The system shall explicitly avoid claiming that an image determines
exact laboratory properties such as:

-   pH
-   water activity
-   oxygen sensitivity
-   exact shelf life

------------------------------------------------------------------------

## FR-15 --- Packaging Passport

After a packaging selection, the system shall generate a digital
Packaging Passport.

### Passport fields

-   Food/product
-   Packaging material
-   Recommended conditions
-   Estimated shelf life
-   Recyclability
-   Compostability
-   Carbon information
-   Compliance information
-   Disposal instructions
-   Relevant packaging specifications

------------------------------------------------------------------------

## FR-16 --- QR Code

The system shall generate a QR representation that links to the
Packaging Passport.

``` text
Recommendation
      ↓
Packaging Passport
      ↓
QR Generation
      ↓
QR Scan
      ↓
Packaging Information
```

------------------------------------------------------------------------

## FR-17 --- Give Food Waste a Second Life

### Purpose

When food is no longer suitable for consumption, Greenova Matrix shall
provide responsible end-of-life guidance for appropriate organic waste.

### MVP guidance examples

-   Vegetable peels → suitable peels can be directed to composting.
-   Banana peels → cut into smaller pieces before composting.
-   Eggshells → clean, dry, and crush before composting.
-   Used tea/coffee grounds → compost in appropriate amounts.
-   Potato peels → compost when properly handled.

The UI shall present step-by-step guidance rather than simply displaying
"compost it."

### Important UX distinction

This feature should distinguish:

``` text
Food still suitable for consumption
        ↓
Normal food-use / storage guidance

Food no longer suitable for consumption
        ↓
Responsible waste pathway
        ↓
Suitable organic waste
        ↓
Composting guidance
```

The feature is intended as responsible end-of-life guidance and should
not imply that unsafe or unsuitable food should be consumed.

------------------------------------------------------------------------

# 9. Non-Functional Requirements

## NFR-01 --- Explainability

Every recommendation must have traceable contributing factors.

## NFR-02 --- Auditability

The system shall retain:

-   Input values
-   Rules triggered
-   Materials filtered out
-   Eligible material set
-   Ranking factors
-   Weights
-   Recommendation result
-   Compliance sources used
-   Model/evidence status

## NFR-03 --- Safety

Safety/compatibility rules must execute before recommendation ranking.

## NFR-04 --- Performance

Prototype target:

-   Standard recommendation response: preferably \< 3 seconds excluding
    external model latency.
-   What-If recalculation: preferably near-real-time for
    cached/material-table calculations.

## NFR-05 --- Offline Capability

The PWA should support offline-first behavior for appropriate workflows
and synchronize when connectivity returns.

## NFR-06 --- Accessibility

The interface should support:

-   Clear language
-   Mobile-first layout
-   Large touch targets
-   Multilingual UI in future iterations
-   Voice input in future iterations

## NFR-07 --- Data Quality

Material-property records must contain provenance or source metadata
wherever possible.

------------------------------------------------------------------------

# 10. System Architecture

``` text
┌──────────────────────────────┐
│        React / Next.js       │
│       PWA + Tailwind         │
└──────────────┬───────────────┘
               │
               │ REST / JSON
               ▼
┌──────────────────────────────┐
│          FastAPI             │
│  /recommend /compliance      │
│  /explain /passport          │
└───────┬───────────┬──────────┘
        │           │
        │           ├─────────────────────┐
        ▼           ▼                     ▼
┌────────────┐ ┌───────────────┐  ┌─────────────────┐
│ Food &     │ │ Rule Engine   │  │ RAG Compliance  │
│ Material DB│ │ Safety Gate   │  │ Knowledge Base  │
└─────┬──────┘ └───────┬───────┘  └─────────────────┘
      │                 │
      └────────┬────────┘
               ▼
      ┌──────────────────┐
      │ Ranking / TOPSIS │
      │ + Shelf-Life ML  │
      └────────┬─────────┘
               ▼
      ┌──────────────────┐
      │ Explanation Layer│
      │ LLM + Factors    │
      └────────┬─────────┘
               ▼
      ┌──────────────────┐
      │ Results / What-If│
      │ Passport / QR    │
      └──────────────────┘
```

------------------------------------------------------------------------

# 11. Proposed Technology Stack

  Layer                  Proposed Technology
  ---------------------- ----------------------------------------------
  Frontend               React or Next.js PWA
  UI                     Tailwind CSS
  Charts                 Recharts or Plotly
  Backend                FastAPI / Python
  Database               PostgreSQL or structured JSON knowledge base
  Regulation retrieval   Vector store such as FAISS or Chroma
  ML                     scikit-learn / XGBoost
  Ranking                TOPSIS / NumPy weighted scoring
  Vision                 Optional CNN/vision model
  LLM                    Explanation + regulation Q&A only
  Deployment             Vercel / Render
  Offline                PWA caching and synchronization

------------------------------------------------------------------------

# 12. Core Data Model

## FoodProfile

``` json
{
  "food_type": "string",
  "moisture_level": "low|medium|high",
  "water_activity": "number|null",
  "fat_content": "low|medium|high",
  "ph": "number|null",
  "oxygen_sensitivity": "low|medium|high",
  "light_sensitivity": "low|medium|high",
  "heat_sensitivity": "low|medium|high",
  "target_shelf_life_days": "number",
  "storage_temperature_c": "number",
  "humidity_percent": "number|null",
  "distribution_route": "local|regional|long_distance|export",
  "transport_duration_hours": "number|null",
  "budget_per_unit_inr": "number|null",
  "priority_weights": {
    "protection": "number",
    "cost": "number",
    "sustainability": "number",
    "availability": "number",
    "shelf_life": "number"
  }
}
```

## Material

``` json
{
  "id": "string",
  "name": "string",
  "material_type": "string",
  "food_contact_suitable": "boolean",
  "temperature_limits": {
    "min_c": "number|null",
    "max_c": "number|null"
  },
  "wvtr": "number|null",
  "otr": "number|null",
  "protection_score": "number",
  "sustainability_score": "number",
  "carbon_factor": "number|null",
  "cost_per_unit_inr": "number|null",
  "availability": "high|medium|low",
  "recyclability": "string|null",
  "compostability": "string|null",
  "rules": [],
  "sources": []
}
```

## Recommendation

``` json
{
  "material_id": "string",
  "eligibility": "eligible",
  "overall_score": "number",
  "estimated_shelf_life_days": "number|null",
  "cost_per_unit_inr": "number|null",
  "carbon_impact": "number|null",
  "availability": "high|medium|low",
  "factor_breakdown": {},
  "rules_applied": [],
  "evidence_status": "string"
}
```

------------------------------------------------------------------------

# 13. API Requirements

## POST `/recommend`

### Input

`FoodProfile`

### Output

``` json
{
  "recommendations": [
    {
      "rank": 1,
      "material_id": "MAT-001",
      "score": 87.2,
      "estimated_shelf_life_days": 30,
      "cost_per_unit_inr": 1.5,
      "carbon_impact": 0.0,
      "availability": "high",
      "compliance_status": "pass",
      "explanation_factors": {}
    }
  ],
  "filtered_material_count": 70,
  "eligible_material_count": 30
}
```

## POST `/what-if`

Recalculate recommendations using modified profile conditions.

## POST `/compliance`

Return compliance checks and source references from the approved
knowledge base.

## POST `/explain`

Generate a plain-language explanation from structured recommendation
factors.

## POST `/passport`

Generate Packaging Passport data.

## POST `/qr`

Generate QR payload for the Packaging Passport.

------------------------------------------------------------------------

# 14. Recommendation Algorithm

``` text
INPUT FOOD PROFILE
       ↓
Normalize values
       ↓
Derive packaging requirements
       ↓
Apply hard safety/compatibility rules
       ↓
Remove ineligible materials
       ↓
Calculate material features
       ↓
Apply user priority weights
       ↓
TOPSIS / weighted multi-criteria ranking
       ↓
Shelf-life estimation
       ↓
Compliance validation
       ↓
Sort eligible options
       ↓
Return Top-3
       ↓
Generate factor explanation
```

### Safety principle

``` text
Safety = Gate
Ranking = Optimization
LLM = Explanation
```

This separation is a core architectural requirement.

------------------------------------------------------------------------

# 15. Material Dataset --- MVP

The source blueprint proposes approximately 12--15 materials, including:

-   LDPE
-   HDPE
-   PET
-   PP
-   BOPP laminate
-   Metallised film
-   Aluminium laminate
-   Kraft paper with coating
-   Glass
-   Tin
-   Bagasse
-   PLA
-   Areca leaf
-   Cellulose film

Each material record should contain barrier properties, heat tolerance,
food-contact suitability, recyclability, approximate cost, carbon
factor, and availability.

------------------------------------------------------------------------

# 16. MVP Food Categories

Target 6--8 categories for the prototype:

1.  Dairy
2.  Bakery
3.  Fresh produce
4.  Dry snacks
5.  Ready-to-eat
6.  Pickles and sauces
7.  Frozen
8.  Beverages

------------------------------------------------------------------------

# 17. UX / Screen Requirements

## Screen 1 --- Home

-   Greenova Matrix branding
-   Persona selection
-   Language selection
-   Quick-start food templates
-   Start recommendation

## Screen 2 --- Product Profile

-   Food category
-   Scientific properties
-   Storage conditions
-   Distribution route
-   Target shelf life
-   Budget
-   Priority sliders
-   Optional image upload

## Screen 3 --- Results

-   Top-3 recommendation cards
-   Score
-   Shelf-life estimate
-   Cost
-   Carbon
-   Compliance badge
-   Availability
-   "Why this packaging?"

## Screen 4 --- Compare / What-If

-   Side-by-side material comparison
-   Temperature slider
-   Humidity slider
-   Shelf-life slider
-   Budget slider
-   Priority controls
-   Pareto visualization

## Screen 5 --- Compliance

-   Compliance checklist
-   Rule status
-   Source/clause reference
-   Regulation Q&A

## Screen 6 --- Packaging Passport

-   Packaging information
-   Disposal instructions
-   Sustainability information
-   QR code
-   Export/download action

## Screen 7 --- Food Waste Second Life

-   Determine appropriate end-of-life pathway
-   Compostable organic-waste guidance
-   Step-by-step instructions
-   Practical do/don't guidance

------------------------------------------------------------------------

# 18. Key User Stories

### US-01 --- Food Manufacturer

> As a food manufacturer, I want to enter my food properties and
> operating conditions so that I can receive packaging recommendations
> suited to my product.

### US-02 --- Cost-Conscious MSME

> As an MSME, I want to prioritize cost so that affordable eligible
> packaging options rank higher.

### US-03 --- Shelf-Life Priority

> As a producer, I want to increase my target shelf life and see how the
> recommendation changes.

### US-04 --- Sustainability Priority

> As a sustainability-focused user, I want to compare carbon and
> sustainability trade-offs without sacrificing packaging suitability.

### US-05 --- Explainability

> As a non-expert, I want to know why the system recommended a material
> so that I can trust and understand the result.

### US-06 --- Compliance

> As a compliance user, I want to see relevant regulatory checks and
> source references.

### US-07 --- Distribution

> As a distributor, I want transportation conditions included because
> long-distance or high-temperature distribution can change packaging
> needs.

### US-08 --- Circularity

> As a packaging user, I want a Packaging Passport and disposal guidance
> so that the packaging's lifecycle information remains accessible.

### US-09 --- Food Waste

> As a user handling food waste, I want simple end-of-life guidance for
> suitable organic waste so that I can make a responsible next-step
> decision.

------------------------------------------------------------------------

# 19. Acceptance Criteria

## Recommendation

-   [ ] User can create a food profile.
-   [ ] System converts food properties into packaging requirements.
-   [ ] Unsafe/incompatible materials are removed before ranking.
-   [ ] Top-3 eligible materials are returned.
-   [ ] Results include score, estimated shelf life, cost,
    sustainability/carbon, availability, and compliance status.
-   [ ] Recommendation is explainable.

## What-If

-   [ ] User can change temperature.
-   [ ] User can change humidity.
-   [ ] User can change shelf-life target.
-   [ ] User can change budget.
-   [ ] User can change priority weights.
-   [ ] Results update after changes.

## Compliance

-   [ ] Compliance result is traceable to the knowledge base.
-   [ ] Relevant source reference is displayed.
-   [ ] LLM output cannot override a deterministic rule.

## Passport

-   [ ] Passport contains material and food information.
-   [ ] Estimated shelf life is labelled appropriately.
-   [ ] Disposal information is present.
-   [ ] QR payload resolves to the passport representation.

## Food Waste Second Life

-   [ ] User can reach the end-of-life guidance flow.
-   [ ] Suitable organic-waste examples are presented.
-   [ ] Composting guidance is step-by-step.
-   [ ] Guidance does not encourage consumption of unsuitable food.

------------------------------------------------------------------------

# 20. Success Metrics

### Product metrics

-   Recommendation completion rate
-   Percentage of users reaching a recommendation
-   What-If simulator usage
-   Packaging Passport generation rate
-   Compliance-check usage
-   Food-waste guidance usage

### Model/system metrics

-   Safety-rule false-positive/false-negative review rate
-   Recommendation consistency
-   Shelf-life prediction error where validation data exists
-   Explanation faithfulness to underlying factors
-   Compliance retrieval accuracy

### Prototype success

A successful MVP should demonstrate the complete flow in approximately
three minutes:

``` text
Choose persona
→ Enter/photograph food
→ Receive Top-3
→ Change a slider
→ Ranking changes
→ Inspect compliance
→ Generate Passport/QR
→ View end-of-life guidance
```

------------------------------------------------------------------------

# 21. Data Governance and Trust

The material dataset should be built from published barrier-property
literature, standards, and open LCA datasets as proposed in the source
blueprint.

For every important data point, the system should preserve provenance
where possible.

If shelf-life data is limited:

1.  Use documented physics-based simulation or model assumptions.
2.  Label the result as an estimate.
3.  Validate against published cases where possible.
4.  Report model error.
5.  Avoid presenting simulated results as laboratory measurements.

The product should maintain a human-readable audit trail showing rules
and values behind each recommendation.

------------------------------------------------------------------------

# 22. Security and Reliability

-   Validate all user inputs.
-   Sanitize uploaded images and generated files.
-   Rate-limit public recommendation endpoints.
-   Keep regulatory data versioned.
-   Version material datasets.
-   Log recommendation-model versions.
-   Keep deterministic safety rules separate from LLM prompts.
-   Do not store unnecessary personal information.

------------------------------------------------------------------------

# 23. MVP Delivery Plan

## Phase 1 --- Foundation

-   Project setup
-   Food/material schemas
-   Material database
-   Rule engine
-   Basic API
-   Basic PWA UI

## Phase 2 --- Recommendation

-   Food-property requirement mapping
-   Safety filter
-   Weighted ranking/TOPSIS
-   Top-3 result cards
-   Explanation factors

## Phase 3 --- Intelligence

-   Shelf-life estimation
-   What-If simulator
-   Cost/shelf-life/carbon dashboard
-   Priority weights

## Phase 4 --- Compliance + Circularity

-   Regulation knowledge base
-   Compliance UI
-   Packaging Passport
-   QR
-   Food Waste Second Life

## Phase 5 --- Differentiators

-   Photo-to-pack
-   Local alternatives
-   Supplier finder
-   Multilingual/voice
-   Pareto dashboard
-   Feedback loop

------------------------------------------------------------------------

# 24. Recommended MVP Priority

  Feature                       Priority   MVP
  ----------------------------- ---------- ----------
  Product profiler              P0         Yes
  Food-property mapping         P0         Yes
  Safety/compatibility filter   P0         Yes
  Top-3 ranking                 P0         Yes
  Explainability                P0         Yes
  Cost/shelf-life/carbon view   P0         Yes
  What-If simulator             P0         Yes
  Compliance workflow           P1         Yes
  Packaging Passport            P1         Yes
  QR                            P1         Yes
  Food Waste Second Life        P1         Yes
  Photo-to-pack                 P2         Optional
  Local supplier finder         P2         Optional
  Multilingual/voice            P2         Optional
  EPR tracker                   P2         Future
  Feedback loop                 P3         Future
  Smart-packaging add-ons       P3         Future

------------------------------------------------------------------------

# 25. Risks and Mitigations

  -----------------------------------------------------------------------
  Risk                    Impact                  Mitigation
  ----------------------- ----------------------- -----------------------
  Limited shelf-life      High                    Label estimates, use
  training data                                   physics-based models,
                                                  validate against
                                                  published cases

  Incorrect material      Critical                Deterministic rule gate
  compatibility                                   and expert-reviewed
                                                  knowledge base

  Regulatory knowledge    High                    Versioned sources and
  becomes outdated                                update process

  LLM hallucination       High                    LLM restricted to
                                                  explanation/Q&A;
                                                  retrieve authoritative
                                                  sources

  Sustainability          Medium                  Show multiple factors
  oversimplification                              rather than one "green"
                                                  label

  Material unavailable    Medium                  Include availability in
  locally                                         ranking and future
                                                  supplier finder

  Users over-trust        High                    Explicit
  predictions                                     decision-support
                                                  disclaimer and evidence
                                                  labels

  Photo model overclaims  Medium                  Use images primarily
                                                  for category/form
                                                  auto-fill

  Offline data staleness  Medium                  Version/sync knowledge
                                                  data
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 26. Observability and Audit Events

Recommended event types:

``` text
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

Each recommendation audit record should include:

-   Timestamp
-   Model version
-   Rule-set version
-   Material dataset version
-   Input profile
-   Filtered materials
-   Eligible materials
-   Ranking weights
-   Top-3 result
-   Evidence status

------------------------------------------------------------------------

# 27. Example Recommendation Response

``` text
Food:
Potato chips

Key properties:
- Low moisture
- High fat
- High oxygen sensitivity
- Target shelf life: 4 months

Packaging requirements:
- Strong moisture barrier
- Strong oxygen barrier
- Oxidation protection
- Long-term barrier performance

Safety filter:
Eligible materials = 30
Rejected materials = 70

Top recommendation:
Material A

Why:
- Strong oxygen protection
- Strong moisture protection
- Meets the target packaging requirements
- Within selected budget range
- High availability

Alternatives:
2. Material B
3. Material C

Trade-off:
Material C may provide stronger protection but at higher cost/carbon impact.
```

------------------------------------------------------------------------

# 28. Bytecode/Engineering Implementation Principle

The implementation should treat Greenova Matrix as a deterministic
decision pipeline with AI components around it, not as an unrestricted
chatbot.

``` text
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

### Engineering rule

> **Never allow generated language to become the source of truth for
> safety, eligibility, scoring, or regulatory status.**

The source of truth should be structured data, deterministic rules,
validated model outputs, and retrieved regulatory sources.

------------------------------------------------------------------------

# 29. Product Definition of Done

The MVP is complete when a user can:

1.  Select a food category.
2.  Enter or confirm food properties.
3.  Enter storage/distribution conditions.
4.  Set budget and priorities.
5.  Receive a safety-filtered Top-3 packaging recommendation.
6.  See cost, shelf life, carbon/sustainability, protection, and
    availability trade-offs.
7.  Understand why the top recommendation was selected.
8.  Change What-If conditions and see the ranking update.
9.  Review available compliance information.
10. Generate a Packaging Passport and QR.
11. Access "Give Food Waste a Second Life" end-of-life guidance.
12. See clear evidence/estimate labels and the decision-support
    disclaimer.

------------------------------------------------------------------------

# 30. Source Basis

This PRD is grounded in the project's supplied source documents:

-   `PackWise_AI_SIH_Blueprint.pdf`
-   `Document 1.pdf`

The PRD preserves the source blueprint's architecture and terminology
while expressing it as an implementation-oriented product specification
for **Greenova Matrix**.

Where the source documents describe a feature as optional, future,
conceptual, or proposed, this PRD does not treat it as experimentally
validated or production-ready.
