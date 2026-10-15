import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idea Gestión | Portal",
  description: "Portal de clientes de Idea Gestión",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
