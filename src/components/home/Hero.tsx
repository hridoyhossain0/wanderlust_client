import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative flex min-h-[560px] flex-col overflow-hidden md:min-h-[660px] lg:min-h-[746px]">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      {/* Banner already has a baked-in gradient; light overlay keeps text readable */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-14 pt-16 text-center">
        <h1 className="text-4xl leading-[1.12] font-light tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-primary/90 md:text-sm"
          >
            Explore Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/destinations"
            className="rounded-md bg-white/20 px-7 py-3.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/30 md:text-sm"
          >
            View Destination
          </Link>
        </div>
      </div>

      <SearchBar />
    </section>
  );
}
