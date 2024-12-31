import React, { useState } from "react";

interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
}

interface MultiSelectDropdownProps {
    options: User[];
    selectedOptions: User[];
    onChange: (user: User) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    options,
    selectedOptions,
    onChange,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectedNames =
        selectedOptions.length > 0
            ? `${selectedOptions
                  .map((user) => `${user.firstName} ${user.lastName}`)
                  .join(", ")}`
            : "Select Users";

    return (
        <div className="relative w-full">
            <div
                className="border p-2 cursor-pointer flex justify-between items-center"
                onClick={handleToggleDropdown}
            >
                {selectedNames}
            </div>

            {isDropdownOpen && (
                <div className="absolute left-0 w-full bg-white border mt-1 shadow-lg z-10">
                    {options.map((user) => (
                        <div
                            key={user.id}
                            className="p-2 border-b last:border-b-0"
                        >
                            <input
                                type="checkbox"
                                id={user.id}
                                checked={selectedOptions.some(
                                    (u) => u.id === user.id
                                )}
                                onChange={() => onChange(user)}
                            />
                            <label htmlFor={user.id} className="ml-2">
                                {user.firstName} {user.lastName}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
