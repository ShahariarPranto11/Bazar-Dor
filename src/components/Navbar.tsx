import Image from "next/image";
import NavLinks from "./NavLinks";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo and Website Name */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <Link href="/" className="text-inherit no-underline">
            <div>
              <h1 className="font-bold text-2xl"> বাজার দর</h1>
              <p>{date}</p>
            </div>
          </Link>
        </div>

        {/* Right Side Buttons */}
       <UserInfo />
       </div>
   
      <NavLinks />
    </nav>
  );
};

export default Navbar;
