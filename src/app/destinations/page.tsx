import React, { Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import AllDestinationCard from '@/components/AllDestinationCard';

// Define the interface for our destination data
interface Destination {
    _id: string
    destinationName: string
    country: string
    category: string
    price: number
    duration: string
    departureDate: string
    imageUrl: string
    description: string
}

// NOTE: the fetch must live inside the component, not at module scope.
// A module-level `await fetch(...)` runs once when the file is first imported
// and freezes the result — new destinations never appear until the dev server
// restarts (or the page is rebuilt). Behind <Suspense> it re-runs on every
// request, so freshly added data shows up instantly.
async function DestinationResults() {
    let alldata: Destination[] = [];

    try {
        const res = await fetch('http://localhost:5000/destinations');
        if (res.ok) {
            const data = await res.json();
            alldata = Array.isArray(data) ? data : [];
        } else {
            console.error(`Failed to load destinations: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        // Backend not running — render an empty list instead of crashing the page
        console.error('Failed to load destinations:', error);
    }

    return (
        <>
            {/* Results Counter */}
            <div className="mb-6">
                <p className="text-sm text-gray-500">
                    Showing {alldata.length} destinations
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {alldata.map((data) => <AllDestinationCard key={data._id} destination={data} />)}
            </div>
        </>
    );
}

function ResultsFallback() {
    return (
        <div>
            <div className="mb-6">
                <p className="text-sm text-gray-500">Loading destinations...</p>
            </div>
            <div className="h-48 w-full animate-pulse bg-gray-100" />
        </div>
    );
}

export default function ExploreDestinations() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-white font-sans text-gray-800">

            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-4xl font-normal text-gray-900 tracking-tight mb-2">
                    Explore All Destinations
                </h1>
                <p className="text-gray-500 text-sm">
                    Find your perfect travel experience from our curated collection
                </p>
            </div>

            {/* Filter and Sorting Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200 rounded-sm mb-6">
                <button className="flex items-center justify-between px-4 py-3.5 text-left text-sm text-gray-400 uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    <span>Category</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <button className="flex items-center justify-between px-4 py-3.5 text-left text-sm text-gray-400 uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    <span>Price Range</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <button className="flex items-center justify-between px-4 py-3.5 text-left text-sm text-gray-400 uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    <span>Sort By</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Data streams fresh from the backend on every request */}
            <Suspense fallback={<ResultsFallback />}>
                <DestinationResults />
            </Suspense>

        </div>
    );
}
