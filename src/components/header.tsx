import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import Logo from "./logo";

const Header = () => {
  return ( 
    <header className="flex justify-between items-center gap-4 p-2 px-4 bg-background">
      <Link href="/blog"><Logo /></Link>
      <nav className="flex gap-4">
        <form className="flex items-center gap-2" method="GET">
          <Input placeholder="Pesquisar" type="search" name="search" />
          <Button size="sm" className="h-full">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </nav>
    </header> 
  );
}
 
export default Header;