import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mayron.Dev - Programação, Qualidade de Software e Gestão de Projetos",
    short_name: "Mayron.Dev",
    description: "Descubra dicas de programação, tutoriais, práticas de qualidade de software e insights de gestão de projetos no Mayron.Dev. Acompanhe meu portfólio de freelancer e veja meus projetos em desenvolvimento.",
    start_url: "/blog/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}