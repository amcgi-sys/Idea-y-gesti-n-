import Link from "next/link";
import { activity, metrics, pending } from "@/lib/demo-data";

const nav = [
  ["Inicio", "/dashboard"],
  ["Clientes", "/dashboard/clientes"],
  ["Documentos", "/dashboard/documentos"],
  ["Pendientes", "/dashboard/pendientes"],
  ["Mensajes", "/dashboard/mensajes"],
  ["Agenda", "/dashboard/agenda"],
];

export default function Dashboard() {
  return (
    <div className="ig-shell">
      <header className="ig-topbar"><div className="ig-brand"><span className="ig-mark">IG</span><span>Idea Gestión</span></div><div className="ig-muted">Área de gestión · Administrador</div></header>
      <div className="ig-layout">
        <aside className="ig-sidebar"><nav className="ig-nav">{nav.map(([label, href], i) => <Link className={i === 0 ? "active" : ""} href={href} key={href}>{label}</Link>)}</nav><div style={{ marginTop: 30, padding: 12 }} className="ig-muted">Sistema preparado para roles, auditoría e integración externa.</div></aside>
        <main className="ig-main">
          <div className="ig-kicker">Panel de control</div><h1 className="ig-title">Buenos días. Este es el estado de Idea Gestión.</h1>
          <div className="ig-grid ig-grid-4" style={{ marginTop: 26 }}>{metrics.map(m => <div className="ig-card" key={m.label}><div className="ig-muted">{m.label}</div><div className="ig-value">{m.value}</div><div className="ig-muted" style={{ marginTop: 5 }}>{m.detail}</div></div>)}</div>
          <div className="ig-grid ig-grid-3" style={{ marginTop: 16 }}>
            <section className="ig-card" style={{ gridColumn: "span 2" }}><h2 className="ig-card-title">Pendientes que requieren atención</h2><table className="ig-table"><thead><tr><th>Cliente</th><th>Pendiente</th><th>Área</th><th>Vence</th><th>Prioridad</th></tr></thead><tbody>{pending.map(p => <tr key={p.client + p.item}><td>{p.client}</td><td>{p.item}</td><td>{p.area}</td><td>{p.due}</td><td><span className="ig-badge">{p.priority}</span></td></tr>)}</tbody></table></section>
            <section className="ig-card"><h2 className="ig-card-title">Actividad reciente</h2>{activity.map((a, i) => <div key={a} style={{ padding: "14px 0", borderBottom: i === activity.length - 1 ? 0 : "1px solid var(--ig-line)" }}><div style={{ fontSize: 14 }}>{a}</div><div className="ig-muted" style={{ marginTop: 5 }}>Hace {i + 1} h</div></div>)}</section>
          </div>
        </main>
      </div>
    </div>
  );
}
