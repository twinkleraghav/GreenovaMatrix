# Greenova Matrix — Design System v1

## 1. Purpose

This document turns the approved Greenova Matrix visual direction into reusable design rules for implementation.

Source basis:
- Greenova Matrix PRD
- UX Specification v1
- Approved UX Pilot visual direction/export

The palette values below are proposed implementation tokens derived from the approved visual direction. They are not claimed to be exact sampled values from the UX Pilot export.

---

# 2. Brand Personality

Greenova Matrix should feel:

- Premium
- Natural
- Scientific
- Trustworthy
- Calm
- Sustainable
- Modern
- Editorial

It should not feel:

- Like a generic SaaS dashboard
- Neon or overly futuristic
- Like a government portal
- Like a generic "green" environmental app
- Overly decorative

Core visual idea:

**Science + Food + Packaging + Sustainability**

---

# 3. Color System

## 3.1 Brand colors

| Token | Hex | Usage |
|---|---|---|
| Forest 900 | #173B2A | Primary brand, major CTAs, hero areas |
| Forest 800 | #1F4A35 | Hover/active primary |
| Forest 700 | #2B5C43 | Secondary emphasis |
| Sage 500 | #8FAE94 | Supporting accents |
| Sage 300 | #C8D8C7 | Soft surfaces and borders |
| Olive 600 | #667653 | Natural secondary accent |
| Ivory 50 | #FAF7F0 | Main application background |
| Ivory 100 | #F3EEE2 | Secondary background |
| Paper 200 | #E7E0D2 | Borders/dividers |
| Charcoal 900 | #263029 | Primary text |
| Charcoal 600 | #5C665F | Secondary text |

## 3.2 Semantic colors

| State | Token | Hex | Usage |
|---|---|---|---|
| Success | Success 600 | #397A55 | Successful checks/status |
| Warning | Warning 600 | #B27A2A | Attention required |
| Error | Error 600 | #B75B52 | Errors/ineligible states |
| Info | Info 600 | #587A83 | Neutral informational state |

Semantic colors must not replace the brand palette. They are reserved for system status.

## 3.3 Color rules

- Use Forest 900 for the strongest brand moments and primary CTAs.
- Use Ivory 50 as the dominant page background.
- Use Sage and Olive as supporting accents, not as competing primary colors.
- Do not use bright lime/neon green.
- Do not use gradients as a default component treatment.
- Sustainability should use natural green tones.
- Safety/compliance status must remain visually distinguishable from sustainability.
- Never communicate status through color alone.

---

# 4. Typography

## 4.1 Typography personality

Use an elegant editorial heading style paired with a highly readable interface/body font.

Recommended implementation:

- Display/Editorial: a refined serif or editorial font
- Interface/Body: a clean sans-serif

If the exact fonts are unavailable, preserve the contrast between:
**editorial headings + precise modern UI text**.

## 4.2 Type scale

| Token | Size | Usage |
|---|---:|---|
| Display | 40–48px | Home hero |
| H1 | 30–36px | Major screen headings |
| H2 | 24–28px | Section headings |
| H3 | 18–22px | Card/section titles |
| Body Large | 16–18px | Important descriptions |
| Body | 14–16px | Standard interface text |
| Caption | 12–13px | Supporting metadata |
| Micro | 10–11px | Small labels/status metadata |

Mobile screens should reduce display and heading sizes while maintaining hierarchy.

## 4.3 Typography rules

- Avoid all-caps for long text.
- Small uppercase labels may be used for scientific sections.
- Primary actions must be easy to scan.
- Scientific values should use clear, highly readable UI typography.
- Do not sacrifice readability for editorial styling.

---

# 5. Spacing

Use a consistent 4px base spacing system.

Preferred scale:

4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64

Guidelines:
- 16–24px internal card padding on mobile
- 24–32px between major sections
- 40–64px for major editorial sections on larger screens
- Maintain generous whitespace around hero content

Avoid cramped dashboards.

---

# 6. Shape and Radius

Use soft, premium rounded geometry.

| Component | Radius |
|---|---:|
| Small controls | 8px |
| Inputs | 10–12px |
| Cards | 16–20px |
| Hero/media blocks | 20–28px |
| Large feature panels | 24–32px |
| Pills | 999px |

Do not make every element pill-shaped.

---

# 7. Borders and Shadows

## Borders
Prefer subtle borders using Paper 200 or Sage 300.

Avoid heavy black outlines.

## Shadows
Use very soft shadows.

Example:
- Resting card: minimal shadow
- Elevated card: soft low-opacity shadow
- Modal/overlay: stronger but still diffuse

The interface should feel tactile without looking glossy.

---

# 8. Buttons

## Primary button
- Forest 900 background
- Ivory/light text
- 10–12px radius
- Comfortable mobile height
- Strong but not oversized

Examples:
- Begin Analysis
- Next Step
- Recalculate
- Generate Passport
- Finalize Strategy

## Secondary button
- Transparent/ivory surface
- Forest text
- Subtle border

Examples:
- Save Draft
- Back
- Compare Options

## Tertiary action
Use text/quiet button treatment for lower-priority actions.

Do not give every action equal visual weight.

---

# 9. Form Controls

Inputs should feel scientific but approachable.

## Sliders
Use:
- muted track
- Forest active segment
- clear thumb
- numeric/value label

The value should remain visible.

## Selects
Use spacious rows with:
- label
- current value
- clear dropdown affordance

## Checkboxes/toggles
Use subtle brand treatment with strong selected-state visibility.

## Validation
Error messages appear directly near the relevant field.

Do not rely only on red borders.

---

# 10. Cards

Cards are important but should not become excessive.

