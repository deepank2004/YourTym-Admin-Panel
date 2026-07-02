import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";

const FilterDropdown = ({
    filters = [],
    selectedFilter,
    onFilterSelect,
    resetLabel = "Reset Filter",
    showReset = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleFilterSelect = (filter) => {
        onFilterSelect(filter); 
        setIsOpen(false); 
    };

    return (
        <div className="filter-dropdown">
            <button className="filter-button" onClick={toggleDropdown}>
                <span className="filter-icon">
                    <IoFilter />
                </span>
                {selectedFilter || "Choose Filter"}
                <span className="dropdown-arrow">
                    {isOpen ? (
                        <IoMdArrowDropup color="#9B9B9B" size={25} />
                    ) : (
                        <IoMdArrowDropdown color="#9B9B9B" size={25} />
                    )}
                </span>
            </button>
            {isOpen && (
                <div className="dropdown-menu1">
                    {filters.map((filter) => (
                        <div
                            key={filter.value}
                            className={`menu-item ${
                                selectedFilter === filter.label ? "active" : ""
                            }`}
                            onClick={() => handleFilterSelect(filter)}
                        >
                            {filter.label}
                        </div>
                    ))}
                    {showReset && (
                        <div
                            className="menu-item reset"
                            onClick={() => handleFilterSelect(null)}
                        >
                            <span className="reset-icon">
                                <GrPowerReset />
                            </span>{" "}
                            {resetLabel}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
