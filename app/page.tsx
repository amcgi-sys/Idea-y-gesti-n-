import Link from "next/link";

const services = [
  { title: "Asesoría fiscal", text: "Planificación, impuestos y acompañamiento para autónomos y empresas." },
  { title: "Contabilidad", text: "Una visión clara de tus números, cierres y obligaciones contables." },
  { title: "Laboral", text: "Contratos, nóminas y gestión laboral con seguimiento cercano." },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" href="/" aria-label="Idea Gestión inicio">
            <span className="brand-symbol">IG</span>
            <span><strong>Idea</strong> Gestión</span>
          </Link>
          <nav className="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#como">Cómo trabajamos</a>
            <a href="#contacto">Contacto</a>
            <Link className="nav-login" href="/login">Área cliente</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">ASESORÍA · GESTORÍA · ACOMPAÑAMIENTO</p>
            <h1>Tu negocio, bien gestionado.<br /><em>Tú, centrado en hacerlo crecer.</em></h1>
            <p className="hero-lead">Idea Gestión es una asesoría cercana y digital para autónomos y empresas. Menos papeleo, más control y una persona al otro lado cuando la necesitas.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contacto">Quiero hablar con vosotros</a>
              <Link className="button button-quiet" href="/login">Entrar al área cliente <span>→</span></Link>
            </div>
            <div className="trust-row"><span>✓ Atención cercana</span><span>✓ Gestión digital</span><span>✓ Visión 360º</span></div>
          </div>
          <div className="hero-visual" aria-label="Espacio de trabajo de Idea Gestión">
            <div className="visual-card visual-main"><div className="visual-top"><span>IDEA GESTIÓN</span><span>2026</span></div><div className="visual-line large"/><div className="visual-line"/><div className="visual-line short"/><div className="visual-stat"><strong>Todo bajo control</strong><span>Documentos · Pendientes · Citas</span></div></div>
            <div className="visual-card visual-float"><span className="check">✓</span><div><strong>3 pendientes</strong><small>Requieren tu atención</small></div></div>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="servicios">
        <div className="container">
          <div className="section-heading"><p className="eyebrow">LO QUE HACEMOS</p><h2>Una gestoría pensada para el día a día.</h2><p>No se trata solo de presentar impuestos. Se trata de que tengas claridad, orden y respuesta.</p></div>
          <div className="service-grid">{services.map((s, i) => <article className="service-card" key={s.title}><span className="service-index">0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p><a href="#contacto">Saber más →</a></article>)}</div>
        </div>
      </section>

      <section className="section" id="como">
        <div className="container process-grid"><div><p className="eyebrow">CÓMO TRABAJAMOS</p><h2>La tecnología detrás.<br />Las personas delante.</h2></div><div className="process-list"><div><b>01</b><p><strong>Nos cuentas tu situación.</strong><br />Entendemos tu negocio antes de proponerte nada.</p></div><div><b>02</b><p><strong>Ordenamos la gestión.</strong><br />Documentos, obligaciones y tareas en un único lugar.</p></div><div><b>03</b><p><strong>Te acompañamos.</strong><br />Información clara y comunicación directa durante todo el año.</p></div></div></div>
      </section>

      <section className="contact-band" id="contacto"><div className="container contact-inner"><div><p className="eyebrow">HABLEMOS</p><h2>¿Quieres que llevemos tu gestión?</h2><p>Cuéntanos qué necesitas y te orientamos.</p></div><a className="button button-light" href="mailto:hola@ideagestion.es">Contactar con Idea Gestión →</a></div></section>

      <footer><div className="container footer-inner"><div className="brand footer-brand"><span className="brand-symbol">IG</span><span><strong>Idea</strong> Gestión</span></div><p>Gestoría y asesoría · Ronda</p><span>© 2026 Idea Gestión</span></div></footer>
    </main>
  );
}
