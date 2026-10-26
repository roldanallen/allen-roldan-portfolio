import ProfilePhoto from "./ProfilePhoto";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronRight,
  CircleHelp,
  Database,
  Layers3,
  Menu,
  MessageSquare,
  Monitor,
  Plus,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { approvedUpworkUrl, profile, projects, type Project } from "./content";
import { CRMDemo, DataDemo, MiniPreview, WorkflowDemo } from "./Demos";

const ease = [0.22, 1, 0.36, 1] as const;
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}
function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={"hero-visual " + (visible ? "" : "offscreen")}
      aria-label="Illustrative connected operations workspace"
    >
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="orbit-satellite" />
      <div className="visual-label">
        <span /> CONNECTED BY DESIGN
      </div>
      <div className="system-card">
        <div className="system-top">
          <span>
            <Layers3 size={17} /> Operations workspace
          </span>
          <span className="window-dots">•••</span>
        </div>
        <div className="system-body">
          <div className="system-heading">
            <div>
              <small>YOUR BUSINESS, IN SYNC</small>
              <h3>A little more clarity.</h3>
            </div>
            <span className="system-icon">
              <Sparkles size={22} />
            </span>
          </div>
          <div className="system-row">
            <span className="system-row-icon blue">
              <Database size={18} />
            </span>
            <div>
              <strong>CRM & lead operations</strong>
              <small>Every contact in the right place</small>
            </div>
            <Check size={15} />
          </div>
          <div className="system-row">
            <span className="system-row-icon purple">
              <Workflow size={18} />
            </span>
            <div>
              <strong>Practical automation</strong>
              <small>Thoughtful workflows. Fewer steps.</small>
            </div>
            <Check size={15} />
          </div>
          <div className="system-row">
            <span className="system-row-icon teal">
              <CheckCheck size={18} />
            </span>
            <div>
              <strong>Daily operations</strong>
              <small>Details handled. Progress visible.</small>
            </div>
            <Check size={15} />
          </div>
          <div className="system-footer">
            <span>
              <i /> Built around your workflow
            </span>
            <ShieldCheck size={16} />
          </div>
        </div>
      </div>
      <div className="float-card float-top">
        <span className="float-icon">
          <Check size={17} />
        </span>
        <div>
          <strong>Everything in its place</strong>
          <small>Organized. Connected. Clear.</small>
        </div>
        <span className="tiny-spark">✦</span>
      </div>
      <div className="float-card float-bottom">
        <span className="float-icon purple">
          <Workflow size={19} />
        </span>
        <div>
          <small>LESS MANUAL WORK</small>
          <strong>More room to move forward.</strong>
        </div>
      </div>
      <div className="visual-footnote">
        A preview of how I think about operations.
      </div>
    </div>
  );
}
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const el = dialog.current!;
    el.showModal();
    closeButton.current?.focus();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      el.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="dialog-shell"
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.3, ease }}
      >
        <div className="dialog-header">
          <div>
            <span className="eyebrow">{project.category}</span>
            <h2 id="project-title">{project.title}</h2>
          </div>
          <button
            ref={closeButton}
            aria-label="Close project"
            className="icon-button"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <div className="concept-label">
          <CircleHelp size={13} /> {project.status} — Simulated Data
        </div>
        <p className="dialog-intro">{project.shortDescription}</p>
        <div className="case-context">
          <div>
            <h3>The challenge</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>The approach</h3>
            <p>{project.solution}</p>
          </div>
        </div>
        {project.demoComponent === "crm" ? (
          <CRMDemo />
        ) : project.demoComponent === "workflow" ? (
          <WorkflowDemo />
        ) : (
          <DataDemo />
        )}
        <div className="case-context case-bottom">
          <div>
            <h3>How this could be used</h3>
            <p>{project.useCase}</p>
            <div className="tags">
              {project.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>What is simulated</h3>
            <p>{project.simulation}</p>
            <p>{project.implementationDetails}</p>
          </div>
        </div>
      </motion.div>
    </dialog>
  );
}
const services = [
  {
    icon: Database,
    title: "CRM & Lead Management",
    text: "A clear view of your contacts, pipeline, and next steps.",
    capabilities: [
      "Contact organization",
      "Pipeline maintenance",
      "Follow-up tracking",
    ],
  },
  {
    icon: Layers3,
    title: "Administrative Support",
    text: "Thoughtful support for the moving parts of your business.",
    capabilities: [
      "Document organization",
      "Calendar coordination",
      "Daily task management",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow & AI Automation",
    text: "Practical connections that simplify repetitive work.",
    capabilities: [
      "Workflow mapping",
      "Make.com automations",
      "AI-assisted processes",
    ],
  },
  {
    icon: Monitor,
    title: "Data & Reporting",
    text: "Organized information you can actually work with.",
    capabilities: [
      "Data entry & cleanup",
      "Spreadsheet management",
      "Operational reporting",
    ],
  },
  {
    icon: MessageSquare,
    title: "Customer Support",
    text: "Clear communication and dependable follow-through.",
    capabilities: [
      "Inquiry management",
      "Support documentation",
      "Issue coordination",
    ],
  },
];
export default function App() {
  const [menu, setMenu] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const upwork = approvedUpworkUrl(profile.upworkUrl);
  const reduced = useReducedMotion();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Allen Roldan home">
          <Mark />
          <span>
            allen<span className="brand-last">roldan</span>
            <i>.</i>
          </span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {["Home", "Services", "Projects", "Expertise", "About"].map((n) => (
            <a key={n} href={"#" + n.toLowerCase()}>
              {n}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#projects">
          Explore my work <ArrowUpRight size={15} />
        </a>
        <button
          className="mobile-toggle icon-button"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          aria-controls="mobile-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <AnimatePresence>
          {menu && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              className="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {["Home", "Services", "Projects", "Expertise", "About"].map(
                (n) => (
                  <a
                    key={n}
                    href={"#" + n.toLowerCase()}
                    onClick={() => setMenu(false)}
                  >
                    {n}
                    <ArrowUpRight size={16} />
                  </a>
                ),
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <main id="main">
        <section className="hero section" id="home">
          <div className="hero-grid">
            <div className="hero-copy">
              <Reveal>
                <div className="eyebrow hero-eyebrow">
                  <span className="live-dot" /> YOUR OPERATIONS. ELEVATED.
                </div>
              </Reveal>
              <h1>
                {[
                  "Smarter Workflows.",
                  "Smoother Operations.",
                  "Better Business.",
                ].map((line, i) => (
                  <motion.span
                    key={line}
                    initial={reduced ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.12 + i * 0.13, ease }}
                    className={i === 2 ? "gradient-text" : ""}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <Reveal delay={0.35}>
                <p className="hero-description">
                  I help growing businesses organize CRM systems, streamline
                  daily operations, and simplify repetitive work through
                  reliable support and practical automation.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="hero-actions">
                  <a className="button" href="#projects">
                    View my work <ArrowUpRight size={17} />
                  </a>
                  <a className="quiet-link" href="#services">
                    How I can help <ArrowRight size={16} />
                  </a>
                </div>
                <div className="hero-person">
                  <span className="small-monogram">AR</span>
                  <div>
                    <strong>Allen Roldan</strong>
                    <span>CRM & Operations VA · AI Automation</span>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal className="hero-art" delay={0.3}>
              <HeroVisual />
            </Reveal>
          </div>
          <div className="hero-bottom">
            <div>
              <span>CRM MANAGEMENT</span>
              <i />
              <span>BUSINESS OPERATIONS</span>
              <i />
              <span>WORKFLOW AUTOMATION</span>
            </div>
            <a href="#value" aria-label="Scroll to discover">
              SCROLL TO DISCOVER <ArrowDown size={13} />
            </a>
          </div>
        </section>
        <section className="value-section section" id="value">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                01 / A LITTLE STRUCTURE. A BIG DIFFERENCE.
              </span>
              <h2>
                Make space for
                <br />
                <span className="muted">what matters.</span>
              </h2>
            </div>
            <p>
              Good operations should feel effortless.
              <br />
              Behind that feeling is a system that works.
            </p>
          </Reveal>
          <div className="value-grid">
            <Reveal className="value-card value-blue">
              <div className="value-symbol">
                <Layers3 size={24} />
              </div>
              <h3>Stay organized.</h3>
              <p>
                Keep your information, records, and daily operations structured
                and easy to find.
              </p>
              <div className="organize-visual" aria-hidden="true">
                <span>
                  <i /> Contacts <Check size={12} />
                </span>
                <span>
                  <i /> Processes <Check size={12} />
                </span>
                <span>
                  <i /> Priorities <Check size={12} />
                </span>
              </div>
            </Reveal>
            <Reveal className="value-card" delay={0.08}>
              <div className="value-symbol">
                <Workflow size={24} />
              </div>
              <h3>Save valuable time.</h3>
              <p>
                Simplify recurring work and remove unnecessary manual steps from
                your day.
              </p>
              <div className="time-visual" aria-hidden="true">
                <span>Capture</span>
                <ArrowRight size={15} />
                <span>Connect</span>
                <ArrowRight size={15} />
                <span className="time-done">
                  <Check size={17} />
                </span>
              </div>
            </Reveal>
            <Reveal className="value-card value-purple" delay={0.16}>
              <div className="value-symbol">
                <Sparkles size={24} />
              </div>
              <h3>Build smarter systems.</h3>
              <p>
                Bring CRM tools and practical automation together around how
                your business works.
              </p>
              <div className="smart-visual" aria-hidden="true">
                <div>
                  <Database size={18} />
                </div>
                <span />
                <div className="smart-center">
                  <Sparkles size={22} />
                </div>
                <span />
                <div>
                  <CheckCheck size={18} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="services-section section" id="services">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">02 / HOW I CAN HELP</span>
              <h2>
                Reliable support.
                <br />
                <span className="muted">Thoughtfully connected.</span>
              </h2>
            </div>
            <p>
              From the everyday details to the workflows
              <br />
              that keep everything moving.
            </p>
          </Reveal>
          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.title} className="service-card" delay={i * 0.04}>
                <span className="service-number">0{i + 1}</span>
                <s.icon className="service-icon" size={24} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.capabilities.map((c) => (
                    <li key={c}>
                      <Plus size={12} />
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="projects-section section" id="projects">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">03 / IDEAS, PUT INTO PRACTICE</span>
              <h2>
                Explore the possibilities.
                <br />
                <span className="muted">Interact with the work.</span>
              </h2>
            </div>
            <p>
              Three working concepts. Real interactions.
              <br />A closer look at how I approach operations.
            </p>
          </Reveal>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <Reveal className="project-card" key={p.id} delay={i * 0.08}>
                <button
                  className="project-preview-button"
                  onClick={() => setProject(p)}
                  aria-label={"Explore " + p.category.toLowerCase()}
                >
                  <MiniPreview type={p.id} />
                  <span className="preview-open">
                    <ArrowUpRight size={18} />
                  </span>
                </button>
                <div className="project-copy">
                  <span className="eyebrow">
                    0{i + 1} / {p.category}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.shortDescription}</p>
                  <div className="concept-label">
                    Concept Demonstration — Simulated Data
                  </div>
                  <button
                    className="project-link"
                    onClick={() => setProject(p)}
                  >
                    Explore demonstration <ArrowUpRight size={17} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="project-note">
            <ShieldCheck size={14} /> Built to demonstrate my approach. No
            client work or business results are implied.
          </p>
        </section>
        <section className="expertise-section section" id="expertise">
          <Reveal className="expertise-intro">
            <span className="eyebrow">04 / THE TOOLKIT</span>
            <h2>
              The right tools.
              <br />
              <span className="muted">A practical mindset.</span>
            </h2>
            <p>
              Technology is most useful when it makes everyday work simpler.
              These are the tools and concepts I bring to the process.
            </p>
            <div className="learning">
              <span className="live-dot" />
              <div>
                <strong>Always building on the basics.</strong>
                <span>Currently exploring GoHighLevel</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="tool-groups">
            <div>
              <span className="micro">CRM & AUTOMATION</span>
              <div className="tool-list">
                <span>
                  <i className="tool-hubspot">H</i>HubSpot CRM
                </span>
                <span>
                  <i className="tool-make">M</i>Make.com
                </span>
                <span>
                  <i className="tool-gpt">
                    <Sparkles size={18} />
                  </i>
                  ChatGPT
                </span>
              </div>
            </div>
            <div>
              <span className="micro">PRODUCTIVITY & OPERATIONS</span>
              <div className="tool-list">
                <span>
                  <i className="tool-google">G</i>Google Workspace
                </span>
                <span>
                  <i className="tool-excel">X</i>Excel
                </span>
                <span>
                  <i className="tool-sheets">
                    <Database size={17} />
                  </i>
                  Google Sheets
                </span>
              </div>
            </div>
            <div>
              <span className="micro">TECHNICAL FOUNDATION</span>
              <div className="tool-list">
                <span>
                  <i className="tool-python">Py</i>Python
                </span>
                <span>
                  <i className="tool-sql">
                    <Database size={17} />
                  </i>
                  SQL
                </span>
              </div>
            </div>
          </Reveal>
        </section>
        <section className="about-section section" id="about">
          <Reveal>
            <ProfilePhoto />
          </Reveal>
          <Reveal className="about-copy">
            <span className="eyebrow">05 / A PERSON YOU CAN RELY ON</span>
            <h2>
              Hi, I’m Allen.
              <br />
              <span className="muted">I connect the details.</span>
            </h2>
            <p className="about-title">{profile.title}</p>
            <p>
              I’m a Computer Science graduate with hands-on experience in IT
              support, customer service, CRM workflows, and technical
              problem-solving.
            </p>
            <p>
              I enjoy bringing order to the everyday: organizing information,
              working through a technical issue, or finding a simpler way to get
              something done. My approach combines a technical foundation with
              clear communication and careful follow-through.
            </p>
            <div className="about-values">
              <span>
                <Check size={14} /> Detail-oriented
              </span>
              <span>
                <Check size={14} /> Systems-minded
              </span>
              <span>
                <Check size={14} /> Human-centered
              </span>
            </div>
          </Reveal>
        </section>
        <section className="final-section section">
          <Reveal>
            <div className="eyebrow">
              <span className="live-dot" /> GOOD WORK STARTS WITH A CLEAR NEXT
              STEP
            </div>
            <h2>
              Let’s make your business
              <br />
              run <span className="gradient-text">smoother.</span>
            </h2>
            <p>
              Thoughtful support. Practical systems. More room to focus.
              <br />
              Explore how I can support your operations.
            </p>
            <a
              className="button"
              href={upwork || "#projects"}
              {...(upwork
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {upwork ? "Connect on Upwork" : "Explore my work"}
              <ArrowUpRight size={17} />
            </a>
          </Reveal>
          <div className="closing-orbit" aria-hidden="true" />
        </section>
      </main>
      <footer className="site-footer">
        <a className="brand" href="#home">
          <Mark />
          <span>
            allen<span className="brand-last">roldan</span>
            <i>.</i>
          </span>
        </a>
        <span>Thoughtful systems. Better everyday work.</span>
        <span>© {new Date().getFullYear()} Allen Roldan</span>
        <a href="#home" aria-label="Back to top">
          <ArrowUpRight size={17} />
        </a>
      </footer>
      <AnimatePresence>
        {project && (
          <ProjectModal
            key={project.id}
            project={project}
            onClose={() => setProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
