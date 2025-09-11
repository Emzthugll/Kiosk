import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SalaryToDropdown({ value, onChange, salaryFrom }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { label: "₱0", amount: 0 },
        { label: "₱10,000+", amount: 10000 },
        { label: "₱20,000+", amount: 20000 },
        { label: "₱30,000+", amount: 30000 },
        { label: "₱50,000+", amount: 50000 },
    ];

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

    const parseAmount = (val) => {
        if (!val) return 0;
        return parseInt(val.replace(/[^0-9]/g, ""), 10) || 0;
    };

    const fromAmount = parseAmount(salaryFrom);

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
                    {options.map((option) => {
                        const disabled = option.amount < fromAmount;
                        return (
                            <div
                                key={option.label}
                                onClick={() => {
                                    if (!disabled) {
                                        onChange(option.label);
                                        setOpen(false);
                                    }
                                }}
                                className={`flex items-center gap-2 px-3 py-1 cursor-pointer 
                                    ${
                                        disabled
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "hover:bg-gray-50"
                                    }
                                    ${
                                        value === option.label
                                            ? "bg-gray-100 font-bold"
                                            : ""
                                    }
                                `}
                            >
                                {value === option.label && !disabled && (
                                    <span className="text-blue-600 text-xs">
                                        ✔
                                    </span>
                                )}
                                <span>{option.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
