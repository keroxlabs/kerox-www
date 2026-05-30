import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   KeroxLabs — Issue 03 · the journal of a small systems lab
   ONE typographic rule: serif italic for display, mono for
   everything else. Never mixed inside a phrase.
   ────────────────────────────────────────────────────────── */

const NAV = [
  { label: "ORCHESTRATOR", href: "#orchestrator" },
  { label: "SPEARHEAD",    href: "#spearhead" },
  { label: "RESEARCH",     href: "/research" },
  { label: "FORUM",        href: "#den" },
  { label: "GITHUB",       href: "https://github.com/keroxlabs" },
];

const CHAPTERS = [
  { num: "I",   ttl: "An adversary, not a scanner",                  href: "#orchestrator", page: "P. 02" },
  { num: "II",  ttl: "Spearhead — an LLM red team",                  href: "#spearhead",    page: "P. 04" },
  { num: "III", ttl: "Discipline before the first packet",          href: "#discipline",   page: "P. 06" },
  { num: "IV",  ttl: "The den — a forum, opening soon",             href: "#den",          page: "P. 08" },
  { num: "V",   ttl: "The agents, run in a sealed lab",             href: "#tools",        page: "P. 10" },
];

/* ────────────── NAV ────────────── */

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 sm:px-10">
        <a href="#top" className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="KeroxLabs" width={26} height={26} priority />
          <span className="text-[11px] font-bold tracking-[0.34em] text-[var(--ink)]">
            KEROX<span className="text-[var(--accent)]">LABS</span>
          </span>
          <span className="hidden text-[10px] tracking-[0.24em] text-[var(--text-dimmer)] md:inline">
            · the journal
          </span>
        </a>
        <nav className="flex items-center gap-8 text-[10px] tracking-[0.3em] sm:gap-10">
          {NAV.map((n) =>
            n.href.startsWith("/") ? (
              <Link key={n.label} href={n.href} className="nav-link hidden sm:inline">
                {n.label}
              </Link>
            ) : (
              <a key={n.label} href={n.href} className="nav-link hidden sm:inline">
                {n.label}
              </a>
            )
          )}
          <a href="https://github.com/keroxlabs" className="nav-link sm:hidden">GITHUB</a>
        </nav>
      </div>
      <div className="divider-dash" />
    </header>
  );
}

/* ────────────── HERO (magazine cover) ────────────── */

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-10 sm:px-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pb-24 lg:pt-14">
        {/* LEFT — headline */}
        <div className="flex flex-col">
          <div className="reveal eyebrow mb-7" style={{ animationDelay: "60ms" }}>
            <span>FROM THE WORKSHOP</span>
          </div>

          <h1
            className="reveal display text-[44px] sm:text-[60px] md:text-[72px] lg:text-[84px]"
            style={{ animationDelay: "120ms" }}
          >
            An adversary,
            <br />
            <span className="text-[var(--accent)]">under discipline</span>.
          </h1>

          <p
            className="reveal mt-7 max-w-[54ch] text-[14px] leading-[1.8] text-[var(--text)] sm:text-[15px]"
            style={{ animationDelay: "260ms" }}
          >
            KeroxLabs is a small lab building Kerox — a Rust-native,
            terminal-first, vendor-neutral autonomous red team. An orchestrator
            reads an engagement plan and works an objective the way an adversary
            would — recon, exploitation, privilege escalation, lateral movement,
            C2 — not the way a scanner does. Every live action is dry-run by
            default and gated behind a human. Built in the open, by hand.
          </p>

          <div
            className="reveal mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "380ms" }}
          >
            <a href="#orchestrator" className="btn-primary">HOW IT WORKS</a>
            <a href="https://github.com/keroxlabs" className="btn-ghost">
              GITHUB <span className="text-[var(--accent)]">↗</span>
            </a>
          </div>

          <div
            className="reveal mt-10 grid grid-cols-3 gap-y-3 text-[10px] tracking-[0.3em] text-[var(--text-dim)]"
            style={{ animationDelay: "480ms" }}
          >
            <div>
              <div className="text-[var(--text-dimmer)]">SINCE</div>
              <div className="text-[var(--ink)]">JAN 2026</div>
            </div>
            <div>
              <div className="text-[var(--text-dimmer)]">FOCUS</div>
              <div className="text-[var(--ink)]">OFFENSIVE AI</div>
            </div>
            <div>
              <div className="text-[var(--text-dimmer)]">STAGE</div>
              <div className="text-[var(--accent)]">BUILDING</div>
            </div>
          </div>
        </div>

        {/* RIGHT — cobra polaroid */}
        <div
          className="reveal relative mx-auto w-full max-w-[400px]"
          style={{ animationDelay: "200ms" }}
        >
          <div className="polaroid">
            <div className="relative aspect-square">
              <span className="tick tick-tl" />
              <span className="tick tick-tr" />
              <span className="tick tick-bl" />
              <span className="tick tick-br" />
              <Image
                src="/logo.jpg"
                alt="KeroxLabs cobra"
                width={840}
                height={840}
                priority
                className="logo-glow h-full w-full object-cover mix-blend-screen"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(204,0,0,0.18),_transparent_60%)]" />
            </div>
            <div className="mt-4 flex items-center justify-between px-1">
              <span className="marginalia">FIG. 01</span>
              <span className="display-roman text-[15px] text-[var(--ink)]">
                Kerox · the lab cobra
              </span>
              <span className="marginalia">2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────── IN THIS ISSUE (TOC) ────────────── */

