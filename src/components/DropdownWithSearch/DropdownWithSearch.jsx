import React, { useEffect, useState } from "react";
import Select from "react-select";

const DropdownWithSearch = ({
  options,
  onSelect,
  disabled,
  label = "label",
  selectedValue = null,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (options && selectedValue != null) {
      setSelectedOption(
        options.find((option) => option.value === selectedValue) || null
      );
    }
  }, [selectedValue, options]);

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
    onSelect(selectedOption);
  };
 
  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isSearchable={true}
      placeholder="Select..."
    />
  );
};

export default DropdownWithSearch;
