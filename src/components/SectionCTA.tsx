import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTASection(): React.JSX.Element {
    return (
        <section className="relative w-full min-h-[480px] md:min-h-[560px] flex flex-col items-center justify-center text-center font-sans overflow-hidden bg-black select-none">
            {/* Background Image Layer with Top/Bottom/Side Vignette Gradients */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none mix-blend-lighten"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.9) 100%), 
                            linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.95) 100%), 
                            url('https://unsplash.com')`
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center">

                {/* Main Heading Text */}
                <h2 className="text-white text-4xl md:text-6xl font-extralight tracking-tight mb-4 select-text">
                    Ready To Start Your Journey?
                </h2>

                {/* Subtitle Description */}
                <p className="text-white/80 text-sm md:text-base font-normal tracking-wide max-w-lg mb-10 select-text leading-relaxed">
                    Join thousands of travelers who have discovered the world with us
                </p>

                {/* Action Button Link */}
                <a
                    href="#book-trip"
                    className="flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-medium text-xs tracking-widest uppercase py-4 px-8 shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    <span>Book Your Trip Today</span>
                    <ArrowRight size={14} className="stroke-[2.5]" />
                </a>

            </div>
        </section>
    );
}
