import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";

export default function AnnouncementItem({ activity }) {
    const textDetails =
        new DOMParser().parseFromString(activity.details, "text/html").body
            .textContent || "";

    return (
        <div className="text-sm text-gray-800 border-b border-gray-200 pb-4 mb-3">
            <div className="px-14 font-extrabold mb-4">{activity.type}</div>

            <div className="px-14 text-gray-600 font-medium mb-2">
                {textDetails}
            </div>

            <div className="px-14 text-xs text-gray-500 mt-3 space-y-1">
                <div className="flex items-center space-x-1 mb-1">
                    <FaRegCalendarCheck className="text-blue-500" size={18} />
                    <span>
                        {new Date(activity.start).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </span>
                </div>

                <div className="flex items-center space-x-1 mb-1">
                    <FaRegCalendarTimes className="text-red-600" size={18} />
                    <span>
                        {new Date(activity.end).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </span>
                </div>

                <div className="flex items-center space-x-1">
                    <MdLocationOn className="text-red-500" size={19} />
                    <span>{activity.venue}</span>
                </div>
            </div>
        </div>
    );
}
