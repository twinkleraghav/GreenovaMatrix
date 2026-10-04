# Greenova Matrix — Motion System v2

**Status:** FINAL  
**Purpose:** Define the motion language and interaction behavior for Greenova Matrix.  
**Source of truth:** Greenova UX Specification + Greenova Design System + agreed motion direction.

---

## 1. Motion Philosophy

### Calm Organic Motion

Greenova should feel **still like a premium scientific tool, but alive when the user interacts with it.**

The product combines:
- natural / sustainable subject matter
- scientific decision support
- safety-critical evaluation
- premium editorial visual design

Motion therefore needs to be:
- subtle
- purposeful
- responsive
- organic without becoming decorative
- precise without feeling mechanical

Motion must support comprehension and interaction. It must never compete with the information.

### 80/20 Principle

Approximately:
- **80% of the interface remains visually still**
- **20% uses purposeful motion**

Motion appears primarily when:
- something enters the screen
- the user changes a value
- a state changes
- information expands or collapses
- data is recalculated
- recommendations reorder
- a user receives interaction feedback

Avoid continuous animation that makes the product feel restless.

---

## 2. Motion Personality

| Property | Greenova Direction |
|---|---|
| Overall | Calm |
| Organic | Yes, subtle |
| Scientific | Strong |
| Intensity | Low |
| Frequency | Occasional |
| Speed | Fast to moderate |
| Playfulness | Low |
| Decorative animation | Minimal |
| Interaction feedback | Strong |
| Data transitions | Important |
| What-If motion | Important |
| Continuous motion | Avoid |

### Nature Influence

Nature should influence the **character** of motion, not become literal decoration.

Use characteristics such as:
- smoothness
- gentle settling
- progressive growth/reveal
- restrained physicality
- soft transitions

Do **not** add literal leaves, particles, floating objects, or environmental effects merely to communicate sustainability.

---

## 3. Core Motion Rules

### Rule 1 — Motion must have a reason

Every animation should communicate one of:

1. Entry
2. Change
3. Relationship
4. Feedback
5. Progress
6. Discovery

If an animation communicates none of these, remove it.

### Rule 2 — Prefer transform and opacity

Prefer:
- `opacity`
- `transform`
- height/layout animation only when necessary

Avoid expensive continuous animation and unnecessary layout thrashing.

### Rule 3 — Avoid sudden visual jumps

Where values, rankings, or content change, use a short transition so the user can understand what changed.

### Rule 4 — Motion must never hide important information

Safety results, compatibility status, compliance information, warnings, and recommendation changes must remain understandable even with motion disabled.

### Rule 5 — Respect reduced motion

All motion must support `prefers-reduced-motion`.

When reduced motion is enabled:
- remove non-essential movement
- replace transforms with opacity or instant state changes
- keep essential state changes understandable
- never rely on animation to communicate meaning

---

## 4. Motion Tokens

| Token | Duration | Primary Use |
|---|---:|---|
| Instant | 100ms | Press feedback, tiny state changes |
| Fast | 160ms | Hover, button feedback, small UI changes |
| Standard | 240ms | Cards, accordions, tabs, common transitions |
| Emphasis | 360ms | Important state/data changes |
| Page | 420ms | Page/section transitions |
| Slow | 600ms | Subtle hero/image reveal only |

### Default easing

- **Entrance:** ease-out
- **Exit:** ease-in
- **State/layout change:** ease-in-out
- **Selected emphasis:** restrained spring only when it improves physicality

Do not use large bounce or elastic effects.

---

## 5. Global Interaction Behavior

### Buttons

Use restrained feedback.

**Hover:**
- small visual elevation or color change
- approximately 160ms

**Press:**
- tiny scale/press response
- approximately 100ms
- target behavior around `1.00 → 0.98 → 1.00`

Avoid bouncing, glowing, large scaling, or decorative ripples.

### Cards

Cards should feel tactile but quiet.

Use:
- subtle hover elevation
- very small translate/scale only when appropriate
- standard 240ms transition

Do not make cards continuously float.

### Tabs / Segmented Controls

Use a smooth active-state transition.

The active indicator may slide, fade, or use a shared animated background.

Keep it restrained.

### Dropdowns / Menus

