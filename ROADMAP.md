# KEROX — Roadmap

> `krx` — a Rust-native, terminal-first, vendor-neutral autonomous red
> team. An orchestrator reads an engagement plan and pursues objectives
> through realistic attack chains, under hard discipline, against
> authorized scope only. Everything is open. Everything is in progress.
> Everything is by hand.

This is the public roadmap for Kerox: what it is, what we are building,
in what order, and to what bar. It is a living document, edited as we
build.

> **Status.** Nothing here is released, downloadable, or
> production-ready. Dates are targets, not promises. Where a line
> describes a capability, read it as an intention unless it says
> otherwise. Kerox is an offensive tool, for **authorized** testing only.

---

## What Kerox is (and isn't)

The clearest way to explain Kerox is by contrast.

- **A scanner** runs a fixed battery of checks and prints a report.
- **An attacker** has an objective, improvises a path toward it, and
  chains small wins into a big one.

Kerox is built to work the second way. You drive it from a terminal the
way you drive a conversation: you state an engagement goal against an
authorized scope, and an orchestrator plans the engagement, dispatches
specialist agents, and gates every live action behind you.

It is **not** a scanner, not a report generator, not a point-and-shoot
weapon, and not a web platform. It runs in a terminal, over SSH, on your
own model, on your own infrastructure, including fully air-gapped.

---

## The design pillars

1. **Engagement discipline before any action.** Before a packet leaves
   the wire, Kerox writes the engagement down — scope first, then the
   full package (Rules of Engagement, ConOps, Deconfliction Plan, and an
   OPPLAN mapped to MITRE ATT&CK) — and refuses to step outside it.
2. **A hard human gate.** Every live action is dry-run by default and
   gated behind explicit human approval, enforced in the binary, not
   asked of the model. Authorized scope only. The default answer is no.
3. **Real interactive tooling.** Offensive tools are interactive
   (`msfconsole`, `sliver-client`, `evil-winrm`). Kerox runs them inside
   persistent terminal sessions and answers interactive prompts, instead
   of scripting around them.
4. **Hardened sandbox isolation.** Operations run in an isolated Kali
   sandbox on a dedicated operational network, separate from the
   management plane the tool runs on.
5. **Offense serves defense.** A planned attack → defend → verify loop
   turns each finding into a defensive improvement and proves it holds.

---

## The shape of it

One control plane, a roster of specialist agents, a hard gate, a sandbox.

```
 you ─chat─► krx  (the Rust binary = the whole control plane)
             │  plans the engagement · maps the chain to MITRE ATT&CK
             │  THE GATE: scope check · dry-run default · human approval
             │  the only thing that drives the sandbox
             │
             ├─ dispatches specialist agents
             │    Spearhead — the LLM / AI red-team agent (the spearhead)
             │    network   — recon and the conventional surface
             │    report    — the engagement write-up, ATT&CK / ATLAS mapped
             │
             └─ executes approved, in-scope actions only ─►
                  Kali sandbox (operational network) · interactive tool sessions
```

The control plane is **Rust** — for a single trustworthy static binary
you can reason about, and a safety gate the fallible model brain can
never route around. The LLM-heavy work runs in **Python** workers behind
that boundary; they propose, they never fire. Vendor-neutral by design:
nothing is tied to one model provider or one C2.

### Spearhead — the wedge

Spearhead is the lead agent and the reason Kerox has the shape it does.
It is pointed at the AI now wired into real systems, and it probes the
failure modes only a language model has — prompt injection, system-prompt
leakage, guardrail bypass, tool-call exfiltration — and reports each
finding against the **OWASP LLM Top 10** and **MITRE ATLAS**, so it lands
in a framework defenders already use.

---

## The build order

We build the brakes before the engine. The gate and the sandbox come
before any attack capability.

| Stage | What lands |
|---|---|
| Foundations | the `krx` binary skeleton, the core types, a dry-run loop that executes nothing |
| The gate | scope file + hard scope check, dry-run default, per-step human approval, append-only audit |
| The executor | interactive tool sessions (persistent terminal), gated |
| The sandbox | the Kali sandbox + the two-plane isolation |
| Models | the worker boundary + vendor-neutral, on-prem model access |
| The orchestrator | the plan → gate → act → observe loop, mapped to ATT&CK |
| **Spearhead** | the LLM / AI red-team agent — the wedge |
| **v0.1 MVP** | orchestrator + Spearhead + network + report, under the gate, in the terminal |
| Engagement package | the full RoE / ConOps / Deconfliction / OPPLAN discipline |
| Attack → defend → verify | findings become defensive improvements, proven |
| First public drop | hardening, an honest safety statement, the first release of `krx` |

The forum (The Den) opens around the MVP, for people who run real
engagements.

---

## Authorization & ethics

Kerox is an offensive tool, and offensive tools have to be honest about
what they are for. It is built to be run by people with permission,
against systems they are allowed to test, inside a scope they wrote down.

- **Authorized scope only.** No scope file, no run.
- **Dry-run by default.** Live actions need an explicit human yes.
- **Sandboxed.** Operations stay on the operational network.
- **Findings exist to be fixed,** not collected.

If a future version of Kerox makes it easy to skip the gate or run
outside scope, that is a bug, and a serious one.

Security contact: `security@kerox.dev` · PGP at
`kerox.dev/.well-known/pgp-key.txt`.

---

## Reading

- OWASP Top 10 for LLM Applications — <https://owasp.org/www-project-top-10-for-large-language-model-applications/>
- MITRE ATLAS — <https://atlas.mitre.org/>
- MITRE ATT&CK — <https://attack.mitre.org/>
- Kali Linux — <https://www.kali.org/>

<!-- TODO: link the public Kerox repo here once it exists — do not invent a URL before it does. -->
