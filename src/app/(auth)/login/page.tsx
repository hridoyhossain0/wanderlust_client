
"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

function LoginForm(): React.JSX.Element {
    const router = useRouter();
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<
        "google" | "github" | null
    >(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);
        setErrorMsg("");

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: callbackUrl,
                rememberMe,
            });

            if (error) {
                setErrorMsg(
                    error.message || "সাইন ইন করতে ব্যর্থ হয়েছে।"
                );
                return;
            }

            if (data) {
                router.replace(callbackUrl);
                router.refresh();
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            setErrorMsg(
                "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignIn = async (
        provider: "google" | "github"
    ) => {
        setSocialLoading(provider);
        setErrorMsg("");

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: callbackUrl,
            });

            if (error) {
                setErrorMsg(
                    error.message ||
                    "সোশ্যাল সাইন ইন করতে ব্যর্থ হয়েছে।"
                );
                setSocialLoading(null);
            }
        } catch (error) {
            console.error(`${provider} sign-in error:`, error);
            setErrorMsg(
                "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
            );
            setSocialLoading(null);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50/50 flex flex-col items-center justify-center px-4 py-12 font-sans">
            {/* Header Titles */}
            <div className="text-center mb-8">
                <h1 className="text-gray-900 text-3xl font-bold tracking-tight mb-2">
                    Welcome Back
                </h1>

                <p className="text-gray-400 text-sm font-normal">
                    Resume your adventure with Wanderlust
                </p>
            </div>

            {/* Main Login Card */}
            <div className="w-full max-w-[460px] bg-white border border-gray-100 shadow-sm p-8 md:p-10">
                {/* Error Message */}
                {errorMsg && (
                    <div
                        role="alert"
                        className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600"
                    >
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="email"
                            className="text-gray-900 text-xs font-semibold tracking-wide"
                        >
                            Email Address
                        </label>

                        <div className="relative w-full">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 stroke-[1.75]" />

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-400 text-sm py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="password"
                            className="text-gray-900 text-xs font-semibold tracking-wide"
                        >
                            Password
                        </label>

                        <div className="relative w-full">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 stroke-[1.75]" />

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-400 text-sm py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-xs pt-1">
                        <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                                className="size-3.5 accent-cyan-600 rounded border-gray-300"
                                disabled={loading}
                            />

                            <span>Remember me</span>
                        </label>

                        <Link
                            href="/forgot-password"
                            className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || socialLoading !== null}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm py-3 transition-colors duration-200 shadow-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-100" />

                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-light">
                        Or continue with
                    </span>

                    <div className="flex-grow border-t border-gray-100" />
                </div>

                {/* Google Authentication */}
                <button
                    type="button"
                    onClick={() => handleSocialSignIn("google")}
                    disabled={loading || socialLoading !== null}
                    className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs tracking-wide py-3 flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <FcGoogle className="size-4" />

                    <span>
                        {socialLoading === "google"
                            ? "Connecting to Google..."
                            : "Continue with Google"}
                    </span>
                </button>

                {/* Sign Up Link */}
                <div className="text-center mt-6 text-xs text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            {/* Back to Home */}
            <Link
                href="/"
                className="mt-6 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
            >
                ← Back to Home
            </Link>
        </div>
    );
}

export default function LoginPage(): React.JSX.Element {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen w-full bg-gray-50/50 flex items-center justify-center">
                    <p className="text-sm text-gray-500">
                        Loading login page...
                    </p>
                </div>
            }
        >
            <LoginForm />
        </Suspense>
    );
}
