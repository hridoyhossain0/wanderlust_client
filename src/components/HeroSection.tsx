"use client"
import  { useState } from 'react';
import { ArrowRight, Search, MapPin, Calendar, DollarSign, Users } from 'lucide-react';

interface FilterItemProps {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ icon, label, placeholder, value, onChange }) => {
    return (
        <div className="flex-1 min-w-[150px] px-6 py-4 flex flex-col justify-center border-r border-white/20 last:border-0">
            <div className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                {icon}
                <span>{label}</span>
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent text-white placeholder-white/50 text-sm font-medium focus:outline-none w-full"
            />
        </div>
    );
};

export default function HeroSection(): React.JSX.Element {
    // Search bar form states
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [budget, setBudget] = useState('');
    const [people, setPeople] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ location, date, budget, people });
    };

    return (
        <div className="relative min-h-[calc(100vh-73px)] w-full flex flex-col justify-between items-center bg-gray-900 font-sans overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('https://unsplash.com')`
                }}
            />

            {/* Main Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-12">
                <h1 className="text-white text-5xl md:text-7xl font-extralight tracking-tight leading-tight mb-6">
                    Discover Your <br />
                    <span className="font-light">Next Adventure</span>
                </h1>

                <p className="text-white/90 text-base md:text-lg max-w-xl font-normal leading-relaxed mb-10 tracking-wide">
                    Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm px-8 py-3.5 rounded-none uppercase tracking-wider transition-all duration-200 shadow-md">
                        Explore Now
                        <ArrowRight size={16} />
                    </button>

                    <button className="bg-white/20 hover:bg-white/30 text-white border border-white/40 font-medium text-sm px-8 py-3.5 rounded-none uppercase tracking-wider transition-all duration-200 backdrop-blur-sm">
                        View Destination
                    </button>
                </div>
            </div>

            {/* Bottom Search Filter Bar */}
            <form
                onSubmit={handleSearch}
                className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/10 flex flex-col md:flex-row items-stretch"
            >
                <FilterItem
                    icon={<MapPin size={14} />}
                    label="Location"
                    placeholder="Address, City Or Zip"
                    value={location}
                    onChange={setLocation}
                />
                <FilterItem
                    icon={<Calendar size={14} />}
                    label="Date/Duration"
                    placeholder="Anytime/3 Days"
                    value={date}
                    onChange={setDate}
                />
                <FilterItem
                    icon={<DollarSign size={14} />}
                    label="Budget"
                    placeholder="$0-$3000"
                    value={budget}
                    onChange={setBudget}
                />
                <FilterItem
                    icon={<Users size={14} />}
                    label="People"
                    placeholder="5-10"
                    value={people}
                    onChange={setPeople}
                />

                {/* Search Submit Button */}
                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-12 py-5 md:py-0 flex items-center justify-center gap-2 font-medium tracking-wide uppercase transition-colors duration-200 min-w-[160px]"
                >
                    <Search size={18} />
                    <span>Search</span>
                </button>
            </form>
        </div>
    );
}
