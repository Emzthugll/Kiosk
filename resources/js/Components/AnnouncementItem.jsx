import { useState } from "react";

export default function AnnouncementItem({ activity }) {
    const textDetails =
        new DOMParser().parseFromString(activity.details, "text/html").body
            .textContent || "";

    return (
        <div className="text-sm text-gray-800 border-b border-gray-200 pb-4 mb-2">
            <div className="font-extrabold mb-6 ">{activity.type}</div>

            <div className="text-gray-600 font-medium mb-4">{textDetails}</div>

            <div className="text-xs text-gray-500 mt-3 space-y-1">
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
