import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   KeroxLabs Research — mdBook-style documentation site.
   Every chapter is anchor-scrollable. Sticky sidebar TOC
   on desktop, collapsible top section on mobile.
   ────────────────────────────────────────────────────────── */

const TOC: { num: string; id: string; title: string; eta?: string }[] = [
  { num: "00", id: "overview",   title: "Overview" },
  { num: "01", id: "toolchain",  title: "Toolchain & dev environment", eta: "Q1 2026" },
  { num: "02", id: "bootloader", title: "Bootloader & ring-0 entry",    eta: "Q1 2026" },
  { num: "03", id: "memory",     title: "Memory management",             eta: "Q2 2026" },
  { num: "04", id: "scheduler",  title: "Interrupts & scheduling",       eta: "Q2 2026" },
  { num: "05", id: "drivers",    title: "Drivers — keyboard, PCI, AHCI", eta: "Q3 2026" },
  { num: "06", id: "filesystem", title: "krxfs — log-structured FS",     eta: "Q3 2026" },
  { num: "07", id: "network",    title: "Network stack",                 eta: "Q4 2026" },
  { num: "08", id: "userland",   title: "Userland & syscall ABI",        eta: "Q1 2027" },
  { num: "09", id: "krx",        title: "krx — package manager",         eta: "Q2 2027" },
  { num: "10", id: "tools",      title: "Offensive tooling",             eta: "Q3 2027" },
  { num: "11", id: "security",   title: "Security & disclosure" },
  { num: "12", id: "audit",      title: "Audit chain" },
  { num: "13", id: "contrib",    title: "Contributing & RFCs" },
  { num: "14", id: "glossary",   title: "Glossary" },
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
          <Link href="/#keroxos" className="nav-link hidden sm:inline">KEROXOS</Link>
          <Link href="/#krx" className="nav-link hidden sm:inline">KRX</Link>
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
        Everything you need to build KeroxOS, krx, and our offensive
        tooling from the first instruction up. Notes, code samples, and
        diagrams written as we go.
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
              How to build a cybersecurity OS, in Rust, by hand.
            </h1>
            <p className="mt-7 max-w-[64ch] text-[15px] leading-[1.85] text-[var(--text)]">
              This is the living build manual for KeroxLabs — a small,
              cybersecurity-focused, Rust-native operating system together with
              a custom set of offensive tools. Every chapter ships when we ship
              it; the rest is marked <Code>ETA</Code> so you know what is open.
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
              KeroxLabs is a small lab building a cybersecurity-focused,
              Rust-native operating system — together with a custom set of
              offensive tools also written end-to-end in Rust. Everything
              compiles <Code>no_std</Code>. Everything is open. Everything
              is by hand.
            </P>
            <P>
              We are not trying to replace Linux. We are trying to build a
              system whose every byte is accounted for — a kernel a single
              person can read in a weekend, a package manager that explains
              itself, and a small toolbox of offensive primitives that we
              use, under responsible disclosure, to keep the rest honest.
            </P>
            <H3>What you will find in this book</H3>
            <UL>
              <LI>The full toolchain setup, reproducible in under ten minutes</LI>
              <LI>An annotated walkthrough of the boot path, ring-0 entry, and the higher-half mapping</LI>
              <LI>Designs and code for the buddy allocator, slab, scheduler, IRQs, drivers, VFS, and TCP/IP</LI>
              <LI>The on-disk format of krxfs and the manifest format of krx</LI>
              <LI>Design briefs for our four offensive tools — <Code>viper</Code>, <Code>fang</Code>, <Code>molt</Code>, <Code>coil</Code></LI>
              <LI>The threat model, audit chain, and 90-day disclosure policy</LI>
              <LI>How to contribute — RFC process, code style, test discipline</LI>
            </UL>
            <H3>How to read it</H3>
            <P>
              Read top to bottom for the first 30 minutes. After that, jump
              by chapter — every section is self-contained enough to land on.
              Code references point to file paths in the public repo at{" "}
              <a href="https://github.com/keroxlabs" className="text-[var(--accent-bright)] underline-offset-2 hover:underline">github.com/keroxlabs</a>.
            </P>
          </Chapter>

          <Chapter num="01" id="toolchain" title="Toolchain & dev environment" eta="Q1 2026">
            <P>
              The build is hermetic. Every contributor pins the same Rust
              nightly, the same QEMU, and the same OVMF firmware. CI runs
              the same image. We do not let the host system leak in.
            </P>
            <H3>Pinning Rust</H3>
            <Pre>{`# rust-toolchain.toml
[toolchain]
channel    = "nightly-2026-03-01"
components = ["rust-src", "llvm-tools-preview", "rustfmt", "clippy"]
targets    = ["x86_64-unknown-none", "aarch64-unknown-none"]`}</Pre>
            <H3>Required system packages</H3>
            <UL>
              <LI><Code>qemu-system-x86_64</Code> ≥ 8.2, plus <Code>qemu-system-aarch64</Code> for the secondary target</LI>
              <LI><Code>ovmf</Code> for UEFI testing</LI>
              <LI><Code>nasm</Code> for the BIOS-path stage1</LI>
              <LI><Code>just</Code> as the task runner — every <Code>just &lt;task&gt;</Code> is documented in the <Code>justfile</Code></LI>
              <LI><Code>git-lfs</Code> for tracked test images</LI>
            </UL>
            <H3>First boot, in ten minutes</H3>
            <Pre>{`git clone https://github.com/keroxlabs/keroxos
cd keroxos
just dev          # one-time toolchain bootstrap
just qemu         # boots in QEMU + OVMF, prints over serial
just test         # runs the in-tree test harness`}</Pre>
            <Note>
              If the boot is silent, your QEMU is too old to negotiate the
              UEFI shell. We require ≥ 8.2. The repo CI runs against a
              pinned QEMU container so we never drift.
            </Note>
          </Chapter>

          <Chapter num="02" id="bootloader" title="Bootloader & ring-0 entry" eta="Q1 2026">
            <P>
              The bootloader is small. Its only job is to get the CPU into
              long mode with a known set of page tables, hand the memory
              map to the kernel, and jump to <Code>kmain</Code>. Everything
              else lives in the kernel.
            </P>
            <H3>Two paths, one kernel</H3>
            <UL>
              <LI><b>UEFI</b> — a Rust stub using the <Code>uefi</Code> crate (later re-authored in-house). Reads the kernel ELF from the EFI System Partition, sets up identity + higher-half mapping, exits boot services, jumps.</LI>
              <LI><b>BIOS / multiboot2</b> — <Code>stage1.asm</Code> in real mode, switches to protected, then long mode, then jumps to the same <Code>kmain</Code>. Slower, kept around because some research targets only have BIOS.</LI>
            </UL>
            <H3>Higher-half mapping</H3>
            <Pre>{`// kernel/arch/x86_64/vm.rs
pub const KERNEL_BASE: VirtAddr = VirtAddr::new(0xFFFF_8000_0000_0000);

// physical 0..512 GiB mapped at KERNEL_BASE
// kernel image relocated to KERNEL_BASE + image_offset`}</Pre>
            <H3>The handoff struct</H3>
            <P>
              Both bootloaders produce the same handoff structure. The
              kernel never reads boot-specific fields after entry.
            </P>
            <Pre>{`#[repr(C)]
pub struct BootInfo {
    pub mmap:     &'static [MemoryRegion],
    pub rsdp:     PhysAddr,
    pub framebuf: Framebuffer,
    pub cmdline:  &'static str,
}`}</Pre>
            <H3>First print</H3>
            <Pre>{`#[no_mangle]
pub extern "C" fn kmain(info: &'static BootInfo) -> ! {
    serial::init(0x3F8);
    println!("hello, ring 0");
    println!("memory regions: {}", info.mmap.len());
    arch::halt();
}`}</Pre>
          </Chapter>

          <Chapter num="03" id="memory" title="Memory management" eta="Q2 2026">
            <P>
              The memory subsystem has three layers: a physical frame
              allocator (buddy), a virtual-memory abstraction wrapping the
              architecture's page tables, and a kernel heap (slab) sitting
              on top so that <Code>alloc::Box</Code> and <Code>alloc::Vec</Code> Just Work.
            </P>
            <H3>Frame allocator — buddy</H3>
            <P>
              Orders 0 through 10 — covering allocations from 4 KiB up to
              4 MiB. Free lists per order, lazy coalescing on free. Lock
              is a single ticket spinlock; we revisit when scheduling lands.
            </P>
            <Pre>{`pub trait FrameAllocator {
    fn alloc(&self, order: u8) -> Option<Frame>;
    fn free(&self, frame: Frame, order: u8);
    fn stats(&self) -> AllocStats;
}`}</Pre>
            <H3>Heap — slab</H3>
            <P>
              Slab classes: 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096
              bytes. Anything larger goes straight to the frame allocator.
              The slab is the <Code>#[global_allocator]</Code> — every
              <Code>Box::new(...)</Code> in the kernel routes here.
            </P>
            <H3>Diagnostics</H3>
            <UL>
              <LI>Per-class usage exposed via <Code>/proc/meminfo</Code> (later)</LI>
              <LI>Fragmentation % per buddy order</LI>
              <LI>Leak detector in debug builds: every alloc records its caller</LI>
            </UL>
          </Chapter>

          <Chapter num="04" id="scheduler" title="Interrupts & scheduling" eta="Q2 2026">
            <P>
              KeroxOS starts cooperative — tasks call <Code>yield_now()</Code>{" "}
              — and graduates to preemptive round-robin once the LAPIC
              timer is running.
            </P>
            <H3>IDT setup</H3>
            <P>
              All 256 vectors get stubs. Hardware exceptions print a
              colored backtrace and halt; user-mode IRQs route through a
              dispatch table.
            </P>
            <H3>Task struct</H3>
            <Pre>{`pub struct Task {
    pub id:      TaskId,
    pub regs:    SavedRegs,
    pub kstack:  KernelStack,
    pub state:   State,         // Ready | Running | Blocked | Dead
    pub prio:    Priority,
}`}</Pre>
            <H3>Round-robin, with bias</H3>
            <P>
              Every scheduler tick rotates the ready queue. A small priority
              bias gives interactive tasks an edge — never starves the rest.
              Preemption is deferred while a task holds an irq-disable lock.
            </P>
          </Chapter>

          <Chapter num="05" id="drivers" title="Drivers — keyboard, PCI, AHCI" eta="Q3 2026">
            <P>
              Drivers implement a small <Code>Device</Code> trait and live
              under <Code>kernel/drivers/</Code>. No callbacks into core
              kernel beyond the trait.
            </P>
            <UL>
              <LI><b>Framebuffer</b> — GOP / VBE, 8×16 bitmap font console</LI>
              <LI><b>PS/2 keyboard</b> — scan code translation, dead-key tables</LI>
              <LI><b>PCI</b> — bus walk, capability list, MSI-X allocation</LI>
              <LI><b>AHCI</b> — SATA sector reads/writes, NCQ later</LI>
              <LI><b>NIC</b> — <Code>virtio-net</Code> for QEMU; <Code>e1000</Code> for real hardware</LI>
              <LI><b>HPET + RTC</b> — monotonic and wall-clock time</LI>
            </UL>
          </Chapter>

          <Chapter num="06" id="filesystem" title="krxfs — log-structured FS" eta="Q3 2026">
            <P>
              krxfs is a log-structured filesystem optimised for append-only
              workloads (audit logs, ML datasets, journals). Writes are
              always appends. Periodic checkpoints flush metadata.
            </P>
            <H3>On-disk layout</H3>
            <Pre>{`+------------------+ block 0
| SUPERBLOCK       | magic, version, root inode, checkpoint ptr
+------------------+
| LOG SEGMENT 0    | append-only log of writes + metadata
+------------------+
| LOG SEGMENT 1    |
+------------------+
| ...              |
+------------------+
| CHECKPOINT       | snapshot of dir tree + SHA-256 of log tail
+------------------+`}</Pre>
            <H3>Crash recovery</H3>
            <P>
              On mount, replay the log from the last good checkpoint
              forward. Each log entry carries its own checksum; the first
              corrupt entry stops replay and marks the FS dirty for fsck.
            </P>
          </Chapter>

          <Chapter num="07" id="network" title="Network stack" eta="Q4 2026">
            <P>
              A small, hand-built TCP/IP stack. <Code>no_std</Code>, zero
              allocations on the hot path, single-threaded per interface
              with poll-mode RX.
            </P>
            <UL>
              <LI>Layer 2 — virtio-net / e1000 → ring buffer of frames</LI>
              <LI>ARP + IPv4 — v6 deferred to a later phase</LI>
              <LI>ICMP echo</LI>
              <LI>UDP socket</LI>
              <LI>TCP with SACK, Reno congestion control, RFC 793 state machine</LI>
              <LI>DNS resolver — userland library</LI>
              <LI><Code>khttp</Code> — a tiny userland HTTP/1.1 client to prove it all works end-to-end</LI>
            </UL>
          </Chapter>

          <Chapter num="08" id="userland" title="Userland & syscall ABI" eta="Q1 2027">
            <P>
              Roughly 40 syscalls, freezing at v1.0. Anything we cannot
              build in userland should not be a syscall. ABI is versioned;
              breaking changes require a major bump and an RFC.
            </P>
            <H3>Syscall list (v1.0 draft)</H3>
            <Pre>{`// I/O          read write open close mmap munmap
// process      fork execve wait exit kill getpid
// signal       sigaction nanosleep
// time         clock_gettime
// fs           stat unlink mkdir rmdir chdir getcwd
// net          socket bind connect listen accept
//              sendto recvfrom
// pipe         pipe dup dup2
// random       getrandom
// audit        audit_emit
// poll         select`}</Pre>
            <H3>Userland we ship</H3>
            <UL>
              <LI><Code>init</Code> — brings up tty + spawns shell</LI>
              <LI><Code>ksh</Code> — POSIX-leaning shell, line editing, history</LI>
              <LI><Code>coreutils-rs</Code> — the 30 utilities you actually want</LI>
              <LI><Code>libkerox</Code> — a thin libc-shaped facade for porting</LI>
            </UL>
          </Chapter>

          <Chapter num="09" id="krx" title="krx — package manager" eta="Q2 2027">
            <P>
              krx is the package manager for KeroxOS. Source builds, signed
              registry, reproducible artifacts, a manifest you can read
              out loud.
            </P>
            <H3>Manifest format</H3>
            <Pre>{`# Krx.toml
[package]
name    = "rkernel-net"
version = "0.4.2"
license = "MIT OR Apache-2.0"
authors = ["KeroxLabs <contact@kerox.dev>"]

[source]
git    = "https://github.com/keroxlabs/rkernel-net"
rev    = "v0.4.2"
sha256 = "a7f2…"

[deps]
kerox-alloc = "0.1"
ring0-irq   = "0.3"

[build]
script = "build.krx"

[signature]
algo = "ed25519"
key  = "kerox-pub-2026"
sig  = "MEUCIQD…"`}</Pre>
            <H3>Reproducibility</H3>
            <P>
              Same source + same manifest + same pinned toolchain → same
              output hash. CI rebuilds every release on three independent
              runners; mismatches fail the release.
            </P>
            <H3>Commands</H3>
            <UL>
              <LI><Code>krx install &lt;pkg&gt;</Code> — resolve, fetch, verify, build, install</LI>
              <LI><Code>krx run &lt;pkg&gt;</Code> — install + exec in a sandbox</LI>
              <LI><Code>krx build</Code> — build the current manifest</LI>
              <LI><Code>krx publish</Code> — sign + push to the registry</LI>
              <LI><Code>krx verify &lt;pkg&gt;</Code> — recompute the hash, compare to the registry's</LI>
              <LI><Code>krx audit</Code> — dump the append-only audit log of every install</LI>
            </UL>
          </Chapter>

          <Chapter num="10" id="tools" title="Offensive tooling" eta="Q3 2027">
            <P>
              Four tools, public-interest only. Used under a 90-day
              disclosure policy. Source-available under MIT + Apache-2.0.
            </P>
            <H3>viper — kernel introspection</H3>
            <P>
              Ring-0 tracer and live symbol walker. DWARF parser, walks
              <Code>task_struct</Code>, vfs, and the net stack without a
              debugger attached. Optional eBPF-shaped event filter.
            </P>
            <H3>fang — raw packet crafter</H3>
            <P>
              Hand-built TCP/IP stack for crafting, replaying, dissecting.
              PCAP I/O, stateless TCP option fingerprinting, deterministic
              output that diffs cleanly against scapy.
            </P>
            <H3>molt — loader & injection research</H3>
            <P>
              Position-independent Rust loaders. Inline asm trampolines,
              zero CRT. Used against our own hardened labs under
              disclosure, with full audit trails.
            </P>
            <H3>coil — coverage-guided fuzzer</H3>
            <P>
              <Code>no_std</Code>-friendly snapshot fuzzer for kernel paths
              in QEMU. LLVM SanitizerCoverage instrumentation, corpus
              minimization, runs as part of every PR's CI.
            </P>
          </Chapter>

          <Chapter num="11" id="security" title="Security & disclosure">
            <P>
              90-day responsible disclosure window. PGP key published at{" "}
              <Code>kerox.dev/.well-known/pgp-key.txt</Code>. Reports go
              to <Code>security@kerox.dev</Code>.
            </P>
            <H3>Threat model</H3>
            <UL>
              <LI>Network attacker on a hostile LAN — must not get ring 0 from a packet</LI>
              <LI>Malicious package — krx must refuse unsigned and mismatched-hash artifacts</LI>
              <LI>Local user — must not escape the syscall ABI</LI>
              <LI>Supply chain — every dependency pinned by hash; rebuilds checked against the registry</LI>
            </UL>
            <H3>Disclosure pipeline</H3>
            <Pre>{`DAY 00  REPORT   vendor + PGP
DAY 07  ACK      fix in progress
DAY 45  PATCH    upstream landed
DAY 90  PUBLISH  write-up + CVE`}</Pre>
          </Chapter>

          <Chapter num="12" id="audit" title="Audit chain">
            <P>
              Every state-changing operation in KeroxOS appends a
              hash-chained entry to <Code>/var/log/kerox-audit.jsonl</Code>.
              The chain is verifiable from any point.
            </P>
            <Pre>{`{"ts":"2026-05-21T03:14:22Z","op":"krx.install","pkg":"rkernel-net@0.4.2","sha":"a7f2…","prev":"f9a3…","this":"c1e7…"}`}</Pre>
            <P>
              Verifier walks the file, recomputing each <Code>this</Code> as
              <Code>SHA-256(prev || entry-without-this)</Code>. Mismatch =
              tamper. Useful in forensic timelines and in our own release
              process.
            </P>
          </Chapter>

          <Chapter num="13" id="contrib" title="Contributing & RFCs">
            <P>
              KeroxLabs is open in the open. Patches, bug reports, RFCs —
              all welcome. The bar is technical; the response is fast.
            </P>
            <H3>RFC process</H3>
            <UL>
              <LI>Any change touching the syscall ABI, the on-disk format, or the registry protocol requires an RFC</LI>
              <LI>RFCs live in <Code>docs/rfcs/RFC-XXXX-&lt;slug&gt;.md</Code></LI>
              <LI>Discuss first in the forum (coming soon) or via issue; open a draft PR with the RFC</LI>
              <LI>Maintainer sign-off + 7-day comment window before merge</LI>
            </UL>
            <H3>Code style</H3>
            <UL>
              <LI><Code>cargo clippy -- -D warnings</Code> is mandatory</LI>
              <LI><Code>cargo fmt --check</Code> is mandatory</LI>
              <LI>No <Code>unsafe</Code> without a <Code>// SAFETY:</Code> comment</LI>
              <LI>Public items get rustdoc; <Code>// TODO:</Code> needs a tracking issue link</LI>
            </UL>
          </Chapter>

          <Chapter num="14" id="glossary" title="Glossary">
            <UL>
              <LI><Code>no_std</Code> — Rust compilation mode without the standard library. Required for ring 0.</LI>
              <LI><Code>ring 0</Code> — Most privileged CPU protection level. Where the kernel runs.</LI>
              <LI><Code>buddy allocator</Code> — Frame allocator that splits and merges power-of-two sized blocks.</LI>
              <LI><Code>slab</Code> — Cache of fixed-size object slots, sitting on top of the frame allocator.</LI>
              <LI><Code>VFS</Code> — Virtual File System. Generic layer above concrete filesystems like krxfs.</LI>
              <LI><Code>multiboot2</Code> — Specification for how BIOS bootloaders hand off to a kernel.</LI>
              <LI><Code>RFC</Code> — Request For Comments. Our process for any change that affects external interfaces.</LI>
            </UL>
          </Chapter>

          {/* footer of book */}
          <div className="mt-16 border-t border-dashed border-[var(--accent-dim)] pt-10">
            <p className="display max-w-[36ch] text-[22px] leading-[1.35]">
              That is the whole book — for now.
            </p>
            <p className="mt-4 max-w-[60ch] text-[13px] leading-[1.8] text-[var(--text-dim)]">
              The rest is being written as we ship. Subscribe to the forum
              when it opens, follow the repo, or just check back. Patches
              that fix something here are welcome — this book is in the
              repo too.
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
          <span className="text-[var(--accent)]">SOFTWARE FOR THE PEOPLE WHO RUN IT</span>
        </div>
      </footer>
    </div>
  );
}
