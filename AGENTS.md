# AI Studio Code Agent Instructions - Performance & Fluid Animations

This instruction file is automatically loaded by the AI Studio code agent environment to enforce supreme UI/UX speed, responsiveness, and polished motion design across the application.

---

## 1. Core UX Philosophy: Speed, Precision, & Fluidity
* **The Snappiness Directive**: User interaction must feel immediate. Animations should act as a subtle cognitive aid, not a visual delay. Total animation durations for transitions must never exceed **180ms - 220ms**.
* **Zero Layout Jitter**: Avoid animating properties that trigger CSS layout reflow (e.g., `width`, `height`, `margin`, `padding`, `top`, `left`). Instead, animate GPU-accelerated composites: `opacity`, `transform` (using `scale`, `translate3d`, or `rotate`).
* **Active State Snappiness**: Use quick, slightly under-damped spring dynamics (`stiffness: 380, damping: 32`) over standard linear or bezier curves to give elements a tangible, responsive physical feel.

---

## 2. Page & Tab Transitions (Implementation Standard)
When implementing navigation, tab switching, or page views, follow this exact declarative animation pattern using `motion/react`:

```tsx
import { motion } from "motion/react";

// Standard ultra-fast, smooth page/tab transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.995 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
```

* **Guidelines for Tab Content**:
  - Always wrap active tabs/routes in `<AnimatePresence mode="wait">` to cleanly animate the outgoing state before introducing the incoming state.
  - Keep exit times extremely short (`duration: 0.12` or less) to make the transition feel virtually instant.

---

## 3. Modals, Sheets, & Dialog Overlays (Snappy Overlays)
For modals and drawers, always animate the dark backdrop separately from the container to prevent visual synchronization delays.

```tsx
// Backdrop: Pure Fade
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.15, ease: "easeOut" }}
  className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
/>

// Modal Content: Fast Scale & Gentle Spring
<motion.div
  initial={{ opacity: 0, scale: 0.96, y: 12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.96, y: 12 }}
  transition={{
    type: "spring",
    stiffness: 450,
    damping: 32
  }}
  className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50"
>
  {/* Content */}
</motion.div>
```

---

## 4. Performance & Rendering Optimization
* **Component Splitting**: Do not cluster all stateful logic into one colossal `App.tsx` file. Break views down into isolated functional components to contain re-render scopes.
* **Stable Lists & Keys**: Never use random UUIDs or array index integers as `key` properties inside `motion.div` list renderings, as this triggers catastrophic re-render cycles and breaks layout transitions. Use real, stable entity IDs.
* **Resource Optimization**: Add `referrerPolicy="no-referrer"` to `<img>` elements. Optimize canvas drawing states, debounce resize observers, and use standard CSS transitions (`transition-all duration-150 ease-out`) for pure micro-interactions like buttons or cards hover states.
