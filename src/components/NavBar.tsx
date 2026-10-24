"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/admin", label: "Admin" },
];

export default function Navbar(): React.JSX.Element {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // 1. Add a mount state to completely eliminate hydration errors
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
            <div className="relative mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 lg:px-10">

                {/* Mobile & Tablet Toggle Menu Trigger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center p-2 text-gray-700 hover:text-primary md:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>

                {/* Desktop Left Navigation Links */}
                <nav className="hidden items-center gap-7 md:flex">
                    {links.map((link) => {
                        // 2. Only compute active paths when safe on the client browser
                        const isActive = isMounted && pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary relative py-1",
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

                {/* Center Logo - Repositioned cleanly across breakpoints */}
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

                {/* Right Actions Stack */}
                <div className="flex items-center gap-3 md:gap-6">
                    <Link
                        href="/profile"
                        className="hidden items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-primary sm:flex"
                    >
                        <User className="size-4" />
                        Profile
                    </Link>
                    <Link
                        href="/login"
                        className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-primary sm:block"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-none bg-primary px-5 py-2 text-xs uppercase tracking-wider font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            {/* Mobile & Tablet Sidebar Navigation Drawer Overlay */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-full max-w-xs bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden border-r border-gray-100",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full justify-between pt-12">
                    {/* Menu Drawer Links Group */}
                    <div className="flex flex-col space-y-4">
                        {links.map((link) => {
                            const isActive = isMounted && pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-base font-medium transition-colors py-2 px-3 border-l-2",
                                        isActive
                                            ? "border-primary text-primary bg-primary/5"
                                            : "border-transparent text-gray-700 hover:text-primary"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Drawer Quick Action Items Footer */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                        >
                            <User className="size-4" />
                            My Profile
                        </Link>
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="text-center py-2.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors border border-gray-200"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Dimmer Backdrop Element */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
                />
            )}
        </header>
    );
}
