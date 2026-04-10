# Pēds — Pediatric Co-Pilot
### Product Requirements Document

---

| Field | Value |
|---|---|
| **Version** | — |
| **Date** | — |
| **Classification** | — |
| **Author** | — |
| **Stakeholders** | — |

---

## 1. Executive Summary

Pēds is a mobile-first pediatric co-pilot that gives time-pressed parents a single, intelligent platform to manage their child's health records, triage symptoms at home, track developmental milestones, and improve their parenting effectiveness over time.

The core problem is not a lack of parenting information — it is that no existing tool knows a specific child. Generic health apps give generic answers. Parenting guides don't know your child's allergies. No app learns from the parent's own experience and gets more useful over time.

Pēds solves this by combining four integrated product pillars — **Health Vault**, **Symptom Guide**, **Development Tracker**, and **Parenting Coach** — on top of a per-child AI memory layer (**Hindsight**) that learns, retains, and reflects across all of them. The result is an app that becomes more valuable with every session, every doctor visit, and every parenting moment logged.

### Problem Statement

Parents face four compounding stressors:

- **Fragmented records:** vaccination cards, allergy lists, growth charts, and medication history live in different places — or nowhere at all.
- **Anxiety-driven over-triage:** without a trusted, personalized reference, parents default to emergency visits for manageable symptoms.
- **Generic advice:** parenting content is written for averages; it cannot account for the specific child's temperament, history, or what has actually worked before.
- **No feedback loop:** parents have no way to learn systematically from their own experience with their own child.

The downstream cost: unnecessary doctor visits, parent stress, and the sense of parenting on instinct rather than knowledge.

### Solution in One Sentence

> *"The pediatric co-pilot that knows your child, learns from your experience, and grows more useful every day."*

---

## 2. Goals & Success Metrics

### 2.1 Product Goals

- Reduce unnecessary pediatric urgent care visits by giving parents a trusted home-triage tool that knows their child's medical history.
- Cut doctor visit preparation time from an average of 8+ minutes of memory scrambling to under 60 seconds via auto-generated summaries.
- Create a feedback loop that makes the app measurably more accurate and useful the more a parent uses it.
- Give parents the equivalent of a pediatric nurse practitioner friend — always available, never condescending, always personalized.

### 2.2 Success Metrics

| Metric | Target at 6 Months Post-Launch |
|---|---|
| DAU / MAU ratio | > 40% (strong daily habit formation) |
| Symptom guide sessions ending without ER visit | > 85% where escalation criteria not met |
| Doctor visit summary exports per user / month | > 1.5 (primary retention driver) |
| Parenting coach sessions per child per month | > 8 (weekly cadence) |
| NPS score | > 65 (parenting app category benchmark: 42) |
| 7-day retention after onboarding | > 60% |
| Medical record completeness at 30 days | > 70% of fields populated per child |

---

## 3. Target Users & Personas

### 3.1 Primary Persona — The Overwhelmed Working Parent

| Attribute | Detail |
|---|---|
| Name | Priya, 34 |
| Situation | Two kids (ages 4 and 7), works full-time, co-parenting with partner |
| Pain points | Can never remember when last fever was, allergies scattered across apps, dreads the doctor asking 'when did this start?' |
| Goal | Feel like a competent parent without spending extra hours researching |
| Trigger to download | Child has an allergic reaction and she can't remember the exact allergens on file |

### 3.2 Secondary Persona — The First-Time Parent

| Attribute | Detail |
|---|---|
| Name | Marcus, 29 |
| Situation | First child (8 months), anxious about every symptom, over-googles everything |
| Pain points | Can't distinguish normal from concerning; generic symptom checkers give scary results |
| Goal | Gain confidence that he's not missing something serious |
| Trigger to download | Pediatrician recommends a better way to track milestones between visits |

### 3.3 Out of Scope Users

- Medical professionals using it as a clinical tool (this is a consumer product, not an EHR).
- Children managing their own health (target user is always the parent or guardian).
- Adults without children (no positioning for personal health tracking in v1).

---

## 4. Product Pillars & Feature Scope

Pēds is organized around four integrated pillars. Each pillar has standalone value but is significantly more powerful when the others are populated.

### Pillar 1: Health Vault

- Vaccination schedule with CDC/WHO calendar and overdue flags
- Allergen registry: substance, reaction type, severity (anaphylactic / moderate / mild), EpiPen status
- Medication history with dosing log and timestamps
- Chronic condition registry with diagnosis date and managing physician
- Growth tracking: height, weight, head circumference, plotted against WHO percentile curves
- Emergency contacts and insurance information
- One-tap doctor visit summary export (PDF) — auto-generated via `recall()`
- Family sharing: co-parent access with role-based permissions

