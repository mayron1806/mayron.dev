import { ModeToggle } from "../../components/toogle-theme";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <main className="min-h-screen container relative">
      {children}
      <ModeToggle />
    </main>
  );
}
 
export default AdminLayout;