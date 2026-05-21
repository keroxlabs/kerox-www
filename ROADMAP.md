# KEROXLABS — Roadmap, Architecture & Build Manual

> A small lab building a cybersecurity-focused, Rust-native operating
> system together with a custom set of offensive tools, also written
> end-to-end in Rust. Everything is open. Everything is by hand.

This document is two things at once.

1. **A roadmap.** It tells you what KeroxLabs is, what we are building,
   in what order, by when, and to what quality bar.
2. **A buildable manual.** It is written so that a student with one
   year of programming experience and an interest in systems software
   can, by working through it end to end, actually build the thing.
   Every phase explains the concepts you must understand first, gives
   you working code or shell snippets to study, tells you how to verify
   you have done it correctly, lists the bugs you will hit, and points
   you at the books and papers that explain the rest.

If you are reading this on the landing page, you can also work through
it as an mdBook at <https://kerox.dev/research> — same content, with a
sidebar.

---

## Table of contents

- [Part 1 — Preface for students](#part-1--preface-for-students)
- [Part 2 — Prerequisites & mental models](#part-2--prerequisites--mental-models)
- [Part 3 — Mission, principles, architecture](#part-3--mission-principles-architecture)
- [Part 4 — Tech stack](#part-4--tech-stack)
- [Part 5 — The 0 → 1 build, phase by phase](#part-5--the-0--1-build-phase-by-phase)
  - [Phase 0 — Toolchain & dev environment](#phase-0--toolchain--dev-environment)
  - [Phase 1 — Boot to ring 0](#phase-1--boot-to-ring-0)
  - [Phase 2 — Memory management](#phase-2--memory-management)
  - [Phase 3 — Interrupts & scheduling](#phase-3--interrupts--scheduling)
  - [Phase 4 — Drivers](#phase-4--drivers)
  - [Phase 5 — krxfs (filesystem)](#phase-5--krxfs-filesystem)
  - [Phase 6 — Network stack](#phase-6--network-stack)
  - [Phase 7 — Userland & syscall ABI](#phase-7--userland--syscall-abi)
  - [Phase 8 — krx (package manager)](#phase-8--krx-package-manager)
  - [Phase 9 — Offensive tools](#phase-9--offensive-tools)
  - [Phase 10 — Hardening & first release](#phase-10--hardening--first-release)
- [Part 6 — Repository layout](#part-6--repository-layout)
- [Part 7 — Governance, contributing, RFCs](#part-7--governance-contributing-rfcs)
- [Part 8 — Security & disclosure](#part-8--security--disclosure)
- [Part 9 — Quarterly milestones](#part-9--quarterly-milestones)
- [Part 10 — Resources](#part-10--resources)
- [Appendix A — Glossary](#appendix-a--glossary)
- [Appendix B — File templates](#appendix-b--file-templates)
- [Appendix C — Common bugs across phases](#appendix-c--common-bugs-across-phases)

---

## Part 1 — Preface for students

If you have never built systems software before, this document is going
to look intimidating. It is not. Operating systems are large because
they have many small parts; almost none of those parts are individually
hard. The hard part is patience.

**Who this is for.** Someone who:

- can write programs in at least one compiled language (C, C++, Rust,
  Go, or similar),
- has heard the words *kernel*, *bootloader*, and *virtual memory* but
  has not necessarily written code at that layer,
- is comfortable on a Linux command line,
- is willing to spend an evening reading the Intel SDM when something
  does not work.

You do not need a CS degree. You do need to be the kind of person who,
when a CPU silently triple-faults, finds that interesting rather than
demoralising.

**How to use this document.**

1. Read Part 1 and Part 2 once, end to end, with no laptop open. Make
   sure you understand the mental models. If anything is unfamiliar,
   read the resource we cite for it.
2. Set up your environment (Phase 0). Do not skip this — it is the
   foundation everything else stands on.
3. Work through phases 1 → 10 in order. Each phase ends with a clear
   *"Done when…"*. Do not move on until that line is true.
4. When you get stuck, the bug is almost always in one of three
   places: page tables, the linker script, or your understanding of
   what the bootloader actually handed you. We say so explicitly in
   the *Common bugs* section of each phase.
5. Treat the *Reading* sections as homework, not as references. The
   books and papers we cite are short and load-bearing.

**A note on pace.** Two evenings a week, and you can finish Phase 1
(serial-print "hello, ring 0") in about a month. Phase 5 (filesystem)
will take longer — that is fine. Hobby cadence is fine. The whole
roadmap is sized at roughly two years of weekend work for two
maintainers. There is no race.

**A note on Rust.** You will spend a great deal of time arguing with the
borrow checker about lifetimes you did not realise existed. This is
correct. Most of those arguments are the borrow checker pointing out
real bugs in your kernel. Listen to it.

---

## Part 2 — Prerequisites & mental models

You can begin Phase 0 with the following:

### 2.1 Tools you should have used at least once

- A C compiler (gcc or clang) — you will not write much C, but you
  will read it constantly when consulting Linux/BSD sources.
- A debugger (gdb or lldb) — at minimum, set a breakpoint, step,
  inspect a register.
- A hex editor and a disassembler (`xxd`, `objdump`, `radare2`, or
  Ghidra) — at least once on a small ELF binary.
- Git — branches, rebases, conflict resolution.

### 2.2 Rust skills required

By the time you finish Phase 1 you should be comfortable with:

- Ownership, borrowing, lifetimes
- Traits (`trait Foo`, `impl Foo for Bar`, trait objects)
- `Result<T, E>` and the `?` operator
- `unsafe` — what it actually disables, and what it does not
- `no_std` — what is in `core`, what is in `alloc`, what is in `std`
- Macros (declarative `macro_rules!` is enough for now)
- Cargo basics — workspaces, features, targets, custom targets

If any of this is shaky, work through *The Rust Book* + *Rustlings*
first. They are free.

### 2.3 Mental models

These are the load-bearing concepts. If even one of them feels foggy,
read the resource we cite before going further.

**(a) Privilege rings.** On x86_64 there are four rings (0–3); only 0
and 3 are used by modern OSes. Ring 0 is the kernel — it can execute
privileged instructions (`HLT`, `CR3` write, port I/O), read MSRs, and
touch any memory. Ring 3 is userland — none of the above without going
through the kernel.

Resource: Intel SDM Vol. 3, Ch. 5 ("Protection"). 30 pages, plain
language, do not skip.

**(b) Virtual memory.** Every memory access made by the CPU goes through
the MMU. The MMU turns a virtual address into a physical address by
walking a hierarchy of page tables (four levels on x86_64). The kernel
sets up those page tables. Get this wrong and everything else is sand.

Resource: *Operating Systems: Three Easy Pieces* (OSTEP), Part II
("Virtualization"). Free PDF, written for undergraduates, the chapter
on paging is the best 30-page treatment in print.

**(c) Interrupts and exceptions.** The CPU has 256 interrupt vectors.
Hardware fires hardware interrupts (timer, NIC, keyboard) on the lines
it is assigned; the CPU also raises "exceptions" (vectors 0–31) when
something goes wrong — divide by zero, page fault, double fault. The
Interrupt Descriptor Table (IDT) tells the CPU what code to run for
each vector. You will spend two weeks understanding this.

Resource: Intel SDM Vol. 3, Ch. 6.

**(d) The boot path.** When you press power on an x86 machine, the CPU
starts in 16-bit real mode at `0xFFFF_FFF0`, fetches the first
instruction of the BIOS/UEFI firmware, and runs it. The firmware loads
a bootloader. The bootloader transitions the CPU through 32-bit
protected mode into 64-bit long mode, sets up an initial page table,
and jumps to your kernel. You will write the part after the
bootloader.

Resource: Phil Oppermann's blog series *Writing an OS in Rust*. It is
the single best free resource for this material. We borrow many
conventions from it.

**(e) Stacks and calling conventions.** The kernel runs on a stack you
allocated. Function calls follow the System V AMD64 ABI. When you
context-switch tasks, you save and restore registers in a specific
order. Get the convention wrong and a function call corrupts another
task's state.

Resource: System V AMD64 ABI specification, sections 3.2 and 3.4.

**(f) ELF & linkers.** Your kernel is an ELF binary. The linker decides
where every symbol lives in memory. You will write a small linker
script. When the kernel does not boot, the linker script is the second
place to look (after page tables).

Resource: *Linkers and Loaders* by John Levine, chapter 3.

**(g) `no_std` Rust.** Without the standard library you cannot use
threads, files, networking, allocation, or anything else `std` ships.
You can use everything in `core`. Once you have written an allocator,
you can opt back into `alloc` for `Box`, `Vec`, `String`. That is the
whole vocabulary.

Resource: the Rust documentation page on the `core` and `alloc`
crates. 10 minutes.

---

## Part 3 — Mission, principles, architecture

### 3.1 Mission

KeroxLabs exists to build **systems software that defenders,
researchers, and curious operators can actually read, trust, and own**.
The software that runs at ring 0 should be small enough to audit,
written in a language a borrow checker can keep honest, and given away
under permissive licenses so the ecosystem benefits.

We are not trying to replace Linux. We are trying to build a system
whose every byte is accounted for — a kernel a single person can read
in a weekend, a package manager that explains itself, and a small
toolbox of offensive primitives used by us, under disclosure, to keep
the rest of the world honest.

### 3.2 Principles

1. **No `std`. No surprises.** Every component compiles `no_std`. We
   never depend on a runtime we did not write.
2. **Audit by default.** Every state-changing operation appends to a
   hash-chained audit log. Trust is a build artifact.
3. **Minimum viable kernel.** Anything that does not need to live in
   ring 0 lives in ring 3.
4. **Public-interest research only.** Offensive primitives exist for
   disclosure work. No grey markets. No offensive sales.
5. **Reproducible by default.** Builds are deterministic, signed, and
   verifiable. Tarballs ship with sources.
6. **Permissive licensing.** MIT + Apache-2.0 across the stack so the
   work composes with the rest of the open-source world.
7. **Slow is fine.** Hobby cadence. We release when ready.

### 3.3 Architecture

```
+---------------------------------------------------------------+
|                          USERLAND                             |
|        krx CLI · shell · tools (viper / fang / molt / coil)   |
+---------------------------------------------------------------+
|                       SYSCALL ABI                             |
|         tiny, stable, versioned. ~40 syscalls.                |
+---------------------------------------------------------------+
|                          RING 0                               |
|   VFS · NET · SCHED · MM · IRQ · TIME · AUDIT                 |
+---------------------------------------------------------------+
|                   HARDWARE ABSTRACTION                        |
|   PCI · AHCI · NIC · APIC · timer · framebuffer · keyboard    |
+---------------------------------------------------------------+
|                       BOOTLOADER                              |
|       UEFI stub  →  long mode  →  kernel handoff              |
+---------------------------------------------------------------+
```

**Targets**

- Primary: `x86_64-unknown-none` (BIOS + UEFI)
- Secondary: `aarch64-unknown-none` (Raspberry Pi 4 / 5; hosted on
  Apple Silicon via QEMU)
- Tertiary: `riscv64-unknown-none` (research target, post-Phase 6)

**Crate graph (high level)**

```
                                +-----------+
                                |   tools/  |  viper · fang · molt · coil
                                +-----------+
                                       |
                                +-----------+
                                | userland/ |  init · ksh · coreutils
                                +-----------+
                                       |
+----------+    +-----------+    +-----------+
|  krx/    |--->|  libkrx/  |--->|  libkerox |  syscall shim, alloc, fmt
+----------+    +-----------+    +-----------+
                                       |
                                +-----------+
                                |  kernel/  |  arch · mm · sched · fs · net
                                +-----------+
                                       |
                                +-----------+
                                |   boot/   |  UEFI stub + multiboot2 path
                                +-----------+
```

---

## Part 4 — Tech stack

| Layer            | Choice                                              | Why                                                         |
| ---------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| Language         | Rust nightly (pinned per release)                   | Memory safety we can trust at ring 0                        |
| Bootloader       | Custom UEFI stub + multiboot2 BIOS path             | We never ship a bootloader we cannot audit                  |
| Test runner      | `qemu-system-x86_64` + serial test harness          | Repeatable, scriptable, cheap                               |
| Allocator        | Buddy (frames) + slab (heap)                        | Simple, well-understood, easy to reason about               |
| Scheduler        | Cooperative → preemptive round-robin                | Cooperative first to keep Phase 3 tractable                 |
| Filesystem       | krxfs — log-structured, append-friendly             | Crash-safety we can actually verify; great for audit logs   |
| Network          | smol custom stack — TCP/IP, `no_std`                | We need to own the bytes; smoltcp inspires the design       |
| Package format   | `.krx` — tar + manifest + signature                 | Boring, signable, easy to inspect                           |
| Registry         | `registry.kerox.dev`, signed index, git-backed      | Reproducible, mirrorable, no vendor lock-in                 |
| CI               | GitHub Actions matrix in QEMU                       | Test on every target on every PR                            |
| Audit            | Append-only JSONL + SHA-256 chaining                | Trust as a build artifact                                   |

---

## Part 5 — The 0 → 1 build, phase by phase

Phases are sequential. Each ends in a release candidate that boots,
runs its tests, and produces a binary you can hand to a stranger.

---

### Phase 0 — Toolchain & dev environment

> Goal: any contributor can clone the repo, run `just dev`, and see
> KeroxOS boot in QEMU within ten minutes on a fresh machine.

#### Why this phase exists

Reproducibility is the single most important property of a systems
project. If two contributors do not get the same binary from the same
source, then any bug you cannot reproduce is unbugged forever. Phase 0
locks the toolchain so that future-you, your CI, and a stranger on the
other side of the world all build the same bytes.

#### Concepts to know first

- Rust toolchain channels (stable / beta / nightly) and components
- `rustup` and `cargo` basics
- QEMU command line — at least `-kernel`, `-serial`, `-display none`
- OVMF (UEFI firmware blob for QEMU)
- `just` or `make` as a task runner

#### Step-by-step

**1. Pin the toolchain.** Create `rust-toolchain.toml` at the repo
root.

```toml
[toolchain]
channel    = "nightly-2026-03-01"
components = ["rust-src", "llvm-tools-preview", "rustfmt", "clippy"]
targets    = ["x86_64-unknown-none", "aarch64-unknown-none"]
profile    = "minimal"
```

> If you have never used a nightly compiler before — nightly Rust
> contains unstable features the kernel needs (`asm!`, `naked_functions`,
> custom test frameworks). We pin a specific date so a future nightly
> regression cannot break the build of a release we already cut.

**2. Install host packages.**

```bash
# Debian/Ubuntu
sudo apt install -y qemu-system-x86 qemu-system-aarch64 ovmf nasm \
                    build-essential git git-lfs

# macOS (Homebrew)
brew install qemu nasm just git-lfs
```

**3. Install `just`.**

```bash
cargo install just
```

**4. Author the `justfile`.** This is your control panel for the
project. See *Appendix B*.

**5. Author the workspace `Cargo.toml`.** A multi-crate workspace
keeps the kernel, krx, the tools, and userland separately versionable
but jointly tested.

```toml
[workspace]
resolver = "2"
members  = ["kernel", "krx", "userland/*", "tools/*"]

[workspace.package]
license      = "MIT OR Apache-2.0"
authors      = ["KeroxLabs <contact@kerox.dev>"]
edition      = "2021"
rust-version = "1.85"
```

**6. Custom target.** Long-term we move to a target spec JSON. For
Phase 0 it is enough to set the default in `kernel/.cargo/config.toml`:

```toml
[build]
target = "x86_64-unknown-none"

[unstable]
build-std = ["core", "compiler_builtins", "alloc"]
build-std-features = ["compiler-builtins-mem"]

[target.'cfg(target_os = "none")']
runner = "qemu-system-x86_64 -kernel"
```

`build-std` is what lets you compile `core` and `alloc` for a target
that has no precompiled standard library.

**7. Confirm the toolchain.**

```bash
rustup show
cargo --version
qemu-system-x86_64 --version
just --version
```

#### Verification

```bash
just dev      # bootstraps everything from a fresh clone
just qemu     # should print nothing yet (no kernel) but must not error
just lint-all # must exit 0 (no source files yet, but warnings = 0)
```

#### Common bugs

- *`error: target may not be installed`* — run `rustup target add
  x86_64-unknown-none`, or use `build-std`.
- *`OVMF.fd` not found* — your distro packaged it elsewhere. Find it
  with `dpkg -L ovmf | grep .fd` and patch the `justfile`.
- *Different builds across machines* — you forgot to commit
  `rust-toolchain.toml` or your CI uses `actions-rs/toolchain` without
  reading it. Always pin via the file.

#### Reading

- [The Cargo Book — Custom Targets](https://doc.rust-lang.org/cargo/reference/unstable.html#build-std)
- `just --help` (read it once, end to end — 5 minutes)

#### Done when…

- A fresh clone runs `just dev` then `just qemu` and exits without
  errors on Linux and macOS.
- CI matrix is green on both targets.

---

### Phase 1 — Boot to ring 0

> Goal: a kernel ELF that, when loaded by either the BIOS or UEFI
> bootloader, prints `hello, ring 0` over the serial port and halts.

#### Why this phase exists

You cannot do anything else until you can print. Every bug for the
next five phases will be diagnosed by something you printed. Phase 1
is also where you internalise the mental model of *what the bootloader
actually hands you*: a CPU in long mode, an identity-mapped page
table, an interrupt-disabled state, and a structure describing the
physical memory map.

#### Concepts to know first

- The x86_64 boot sequence (real → protected → long mode)
- The Global Descriptor Table (GDT) and what its entries mean
- The four levels of page tables (PML4 → PDPT → PD → PT)
- The structure of a multiboot2 header
- UEFI Boot Services vs Runtime Services
- The 16550 UART serial port (port `0x3F8`, registers 0–7)
- Linker scripts: `SECTIONS`, `KEEP`, `PHDRS`

#### Step-by-step

**1. Write the linker script** (`kernel/linker.ld`):

```ld
ENTRY(kmain)
OUTPUT_FORMAT(elf64-x86-64)
KERNEL_VMA = 0xFFFFFFFF80000000;

SECTIONS {
  . = KERNEL_VMA + 0x100000;

  .text : ALIGN(4K) {
    *(.boot)
    *(.text .text.*)
  }

  .rodata : ALIGN(4K) { *(.rodata .rodata.*) }
  .data   : ALIGN(4K) { *(.data .data.*) }
  .bss    : ALIGN(4K) { *(.bss .bss.*) *(COMMON) }

  /DISCARD/ : { *(.comment .eh_frame .note.GNU-stack) }
}
```

The kernel lives in the *higher half* — addresses above
`0xFFFF_FFFF_8000_0000`. This convention leaves the lower half for
userland (Phase 7) so the address space split is clean.

**2. Write the multiboot2 header** (`kernel/src/boot/multiboot2.S`):

```asm
section .multiboot_header
align 8
hdr_start:
    dd 0xE85250D6                 ; magic
    dd 0                          ; arch (i386 in multiboot terms)
    dd hdr_end - hdr_start        ; length
    dd 0x100000000 - (0xE85250D6 + 0 + (hdr_end - hdr_start))  ; checksum

    ; end tag
    dw 0
    dw 0
    dd 8
hdr_end:
```

GRUB / Limine / our own loader recognise this header and treat the ELF
as a bootable kernel.

**3. The bootstrap path (BIOS).** `kernel/src/boot/stage1.S` brings us
from 32-bit protected mode (where multiboot2 leaves us) into 64-bit
long mode. The full file is around 200 lines; here is the critical
chunk:

```asm
section .text
global _start
_start:
    cli                          ; no interrupts until IDT is alive
    mov esp, stack_top

    ; set up minimal page tables (identity-map first 2 MiB)
    call set_up_page_tables

    ; enable PAE (CR4.PAE = 1)
    mov eax, cr4
    or  eax, 1 << 5
    mov cr4, eax

    ; load PML4 into CR3
    mov eax, pml4
    mov cr3, eax

    ; set EFER.LME (long-mode enable) via MSR 0xC0000080
    mov ecx, 0xC0000080
    rdmsr
    or  eax, 1 << 8
    wrmsr

    ; enable paging (CR0.PG = 1)
    mov eax, cr0
    or  eax, 1 << 31
    mov cr0, eax

    ; reload GDT with 64-bit code descriptor
    lgdt [gdt64.pointer]
    jmp gdt64.code:kmain_trampoline
```

We have left the parts you can write later (page tables, GDT) as
labels — see the repo for the full file.

**4. The UEFI path.** A small Rust crate that links against
the `uefi` crate, reads the kernel ELF off the EFI System Partition,
sets up a fresh page table, exits boot services, and jumps to the
same `kmain` entry point.

```rust
// kernel/src/boot/uefi.rs (sketch)
#![no_std]
#![no_main]

use uefi::prelude::*;

#[entry]
fn efi_main(_image: Handle, mut st: SystemTable<Boot>) -> Status {
    uefi::helpers::init(&mut st).unwrap();
    let mmap = read_memory_map(&st);
    let kernel = load_kernel_from_esp(&st, "\\kerox.elf");
    let pt     = build_page_tables(&mmap);
    let info   = BootInfo { mmap, rsdp: find_rsdp(&st), framebuf: get_gop(&st) };
    exit_boot_and_jump(st, kernel.entry, &info, pt)
}
```

**5. Serial driver.** The 16550 UART is a 60-year-old chip. You will
talk to it on port `0x3F8`.

```rust
// kernel/src/drivers/serial.rs
use x86_64::instructions::port::Port;

pub struct Uart(Port<u8>);

impl Uart {
    pub fn new(base: u16) -> Self {
        let mut p = Uart(Port::new(base));
        unsafe {
            Port::<u8>::new(base + 1).write(0x00);   // disable interrupts
            Port::<u8>::new(base + 3).write(0x80);   // DLAB on
            Port::<u8>::new(base + 0).write(0x03);   // divisor lo (38400)
            Port::<u8>::new(base + 1).write(0x00);   // divisor hi
            Port::<u8>::new(base + 3).write(0x03);   // 8N1, DLAB off
            Port::<u8>::new(base + 2).write(0xC7);   // FIFO, clear, 14-byte
            Port::<u8>::new(base + 4).write(0x0B);   // IRQs on, RTS/DSR set
        }
        p
    }
    pub fn write_byte(&mut self, b: u8) {
        unsafe { while (Port::<u8>::new(0x3FD).read() & 0x20) == 0 {} }
        unsafe { self.0.write(b); }
    }
}
```

Wire this into a `println!`-style macro and you have a debug channel.

**6. `kmain`.**

```rust
#![no_std]
#![no_main]

use kernel::{println, panic, BootInfo};

#[no_mangle]
pub extern "C" fn kmain(info: &'static BootInfo) -> ! {
    kernel::serial::init(0x3F8);
    println!("hello, ring 0");
    println!("memory regions: {}", info.mmap.len());
    println!("rsdp:          {:#x}", info.rsdp.as_u64());
    kernel::arch::halt();
}

#[panic_handler]
fn on_panic(info: &core::panic::PanicInfo) -> ! {
    println!("PANIC: {}", info);
    kernel::arch::halt();
}
```

#### Verification

```bash
just qemu | head -3
# hello, ring 0
# memory regions: 7
# rsdp:          0x000F6320
```

#### Common bugs

- **Triple fault during long-mode entry.** You forgot to enable PAE
  before paging, or your PML4 entries are wrong. Dump CR3, walk the
  table by hand once. Always.
- **Kernel ELF loaded, jump succeeds, but no serial output.** Wrong
  port number (try `0x2F8`), or your linker script discarded `.boot`.
  Check `objdump -h kernel.elf`.
- **`#[panic_handler]` already defined.** You have two `#![no_std]`
  crates pulling each other in; one of them is not actually `no_std`.
- **`undefined reference to memcpy`.** Add `compiler-builtins-mem` to
  `build-std-features`.

#### Reading

- Phil Oppermann, *Writing an OS in Rust*, posts 1–6.
- Intel SDM Vol. 3, Ch. 9 (System Initialization).
- multiboot2 specification (60 pages, you only need pages 1–20).

#### Done when…

- `just qemu` prints `hello, ring 0` over serial on both BIOS and UEFI
  paths.
- Halt is clean (no triple fault, no spew).
- CI runs the same on Linux + macOS.

---

### Phase 2 — Memory management

> Goal: a physical frame allocator, a virtual-memory abstraction, and a
> kernel heap. By the end, `alloc::Box::new(...)` and `alloc::Vec`
> Just Work inside the kernel.

#### Why this phase exists

Everything else in the kernel allocates. Drivers allocate buffers; the
scheduler allocates tasks; the filesystem allocates inodes. If your
allocator is wrong, every subsystem above it inherits the bug. Phase 2
is the one phase you should overtest.

#### Concepts to know first

- The buddy allocator (powers-of-two block splitting and merging)
- Slab allocators (per-size object caches)
- The Rust `GlobalAlloc` trait
- Page-table walk on x86_64 (PML4 → PDPT → PD → PT)
- TLB invalidation (`invlpg`)
- The difference between *kernel virtual address*, *physical address*,
  and *bus address*

#### Step-by-step

**1. Parse the memory map.** The bootloader handed you a slice of
`MemoryRegion` entries. Pick the largest contiguous "usable" region
above 1 MiB; that is your physical heap.

**2. Frame allocator — buddy.** Orders 0 to 10 (4 KiB to 4 MiB).

```rust
// kernel/src/mm/buddy.rs (excerpt)
pub struct Buddy {
    base:  PhysAddr,
    pages: usize,
    free:  [Spinlock<List<Frame>>; MAX_ORDER + 1],
}

impl Buddy {
    pub fn alloc(&self, order: u8) -> Option<Frame> {
        for o in order..=MAX_ORDER as u8 {
            let mut head = self.free[o as usize].lock();
            if let Some(blk) = head.pop_front() {
                drop(head);
                // split blk down to `order`
                let mut cur = blk;
                for split_order in (order..o).rev() {
                    let buddy = cur.offset_frames(1usize << split_order);
                    self.free[split_order as usize].lock().push_front(buddy);
                }
                return Some(cur);
            }
        }
        None
    }
}
```

Test it with a battery of synthetic allocations and frees. Fuzz it
with `coil` later (Phase 9).

**3. Virtual memory abstraction.** Define a `PageTable` type wrapping
the architecture's PML4. The kernel half of the address space is
mapped globally; userland mappings change on context switch.

```rust
pub trait Mapper {
    fn map(&mut self, virt: VirtAddr, phys: PhysAddr, flags: PageFlags)
        -> Result<(), MapError>;
    fn unmap(&mut self, virt: VirtAddr) -> Result<PhysAddr, MapError>;
    fn translate(&self, virt: VirtAddr) -> Option<PhysAddr>;
    fn flush(&self, virt: VirtAddr);   // TLB invlpg
}
```

**4. Heap — slab.** Classes: 8, 16, 32, 64, 128, 256, 512, 1024,
2048, 4096 bytes. Anything bigger goes straight to the buddy
allocator.

```rust
// kernel/src/mm/slab.rs (excerpt)
pub struct SlabCache {
    obj_size:  usize,
    per_slab:  usize,
    partial:   Spinlock<List<Slab>>,
    full:      Spinlock<List<Slab>>,
}

unsafe impl GlobalAlloc for KernelAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 { /* pick slab */ }
    unsafe fn dealloc(&self, ptr: *mut u8, layout: Layout) { /* free */ }
}
```

**5. Wire it up.**

```rust
#[global_allocator]
static ALLOCATOR: KernelAllocator = KernelAllocator::new();

#[alloc_error_handler]
fn on_oom(layout: Layout) -> ! {
    panic!("kernel OOM: {:?}", layout);
}
```

#### Verification

Build a synthetic test that allocates 10,000 random sizes (8 B to 64
KiB), records pointers, frees them in shuffled order, and asserts
that no two outstanding allocations overlap and that the total in-use
count matches expectations.

```bash
cargo test --target x86_64-unknown-none --package kernel \
           --features test-on-qemu -- mm::
```

#### Common bugs

- **Double-frees silently corrupt the free list.** Use a debug build
  that poisons freed objects (`0xDEAD_BEEF_DEAD_BEEF`) and panics on
  double free.
- **Buddy "splits" the wrong way.** Confusing parent vs buddy
  offsets. Draw it on paper once.
- **Heap shows leaks on shutdown.** Almost always a `Box` that
  forgot to be dropped (an `*mut` cast escaped the borrow checker).
  Add a leak detector in debug builds: every alloc records its
  caller, every dealloc clears it, halt reports outstanding.
- **TLB confusion.** You unmapped a page and forgot to `invlpg`; an
  old translation lives in the TLB. Flush after every unmap; flush
  the whole TLB on CR3 reload.

#### Reading

- OSTEP, Chapters 17 (free space management) and 18 (paging).
- Bonwick, *The Slab Allocator: An Object-Caching Kernel Memory
  Allocator* (USENIX 1994). 12 pages, the original paper.
- Phil Oppermann, *Writing an OS in Rust*, posts on heap allocation.

#### Done when…

- The allocator passes a 10,000-allocation fuzz round in QEMU.
- A simple `Vec<u64>` of 1 M elements builds, sorts, and drops with
  the leak detector reporting zero outstanding.

---

### Phase 3 — Interrupts & scheduling

> Goal: preemptive round-robin scheduling across five kernel threads
> that print interleaved output over serial for thirty seconds with
> no deadlocks.

#### Concepts to know first

- The IDT and its entry format (gate descriptors)
- IRQ vs exception vs NMI
- The legacy 8259 PIC and how to mask it off
- The Local APIC (LAPIC) and its timer
- The TSS (Task State Segment) — at minimum, the IST stack pointers
- The System V AMD64 calling convention — which registers are
  caller-saved vs callee-saved
- Spinlocks vs irq-disable locks

#### Step-by-step

**1. Build the IDT.** All 256 entries. The first 32 are CPU
exceptions; you write handlers for at least double-fault and page
fault before going further. The rest are stub handlers that print
"unhandled IRQ N" and continue.

```rust
// kernel/src/irq/idt.rs (excerpt)
#[repr(C, packed)]
pub struct GateDescriptor {
    offset_lo: u16,
    selector:  u16,
    ist:       u8,
    flags:     u8,
    offset_mid: u16,
    offset_hi: u32,
    reserved:  u32,
}

pub fn install_idt() {
    let idt = &mut IDT;
    idt[0]  = exception_gate(divide_error);
    idt[8]  = exception_gate_ist(double_fault, IST_INDEX_DF);
    idt[14] = exception_gate(page_fault);
    idt[32] = irq_gate(timer_isr);
    idt[33] = irq_gate(keyboard_isr);
    // ... and so on through 0xFE
    lidt(&idt_pointer());
}
```

**2. Remap and disable the PIC.** Modern kernels use the LAPIC; the
PIC must be moved out of the vector space before being masked off.

```rust
unsafe {
    Port::<u8>::new(0x20).write(0x11);          // ICW1 init
    Port::<u8>::new(0xA0).write(0x11);
    Port::<u8>::new(0x21).write(0x20);          // master vector base
    Port::<u8>::new(0xA1).write(0x28);          // slave  vector base
    Port::<u8>::new(0x21).write(0b0000_0100);   // tell master about slave
    Port::<u8>::new(0xA1).write(0b0000_0010);
    Port::<u8>::new(0x21).write(0x01);          // 8086 mode
    Port::<u8>::new(0xA1).write(0x01);
    Port::<u8>::new(0x21).write(0xFF);          // mask all
    Port::<u8>::new(0xA1).write(0xFF);
}
```

**3. Bring up the LAPIC timer** at 1 kHz. The timer fires vector 32;
the ISR calls `scheduler::tick()`.

**4. Task struct and ready queue.**

```rust
pub struct Task {
    pub id:     TaskId,
    pub regs:   SavedRegs,
    pub kstack: KernelStack,
    pub state:  State,    // Ready | Running | Blocked | Dead
    pub prio:   Priority,
}

pub static SCHEDULER: Spinlock<Scheduler> = Spinlock::new(Scheduler::new());
```

**5. Context switch.** This is one of the few places assembly is
non-negotiable.

```asm
; switch.S — switch(prev: *mut Task, next: *mut Task)
global  context_switch
context_switch:
    push    rbx
    push    rbp
    push    r12
    push    r13
    push    r14
    push    r15
    mov     [rdi], rsp           ; prev->rsp = current rsp
    mov     rsp, [rsi]           ; rsp = next->rsp
    pop     r15
    pop     r14
    pop     r13
    pop     r12
    pop     rbp
    pop     rbx
    ret                          ; returns into next task's saved RIP
```

Only callee-saved registers need saving here; the caller's other
registers are already on its stack by the calling convention.

**6. Round-robin scheduler.** Each tick rotates the ready queue. A
small priority bias lets interactive tasks edge ahead — never
starves.

#### Verification

Spawn five threads, each printing its task ID + a counter, sleep 30
seconds, count interleaved output. Add a deliberate deadlock case
(two threads grabbing two spinlocks in opposite orders) and confirm
your deadlock detector (a debug build feature) catches it.

#### Common bugs

- **Triple fault on first timer tick.** Your IDT entry for vector 32
  points at the wrong address (off by one segment offset). Re-check
  `offset_lo / offset_mid / offset_hi`.
- **Tasks print in lockstep, not interleaved.** Timer is firing but
  preemption is gated behind a global lock you never release.
- **Context switch returns to garbage.** You either saved the wrong
  registers or pushed/popped in the wrong order. The order in the
  push/pop sequences must mirror exactly.
- **Stack overflow into another task's stack.** Set up the TSS with
  per-CPU IST stacks for fatal exceptions; otherwise a stack
  overflow in an ISR triple-faults.

#### Reading

- OSTEP, chapter on CPU scheduling.
- Intel SDM Vol. 3, Ch. 10 (Advanced Programmable Interrupt
  Controller).
- *Linux Kernel Development*, Robert Love — chapters on the
  scheduler.

#### Done when…

- Five tasks print interleaved output for 30 s with no deadlocks.
- The leak detector reports zero outstanding allocations after they
  finish.

---

### Phase 4 — Drivers

> Goal: keyboard input echoes to the framebuffer console, PCI
> devices are enumerated and named, AHCI sector reads return correct
> data.

#### Concepts to know first

- The PCI configuration space (256 bytes per device, base addresses
  in BARs)
- MSI-X interrupt assignment
- The PS/2 controller (ports `0x60` and `0x64`)
- Memory-mapped vs port-mapped I/O
- The AHCI specification at a high level (HBA → ports → command
  slots)

#### Step-by-step

Drivers implement a small `Device` trait and live under
`kernel/drivers/`. They never call up into core kernel beyond the
trait.

```rust
pub trait Device {
    fn name(&self) -> &'static str;
    fn class(&self) -> DeviceClass;
    fn ioctl(&self, cmd: u32, arg: usize) -> Result<usize, IoError>;
}
```

**Framebuffer console.** GOP framebuffer from the bootloader handoff,
8×16 bitmap font, scrolling, color attribute byte. ~300 lines.

**PS/2 keyboard.** Scan-code set 2 by default; translation table for
US layout; dead-key handling for compose sequences.

**PCI enumeration.** Walk buses 0–255, devices 0–31, functions 0–7.
For each function, read vendor:device, class, subclass; print a line.

```rust
pub fn enumerate() -> Vec<PciDevice> {
    let mut out = Vec::new();
    for bus in 0..=255 {
        for dev in 0..32 {
            for func in 0..8 {
                let vendor = pci_read(bus, dev, func, 0x00) & 0xFFFF;
                if vendor == 0xFFFF { continue; }
                out.push(PciDevice::probe(bus, dev, func));
            }
        }
    }
    out
}
```

**AHCI.** Find the HBA in the PCI list (class `0x01`, subclass
`0x06`). Map its BAR. Initialise ports, allocate command list and
received FIS buffers. Implement `read_sectors(lba, count, buf)` and
`write_sectors(...)`. Verify with a known disk image's hash.

**virtio-net.** For QEMU only. Read the virtio 1.1 specification,
chapters 5.1 and 5.1.6.

#### Common bugs

- **PCI BAR returns 0xFFFFFFFF.** You read a non-existent function.
  Skip when vendor = `0xFFFF`.
- **AHCI hangs forever on command issue.** You forgot to clear the
  PxIS bits before issuing.
- **Keyboard echoes the wrong character.** Scan-code set 1 vs set 2
  vs set 3 — check what your firmware set up.

#### Done when…

- Typing on the keyboard echoes to the framebuffer at >60 keys/s.
- A SHA-256 of 64 MiB read from disk matches the host-side hash.

---

### Phase 5 — krxfs (filesystem)

> Goal: boot from a krxfs disk image, list `/etc`, read
> `/etc/keroxos-release`, write to `/var/log/keroxos.log`, recover
> from a synthetic mid-write crash.

#### Concepts to know first

- VFS abstraction (vnodes, mount points)
- Log-structured filesystems (LFS, BSD-style)
- Crash consistency and the journaling model
- B-trees vs hash maps for directory indexing

#### On-disk format

```
+----------------+ block 0
| SUPERBLOCK     | magic, version, root inode, checkpoint ptr
+----------------+
| LOG SEGMENT 0  | append-only log of writes + metadata
+----------------+
| LOG SEGMENT 1  |
+----------------+
| ...            |
+----------------+
| CHECKPOINT     | snapshot of dir tree + SHA-256 of log tail
+----------------+
```

Every block is 4 KiB. Writes go to the log; reads consult an
in-memory index built by replay-from-checkpoint on mount.

#### Step-by-step

1. Author `mkfs.krxfs` (a host-side tool, written in safe Rust with
   `std`) — creates a fresh superblock and an empty log segment.
2. Implement the in-kernel mount: open block device, read
   superblock, replay the log from the last checkpoint forward.
3. Implement `read`, `write`, `open`, `close`, `mkdir`, `unlink`.
4. Implement `fsck.krxfs` — verify SHA-256 of each block range
   against the checkpoint.
5. Crash test: write a 64 MiB file in 4 KiB chunks, hard-kill QEMU
   mid-write, remount, verify the file truncated cleanly at the
   last good block.

#### Done when…

- `mkfs.krxfs && mount && ls /etc` works.
- Synthetic mid-write crash → remount → no data loss past the last
  log block.

---

### Phase 6 — Network stack

> Goal: open a TCP connection from userland (or a kernel test
> task) and exchange bytes with the host.

#### Concepts to know first

- Ethernet framing, ARP, ICMP, IPv4, UDP, TCP (states + sliding
  window)
- The virtio-net device model
- Poll-mode vs interrupt-driven RX
- Reno congestion control (simplest sane choice; CUBIC later)

#### Step-by-step

1. Driver: virtio-net for QEMU, e1000 stub for real hardware. RX
   ring receives frames into preallocated buffers.
2. Layer 2 / ARP: cache, request, reply, age-out.
3. IPv4: routing table, fragmentation off (max MTU only).
4. ICMP echo: reply to `ping`.
5. UDP: a tiny socket API.
6. TCP: implement the RFC 793 state machine, SACK, Reno. Test
   against a Linux host running `nc`.
7. DNS resolver in userland (Phase 7 dependency).

#### Done when…

- `ping kerox.dev` from KeroxOS replies cleanly.
- A 16 MiB file transfers from a host HTTP server with no checksum
  drift.

---

### Phase 7 — Userland & syscall ABI

> Goal: boot into a usable shell, run `ls /`, `cat /etc/release`,
> `ps`, `htop` (our reimplementation).

#### The syscall list (v1.0 draft)

```
// I/O          read write open close mmap munmap
// process      fork execve wait exit kill getpid
// signal       sigaction nanosleep
// time         clock_gettime
// fs           stat unlink mkdir rmdir chdir getcwd
// net          socket bind connect listen accept sendto recvfrom
// pipe         pipe dup dup2
// random       getrandom
// audit        audit_emit
// poll         select
```

Total: ~40 calls, freezing at v1.0. Anything that can be done in
userland must not be a syscall.

#### Step-by-step

1. Define the syscall numbers and ABI (registers in: `rax = nr`;
   args: `rdi rsi rdx r10 r8 r9`; return in `rax`).
2. Write the trap entry stub in assembly: save user state, switch
   to kernel stack, dispatch, restore.
3. Write `init` (PID 1) which mounts `/`, spawns a tty, execs the
   shell.
4. Write `ksh` — POSIX-leaning, line editing, history file in
   `$HOME/.ksh_history`.
5. Write `coreutils-rs` — the 30 utilities you actually want.

#### Done when…

- Boot to shell, run `ls -la /`, `cat /etc/release`, `ps`.
- The shell survives `Ctrl-C` and `Ctrl-Z` correctly.

---

### Phase 8 — krx (package manager)

> Goal: `krx install rkernel-net` resolves, fetches, verifies,
> builds, and installs. A second machine running the same command
> produces a byte-identical artifact.

#### Manifest format

```toml
# Krx.toml
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
sig  = "MEUCIQD…"
```

#### Reproducibility

Same source + same manifest + same pinned toolchain → same output
hash. CI rebuilds every release on three runners; mismatches fail
the release.

#### Sub-commands

- `krx install <pkg>` — resolve, fetch, verify, build, install
- `krx run <pkg>` — install + exec in a sandbox
- `krx build` — build the current manifest
- `krx publish` — sign + push to the registry
- `krx verify <pkg>` — recompute the hash, compare to registry
- `krx audit` — dump the append-only audit log of every install

#### Done when…

- Three independent machines installing the same package land on the
  same hash.

---

### Phase 9 — Offensive tools

All four tools are written in Rust, used under our disclosure policy,
released under MIT + Apache-2.0.

#### viper — kernel introspection

A ring-0 tracer and live symbol walker.

- DWARF parser (`gimli` crate)
- Walk `task_struct`, `vfs`, `net` structures live without a debugger
- Optional eBPF-shaped event filter

Sample: print every running thread by name without attaching gdb.

#### fang — raw packet crafter

Hand-built TCP/IP stack for crafting, replaying, dissecting.

- L2/L3/L4 packet builders
- PCAP read/write
- Stateless TCP option fingerprinter
- Deterministic output diffs against `scapy` for the same inputs

#### molt — loader & injection research

Position-independent Rust loaders for AV/EDR research, used against
our own labs under disclosure.

- No CRT, no `std`
- Inline asm trampolines
- Shellcode-as-data payloads
- Always emits an audit-log entry naming the operator

#### coil — coverage-guided fuzzer

`no_std`-friendly snapshot fuzzer for kernel paths in QEMU.

- LLVM SanitizerCoverage instrumentation
- Snapshot fuzzing of kernel syscalls
- Corpus minimisation
- Runs as part of every PR's CI

#### Reading

- Brumley & Schwartz, *Bitblaze* papers (binary analysis foundation).
- Aleph One, *Smashing the Stack for Fun and Profit*. Still
  instructive 30 years later.
- The `american-fuzzy-lop` and `libafl` docs (theory underlying
  coil).

#### Done when…

- viper prints all running threads on a stock KeroxOS.
- fang's output diffs identically against scapy for a 100-packet
  fixture.
- coil finds a planted bug in our own VFS within 5 minutes from
  cold.

---

### Phase 10 — Hardening & first release

> Goal: cut v0.1.0 — "boots, browses, builds".

#### Checklist

- Threat model document
- Audit log SHA-256 chain verifier
- Fuzzing CI: coil runs against every PR
- `SECURITY.md` published with PGP key + disclosure flow
- Reproducible-build proof from three independent rebuilders
- Tag `v0.1.0`, sign release tarball with the project key, publish
  signed `SHA256SUMS`

#### Done when…

- A third party can rebuild from source and the binary hashes match.

---

## Part 6 — Repository layout

```
keroxlabs/
├── README.md                # one-page intro
├── ROADMAP.md               # this file
├── LICENSE-MIT
├── LICENSE-APACHE
├── SECURITY.md              # disclosure policy + PGP
├── CONTRIBUTING.md          # how to contribute, RFC process
├── DEVLOG.md                # weekly engineering notes
│
├── kernel/                  # ring 0
│   ├── boot/                # multiboot2, UEFI stub
│   ├── arch/x86_64/
│   ├── arch/aarch64/
│   ├── mm/                  # memory management
│   ├── sched/
│   ├── irq/
│   ├── net/
│   ├── fs/
│   ├── drivers/
│   └── audit/
│
├── krx/                     # package manager
│   ├── manifest/
│   ├── resolver/
│   ├── builder/
│   ├── registry-client/
│   └── cli/
│
├── tools/
│   ├── viper/
│   ├── fang/
│   ├── molt/
│   └── coil/
│
├── userland/
│   ├── init/
│   ├── ksh/
│   ├── coreutils/
│   └── libkerox/            # libc-shaped facade
│
├── docs/
│   ├── rfcs/                # RFC-XXXX/
│   ├── design/              # architecture docs
│   └── disclosures/         # public CVE write-ups
│
├── kerox-www/               # this site
└── ci/
    ├── github/              # workflows
    └── nix/                 # reproducible build env
```

---

## Part 7 — Governance, contributing, RFCs

- **Maintainers:** small, named, public.
- **RFC process:** any change touching architecture, syscall ABI,
  on-disk format, or registry protocol goes through an RFC. RFCs live
  in `docs/rfcs/RFC-XXXX-<slug>.md` and are numbered.
- **PRs** require one maintainer approval and a green CI. Rust code
  must pass `cargo clippy -- -D warnings`, `cargo fmt --check`, and
  the in-tree test suite.
- **Conventional Commits:** `type(scope): description` —
  `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `security`.
- **Forum (planned):** `forum.kerox.dev` — long-form async
  discussion, RFC pre-flight chat, weekly architecture office hours.
  See the landing page for opening date.

---

## Part 8 — Security & disclosure

- 90-day responsible disclosure window
- PGP key published at `kerox.dev/.well-known/pgp-key.txt`
- `security@kerox.dev` for reports
- Tools (viper / fang / molt / coil) are **never** used outside
  authorised engagements or our own lab
- Every disclosure ends in: (a) upstream patch landed, (b) public
  write-up, (c) entry in `docs/disclosures/`

---

## Part 9 — Quarterly milestones

Dates assume a hobby cadence — evenings + weekends, two maintainers.

| Quarter   | Milestone                                              |
| --------- | ------------------------------------------------------ |
| Q1 2026   | Phases 0 + 1 — toolchain + ring-0 boot                 |
| Q2 2026   | Phases 2 + 3 — memory + scheduling                     |
| Q3 2026   | Phases 4 + 5 — drivers + krxfs                         |
| Q4 2026   | Phase 6 — networking                                   |
| Q1 2027   | Phase 7 — userland + syscall ABI freeze                |
| Q2 2027   | Phase 8 — krx 1.0 + signed registry                    |
| Q3 2027   | Phase 9 — first releases of viper / fang               |
| Q4 2027   | Phase 9 cont. — molt / coil + first disclosure cycle   |
| Q1 2028   | Phase 10 — hardening, fuzzing CI, v0.1.0 release       |

---

## Part 10 — Resources

### Books (in approximate reading order)

1. **The Rust Book** — Steve Klabnik & Carol Nichols. Free online.
2. **Programming Rust, 2nd ed.** — Blandy, Orendorff, Tindall.
3. **Operating Systems: Three Easy Pieces (OSTEP)** —
   Remzi & Andrea Arpaci-Dusseau. Free PDF. The single best OS
   undergraduate text.
4. **Computer Systems: A Programmer's Perspective** — Bryant &
   O'Hallaron. The book that makes you finally understand the
   memory hierarchy.
5. **Linux Kernel Development, 3rd ed.** — Robert Love. Old enough
   to be readable, current enough to be useful.
6. **Linkers and Loaders** — John Levine. Still the canonical
   reference; chapter 3 is required for Phase 1.
7. **TCP/IP Illustrated, Volume 1** — Richard Stevens. The book that
   makes Phase 6 possible.

### Papers

- *The Slab Allocator*, Bonwick (USENIX 1994).
- *The Design and Implementation of a Log-Structured File System*,
  Rosenblum & Ousterhout (1992).
- *seL4: Formal Verification of an OS Kernel*, Klein et al. (SOSP
  2009).
- *Multics: The History*, Corbató & Vyssotsky (1965). For taste.

### Online

- [Phil Oppermann — *Writing an OS in Rust*](https://os.phil-opp.com/) — load-bearing.
- [OSDev Wiki](https://wiki.osdev.org/) — patchy but irreplaceable.
- [Intel SDM](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html) — keep Vol. 3 open.
- [Linux Cross Reference (Elixir)](https://elixir.bootlin.com/linux/latest/source) — to grep for "how does Linux do X".

### Talks

- *Writing an OS in Rust* — Phil Oppermann (RustConf 2018).
- *The Birth and Death of JavaScript* — Gary Bernhardt. Watch it
  before you read Phase 7.

---

## Appendix A — Glossary

- **ABI** — Application Binary Interface. The contract between
  binaries, lower-level than an API.
- **APIC** — Advanced Programmable Interrupt Controller. The modern
  replacement for the 8259 PIC. The Local APIC (LAPIC) is per-CPU;
  the I/O APIC routes external interrupts.
- **buddy allocator** — Frame allocator that splits and merges
  power-of-two sized blocks.
- **DWARF** — Debugging info format embedded in ELF binaries.
- **ELF** — Executable and Linkable Format. The on-disk shape of
  every Unix binary you have ever touched.
- **GDT** — Global Descriptor Table. On x86, holds segment
  descriptors. In long mode, it is mostly vestigial — but you still
  have to set it up.
- **IDT** — Interrupt Descriptor Table. Maps interrupt vectors to
  handler addresses.
- **LFS** — Log-structured filesystem.
- **MMU** — Memory Management Unit. The CPU hardware that translates
  virtual addresses to physical addresses.
- **MSR** — Model-Specific Register. Per-CPU configuration knobs
  read/written via `RDMSR`/`WRMSR`.
- **no_std** — Rust compilation mode without the standard library.
- **PCI** — Peripheral Component Interconnect. The bus most devices
  on a modern PC are on, even when they advertise as PCIe.
- **PML4 / PDPT / PD / PT** — The four levels of x86_64 page
  tables.
- **ring 0 / ring 3** — Most / least privileged CPU protection
  levels.
- **slab** — Cache of fixed-size object slots.
- **TSS** — Task State Segment. Holds per-task state on x86; in long
  mode it mostly holds IST stack pointers.
- **VFS** — Virtual File System.

---

## Appendix B — File templates

### B.1 `rust-toolchain.toml`

```toml
[toolchain]
channel    = "nightly-2026-03-01"
components = ["rust-src", "llvm-tools-preview", "rustfmt", "clippy"]
targets    = ["x86_64-unknown-none", "aarch64-unknown-none"]
profile    = "minimal"
```

### B.2 `justfile` (top level)

```make
default: lint-all test

dev:
    rustup toolchain install $(rust-toolchain.toml-channel)
    cargo --version
    qemu-system-x86_64 --version

build:
    cargo build --release --manifest-path kernel/Cargo.toml

qemu: build
    qemu-system-x86_64 \
        -bios /usr/share/ovmf/OVMF.fd \
        -kernel target/x86_64-unknown-none/release/kernel \
        -serial stdio -display none -no-reboot -no-shutdown

test:
    cargo test --workspace --target x86_64-unknown-none

lint-all:
    cargo fmt --check --all
    cargo clippy --workspace -- -D warnings
```

### B.3 Kernel `Cargo.toml`

```toml
[package]
name        = "kernel"
version     = "0.0.1"
edition     = "2021"
license     = "MIT OR Apache-2.0"

[[bin]]
name = "kernel"
path = "src/main.rs"

[dependencies]
spin = { version = "0.9", default-features = false }
bitflags = "2"
log = "0.4"
linked_list_allocator = "0.10"   # only until our slab is online

[profile.release]
debug = true            # we want symbols on disk for viper
panic = "abort"
opt-level = "s"
```

### B.4 GitHub Actions CI sketch

```yaml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    container: ghcr.io/keroxlabs/build-env:2026-03
    steps:
      - uses: actions/checkout@v4
      - run: just lint-all
      - run: just test
      - run: just qemu | tee qemu.log
      - run: grep "hello, ring 0" qemu.log
```

---

## Appendix C — Common bugs across phases

Almost every bug you will hit fits one of these archetypes.

1. **Page-table bug.** Wrong PML4 entry, wrong flags (forgot
   present, forgot writable), missed TLB flush. Always print the
   walk in debug.
2. **Linker script bug.** Section discarded that you needed
   (especially `.boot`), wrong VMA, two `KEEP(...)` directives in
   conflict. `objdump -h` is your friend.
3. **ABI bug.** You saved or restored the wrong registers across a
   context switch / syscall entry. Read the System V AMD64 ABI
   §3.2 again.
4. **Off-by-one in a length / count.** Affects everything from heap
   to PCI to TCP. Encode lengths as exclusive bounds in all new code
   and prefer iterators over indices.
5. **TLB confusion.** You changed a mapping but forgot `invlpg`. Or
   you `invlpg`'d the wrong address. Or you should have flushed the
   entire TLB by reloading CR3.
6. **Race on the printer.** Your `println!` macro tries to take a
   lock that the previous task held when it triple-faulted. Use an
   irq-safe printer until scheduling is stable.
7. **Heap leak.** Almost always a `Box` that you converted to
   `*mut` and forgot to `Box::from_raw` on dispose. The debug leak
   detector catches it instantly; turn it on in CI.
8. **PCI / disk weirdness on real hardware.** The vendor wrote the
   datasheet in Mandarin and your translation differs from your
   firmware's. Diff your driver against the equivalent in OpenBSD;
   their driver is usually the cleanest.

If none of these fit, you have probably discovered something
genuinely new. Write it up for the forum.

---

_Last updated: 2026-05-21 · KeroxLabs · MIT · Apache-2.0_
