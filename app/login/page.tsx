"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (!email || password.length < 4) {
      setError("Introduce un correo y una contraseña válida.");
      return;
    }
    document.cookie = "ig_demo_session=1; Path=/; SameSite=Lax";
    router.push("/dashboard");
  }

  return <main className="ig-shell" style={{ display: "grid", placeItems: "center", padding: 20 }}>
    <section className="ig-card" style={{ width: "100%", maxWidth: 430 }}>
      <div className="ig-brand"><span className="ig-mark">IG</span><span>Idea Gestión</span></div>
      <div className="ig-kicker" style={{ marginTop: 36 }}>Portal de cliente</div>
      <h1 className="ig-title" style={{ fontSize: 32 }}>Accede a tu área privada</h1>
      <p className="ig-muted" style={{ marginTop: 10 }}>Consulta documentos, pendientes, mensajes y citas.</p>
      <form onSubmit={submit} style={{ marginTop: 28, display: "grid", gap: 14 }}>
        <label style={{ fontSize: 13, fontWeight: 700 }}>Correo<input name="email" type="email" placeholder="tu@email.com" required style={inputStyle} /></label>
        <label style={{ fontSize: 13, fontWeight: 700 }}>Contraseña<input name="password" type="password" placeholder="••••••••" required style={inputStyle} /></label>
        {error && <div style={{ color: "#a33", fontSize: 13 }}>{error}</div>}
        <button className="ig-button" type="submit">Entrar</button>
      </form>
      <p className="ig-muted" style={{ marginTop: 20, fontSize: 12 }}>Demo: cualquier correo y una contraseña de 4+ caracteres.</p>
    </section>
  </main>;
}

const inputStyle = { display: "block", width: "100%", marginTop: 7, padding: "12px 13px", border: "1px solid var(--ig-line)", borderRadius: 10, outline: "none" };
