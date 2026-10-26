"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const formData = new FormData(e.currentTarget);

    const result = await authClient.signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    console.log("Signup response:", result);

    if (error) {
  console.log("Signup error:", error);
  setError(JSON.stringify(error));
  return;
}

    router.push("/signin");
  } catch (err) {
    console.error("Signup exception:", err);
    setError(
      err instanceof Error ? err.message : "Unknown error"
    );
  } finally {
    setLoading(false);
  }
};
const handleGoogleSignIn = async () => {
 await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleGithubSignIn = async () => {
 await authClient.signIn.social({
      provider: "github",
    });
  }
  return (
    <div className="min-h-screen bg-[#f1f5f0] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          নিরাপদে বাজার দর দেখতে আপনার অ্যাকাউন্ট তৈরি করুন
        </p>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
        >
          <div>
            <label className="mb-1 block text-sm">নাম</label>
            <input
              name="name"
              type="text"
              placeholder="আপনার নাম লিখুন"
              required
              className="input w-full"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">ইমেইল</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="input w-full"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">পাসওয়ার্ড</label>
            <input
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={8}
              required
              className="input w-full"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-green-700 text-white hover:bg-green-800"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          <div className="divider">অথবা</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline"
            >
              Google দিয়ে
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              className="btn btn-outline"
            >
              GitHub দিয়ে
            </button>
          </div>

          <p className="text-center text-sm">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-700">
              লগ ইন করুন
            </Link>
          </p>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
}
