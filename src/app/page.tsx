import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   KeroxLabs — Issue 04 · the journal of a small systems lab
   KeroxOS — a TTY-only, x86_64 console Linux distro for
   offensive operators. ONE typographic rule: serif italic for
   display, mono for everything else. Never mixed inside a phrase.
   ────────────────────────────────────────────────────────── */

const NAV = [
  { label: "SYSTEM",    href: "#system" },
  { label: "ARSENAL",   href: "#arsenal" },
  { label: "SPEARHEAD", href: "#spearhead" },
  { label: "RESEARCH",  href: "/research" },
  { label: "FORUM",     href: "#den" },
  { label: "GITHUB",    href: "https://github.com/keroxlabs" },
];

const CHAPTERS = [
  { num: "I",   ttl: "A console that comes loaded",        href: "#system",     page: "P. 02" },
  { num: "II",  ttl: "The arsenal — 150+ tools, renamed",  href: "#arsenal",    page: "P. 04" },
  { num: "III", ttl: "Spearhead — pointed at the AI",      href: "#spearhead",  page: "P. 06" },
  { num: "IV",  ttl: "Discipline before the first packet", href: "#discipline", page: "P. 08" },
  { num: "V",   ttl: "The den — a forum, opening soon",    href: "#den",        page: "P. 10" },
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
            <span>FROM THE WORKSHOP · A SECURITY OS</span>
          </div>

          <h1
            className="reveal display text-[44px] sm:text-[60px] md:text-[72px] lg:text-[84px]"
            style={{ animationDelay: "120ms" }}
          >
            It boots to a prompt —
            <br />
            <span className="text-[var(--accent)]">and comes loaded</span>.
          </h1>

          <p
            className="reveal mt-7 max-w-[56ch] text-[14px] leading-[1.8] text-[var(--text)] sm:text-[15px]"
            style={{ animationDelay: "260ms" }}
          >
            KeroxOS is a TTY-only, x86_64 console Linux distribution for
            offensive operators. No display server, no desktop — it boots
            straight to a prompt and ships a curated arsenal of red-team tools,
            a package manager (<span className="text-[var(--accent-bright)]">krx</span>)
            that builds them from source, a kernel tuned for the work, and an
            autonomous agent pointed at the AI surface. Built in the open, by
            hand.
          </p>

          <div
            className="reveal mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "380ms" }}
          >
            <a href="#system" className="btn-primary">WHAT IT IS</a>
            <a href="https://github.com/keroxlabs" className="btn-ghost">
              GITHUB <span className="text-[var(--accent)]">↗</span>
            </a>
          </div>

          <div
            className="reveal mt-10 grid grid-cols-3 gap-y-3 text-[10px] tracking-[0.3em] text-[var(--text-dim)]"
            style={{ animationDelay: "480ms" }}
          >
            <div>
              <div className="text-[var(--text-dimmer)]">INTERFACE</div>
              <div className="text-[var(--ink)]">TTY-ONLY</div>
            </div>
            <div>
              <div className="text-[var(--text-dimmer)]">ARCH</div>
              <div className="text-[var(--ink)]">x86_64</div>
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
              Five pieces — the system that boots to a console, the arsenal it
              ships, the Spearhead agent pointed at the AI, the discipline that
              gates the automation, and the forum we are opening.
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

function SystemVisual() {
  const facts = [
    { k: "os",        v: "KeroxOS · rolling" },
    { k: "kernel",    v: "6.x-kerox · x86_64" },
    { k: "interface", v: "console / tty · no X11" },
    { k: "base",      v: "minimal netinst · Arch-like" },
    { k: "packages",  v: "krx · built from source" },
    { k: "arsenal",   v: "150+ tools · 14 phases" },
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
          <span className="ml-3 text-[var(--text-dim)]">krx@kerox · tty1</span>
        </div>
        <span className="text-[var(--accent)]">CONSOLE</span>
      </div>

      {/* banner */}
      <div className="relative mt-3 mb-2 text-[var(--accent)]">
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div className="my-1 flex items-baseline gap-2 text-[12px] font-bold tracking-[0.42em] text-[var(--accent-bright)]">
          <span>░▓█ KEROX OS █▓░</span>
          <span className="text-[9px] font-normal tracking-[0.22em] text-[var(--text-dim)]">
            x86_64
          </span>
        </div>
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
      </div>

      {/* neofetch-style readout */}
      <div className="relative space-y-[2px] text-[var(--text-dim)]">
        <div>
          <span className="text-[var(--accent)]">$</span>{" "}
          <span className="text-[var(--ink)]">krx fetch</span>
        </div>
        <div className="mt-1 space-y-[2px]">
          {facts.map((f) => (
            <div
              key={f.k}
              className="grid grid-cols-[78px_1fr] items-baseline gap-2"
            >
              <span className="text-[var(--accent-bright)]">{f.k}</span>
              <span className="text-[var(--text)]">·· {f.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* status */}
      <div className="relative mt-3 text-[var(--ink)]">
        <span className="text-[var(--accent)]">[ TTY ]</span> no display server · everything in the console
      </div>

      {/* prompt */}
      <div className="relative mt-auto pt-3">
        <span className="text-[var(--accent)]">krx@kerox</span>
        <span className="text-[var(--text-dim)]">:</span>
        <span className="text-[var(--ink)]">~</span>
        <span className="text-[var(--text-dim)]">$ </span>
        <span className="caret" />
      </div>
    </div>
  );
}

function ArsenalVisual() {
  const installs = [
    { name: "cartograph", from: "nmap",    lvl: "L5" },
    { name: "sweep",      from: "masscan", lvl: "L5" },
    { name: "warhead",    from: "metasploit", lvl: "L9" },
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
          <span className="ml-3 text-[var(--text-dim)]">krx@kerox · ~</span>
        </div>
        <span className="text-[var(--accent)]">PKG MGR</span>
      </div>

      {/* banner */}
      <div className="relative mt-3 mb-2 text-[var(--accent)]">
        <div className="text-[9px] leading-none tracking-[0]">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div className="my-1 flex items-baseline gap-2 text-[12px] font-bold tracking-[0.42em] text-[var(--accent-bright)]">
          <span>░▓█ KRX █▓░</span>
          <span className="text-[9px] font-normal tracking-[0.22em] text-[var(--text-dim)]">
            package manager
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
          <span className="text-[var(--ink)]">krx install cartograph sweep warhead</span>
        </div>
        <div className="pl-3">
          <span>→ resolving codenames · upstream unchanged</span>{" "}
          <span className="text-[var(--accent-bright)]">[ OK ]</span>
        </div>

        <div className="mt-2 space-y-[2px]">
          {installs.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-[84px_18px_64px_40px] items-baseline gap-2"
            >
              <span className="text-[var(--ink)]">{p.name}</span>
              <span className="text-[var(--accent)]">←</span>
              <span className="text-[var(--text)]">{p.from}</span>
              <span className="text-[var(--accent-bright)]">{p.lvl}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pl-3">
          → built from source · <span className="text-[var(--accent-bright)]">3 / 3</span> installed
        </div>
      </div>

      {/* status */}
      <div className="relative mt-3 text-[var(--ink)]">
        <span className="text-[var(--accent)]">[ INFO ]</span> 150+ tools · every one renamed
      </div>

      {/* prompt */}
      <div className="relative mt-auto pt-3">
        <span className="text-[var(--accent)]">krx@kerox</span>
        <span className="text-[var(--text-dim)]">:</span>
        <span className="text-[var(--ink)]">~</span>
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
          <span>→ mindprobe · pyrit · OWASP LLM · ATLAS</span>{" "}
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

/* ────────────── THE ARSENAL — catalog grid ────────────── */

function Arsenal() {
  const phases = [
    {
      name: "recon",
      tag: "RECON · OSINT",
      tools: "Ghostname · Weaver · Beacon",
      desc: "Username OSINT across social media, automated threat-intel mapping, and exposed-host discovery via Shodan.",
      lvl: "L1–L4",
    },
    {
      name: "web",
      tag: "WEB APPLICATIONS",
      tools: "Pathfinder · Injector · Crossfire",
      desc: "Path and parameter discovery, automatic SQL-injection takeover, and an advanced XSS suite — the whole web surface.",
      lvl: "L2 · L6",
    },
    {
      name: "network",
      tag: "NETWORK · DNS",
      tools: "Cartograph · Sweep · Floodns",
      desc: "Advanced mapping, mass IP/port scanning, and a high-performance DNS resolver for the conventional surface.",
      lvl: "L3 · L5",
    },
    {
      name: "cracking",
      tag: "PASSWORD ATTACKS",
      tools: "Hashreaper · Ripper · Manyfang",
      desc: "GPU-accelerated cracking, John the Ripper jumbo, and a parallel network login brute-forcer.",
      lvl: "L7",
    },
    {
      name: "c2 · ad",
      tag: "EXPLOITATION · C2 · AD",
      tools: "Warhead · Overlord · Bloodtrail",
      desc: "A full exploitation framework, network-wide execution and lateral movement, and Active Directory ACL paths.",
      lvl: "L9",
    },
    {
      name: "wireless",
      tag: "WIRELESS · RF · BLE",
      tools: "Airbane · Bluefang · Swiftknife",
      desc: "WiFi auditing, a BLE swiss-army knife, and an 802.11 / BLE / Ethernet recon core — physical adapters required.",
      lvl: "L11",
    },
    {
      name: "reversing",
      tag: "RE · BINARY · FUZZ",
      tools: "Dissect · Fuzzstorm · Firmwalk",
      desc: "A UNIX-like reversing framework, AFL++ fuzzing, and firmware carving — all driven from the console.",
      lvl: "L12",
    },
    {
      name: "ai · llm",
      tag: "AI / LLM SECURITY",
      tools: "Mindprobe · Redmind · Inquisitor",
      desc: "LLM vulnerability scanning, a red-team framework mapped to OWASP/NIST, and PyRIT risk-identification automation.",
      lvl: "AI TRACK",
    },
  ];
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-6 pb-28 sm:px-10 sm:pb-36">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <div className="eyebrow"><span>THE CATALOG</span></div>
            <h3 className="display mt-4 text-[32px] leading-[1.05] sm:text-[42px]">
              Eight of fourteen <br /> phases.
            </h3>
          </div>
          <p className="max-w-[58ch] self-end text-[13px] leading-[1.8] text-[var(--text-dim)]">
            Every tool in KeroxOS is real and upstream — and renamed. The clone
            URLs still point at the original repos, so you can read the source
            you are building. Ordered by learning curve, from warm-up utilities
            to the steepest binary work. A sample below; the full catalog lives
            in the research book.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-px bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p) => (
            <li key={p.name} className="bg-[var(--bg)] px-6 py-7">
              <div className="flex items-baseline justify-between">
                <span className="display-roman text-[26px] text-[var(--ink)]">{p.name}</span>
                <span className="text-[9px] tracking-[0.3em] text-[var(--accent)]">
                  {p.lvl}
                </span>
              </div>
              <div className="mt-2 text-[10px] tracking-[0.26em] text-[var(--text-dim)] uppercase">
                {p.tag}
              </div>
              <div className="mt-3 font-mono text-[11px] leading-[1.5] text-[var(--accent-bright)]">
                {p.tools}
              </div>
              <p className="mt-3 text-[12px] leading-[1.7] text-[var(--text)]">
                {p.desc}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] tracking-[0.3em] text-[var(--text-dim)]">
          <span>150+ TOOLS · 14 PHASES · EVERY ONE RENAMED</span>
          <Link href="/research#arsenal" className="row-arrow inline-flex items-center gap-3 text-[var(--ink)] transition-all hover:text-[var(--accent-bright)]">
            FULL CATALOG <span className="text-[var(--accent)]">→</span>
          </Link>
        </div>
      </div>
    </section>
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
            <div className="marginalia mt-4">{"// a short note"}</div>
          </div>

          <figure className="relative">
            <span className="display absolute -left-2 -top-10 text-[140px] leading-none text-[var(--accent-dim)] sm:-top-14 sm:text-[180px]">
              “
            </span>
            <blockquote className="display text-[34px] leading-[1.18] text-[var(--ink)] sm:text-[48px] md:text-[58px]">
              A loaded console is just a liability without the discipline to point it.
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 text-[10px] tracking-[0.3em] text-[var(--text-dim)]">
              <span className="inline-block h-px w-10 bg-[var(--accent)]" />
              <span>KEROXLABS · JUN 2026</span>
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
    { tag: "BUILD",      title: "Getting Cartograph to compile against the kerox kernel", who: "anonymous", posts: "—" },
    { tag: "TTY",        title: "Driving Zephyr (ZAP) headless — no Java GUI, just the API", who: "anonymous", posts: "—" },
    { tag: "ATLAS",      title: "Mapping a Mindprobe finding to MITRE ATLAS",      who: "anonymous", posts: "—" },
    { tag: "REVIEW",     title: "What does a clean deconfliction plan look like?",  who: "anonymous", posts: "—" },
  ];
  return (
    <section id="den" className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-28 sm:px-10 sm:py-36">
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-[120px_1fr_auto] lg:items-end lg:gap-12">
          <div className="display text-[64px] leading-none text-[var(--accent)] sm:text-[80px]">
            V.
          </div>
          <div>
            <div className="eyebrow"><span>CHAPTER FIVE · THE DEN</span></div>
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
              run KeroxOS for real — operators, red teamers, and the defenders on
              the other side of them. Build notes, TTY tradecraft, ATLAS mapping
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
              KeroxLabs builds KeroxOS in the open. Patches, packaging fixes, new
              tool ports, and hard questions about doing offense responsibly —
              bring them. The bar is technical, the reply is fast, the door is
              unlocked.
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
      heading: "KEROXOS",
      items: [
        { label: "SYSTEM", href: "#system" },
        { label: "ARSENAL", href: "#arsenal" },
        { label: "SPEARHEAD", href: "#spearhead" },
      ],
    },
    {
      heading: "READ",
      items: [
        { label: "RESEARCH BOOK", href: "/research" },
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
          id="system"
          num="I"
          kicker="CHAPTER ONE · THE SYSTEM"
          title="A console that comes loaded."
          body={
            <>
              KeroxOS boots to a console and nothing else — no X11, no Wayland,
              no display server. It is an x86_64 Linux distribution built from a
              minimal, Arch-like base, on a mainline kernel configured for the
              work: console-first, with the NIC, USB, and monitor-mode WiFi
              drivers an operator actually needs. At the heart of it is{" "}
              <span className="text-[var(--accent-bright)]">krx</span>, the
              package manager that builds the whole arsenal from source. One
              machine, one prompt, everything within reach.
            </>
          }
          status="BUILDING"
          seed="0x0FF5E7"
          visual={<SystemVisual />}
          href="/research#system"
          cta="INSIDE THE OS"
        />
        <div className="divider-dash" />

        <Chapter
          id="arsenal"
          num="II"
          kicker="CHAPTER TWO · THE ARSENAL"
          title="150+ tools, renamed."
          body={
            <>
              KeroxOS ships a curated arsenal that spans the whole of offensive
              work — recon, web, network, cracking, C2, Active Directory,
              wireless, reversing, telecom, and a dedicated AI/LLM track. Every
              tool is real and upstream, given a Kerox codename:{" "}
              <span className="text-[var(--accent-bright)]">Cartograph</span> is
              nmap, <span className="text-[var(--accent-bright)]">Warhead</span>{" "}
              is metasploit,{" "}
              <span className="text-[var(--accent-bright)]">Hashreaper</span> is
              hashcat. They are ordered by learning curve and built to run in a
              terminal — GUI-only tools are dropped or driven headless. The
              clone URLs are unchanged, so you can study the source you run.
            </>
          }
          status="BUILDING"
          seed="0xA71A5"
          visual={<ArsenalVisual />}
          reverse
          href="/research#arsenal"
          cta="OPEN THE ARSENAL"
        />

        <Arsenal />
        <div className="divider-dash" />

        <Chapter
          id="spearhead"
          num="III"
          kicker="CHAPTER THREE · SPEARHEAD"
          title="Pointed at the AI."
          body={
            <>
              Spearhead is the autonomous agent inside KeroxOS, pointed at the AI
              now wired into real systems. It probes the failure modes only a
              language model has — prompt injection, system-prompt leakage,
              guardrail bypass, tool-call exfiltration — driving the OS&apos;s own
              AI/LLM track (<span className="text-[var(--accent-bright)]">Mindprobe</span>,{" "}
              <span className="text-[var(--accent-bright)]">Redmind</span>,{" "}
              <span className="text-[var(--accent-bright)]">Inquisitor</span>) and
              reporting every finding against the OWASP LLM Top 10 and MITRE
              ATLAS, so it lands in a framework defenders already use.
            </>
          }
          status="BUILDING"
          seed="0xC0BA17"
          visual={<SpearheadVisual />}
          href="/research#spearhead"
          cta="MEET SPEARHEAD"
        />
        <div className="divider-dash" />

        <Chapter
          id="discipline"
          num="IV"
          kicker="CHAPTER FOUR · ENGAGEMENT DISCIPLINE"
          title="Discipline before the first packet."
          body={
            <>
              A loaded OS is only as safe as the rules around it. Before a packet
              leaves the wire, KeroxOS&apos;s automation layer writes the
              engagement down — Rules of Engagement, a ConOps, a Deconfliction
              Plan, and an OPPLAN mapped to MITRE ATT&amp;CK — and then is built
              to refuse to step outside it. Every live action is dry-run by
              default and waits on an explicit human approval; nothing runs
              outside authorized scope. The tools are sharp; the discipline is
              what makes them defensible.
            </>
          }
          status="BUILDING"
          seed="0xC02FF1"
          visual={<EngagementVisual />}
          reverse
          href="/research#discipline"
          cta="READ THE RULES"
        />
        <div className="divider-dash" />

        <TheDen />
        <div className="divider-dash" />

        <PullQuote />
        <div className="divider-dash" />

        <SignOff />
      </main>

      <Footer />
    </div>
  );
}
