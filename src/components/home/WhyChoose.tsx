import Image from "next/image";

const perks = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your data and payments are protected with industry-standard encryption on every booking.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local expert guides bring every destination to life with stories, insight and hidden gems.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Our team is available around the clock to assist you before, during and after every trip.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#e9f5fb] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-gray-900 lg:text-4xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Our commitment to excellence in travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="rounded-xl bg-white p-6 shadow-[0_1px_4px_rgba(15,23,42,0.06)] lg:p-7"
            >
              <Image
                src={perk.icon}
                width={48}
                height={48}
                alt=""
                className="size-12"
              />
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {perk.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
