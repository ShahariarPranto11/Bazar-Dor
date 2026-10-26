"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (data) {
        toast.success("Sign In successfull!");
        return;
      }

      if (signInError) {
        const message = signInError.message || "Something went wrong!";
        setError(message);
        toast.error(message);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong!";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);

    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Google sign in failed.";
      setError(message);
      toast.error(message);
    }
  };

  const handleGithubSignIn = async () => {
    setError(null);

    try {
      await authClient.signIn.social({
        provider: "github",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "GitHub sign in failed.";
      setError(message);
      toast.error(message);
    }
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
          onSubmit={onSubmit}
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
};

export default SignInPage;
