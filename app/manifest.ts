import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Idea Gestión · Área cliente",
    short_name: "Idea Gestión",
    description: "Portal privado de Idea Gestión para documentos, pendientes, mensajes y agenda.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f5f8f7",
    theme_color: "#075f66",
    lang: "es",
    orientation: "portrait-primary",
  };
}
