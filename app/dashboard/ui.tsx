"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Task = { id: number; title: string; due: string; priority: "Alta" | "Media" | "Baja"; done: boolean };
type Doc = { id: number; name: string; area: string; status: "Pendiente" | "Revisado" | "Aceptado" };
type Message = { id: number; from: string; body: string; time: string; unread?: boolean };
type EventItem = { id: number; title: string; date: string; time: string; kind: string };

const seedTasks: Task[] = [
  { id: 1, title: "Enviar extractos bancarios de septiembre", due: "18 oct", priority: "Alta", done: false },
  { id: 2, title: "Revisar borrador de IVA", due: "21 oct", priority: "Media", done: false },
  { id: 3, title: "Confirmar datos de nómina", due: "24 oct", priority: "Baja", done: true },
];
const seedDocs: Doc[] = [
  { id: 1, name: "Factura_Septiembre.pdf", area: "Contabilidad", status: "Aceptado" },
  { id: 2, name: "Extracto_bancario_09.pdf", area: "Contabilidad", status: "Pendiente" },
  { id: 3, name: "Modelo_303_borrador.pdf", area: "Fiscal", status: "Revisado" },
];
const seedMessages: Message[] = [
  { id: 1, from: "Idea Gestión", body: "Hemos recibido la documentación de septiembre. Te avisamos cuando termine la revisión.", time: "Hoy, 09:42", unread: true },
  { id: 2, from: "Idea Gestión", body: "Recuerda que queda pendiente el extracto bancario.", time: "Ayer, 16:18" },
];
const seedEvents: EventItem[] = [
  { id: 1, title: "Reunión de seguimiento", date: "22 oct", time: "10:30", kind: "Reunión" },
  { id: 2, title: "Cierre fiscal trimestral", date: "31 oct", time: "09:00", kind: "Fiscal" },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; }
}
function save(key: string, value: unknown) { localStorage.setItem(key, JSON.stringify(value)); }

