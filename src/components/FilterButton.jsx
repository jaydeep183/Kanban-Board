import React, { useState } from "react";
import { AiOutlineDown } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';

const FilterButton = ({
  grouping,
  sorting,
  onGroupingChange,
  onSortingChange,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setDropdownVisible(!dropdownVisible)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FiSettings className="h-4 w-4" />
        Display
        <AiOutlineDown className="h-4 w-4" />
      </button>

      {dropdownVisible && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Grouping</span>
              <select
                value={grouping}
                onChange={(e) => onGroupingChange(e.target.value)}
                className="block w-32 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Ordering</span>
              <select
                value={sorting}
                onChange={(e) => onSortingChange(e.target.value)}
                className="block w-32 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
