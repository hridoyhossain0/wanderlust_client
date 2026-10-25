"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage(): React.JSX.Element {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
   


        setErrorMsg("");

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: fullName,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                setErrorMsg(
                    error.message || "Failed to create your account."
                );
                return;
            }

            if (data) {
                router.replace("/");
                router.refresh();
            }
        } catch (err) {
            console.error("Signup error:", err);
            setErrorMsg(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        setErrorMsg("");

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                setErrorMsg(
                    error.message || "Google sign-up failed."
                );
                setGoogleLoading(false);
            }
        } catch (err) {
            console.error("Google signup error:", err);
            setErrorMsg(
                "Something went wrong. Please try again."
            );
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50/50 flex flex-col items-center justify-center px-4 py-12 font-sans select-none">

            {/* Header Titles */}
            <div className="text-center mb-8">
                <h1 className="text-gray-900 text-3xl font-normal tracking-tight mb-2 select-text">
                    Create Account
                </h1>
                <p className="text-gray-400 text-sm font-normal">
                    Start your adventure with Wanderlust
                </p>
            </div>

            {/* Main Registration Card */}
            <div className="w-full max-w-[460px] bg-white border border-gray-100 shadow-sm p-8 md:p-10">

                {/* Error Message */}
                {errorMsg && (
                    <div
                        role="alert"
                        className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm text-center"
                    >
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name Input Field */}
                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="fullName"
                            className="text-gray-900 text-xs font-semibold tracking-wide"
                        >
                            Full Name
                        </label>
                        <div className="relative w-full">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 stroke-[1.75]" />
                            <input
                                id="fullName"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-400 text-sm py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Email Address Input Field */}
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
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-400 text-sm py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Password Input Field */}
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
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-400 text-sm py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Confirm Password Input Field */}
                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="confirmPassword"
                            className="text-gray-900 text-xs font-semibold tracking-wide"
                        >
                            Confirm Password
                        </label>
                        <div className="relative w-full">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 stroke-[1.75]" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-400 text-sm py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Submit Registration Button */}
                    <button
                        type="submit"
                        disabled={loading || googleLoading}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm py-3 transition-colors duration-200 shadow-sm mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Horizontal Divider Line */}
                <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-light">
                        Or sign up with
                    </span>
                    <div className="flex-grow border-t border-gray-100"></div>
                </div>

                {/* OAuth Google Authentication Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={loading || googleLoading}
                    className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs tracking-wide py-3 flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <FcGoogle />
                    <span>
                        {googleLoading
                            ? "Connecting to Google..."
                            : "Sign Up With Google"}
                    </span>
                </button>

                {/* Bottom Redirect Link */}
                <div className="text-center mt-6 text-xs text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
