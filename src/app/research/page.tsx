import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   KeroxLabs Research — mdBook-style documentation site.
   How to build KeroxOS: a TTY-only, x86_64 console security
   distro, from kernel to arsenal. Every chapter is anchor-
   scrollable. Sticky sidebar TOC on desktop.
   ────────────────────────────────────────────────────────── */

const TOC: { num: string; id: string; title: string; eta?: string }[] = [
  { num: "00", id: "overview",     title: "Overview" },
  { num: "01", id: "constraints",  title: "Design constraints",            eta: "Q1 2026" },
  { num: "02", id: "base",         title: "The base system",               eta: "Q1 2026" },
  { num: "03", id: "kernel",       title: "The kernel",                    eta: "Q2 2026" },
  { num: "04", id: "krx",          title: "krx — the package manager",     eta: "Q1 2026" },
  { num: "05", id: "arsenal",      title: "The arsenal",                   eta: "rolling" },
  { num: "06", id: "runtimes",     title: "Languages & runtimes",          eta: "Q2 2026" },
  { num: "07", id: "spearhead",    title: "Spearhead — LLM red team",      eta: "Q2 2026" },
  { num: "08", id: "aitrack",      title: "The AI / LLM track",            eta: "Q2 2026" },
  { num: "09", id: "autonomy",     title: "The autonomous layer",          eta: "Q3 2026" },
  { num: "10", id: "discipline",   title: "Engagement discipline",         eta: "Q3 2026" },
  { num: "11", id: "gate",         title: "The gate & the sandbox",        eta: "Q3 2026" },
  { num: "12", id: "security",     title: "Authorization & ethics" },
  { num: "13", id: "contrib",      title: "Contributing & RFCs" },
  { num: "14", id: "glossary",     title: "Glossary" },
];

/* ──────────────── NAV (matches landing) ──────────────── */

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="KeroxLabs" width={26} height={26} priority />
          <span className="text-[11px] font-bold tracking-[0.34em] text-[var(--ink)]">
            KEROX<span className="text-[var(--accent)]">LABS</span>
          </span>
          <span className="hidden text-[10px] tracking-[0.24em] text-[var(--text-dimmer)] md:inline">
            · research
          </span>
        </Link>
        <nav className="flex items-center gap-8 text-[10px] tracking-[0.3em]">
          <Link href="/#system" className="nav-link hidden sm:inline">SYSTEM</Link>
          <Link href="/#arsenal" className="nav-link hidden sm:inline">ARSENAL</Link>
          <span className="text-[var(--accent)]">RESEARCH</span>
          <Link href="/#den" className="nav-link hidden sm:inline">FORUM</Link>
          <a href="https://github.com/keroxlabs" className="nav-link">GITHUB</a>
        </nav>
      </div>
      <div className="divider-dash" />
    </header>
  );
}

/* ──────────────── Sidebar ──────────────── */

