import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AnnouncementItem from "@/Components/AnnouncementItem";
import QRCode from "react-qr-code";

export default function VacancySearch({ vacancies, search, activities }) {
    const [query, setQuery] = useState(search || "");
    const [showQR, setShowQR] = useState(null);
    const [showFullDetails, setShowFullDetails] = useState(false);

    // Debounce search input
    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.length >= 3 || query.length === 0) {
                router.get(
                    "/",
                    { search: query },
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        }, 400); // 0.4s delay for smoother typing

        return () => clearTimeout(delay);
    }, [query]);

    function decodeHtmlEntities(str) {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 md:p-6 gap-6 bg-white">
            {/* Left Column */}
            <div className="w-20 md:w-1/3 border-r-2 border-r-slate-300 pr-6 space-y-6">
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

                {/* Announcements */}
                <div className="sticky top-[250px] bg-white p-6 rounded-2xl border-slate-300  space-y-3 max-h-[400px] overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-2">
                        📢 Announcements
                    </h1>

                    {activities.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            No announcements yet.
                        </p>
                    ) : (
                        activities.map((a) => (
                            <AnnouncementItem key={a.id} activity={a} />
                        ))
                    )}
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
                                className="p-6 border rounded-2xl shadow-lg border-slate-200 bg-white flex flex-col justify-between h-full"
                            >
                                <div className="flex flex-col items-center">
                                    {/* Logo */}
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg bg-gray-100">
                                        {vacancy.company?.logo ? (
                                            <img
                                                src={`https://workinilocosnorte.ph/storage/company/${vacancy.company.logo}`}
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
                                    <h3 className="font-semibold text-md mb-1 text-center">
                                        {vacancy.title}
                                    </h3>

                                    {/* Company */}
                                    <p className="text-sm text-gray-600 mb-4 text-center">
                                        {vacancy.company?.name ||
                                            "Unknown Company"}
                                    </p>
                                </div>

                                {/* Button */}
                                <button
                                    className="mt-2 px-2 py-2 w-full bg-blue-600 text-white text-[13px] rounded hover:bg-blue-700 transition"
                                    onClick={() => setShowQR(vacancy)}
                                >
                                    More Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-lg w-full max-h-[95vh] overflow-y-auto flex flex-col items-start animate-modal-in">
                        <h3 className="mb-4 text-md font-semibold">
                            {showQR.title} - {showQR.company?.name}
                        </h3>

                        <div className="text-sm text-left text-gray-700 mb-4">
                            {showFullDetails ? (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: showQR.details,
                                    }}
                                />
                            ) : (
                                decodeHtmlEntities(
                                    showQR.details
                                        .replace(/<[^>]+>/g, "")
                                        .slice(0, 100)
                                ) + "..."
                            )}
                        </div>

                        <button
                            className="text-blue-600 text-xs mb-4 hover:underline"
                            onClick={() => setShowFullDetails(!showFullDetails)}
                        >
                            {showFullDetails ? "Show Less" : "Read More"}
                        </button>

                        {/* Centered QR Code Section */}
                        <div className="w-full flex flex-col items-center mb-4">
                            <QRCode
                                value={`https://workinilocosnorte.ph/jobs/search?vacancyId=${showQR.id}`}
                                size={150}
                            />
                            <h3 className="mt-2 text-center">Scan Me</h3>
                        </div>

                        <button
                            className="mt-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            onClick={() => setShowQR(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