### Pillar 2: Symptom Guide

- Natural language symptom input (text or voice)
- Personalized triage cross-referenced with child's Health Vault before any response
- Age- and weight-appropriate dosing calculator (Paracetamol, Ibuprofen, antihistamines)
- Structured response format: home care steps / go to doctor today / go to ER immediately
- Fever tracker with trend awareness across logged episodes
- Illness history auto-logged to Health Vault with every symptom session
- Hard safety guardrails: escalation triggers always surfaced; never 'wait and see' for breathing symptoms when asthma is present
- Persistent disclaimer on every response: not a diagnosis; call your doctor when in doubt

### Pillar 3: Development Tracker

- WHO/CDC milestone checklist organized by age band (0–3 months, 3–6, 6–12, 12–18, etc.)
- Free-form observation logging with domain tagging (motor, language, social-emotional, cognitive)
- Pattern detection via Hindsight observations layer — auto-synthesizes across logged notes
- Flags clusters worth discussing with a pediatrician (does not diagnose)
- Monthly development summary for doctor visits
- Regression detection: notes when a previously achieved milestone shows a dip

### Pillar 4: Parenting Coach

- Moment logging: situation type, what the parent tried, outcome (worked / mixed / backfired)
- Conversational coach: parent asks about a current challenge; agent reflects through all logged experience
- Belief revision: when parent corrects the agent ('that backfired'), confidence scores update
- Per-child playbook: monthly summary of what works, what doesn't, emerging patterns
- Tilt awareness: tracks parent emotional state and notes when stress correlates with harder outcomes
- Cross-pillar insights: 'Liam's meltdown frequency spikes in the two weeks following illnesses'

---

## 5. Hindsight Memory Architecture

Pēds is built on Hindsight (`vectorize-io/hindsight`), an open-source agent memory system that organizes knowledge into four networks: world facts, experiences, opinions (with confidence scores), and observations (auto-synthesized patterns). This is what distinguishes Pēds from a static health record app.

### 5.1 Per-Child Memory Bank

Each child has a dedicated Hindsight memory bank. This ensures complete isolation between children — Liam's patterns never bleed into Jess's reasoning.

| Bank Config Field | Purpose in Pēds |
|---|---|
| `mission` | Primes every `reflect()` call with the child's identity, conditions, and priorities |
| `directives` | Hard safety rules — e.g. 'always surface allergens for food/symptom queries' |
| `disposition.empathy` | Set high (0.8) — parent is often stressed when logging; context before advice |
| `disposition.skepticism` | Set medium (0.5) — update beliefs as evidence accumulates, but don't flip easily |
| `disposition.literalism` | Set higher for health queries (0.75) — medical info should be precise, not liberal |

### 5.2 Memory Network Usage by Pillar

| Pillar | `retain()` | `recall()` | `reflect()` |
|---|---|---|---|
| Health Vault | Vaccines, allergies, meds, conditions | Doctor summary export | Not primary — facts, not reasoning |
| Symptom Guide | Each illness episode | Illness history lookup | Primary — cross-refs world facts before advising |
| Dev. Tracker | Each milestone observation | Domain-specific history | Auto-synthesis of patterns |
| Parenting Coach | Each parenting moment + outcome | Temporal pattern lookup | Primary — experience + opinion network |

### 5.3 Cross-Pillar Insights

The most valuable outputs emerge when pillars share the same bank. Examples of cross-pillar observations Hindsight auto-synthesizes:

- "Liam's meltdown frequency is 2.3x higher in the two weeks following a respiratory illness. Consider reduced expectations during recovery periods."
- "The speech regression logged in November coincides with the ear infection period — possible temporary hearing reduction affecting speech practice. Flag for pediatrician."
- "Liam's cough in January had an identical presentation to today's episode. It resolved in 4 days with reliever inhaler, no escalation needed."

---

## 6. Safety, Medical, & Compliance Requirements

### 6.1 Medical Safety Guardrails