Use:
- short opacity transition
- small vertical movement if useful

Do not use large zoom animations.

---

## 6. Page Transitions

Use a subtle **fade + approximately 8px vertical movement**.

Duration:
- around 420ms for a page-level transition

Avoid dramatic slides, full-screen wipes, 3D transitions, or cinematic effects.

---

# 7. Screen-Specific Motion

## 7.1 Home / Landing

The Home screen may have the strongest organic character, but still remains restrained.

### Hero content
Use:
- subtle content reveal
- small vertical movement
- opacity

### Hero imagery
A natural image may use:
- subtle reveal
- optional very slow scale around 100% → 101–102%
- only while relevant/visible

Do not create obvious zooming.

### Quick-start actions
Actions can appear with a small stagger:
- 100–160ms between items
- total sequence kept short

Purpose: establish polish and hierarchy, not spectacle.

---

## 7.2 Product Profile

Motion should feel responsive and practical.

When the user changes food category, temperature, humidity, shelf-life target, budget, or priorities, the UI should update immediately and smoothly.

If additional fields appear based on a selection:
- reveal with opacity + small vertical movement
- around 240ms

Validation should use subtle status feedback. Avoid large error animations.

---

# 8. Analysis / Requirements

The Analysis screen should feel more scientific and process-oriented.

Recommended sequence:

```text
Food profile
    ↓
Packaging requirements
    ↓
Safety evaluation
    ↓
Ranking
    ↓
Recommendation
```

Use restrained progressive reveals.

Progress indicators may animate smoothly, but should not look like entertainment.

---

# 9. Safety Gate

Safety is a critical trust surface.

### Passing state
Use:
- subtle status reveal
- restrained check/status transition
- approximately 240–360ms

### Failing state
Use:
- clear status transition
- restrained emphasis
- no dramatic shaking
- no playful effects

Never use confetti, celebratory bursts, bouncing checkmarks, or large motion for a safety pass.

The UI should communicate:

> **The system evaluated this.**

Not:

> **The interface is celebrating.**

---

# 10. Recommendation Results

Recommendation results are one of Greenova's most important motion surfaces.

### Initial result reveal

Cards can enter with a subtle stagger:
- 160–240ms card transition
- small stagger between cards
- opacity + small vertical movement

The cards should feel progressively revealed, not launched onto the screen.

### Recommendation hierarchy

The top recommendation may receive slightly stronger visual emphasis, but avoid pulsing, glowing, or bouncing.

---

# 11. Animated Data / Scores

Use motion for meaningful numeric changes.

Useful values include:
- sustainability score
- compatibility score
- shelf life
- estimated cost
- barrier performance
- ranking score

Example:

```text
82 → 87
```

The transition should be quick and readable.

Do not animate every number continuously.

---

# 12. What-If — Primary Motion Interaction

**What-If is the most important motion behavior in Greenova.**

The user changes a condition such as:
- temperature
- humidity
- shelf-life target
- budget
- priority weighting

The system should visually communicate the chain of impact.

### Desired sequence

```text
User changes condition
        ↓
Recalculation state
        ↓
Updated metrics
        ↓
Updated scores
        ↓
Recommendation cards reorder
        ↓
Changed values briefly emphasized
```

### Example

Before:

```text
1. Material A — 91
2. Material B — 87
3. Material C — 82
```

After changing temperature:

```text
1. Material B — 90
2. Material C — 86
3. Material A — 72
```

The cards should **move into their new positions**, rather than disappear and reappear.

### What should animate
- updated values
- score changes
- ranking changes
- card position changes
- affected metrics

### What should not animate
- every unrelated element
- decorative backgrounds
- the entire page
- continuous loading effects

The goal is:

> **Make the consequence of the user's decision visible.**

---

# 13. “Why This Packaging?” Expansion

Use smooth expansion/collapse.

### Closed

```text
Why this packaging?       +
```

### Open

```text
Why this packaging?       −

✓ Good oxygen barrier
✓ Temperature compatible
✓ Suitable shelf-life performance

Evidence
Published-case validation
```

Recommended:
- approximately 240ms
- smooth height/layout transition
- opacity for supporting content

---

# 14. Compliance

Compliance should use restrained motion.

Checklist/status items may reveal progressively.

