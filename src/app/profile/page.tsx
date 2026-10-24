"use client";

import React from "react";
import Image from "next/image";
import { FiCamera, FiMapPin, FiEdit2, FiCompass } from "react-icons/fi";
import { BiBriefcase, BiTrendingUp, BiDollar } from "react-icons/bi";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, iconBg }) => {
    return (
        <div className="bg-white border border-gray-100 shadow-sm p-6 flex items-center justify-between w-full">
            <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs font-normal tracking-wide">
                    {label}
                </span>
                <span className="text-gray-900 text-xl font-bold tracking-tight">
                    {value}
                </span>
            </div>
            <div className={`size-12 rounded-full flex items-center justify-center ${iconBg}`}>
                {icon}
            </div>
        </div>
    );
};

export default function ProfilePage(): React.JSX.Element {
    return (
        <div className="min-h-screen w-full bg-white px-6 py-12 md:px-12 lg:px-24 font-sans select-none">
            <div className="max-w-7xl mx-auto">

                {/* Page Title & Header Subtitle */}
                <div className="mb-10 text-left">
                    <h1 className="text-gray-900 text-4xl font-normal tracking-tight mb-2 select-text">
                        My Profile
                    </h1>
                    <p className="text-gray-400 text-sm font-normal">
                        Manage your account settings and travel preferences
                    </p>
                </div>

                {/* Flex Layout: Sidebar Column vs Main Content Stats Dashboard */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left Column Profile Summary Card */}
                    <div className="w-full lg:w-[320px] bg-white border border-gray-100 shadow-sm p-6 shrink-0 flex flex-col items-center">

                        {/* Round Avatar Container with Floating Camera Button Overlay */}
                        <div className="relative size-32 mb-5">
                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 border border-gray-100">
                                <Image
                                    src="https://unsplash.com"
                                    alt="Sarah Mitchell"
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-full shadow-md border-2 border-white transition-colors duration-200"
                                aria-label="Upload profile image"
                            >
                                <FiCamera size={14} className="stroke-[2.5]" />
                            </button>
                        </div>

                        {/* Profile Identity Headers */}
                        <h2 className="text-gray-900 text-lg font-bold tracking-tight mb-1 select-text">
                            Sarah Mitchell
                        </h2>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-normal mb-6 select-text">
                            <FiMapPin size={13} />
                            <span>San Francisco, CA</span>
                        </div>

                        {/* Meta Properties Row Stack */}
                        <div className="w-full border-t border-gray-100 pt-4 pb-6 space-y-3 text-xs">
                            <div className="flex justify-between items-center select-text">
                                <span className="text-gray-400 font-light">Member since</span>
                                <span className="text-gray-900 font-bold">Mar 2024</span>
                            </div>
                            <div className="flex justify-between items-center select-text">
                                <span className="text-gray-400 font-light">Nationality</span>
                                <span className="text-gray-900 font-bold">United States</span>
                            </div>
                        </div>

                        {/* Action Trigger Button */}
                        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-xs py-3.5 flex items-center justify-center gap-2 transition-colors duration-200">
                            <FiEdit2 size={12} className="stroke-[2.5]" />
                            <span>Edit Profile</span>
                        </button>
                    </div>

                    {/* Right Column Layout Group: Travel Statistics Section */}
                    <div className="flex-1 w-full">
                        <h3 className="text-gray-900 text-sm font-bold tracking-wide uppercase mb-4">
                            Travel Statistics
                        </h3>

                        {/* Grid Layout containing identical Metric Layout Components */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <StatCard
                                label="Total Bookings"
                                value={12}
                                icon={<BiBriefcase size={22} className="text-cyan-500" />}
                                iconBg="bg-cyan-50/50"
                            />
                            <StatCard
                                label="Countries Visited"
                                value={18}
                                icon={<FiCompass size={20} className="text-green-500 stroke-[2.25]" />}
                                iconBg="bg-green-50/50"
                            />
                            <StatCard
                                label="Upcoming Trips"
                                value={2}
                                icon={<BiTrendingUp size={22} className="text-orange-400" />}
                                iconBg="bg-orange-50/50"
                            />
                            <StatCard
                                label="Total Spent"
                                value="$15,750"
                                icon={<BiDollar size={22} className="text-fuchsia-500" />}
                                iconBg="bg-fuchsia-50/40"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