- Every symptom response must include structured escalation triggers ('go to doctor' and 'go to ER') as distinct, visually prominent UI elements — not buried in prose.
- The Hindsight bank directive 'NEVER suggest wait-and-see for breathing symptoms when asthma is present' is enforced at the memory layer, not just the prompt layer.
- No response may use language that implies certainty of diagnosis. Permitted: 'this is consistent with...' or 'most likely...'. Prohibited: 'this is definitely...' or 'you don't need to worry about...'
- A persistent, non-dismissible disclaimer appears on every symptom response: 'This is not a medical diagnosis. Call your pediatrician when in doubt.'
- Dosing calculator outputs must be validated against published pediatric dosing guidelines (BNFc or AAP) and reviewed by the medical advisory board before launch.
- Any query involving difficulty breathing, suspected allergic reaction, altered consciousness, or seizure must immediately surface ER guidance regardless of other context.

### 6.2 Data & Privacy

- All child health data is encrypted at rest (AES-256) and in transit (TLS 1.3).
- Each child's Hindsight memory bank is scoped to the parent account — no data shared across families.
- Family sharing (co-parent access) requires explicit invitation and consent; read-only vs read-write permissions.
- COPPA compliance: app does not collect data from children directly; all input is from the parent.
- HIPAA readiness: while the app is not a covered entity in v1, data architecture must be HIPAA-compatible to support future B2B healthcare partnerships.
- Right to deletion: parent can export full data (JSON + PDF) and permanently delete at any time, including all Hindsight memory bank data.

### 6.3 Medical Advisory Board

Pēds must establish a Medical Advisory Board before public launch consisting of at minimum: one board-certified pediatrician, one pediatric emergency medicine physician, and one pediatric pharmacist. The board reviews and approves: all home care guidance, dosing calculator parameters, escalation trigger thresholds, and any AI-generated health content before deployment.

---

## 7. Technical Architecture

### 7.1 Stack

| Layer | Technology |
|---|---|
| Mobile client | React Native (iOS + Android) — voice input for symptom logging |
| Backend API | Python (FastAPI) — stateless request handling |
| Agent memory | Hindsight Cloud (production) / Hindsight Docker (development) |
| LLM | Claude (Anthropic) — chosen for empathetic tone and precise medical framing |
| Auth | Supabase Auth — email + Apple/Google SSO |
| Database | Supabase Postgres — structured health record data |
| File storage | Supabase Storage — PDF exports, growth chart images |
| Push notifications | Expo Notifications — vaccine reminders, milestone prompts |
| Analytics | PostHog — privacy-first, self-hosted option available |

### 7.2 Hindsight Bank Per Request

Every agent interaction follows this pattern:

1. Parent input arrives at API
2. Identify `child_id` from session
3. Classify request type: `health_query` / `symptom` / `milestone` / `parenting_moment`
4. For health queries and symptoms: call `reflect()` — bank mission primes allergens and conditions first
5. For parenting moments: call `retain()` to store, then `reflect()` for immediate insight
6. For doctor export: call `recall()` with structured query across all four domains
7. Response returned with structured escalation fields (for symptoms) or insight narrative
8. Auto-retain: all sessions logged to experience bank for future pattern synthesis

### 7.3 MVP Scope (v1.0 — 6 weeks)

The MVP prioritizes the two pillars with highest immediate value and clearest safety boundaries:

- **Health Vault:** full data entry, vaccination tracker, allergen registry, medication log, doctor summary PDF export
- **Symptom Guide:** natural language input, personalized triage cross-referenced with Health Vault, structured escalation output, illness history logging
- Basic child profile setup with onboarding flow
- Co-parent sharing (view-only in MVP)

Development Tracker and Parenting Coach ship in v1.5 (target: 10 weeks), once the Health Vault is populated enough to enable meaningful cross-pillar synthesis.

---

## 8. UX & Design Principles

| Principle | What it means in practice |
|---|---|
| Speed over completeness | A parent logging a moment at 11pm after a hard bedtime will not fill a form. Every interaction must be completable in under 30 seconds. |
| Voice-first logging | All logging surfaces must support voice-to-text as the primary input method. Typing is the fallback. |
| Calm, not clinical | The app should feel like a knowledgeable friend, not a medical portal. Warm typography, no red alerts unless genuinely urgent. |
| Structured safety always visible | Escalation triggers in symptom responses are never collapsed, never behind a 'read more'. They are always the first visible element after home care. |
| No dark patterns on AI confidence | The app never implies the AI is certain. Confidence language is honest: 'based on 8 past observations' is shown; 'probably' and 'may' are used consistently. |
| The less the parent has to remember, the better | The app should surface relevant context proactively. If Liam had a similar cough in December, that should appear without the parent asking. |

---

## 9. Phased Release Plan

### Phase 1 — MVP (Weeks 1–6)

