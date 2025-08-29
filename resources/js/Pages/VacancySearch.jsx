import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function VacancySearch({ vacancies, search }) {
    const [query, setQuery] = useState(search || "");

    // Debounce search (wait until user stops typing)
    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.length >= 3 || query.length === 0) {
                router.get(
                    "/", // your Inertia route (index page)
                    { search: query }, // pass query to backend
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        }, 400); // 0.4s delay for smoother typing

        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 md:p-6 gap-6 bg-white">
            {/* Left Column */}
            <div className="w-full md:w-1/3 border-r-2 border-r-slate-300 pr-6 space-y-6">
                {/* Search Bar */}
                <div className="sticky top-6 p-6 border-slate-300 rounded-2xl">
                    <img
                        className="h-10 w-auto mb-4"
                        src="./images/work.png"
                        alt="logo"
                    />

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search job vacancies..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full rounded-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Type at least{" "}
                        <span className="font-semibold">3 characters</span> to
                        search.
                    </p>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-2/3">
                <h2 className="text-xl font-bold mb-4">Latest Vacancies</h2>
                {vacancies.length === 0 ? (
                    <p className="text-gray-500">No vacancies found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vacancies.map((vacancy) => (
                            <div
                                key={vacancy.id}
                                className="p-6 border rounded-2xl shadow-lg border-slate-200 bg-white flex flex-col items-center"
                            >
                                {/* Logo */}
                                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg bg-gray-100">
                                    {vacancy.company?.logo ? (
                                        <img
                                            src={`/storage/company/${vacancy.company.logo}`}
                                            alt={vacancy.company.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            No Logo
                                        </span>
                                    )}
                                </div>
                                {/* Title */}
                                <h3 className="font-semibold text-md mb-1">
                                    {vacancy.title}
                                </h3>
                                {/* Company */}
                                <p className="text-sm text-gray-600 mb-4">
                                    {vacancy.company?.name || "Unknown Company"}
                                </p>
                                {/* Button */}
                                <Link
                                    href={`/vacancies/${vacancy.id}`}
                                    className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                >
                                    More Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