function Index() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-24 sm:px-10 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <div className="eyebrow"><span>CONTENTS</span></div>
            <h2 className="display mt-6 text-[44px] sm:text-[58px]">
              In this <br /> issue.
            </h2>
            <p className="mt-6 max-w-[36ch] text-[13px] leading-[1.75] text-[var(--text-dim)]">
              Five pieces — the orchestrator that runs an engagement, the
              Spearhead LLM agent, the discipline that gates every action, the
              forum we are opening, and the roster of agents behind it all.
            </p>
          </div>

          <ul>
            {CHAPTERS.map((c) => (
              <li key={c.num}>
                <a href={c.href} className="toc-row group">
                  <span className="lead">{c.num}.</span>
                  <span className="ttl">{c.ttl}</span>
                  <span className="pg">{c.page}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ────────────── CHAPTER ────────────── */

function Chapter({
  id,
  num,
  kicker,
  title,
  body,
  status,
  seed,
  visual,
  reverse = false,
  href,
  cta = "READ MORE",
}: {
  id: string;
  num: string;
  kicker: string;
  title: string;
  body: React.ReactNode;
  status: string;
  seed: string;
  visual: React.ReactNode;
  reverse?: boolean;
  href: string;
  cta?: string;
}) {
  return (
    <section id={id} className="row relative">
      <div className="mx-auto max-w-[1280px] px-6 py-24 sm:px-10 sm:py-32">
        {/* chapter heading band */}
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-[120px_1fr_auto] lg:items-end lg:gap-12">
          <div className="display text-[64px] leading-none text-[var(--accent)] sm:text-[80px]">
            {num}.
          </div>
          <div>
            <div className="eyebrow"><span>{kicker}</span></div>
            <h2 className="display mt-4 text-[44px] leading-[0.98] sm:text-[64px] md:text-[76px]">
              {title}
            </h2>
          </div>
          <Link href={href} className="row-arrow hidden text-[10px] tracking-[0.3em] text-[var(--ink)] transition-all lg:inline-flex lg:items-center lg:gap-3">
            {cta} <span className="text-[var(--accent)]">→</span>
          </Link>
        </div>

        {/* body + visual */}
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:gap-20 ${
            reverse ? "lg:grid-cols-[1fr_1.05fr]" : "lg:grid-cols-[1.05fr_1fr]"
          }`}
        >
          <div className={`row-visual aspect-[5/4] ${reverse ? "lg:order-2" : ""}`}>
            <span className="tick tick-tl" />
            <span className="tick tick-tr" />
            <span className="tick tick-bl" />
            <span className="tick tick-br" />
            {visual}
          </div>

          <div className={reverse ? "lg:order-1" : ""}>
            <p className="max-w-[58ch] text-[15px] leading-[1.85] text-[var(--text)] sm:text-[16px]">
              {body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-dashed border-[var(--rule-bright)] pt-6 text-[10px] tracking-[0.3em] text-[var(--text-dim)]">
              <span>
                STATUS{" "}
                <span className={status === "COMING SOON" || status === "BUILDING" ? "text-[var(--accent-bright)]" : "text-[var(--ink)]"}>
                  {status}
                </span>
              </span>
              <span>SEED <span className="text-[var(--ink)]">{seed}</span></span>
              <Link href={href} className="row-arrow ml-auto inline-flex items-center gap-3 text-[var(--ink)] transition-all">
                {cta} <span className="text-[var(--accent)]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────── CARD VISUALS ────────────── */

function OrchestratorVisual() {
  const lines = [
    { t: "recon",  tag: "T1595", desc: "active scan · surface mapped" },
    { t: "access", tag: "T1190", desc: "public-facing app · entry" },
    { t: "privesc",tag: "T1068", desc: "exploit · escalate to root" },
    { t: "lateral",tag: "T1021", desc: "remote svc · pivot inward" },
    { t: "collect",tag: "T1119", desc: "objective data located" },
    { t: "c2",     tag: "T1071", desc: "app-layer channel · beacon" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden p-4 font-mono text-[10.5px] leading-[1.5] sm:p-5">
      {/* CRT scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px)",
        }}
      />
      {/* red CRT glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(204,0,0,0.07), transparent 65%)",
        }}
      />

      {/* terminal chrome */}
      <div className="relative flex items-center justify-between border-b border-dashed border-[var(--rule-bright)] pb-2 text-[9px] tracking-[0.26em] text-[var(--text-dimmer)]">
        <div className="flex items-center gap-1.5">
          <span className="block h-2 w-2 bg-[var(--accent)]" />
          <span className="block h-2 w-2 bg-[var(--text-dimmer)]" />
          <span className="block h-2 w-2 bg-[var(--text-dimmer)]" />
          <span className="ml-3 text-[var(--text-dim)]">krx@kerox · /engagement</span>
        </div>
        <span className="text-[var(--accent)]">DRY-RUN</span>
      </div>

      {/* banner */}
      <div className="relative mt-3 mb-2 text-[var(--accent)]">
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div className="my-1 flex items-baseline gap-2 text-[12px] font-bold tracking-[0.42em] text-[var(--accent-bright)]">
          <span>░▓█ ORCHESTRATOR █▓░</span>
          <span className="text-[9px] font-normal tracking-[0.22em] text-[var(--text-dim)]">
            v0.0.1-α
          </span>
        </div>
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
      </div>

      {/* attack-chain plan */}
      <div className="relative space-y-[2px] text-[var(--text-dim)]">
        {lines.map((l) => (
          <div
            key={l.t}
            className="grid grid-cols-[64px_46px_56px_1fr] items-baseline gap-2"
          >
            <span className="text-[var(--ink)]">{l.t}</span>
            <span className="text-[var(--accent-bright)]">{l.tag}</span>
            <span className="text-[var(--text-dimmer)]">[plan]</span>
            <span className="text-[var(--text)]">·· {l.desc}</span>
          </div>
        ))}
      </div>

      {/* status */}
      <div className="relative mt-3 text-[var(--ink)]">
        <span className="text-[var(--accent)]">[ HOLD ]</span> live actions await human approval
      </div>

      {/* prompt */}
      <div className="relative mt-auto pt-3">
        <span className="text-[var(--accent)]">krx@kerox</span>
        <span className="text-[var(--text-dim)]">:</span>
        <span className="text-[var(--ink)]">/engagement</span>
        <span className="text-[var(--text-dim)]">$ </span>
        <span className="caret" />
      </div>
    </div>
  );
}

function SpearheadVisual() {
  const probes = [
    { name: "prompt injection",   ref: "LLM01", map: "AML.T0051" },
    { name: "system-prompt leak", ref: "LLM07", map: "AML.T0054" },
    { name: "guardrail bypass",   ref: "LLM02", map: "AML.T0054" },
    { name: "tool-call exfil",    ref: "LLM06", map: "AML.T0057" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden p-4 font-mono text-[10.5px] leading-[1.5] sm:p-5">
      {/* CRT scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(204,0,0,0.07), transparent 65%)",
        }}
      />

      {/* terminal chrome */}
      <div className="relative flex items-center justify-between border-b border-dashed border-[var(--rule-bright)] pb-2 text-[9px] tracking-[0.26em] text-[var(--text-dimmer)]">
        <div className="flex items-center gap-1.5">
          <span className="block h-2 w-2 bg-[var(--accent)]" />
          <span className="block h-2 w-2 bg-[var(--text-dimmer)]" />
          <span className="block h-2 w-2 bg-[var(--text-dimmer)]" />
          <span className="ml-3 text-[var(--text-dim)]">krx@kerox · ~/spearhead</span>
        </div>
        <span className="text-[var(--accent)]">DRY-RUN</span>
      </div>

      {/* banner */}
      <div className="relative mt-3 mb-2 text-[var(--accent)]">
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div className="my-1 flex items-baseline gap-2 text-[12px] font-bold tracking-[0.42em] text-[var(--accent-bright)]">
          <span>░▓█ SPEARHEAD █▓░</span>
          <span className="text-[9px] font-normal tracking-[0.22em] text-[var(--text-dim)]">
            llm red-team
          </span>
        </div>
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
      </div>

      {/* command + planned probes */}
      <div className="relative space-y-[2px] text-[var(--text-dim)]">
        <div>
          <span className="text-[var(--accent)]">$</span>{" "}
          <span className="text-[var(--ink)]">krx spearhead --target agent --plan</span>
        </div>
        <div className="pl-3">
          <span>→ loading OWASP LLM Top 10 · MITRE ATLAS</span>{" "}
          <span className="text-[var(--accent-bright)]">[ OK ]</span>
        </div>

        <div className="mt-2 space-y-[2px]">
          {probes.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-[18px_1fr_46px_64px] items-baseline gap-2"
            >
              <span className="text-[var(--accent)]">›</span>
              <span className="text-[var(--ink)]">{p.name}</span>
              <span className="text-[var(--accent-bright)]">{p.ref}</span>
              <span className="text-[var(--text-dimmer)]">{p.map}</span>
            </div>
          ))}
        </div>
      </div>

      {/* status */}
      <div className="relative mt-3 text-[var(--ink)]">
        <span className="text-[var(--accent)]">[ INFO ]</span> 4 probes mapped · queued for approval
      </div>

      {/* prompt */}
      <div className="relative mt-auto pt-3">
        <span className="text-[var(--accent)]">krx@kerox</span>
        <span className="text-[var(--text-dim)]">:</span>
        <span className="text-[var(--ink)]">~/spearhead</span>
        <span className="text-[var(--text-dim)]">$ </span>
        <span className="caret" />
      </div>
    </div>
  );
}

function EngagementVisual() {
  const artifacts = [
    { d: "01", t: "ROE",     desc: "rules of engagement",  done: true },
    { d: "02", t: "CONOPS",  desc: "concept of operations", done: true },
    { d: "03", t: "DECONF",  desc: "deconfliction plan",    done: true },
    { d: "04", t: "OPPLAN",  desc: "ATT&CK-mapped",         done: false },
  ];
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden p-4 font-mono text-[10.5px] leading-[1.5] sm:p-5">
      {/* CRT scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(204,0,0,0.07), transparent 65%)",
        }}
      />

      {/* terminal chrome */}
      <div className="relative flex items-center justify-between border-b border-dashed border-[var(--rule-bright)] pb-2 text-[9px] tracking-[0.26em] text-[var(--text-dimmer)]">
        <div className="flex items-center gap-1.5">
          <span className="block h-2 w-2 bg-[var(--accent)]" />
          <span className="block h-2 w-2 bg-[var(--text-dimmer)]" />
          <span className="block h-2 w-2 bg-[var(--text-dimmer)]" />
          <span className="ml-3 text-[var(--text-dim)]">krx@kerox · ~/engagement</span>
        </div>
        <span className="text-[var(--accent)]">PRE-FLIGHT</span>
      </div>

      {/* banner */}
      <div className="relative mt-3 mb-2 text-[var(--accent)]">
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div className="my-1 flex items-baseline gap-2 text-[12px] font-bold tracking-[0.42em] text-[var(--accent-bright)]">
          <span>░▓█ ENGAGEMENT █▓░</span>
          <span className="text-[9px] font-normal tracking-[0.22em] text-[var(--text-dim)]">
            package
          </span>
        </div>
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
      </div>

      {/* command + output */}
      <div className="relative space-y-[2px] text-[var(--text-dim)]">
        <div>
          <span className="text-[var(--accent)]">$</span>{" "}
          <span className="text-[var(--ink)]">krx plan --scope authorized.yaml</span>
        </div>

        <div className="mt-1 space-y-[2px]">
          {artifacts.map((s) => (
            <div
              key={s.d}
              className="grid grid-cols-[28px_44px_64px_1fr] items-baseline gap-2"
            >
              <span className="text-[var(--text-dimmer)]">{s.d}</span>
              <span className={s.done ? "text-[var(--accent-bright)]" : "text-[var(--text-dim)]"}>
                [ {s.done ? "OK" : "··"} ]
              </span>
              <span className="text-[var(--ink)]">{s.t}</span>
              <span className="text-[var(--text)]">·· {s.desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 pl-3">
          → package · <span className="text-[var(--accent-bright)]">3 / 4</span> artifacts drafted
        </div>
      </div>

      {/* status */}
      <div className="relative mt-3 text-[var(--ink)]">
        <span className="text-[var(--accent)]">[ HOLD ]</span> authorized scope · dry-run · awaiting sign-off
      </div>

      {/* prompt */}
      <div className="relative mt-auto pt-3">
        <span className="text-[var(--accent)]">krx@kerox</span>
        <span className="text-[var(--text-dim)]">:</span>
        <span className="text-[var(--ink)]">~/engagement</span>
        <span className="text-[var(--text-dim)]">$ </span>
        <span className="caret" />
      </div>
    </div>
  );
}

/* ────────────── PULL QUOTE (mission) ────────────── */

function PullQuote() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-32 sm:px-10 sm:py-44">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_3fr] lg:gap-16">
          <div>
            <div className="eyebrow"><span>EDITOR&apos;S LETTER</span></div>
            <div className="marginalia mt-4">// a short note</div>
          </div>

          <figure className="relative">
            <span className="display absolute -left-2 -top-10 text-[140px] leading-none text-[var(--accent-dim)] sm:-top-14 sm:text-[180px]">
              “
            </span>
            <blockquote className="display text-[34px] leading-[1.18] text-[var(--ink)] sm:text-[48px] md:text-[58px]">
              An adversary with no rules teaches you nothing — the discipline is what turns an attack into an answer.
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 text-[10px] tracking-[0.3em] text-[var(--text-dim)]">
              <span className="inline-block h-px w-10 bg-[var(--accent)]" />
              <span>KEROXLABS · MAY 2026</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ────────────── THE DEN — forum, coming soon ────────────── */

function TheDen() {
  const mockThreads = [
    { tag: "RFC",        title: "Writing a ConOps an agent can actually follow",   who: "anonymous", posts: "—" },
    { tag: "ATLAS",      title: "Mapping a tool-call exfil chain to MITRE ATLAS",   who: "anonymous", posts: "—" },
    { tag: "TRADECRAFT", title: "Keeping evil-winrm sessions alive across a pivot", who: "anonymous", posts: "—" },
    { tag: "REVIEW",     title: "What does a clean deconfliction plan look like?",  who: "anonymous", posts: "—" },
  ];
  return (
    <section id="den" className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-28 sm:px-10 sm:py-36">
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-[120px_1fr_auto] lg:items-end lg:gap-12">
          <div className="display text-[64px] leading-none text-[var(--accent)] sm:text-[80px]">
            IV.
          </div>
          <div>
            <div className="eyebrow"><span>CHAPTER FOUR · THE DEN</span></div>
            <h2 className="display mt-4 text-[40px] sm:text-[56px] md:text-[68px]">
              A forum, for people who run real engagements.
            </h2>
          </div>
          <span className="hidden border border-dashed border-[var(--accent)] px-3 py-1.5 text-[9px] tracking-[0.34em] text-[var(--accent-bright)] lg:inline-block">
            COMING SOON
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="max-w-[44ch] text-[14.5px] leading-[1.85] text-[var(--text)]">
              The Den is the slow, threaded forum we are building for people who
              do this for real — operators, red teamers, and the defenders on
              the other side of them. Pre-flight RoE arguments, ATLAS mapping
              threads, engagement postmortems, and the long debates about
              offensive AI that nobody else wants to host.
            </p>
            <p className="mt-5 max-w-[44ch] text-[13px] leading-[1.8] text-[var(--text-dim)]">
              No articles. No engagement metrics. Just a room with the
              right people in it. <span className="text-[var(--accent-bright)]">Opening Q2 2026.</span>
            </p>
            <form
              className="mt-8 flex max-w-[42ch] flex-col gap-3"
              action="mailto:contact@kerox.dev"
              method="post"
            >
              <label className="text-[10px] tracking-[0.32em] text-[var(--text-dim)]">
                GET A SEAT
              </label>
              <div className="flex border border-[var(--rule-bright)] bg-[var(--bg-panel)]">
                <input
                  type="email"
                  name="email"
                  placeholder="you@domain.dev"
                  className="w-full bg-transparent px-3 py-3 text-[13px] text-[var(--ink)] placeholder-[var(--text-dimmer)] outline-none"
                  required
                />
                <button
                  type="submit"
                  className="border-l border-[var(--rule-bright)] px-4 text-[10px] tracking-[0.3em] text-[var(--accent-bright)] hover:bg-[var(--accent)] hover:text-black"
                >
                  NOTIFY ME
                </button>
              </div>
              <span className="text-[10px] tracking-[0.26em] text-[var(--text-dimmer)]">
                we email once, when the doors open
              </span>
            </form>
          </div>

          {/* mock thread preview, dimmed to read as "coming soon" */}
          <div className="relative border border-[var(--rule)] bg-[var(--bg-elevated)]">
            <div className="flex items-center justify-between border-b border-dashed border-[var(--rule-bright)] px-4 py-3 text-[9px] tracking-[0.28em] text-[var(--text-dimmer)]">
              <span>forum.kerox.dev · /the-den</span>
              <span className="flex items-center gap-1.5">
                <span className="block h-2 w-2 bg-[var(--accent)]" />
                <span className="text-[var(--accent)]">PRE-LAUNCH</span>
              </span>
            </div>
            <ul className="relative">
              {mockThreads.map((t) => (
                <li
                  key={t.title}
                  className="grid grid-cols-[80px_1fr_auto] items-baseline gap-4 border-b border-dashed border-[var(--rule)] px-4 py-4 last:border-b-0"
                >
                  <span className="text-[10px] tracking-[0.28em] text-[var(--accent)]">{t.tag}</span>
                  <span className="display-roman text-[16px] leading-[1.3] text-[var(--ink)]">
                    {t.title}
                  </span>
                  <span className="text-[9px] tracking-[0.24em] text-[var(--text-dimmer)]">
                    {t.posts} POSTS
                  </span>
                </li>
              ))}
            </ul>

            {/* coming-soon overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(5,4,3,0.85),_rgba(5,4,3,0.95))]">
              <div className="border border-dashed border-[var(--accent)] bg-[var(--bg)]/85 px-7 py-5 text-center">
                <div className="text-[10px] tracking-[0.4em] text-[var(--accent-bright)]">
                  ░▓█ OPENING SOON █▓░
                </div>
                <div className="mt-2 display-roman text-[18px] text-[var(--ink)]">
                  A forum, not a feed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────── AGENTS ────────────── */

function Toolbox() {
  const agents = [
    {
      name: "spearhead",
      tag: "LLM / AI RED TEAM",
      desc: "Prompt injection, system-prompt leakage, guardrail bypass, tool-call exfil — mapped to OWASP LLM Top 10 and MITRE ATLAS.",
      status: "BUILDING",
    },
    {
      name: "network",
      tag: "RECON · NETWORK",
      desc: "Maps the attack surface and works services and trust paths — recon, enumeration, and lateral movement on authorized scope.",
      status: "PLANNED",
    },
    {
      name: "report",
      tag: "SYNTHESIS · REPORTING",
      desc: "Turns the engagement into a deliverable — narrative plus findings, mapped to MITRE ATT&CK and ATLAS, as Markdown, JSON, or SARIF.",
      status: "PLANNED",
    },
    {
      name: "web",
      tag: "WEB APPLICATIONS",
      desc: "The web surface — injection, access-control, and logic flaws — once the wedge and recon are solid.",
      status: "PLANNED",
    },
  ];
  return (
    <section id="tools" className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-28 sm:px-10 sm:py-36">
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-[120px_1fr_auto] lg:items-end lg:gap-12">
          <div className="display text-[64px] leading-none text-[var(--accent)] sm:text-[80px]">
            V.
          </div>
          <div>
            <div className="eyebrow"><span>CHAPTER FIVE · THE AGENTS</span></div>
            <h2 className="display mt-4 text-[40px] sm:text-[56px] md:text-[68px]">
              Specialist agents, run in a sealed lab.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p className="max-w-[44ch] text-[14px] leading-[1.85] text-[var(--text)]">
              The orchestrator does not do the work itself — it dispatches
              specialists. Spearhead leads on the AI; the network agent takes the
              conventional surface; the report agent turns the run into a
              deliverable. Each one drives real, interactive tools — msfconsole,
              sliver-client, evil-winrm — inside persistent terminal sessions,
              answering prompts the way a person would instead of scripting
              around them.
            </p>
            <p className="mt-5 max-w-[44ch] text-[12px] leading-[1.8] text-[var(--text-dim)]">
              Everything is designed to run in an isolated Kali sandbox on its
              own operational network, walled off from the machine that drives
              it. Offense stays in the box.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-px bg-[var(--rule)] sm:grid-cols-2">
            {agents.map((t) => (
              <li key={t.name} className="bg-[var(--bg)] px-7 py-8">
                <div className="flex items-baseline justify-between">
                  <span className="display-roman text-[32px] text-[var(--ink)]">{t.name}</span>
                  <span className="text-[9px] tracking-[0.3em] text-[var(--accent)]">
                    {t.status}
                  </span>
                </div>
                <div className="mt-2 text-[10px] tracking-[0.28em] text-[var(--text-dim)] uppercase">
                  {t.tag}
                </div>
                <p className="mt-4 text-[12px] leading-[1.7] text-[var(--text)]">
                  {t.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ────────────── SIGNOFF / CTA ────────────── */

function SignOff() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-28 sm:px-10 sm:py-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <div className="eyebrow"><span>SIGNOFF</span></div>
            <h2 className="display mt-6 text-[44px] leading-[1] sm:text-[64px] md:text-[76px]">
              Read the code. <br />
              Break it. <br />
              Write back.
            </h2>
            <p className="mt-7 max-w-[52ch] text-[14px] leading-[1.85] text-[var(--text)]">
              KeroxLabs builds in the open. Patches, exploits, and hard questions
              about doing offense responsibly — bring them. The bar is technical,
              the reply is fast, the door is unlocked.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <a href="https://github.com/keroxlabs" className="btn-primary">OPEN GITHUB</a>
            <a href="mailto:contact@kerox.dev" className="btn-ghost">CONTACT@KEROX.DEV</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────── FOOTER ────────────── */

function Footer() {
  const cols: { heading: string; items: { label: string; href: string }[] }[] = [
    {
      heading: "NODES",
      items: [
        { label: "GITHUB", href: "https://github.com/keroxlabs" },
        { label: "MAIL", href: "mailto:contact@kerox.dev" },
        { label: "PGP KEY", href: "#" },
      ],
    },
    {
      heading: "KEROX",
      items: [
        { label: "ORCHESTRATOR", href: "#orchestrator" },
        { label: "SPEARHEAD", href: "#spearhead" },
        { label: "AGENTS", href: "#tools" },
      ],
    },
    {
      heading: "READ",
      items: [
        { label: "RESEARCH BOOK", href: "/research" },
        { label: "ROADMAP", href: "/ROADMAP.md" },
        { label: "FORUM (SOON)", href: "#den" },
      ],
    },
  ];
  return (
    <footer className="relative">
      <div className="divider-dash" />
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="KeroxLabs" width={28} height={28} />
              <span className="text-[12px] font-bold tracking-[0.34em] text-[var(--ink)]">
                KEROX<span className="text-[var(--accent)]">LABS</span>
              </span>
            </div>
            <div className="mt-7 inline-flex flex-col gap-2 border-l-2 border-[var(--accent)] pl-4">
              <p className="text-[13px] font-bold uppercase tracking-[0.34em] leading-[1.7] text-[var(--accent-bright)]">
                Always compiling. <br />
                Always optimising.
              </p>
              <span className="text-[9px] tracking-[0.3em] text-[var(--text-dimmer)]">
                ── THE KEROXLABS TAGLINE ──
              </span>
            </div>
            <p className="mt-5 text-[10px] tracking-[0.3em] text-[var(--text-dim)]">
              compiled at 03:14 · signed with a steady hand
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.heading}>
              <div className="mb-5 text-[10px] tracking-[0.32em] text-[var(--accent)]">{c.heading}</div>
              <ul className="space-y-3">
                {c.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="nav-link text-[12px] tracking-[0.24em]">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 text-[10px] tracking-[0.3em] text-[var(--text-dimmer)] sm:flex-row sm:items-center">
          <span>© 2025 KEROXLABS · MIT · APACHE-2.0</span>
          <span className="text-[var(--accent)]">OFFENSE IN THE SERVICE OF DEFENSE</span>
        </div>
      </div>
    </footer>
  );
}

/* ────────────── PAGE ────────────── */

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)] text-[var(--text)]">
      <Nav />

      <main className="flex-1">
        <Hero />
        <div className="divider-dash" />

        <Index />
        <div className="divider-dash" />

        <Chapter
          id="orchestrator"
          num="I"
          kicker="CHAPTER ONE · THE ORCHESTRATOR"
          title="An adversary, not a scanner."
          body={
            <>
              Kerox is not a scanner that runs nmap and prints a report. An
              orchestrator reads an engagement plan, fixes on an objective, and
              works toward it through whatever path actually opens up — chaining
              reconnaissance, exploitation, privilege escalation, lateral
              movement, and C2 the way a real operator would. When a door closes
              it tries another. Findings are designed to feed a planned attack →
              defend → verify loop, so every result is something a defender can
              act on.
            </>
          }
          status="BUILDING"
          seed="0x0FF5E7"
          visual={<OrchestratorVisual />}
          href="/research#orchestrator"
          cta="SEE THE CHAIN"
        />
        <div className="divider-dash" />

        <Chapter
          id="spearhead"
          num="II"
          kicker="CHAPTER TWO · SPEARHEAD"
          title="An LLM red team."
          body={
            <>
              Spearhead is the agent pointed at the AI in the stack. It probes
              the things only a language model gets wrong — prompt injection,
              system-prompt leakage, guardrail bypass, tool-call exfiltration —
              and is designed to report every finding against the OWASP LLM Top
              10 and MITRE ATLAS, so it lands in a framework defenders already
              use. It leads; the network agent follows it onto the rest of the
              attack surface, and the report agent turns the run into something a
              defender can use.
            </>
          }
          status="BUILDING"
          seed="0xA71A5"
          visual={<SpearheadVisual />}
          reverse
          href="/research#spearhead"
          cta="MEET SPEARHEAD"
        />
        <div className="divider-dash" />

        <Chapter
          id="discipline"
          num="III"
          kicker="CHAPTER THREE · ENGAGEMENT DISCIPLINE"
          title="Discipline before the first packet."
          body={
            <>
              Before a packet leaves the wire, Kerox writes the engagement down —
              Rules of Engagement, a ConOps, a Deconfliction Plan, and an OPPLAN
              mapped to MITRE ATT&amp;CK — and then is built to refuse to step
              outside it. Every live action is dry-run by default and waits on an
              explicit human approval; nothing runs outside authorized scope. The
              whole thing is meant to read like a real operation, paperwork and
              safeties included — offense you could actually sign off on.
            </>
          }
          status="BUILDING"
          seed="0xC02FF1"
          visual={<EngagementVisual />}
          href="/research#discipline"
          cta="READ THE RULES"
        />
        <div className="divider-dash" />

        <TheDen />
        <div className="divider-dash" />

        <Toolbox />
        <div className="divider-dash" />

        <PullQuote />
        <div className="divider-dash" />

        <SignOff />
      </main>

      <Footer />
    </div>
  );
}
