import { useState } from "react";

export default function AnnouncementItem({ activity }) {
    const [showFull, setShowFull] = useState(false);

    // Convert HTML to plain text safely
    const textDetails =
        new DOMParser().parseFromString(activity.details, "text/html").body
            .textContent || "";

    return (
        <div className="text-sm text-gray-700 border-b border-gray-200 pb-2 mb-2">
            <div className="font-semibold">{activity.type}</div>

            <div className="text-gray-700 mb-1">
                {showFull
                    ? textDetails
                    : textDetails.slice(0, 100) +
                      (textDetails.length > 100 ? "..." : "")}
            </div>

            {textDetails.length > 100 && (
                <button
                    className="text-blue-600 text-xs mt-1"
                    onClick={() => setShowFull(!showFull)}
                >
                    {showFull ? "Show Less" : "Read More"}
                </button>
            )}

            <div className="text-xs text-gray-500 mt-1 space-y-1">
                <div>
                    <span className="font-medium">From:</span>{" "}
                    {new Date(activity.start).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </div>
                <div>
                    <span className="font-medium">To:</span>{" "}
                    {new Date(activity.end).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </div>
                <div>
                    <span className="font-medium">Venue:</span> {activity.venue}
                </div>
            </div>
        </div>
    );
}
