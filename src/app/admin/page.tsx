"use client";

import React, { useState } from "react";
import { FiTrash2, FiSave, FiChevronDown } from "react-icons/fi";

export default function AddTravelPackageForm(): React.JSX.Element {
    // Form State Configurations
    const [destinationName, setDestinationName] = useState("");
    const [country, setCountry] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            destinationName,
            country,
            category,
            price,
            duration,
            departureDate,
            imageUrl,
            description,
        });
    };

    const handleCancel = () => {
        // Reset or navigation trigger
        setDestinationName("");
        setCountry("");
        setCategory("");
        setPrice("");
        setDuration("");
        setDepartureDate("");
        setImageUrl("");
        setDescription("");
    };

    return (
        <div className="min-h-screen w-full bg-white px-6 py-12 md:px-12 lg:px-24 font-sans select-none">
            <div className="max-w-4xl mx-auto">

                {/* Page Main Heading */}
                <h1 className="text-gray-900 text-4xl font-normal tracking-tight mb-10 text-left select-text">
                    Add New Travel Package
                </h1>

                {/* Main Content Form Card Wrapper */}
                <div className="w-full bg-white border border-gray-100 shadow-sm p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Input Row: Destination Name */}
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="destinationName" className="text-gray-900 text-xs font-semibold tracking-wide">
                                Destination Name
                            </label>
                            <input
                                id="destinationName"
                                type="text"
                                value={destinationName}
                                onChange={(e) => setDestinationName(e.target.value)}
                                placeholder="Bali Paradise"
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-300 text-sm py-3 px-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Grid Row: Country & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="country" className="text-gray-900 text-xs font-semibold tracking-wide">
                                    Country
                                </label>
                                <input
                                    id="country"
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Indonesia"
                                    className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-300 text-sm py-3 px-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="category" className="text-gray-900 text-xs font-semibold tracking-wide">
                                    Category
                                </label>
                                <div className="relative w-full">
                                    <select
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 text-sm py-3 pl-4 pr-10 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled hidden>Select Category</option>
                                        <option value="Beach">Beach</option>
                                        <option value="Mountain">Mountain</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="City Break">City Break</option>
                                        <option value="Cultural">Cultural</option>
                                    </select>
                                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none stroke-[2.5]" />
                                </div>
                            </div>
                        </div>

                        {/* Grid Row: Price & Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="price" className="text-gray-900 text-xs font-semibold tracking-wide">
                                    Price (USD)
                                </label>
                                <input
                                    id="price"
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="e.g., 1299"
                                    className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-300 text-sm py-3 px-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="duration" className="text-gray-900 text-xs font-semibold tracking-wide">
                                    Duration
                                </label>
                                <input
                                    id="duration"
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="e.g., 7 Days/6 Nights"
                                    className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-300 text-sm py-3 px-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Input Row: Departure Date */}
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="departureDate" className="text-gray-900 text-xs font-semibold tracking-wide">
                                Departure Date
                            </label>
                            <input
                                id="departureDate"
                                type="date"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 text-sm py-3 px-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200 uppercase tracking-wider"
                                required
                            />
                        </div>

                        {/* Input Row: Image URL */}
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="imageUrl" className="text-gray-900 text-xs font-semibold tracking-wide">
                                Image URL
                            </label>
                            <input
                                id="imageUrl"
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-300 text-sm py-3 px-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Textarea Row: Description */}
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="description" className="text-gray-900 text-xs font-semibold tracking-wide">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the travel experience..."
                                rows={5}
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-800 placeholder-gray-300 text-sm py-3 px-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-200 resize-none"
                                required
                            />
                        </div>

                        {/* Action Buttons Container Group */}
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center gap-2 bg-white hover:bg-red-50 text-red-500 border border-red-200 font-medium text-xs uppercase tracking-wider py-3.5 px-6 transition-colors duration-200"
                            >
                                <FiTrash2 size={14} />
                                <span>Cancel</span>
                            </button>

                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-xs uppercase tracking-wider py-3.5 px-6 shadow-sm transition-colors duration-200"
                            >
                                <FiSave size={14} />
                                <span>Add Travel Package</span>
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}