Example:

```text
✓ Food-contact requirement
✓ Material restriction
✓ Temperature condition
✓ Documentation
```

Use motion to communicate completion/status, not excitement.

Source and regulatory information should remain stable and readable.

---

# 15. Packaging Passport

Passport generation may have a short, polished sequence.

Suggested:

```text
Generating
    ↓
Packaging Passport ready
    ↓
QR revealed
```

Use:
- short progress/reveal
- subtle QR appearance

Avoid spinning QR, excessive scanning effects, or large celebratory animation.

---

# 16. End-of-Life

End-of-life pathways may use progressive visual connection.

Example:

```text
Use
 ↓
Collection
 ↓
Sorting
 ↓
Recycling / Composting / Recovery
```

When a pathway is selected:
- selected path becomes more prominent
- unselected options become quieter
- transition remains subtle

This creates a visual sense of flow without literal environmental animation.

---

# 17. Loading and Processing

Loading should communicate that Greenova is working.

Use:
- restrained progress indicators
- subtle skeleton states where appropriate
- short transitions between processing stages

Avoid infinite decorative loaders, excessive pulsing, or long fake loading sequences.

If actual processing is fast, do not artificially slow the experience merely to show animation.

---

# 18. Motion That Greenova Should Avoid

Do not use as a default design language:

- floating leaves
- particle systems
- animated blobs
- neon glow
- excessive gradients
- constant background movement
- large parallax
- 3D card flips
- dramatic page transitions
- excessive bounce
- large elastic springs
- confetti
- continuously pulsing cards
- decorative loading animations
- animations that delay user interaction

Greenova should never feel like a generic “green tech” website.

---

# 19. Accessibility

Greenova must support reduced motion.

Use:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable non-essential motion */
}
```

Reduced-motion behavior should:
- remove large transforms
- remove stagger where unnecessary
- remove slow image movement
- reduce or remove page transitions
- preserve state changes
- preserve information hierarchy

No important information should depend on animation.

---

# 20. Performance

Prefer:
- `transform`
- `opacity`
- CSS transitions
- lightweight layout animations
- targeted animation imports

Avoid:
- continuous JavaScript-driven animation
- unnecessary re-renders
- animating expensive layout properties continuously
- animation on every component by default

Motion should remain performant on mobile devices, low-power devices, slower networks, and PWA environments.

---

# 21. Implementation Guidance

21st.dev and Motion Primitives are **implementation references**, not the design source of truth.

Use them selectively for patterns such as:
- animated cards
- expandable cards
- animated number/value transitions
- reorder/layout animation
- tabs/active indicators
- subtle in-view reveals

Do not copy an entire visual system from an external component library.

The Greenova Design System remains authoritative for:
- colors
- typography
- spacing
- borders
- radii
- shadows
- hierarchy
- overall visual personality

The Greenova Motion System remains authoritative for:
- motion intensity
- timing
- easing
- interaction behavior
- when animation is appropriate

---

# 22. Component Priority

Implementation should prioritize motion in this order:

### Priority 1 — What-If
- value transitions
- score changes
- recommendation reordering
- affected-state emphasis

### Priority 2 — Recommendation Cards
- entry stagger
- expandable explanation
- subtle interaction feedback

### Priority 3 — Forms / Product Profile
- progressive disclosure
- validation feedback
- control transitions

### Priority 4 — Analysis / Safety
- process progression
- status reveal
- restrained loading

### Priority 5 — Compliance / Passport / End-of-Life
- subtle status and pathway transitions

### Priority 6 — Home
- refined hero/image reveal

This order prevents decorative motion from taking priority over core product behavior.

---

# 23. Final Motion Principle

> **Greenova should feel still like a premium scientific tool, but alive when the user interacts with it.**

Motion should make the product:
- easier to understand
- more responsive
- more trustworthy
- more connected to its natural/sustainable subject
- more satisfying to use

It should never make the product:
- noisy
- childish
- futuristic for the sake of being futuristic
- visually distracting
- slower
- less trustworthy

**Motion is a communication layer, not decoration.**

---

## Status

**Motion System v2 — FINAL**

Next artifact: `Greenova_Matrix_TECHNICAL_SPEC_v1.md`
