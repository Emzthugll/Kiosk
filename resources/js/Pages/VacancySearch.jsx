import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AnnouncementItem from "@/Components/AnnouncementItem";
import VacancyModal from "@/Components/VacancyModal";

export default function VacancySearch({ vacancies, search, activities }) {
    const [query, setQuery] = useState(search || "");
    const [showQR, setShowQR] = useState(null);

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
        }, 500);

        return () => clearTimeout(delay);
    }, [query]);

    function toTitleCase(str) {
        if (!str) return "";
        return str.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen  p-6 gap-6 bg-white ">
            {/* Left Column */}
            <div className="w-20 md:w-1/3 border-r-2 border-r-slate-300 pr-3 fixed top-0 left-0 h-screen flex flex-col bg-white">
                {/* Search Bar */}
                <div className="px-5 py-3 border-slate-300 rounded-2xl bg-white mb-6">
                    <img
                        className="h-[60px] w-auto mb-4 mx-auto"
                        src="./images/work.png"
                        alt="logo"
                    />

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search job vacancies..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoComplete="off"
                            className="w-full text-[#074797] rounded-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#074797] shadow-sm"
                        />
                        {query && (
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                width={19}
                                height={19}
                                onClick={() => setQuery("")}
                                className="cursor-pointer text-gray-500  absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition hover:text-[#074797]"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z"></path>
                                </g>
                            </svg>
                        )}
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                        Type at least{" "}
                        <span className="font-semibold">3 characters</span> to
                        search.
                    </p>
                </div>

                {/* Announcements + Footer */}
                <div className="bg-white  rounded-2xl border-slate-300 flex-1 flex flex-col min-h-0">
                    <h1 className="text-2xl px-4 font-bold mb-5 flex-shrink-0 flex items-center gap-2">
                        <img
                            src="./images/horn.png"
                            alt="announcement icon"
                            className="h-8 w-8"
                        />
                        Announcements
                    </h1>

                    {/* announcements */}
                    <div className="space-y-3 overflow-y-auto flex-1 min-h-0 pr-2">
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

                    {/* Footer */}
                    <div className="mt-2 pt-2  border-slate-300 text-center">
                        {/* Logos */}
                        <div className="flex justify-center items-center gap-6 mb-1">
                            <img
                                src="./images/bagong-pilipinas.png"
                                alt="Logo 1"
                                className="h-[60px] w-15"
                            />
                            <img
                                src="./images/logo.png"
                                alt="Logo 2"
                                className="h-10 w-auto"
                            />
                            <img
                                src="./images/peso.png"
                                alt="Logo 3"
                                className="h-[50px] w-auto"
                            />
                        </div>

                        {/* Text */}
                        <p className="text-xs text-[#074797] pb-3">
                            Powered by the Information Technology Office.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full ml-[35%] scrollable ">
                {vacancies.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[80vh]">
                        <img
                            src="./images/page-not-found.png"
                            alt="No vacancies"
                            className="h-32 w-32 mb-4"
                        />
                        <p className="text-gray-500 text-lg font-medium">
                            No vacancies found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vacancies.map((vacancy) => (
                            <div
                                key={vacancy.id}
                                className="p-6 border rounded-2xl shadow-lg border-slate-200 bg-white flex flex-col justify-between h-full ransition-all duration-300 hover:shadow-[0_0_30px_rgba(7,71,151,0.5)]"
                                onClick={() => setShowQR(vacancy)}
                            >
                                <div className="flex flex-col items-center">
                                    {/* Logo */}
                                    {vacancy.company?.logo && (
                                        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg">
                                            <img
                                                src={`https://workinilocosnorte.ph/storage/company/${vacancy.company.logo}`}
                                                alt={vacancy.company.name}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.onerror =
                                                        null;
                                                    e.currentTarget.src =
                                                        "https://kiosk.workinilocosnorte.ph/images/work.png";
                                                }}
                                            />
                                        </div>
                                    )}

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
                                    className="mt-2 px-2 py-2 w-full bg-[#074797] text-white text-[13px] rounded hover:bg-[#0a2e59] transition flex items-center justify-center gap-2"
                                    onClick={() => setShowQR(vacancy)}
                                >
                                    More Details
                                    <img
                                        src="./images/press.png"
                                        alt="icon"
                                        className="h-5 w-5"
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <VacancyModal
                showQR={showQR}
                setShowQR={setShowQR}
                toTitleCase={toTitleCase}
            />
        </div>
    );
}
