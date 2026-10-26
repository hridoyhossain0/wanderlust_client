
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    MapPin,

    Star,

} from "lucide-react";
import EditDestinationDialog from "@/components/EditDestinations";
import DeleteDestinations from "@/components/DeleteDestinations";
import Image from "next/image";

interface Destination {
    _id: string;
    destinationName: string;
    country: string;
    category: string;
    price: number;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
}

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getDestination(
    id: string
): Promise<Destination | null> {
    const res = await fetch(
        `http://localhost:5000/destinations/${id}`,
        { cache: "no-store" }
    );

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Failed to fetch destination: ${res.status}`);
    }

    return (await res.json()) as Destination;
}

async function DestinationDetails({ params }: PageProps) {
    const { id } = await params;
    const destination = await getDestination(id);

    if (!destination) {
        notFound();
    }

    const duration = Number(destination.duration);
    const nights = Math.max(duration - 1, 0);

    const formattedPrice = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
    }).format(destination.price);

    const formattedDate = destination.departureDate
        ? new Date(
            `${destination.departureDate}T00:00:00`
        ).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        })
        : "Date not available";

    const highlights = [
        "Explore beautiful local attractions",
        "Experience local culture and traditions",
        "Enjoy scenic views and landscapes",
        "Discover popular places to visit",
        "Create unforgettable travel memories",
        "Enjoy a comfortable travel experience",
    ];

    return (
        <main className="min-h-screen bg-white px-4 py-6 text-gray-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header actions */}
                <div className="mb-4 flex items-center justify-between gap-3">
                    <Link
                        href="/destinations"
                        className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-cyan-600"
                    >
                        <ArrowLeft size={16} />
                        Back to Destinations
                    </Link>

                    <div className="flex gap-2">
                        {/* key: force a remount (and re-prefill) when the user
                            navigates from one destination to another */}
                        <EditDestinationDialog
                            key={destination._id}
                            destination={destination}
                        />

                        <DeleteDestinations
                            id={destination._id}
                            destination={destination.destinationName}
                        />
                    </div>
                </div>

                {/* Hero image */}
                <div className="h-56 overflow-hidden bg-gray-100 sm:h-72 lg:h-[340px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image
                        height={400}
                        width={600}
                        src={destination.imageUrl}
                        alt={destination.destinationName}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="my-5 border-t border-gray-100" />

                {/* Main content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
                    <section>
                        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                            <MapPin size={14} />
                            <span>{destination.country}</span>
                        </div>

                        <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
                            {destination.destinationName}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Star
                                    size={15}
                                    className="fill-green-600 text-green-600"
                                />
                                <span className="font-semibold">4.9</span>
                                <span className="text-gray-500">
                                    (234 reviews)
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays
                                    size={14}
                                    className="text-gray-500"
                                />
                                <span className="font-medium">
                                    {duration} Days
                                    {nights > 0 ? ` / ${nights} Nights` : ""}
                                </span>
                            </div>

                            <span className="bg-cyan-50 px-2 py-1 text-xs text-cyan-700">
                                {destination.category}
                            </span>
                        </div>

                        {/* Overview */}
                        <div className="mt-7">
                            <h2 className="text-xl font-medium">Overview</h2>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
                                {destination.description}
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="mt-7">
                            <h2 className="text-xl font-medium">Highlights</h2>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Discover the beauty of {destination.destinationName},
                                experience the local culture, and enjoy memorable
                                moments throughout your journey.
                            </p>

                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                {highlights.map((highlight) => (
                                    <div
                                        key={highlight}
                                        className="flex items-start gap-2 text-sm text-gray-500"
                                    >
                                        <Check
                                            size={16}
                                            className="mt-0.5 shrink-0 text-green-600"
                                        />
                                        <span>{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Booking card */}
                    <aside className="h-fit border border-gray-100 p-4 shadow-md">
                        <p className="text-xs text-gray-500">Starting from</p>

                        <p className="mt-1 text-3xl font-semibold tracking-tight text-cyan-600">
                            ${formattedPrice}
                        </p>

                        <p className="text-xs text-gray-500">per person</p>

                        <div className="mt-6 flex items-center gap-2 border border-gray-100 bg-gray-50 px-3 py-3 text-sm">
                            <CalendarDays
                                size={15}
                                className="text-gray-500"
                            />
                            <span>{formattedDate}</span>
                        </div>

                        <Link
                            href={`/bookings?destinationId=${destination._id}`}
                            className="mt-4 flex w-full items-center justify-center gap-2 bg-cyan-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-cyan-700"
                        >
                            Book Now
                            <ArrowRight size={16} />
                        </Link>

                        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                            {[
                                "Free cancellation up to 7 days",
                                "Travel insurance included",
                                "24/7 customer support",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-2 text-xs text-gray-500"
                                >
                                    <Check
                                        size={14}
                                        className="shrink-0 text-green-600"
                                    />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default function DestinationsDetailsPage({
    params,
}: PageProps) {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen px-4 py-6 sm:px-6">
                    <div className="mx-auto max-w-7xl animate-pulse">
                        <div className="h-8 w-48 bg-gray-100" />
                        <div className="mt-5 h-56 bg-gray-100 sm:h-72" />
                        <div className="mt-6 h-8 w-64 bg-gray-100" />
                        <div className="mt-4 h-4 max-w-xl bg-gray-100" />
                    </div>
                </main>
            }
        >
            <DestinationDetails params={params} />
        </Suspense>
    );
}
