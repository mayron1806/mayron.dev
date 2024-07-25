const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <main className="min-h-screen container relative">
      {children}
    </main>
  );
}
 
export default AdminLayout;