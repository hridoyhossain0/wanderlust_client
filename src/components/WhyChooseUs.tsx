import React from 'react';
import { ShieldCheck, Map, Headphones } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-8 md:p-10 shadow-sm flex flex-col items-start transition-all duration-200 hover:shadow-md w-full">
            {/* Icon Wrapper */}
            <div className="text-cyan-500 mb-6 flex items-center justify-center">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-gray-900 text-xl font-medium tracking-tight mb-3">
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed font-normal">
                {description}
            </p>
        </div>
    );
};

export default function WhyChooseUs(): React.JSX.Element {
    return (
        <section className="bg-cyan-50/40 w-full py-16 px-6 md:py-24 md:px-12 lg:px-24 font-sans select-none">
            <div className="max-w-7xl mx-auto">

                {/* Header Block */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-gray-900 text-3xl md:text-5xl font-light tracking-tight mb-4">
                        Why Choose Wanderlust
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base font-normal tracking-wide">
                        Your trusted partner for exceptional travel experiences
                    </p>
                </div>

                {/* Features Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    <FeatureCard
                        icon={<ShieldCheck size={36} className="stroke-[1.75]" />}
                        title="Safe & Secure"
                        description="Your safety is our priority with comprehensive travel insurance and 24/7 support."
                    />
                    <FeatureCard
                        icon={<Map size={36} className="stroke-[1.75]" />}
                        title="Expert Guides"
                        description="Local experts who bring destinations to life with authentic cultural insights."
                    />
                    <FeatureCard
                        icon={<Headphones size={36} className="stroke-[1.75]" />}
                        title="24/7 Support"
                        description="Round-the-clock customer service to assist you wherever your journey takes you."
                    />
                </div>

            </div>
        </section>
    );
}
