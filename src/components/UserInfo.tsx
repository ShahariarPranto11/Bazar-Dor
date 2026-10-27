"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignout = async () => {
    await authClient.signOut();
  };
  
  return (
    <div className="flex shrink-0 items-center gap-4">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                alt="Tailwind-CSS-Avatar-component"
                src={user?.image as string}
              />
            </div>
          </div>
          <h2>{user?.name}</h2>
          <button onClick={handleSignout} className="btn btn-error btn-xs">
            Signout
          </button>
          
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-800 hover:text-green-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
