import Image from "next/image";
import Link from "next/link";
import { ideaGestionLogo } from "./brand";

const services = [
  { n: "01", title: "Fiscal", text: "Impuestos, planificación y acompañamiento para autónomos y empresas." },
  { n: "02", title: "Contabilidad", text: "Cuentas ordenadas, cierres y una lectura clara de tu negocio." },
  { n: "03", title: "Laboral", text: "Contratos, nóminas y gestión laboral con seguimiento cercano." },
  { n: "04", title: "Gestoría", text: "Trámites y gestiones administrativas sin desplazamientos innecesarios." },
];

const facts = ["C/. Almendra, 87 · Local", "29400 Ronda (Málaga)", "95 219 05 11 · 652 91 78 48", "info@ideagestionronda.es", "www.ideagestionronda.es"];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand-image" href="/" aria-label="Idea Gestión inicio"><img src={ideaGestionLogo} alt="Idea Gestión" /></Link>
          <nav className="nav-links"><a href="#servicios">Servicios</a><a href="#metodo">Cómo trabajamos</a><a href="#despacho">El despacho</a><Link className="nav-login" href="/login">Área cliente <span>↗</span></Link></nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-orb hero-orb-a"/><div className="hero-orb hero-orb-b"/>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">ASESORÍA · GESTORÍA · EMPRESAS</div>
            <h1>La gestión de tu negocio, <em>con otra perspectiva.</em></h1>
            <p className="hero-lead">Experiencia profesional y atención cercana para que tengas tus obligaciones, documentos y decisiones bajo control.</p>
            <div className="hero-actions"><a className="button button-primary" href="#contacto">Hablemos <span>→</span></a><Link className="button button-quiet" href="/login">Entrar al área cliente</Link></div>
            <div className="trust-row"><span>● Ronda · Málaga</span><span>● Atención personalizada</span><span>● Gestión digital</span></div>
          </div>
          <div className="hero-stage">
            <div className="glow-ring"/>
            <div className="logo-card"><div className="shine"/><img src={ideaGestionLogo} alt="Logo oficial Idea Gestión"/><div className="card-caption"><b>IDEA GESTIÓN</b><span>Despacho profesional · Ronda</span></div></div>
            <div className="floating-card floating-top"><span className="dot"/><div><b>Gestión clara</b><small>Todo en un mismo lugar</small></div></div>
            <div className="floating-card floating-bottom"><span className="mini-icon">✓</span><div><b>Área cliente</b><small>Documentos · Pendientes · Mensajes</small></div></div>
          </div>
        </div>
      </section>

      <section className="proof-strip"><div className="container proof-grid"><div><strong>Pedro Arturo del Río Piña</strong><span>Consultor de Empresas · Economista · Máster Auditoría de Cuentas</span></div><div className="proof-line"/><div><strong>Más que presentar impuestos.</strong><span>Ordenamos la gestión para que puedas decidir mejor.</span></div></div></section>

      <section className="section section-soft" id="servicios"><div className="container"><div className="section-heading"><div className="eyebrow">SERVICIOS</div><h2>Una visión 360º de tu gestión.</h2><p>Un despacho profesional, cercano y preparado para trabajar contigo tanto en persona como digitalmente.</p></div><div className="service-grid">{services.map(s => <article className="service-card" key={s.n}><span className="service-index">{s.n}</span><div className="service-icon">↗</div><h3>{s.title}</h3><p>{s.text}</p><a href="#contacto">Conocer más <span>→</span></a></article>)}</div></div></section>

      <section className="section method" id="metodo"><div className="container method-grid"><div className="method-intro"><div className="eyebrow">NUEVA EXPERIENCIA</div><h2>La tecnología detrás.<br/><em>Las personas delante.</em></h2><p>Estamos construyendo un espacio digital donde cada cliente pueda consultar, enviar y seguir su gestión sin perder el trato personal.</p><Link className="text-link" href="/login">Descubrir el área cliente →</Link></div><div className="steps"><div className="step"><b>01</b><div><h3>Entendemos</h3><p>Conocemos tu situación antes de proponerte una solución.</p></div></div><div className="step"><b>02</b><div><h3>Ordenamos</h3><p>Documentos, obligaciones y tareas con una visión única.</p></div></div><div className="step"><b>03</b><div><h3>Acompañamos</h3><p>Información clara y comunicación directa durante todo el año.</p></div></div></div></div></section>

      <section className="section identity" id="despacho"><div className="container identity-grid"><div className="identity-card"><img src={ideaGestionLogo} alt="Idea Gestión"/><div className="identity-seal">DESPACHO<br/><span>PROFESIONAL</span></div></div><div className="identity-copy"><div className="eyebrow">EL DESPACHO</div><h2>Idea Gestión.<br/><em>Identidad, experiencia y cercanía.</em></h2><p><strong>Pedro Arturo del Río Piña</strong><br/>Consultor de Empresas · Economista Coleg. nº 4447<br/>Diplomado en Ciencias Empresariales · Coleg. 853<br/>Máster Auditoría de Cuentas</p><div className="facts">{facts.map((f,i)=><span key={i}>{f}</span>)}</div></div></div></section>

      <section className="contact-band" id="contacto"><div className="container contact-inner"><div><div className="eyebrow">HABLEMOS</div><h2>¿Preparado para tenerlo todo más claro?</h2><p>Estamos en Ronda. Escríbenos y cuéntanos qué necesitas.</p></div><a className="button button-light" href="mailto:info@ideagestionronda.es">Contactar con Idea Gestión →</a></div></section>
      <footer><div className="container footer-inner"><div className="brand-image footer-logo"><img src={ideaGestionLogo} alt="Idea Gestión"/></div><div><span>© 2026 Idea Gestión</span><span>C/. Almendra, 87 · Local · 29400 Ronda (Málaga)</span></div><div><span>95 219 05 11 · 652 91 78 48</span><span>info@ideagestionronda.es</span></div></div></footer>
    </main>
  );
}
