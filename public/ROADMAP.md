# KEROX OS — Roadmap

> **KeroxOS** — a TTY-only, `x86_64` console Linux distribution for
> offensive operators. It boots straight to a prompt and comes loaded: a
> curated arsenal of ~150 red-team tools, a package manager (`krx`) that
> builds them from source, a kernel tuned for the work, and an autonomous
> AI red-team agent (Spearhead) pointed at the LLM surface. Everything is
> open. Everything is in progress. Everything is by hand.

This is the public roadmap for KeroxOS: what it is, what we are building,
in what order, and to what bar. It is a living document, edited as we
build, and it tracks the canonical build order.

> **Status.** Nothing here is released, downloadable, or
> production-ready. Dates are targets, not promises. Where a line
> describes a capability, read it as an intention unless it says
> otherwise. KeroxOS is an offensive distribution, for **authorized**
> testing only.

---

## What KeroxOS is (and isn't)

Most security distributions are a desktop with a menu of tools bolted
on. KeroxOS is the opposite bet.

- **A desktop distro** boots to a window manager and hides the work
  behind a GUI.
- **KeroxOS** boots to a console and nothing else, and assumes an
  operator who lives at a prompt is faster, scriptable, and honest about
  what the machine is doing.

It is **not** an Android/ARM overlay, not a desktop with a tiling window
manager, not a point-and-shoot appliance. It runs in a console, over SSH
or a serial line, on minimal hardware, on your own infrastructure,
including fully air-gapped.

---

## The hard constraints

These are load-bearing. Everything else follows from them.

- **Architecture** — `amd64 / x86_64` only. Everything is built for one
  triple: `x86_64-linux-gnu`.
- **Interface** — TTY-only. No X11, no Wayland, no display server, no GUI
  apps in the base. Everything runs in a console.
- **Lineage** — off Android/ARM. KeroxOS is built as an x86_64 console
  distro (think minimal netinst / Arch-like base + `krx`), not an
  Android-on-phone overlay.

What that costs, and what it doesn't:

- The old ARM phone kernel is the wrong architecture and is **dropped**;
  we build a mainline x86_64 kernel instead.
- GUI-only tools are dropped or run headless — ZAP as a daemon,
  mitmproxy in its console TUI, PE analysis via CLI rather than a Qt
  viewer.
- Mobile *analysis* tools stay. They run fine on x86_64 — they analyze
  mobile apps, they don't need to *be* on a phone.
- Hardware tools (wireless, RF, smartcard, CAN) still need their physical
  adapters on the x86_64 host. That is unchanged.

---

## The shape of it

A small base, a package manager that builds everything from source, an
arsenal across 14 levels, and an AI agent pointed at the LLM surface.

```
 you ─prompt─► krx  (the package manager = the heart of the OS)
               │  resolves Kerox codenames → real upstream repos
               │  builds the arsenal from source for x86_64-linux-gnu
               │  the clone URLs are unchanged — read the source you run
               │
               ├─ base       Kerox-base · Keroedit · Pixterm (TTY only)
               ├─ kernel     mainline x86_64 · console-first · pentest drivers
               ├─ runtimes   Kpython · Krust · Knim · Kfrida · Kgo
               ├─ arsenal    ~150 tools · 14 levels · every one renamed
               └─ Spearhead  the LLM / AI red-team agent — the wedge
                             findings mapped to OWASP LLM Top 10 + MITRE ATLAS
```

`krx` is the defining program: it resolves every tool's Kerox **codename**
to its real upstream repository and builds it from source. The rename is
a brand, not a fork — `Cartograph` is nmap, built from nmap's own tree;
the unchanged URL keeps it honest.

### Spearhead — the wedge

Spearhead is the lead agent and the reason KeroxOS carries a dedicated AI
track. It is pointed at the AI now wired into real systems, and it probes
the failure modes only a language model has — prompt injection,
system-prompt leakage, guardrail bypass, tool-call exfiltration — and
reports each finding against the **OWASP LLM Top 10** and **MITRE
ATLAS**, so it lands in a framework defenders already use.

---

## The arsenal — 14 levels

Roughly 150 tools, ordered by learning curve: gentle warm-up utilities
first, the steepest binary and RF work last. Every tool is real and
upstream, given a Kerox codename. A sample of each level:

| Level | Focus | Sample codenames (← upstream) |
|---|---|---|
| L1  | warm-up utilities      | Netcleave · Ghostname (maigret) · Weaver (spiderfoot) |
| L2  | web content discovery   | Pathfinder (dirsearch) · Fuzzfang (wfuzz) · Crawl (Photon) |
| L3  | dns & subdomain         | Floodns (massdns) · Subscout (Sublist3r) · Dnsdig (dnsrecon) |
| L4  | http recon / fingerprint| Imprint (whatweb) · Probe (httpx) · Stinger (nuclei) |
| L5  | network scanning        | Cartograph (nmap) · Sweep (masscan) · Prowl (netdiscover) |
| L6  | web app exploitation    | Injector (sqlmap) · Crossfire (xsstrike) · Tokenrip (jwt_tool) |
| L7  | password attacks        | Hashreaper (hashcat) · Ripper (john) · Manyfang (thc-hydra) |
| L8  | mitm / proxy / tunnel   | Interpose (mitmproxy) · Wormhole (sshuttle) · Pivot (pwncat) |
| L9  | exploitation / c2 / ad  | Warhead (metasploit) · Overlord (NetExec) · Bloodtrail (BloodHound.py) |
| L10 | mobile (android / ios)  | Apkforge (apktool) · Dexlight (jadx) · Hookpoint (objection) |
| L11 | wireless / rf / ble     | Airbane (aircrack-ng) · Bluefang (btlejack) · Swiftknife (bettercap) |
| L12 | reversing / binary      | Dissect (rizin) · Fuzzstorm (AFL++) · Firmwalk (binwalk) |
| L13 | telecom / ics / iot     | Sixstrike (thc-ipv6) · Modbreaker (smod) · Canbox (cantoolz) |
| L14 | stress / dos            | Slowstorm (slowhttptest) · Packetforge (bit-twist) |

