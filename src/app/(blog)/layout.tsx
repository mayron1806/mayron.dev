import Footer from "@/components/footer";
import Header from "@/components/header";

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