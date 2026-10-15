import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, MessageSquare, ShieldCheck } from "lucide-react";

const features = [
  { icon: FileText, title: "Documentación", text: "Sube, consulta y sigue el estado de tus documentos desde cualquier dispositivo." },
  { icon: MessageSquare, title: "Mensajería", text: "Comunicación directa con tu equipo de Idea Gestión, con trazabilidad." },
  { icon: CalendarDays, title: "Agenda", text: "Citas, vencimientos y tareas importantes en un único calendario." },
  { icon: ShieldCheck, title: "Control y seguridad", text: "Permisos por rol y registro de actividad para cada operación." },
];

export default function Home() {
  return (
    <main className="ig-shell">
      <header className="ig-topbar">
        <div className="ig-brand"><span className="ig-mark">IG</span><span>Idea Gestión</span></div>
        <Link className="ig-button" href="/login">Acceder al portal <ArrowRight size={16} style={{ marginLeft: 8 }} /></Link>
      </header>
      <section className="ig-main" style={{ paddingTop: 80 }}>
        <div style={{ maxWidth: 820 }}>
          <div className="ig-kicker">Gestión profesional · Ronda</div>
          <h1 className="ig-title" style={{ fontSize: 52, marginTop: 14 }}>Todo lo que necesitas para gestionar tu negocio, en un solo lugar.</h1>
          <p className="ig-muted" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 22 }}>Un portal moderno para clientes y equipo: documentación, comunicaciones, tareas, agenda y seguimiento, diseñado para trabajar de forma sencilla y trazable.</p>
          <div className="ig-actions" style={{ marginTop: 28 }}>
            <Link className="ig-button" href="/login">Entrar al área cliente</Link>
            <Link className="ig-button secondary" href="/dashboard">Ver demo interna</Link>
          </div>
        </div>
        <div className="ig-grid ig-grid-4" style={{ marginTop: 70 }}>
          {features.map(({ icon: Icon, title, text }) => <div className="ig-card" key={title}><Icon size={22} color="var(--ig-primary)" /><h3 className="ig-card-title" style={{ marginTop: 16 }}>{title}</h3><p className="ig-muted" style={{ lineHeight: 1.6 }}>{text}</p></div>)}
        </div>
      </section>
    </main>
  );
}
