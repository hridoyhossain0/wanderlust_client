"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const links = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/admin", label: "Admin" },
];

export default function Navbar(): React.JSX.Element {
    const pathname = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Better Auth session
    const { data: session, isPending } = authClient.useSession();

    const handleLogout = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                console.error("Logout failed:", error);
                return;
            }

            setIsOpen(false);
            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const isLoggedIn = Boolean(session?.user);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
            <div className="relative mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 lg:px-10">

                {/* Mobile & Tablet Toggle Menu */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center justify-center p-2 text-gray-700 hover:text-primary md:hidden"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? (
                        <X className="size-6" />
                    ) : (
                        <Menu className="size-6" />
                    )}
                </button>

                {/* Desktop Left Navigation Links */}
                <nav className="hidden items-center gap-7 md:flex">
                    {links.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative py-1 text-sm font-medium transition-colors hover:text-primary",
                                    isActive
                                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary"
                                        : "text-gray-700"
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Center Logo */}
                <Link
                    href="/"
                    aria-label="Wanderlast home"
                    className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
                >
                    <Image
                        src="/images/Wanderlast.png"
                        width={162}
                        height={24}
                        alt="Wanderlast"
                        className="h-6 w-auto"
                        priority
                    />
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-3 md:gap-6">

                    {/* Profile */}
                    <Link
                        href="/profile"
                        className="hidden items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-primary sm:flex"
                    >
                        <User className="size-4" />
                        Profile
                    </Link>

                    {/* Login / Sign Up / Log Out */}
                    {!isPending && (
                        isLoggedIn ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="rounded-none bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoggingOut ? "Logging Out..." : "Log Out"}
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-primary sm:block"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/signup"
                                    className="rounded-none bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-primary/90"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )
                    )}
                </div>
            </div>

            {/* Mobile & Tablet Sidebar Drawer */}
            <div
                id="mobile-navigation"
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-full max-w-xs border-r border-gray-100 bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                aria-hidden={!isOpen}
            >
                <div className="flex h-full flex-col justify-between pt-12">

                    {/* Drawer Navigation Links */}
                    <nav className="flex flex-col space-y-4">
                        {links.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "border-l-2 px-3 py-2 text-base font-medium transition-colors",
                                        isActive
                                            ? "border-primary bg-primary/5 text-primary"
                                            : "border-transparent text-gray-700 hover:text-primary"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Drawer Footer Actions */}
                    <div className="flex flex-col gap-3 border-t border-gray-100 pt-6">

                        {/* Profile */}
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                        >
                            <User className="size-4" />
                            My Profile
                        </Link>

                        {/* Mobile Login / Log Out */}
                        {!isPending && (
                            isLoggedIn ? (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="w-full border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isLoggingOut ? "Logging Out..." : "Log Out"}
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                                >
                                    Login
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Background Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
                    aria-hidden="true"
                />
            )}
        </header>
    );
}
