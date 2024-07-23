import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

const Header = () => {
  return ( 
    <header className="flex justify-between items-center gap-4 p-2 px-4 bg-secondary">
      <h1 className="text-xl font-bold h-full">
        <Link href="/">Mayron.Dev</Link>
      </h1>
      <nav className="flex gap-4">
        <div className="flex gap-2">
          <Input placeholder="Pesquisar" type="search" />
          <Button variant="secondary" size="icon">
            <Search className="h-4 w-4"/>
          </Button>
        </div>
      </nav>
    </header> 
  );
}
 
export default Header;