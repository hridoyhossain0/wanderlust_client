"use client";

import type { FormEvent } from "react";

const fields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export default function SearchBar() {
  // No search backend yet — keep the form on-page instead of reloading.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-1 border-t border-white/20 bg-white/10 backdrop-blur-md lg:grid-cols-[repeat(4,1fr)_auto]"
    >
      {fields.map((field, index) => (
        <label
          key={field.label}
          className={index > 0 ? "border-t border-white/20 px-6 py-4 lg:border-t-0 lg:border-l" : "px-6 py-4"}
        >
          <span className="block text-sm font-semibold text-white">
            {field.label}
          </span>
          <input
            type="text"
            name={field.label}
            aria-label={field.label}
            placeholder={field.placeholder}
            className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
          />
        </label>
      ))}
      <button
        type="submit"
        className="bg-primary px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-primary/90 lg:min-w-[150px]"
      >
        Search
      </button>
    </form>
  );
}
