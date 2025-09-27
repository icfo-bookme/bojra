// components/SearchAndFilter.jsx
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RangeSlider } from "flowbite-react";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import { IoSearch, IoClose } from "react-icons/io5";

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  price,
  setPrice,
  sortOption,
  setSortOption,
  setCurrentPage,
  propertyNames,
  isSearchFocused,
  setIsSearchFocused
}) {
  const { register, handleSubmit } = useForm();
  const searchInputRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const onSubmit = (data) => {
    const previousScrollPosition = window.scrollY;
    setSearchTerm(data.property);
    setCurrentPage(1);
    setShowSuggestions(false);
    setTimeout(() => {
      window.scrollTo(0, previousScrollPosition);
    }, 0);
  };

  const handleClearSearch = () => {
    const previousScrollPosition = window.scrollY;
    setSearchTerm("");
    setCurrentPage(1);
    setShowSuggestions(false);
    setTimeout(() => {
      window.scrollTo(0, previousScrollPosition);
    }, 0);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  const normalizeString = (str) => {
    return str
      ? str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      : "";
  };

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      const normalizedSearchTerm = normalizeString(searchTerm);
      const filtered = propertyNames.filter(name => 
        normalizeString(name).includes(normalizedSearchTerm)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, propertyNames]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setCurrentPage(1);
    if (searchInputRef.current) {
      searchInputRef.current.value = suggestion;
    }
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const previousScrollPosition = window.scrollY;
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setTimeout(() => {
      window.scrollTo(0, previousScrollPosition);
    }, 0);
  };

  return (
    <div className="mb-8 bg-white">
      <div className="flex flex-col md:flex-row bg-white gap-6 mb-6">
        {/* Search Form */}
        <div className="flex-1 lg:hidden relative">
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register("property")}
              ref={searchInputRef}
              type="text"
              defaultValue={searchTerm}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
              onChange={handleInputChange}
              onFocus={() => {
                setIsSearchFocused(true);
                if (searchTerm && filteredSuggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  setIsSearchFocused(false);
                  setShowSuggestions(false);
                }, 200);
              }}
              placeholder="Search properties by name..."
              autoComplete="off"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <IoClose className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute z-30 w-full mt-1 text-black bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter and Sort Row */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Price Filter */}
        <div className="w-full lg:w-2/3 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-blue-700">
              <FaFilter className="h-5 w-5" />
              <span className="text-sm font-medium">Price Range</span>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <RangeSlider
                id="default-range"
                min={0}
                max={10000}
                step={500}
                value={price}
                onChange={(e) => {
                  const previousScrollPosition = window.scrollY;
                  setPrice(Number(e.target.value));
                  setTimeout(() => {
                    window.scrollTo(0, previousScrollPosition);
                  }, 0);
                }}
                tooltip="true"
                tooltipposition="top" 
                className="w-full mt-[-18px] appearance-none h-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-bold text-blue-700 whitespace-nowrap min-w-[90px]">
                {parseInt(price).toLocaleString()}
                {parseInt(price) > 9500 ? "+" : ""} TK
              </span>
            </div>
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="w-full lg:w-1/3 flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-gray-700">
            <FaSortAmountDown className="h-4 w-4" />
            <span className="text-sm font-medium">Sort by:</span>
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none bg-white shadow-sm"
            value={sortOption}
            onChange={(e) => {
              const previousScrollPosition = window.scrollY;
              setSortOption(e.target.value);
              setCurrentPage(1);
              setTimeout(() => {
                window.scrollTo(0, previousScrollPosition);
              }, 0);
            }}
          >
            <option value="2">Price: Low to High</option>
            <option value="3">Price: High to Low</option>
            <option value="">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
}