Use cards for:
- Recommendation options
- Important analysis results
- Compliance items
- Passport sections
- End-of-life pathways

Avoid putting every simple text block into a card.

### Recommendation card hierarchy

1. Rank
2. Material name
3. Overall score
4. Key metrics
5. Safety/compatibility state
6. Sustainability/availability indicators
7. Why this packaging?
8. Action

The top recommendation can receive stronger visual emphasis.

---

# 11. Badges and Status

### Sustainability
Use Sage/Forest family.

### Safety passed
Use a distinct success treatment.

### Attention
Use amber.

### Ineligible/error
Use restrained red.

### Evidence status
Evidence labels should be visually noticeable but not alarming.

Examples:
- Validated / Measured
- Published-case validated
- Model estimate
- Physics-based simulation

Never make "Model estimate" look identical to "Validated/measured".

---

# 12. Data Visualization

Charts should feel calm and scientific.

Rules:
- Minimal gridlines
- Clear axis labels
- Strong contrast for the primary data series
- Avoid decorative 3D charts
- Provide text summaries for important findings
- Use color sparingly

For ranking/What-If:
- Make before/after changes obvious.
- Show why the ranking changed.
- Do not rely only on chart color.

---

# 13. Imagery

Preferred imagery:
- Fresh produce
- Sustainable packaging
- Agricultural materials
- Paper/fiber materials
- Natural textures
- Food preparation/production
- Compost/circular-economy contexts

Style:
- Natural
- Warm
- Premium
- Authentic
- Editorial

Avoid:
- Generic corporate people
- Generic AI/robot imagery
- Futuristic glowing interfaces
- Overly staged sustainability imagery

Images should support understanding, not merely decorate the interface.

---

# 14. Iconography

Use one consistent minimal icon family.

Icons should be:
- Simple
- Rounded or softly geometric
- Easy to recognize
- Consistent stroke weight

Do not mix multiple icon styles.

Important concepts:
- Food
- Moisture
- Water activity
- Oxygen
- Light
- Heat
- Safety
- Sustainability
- Carbon
- Availability
- Compliance
- QR/passport
- Disposal

---

# 15. Navigation

The primary journey is:

Home
→ Product Profile
→ Analysis
→ Results
→ What-If
→ Compliance
→ Packaging Passport
→ End-of-Life

On mobile:
- Keep navigation minimal.
- Use a clear progress indicator during analysis.
- Keep the primary CTA visible without overwhelming the screen.

On larger screens:
- Preserve the focused flow instead of turning the product into a dense dashboard.

---

# 16. Responsive Behavior

## Mobile
Mobile is the primary design reference.

- Single-column flow
- Comfortable touch targets
- Sticky/visible primary action where useful
- Progressive disclosure
- Compact but readable metric groups

## Tablet/Desktop
- Expand content width gradually.
- Use two-column layouts where helpful.
- Keep forms and recommendation cards readable.
- Do not simply stretch the mobile UI across a wide screen.

---

# 17. Home Visual Direction

The Home screen is the strongest brand expression.

Use:
- Large editorial hero
- Natural imagery
- Strong Greenova identity
- Concise value proposition
- Clear Begin Analysis CTA
- Food category quick starts

The page should immediately communicate:
**science + food + packaging + sustainability.**

---

# 18. Recommendation Visual Direction

The recommendation screen is the strongest product expression.

The Top recommendation should feel important without looking like an advertisement.

Prioritize:
- Score
- Material
- Shelf-life evidence
- Safety status
- Cost
- Carbon
- Protection
- Availability
- Explanation

The visual hierarchy should encourage comparison rather than force a single answer.

---

# 19. Compliance Visual Direction

Compliance should feel:
- Precise
- Calm
- Trustworthy
- Source-oriented

Keep:
- Status
- Checklist
- Source/reference
- Pending items
- Q&A

Do not make regulatory claims look like ordinary AI-generated content.

---

# 20. Packaging Passport Visual Direction

Treat the passport as a premium digital certificate.

Use:
- Clear title
- Structured metadata
- Strong selected-material identity
- QR code
- Compliance state
- Sustainability metrics
- Disposal route
- Export/download action

---

# 21. End-of-Life Visual Direction

Use natural imagery and a circular-economy visual language.

Pathways should be understandable at a glance:
- Secondary life
- Nutrient cycle
- Recycling/disposal
- Consumer guidance

Keep practical instructions prominent.

---

# 22. Accessibility

- Maintain readable contrast.
- Do not rely on color alone.
- Provide text labels for icons where needed.
- Ensure touch targets are comfortable.
- Use visible focus states.
- Avoid very small text for important scientific information.
- Charts need accessible summaries.
- Important warnings must remain understandable without color.

---

# 23. Component Priority

Build/reuse components in this order:

1. App shell
2. Typography
3. Buttons
4. Inputs
5. Selects
6. Sliders
7. Cards
8. Status badges
9. Recommendation cards
10. Progress indicators
11. Metric blocks
12. Charts
13. Compliance checklist
14. Passport
15. End-of-life pathway cards

---

# 24. Design Token Principle

Antigravity should implement the system as reusable design tokens/components rather than one-off screen styling.

Do not hard-code separate colors, radii, spacing, or typography for every screen.

A single design token change should update the product consistently.

---

# 25. Definition of Visual Consistency

The design system is successful when:

- Every screen feels like the same Greenova product.
- Green is used intentionally rather than everywhere.
- Scientific information remains precise.
- Sustainability feels natural rather than decorative.
- The interface remains premium without sacrificing usability.
- The mobile flow remains clear.
- Components behave consistently across Home, Product Profile, Results, What-If, Compliance, Passport, and End-of-Life.
