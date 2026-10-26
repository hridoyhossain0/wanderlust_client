
"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2, FiSave, FiChevronDown } from "react-icons/fi";

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

interface EditDestinationsProps {
    destination: Destination;
}

const EditDestinations = ({ destination }: EditDestinationsProps) => {
    const router = useRouter();

    // Snapshot of the selected destination — used to prefill the form and to
    // restore the original values when the user cancels.
    const original = {
        destinationName: destination.destinationName ?? "",
        country: destination.country ?? "",
        category: destination.category ?? "",
        price: destination.price != null ? String(destination.price) : "",
        duration: destination.duration != null ? String(destination.duration) : "",
        departureDate: destination.departureDate ?? "",
        imageUrl: destination.imageUrl ?? "",
        description: destination.description ?? "",
    };

    const [destinationName, setDestinationName] = useState(original.destinationName);
    const [country, setCountry] = useState(original.country);
    const [category, setCategory] = useState(original.category);
    const [price, setPrice] = useState(original.price);
    const [duration, setDuration] = useState(original.duration);
    const [departureDate, setDepartureDate] = useState(original.departureDate);
    const [imageUrl, setImageUrl] = useState(original.imageUrl);
    const [description, setDescription] = useState(original.description);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        const form = {
            destinationName,
            country,
            category,
            price: Number(price),
            duration,
            departureDate,
            imageUrl,
            description,
        };

        try {
            const res = await fetch(`http://localhost:5000/add-destination/${destination._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to save travel package."
                );
            }

            setSuccessMsg("Travel package saved successfully!");

            // Keep the saved values in the form (edit semantics — clearing the
            // fields here would wipe the dialog the user is still looking at),
            // and refresh the server-rendered details page so it shows the
            // updated data from the database.
            router.refresh();

            console.log("Saved destination:", data);
        } catch (error) {
            console.error("Save destination error:", error);

            setErrorMsg(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setDestinationName(original.destinationName);
        setCountry(original.country);
        setCategory(original.category);
        setPrice(original.price);
        setDuration(original.duration);
        setDepartureDate(original.departureDate);
        setImageUrl(original.imageUrl);
        setDescription(original.description);
        setErrorMsg("");
        setSuccessMsg("");
    };

    return (
        <Dialog>
            {/* Edit trigger: className only, no Button component */}
            <DialogTrigger
                className="flex items-center gap-2 border border-red-200 bg-white px-4 py-2 text-sm text-red-500 shadow-none hover:bg-red-50 hover:text-red-500"
            >
                Edit
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Destination</DialogTitle>
                    <DialogDescription>
                        Update the destination information and save your changes.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMsg && (
                        <div
                            role="alert"
                            className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                        >
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div
                            role="status"
                            className="border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                        >
                            {successMsg}
                        </div>
                    )}

                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="destinationName"
                            className="text-xs font-semibold tracking-wide text-gray-900"
                        >
                            Destination Name
                        </label>
                        <input
                            id="destinationName"
                            type="text"
                            value={destinationName}
                            onChange={(e) => setDestinationName(e.target.value)}
                            placeholder="Bali Paradise"
                            className="w-full border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex flex-col space-y-1.5">
                            <label
                                htmlFor="country"
                                className="text-xs font-semibold tracking-wide text-gray-900"
                            >
                                Country
                            </label>
                            <input
                                id="country"
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Indonesia"
                                className="w-full border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label
                                htmlFor="category"
                                className="text-xs font-semibold tracking-wide text-gray-900"
                            >
                                Category
                            </label>
                            <div className="relative w-full">
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full cursor-pointer appearance-none border border-gray-200 bg-[#fcfcfc] py-3 pl-4 pr-10 text-sm text-gray-800 transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none"
                                    required
                                    disabled={loading}
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    <option value="Beach">Beach</option>
                                    <option value="Mountain">Mountain</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="City Break">City Break</option>
                                    <option value="Cultural">Cultural</option>
                                </select>
                                <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex flex-col space-y-1.5">
                            <label
                                htmlFor="price"
                                className="text-xs font-semibold tracking-wide text-gray-900"
                            >
                                Price (USD)
                            </label>
                            <input
                                id="price"
                                type="number"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="e.g., 1299"
                                className="w-full border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label
                                htmlFor="duration"
                                className="text-xs font-semibold tracking-wide text-gray-900"
                            >
                                Duration
                            </label>
                            <input
                                id="duration"
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="e.g., 7 Days/6 Nights"
                                className="w-full border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="departureDate"
                            className="text-xs font-semibold tracking-wide text-gray-900"
                        >
                            Departure Date
                        </label>
                        <input
                            id="departureDate"
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            className="w-full border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm text-gray-800 transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="imageUrl"
                            className="text-xs font-semibold tracking-wide text-gray-900"
                        >
                            Image URL
                        </label>
                        <input
                            id="imageUrl"
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="description"
                            className="text-xs font-semibold tracking-wide text-gray-900"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the travel experience..."
                            rows={5}
                            className="w-full resize-none border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/*
                        Sticky footer: the form is taller than the dialog's
                        max-h-[90vh] scroll box on typical laptop windows, so
                        without this the buttons sit BELOW the visible panel.
                        A click there lands on the backdrop instead of the
                        button, which makes Base UI close the dialog
                        ("Edit Travel Package" click -> popup disappears).
                        Pinned inside the panel, the buttons are always
                        visible and clickable.
                    */}
                    <div className="sticky bottom-0 z-10 -mx-4 flex items-center justify-end gap-4 border-t bg-popover px-4 pb-4 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex items-center gap-2 border border-red-200 bg-white px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-red-500 transition-colors duration-200 hover:bg-red-50 disabled:opacity-60"
                        >
                            <FiTrash2 size={14} />
                            <span>Cancel</span>
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-cyan-500 px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-white shadow-sm transition-colors duration-200 hover:bg-cyan-600 disabled:opacity-60"
                        >
                            <FiSave size={14} />
                            <span>
                                {loading ? "Editing..." : "Edit Travel Package"}
                            </span>
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinations;
