# AI Agent Directive: Website Revamp for CARPERO™
**Domain:** [carpero.com](https://carpero.com)  
**Instruction for AI Assistant:**  
When the user says *"Revamp our existing website with the Carpero Brand Kit"*, execute the complete redesign of the website using the specifications, design tokens, and assets located in this directory.

---

## 1. Design Tokens & Asset Setup

1. **Import CSS Tokens:**
   Link the included [`brand-tokens.css`](./brand-tokens.css) into the head of your main HTML or layout template:
   ```html
   <link rel="stylesheet" href="./brand-tokens.css">
   ```
2. **Import Typography:**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
   ```
3. **Primary Assets:**
   * **Navbar Logo:** `assets/logo-horizontal.svg`
   * **Hero Visual:** `assets/logo-master-3d.jpg` (or inline SVG `assets/logo-mark.svg` with ambient glow)
   * **Favicon:** `assets/favicon.svg`

---

## 2. Complete Website Section Blueprint

### Section 1: Glassmorphism Navigation Bar
* **Left:** `assets/logo-horizontal.svg` (height: 38px).
* **Center Links:** "The Recovery Engine", "How It Works", "ROI Calculator", "Case Studies", "FAQ".
* **Right:** Glowing CTA button: **"Audit Leaked Revenue"** (opens the interactive audit form).
* **Styling:** Sticky top, `background: rgba(7, 9, 14, 0.75)`, `backdrop-filter: blur(16px)`, bottom border: `1px solid var(--carpero-border)`.

---

### Section 2: High-Conversion Hero Section
* **Pill Badge:** `🟢 Autonomous Revenue Recovery Systems`
* **Main Headline:**  
  `Stop The Bleed.`  
  `<span class="carpero-gradient-text">Seize The Leaked Revenue.</span>`
* **Sub-headline:**  
  *"We build turnkey, autonomous AI recovery engines that recapture the 20%–40% of revenue your business is silently losing to unworked leads, failed payments, and checkout drop-offs."*
* **Primary CTAs:**
  * **Primary:** `[ Calculate Your Lost Revenue ↓ ]` (Smooth scroll to Calculator)
  * **Secondary:** `[ Book Free 15-Min Leak Audit → ]`
* **Social Proof Counter:**  
  `+$4.8M+ Recovered for B2B Clients` • `99.2% Capture Precision` • `Zero Cold Calls`
* **Hero Visual:** Display the 3D Master Mobius Render (`assets/logo-master-3d.jpg`) inside an ambient floating card with neon emerald & cyan edge glows.

---

### Section 3: Interactive Revenue Leak Calculator
* **Concept:** Interactive tool where prospects move sliders to see how much money they are silently losing.
* **Sliders & Inputs:**
  1. *Monthly Website / Inbound Lead Volume* (Default: 500 leads/mo)
  2. *Average Deal Size / Customer LTV* (Default: $2,500)
  3. *Estimated Drop-off / Unworked Rate* (Default: 35%)
* **Real-Time Dynamic Output:**
  * **Estimated Leaked Cash Flow:** e.g., `~$437,500 / year` (in warning amber `#F59E0B`).
  * **Estimated Recoverable with Carpero (at 30% recapture rate):** `+$131,250 / year` (in large emerald `#00F59B` with pulse animation).
* **Action Button:** `[ Recover This Revenue Now → ]`

---

### Section 4: The 3-Engine Recovery Architecture
Present 3 high-contrast cards showcasing the core service pillars:
1. **Engine 01: Pipeline Lead Resurrection**  
   *Re-engages leads that went cold after 3 days. Uses hyper-personalized conversational AI to revive interest and book qualified calls onto your calendar.*
2. **Engine 02: Dunning & Silent Churn Recovery**  
   *Recaptures expired cards, failed billing cycles, and involuntary churn using multi-channel SMS and frictionless update portals.*
3. **Engine 03: High-Intent Drop-Off Interception**  
   *Detects drop-offs during booking or checkout and triggers sub-90-second conversational assistance to close the deal.*

---

### Section 5: Live Simulated ROI Feed & Proof Metrics
A live simulated ticker or stream showing real-time autonomous actions:
* `[9 mins ago] Resurrected 45-day cold B2B lead → Booked $18,000 discovery call`
* `[24 mins ago] Intercepted failed $1,250 subscription renewal → Payment recovered`
* `[1 hour ago] Abandoned onboarding flow intercepted → User completed checkout ($3,400 ARR)`

---

### Section 6: Frictionless 15-Minute Audit Form (Modal or Inline)
* Form Fields:
  * Name
  * Work Email (placeholder: `name@company.com`)
  * Website URL
  * Monthly Revenue Range dropdown (`$10k-$50k`, `$50k-$250k`, `$250k-$1M+`)
* Primary Submit Button: `[ Request Autonomous Audit Report ]`
* Directs leads to email `hello@carpero.com` or triggers webhook.

---

### Section 7: Footer
* **Logo:** `assets/logo-horizontal.svg`
* **Tagline:** *"Stop the bleed. Seize the revenue."*
* **Copyright:** `© 2026 Carpero Inc. All rights reserved. Registered on carpero.com`
* **Direct Contact:** `hello@carpero.com`
