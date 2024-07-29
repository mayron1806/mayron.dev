import Link from "next/link";
import { Separator } from "./ui/separator";
import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import Logo from "./logo";
const Footer = () => {
  return (
    <footer className="bg-background border-t-[1px] border-t-muted">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/blog"><Logo /></Link>
          </div>
        </div>
        <Separator className="my-6 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground sm:text-center">
            © 2024 
            <Link href="/blog" className="hover:underline"> Mayron.Dev</Link>. 
            Todos direitos reservados.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <SocialLink href="https://www.instagram.com/fernandes.mayron/">
              <AiFillInstagram />
              <span className="sr-only">Instagram</span>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/mayron-fernandes/">
              <AiFillLinkedin />
              <span className="sr-only">LinkedIn</span>
            </SocialLink>
            <SocialLink href="https://github.com/mayron1806">
              <AiFillGithub />
              <span className="sr-only">GitHub</span>
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>

  );
}
const SocialLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-gray-500 ms-5"
      target="_blank"
    >
      {children}
    </a>
  );
}
export default Footer;
