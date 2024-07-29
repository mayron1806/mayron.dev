import Image from "next/image";

const Logo = () => {
  return ( 
    <div className="relative h-10 w-60">
      <Image alt="Logo" src="/logo-v1.svg" fill />
    </div>
  );
}
 
export default Logo;