### Re-homed off Go

Most Go tools were swapped for Python or Shell equivalents to keep the
build surface small and the runtimes few. Three Go programs are kept
because nothing matches them: `Stinger` (nuclei), `Swiftknife`
(bettercap), and the `Kgo` runtime that builds them.

### Headless or dropped

- `Zephyr` (ZAP) runs daemon/headless only — `zap.sh -daemon` plus the
  API, no Java GUI.
- `Interpose` (mitmproxy) uses the console TUI / `mitmdump`, never
  `mitmweb`.
- Qt-only tools like pe-bear are dropped; PE/ELF work goes through
  `Peeler` (LIEF) and `Dissect`.

---

## The AI / LLM track

A parallel track for KeroxOS's AI-security stack — the toolset Spearhead
drives. Like the rest of the arsenal, every tool is real and upstream,
renamed, URLs unchanged, ordered by its own learning curve. Slot it in
around the conventional L6–L9 work.

| Tier | Focus | Sample codenames (← upstream) |
|---|---|---|
| AI-1 | guardrails & filters    | Mindguard (llm-guard) · Deflect (rebuff) · Railmind (NeMo-Guardrails) |
| AI-2 | model supply-chain      | Modelsift (modelscan) · Unpickle (fickling) |
| AI-3 | red teaming             | Mindprobe (garak) · Redmind (deepteam) · Inquisitor (PyRIT) · Agentbane (agentic_security) |
| AI-4 | adversarial ML          | Adverforge (ART) · Textbreak (TextAttack) · Suffixstorm (llm-attacks) |

---

## The build order

We build the tools first, climbing the learning curve, then assemble the
OS layer that hosts them last. Within the automation layer, the brakes
land before the engine: the gate and the dry-run loop come before any
autonomous attack capability.

| Stage | What lands |
|---|---|
| Arsenal L1–L4   | warm-up utilities, web content discovery, dns/subdomain, http recon — the build loop, working |
| Arsenal L5–L9   | network scanning, web app exploitation, password attacks, mitm/proxy, exploitation / c2 / ad |
| Arsenal L10–L14 | mobile, wireless / rf / ble, reversing / binary / fuzz, telecom / ics / iot, stress / dos |
| AI track AI-1 → AI-4 | guardrails, model supply-chain, red teaming, adversarial ML — slotted in around L6–L9 |
| **Spearhead**   | the LLM / AI red-team agent — the wedge — mapped to OWASP LLM Top 10 + MITRE ATLAS |
| The autonomous layer | the orient → decide → gate → act → observe loop, mapped to ATT&CK |
| Engagement discipline | the full RoE / ConOps / Deconfliction / OPPLAN package, written before any packet |
| The gate & the sandbox | dry-run default, per-step human approval, scope re-checked at execution, two-plane split |
| **OS layer · base userland** (L15) | Pixterm · Foxdrive (headless) · Keroedit — the console environment |
| **OS layer · runtimes** (L16) | Kpython · Krust · Knim · Kpipx · Kfrida · Kgo — pinned toolchain installers |
| **OS layer · base + krx + kernel** (L17) | Kerox-base, `krx` (the package manager), the mainline x86_64 kernel — final assembly |
| First public drop | hardening, an honest safety statement, the first release of `krx` and a bootable image |

The forum (The Den) opens around the first public drop, for people who
run real engagements.

---

## Authorization & ethics

KeroxOS is an offensive distribution, and offensive tools have to be
honest about what they are for. It is built to be run by people with
permission, against systems they are allowed to test, inside a scope they
wrote down.

- **Authorized scope only.** No scope file, no automated run.
- **Dry-run by default.** Live actions need an explicit human yes.
- **Two planes.** Operations stay on the operational network, separate
  from the management plane you decide from.
- **Findings exist to be fixed,** not collected.

If a future version of KeroxOS makes it easy to skip the gate or run
outside scope, that is a bug, and a serious one.

Security contact: `security@kerox.dev` · PGP at
`kerox.dev/.well-known/pgp-key.txt`.

---

## Reading

- OWASP Top 10 for LLM Applications — <https://owasp.org/www-project-top-10-for-large-language-model-applications/>
- MITRE ATLAS — <https://atlas.mitre.org/>
- MITRE ATT&CK — <https://attack.mitre.org/>
- Kali Linux — <https://www.kali.org/>

<!-- TODO: link the public KeroxOS repo here once it exists — do not invent a URL before it does. -->
