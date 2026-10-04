# Greenova Matrix — UX Specification v1

## 1. Purpose

This document converts the approved UX direction into implementation-ready UX behavior for Greenova Matrix.

Source of truth:
- Product requirements: Greenova Matrix PRD
- Approved UX reference: UX Pilot export dated 2026-10-04

This document defines screen structure, navigation, interactions, states, and UX rules. It does not define the final technical architecture or final motion system.

---

## 2. Core Product Flow

Home
→ Product Profile
→ Analysis / Requirements
→ Safety & Compatibility Gate
→ Top-3 Recommendations
→ What-If Analysis
→ Compliance
→ Packaging Passport
→ End-of-Life / Circular Economy

The experience should make a complex scientific decision feel understandable and actionable.

---

## 3. Global UX Principles

### 3.1 Safety before ranking
Safety and compatibility are eligibility gates. AI ranking must never override a failed safety/compatibility check.

### 3.2 Ranking is a tradeoff
Among eligible materials, ranking considers protection, safety/compliance, sustainability, cost, availability, shelf-life suitability, and carbon impact.

### 3.3 AI explains; it does not become the source of truth
AI-generated explanations must reflect deterministic results and source-backed compliance information.

### 3.4 Evidence status must be visible
Shelf-life results must distinguish validated/measured data, published-case validation, model estimates, and physics-based simulations.

### 3.5 Progressive disclosure
Scientific inputs should not overwhelm first-time users. Show the most important fields first and allow additional properties to be expanded.

### 3.6 Mobile-first
The approved UX is based on narrow mobile screens. Layouts must remain responsive on larger screens without turning the core flow into a dense dashboard.

### 3.7 Premium sustainable visual language
Use the approved warm ivory, forest-green, muted sage/olive, editorial typography, generous whitespace, natural imagery, subtle borders, and restrained shadows.

---

# 4. Screen Specifications

## Screen 01 — Home

### Purpose
Introduce Greenova Matrix and start a packaging analysis.

### Primary content
- Greenova Matrix brand
- Value proposition
- Food category quick-start options
- Primary CTA: Begin Analysis
- Short explanation of scientific + sustainability approach

### Primary action
Begin Analysis → Product Profile

### UX requirements
- The first screen should communicate science + food + packaging + sustainability.
- Avoid a generic SaaS dashboard appearance.
- Quick-start categories may include Fresh Produce, Dry Goods, Bakery, and Liquids.
- The approved reference uses a large editorial hero area and natural imagery.

### States
- Default
- Loading when starting an analysis
- Error if analysis cannot be initialized

---

## Screen 02 — Product Profile

### Purpose
Collect or confirm the food properties required to derive packaging requirements.

### Phase
Food Science / Product Profile

### Primary inputs
- Food category/type
- Moisture
- Water activity
- Fat content
- pH/acidity
- Oxygen sensitivity
- Light sensitivity
- Heat sensitivity
- Target shelf life
- Storage temperature
- Distribution route
- Transport duration
- Budget
- User priorities
- Optional food image

### Approved UX pattern
Group fields by scientific meaning rather than presenting one long undifferentiated form.

Suggested groups:
1. Chemical environment
2. Sensitivity analysis
3. Storage and operating conditions
4. Shelf-life and budget
5. Additional properties

### Progressive disclosure
Show high-priority fields first. Provide an expandable area for additional properties.

### Actions
- Save Draft
- Back
- Next Step / Continue

### Validation
- Required fields must be visibly marked.
- Numeric fields must validate range and format.
- Invalid values must explain what needs to be corrected.
- User-entered values should remain editable.

### Optional image
If image analysis is used, it may suggest a likely food category and pre-fill fields, but the user must confirm/edit them. The UI must not imply that a photo directly measured pH, water activity, oxygen sensitivity, or exact shelf life.

---

## Screen 03 — Analysis / Requirements

### Purpose
Translate food properties into packaging requirements before recommendation.

### Derived requirements
- Moisture barrier
- Oxygen barrier
- Light protection
- Heat tolerance
- Physical protection
- Food-contact suitability
- Shelf-life suitability

### UX behavior
Show a concise explanation of how the entered food properties translate into packaging requirements.

Example:
Food has high oxygen sensitivity
→ Strong oxygen barrier required

### Safety gate
The system must run the deterministic safety/compatibility gate before ranking.

### States
- Calculating
- Eligible materials found
- No eligible materials
- Input conflict requiring correction

---

## Screen 04 — Results / Recommendations

### Purpose
Present the Top-3 eligible packaging recommendations.

### Primary content
For each recommendation:
- Material name
- Overall score
- Shelf-life estimate
- Evidence status
- Cost
- Carbon impact
- Protection
- Sustainability
- Availability
- Compliance/safety status
- Strengths
- Limitations
- Why this packaging?

### Recommendation hierarchy
1. Best overall / top recommendation
2. Alternative
3. Alternative

### Safety status
The UI must make it clear that recommendations passed the safety/compatibility eligibility gate.

### Evidence
Never present a model estimate or simulation as a laboratory measurement.

### Actions
- Why this packaging?
- Compare Options
- What-If Analysis
- Adjust Inputs
- Finalize Choice / Continue

