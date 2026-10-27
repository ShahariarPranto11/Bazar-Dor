"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড প্রয়োজন।");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        const message = error.message || "সাইন ইন করতে ব্যর্থ হয়েছে।";
        setError(message);
        toast.error(message);
        return;
      }

      if (data) {
        toast.success("সাইন ইন সফল হয়েছে");
        router.push("/");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "সাইন ইন করতে ব্যর্থ হয়েছে।";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f0] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          সাইন ইন
        </h1>

        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          বাজার দর দেখতে আপনার অ্যাকাউন্টে লগ ইন করুন
        </p>

        <form
          onSubmit={handleEmailSignIn}
          className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
        >
          <div>
            <label htmlFor="email" className="mb-1 block text-sm">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড"
              autoComplete="current-password"
              required
              className="input w-full"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn w-full bg-green-700 text-white hover:bg-green-800"
          >
            {isSubmitting ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>

          <div className="divider">অথবা</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline"
            >
              Google
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              className="btn btn-outline"
            >
              GitHub
            </button>
          </div>

          <p className="text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-700">
              সাইন আপ করুন
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
