"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "The trip was absolutely perfect! From booking to the final sunset cruise, every detail was handled with care. I'll definitely be traveling with Wanderlust again.",
    name: "Michael Chen",
    location: "San Francisco, USA",
    photo: "/images/person2.png",
  },
  {
    quote:
      "Wanderlust made our honeymoon unforgettable! The private tour and the sunset catamaran were absolutely magical. Highly recommended!",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
  {
    quote:
      "Everything was organized down to the smallest detail. Our guide knew every hidden corner of the city and made the whole trip feel effortless.",
    name: "Emma Brown",
    location: "London, UK",
    photo: "/images/person1.png",
  },
  {
    quote:
      "From the mountains to the coast, everything ran on time and felt personal. Support answered every question within minutes.",
    name: "David Kim",
    location: "Toronto, Canada",
    photo: "/images/person2.png",
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth / 2;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-3xl text-gray-900 lg:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => scroll(-1)}
              className="grid size-10 place-items-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => scroll(1)}
              className="grid size-10 place-items-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item) => (
            <article
              key={item.name}
              data-card
              className="flex w-full min-w-full shrink-0 snap-start gap-5 rounded-xl border border-gray-200 bg-white p-6 md:w-[calc(50%-0.75rem)] md:min-w-[calc(50%-0.75rem)]"
            >
              <div className="flex flex-col justify-between">
                <p className="text-sm leading-relaxed text-gray-600">
                  &quot;{item.quote}&quot;
                </p>
                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">{item.location}</p>
                </div>
              </div>
              <Image
                src={item.photo}
                alt={item.name}
                width={218}
                height={264}
                className="h-36 w-32 shrink-0 rounded-lg object-cover"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
