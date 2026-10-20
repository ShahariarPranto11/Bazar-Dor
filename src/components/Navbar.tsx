import Image from "next/image";
import NavLinks from "./NavLinks";

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
          <div>
            <h1 className="text-lg font-bold leading-tight text-gray-900">
              বাজার দর
            </h1>
            <p className="mt-1 text-xs text-gray-500">{date}</p>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex shrink-0 items-center gap-4">
          <button className="text-sm font-medium text-gray-800 hover:text-green-700">
            সাইন ইন
          </button>

          <button className="rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800">
            সাইন আপ
          </button>
        </div>
      </div>

      <NavLinks/>
    </nav>
  );
};

export default Navbar;