function Sidebar() {
  return (
    <aside className="sticky top-[64px] hidden h-[calc(100vh-64px)] overflow-y-auto border-r border-[var(--rule)] pr-6 pt-10 lg:block">
      <div className="eyebrow mb-6">
        <span>RESEARCH · MDBOOK</span>
      </div>
      <h2 className="display mb-7 text-[28px]">
        Build it <br /> from scratch.
      </h2>
      <p className="mb-8 max-w-[28ch] text-[11.5px] leading-[1.75] text-[var(--text-dim)]">
        Everything we are figuring out while building KeroxOS — the base, the
        kernel, krx, the arsenal, and the agents on top — written down as we go.
        Notes, designs, and snippets, not a finished manual.
      </p>

      <nav>
        <div className="mb-3 text-[10px] tracking-[0.32em] text-[var(--accent)]">
          CHAPTERS
        </div>
        <ol className="space-y-[2px]">
          {TOC.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="group flex items-baseline gap-3 py-1.5 text-[12px] leading-[1.4] text-[var(--text)] hover:text-[var(--accent-bright)]"
              >
                <span className="w-6 shrink-0 text-[10px] tracking-[0.18em] text-[var(--text-dimmer)] group-hover:text-[var(--accent)]">
                  {c.num}
                </span>
                <span className="display-roman text-[14px] leading-[1.25] text-[var(--ink)] group-hover:text-[var(--accent-bright)]">
                  {c.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 border-t border-dashed border-[var(--rule-bright)] pt-6 text-[10px] tracking-[0.28em] text-[var(--text-dimmer)]">
        <div>VOL. 01 · JUN 2026</div>
        <div className="mt-2">EDITED LIVE</div>
        <Link href="/" className="mt-5 inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-bright)]">
          ← back to landing
        </Link>
      </div>
    </aside>
  );
}

/* ──────────────── Chapter primitive ──────────────── */

function Chapter({
  num,
  id,
  title,
  eta,
  children,
}: {
  num: string;
  id: string;
  title: string;
  eta?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-dashed border-[var(--rule-bright)] py-16 first:border-t-0 first:pt-2">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow"><span>CHAPTER {num}</span></div>
          <h2 className="display mt-3 text-[40px] leading-[1] sm:text-[52px]">
            {title}
          </h2>
        </div>
        {eta && (
          <span className="border border-dashed border-[var(--accent-dim)] px-3 py-1.5 text-[9px] tracking-[0.3em] text-[var(--accent)]">
            ETA · {eta}
          </span>
        )}
      </div>
      <div className="space-y-5 text-[14px] leading-[1.85] text-[var(--text)]">
        {children}
      </div>
    </section>
  );
}

/* ──────────────── Prose primitives ──────────────── */

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="display-roman mt-9 text-[20px] tracking-[0] text-[var(--ink)]">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[68ch]">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-2 max-w-[68ch] list-none space-y-2 text-[var(--text)]">
      {children}
    </ul>
  );
}
function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[14px_1fr] gap-3">
      <span className="text-[var(--accent)]">›</span>
      <span>{children}</span>
    </li>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="border border-[var(--rule)] bg-[var(--bg-panel)] px-1.5 py-0.5 text-[12.5px] text-[var(--accent-bright)]">
      {children}
    </code>
  );
}

function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="my-3 max-w-[68ch] overflow-x-auto border border-[var(--rule)] bg-[var(--bg-panel)] p-4 text-[12px] leading-[1.65] text-[var(--text)]">
      {children}
    </pre>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 max-w-[68ch] border-l-2 border-[var(--accent)] bg-[#0a0303] px-5 py-4 text-[12.5px] leading-[1.75] text-[var(--text)]">
      <span className="mr-2 text-[10px] tracking-[0.3em] text-[var(--accent)]">NOTE</span>
      {children}
    </div>
  );
}

/* ──────────────── Page ──────────────── */

