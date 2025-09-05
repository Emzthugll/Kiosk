import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Dropdown({ options, defaultValue }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(defaultValue || options[0]);
    const dropdownRef = useRef(null);

    // Close when clicking outside
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-xs" ref={dropdownRef}>
            {/* Toggle */}
            <div
                className="flex items-center font-semibold gap-1 cursor-pointer bg-[#074797] border text-white rounded-md px-4 py-1 "
                onClick={() => setOpen(!open)}
            >
                <span>{selected}</span>
                {open ? (
                    <ChevronUp className="w-3 h-3" />
                ) : (
                    <ChevronDown className="w-3 h-3" />
                )}
            </div>

            {/* Menu */}
            {open && (
                <div className="absolute mt-1 left-0 font-semibold bg-white border border-gray-200 rounded-md shadow-md z-20 w-max">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                                setSelected(opt);
                                setOpen(false);
                            }}
                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-gray-700 whitespace-nowrap"
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
