import React, { useState } from 'react';

const Dropdown = ({ options, onSelect, disabled, label = 'name' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown(); // Close the dropdown after selecting an option
  };
  return (
    <div className="relative">
      <button
        className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 ${disabled  ? 'opacity-75' : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded="true"
        disabled={disabled}
      >
        {selectedOption ? selectedOption[label] : '-- Select --'}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
          <ul
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <li key={index}>
                <button
                  className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleSelect(option)}
                >
                  {option[label]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
