"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ideaGestionLogo } from "../brand";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();
    const password = String(f.get("password") || "");
    if (!email || password.length < 4) { setError("Introduce un correo y una contraseña válida."); return; }
    document.cookie = "ig_demo_session=1; Path=/; SameSite=Lax";
    router.push("/dashboard");
  }
  return <main className="login-page">
    <div className="login-panel">
      <a className="login-logo" href="/"><img src={ideaGestionLogo} alt="Idea Gestión" /></a>
      <div className="login-copy">
        <p className="eyebrow">ÁREA CLIENTE</p>
        <h1>Tu gestoría,<br/><em>siempre contigo.</em></h1>
        <p>Documentos, pendientes, mensajes y citas con Idea Gestión, en una experiencia diseñada para que tengas todo claro desde cualquier dispositivo.</p>
      </div>
      <div className="login-note"><span>✓</span><div><strong>Todo centralizado</strong><small>Consulta, envía y sigue tu gestión sin perder el trato personal.</small></div></div>
    </div>
    <section className="login-form">
      <div className="form-box">
        <img className="login-mobile-logo" src={ideaGestionLogo} alt="Idea Gestión" />
        <p className="eyebrow">PORTAL DE CLIENTE</p><h2>Bienvenido</h2><p className="form-muted">Accede a tu área privada.</p>
        <form onSubmit={submit}>
          <label>Correo electrónico<input name="email" type="email" placeholder="tu@email.com" required /></label>
          <label>Contraseña<input name="password" type="password" placeholder="••••••••" required /></label>
          {error && <div className="form-error">{error}</div>}
          <button className="button button-primary" type="submit">Entrar al portal <span>→</span></button>
        </form>
        <p className="demo-note">Demo actual: cualquier correo válido y una contraseña de 4+ caracteres. La autenticación real se conecta en la fase de producción.</p>
      </div>
    </section>
  </main>;
}
