import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SpecializationDropdown({ onChange }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const dropdownRef = useRef(null);

    const specializations = {
        "Admin/Human Resources": [
            "Clerical/Administrative Support",
            "Human Resources",
            "Secretarial/Executive Personal Assistant",
            "Top Management",
        ],
        "Sales/Marketing": [
            "Marketing/Business Dev",
            "Sales-Corporate",
            "Sales-Eng/Tech/IT",
            "Sales-Financial Services",
            "Retail Sales",
            "Merchandising",
            "Telesales/Telemarketing",
            "E-Commerce",
            "Digital Marketing",
        ],
        "Accounting/Finance": [
            "Audit & Taxation",
            "Banking/Financial",
            "Corporate Finance/Investment",
            "General/Cost Accounting",
        ],
        "Arts/Media/Communication": [
            "Advertising",
            "Arts/Creative Design",
            "Entertainment",
            "Public Relations",
        ],
        Services: [
            "Security/Armed Forces",
            "Customer Service",
            "Logistics/Supply Chain",
            "Law/Legal Services",
            "Personal Care",
            "Social Services",
            "Tech & Helpdesk Support",
        ],
        "Hotel/Restaurant": ["Food/Beverage/Restaurant", "Hotel/Tourism"],
        "Education/Training": [
            "Education",
            "Training and Development",
            "Academe Researcher",
        ],
        "Computer/Information Technology": [
            "IT-Hardware",
            "IT-Network/Sys/DB Admin",
            "IT-Software",
        ],
        Engineering: [
            "Chemical Engineering",
            "Electrical Engineering",
            "Electronics Engineering",
            "Environmental Engineering",
            "Industrial Engineering",
            "Mechanical/Automotive Engineering",
            "Oil/Gas Engineering",
            "Other Engineering Jobs",
        ],
        Manufacturing: [
            "Maintenance",
            "Manufacturing",
            "Process Design and Control",
            "Purchasing/ Material Management",
            "Quality Assurance",
        ],
        "Building/Construction": [
            "Architect/Interior Design",
            "Civil Engineering/Construction",
            "Property/Real Estate",
            "Quantity Surveying",
        ],
        Sciences: [
            "Actuarial/Statistics",
            "Agriculture",
            "Aviation",
            "Biomedical",
            "Biotechnology",
            "Chemistry",
            "Food Tech/Nutritionist",
            "Geology/Geophysics",
            "Science & Technology",
        ],
        Healthcare: ["Doctor/Diagnosis", "Pharmacy", "Nurse/Medical Support"],
        Others: ["General Work", "Journalist/Editor", "Publishing"],
    };

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

    const toggleSelect = (option) => {
        let updated;
        if (selected.includes(option)) {
            updated = selected.filter((item) => item !== option);
        } else {
            updated = [...selected, option];
        }
        setSelected(updated);
        onChange(updated);
    };

    return (
        <div className="relative inline-block text-xs" ref={dropdownRef}>
            {/* Toggle */}
            <div
                className="flex items-center font-semibold gap-1 cursor-pointer bg-[#074797] border text-white rounded-md px-4 py-1"
                onClick={() => setOpen(!open)}
            >
                <span>
                    {selected.length === 0
                        ? "Specializations"
                        : selected.length === 1
                        ? selected[0]
                        : `${selected.length} selected`}
                </span>

                {open ? (
                    <ChevronUp className="w-3 h-3" />
                ) : (
                    <ChevronDown className="w-3 h-3" />
                )}
            </div>

            {/* Menu */}
            {open && (
                <div className="absolute mt-1 left-0 font-semibold bg-white border border-gray-200 rounded-md shadow-md z-20 w-[300px] max-h-[400px] overflow-y-auto">
                    {Object.entries(specializations).map(([category, subs]) => (
                        <div
                            key={category}
                            className="border-b last:border-b-0"
                        >
                            <div className="px-3 py-2 bg-gray-100 text-gray-700">
                                {category}
                            </div>
                            {subs.map((sub) => (
                                <label
                                    key={sub}
                                    className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-50"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(sub)}
                                        onChange={() => toggleSelect(sub)}
                                    />
                                    <span className="text-gray-700">{sub}</span>
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
