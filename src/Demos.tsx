import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCheck,
  Download,
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Workflow,
  FileInput,
  ShieldCheck,
  Database,
  Tags,
  Bell,
  ListChecks,
} from "lucide-react";

const stages = ["New", "Contacted", "Qualified", "Scheduled"] as const;
type Stage = (typeof stages)[number];
type Lead = {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: Stage;
  appointment: string;
};
const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Jamie Rivera",
    company: "Northstar Studio",
    value: 1200,
    stage: "New",
    appointment: "",
  },
  {
    id: 2,
    name: "Alex Chen",
    company: "Bloom & Co.",
    value: 850,
    stage: "New",
    appointment: "",
  },
  {
    id: 3,
    name: "Morgan Taylor",
    company: "Forma Creative",
    value: 1600,
    stage: "Contacted",
    appointment: "",
  },
  {
    id: 4,
    name: "Sam Patel",
    company: "Evergreen Works",
    value: 950,
    stage: "Qualified",
    appointment: "",
  },
  {
    id: 5,
    name: "Jordan Lee",
    company: "Fieldwork Studio",
    value: 1400,
    stage: "Scheduled",
    appointment: "Sample slot · Tuesday, 10:00 AM",
  },
];
export function CRMDemo() {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const active = leads.find((l) => l.id === selected);
  const visible = leads.filter((l) => filter === "All" || l.stage === filter);
  function update(id: number, stage: Stage, appointment?: string) {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              stage,
              appointment:
                appointment ?? (stage === "Scheduled" ? l.appointment : ""),
            }
          : l,
      ),
    );
  }
  return (
    <div className="demo crm-demo">
      <div className="demo-toolbar">
        <div>
          <span className="micro">WORKSPACE / SALES</span>
          <h3>
            Lead pipeline <span className="count">{leads.length}</span>
          </h3>
        </div>
        <label>
          Stage
          <select
            aria-label="Filter leads by stage"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            {stages.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="demo-metrics">
        <div>
          <span>Sample pipeline</span>
          <strong>
            ${leads.reduce((s, l) => s + l.value, 0).toLocaleString()}
          </strong>
        </div>
        <div>
          <span>Qualified or scheduled</span>
          <strong>
            {
              leads.filter((l) => ["Qualified", "Scheduled"].includes(l.stage))
                .length
            }{" "}
            / {leads.length}
          </strong>
        </div>
        <div>
          <span>Sample appointments</span>
          <strong>{leads.filter((l) => l.appointment).length}</strong>
        </div>
      </div>
      <div className="kanban">
        {stages.map((stage, i) => (
          <div className="kanban-column" key={stage}>
            <h4>
              <i className={"stage-dot dot-" + i} />
              {stage}
              <span>{visible.filter((l) => l.stage === stage).length}</span>
            </h4>
            <div className="kanban-cards">
              <AnimatePresence mode="popLayout">
                {visible
                  .filter((l) => l.stage === stage)
                  .map((l) => (
                    <motion.button
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={l.id}
                      className={
                        "lead-card " + (selected === l.id ? "selected" : "")
                      }
                      onClick={() => setSelected(l.id)}
                    >
                      <span className="avatar">
                        {l.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <strong>{l.name}</strong>
                      <span>{l.company}</span>
                      <div>
                        <b>${l.value.toLocaleString()}</b>
                        <ArrowRight size={13} />
                      </div>
                    </motion.button>
                  ))}
              </AnimatePresence>
              {!visible.some((l) => l.stage === stage) && (
                <p className="empty">No leads in this view</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="demo-hint">
        Select a lead to inspect details, move stages, or schedule a sample
        appointment.
      </p>
      {active && (
        <motion.div
          className="lead-detail"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h4>{active.name}</h4>
            <p>{active.company} · Fictional lead</p>
          </div>
          <label>
            Pipeline stage
            <select
              aria-label="Change lead stage"
              value={active.stage}
              onChange={(e) => update(active.id, e.target.value as Stage)}
            >
              {stages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button
            className="button small"
            onClick={() =>
              update(active.id, "Scheduled", "Sample slot · Wednesday, 2:00 PM")
            }
          >
            <Calendar size={15} /> Schedule sample
          </button>
          <p role="status">
            {active.appointment || "No appointment scheduled"}
          </p>
        </motion.div>
      )}
      <button
        className="text-button"
        onClick={() => {
          setLeads(initialLeads);
          setFilter("All");
          setSelected(null);
        }}
      >
        <RotateCcw size={14} /> Reset demo
      </button>
    </div>
  );
}
const steps = [
  {
    name: "Form submission",
    icon: FileInput,
    detail: "A fictional inquiry arrives from Avery at Example Studio.",
    log: "Received sample inquiry #DEMO-1042.",
  },
  {
    name: "Data validation",
    icon: ShieldCheck,
    detail: "Required fields and email structure are checked.",
    log: "Name, company, and email checks passed.",
  },
  {
    name: "CRM record",
    icon: Database,
    detail: "A sample record is prepared in the local demonstration.",
    log: "Prepared fictional contact record.",
  },
  {
    name: "Lead categorization",
    icon: Tags,
    detail:
      "An illustrative category is assigned: Operations support. This fixed result represents where an AI-assisted step could fit.",
    log: "Illustrative category: Operations support.",
  },
  {
    name: "Internal notification",
    icon: Bell,
    detail: "The demo illustrates a team handoff. No notification is sent.",
    log: "Simulated internal notification prepared.",
  },
  {
    name: "Follow-up queue",
    icon: ListChecks,
    detail: "A sample follow-up task is placed in the local queue.",
    log: "Sample follow-up queued. Simulation complete.",
  },
];
export function WorkflowDemo() {
  const [completed, setCompleted] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!playing) return;
    if (completed >= steps.length) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCompleted((c) => c + 1);
      setSelected(Math.min(completed, 5));
    }, 1100);
    return () => clearTimeout(timer);
  }, [playing, completed]);
  return (
    <div className="demo workflow-demo">
      <div className="demo-toolbar">
        <div>
          <span className="micro">AUTOMATION / LOCAL SIMULATION</span>
          <h3>From inquiry to action</h3>
        </div>
        <span className={"status-pill " + (playing ? "running" : "")}>
          {playing
            ? "Running"
            : completed === 6
              ? "Complete"
              : completed > 0
                ? "Paused"
                : "Ready"}
        </span>
      </div>
      <div className="workflow-controls">
        <button
          className="button small"
          disabled={completed === 6}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}{" "}
          {playing ? "Pause" : "Play demo"}
        </button>
        <button
          className="button secondary small"
          disabled={playing || completed === 6}
          onClick={() => {
            setCompleted((c) => c + 1);
            setSelected(Math.min(completed, 5));
          }}
        >
          <StepForward size={15} /> Next step
        </button>
        <button
          className="icon-button"
          aria-label="Reset workflow"
          onClick={() => {
            setCompleted(0);
            setPlaying(false);
            setSelected(0);
          }}
        >
          <RotateCcw size={17} />
        </button>
        <span>{completed} / 6 steps</span>
      </div>
      <div className="workflow-track">
        {steps.map((s, i) => (
          <button
            key={s.name}
            className={
              "workflow-node " +
              (completed > i ? "done " : "") +
              (selected === i ? "active" : "")
            }
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span className="node-icon">
              {completed > i ? <Check size={22} /> : <s.icon size={22} />}
            </span>
            <small>0{i + 1}</small>
            <strong>{s.name}</strong>
            {i < 5 && (
              <span
                className={
                  "node-line " + (playing && completed === i ? "flowing" : "")
                }
              />
            )}
          </button>
        ))}
      </div>
      <div className="workflow-bottom">
        <div>
          <span className="micro">STEP 0{selected + 1}</span>
          <h4>{steps[selected].name}</h4>
          <p>{steps[selected].detail}</p>
        </div>
        <div className="execution-log" aria-live="polite">
          <span className="micro">EXECUTION LOG</span>
          {completed === 0 ? (
            <p>Ready when you are. Start the simulation.</p>
          ) : (
            steps.slice(0, completed).map((s, i) => (
              <p key={s.name}>
                <Check size={12} />
                <code>0{i + 1}</code> {s.log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
type Row = { name: string; email: string; category: string };
const rawRows: Row[] = [
  { name: " Jamie Rivera ", email: "JAMIE@example.com", category: "CRM" },
  { name: "Alex Chen", email: "alex@example.com", category: "Operations" },
  { name: "Jamie Rivera", email: "jamie@example.com ", category: "CRM" },
  {
    name: " Morgan Taylor",
    email: "morgan@example.com",
    category: "Automation",
  },
  { name: "Sam Patel ", email: "sam@example.com", category: "Operations" },
  { name: "Alex Chen ", email: "ALEX@example.com", category: "Operations" },
  { name: "Jordan Lee", email: "jordan@example.com", category: "CRM" },
  { name: "Avery Brooks", email: "avery@example.com", category: "Automation" },
];
export const cleanRows = (rows: Row[]) =>
  Array.from(
    new Map(
      rows.map((r) => [
        r.email.trim().toLowerCase(),
        { ...r, name: r.name.trim(), email: r.email.trim().toLowerCase() },
      ]),
    ).values(),
  );
export function DataDemo() {
  const [clean, setClean] = useState(false);
  const [category, setCategory] = useState("All");
  const [exported, setExported] = useState(false);
  const rows = clean ? cleanRows(rawRows) : rawRows;
  const filtered = rows.filter(
    (r) => category === "All" || r.category === category,
  );
  function download() {
    const safe = (v: string) =>
      '"' + (/^[=+@\-\t\r]/.test(v) ? "'" + v : v).replaceAll('"', '""') + '"';
    const csv = [
      "Name,Email,Category",
      ...cleanRows(rawRows).map((r) =>
        [r.name, r.email, r.category].map(safe).join(","),
      ),
    ].join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "allen-roldan-demo-contacts.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExported(true);
  }
  return (
    <div className="demo data-demo">
      <div className="demo-toolbar">
        <div>
          <span className="micro">DATA / OPERATIONS SNAPSHOT</span>
          <h3>A clearer picture</h3>
        </div>
        <button className="button secondary small" onClick={download}>
          <Download size={15} /> Export clean CSV
        </button>
      </div>
      <div className="demo-metrics">
        <div>
          <span>Records {clean ? "after" : "before"} cleanup</span>
          <strong>{rows.length}</strong>
        </div>
        <div>
          <span>Duplicate emails</span>
          <strong>{clean ? 0 : 2}</strong>
        </div>
        <div>
          <span>Unique contacts</span>
          <strong>6</strong>
        </div>
      </div>
      <div className="data-actions">
        <button
          className="button small"
          disabled={clean}
          onClick={() => setClean(true)}
        >
          <CheckCheck size={16} />
          {clean ? "Data cleaned" : "Run cleanup"}
        </button>
        <button
          className="text-button"
          onClick={() => {
            setClean(false);
            setCategory("All");
            setExported(false);
          }}
        >
          <RotateCcw size={14} /> Reset
        </button>
        <label>
          Category
          <select
            aria-label="Filter data category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {["All", "CRM", "Operations", "Automation"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="cleanup-message" role="status">
        {clean
          ? "8 → 6 records. Two duplicate emails removed; names trimmed and emails standardized."
          : "Before cleanup: 8 records with duplicates and inconsistent formatting."}
        {exported ? " Clean CSV exported." : ""}
      </p>
      <div className="data-layout">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>
                    <span className="table-tag">{r.category}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chart">
          <span className="micro">RECORDS BY CATEGORY</span>
          {["CRM", "Operations", "Automation"].map((c, i) => {
            const count = rows.filter((r) => r.category === c).length;
            return (
              <div key={c}>
                <p>
                  {c}
                  <b>{count}</b>
                </p>
                <div className="bar-track">
                  <motion.div
                    className={"bar bar-" + i}
                    initial={false}
                    animate={{ width: (count / 4) * 100 + "%" }}
                    transition={{ duration: 0.45 }}
                  />
                </div>
              </div>
            );
          })}
          <small>
            Fictional dataset · {clean ? "After" : "Before"} cleanup
          </small>
        </div>
      </div>
    </div>
  );
}
export function MiniPreview({ type }: { type: "crm" | "workflow" | "data" }) {
  return (
    <div className={"mini-preview mini-" + type} aria-hidden="true">
      {type === "crm" ? (
        <>
          <div className="mini-top">
            <span>Lead workspace</span>
            <span>•••</span>
          </div>
          <div className="mini-columns">
            {["New", "Contacted", "Qualified"].map((s, i) => (
              <div key={s}>
                <small>
                  <i className={"stage-dot dot-" + i} />
                  {s}
                </small>
                {Array.from({ length: i === 1 ? 1 : 2 }, (_, j) => (
                  <div className="mini-lead" key={j}>
                    <i />
                    <span />
                    <b />
                    <em />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : type === "workflow" ? (
        <>
          <span className="mini-label">INQUIRY → OPPORTUNITY</span>
          <div className="mini-flow">
            <div>
              <FileInput size={23} />
              <small>Capture</small>
            </div>
            <span />
            <div className="highlight">
              <Workflow size={27} />
              <small>Process</small>
            </div>
            <span />
            <div>
              <CheckCheck size={23} />
              <small>Follow up</small>
            </div>
          </div>
          <div className="mini-log">
            <i /> Workflow ready <span>6 connected steps</span>
          </div>
        </>
      ) : (
        <>
          <div className="mini-top">
            <span>Operations overview</span>
            <span>•••</span>
          </div>
          <div className="mini-stats">
            <div>
              <small>Unique contacts</small>
              <b>06</b>
            </div>
            <div>
              <small>Duplicates removed</small>
              <b>
                02 <Check size={14} />
              </b>
            </div>
          </div>
          <div className="mini-bars">
            {[32, 50, 43, 73, 58, 88, 73, 100, 87].map((h, i) => (
              <i key={i} style={{ height: h + "%" }} />
            ))}
          </div>
          <div className="mini-axis">
            <span>BEFORE</span>
            <span>AFTER CLEANUP</span>
          </div>
        </>
      )}
    </div>
  );
}
