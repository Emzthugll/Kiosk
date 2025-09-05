import { MdLocationOn } from "react-icons/md";
import { FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";

export default function AnnouncementItem({ activity }) {
    const textDetails =
        new DOMParser().parseFromString(activity.details, "text/html").body
            .textContent || "";

    return (
        <div className="text-sm text-gray-800 border-b border-gray-200 pb-4 mb-3">
            {/* Type */}
            <div className="px-14 font-extrabold mb-4">{activity.type}</div>

            {/* Details */}
            <div className="px-14 text-gray-600 font-medium mb-2">
                {textDetails}
            </div>

            {/* Companies */}
            {activity.related_companies && (
                <div className="px-14 text-xs text-gray-500 mb-2">
                    Companies:{" "}
                    <span className="text-green-500 text-xs font-semibold  rounded-full">
                        {activity.related_companies}
                    </span>
                </div>
            )}

            {/* Dates + Venue */}
            <div className="px-14 text-xs text-gray-500 mt-3 space-y-1">
                <div className="flex items-center space-x-1 mb-1">
                    <FaRegCalendarCheck className="text-blue-500" size={18} />
                    <span className="  text-xs font-semibold  rounded-full">
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
                    <span className="  text-xs font-semibold rounded-full">
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
                    <span className=" text-gray-500 text-xs font-semibold rounded-full">
                        {activity.venue}
                    </span>
                </div>
            </div>
        </div>
    );
}