export default function ResearchPage() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)] text-[var(--text)]">
      <Nav />

      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 px-6 sm:px-10 lg:grid-cols-[280px_1fr] lg:gap-12 lg:px-10">
        <Sidebar />

        <main className="min-w-0 py-12 lg:py-16">
          {/* HERO */}
          <div className="mb-16 border-b border-dashed border-[var(--rule-bright)] pb-12">
            <div className="eyebrow"><span>KEROXLABS · RESEARCH</span></div>
            <h1 className="display mt-5 text-[44px] leading-[0.98] sm:text-[64px] md:text-[80px]">
              How to build a TTY-only security OS, by hand.
            </h1>
            <p className="mt-7 max-w-[64ch] text-[15px] leading-[1.85] text-[var(--text)]">
              This is the working notebook for KeroxOS — a TTY-only, x86_64
              console Linux distribution for offensive operators: a base, a
              kernel, the <Code>krx</Code> package manager, and a curated arsenal
              of 150+ red-team tools. None of it is finished; this book is the
              design thinking as it happens. Sections that describe something
              still being built are marked <Code>ETA</Code> so you know what is
              real and what is planned.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] tracking-[0.3em] text-[var(--text-dim)]">
              <span>EDITION · LIVE</span>
              <span>STARTED · JAN 2026</span>
              <span className="text-[var(--accent)]">STATUS · WORK IN PROGRESS</span>
            </div>
          </div>

          {/* CHAPTERS */}
          <Chapter num="00" id="overview" title="Overview">
            <P>
              KeroxOS is a TTY-only, x86_64 console Linux distribution built for
              offensive operators. The short version: it boots to a prompt and
              nothing else, ships a curated arsenal of red-team tooling, builds
              that tooling from source with its own package manager, and runs an
              autonomous agent pointed at the AI surface. It is open, it is in
              progress, and it is built by hand.
            </P>
            <P>
              Most security distributions are a desktop with a menu of tools
              bolted on. KeroxOS is the opposite bet: no display server, no
              window manager, no GUI in the base — just a console, a kernel tuned
              for the work, and an arsenal that runs in a terminal. The wager is
              that an operator who lives at a prompt is faster, scriptable, and
              honest about what the machine is doing.
            </P>
            <H3>What you will find in this book</H3>
            <UL>
              <LI>The design constraints — why TTY-only, why x86_64, and why we left the ARM/Android lineage behind</LI>
              <LI>The base system and the mainline kernel, configured console-first</LI>
              <LI><Code>krx</Code>, the package manager that builds the whole arsenal from source</LI>
              <LI>The arsenal itself — 150+ tools across 14 phases, every one renamed, ordered by learning curve</LI>
              <LI>The language runtimes, and why most Go tools were re-homed to Python</LI>
              <LI><Code>spearhead</Code> and the AI/LLM track — how findings map to OWASP LLM Top 10 and MITRE ATLAS</LI>
              <LI>The autonomous layer, the engagement discipline, the human gate, and the ethics that bound all of it</LI>
            </UL>
            <H3>How to read it</H3>
            <P>
              Read top to bottom for the first 30 minutes to get the shape of
              the system. After that, jump by chapter — each section stands on
              its own. Where a chapter shows config or commands, treat it as a
              design sketch, not a shipped interface; the names will move before
              they settle.
            </P>
            <Note>
              Nothing here is released, downloadable, or production-ready yet.
              This is a vision document with running notes. If a sentence reads
              like a promise, read it as an intention.
            </Note>
          </Chapter>

          <Chapter num="01" id="constraints" title="Design constraints" eta="Q1 2026">
            <P>
              KeroxOS is an x86_64 console Linux distribution — think a minimal
              netinst, Arch-like base plus <Code>krx</Code> — not an
              Android-on-phone overlay. Earlier sketches leaned on an Android/ARM
              base; the current design leaves that behind entirely. The
              constraints below are load-bearing; everything else follows from
              them.
            </P>
            <H3>The hard constraints</H3>
            <UL>
              <LI><b>Architecture</b> — <Code>amd64 / x86_64</Code> only. Everything is built for one triple: <Code>x86_64-linux-gnu</Code>.</LI>
              <LI><b>Interface</b> — TTY-only. No X11, no Wayland, no display server, no GUI apps in the base. Everything runs in a console.</LI>
              <LI><b>Lineage</b> — off Android/ARM. The old phone kernel is gone; this is a desktop/server-class x86_64 distro.</LI>
            </UL>
            <H3>What that costs, and what it doesn&apos;t</H3>
            <UL>
              <LI>The old ARM phone kernel is the wrong architecture and is <b>dropped</b>; we build a mainline x86_64 kernel instead (see ch. 03).</LI>
              <LI>GUI-only tools are dropped or run headless — ZAP as a daemon, mitmproxy in its console TUI, PE analysis via CLI rather than a Qt viewer.</LI>
              <LI>Mobile <i>analysis</i> tools stay. They run fine on x86_64 — they analyze mobile apps, they don&apos;t need to <i>be</i> on a phone.</LI>
              <LI>Hardware tools (wireless, RF, smartcard, CAN) still need their physical adapters on the x86_64 host. That is unchanged.</LI>
            </UL>
            <Note>
              TTY-only is not nostalgia. A console is scriptable, fits over SSH
              and a serial line, survives on minimal hardware, and never hides a
              live action behind a window you forgot was open.
            </Note>
          </Chapter>

          <Chapter num="02" id="base" title="The base system" eta="Q1 2026">
            <P>
              The base is deliberately small — the files, the console
              environment, and the handful of userland utilities an operator
              needs before any tool is installed. Everything above it is a{" "}
              <Code>krx</Code> package.
            </P>
            <H3>What ships in base</H3>
            <UL>
              <LI><b>Kerox-base</b> — the base files and the console environment the rest of the system assembles on.</LI>
              <LI><b>Keroedit</b> — the default terminal editor, with nano and vim from base; no GUI editor.</LI>
              <LI><b>Pixterm</b> — terminal graphics and image viewing, for when you need to <i>see</i> something without a display server.</LI>
              <LI><b>Foxdrive</b> — a headless WebDriver, an optional add-on rather than base, installed only for automated web testing and always run <Code>--headless</Code>.</LI>
            </UL>
            <P>
              The rule for base is restraint: if it is not needed to bring up a
              usable console and reach <Code>krx</Code>, it is a package, not part
              of the base.
            </P>
          </Chapter>

          <Chapter num="03" id="kernel" title="The kernel" eta="Q2 2026">
            <P>
              KeroxOS runs a mainline x86_64 Linux kernel, custom-configured for
              the work. The previous lineage shipped an ARM phone kernel; that
              tree is the wrong architecture and has been dropped. The
              replacement is built from <Code>torvalds/linux</Code> with a config
              shaped around three things.
            </P>
            <UL>
              <LI><b>Console-first</b> — no DRM/GUI stack pulled in; the kernel comes up to a text console and stays there.</LI>
              <LI><b>Pentest NIC &amp; USB drivers</b> — the network and USB devices an operator actually plugs in are present in the build.</LI>
              <LI><b>Monitor-mode WiFi</b> — the wireless drivers and modes the RF arsenal needs (ch. 05, L11) are compiled in.</LI>
            </UL>
            <Note>
              The kernel is where the TTY-only decision becomes real. A kernel
              with no display stack cannot accidentally bring up a desktop, and a
              build that knows the operator&apos;s adapters is half of what makes
              the wireless tools usable at all.
            </Note>
          </Chapter>

          <Chapter num="04" id="krx" title="krx — the package manager" eta="Q1 2026">
            <P>
              <Code>krx</Code> is the heart of the OS. It is the package manager
              that resolves, fetches, builds, and installs the entire arsenal
              from source. If KeroxOS has a single defining program, this is it.
            </P>
            <H3>How it works</H3>
            <UL>
              <LI>Every tool has a Kerox <b>codename</b>; <Code>krx</Code> resolves the codename to a real upstream repository.</LI>
              <LI>The <b>clone URLs are unchanged</b> — they still point at the original upstream projects, so the source you build is the source you can read.</LI>
              <LI>Tools are <b>built from source</b> for the <Code>x86_64-linux-gnu</Code> target, not pulled as opaque binaries.</LI>
            </UL>
            <Pre>{`# illustrative — verbs and output will move
$ krx search c2
  warhead    ← metasploit   [L9]   full exploitation framework
  overlord   ← netexec      [L9]   network execution / lateral
  marauder   ← villain      [L9]   multi-session C2

$ krx install cartograph sweep
  → cartograph ← nmap     building from source… [ OK ]
  → sweep      ← masscan  building from source… [ OK ]

$ krx fetch                         # neofetch-style system readout`}</Pre>
            <Note>
              The rename is a brand, not a fork. <Code>Cartograph</Code> is nmap;
              it is built from nmap&apos;s own tree. The codename gives the OS a
              coherent identity; the unchanged URL keeps it honest.
            </Note>
          </Chapter>

          <Chapter num="05" id="arsenal" title="The arsenal" eta="rolling">
            <P>
              The arsenal is the reason to run KeroxOS. It is roughly 150 tools
              across 14 phases, ordered by learning curve — gentle warm-up
              utilities first, the steepest binary and RF work last — so the
              build (and the operator) climbs the curve in order.
            </P>
            <H3>The 14 phases</H3>
            <Pre>{`L1  warm-up utilities      Netcleave · Pulse · Ghostname · Weaver
L2  web content discovery  Pathfinder · Fuzzfang · Crawl
L3  dns & subdomain        Floodns · Subscout · Dnsdig
L4  http recon / fingerpr. Imprint · Probe · Stinger
L5  network scanning       Cartograph (nmap) · Sweep (masscan)
L6  web app exploitation   Injector (sqlmap) · Crossfire · Tokenrip
L7  password attacks       Hashreaper (hashcat) · Ripper · Manyfang
L8  mitm / proxy / tunnel  Interpose · Wormhole · Pivot
L9  exploitation / c2 / ad Warhead (metasploit) · Overlord · Bloodtrail
L10 mobile (android / ios) Apkforge · Dexlight · Hookpoint
L11 wireless / rf / ble    Airbane · Bluefang · Swiftknife (bettercap)
L12 reversing / binary     Dissect (rizin) · Fuzzstorm (AFL++) · Firmwalk
L13 telecom / ics / iot    Sixstrike · Modbreaker · Canbox
L14 stress / dos           Slowstorm · Packetforge`}</Pre>
            <H3>Re-homed off Go</H3>
            <P>
              Most Go tools were swapped for Python or Shell equivalents to keep
              the build surface small and the runtimes few. Three Go programs are
              kept because nothing matches them:{" "}
              <Code>Stinger</Code> (nuclei),{" "}
              <Code>Swiftknife</Code> (bettercap), and the{" "}
              <Code>Kgo</Code> runtime that builds them.
            </P>
            <H3>Headless or dropped</H3>
            <UL>
              <LI><Code>Zephyr</Code> (ZAP) runs daemon/headless only — <Code>zap.sh -daemon</Code> plus the API, no Java GUI.</LI>
              <LI><Code>Interpose</Code> (mitmproxy) uses the console TUI / <Code>mitmdump</Code>, never <Code>mitmweb</Code>.</LI>
              <LI>Qt-only tools like pe-bear are dropped; PE/ELF work goes through <Code>Peeler</Code> (LIEF) and <Code>Dissect</Code>.</LI>
            </UL>
            <Note>
              The codenames are a coherent set, not a gimmick:{" "}
              <Code>Hashreaper</Code>, <Code>Bloodtrail</Code>,{" "}
              <Code>Crossfire</Code>, <Code>Warhead</Code>. The full mapping —
              every codename, its upstream, its level — lives in the build order
              and ships with the OS.
            </Note>
          </Chapter>

          <Chapter num="06" id="runtimes" title="Languages & runtimes" eta="Q2 2026">
            <P>
              Because the arsenal is built from source, KeroxOS ships its own
              toolchain installers rather than relying on whatever a base image
              happens to carry. Each is a thin, pinned installer that{" "}
              <Code>krx</Code> can depend on.
            </P>
            <UL>
              <LI><Code>Kpython</Code> — a custom Python 3 build; the dominant runtime, since most of the arsenal is Python.</LI>
              <LI><Code>Krust</Code> — the Rust toolchain, for the systems-level pieces and a handful of Rust tools.</LI>
              <LI><Code>Knim</Code> — Nim, where a tool needs it.</LI>
              <LI><Code>Kpipx</Code> — pipx, for isolated Python application installs.</LI>
              <LI><Code>Kfrida</Code> — Frida, the dynamic-instrumentation runtime the mobile and RE tools lean on.</LI>
              <LI><Code>Kgo</Code> — the Go runtime, kept only for the three Go exceptions (ch. 05).</LI>
            </UL>
            <P>
              The bias is toward few runtimes, well pinned. Re-homing Go tools to
              Python was largely about not carrying a second large toolchain for
              a handful of programs.
            </P>
          </Chapter>

          <Chapter num="07" id="spearhead" title="Spearhead — LLM red team" eta="Q2 2026">
            <P>
              Spearhead is the lead agent and the reason KeroxOS carries a
              dedicated AI track. It is pointed at the AI in the stack — the
              chatbots, copilots, and tool-using agents now wired into real
              systems — and it probes the failure modes that are unique to
              language models, driving the OS&apos;s own AI/LLM tooling (ch. 08).
            </P>
            <H3>What it probes</H3>
            <UL>
              <LI><b>Prompt injection</b> — getting the model to follow attacker text instead of its instructions</LI>
              <LI><b>System-prompt leakage</b> — pulling the hidden instructions and configuration back out</LI>
              <LI><b>Guardrail bypass</b> — routing around the safety layer to reach restricted behavior</LI>
              <LI><b>Tool-call exfiltration</b> — abusing the model&apos;s tools to move data it should never move</LI>
            </UL>
            <H3>Mapped to the frameworks defenders use</H3>
            <P>
              A finding that nobody can act on is noise. Spearhead reports every
              result against the{" "}
              <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" className="text-[var(--accent-bright)] underline-offset-2 hover:underline">OWASP LLM Top 10</a>{" "}
              and{" "}
              <a href="https://atlas.mitre.org/" className="text-[var(--accent-bright)] underline-offset-2 hover:underline">MITRE ATLAS</a>,
              so it lands in vocabulary a security team already has policies and
              detections for.
            </P>
            <Pre>{`# illustrative mapping
prompt injection      LLM01   AML.T0051
system-prompt leak    LLM07   AML.T0054
guardrail bypass      LLM02   AML.T0054
tool-call exfil       LLM06   AML.T0057`}</Pre>
          </Chapter>

          <Chapter num="08" id="aitrack" title="The AI / LLM track" eta="Q2 2026">
            <P>
              Alongside the conventional 14 phases, KeroxOS carries a parallel
              AI-security track. It is the toolset Spearhead drives, and it is
              what makes the AI claim more than marketing. Like the rest of the
              arsenal, every tool is real and upstream — renamed, URLs unchanged —
              and ordered by its own learning curve.
            </P>
            <H3>The four tiers</H3>
            <UL>
              <LI><b>AI-1 · Guardrails &amp; filters</b> — <Code>Mindguard</Code> (llm-guard), <Code>Deflect</Code> (rebuff), <Code>Railmind</Code> (NeMo-Guardrails). The easy on-ramp: wrap a model, filter in and out.</LI>
              <LI><b>AI-2 · Model supply-chain</b> — <Code>Modelsift</Code> (modelscan) and <Code>Unpickle</Code> (fickling), for scanning model files and pickles for malicious code.</LI>
              <LI><b>AI-3 · Red teaming</b> — the core skill: <Code>Mindprobe</Code> (garak), <Code>Redmind</Code> (deepteam), <Code>Inquisitor</Code> (PyRIT), <Code>Agentbane</Code> (agentic_security).</LI>
              <LI><b>AI-4 · Adversarial ML</b> — the steep, math-heavy end: <Code>Adverforge</Code> (ART), <Code>Textbreak</Code> (TextAttack), <Code>Suffixstorm</Code> (GCG suffixes).</LI>
            </UL>
            <Note>
              The track is slotted in around the conventional Level 6–9 work:
              once you are comfortable scripting Python tooling, the AI red-team
              tools are the same muscle pointed at a model instead of a host.
            </Note>
          </Chapter>

          <Chapter num="09" id="autonomy" title="The autonomous layer" eta="Q3 2026">
            <P>
              On top of the OS sits an optional autonomous layer — an
              orchestrator that can read an engagement plan and work an objective
              the way an adversary would, dispatching the arsenal rather than
              running a fixed battery of checks. It never touches a target
              directly; it reasons, sequences, and hands concrete tasks to the
              tools.
            </P>
            <H3>The loop</H3>
            <UL>
              <LI><b>Orient</b> — read the plan, the scope, and whatever has been learned so far</LI>
              <LI><b>Decide</b> — pick the next technique that moves the objective forward</LI>
              <LI><b>Gate</b> — if the step is a live action, stop and ask a human (ch. 11)</LI>
              <LI><b>Act</b> — dispatch the approved task to the right tool in the arsenal</LI>
              <LI><b>Observe</b> — fold the result back in, then orient again</LI>
            </UL>
            <P>
              Every step the orchestrator plans is tagged with the MITRE
              ATT&amp;CK technique it corresponds to, so the chain reads like a
              real operation and the eventual report speaks a language the blue
              team already uses.
            </P>
            <Note>
              The autonomous layer is a capability of KeroxOS, not its whole
              point. The OS is useful at a prompt with no agent running at all;
              the orchestrator is for when you want the machine to drive.
            </Note>
          </Chapter>

          <Chapter num="10" id="discipline" title="Engagement discipline" eta="Q3 2026">
            <P>
              This is the part that separates a red team from a vandal. Before
              the automation layer sends a packet, it writes the engagement down —
              and is built to refuse to step outside what it wrote.
            </P>
            <H3>The engagement package</H3>
            <UL>
              <LI><b>Rules of Engagement (RoE)</b> — what is in scope, what is off-limits, the hours, the hard stops</LI>
              <LI><b>ConOps</b> — the concept of operations: what we are trying to achieve and how, in plain language</LI>
              <LI><b>Deconfliction Plan</b> — how to tell our activity apart from a real incident, and who to call</LI>
              <LI><b>OPPLAN</b> — the operational plan, with each intended action mapped to MITRE ATT&amp;CK</LI>
            </UL>
            <Pre>{`# illustrative scope file — the boundary, not a suggestion
scope:
  in:   ["10.10.0.0/24", "app.example-lab.internal"]
  out:  ["*.prod.example.com", "anything not listed"]
  hours: "Mon–Fri 09:00–17:00, operator timezone"
  hard_stops:
    - "any sign of real user impact"
    - "any host outside 'in'"`}</Pre>
            <Note>
              Authorization is not a formality. KeroxOS is meant to be run
              against systems you are explicitly permitted to test, inside the
              scope you wrote down. That constraint is load-bearing.
            </Note>
          </Chapter>

          <Chapter num="11" id="gate" title="The gate & the sandbox" eta="Q3 2026">
            <P>
              Autonomy without a brake is just a liability. The OS is fast at a
              prompt, but the automation layer is dry-run by default and stops at
              an explicit human approval before any live action touches anything
              real.
            </P>
            <H3>Dry-run is the default, not an option</H3>
            <Pre>{`$ krx run --plan engagement.kx        # build the chain, send nothing
  → 11 steps planned · 0 executed · review required

$ krx approve --step 03               # arm a single live action
  → step 03 armed · scope check passed

$ krx run --execute --step 03         # fire only what was approved
  → [HOLD] confirm: live action against 10.10.0.14 ? [y/N]`}</Pre>
            <UL>
              <LI>Scope is re-checked at execution time, not just at plan time</LI>
              <LI>Approvals are per-step, not a single blanket &quot;go&quot;</LI>
              <LI>The default answer to every prompt is no</LI>
            </UL>
            <H3>Two planes</H3>
            <P>
              Offense stays in a box. The recommended deployment keeps a{" "}
              <b>management plane</b> — where you read plans and give approvals —
              separate from the <b>operational plane</b>, the KeroxOS instance on
              a dedicated operational network that actually runs the tools. The
              machine you decide from is not the machine that fires.
            </P>
            <Note>
              Isolation is a design goal, not a finished guarantee. Treat it like
              any lab boundary: necessary, and not a substitute for running only
              against scope you are authorized to touch.
            </Note>
          </Chapter>

          <Chapter num="12" id="security" title="Authorization & ethics">
            <P>
              KeroxOS is an offensive distribution, and offensive tools have to
              be honest about what they are for. It is built to be run by people
              with permission, against systems they are allowed to test, inside a
              scope they wrote down. The discipline chapters above are not
              decoration — they are the whole design constraint.
            </P>
            <H3>What that means in practice</H3>
            <UL>
              <LI>Authorized scope only. No scope file, no automated run.</LI>
              <LI>Dry-run by default. Live actions need an explicit human yes.</LI>
              <LI>Operations stay on the operational network, behind the two-plane split.</LI>
              <LI>Findings exist to be fixed, not collected.</LI>
            </UL>
            <H3>Reporting an issue in KeroxOS itself</H3>
            <P>
              When there is something to report, security contact goes to{" "}
              <Code>security@kerox.dev</Code>, with a PGP key published at{" "}
              <Code>kerox.dev/.well-known/pgp-key.txt</Code>. Responsible
              disclosure, the same way we would want it.
            </P>
          </Chapter>

          <Chapter num="13" id="contrib" title="Contributing & RFCs">
            <P>
              KeroxLabs builds in the open. New tool ports, packaging fixes for{" "}
              <Code>krx</Code>, kernel-config patches, and hard questions about
              doing offense responsibly are all welcome. The bar is technical;
              the response is fast.
            </P>
            <H3>RFC process</H3>
            <UL>
              <LI>Anything that touches the <Code>krx</Code> package format, the codename map, the kernel config, or the gate requires an RFC</LI>
              <LI>RFCs live in <Code>docs/rfcs/RFC-XXXX-&lt;slug&gt;.md</Code></LI>
              <LI>Discuss first in the forum (coming soon) or via issue; open a draft PR with the RFC</LI>
              <LI>Maintainer sign-off + a comment window before merge</LI>
            </UL>
            <H3>Porting a tool</H3>
            <UL>
              <LI>Keep the upstream clone URL unchanged — the rename is a codename, never a fork</LI>
              <LI>Default to the TTY path: headless flags, console TUIs, no GUI dependency in the package</LI>
              <LI>Prefer Python or Shell over adding a new runtime; a new toolchain needs a reason</LI>
              <LI>Anything that can take a live action gets a test that proves it cannot without approval</LI>
            </UL>
            {/* TODO: link the public KeroxOS repo here once it exists — do not invent a URL */}
          </Chapter>

          <Chapter num="14" id="glossary" title="Glossary">
            <UL>
              <LI><Code>KeroxOS</Code> — the TTY-only, x86_64 console Linux distribution this book describes.</LI>
              <LI><Code>krx</Code> — the Kerox package manager; resolves codenames, builds the arsenal from source. The heart of the OS.</LI>
              <LI><Code>codename</Code> — a Kerox name for an upstream tool (e.g. <Code>Cartograph</Code> = nmap). A brand, not a fork; the clone URL is unchanged.</LI>
              <LI><Code>TTY-only</Code> — no display server or GUI in the base; everything runs in a console.</LI>
              <LI><Code>arsenal</Code> — the curated set of ~150 red-team tools KeroxOS ships, across 14 phases.</LI>
              <LI><Code>phase / level</Code> — a band of the arsenal (L1–L14), ordered by learning curve from warm-up utilities to binary work.</LI>
              <LI><Code>AI track</Code> — the parallel AI/LLM-security toolset (AI-1 to AI-4) that Spearhead drives.</LI>
              <LI><Code>spearhead</Code> — the LLM/AI red-team agent; maps findings to OWASP LLM Top 10 and MITRE ATLAS.</LI>
              <LI><Code>orchestrator</Code> — the optional autonomous layer that sequences an attack chain and owns the human gate.</LI>
              <LI><Code>RoE / ConOps / OPPLAN</Code> — the engagement package: scope and rules, the concept of operations, and the ATT&amp;CK-mapped plan.</LI>
              <LI><Code>dry-run</Code> — plan and display an action without executing it. The default for the automation layer.</LI>
              <LI><Code>MITRE ATT&amp;CK / ATLAS</Code> — the technique frameworks used to tag the conventional chain and the AI work, respectively.</LI>
            </UL>
          </Chapter>

          {/* footer of book */}
          <div className="mt-16 border-t border-dashed border-[var(--accent-dim)] pt-10">
            <p className="display max-w-[36ch] text-[22px] leading-[1.35]">
              That is the whole book — for now.
            </p>
            <p className="mt-4 max-w-[60ch] text-[13px] leading-[1.8] text-[var(--text-dim)]">
              The rest is being written as we build KeroxOS. Subscribe to the
              forum when it opens, follow the org, or just check back. Notes that
              sharpen something here are welcome — this book is in the repo too.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] tracking-[0.3em] text-[var(--text-dim)]">
              <Link href="/" className="text-[var(--accent)] hover:text-[var(--accent-bright)]">
                ← BACK TO LANDING
              </Link>
              <a href="https://github.com/keroxlabs" className="hover:text-[var(--accent-bright)]">GITHUB →</a>
              <a href="mailto:contact@kerox.dev" className="hover:text-[var(--accent-bright)]">CONTACT@KEROX.DEV</a>
            </div>
          </div>
        </main>
      </div>

      {/* footer divider + small footer */}
      <div className="divider-dash" />
      <footer className="mx-auto w-full max-w-[1320px] px-6 py-10 text-[10px] tracking-[0.3em] text-[var(--text-dimmer)] sm:px-10">
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <span>© 2025 KEROXLABS · RESEARCH · MIT · APACHE-2.0</span>
          <span className="text-[var(--accent)]">OFFENSE IN THE SERVICE OF DEFENSE</span>
        </div>
      </footer>
    </div>
  );
}
