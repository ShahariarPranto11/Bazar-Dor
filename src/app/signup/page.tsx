"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const formValue = Object.fromEntries(formData.entries());
    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        name: formValue.name as string,
        email: formValue.email as string,
        password: formValue.password as string,
        callbackURL: "/",
      });

      if (signUpError) {
        setError(signUpError.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি।");
      } else if (data) {
        router.push("/");
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "অ্যাকাউন্ট তৈরি করা যায়নি।",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setError("");
    const { error: signInError } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (signInError) {
      setError(signInError.message ?? "সাইন ইন করা যায়নি।");
    }
  };

  const handleGoogleSignIn = () => handleSocialSignIn("google");
  const handleGithubSignIn = () => handleSocialSignIn("github");

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
          onSubmit={handleSubmit}
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
