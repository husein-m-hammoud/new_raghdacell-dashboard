import React from "react";
import search from "../../images/Icon feather-search.png";

import { useFilter } from "../../APIs/useMyAPI";
const FilterSearch = ({ children }) => {
  const { handleParamsClick, searchParams } = useFilter();
  return (
    <div className="flex flex-wrap gap-3">
      <div className="border border-Pink flex space-x-2 p-2 rounded-xl">
        <span>
          <img src={search} alt="" />
        </span>
        <input
          type="search"
          value={searchParams.get("search")}
          onChange={(e) => handleParamsClick("search", e.target.value)}
          placeholder="Search"
          className=""
        />
      </div>
      {children && (
        <div className="border border-Pink flex space-x-2 p-2 rounded-xl max-sm:w-full">
          <select
            value={searchParams.get("type")}
            onChange={(e) => handleParamsClick("search_by", e.target.value)}
            className="outline-none text-center"
          >
            {children}
          </select>
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
