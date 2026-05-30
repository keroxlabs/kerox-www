import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   KeroxLabs Research — mdBook-style documentation site.
   Every chapter is anchor-scrollable. Sticky sidebar TOC
   on desktop, collapsible top section on mobile.
   ────────────────────────────────────────────────────────── */

const TOC: { num: string; id: string; title: string; eta?: string }[] = [
  { num: "00", id: "overview",     title: "Overview" },
  { num: "01", id: "architecture", title: "Architecture",                  eta: "Q1 2026" },
  { num: "02", id: "orchestrator", title: "The orchestrator",              eta: "Q1 2026" },
  { num: "03", id: "spearhead",    title: "Spearhead — LLM red team",      eta: "Q2 2026" },
  { num: "04", id: "agents",       title: "Supporting agents",             eta: "Q2 2026" },
  { num: "05", id: "discipline",   title: "Engagement discipline",         eta: "Q1 2026" },
  { num: "06", id: "gate",         title: "The human gate",                eta: "Q1 2026" },
  { num: "07", id: "tooling",      title: "Interactive tooling",           eta: "Q3 2026" },
  { num: "08", id: "sandbox",      title: "The sandbox",                   eta: "Q3 2026" },
  { num: "09", id: "defense",      title: "Attack → defend → verify",      eta: "Q4 2026" },
  { num: "10", id: "cli",          title: "The krx CLI",                   eta: "Q4 2026" },
  { num: "11", id: "stack",        title: "Tech stack" },
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
          <Link href="/#orchestrator" className="nav-link hidden sm:inline">ORCHESTRATOR</Link>
          <Link href="/#spearhead" className="nav-link hidden sm:inline">SPEARHEAD</Link>
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
        Everything we are figuring out while building Kerox — the orchestrator,
        the agents, and the discipline around them — written down as we go.
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
        <div>VOL. 01 · MAY 2026</div>
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
              How to build an autonomous red team, in Rust, by hand.
            </h1>
            <p className="mt-7 max-w-[64ch] text-[15px] leading-[1.85] text-[var(--text)]">
              This is the working notebook for Kerox — a Rust-native,
              terminal-first, multi-agent autonomous red team. None of it is
              finished; this book is the design thinking as it happens. Sections
              that describe something still being built are marked{" "}
              <Code>ETA</Code> so you know what is real and what is planned.
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
              Kerox is a Rust-native, terminal-first, vendor-neutral autonomous
              red team. The short version: an orchestrator reads an engagement
              plan and pursues an objective the way an adversary would — not the
              way a scanner does. It is open, it is in progress, and it is built
              by hand.
            </P>
            <P>
              Most automated &quot;offensive&quot; tooling runs a fixed battery
              of checks and prints a report. That is useful, but it is not what
              an attacker does. An attacker has a goal, improvises a path toward
              it, and chains small wins into a big one. Kerox is an attempt to
              build a system that works that second way — under tight discipline,
              against authorized scope only.
            </P>
            <H3>What you will find in this book</H3>
            <UL>
              <LI>The agent architecture — one orchestrator, a roster of specialists</LI>
              <LI>How the orchestrator turns an engagement plan into a real attack chain</LI>
              <LI><Code>spearhead</Code>, the LLM/AI red-team agent, and how findings map to OWASP LLM Top 10 and MITRE ATLAS</LI>
              <LI>The engagement package — RoE, ConOps, Deconfliction, OPPLAN — and why it comes before any packet</LI>
              <LI>The human gate, the dry-run default, and the sandbox the whole thing runs inside</LI>
              <LI>The attack → defend → verify loop that points offense back at defense</LI>
              <LI>The <Code>krx</Code> CLI, the planned tech stack, and how to contribute</LI>
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

          <Chapter num="01" id="architecture" title="Architecture" eta="Q1 2026">
            <P>
              The architecture is deliberately small: one orchestrator that owns
              the plan and the decisions, and a set of specialist agents it
              dispatches to do the actual work. The orchestrator never touches a
              target directly — it reasons, it sequences, and it hands concrete
              tasks to agents that know one domain well.
            </P>
            <Pre>{`            engagement plan (authorized scope)
                          │
                  ┌───────▼────────┐
                  │  ORCHESTRATOR  │  reads plan · sequences chain
                  │  (human gate)  │  holds every live action
                  └───────┬────────┘
                          │ dispatch
        ┌─────────┬───────┼────────┬──────────┐
        ▼         ▼       ▼        ▼          ▼
   spearhead   network  report    web      (more…)
    LLM/AI     surface  write-up  apps
        │         │       │        │          │
        └─────────┴───────┴────────┴──────────┘
                          │
                    isolated Kali sandbox
                    (dedicated op network)`}</Pre>
            <H3>Why split it this way</H3>
            <UL>
              <LI>The orchestrator carries the goal and the rules; agents carry the craft. Neither leaks into the other.</LI>
              <LI>Agents are replaceable. A better network agent drops in without the orchestrator noticing.</LI>
              <LI>Every live action funnels back through one place — the gate — so there is exactly one chokepoint to audit.</LI>
              <LI>Vendor-neutral by design: nothing is tied to a single model provider or a single C2.</LI>
            </UL>
            <H3>Written in Rust, run from a terminal</H3>
            <P>
              The control plane is Rust — for the type system, the error
              discipline, and a single static binary that is easy to reason
              about. The interface is a terminal, because that is where this
              work actually happens and because a TUI is honest about what it is
              doing.
            </P>
          </Chapter>

          <Chapter num="02" id="orchestrator" title="The orchestrator" eta="Q1 2026">
            <P>
              The orchestrator is the brain. It reads an engagement plan, fixes
              on an objective, and works toward it through whatever path opens
              up — chaining reconnaissance, exploitation, privilege escalation,
              lateral movement, and C2. When one route closes, it backs up and
              tries another. This is the part that makes Kerox an adversary and
              not a checklist.
            </P>
            <H3>The loop</H3>
            <UL>
              <LI><b>Orient</b> — read the plan, the scope, and whatever the agents have learned so far</LI>
              <LI><b>Decide</b> — pick the next technique that moves the objective forward</LI>
              <LI><b>Gate</b> — if the step is a live action, stop and ask a human</LI>
              <LI><b>Act</b> — dispatch the approved task to the right specialist agent</LI>
              <LI><b>Observe</b> — fold the result back in, then orient again</LI>
            </UL>
            <H3>Mapped to ATT&amp;CK as it goes</H3>
            <P>
              Every step the orchestrator plans is tagged with the MITRE
              ATT&amp;CK technique it corresponds to, so the chain reads like a
              real operation and so the eventual report speaks the language a
              blue team already uses.
            </P>
            <Pre>{`# illustrative — names and IDs will move
recon     T1595  active scanning        [plan]
access    T1190  exploit public app     [plan]
privesc   T1068  exploit for escalation [plan]
lateral   T1021  remote services        [plan]
collect   T1119  automated collection   [plan]
c2        T1071  application-layer C2    [plan]
# nothing fires until a human approves the step`}</Pre>
            <Note>
              The chain above is a <i>plan</i>, not a run. The orchestrator is
              designed to produce the full chain first, in dry-run, and only
              execute steps a human has explicitly signed off on.
            </Note>
          </Chapter>

          <Chapter num="03" id="spearhead" title="Spearhead — LLM red team" eta="Q2 2026">
            <P>
              Spearhead is the lead agent and the reason Kerox exists in the
              shape it does. It is pointed at the AI in the stack — the chatbots,
              copilots, and tool-using agents that are now wired into real
              systems — and it probes the failure modes that are unique to
              language models.
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
              A finding that nobody can act on is noise. Spearhead is designed to
              report every result against the{" "}
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
            <P>
              Spearhead leads; the supporting agents follow it onto the rest of
              the attack surface once it has found a way in — or once it has
              proven there isn&apos;t one.
            </P>
          </Chapter>

          <Chapter num="04" id="agents" title="Supporting agents" eta="Q2 2026">
            <P>
              Spearhead handles the model. The rest of the roster handles
              everything around it — the conventional surface, and turning the
              run into something a defender can act on. Each one is a specialist
              with a narrow brief.
            </P>
            <H3>network</H3>
            <P>
              Maps the attack surface and works it. Recon and enumeration first —
              the handful of openings that matter, not a thousand low-signal
              findings — then services, trust paths, and lateral movement once a
              foothold lands.
            </P>
            <H3>report</H3>
            <P>
              Turns the engagement into a deliverable. Narrative plus findings,
              mapped to MITRE ATT&amp;CK and ATLAS, rendered as Markdown, JSON, or
              SARIF — including the dropped and ruled-out reasons, which are half
              the value.
            </P>
            <H3>web, appsec — later</H3>
            <P>
              The web surface (injection, access-control, logic flaws) and the
              source-code surface are designed into the roster and stubbed for
              now. They ship once the wedge, the network agent, and the report
              agent are solid.
            </P>
            <Note>
              The agent roster is open-ended on purpose. The orchestrator does
              not care how many agents exist or what they are called; it only
              cares that each one advertises what techniques it can run.
            </Note>
          </Chapter>

          <Chapter num="05" id="discipline" title="Engagement discipline" eta="Q1 2026">
            <P>
              This is the part that separates a red team from a vandal. Before a
              packet leaves the wire, Kerox writes the engagement down — and then
              is built to refuse to step outside what it wrote.
            </P>
            <H3>The engagement package</H3>
            <UL>
              <LI><b>Rules of Engagement (RoE)</b> — what is in scope, what is off-limits, the hours, the hard stops</LI>
              <LI><b>ConOps</b> — the concept of operations: what we are trying to achieve and how, in plain language</LI>
              <LI><b>Deconfliction Plan</b> — how to tell our activity apart from a real incident, and who to call</LI>
              <LI><b>OPPLAN</b> — the operational plan, with each intended action mapped to MITRE ATT&amp;CK</LI>
            </UL>
            <P>
              The package is generated first, reviewed by a human, and then
              treated as the boundary for everything that follows. An action
              that is not covered by the package does not run.
            </P>
            <Pre>{`# illustrative scope file — the boundary, not a suggestion
scope:
  in:   ["10.10.0.0/24", "app.example-lab.internal"]
  out:  ["*.prod.example.com", "anything not listed"]
  hours: "Mon–Fri 09:00–17:00, operator timezone"
  hard_stops:
    - "any sign of real user impact"
    - "any host outside 'in'"`}</Pre>
            <Note>
              Authorization is not a formality here. Kerox is meant to be run
              against systems you are explicitly permitted to test, inside the
              scope you wrote down. That constraint is load-bearing.
            </Note>
          </Chapter>

          <Chapter num="06" id="gate" title="The human gate" eta="Q1 2026">
            <P>
              Autonomy without a brake is just a liability. Kerox is autonomous
              in how it reasons and plans, but every live action is dry-run by
              default and stops at an explicit human approval before it touches
              anything real.
            </P>
            <H3>Dry-run is the default, not an option</H3>
            <P>
              In its planning mode, Kerox produces the full chain — every
              technique, every command, every target — without sending a thing.
              You read the plan. You approve the steps you want. Only then does a
              live action go out, and only the steps you approved.
            </P>
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
          </Chapter>

          <Chapter num="07" id="tooling" title="Interactive tooling" eta="Q3 2026">
            <P>
              Real offensive tools are interactive. They drop you into a console,
              ask questions, and keep state across a session. A lot of automation
              pretends this isn&apos;t true and scripts around it; Kerox is being
              built to sit inside it instead.
            </P>
            <H3>Persistent terminal sessions</H3>
            <P>
              The agents drive tools like <Code>msfconsole</Code>,{" "}
              <Code>sliver-client</Code>, and <Code>evil-winrm</Code> inside
              persistent terminal sessions — sending input, reading output, and
              answering interactive prompts the way a person at the keyboard
              would. A session that is established stays established; a pivot
              does not drop because the automation forgot to hold the handle.
            </P>
            <UL>
              <LI>Tools run in their native console, not behind a brittle one-shot wrapper</LI>
              <LI>Interactive prompts are handled, not avoided</LI>
              <LI>Session state survives across steps in the chain</LI>
            </UL>
            <Note>
              This is harder than shelling out once and parsing stdout, and that
              is the point. The tools were built to be driven by a human at a
              prompt; Kerox is built to be that driver.
            </Note>
          </Chapter>

          <Chapter num="08" id="sandbox" title="The sandbox" eta="Q3 2026">
            <P>
              Offense stays in a box. Operations are designed to run inside an
              isolated Kali sandbox on a dedicated operational network, kept
              separate from the management plane that drives the engagement.
            </P>
            <H3>Two planes, on purpose</H3>
            <UL>
              <LI><b>Management plane</b> — where you read plans, give approvals, and read results. It never touches a target.</LI>
              <LI><b>Operational plane</b> — the Kali sandbox on its own network, where the agents and their tools actually run.</LI>
            </UL>
            <P>
              The split means the machine you sit at is not the machine that runs
              exploits, and a target can never reach back past the sandbox to the
              place where decisions are made.
            </P>
            <Note>
              Isolation is a design goal, not a finished guarantee. Treat the
              sandbox like any other lab boundary: necessary, and not a
              substitute for running only against scope you are authorized to
              touch.
            </Note>
          </Chapter>

          <Chapter num="09" id="defense" title="Attack → defend → verify" eta="Q4 2026">
            <P>
              The reason to build a disciplined attacker is to make defense
              better. Kerox is designed around a loop that turns each finding
              into a concrete defensive improvement and then proves the
              improvement actually holds.
            </P>
            <H3>The loop</H3>
            <UL>
              <LI><b>Attack</b> — the chain reaches the objective, or gets as far as it can, and records exactly how</LI>
              <LI><b>Defend</b> — each step becomes a candidate fix: a detection, a control, a config change</LI>
              <LI><b>Verify</b> — re-run the same step against the hardened system and confirm it now fails</LI>
            </UL>
            <P>
              A finding you cannot reproduce is a rumor; a fix you cannot verify
              is a hope. Closing the loop is what makes the offense worth doing.
            </P>
          </Chapter>

          <Chapter num="10" id="cli" title="The krx CLI" eta="Q4 2026">
            <P>
              The whole thing is driven from one terminal command:{" "}
              <Code>krx</Code>. The verbs below are a design sketch — they will
              change — but they show the intended shape: plan, review, approve,
              run, report.
            </P>
            <UL>
              <LI><Code>krx plan</Code> — generate the engagement package and the dry-run attack chain</LI>
              <LI><Code>krx scope</Code> — validate a target against the authorized scope file</LI>
              <LI><Code>krx spearhead</Code> — point the LLM agent at a target and map findings to ATLAS</LI>
              <LI><Code>krx approve</Code> — arm a specific step for live execution</LI>
              <LI><Code>krx run</Code> — execute approved steps, or the whole chain in dry-run</LI>
              <LI><Code>krx verify</Code> — re-run a step against the hardened system to confirm the fix</LI>
              <LI><Code>krx report</Code> — write the engagement up, ATT&amp;CK- and ATLAS-mapped</LI>
            </UL>
            <Note>
              There is no public release of <Code>krx</Code> yet. The commands
              here describe where it is headed, not something you can install
              today.
            </Note>
          </Chapter>

          <Chapter num="11" id="stack" title="Tech stack">
            <P>
              Planned, and subject to change as the build teaches us things. The
              bias is toward a small number of well-understood pieces over a
              large framework.
            </P>
            <UL>
              <LI><b>Rust</b> — the control plane, the orchestrator, and the agent harness; one static binary</LI>
              <LI><b>Terminal-first</b> — a TUI for plans, approvals, and live session output</LI>
              <LI><b>Vendor-neutral LLM access</b> — Spearhead is not tied to a single model provider</LI>
              <LI><b>Kali</b> — the operational sandbox image and its tooling</LI>
              <LI><b>Existing offensive tools</b> — driven, not reinvented: msfconsole, sliver-client, evil-winrm, and friends</LI>
              <LI><b>MITRE ATT&amp;CK + ATLAS, OWASP LLM Top 10</b> — the mapping vocabulary, not dependencies</LI>
            </UL>
          </Chapter>

          <Chapter num="12" id="security" title="Authorization & ethics">
            <P>
              Kerox is an offensive tool, and offensive tools have to be honest
              about what they are for. It is built to be run by people with
              permission, against systems they are allowed to test, inside a
              scope they wrote down. The discipline chapters above are not
              decoration — they are the whole design constraint.
            </P>
            <H3>What that means in practice</H3>
            <UL>
              <LI>Authorized scope only. No scope file, no run.</LI>
              <LI>Dry-run by default. Live actions need an explicit human yes.</LI>
              <LI>Operations stay in the sandbox, on the operational network.</LI>
              <LI>Findings exist to be fixed, not collected.</LI>
            </UL>
            <H3>Reporting an issue in Kerox itself</H3>
            <P>
              When there is something to report, security contact goes to{" "}
              <Code>security@kerox.dev</Code>, with a PGP key published at{" "}
              <Code>kerox.dev/.well-known/pgp-key.txt</Code>. Responsible
              disclosure, the same way we would want it.
            </P>
          </Chapter>

          <Chapter num="13" id="contrib" title="Contributing & RFCs">
            <P>
              KeroxLabs builds in the open. Patches, bug reports, and hard
              questions about doing offense responsibly are all welcome. The bar
              is technical; the response is fast.
            </P>
            <H3>RFC process</H3>
            <UL>
              <LI>Anything that touches the agent protocol, the engagement-package format, or the gate requires an RFC</LI>
              <LI>RFCs live in <Code>docs/rfcs/RFC-XXXX-&lt;slug&gt;.md</Code></LI>
              <LI>Discuss first in the forum (coming soon) or via issue; open a draft PR with the RFC</LI>
              <LI>Maintainer sign-off + a comment window before merge</LI>
            </UL>
            <H3>Code style</H3>
            <UL>
              <LI><Code>cargo clippy -- -D warnings</Code> is mandatory</LI>
              <LI><Code>cargo fmt --check</Code> is mandatory</LI>
              <LI>No <Code>unsafe</Code> without a <Code>// SAFETY:</Code> comment</LI>
              <LI>Anything that can take a live action gets a test that proves it cannot without approval</LI>
            </UL>
            {/* TODO: link the public Kerox repo here once it exists — do not invent a URL */}
          </Chapter>

          <Chapter num="14" id="glossary" title="Glossary">
            <UL>
              <LI><Code>orchestrator</Code> — the component that reads the plan, sequences the attack chain, and owns the human gate.</LI>
              <LI><Code>agent</Code> — a specialist that runs one domain of the work (spearhead, network, report; web and appsec later).</LI>
              <LI><Code>attack chain</Code> — an ordered sequence of techniques that move from entry toward an objective.</LI>
              <LI><Code>RoE</Code> — Rules of Engagement. What is in scope, what is off-limits, when, and the hard stops.</LI>
              <LI><Code>ConOps</Code> — Concept of Operations. What the engagement is trying to do, in plain language.</LI>
              <LI><Code>deconfliction</Code> — telling authorized test activity apart from a real incident.</LI>
              <LI><Code>OPPLAN</Code> — the operational plan, with each intended action mapped to MITRE ATT&amp;CK.</LI>
              <LI><Code>dry-run</Code> — plan and display an action without executing it. The default mode.</LI>
              <LI><Code>MITRE ATT&amp;CK</Code> — the framework of adversary techniques used to tag the conventional chain.</LI>
              <LI><Code>MITRE ATLAS</Code> — the same idea for attacks against AI/ML systems; Spearhead maps to it.</LI>
              <LI><Code>OWASP LLM Top 10</Code> — the common catalog of LLM application risks Spearhead reports against.</LI>
            </UL>
          </Chapter>

          {/* footer of book */}
          <div className="mt-16 border-t border-dashed border-[var(--accent-dim)] pt-10">
            <p className="display max-w-[36ch] text-[22px] leading-[1.35]">
              That is the whole book — for now.
            </p>
            <p className="mt-4 max-w-[60ch] text-[13px] leading-[1.8] text-[var(--text-dim)]">
              The rest is being written as we build. Subscribe to the forum
              when it opens, follow the org, or just check back. Notes that
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
