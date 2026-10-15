import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idea Gestión | Asesoría y gestión empresarial",
  description: "Idea Gestión · Pedro Arturo del Río Piña · Consultoría, fiscal, contabilidad, laboral y gestión en Ronda.",
  applicationName: "Idea Gestión",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#075f66",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
