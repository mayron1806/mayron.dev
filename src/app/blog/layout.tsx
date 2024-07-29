import Footer from "@/components/footer";
import Header from "@/components/header";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mayron.Dev - Programação, Qualidade de Software e Gestão de Projetos",
  description: "Descubra dicas de programação, tutoriais, práticas de qualidade de software e insights de gestão de projetos no Mayron.Dev. Acompanhe meu portfólio de freelancer e veja meus projetos em desenvolvimento.",
  openGraph: {
    images: ["/cover.jpg"],
  },
  twitter: {
    images: ["/cover.jpg"],
  },
  authors: [{ name: 'Mayron' }],
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
 
export default Layout;