- Health Vault: vaccination tracker, allergen registry, medication log, growth tracking, PDF export
- Symptom Guide: natural language triage + Health Vault cross-reference + escalation output
- Child onboarding flow and co-parent sharing (view-only)
- Medical Advisory Board review and sign-off on all symptom guidance
- Closed beta: 50 families, NPS target > 50

### Phase 2 — v1.5 (Weeks 7–10)

- Development Tracker: milestone checklist, free-form observations, pattern detection
- Parenting Coach: moment logging, conversational coach, belief revision
- Cross-pillar insights: first synthesis across health and development data
- Co-parent sharing: read-write permissions
- Public launch on iOS App Store and Google Play

### Phase 3 — v2.0 (Weeks 11–18)

- Pediatrician integration: optional data sharing with child's doctor (opt-in, HIPAA-ready)
- Sibling comparison: parents with multiple children get cross-child pattern insights
- Vaccine reminder push notifications with catchup scheduling
- Growth chart percentile visualization with historical trend
- Parent well-being module: stress tracking, self-care reminders

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation | Severity |
|---|---|---|---|
| AI gives incorrect medical advice | Parent follows advice causing harm to child | Medical Advisory Board review; hard-coded escalation triggers; clear non-diagnosis language | **High** |
| Parents over-rely on app for serious symptoms | Delayed treatment of urgent conditions | Escalation triggers always prominent; app never says 'you don't need to see a doctor' | **High** |
| Data breach of child health records | Privacy violation; regulatory consequences | AES-256 at rest, TLS 1.3 in transit; HIPAA-ready architecture; penetration test before launch | **High** |
| Hindsight memory bank grows stale or incorrect | Poor advice based on outdated context | Confidence scores decay on old opinions; parent can review and delete memories | **Medium** |
| Low engagement after onboarding | App not used enough to generate useful patterns | Voice logging reduces friction; proactive notifications prompt logging at natural moments | **Medium** |
| Regulatory classification as medical device | FDA/CE compliance burden delays launch | Legal review before launch; careful 'triage aid, not diagnostic tool' positioning | **Medium** |

---

## 11. Open Questions

1. What is the minimum Medical Advisory Board composition required before public launch, and what is their review and approval process?
2. Should the dosing calculator be disabled for children with certain conditions (e.g. fever reducer contraindicated with specific medications) or always surface a warning?
3. What is the data retention policy for Hindsight memory banks if a parent deletes their account — is there a grace period or is deletion immediate?
4. At what point do we pursue HIPAA Business Associate Agreements to enable pediatrician data sharing in v2?
5. Should the app support proxy accounts for grandparents or childcare providers, and if so, what access restrictions apply?
6. What is the policy for data from deceased children — how do we handle this sensitively?

---

## 12. Appendix

### A. Hindsight API Operations Reference

| Operation | Used in Pēds for |
|---|---|
| `retain(bank_id, content)` | Logging illness episodes, parenting moments, milestone observations |
| `recall(bank_id, query)` | Doctor summary export, illness history lookup, temporal queries |
| `reflect(bank_id, query)` | Symptom triage, parenting advice, developmental pattern synthesis |
| `set_bank_config(bank_id, mission, directives, disposition)` | Child onboarding — sets safety guardrails and personality for all future `reflect()` calls |

### B. Escalation Trigger Reference (Symptom Guide)

These triggers are hard-coded and must appear on every symptom response regardless of the agent's reasoning:

**Go to ER immediately:**
- Breathing difficulty
- Cyanosis (blue lips/fingernails)
- Altered consciousness
- Febrile seizure
- Suspected anaphylaxis (any child with known anaphylactic allergy)

**Go to doctor today:**
- Fever in child under 3 months
- Fever > 39.5°C lasting > 48h
- Rash with fever
- Ear pain with fever
- Symptoms not improving after 48h of home care

**Override rules:**
- For children with asthma, any wheeze or respiratory distress defaults to 'go to doctor today' minimum; no home-care-only recommendation.

### C. Competitive Landscape

| Feature | Pēds | KidsHealth App | Sprout Baby |
|---|---|---|---|
| Personalized to child's history | Yes — full Hindsight integration | No | Partial (growth only) |
| Symptom checker | Personalized triage | Generic only | No |
| Medical record export | Auto-generated PDF | No | No |
| Learns from experience | Yes — experience + opinion banks | No | No |
| Parenting coach | Yes — per-child, evidence-based | No | No |
| Developmental milestones | Yes + pattern detection | General info only | Yes (basic) |
| Cross-pillar insights | Yes | No | No |
