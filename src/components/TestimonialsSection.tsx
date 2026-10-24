import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"; // Adjust paths based on your shadcn setup

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    location: string;
    imageUrl: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
        name: "Michael Chen",
        location: "Singapore",
        imageUrl: "https://unsplash.com"
    },
    {
        id: 2,
        quote: '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
        name: "Sarah Johnson",
        location: "New York, USA",
        imageUrl: "https://unsplash.com"
    },
    {
        id: 3,
        quote: '"Exploring Tokyo was seamless. The accommodations were central, and the food tours curated for us were out of this world. Will book again!"',
        name: "David Smith",
        location: "London, UK",
        imageUrl: "https://unsplash.com"
    }
];

export default function TestimonialsSection(): React.JSX.Element {
    return (
        <section className="w-full bg-white py-16 px-6 md:py-24 md:px-12 lg:px-24 font-sans select-none">
            <div className="max-w-7xl mx-auto">

                {/* Main shadcn Carousel Wrapper */}
                <Carousel opts={{ align: "start", loop: true }} className="w-full relative">

                    {/* Header Block with Inline Slider Buttons */}
                    <div className="flex items-end justify-between mb-12 md:mb-16">
                        <div>
                            <h2 className="text-gray-900 text-3xl md:text-5xl font-light tracking-tight mb-3">
                                What Travelers Say
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base font-normal tracking-wide">
                                Real experiences from our happy travelers
                            </p>
                        </div>

                        {/* Custom Positioned Arrows to Match UI Design */}
                        <div className="flex items-center gap-3">
                            <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                <ArrowLeft size={20} className="stroke-[1.5]" />
                            </CarouselPrevious>
                            <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                <ArrowRight size={20} className="stroke-[1.5]" />
                            </CarouselNext>
                        </div>
                    </div>

                    {/* Testimonial Content Viewport */}
                    <CarouselContent className="-ml-6">
                        {testimonials.map((item) => (
                            <CarouselItem key={item.id} className="pl-6 md:basis-1/2 flex">
                                <div className="border border-gray-100 bg-white p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center justify-between w-full h-full shadow-sm hover:shadow-md transition-shadow duration-200">

                                    {/* Left Column: Review Text */}
                                    <div className="flex-1 flex flex-col justify-between h-full min-h-[160px]">
                                        <p className="text-gray-800 text-base font-normal leading-relaxed tracking-wide">
                                            {item.quote}
                                        </p>

                                        <div className="mt-6">
                                            <span className="text-cyan-500 font-medium text-sm block">
                                                &mdash; {item.name}
                                            </span>
                                            <span className="text-gray-400 font-light text-xs block mt-0.5">
                                                {item.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Column: Square Portrait Image */}
                                    <div className="w-full md:w-[180px] h-[220px] md:h-[180px] shrink-0 overflow-hidden bg-gray-50">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover grayscale-[20%] contrast-[105%]"
                                        />
                                    </div>

                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                </Carousel>
            </div>
        </section>
    );
}
