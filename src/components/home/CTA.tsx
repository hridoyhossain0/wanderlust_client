import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-20 text-center md:py-28">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-3xl px-6">
        <h2 className="font-heading text-3xl text-white md:text-4xl lg:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
          Join thousands of travelers who have discovered their perfect
          destination with us.
        </p>
        <Link
          href="/destinations"
          className="group mt-8 inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-xs font-semibold tracking-wider text-gray-900 uppercase transition-colors hover:bg-gray-100 md:text-sm"
        >
          Book Your Trip Today
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