### Explanation drawer/section
"Why this packaging?" should explain the deterministic factors behind the recommendation rather than inventing new facts.

---

## Screen 05 — What-If Analysis

### Purpose
Let the user explore how changed operating conditions affect recommendations.

### Controls
- Storage temperature
- Humidity where applicable
- Target shelf life
- Budget
- Priority weights

### Priority options
Examples from the PRD:
- Lowest cost
- Longest shelf life
- Lowest carbon
- Highest protection
- High availability
- Strong compliance preference

### Recalculation
After the user changes conditions and selects Recalculate:
- Re-evaluate eligibility
- Recalculate shelf-life estimate
- Recalculate material score
- Re-rank materials
- Update Top-3

### Results explanation
Show what changed, such as:
- Material became ineligible
- Estimated shelf life changed
- Ranking changed
- Tradeoff changed

### UX rule
Do not imply that one material is always best across every dimension.

---

## Screen 06 — Compliance

### Purpose
Help the user inspect compliance status and source-backed regulatory information.

### Content
- Safety gate status
- Compliance checklist
- Rule status
- Source/clause/reference
- Regulatory Q&A
- Warnings or pending review items

### Important distinction
Regulatory source information is the source of truth. AI-generated explanations must not be presented as the underlying regulation.

### Statuses
- Passed / compliant
- Attention required
- Pending review
- Not available / insufficient validated data

### Sample-data rule
Any specific regulatory claims visible in the UX Pilot export should be treated as prototype/demo content unless backed by the validated compliance knowledge base. They must not be hard-coded as factual production claims.

---

## Screen 07 — Packaging Passport

### Purpose
Create a durable record of the selected packaging strategy.

### Content
- Food/product
- Selected packaging material
- Operating conditions
- Estimated shelf life
- Evidence status
- Recyclability
- Compostability
- Carbon information
- Compliance information
- Disposal guidance
- Packaging specifications
- QR code

### Actions
- Generate Passport
- View QR
- Download / Export

### UX
The passport should feel like a premium digital certificate while remaining readable and information-dense.

---

## Screen 08 — End-of-Life / Circular Economy

### Purpose
Provide responsible end-of-life guidance.

### Possible pathways
- Secondary life / repurposing where appropriate
- Nutrient cycle / managed composting where appropriate
- Standard disposal/recycling pathway
- Consumer disposal guidance

### Consumer guidance
Where relevant:
- Remove adhesives
- Rinse and dry
- Check local sorting
- Compost only where appropriate

### Safety / responsibility
Clearly distinguish food that may still be suitable for consumption from food that should be treated as waste.

---

# 5. Navigation Model

Primary flow:

Home
→ Product Profile
→ Analysis
→ Results
→ What-If
→ Compliance
→ Packaging Passport
→ End-of-Life

Back navigation must preserve user-entered values.

The user must be able to return to inputs from Results and adjust them.

---

# 6. Required System States

Every major screen should account for:

- Loading
- Success
- Validation error
- General error
- Missing data
- No eligible materials
- Insufficient validated compliance data
- Recalculation in progress
- Offline/unavailable state where supported

---

# 7. Trust and Explainability

The UI must communicate three layers clearly:

1. Safety gate — determines eligibility.
2. Ranking — optimizes among eligible materials.
3. Explanation — explains the result.

The interface must never suggest that the LLM independently decided that a packaging material is safe.

---

# 8. Visual Design System — Directional Rules

The approved visual direction is premium sustainable editorial.

### Palette direction
- Deep forest green
- Muted sage
- Muted olive
- Warm ivory/off-white
- Natural beige
- Charcoal

### Avoid
- Neon green
- Bright lime green
- Generic green SaaS appearance
- Excessive gradients
- Excessive shadows
- Dense dashboard grids

### Typography
- Elegant editorial-style headings
- Highly readable body typography
- Strong hierarchy
- Scientific values remain precise and scannable

### Components
- Soft rounded cards
- Subtle borders
- Restrained shadows
- Spacious forms
- Refined buttons and controls
- Natural imagery where it adds meaning

### Semantic status colors
Do not use brand green for every status.
- Sustainability: natural greens
- Warning: amber
- Error/ineligible: restrained red
- Neutral/information: neutral tones
- Safety/compliance: visually distinct status treatment

---

# 9. Accessibility

- Maintain readable contrast.
- Do not communicate status through color alone.
- Controls need clear labels.
- Touch targets should be comfortable on mobile.
- Important explanations should not depend on hover.
- Charts and scores should have text equivalents.

---

# 10. Prototype Success Path

The core prototype should demonstrate:

1. Choose persona / begin analysis.
2. Enter or confirm food properties.
3. Receive safety-filtered Top-3 recommendations.
4. Inspect why a material was recommended.
5. Change a What-If condition.
6. See ranking/results change.
7. Inspect compliance.
8. Generate Packaging Passport/QR.
9. View responsible end-of-life guidance.

This is the minimum journey to validate before expanding the product.

---

# 11. Open Decisions for Later

These should NOT block UX implementation:

- Exact technical architecture
- Final database schema
- Final ranking implementation
- Exact RAG infrastructure
- Production regulatory dataset
- Final animation system
- Supplier/marketplace functionality
- Multilingual/voice features
- Photo-to-pack advanced vision
