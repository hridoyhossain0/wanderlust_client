import React from 'react';
import { ArrowUpRight, Calendar, MapPin, Star } from 'lucide-react';
import Image from 'next/image';

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

interface DestinationCardProps {
  destination: Destination;
}

const AllDestinationCard = ({ destination }: DestinationCardProps) => {
    return (
        <div className="flex flex-col group max-w-sm bg-white font-sans text-gray-800">

            {/* Card Image Container with Absolute Rating Badge */}
            <div className="relative aspect-[16/10] w-full overflow-hidden mb-4 rounded-sm bg-gray-100">
                <Image
                    height={400}
                    width={600}
                    src={destination.imageUrl}
                    alt={destination.destinationName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                {/* Transparent Rating Badge Layout matching the image overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xs shadow-xs text-xs font-semibold text-gray-900 border border-gray-100">
                    <span>4.5</span>
                    <Star className="w-3 h-3 fill-black stroke-black" />
                </div>
            </div>

            {/* Destination Card Information Meta Grid */}
            <div className="flex flex-col flex-grow">

                {/* Country Location row */}
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-normal">{destination.country}</span>
                </div>

                {/* Name Title & Price Segment layout row */}
                <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 leading-snug tracking-tight">
                        {destination.destinationName}
                    </h3>
                    <div className="text-right whitespace-nowrap pl-2">
                        <span className="text-lg font-bold text-gray-900">${destination.price}</span>
                        <span className="text-gray-500 text-xs font-normal">/Person</span>
                    </div>
                </div>

                {/* Package Duration row */}
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-medium">{destination.duration}</span>
                </div>

                {/* Action interactive layout link button anchor */}
                <div className="mt-auto">
                    <a
                        href={`/book/${destination._id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-cyan-500 hover:text-cyan-600 uppercase border-b border-cyan-500 hover:border-cyan-600 pb-0.5 transition-colors"
                    >
                        Book Now
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>

            </div>
        </div>
    );
};

export default AllDestinationCard;