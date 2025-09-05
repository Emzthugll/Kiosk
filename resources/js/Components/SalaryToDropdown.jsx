import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SalaryToDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = ["Any", "₱10,000+", "₱20,000+", "₱30,000+", "₱50,000+"];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-xs" ref={dropdownRef}>
            <div
                className="flex items-center font-semibold gap-1 cursor-pointer bg-[#074797] border text-white rounded-md px-4 py-1"
                onClick={() => setOpen(!open)}
            >
                <span>{value || "Paying To"}</span>
                {open ? (
                    <ChevronUp className="w-3 h-3" />
                ) : (
                    <ChevronDown className="w-3 h-3" />
                )}
            </div>

            {open && (
                <div className="absolute mt-1 left-0 font-semibold bg-white border border-gray-200 rounded-md shadow-md z-20 w-[200px] max-h-[200px] overflow-y-auto">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className={`flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-50 ${
                                value === option ? "bg-gray-100 font-bold" : ""
                            }`}
                        >
                            {value === option && (
                                <span className="text-blue-600 text-xs">✔</span>
                            )}
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