export default function DashboardUI({ active = "Inicio" }: { active?: string }) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [docs, setDocs] = useState<Doc[]>(seedDocs);
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [events, setEvents] = useState<EventItem[]>(seedEvents);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setTasks(read("ig_tasks", seedTasks)); setDocs(read("ig_docs", seedDocs)); setMessages(read("ig_messages", seedMessages)); setEvents(read("ig_events", seedEvents));
  }, []);
  useEffect(() => { save("ig_tasks", tasks); }, [tasks]);
  useEffect(() => { save("ig_docs", docs); }, [docs]);
  useEffect(() => { save("ig_messages", messages); }, [messages]);
  useEffect(() => { save("ig_events", events); }, [events]);

  const pending = useMemo(() => tasks.filter(t => !t.done), [tasks]);
  const nav = [
    ["Inicio", "/dashboard"], ["Clientes", "/dashboard/clientes"], ["Documentos", "/dashboard/documentos"],
    ["Pendientes", "/dashboard/pendientes"], ["Mensajes", "/dashboard/mensajes"], ["Agenda", "/dashboard/agenda"],
  ];
  const notify = (text: string) => { setToast(text); window.setTimeout(() => setToast(""), 2600); };
  const toggleTask = (id: number) => setTasks(v => v.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const logout = () => { document.cookie = "ig_demo_session=; Path=/; Max-Age=0; SameSite=Lax"; router.push("/login"); };

  function addTask(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); const title = String(f.get("title") || "").trim(); if (!title) return; setTasks(v => [{ id: Date.now(), title, due: String(f.get("due") || "Sin fecha"), priority: (String(f.get("priority") || "Media") as Task["priority"]), done: false }, ...v]); e.currentTarget.reset(); notify("Pendiente creado"); }
  function uploadDoc(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); const name = String(f.get("name") || "Documento.pdf"); setDocs(v => [{ id: Date.now(), name, area: String(f.get("area") || "General"), status: "Pendiente" }, ...v]); e.currentTarget.reset(); notify("Documento añadido al expediente"); }
  function sendMessage(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); const body = String(f.get("body") || "").trim(); if (!body) return; setMessages(v => [{ id: Date.now(), from: "Tú", body, time: "Ahora" }, ...v]); e.currentTarget.reset(); notify("Mensaje enviado"); }
  function addEvent(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); const title = String(f.get("title") || "").trim(); if (!title) return; setEvents(v => [{ id: Date.now(), title, date: String(f.get("date") || "Próximamente"), time: String(f.get("time") || "--:--"), kind: "Cita" }, ...v]); e.currentTarget.reset(); notify("Cita añadida a la agenda"); }

  return <div className="portal-shell">
    <header className="portal-topbar">
      <button className="mobile-menu" aria-label="Abrir menú" onClick={() => document.body.classList.toggle("portal-menu-open")}>☰</button>
      <a className="portal-brand" href="/"><img src="/brand-placeholder" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} /><span className="portal-mark">iG</span><span>Idea <b>Gestión</b></span></a>
      <div className="portal-user"><span className="online-dot"/> <span>Pedro · Administrador</span><button onClick={logout}>Salir</button></div>
    </header>
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="portal-kicker">GESTIÓN PRIVADA</div>
        <nav>{nav.map(([label, href]) => <a key={href} className={active === label ? "active" : ""} href={href}><span>{({Inicio:"⌂",Clientes:"◉",Documentos:"▣",Pendientes:"✓",Mensajes:"✉",Agenda:"◷"} as Record<string,string>)[label]}</span>{label}{label === "Pendientes" && pending.length > 0 ? <b className="nav-count">{pending.length}</b> : null}</a>)}</nav>
        <div className="sidebar-help"><span>¿Necesitas ayuda?</span><a href="tel:952190511">95 219 05 11</a><small>Idea Gestión · Ronda</small></div>
      </aside>
      <main className="portal-main">
        <div className="portal-head"><div><div className="portal-kicker">{active === "Inicio" ? "RESUMEN DE ACTIVIDAD" : active.toUpperCase()}</div><h1>{active === "Inicio" ? "Todo bajo control." : active}</h1><p>Tu gestión, documentos y comunicación en un solo lugar.</p></div><div className="portal-actions"><a href="/dashboard/documentos#nuevo" className="portal-button primary">+ Subir documento</a><a href="/dashboard/mensajes#nuevo" className="portal-button">Nuevo mensaje</a></div></div>

        {active === "Inicio" && <>
          <section className="metric-grid"><div className="metric-card accent"><span>Pendientes</span><strong>{pending.length}</strong><small>requieren tu atención</small></div><div className="metric-card"><span>Documentos</span><strong>{docs.length}</strong><small>en tu expediente</small></div><div className="metric-card"><span>Mensajes</span><strong>{messages.filter(m=>m.unread).length}</strong><small>sin leer</small></div><div className="metric-card"><span>Próxima cita</span><strong>{events[0]?.date || "—"}</strong><small>{events[0]?.time || "Sin citas"}</small></div></section>
          <div className="portal-columns"><section className="portal-card wide"><div className="card-head"><div><span className="portal-kicker">PARA TI</span><h2>Pendientes de ti</h2></div><a href="/dashboard/pendientes">Ver todos →</a></div>{pending.slice(0,4).map(t => <div className="task-row" key={t.id}><button className={t.done ? "check checked" : "check"} onClick={() => toggleTask(t.id)}>{t.done ? "✓" : ""}</button><div><b>{t.title}</b><small>Vence {t.due}</small></div><span className={`priority ${t.priority.toLowerCase()}`}>{t.priority}</span></div>)}{pending.length === 0 && <div className="empty">No tienes tareas pendientes. Todo al día.</div>}</section><section className="portal-card"><div className="card-head"><div><span className="portal-kicker">ACTIVIDAD</span><h2>Mensajes</h2></div><a href="/dashboard/mensajes">Abrir →</a></div>{messages.slice(0,3).map(m=><div className="message-row" key={m.id}><div className="avatar">IG</div><div><b>{m.from}</b><p>{m.body}</p><small>{m.time}</small></div></div>)}</section></div>
          <div className="portal-columns"><section className="portal-card"><div className="card-head"><div><span className="portal-kicker">EXPEDIENTE</span><h2>Documentos recientes</h2></div><a href="/dashboard/documentos">Ver todos →</a></div>{docs.slice(0,4).map(d=><div className="doc-row" key={d.id}><span className="doc-icon">PDF</span><div><b>{d.name}</b><small>{d.area}</small></div><span className={`status ${d.status.toLowerCase()}`}>{d.status}</span></div>)}</section><section className="portal-card"><div className="card-head"><div><span className="portal-kicker">AGENDA</span><h2>Próximas citas</h2></div><a href="/dashboard/agenda">Ver agenda →</a></div>{events.slice(0,3).map(ev=><div className="event-row" key={ev.id}><div className="date-box"><b>{ev.date.split(" ")[0]}</b><small>{ev.date.split(" ")[1] || ""}</small></div><div><b>{ev.title}</b><small>{ev.time} · {ev.kind}</small></div></div>)}</section></div>
        </>}

        {active === "Clientes" && <section className="portal-card"><div className="card-head"><div><span className="portal-kicker">CARTERA</span><h2>Clientes y expedientes</h2></div><button className="portal-button primary" onClick={() => notify("Alta de cliente preparada para la conexión con base de datos")}>+ Nuevo cliente</button></div><div className="client-grid">{["Pedro Arturo del Río Piña · Despacho","Empresa Ejemplo S.L.","Autónomo Ejemplo","Comercial Ronda S.L."].map((name,i)=><div className="client-card" key={name}><div className="avatar large">{name.slice(0,2).toUpperCase()}</div><div><b>{name}</b><small>{i === 0 ? "Administrador" : "Expediente activo"}</small></div><span>→</span></div>)}</div></section>}

        {active === "Documentos" && <div className="portal-stack"><section className="portal-card" id="nuevo"><div className="card-head"><div><span className="portal-kicker">ARCHIVO DIGITAL</span><h2>Documentos</h2></div><form className="inline-form" onSubmit={uploadDoc}><input name="name" placeholder="Nombre del documento" required/><select name="area" defaultValue="Fiscal"><option>Fiscal</option><option>Contabilidad</option><option>Laboral</option><option>General</option></select><button className="portal-button primary">Subir</button></form></div>{docs.map(d=><div className="doc-row expanded" key={d.id}><span className="doc-icon">PDF</span><div><b>{d.name}</b><small>{d.area} · añadido al expediente</small></div><span className={`status ${d.status.toLowerCase()}`}>{d.status}</span></div>)}</section></div>}

        {active === "Pendientes" && <div className="portal-stack"><section className="portal-card"><div className="card-head"><div><span className="portal-kicker">TAREAS</span><h2>Pendientes de ti</h2></div><form className="inline-form" onSubmit={addTask}><input name="title" placeholder="Nuevo pendiente" required/><input name="due" placeholder="Vence: 25 oct"/><select name="priority" defaultValue="Media"><option>Alta</option><option>Media</option><option>Baja</option></select><button className="portal-button primary">Añadir</button></form></div>{tasks.map(t=><div className="task-row" key={t.id}><button className={t.done ? "check checked" : "check"} onClick={() => toggleTask(t.id)}>{t.done ? "✓" : ""}</button><div><b className={t.done ? "done-text" : ""}>{t.title}</b><small>Vence {t.due}</small></div><span className={`priority ${t.priority.toLowerCase()}`}>{t.priority}</span></div>)}</section></div>}

        {active === "Mensajes" && <div className="portal-columns messages-layout"><section className="portal-card"><div className="card-head"><div><span className="portal-kicker">COMUNICACIÓN</span><h2>Mensajes</h2></div></div>{messages.map(m=><div className="message-row" key={m.id}><div className="avatar">{m.from === "Tú" ? "TÚ" : "IG"}</div><div><b>{m.from}</b><p>{m.body}</p><small>{m.time}</small></div></div>)}</section><section className="portal-card" id="nuevo"><div className="card-head"><div><span className="portal-kicker">CONTACTAR</span><h2>Escribir a Idea Gestión</h2></div></div><form className="message-form" onSubmit={sendMessage}><textarea name="body" placeholder="Escribe tu mensaje…" required/><button className="portal-button primary">Enviar mensaje →</button></form></section></div>}

        {active === "Agenda" && <div className="portal-columns"><section className="portal-card"><div className="card-head"><div><span className="portal-kicker">CALENDARIO</span><h2>Próximas citas</h2></div></div>{events.map(ev=><div className="event-row big" key={ev.id}><div className="date-box"><b>{ev.date.split(" ")[0]}</b><small>{ev.date.split(" ")[1] || ""}</small></div><div><b>{ev.title}</b><small>{ev.time} · {ev.kind}</small></div></div>)}</section><section className="portal-card"><div className="card-head"><div><span className="portal-kicker">NUEVA CITA</span><h2>Solicitar cita</h2></div></div><form className="message-form" onSubmit={addEvent}><input name="title" placeholder="Motivo de la cita" required/><div className="form-two"><input name="date" placeholder="25 oct"/><input name="time" placeholder="10:30"/></div><button className="portal-button primary">Añadir a mi agenda</button></form></section></div>}

        <footer className="portal-footer"><span>Idea Gestión · Ronda</span><span>Información privada · Conexión segura</span><button onClick={logout}>Cerrar sesión</button></footer>
      </main>
    </div>
    {toast && <div className="portal-toast">✓ {toast}</div>}
  </div>;
}
