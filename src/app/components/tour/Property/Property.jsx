"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Roboto } from "next/font/google";
import { TailSpin } from "react-loader-spinner";
import { useSearch } from "@/SearchContext";
import getContactNumber from "@/services/tour/getContactNumber";
import { usePagination } from "@/services/tour/usePagination";
import Pagination from "../Pagination/Pagination";
import PropertyCard from "./PropertyCard";
import SearchAndFilter from "./SearchAndFilter";
import NoResults from "./NoResults";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Property({ initialData, id }) {
  const { searchTerm, setSearchTerm } = useSearch();
  const { currentPage, handlePageChange, setCurrentPage } = usePagination();
  const [data, setData] = useState(initialData || []);
  const [price, setPrice] = useState(10000);
  const [sortOption, setSortOption] = useState("");
  const [contactNumber, setContactNumber] = useState([]);
  const [loading, setLoading] = useState(!initialData);
  const [initialLoadComplete, setInitialLoadComplete] = useState(!!initialData);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [propertyNames, setPropertyNames] = useState([]);

  const itemsPerPage = 10;
  const propertyListRef = useRef(null);

  // Use initialData if provided, otherwise fetch data
  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setLoading(false);
      setInitialLoadComplete(true);
      
      // Extract property names for suggestions
      const names = initialData.map(property => property.property_name);
      setPropertyNames(names);
    } else {
      async function fetchData() {
        try {
          setLoading(true);
          const locationId = 4;
          const result = await propertySummary(locationId);
          setData(result);
          
          // Extract property names for suggestions
          const names = result.map(property => property.property_name);
          setPropertyNames(names);
        } catch (error) {
          console.error("Error fetching property data:", error);
        } finally {
          setLoading(false);
          setInitialLoadComplete(true);
        }
      }
      fetchData();
    }
  }, [initialData, id]);

  // Fetch contact number
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getContactNumber();
        setContactNumber(result);
      } catch (error) {
        console.error("Error fetching contact number data:", error);
      }
    }
    fetchData();
  }, []);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, setCurrentPage]);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortOption) {
      return data;
    }

    const getMinPrice = (property) => {
      const prices = property.property_uinit?.flatMap((unit) =>
        unit.price?.map((priceObj) => priceObj.price)
      ) || [];
      return prices.length > 0 ? Math.min(...prices) : Infinity;
    };

    const sorted = [...data].sort((a, b) => {
      const priceA = getMinPrice(a);
      const priceB = getMinPrice(b);

      if (priceA === Infinity && priceB === Infinity) return 0;
      if (priceA === Infinity) return 1;
      if (priceB === Infinity) return -1;

      return sortOption === "2" ? priceA - priceB : priceB - priceA;
    });

    return sorted;
  }, [data, sortOption]);

  // Normalize string for search
  const normalizeString = (str) => {
    return str
      ? str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      : "";
  };

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = sortedData;

    if (searchTerm) {
      const normalizedSearchTerm = normalizeString(searchTerm);
      filtered = filtered.filter((property) => {
        const normalizedPropertyName = normalizeString(property.property_name);
        return normalizedPropertyName.includes(normalizedSearchTerm);
      });
    }

    if (price <= 9500) {
      filtered = filtered.filter((property) => {
        const prices = property.property_uinit?.flatMap(
          (unit) => unit.price?.map((priceObj) => priceObj.price) || []
        );
        return prices.length > 0 && Math.min(...prices) <= price;
      });
    }

    return filtered;
  }, [sortedData, searchTerm, price]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  // Total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle card click for scroll preservation
  const handleCardClick = (index) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    sessionStorage.setItem("lastViewedCardIndex", index);
    sessionStorage.setItem("currentPage", currentPage);
  };

  // Restore scroll position
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    const lastViewedCardIndex = sessionStorage.getItem("lastViewedCardIndex");
    const savedCurrentPage = sessionStorage.getItem("currentPage");

    if (savedCurrentPage) {
      setCurrentPage(parseInt(savedCurrentPage, 10));
    }

    if (scrollPosition && lastViewedCardIndex) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPosition));
        const cardElement = document.querySelector(
          `[data-index="${lastViewedCardIndex}"]`
        );
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        sessionStorage.removeItem("scrollPosition");
        sessionStorage.removeItem("lastViewedCardIndex");
        sessionStorage.removeItem("currentPage");
      }, 1000);
    } else {
      window.scrollTo(0, 0);
    }
  }, [sortedData, setCurrentPage]);

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setPrice(10000);
    setSortOption("");
    setCurrentPage(1);
  };

  return (
    <div
      className={`${roboto.className} bg-white lg:container lg:w-full mx-auto lg:px-4 z-20`}
      ref={propertyListRef}
    >
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        price={price}
        setPrice={setPrice}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setCurrentPage={setCurrentPage}
        propertyNames={propertyNames}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <TailSpin height="80" width="80" color="#0678B4" />
        </div>
      ) : (
        <>
          {/* No results found */}
          {initialLoadComplete && filteredData.length === 0 && (
            <NoResults searchTerm={searchTerm} onClearFilters={handleClearFilters} />
          )}

          {/* Property List */}
          {paginatedData.length > 0 &&
            paginatedData.map((property, index) => (
              <PropertyCard
                key={property.property_id}
                property={property}
                index={index}
                contactNumber={contactNumber}
                onCardClick={handleCardClick}
              />
            ))}
        </>
      )}

      {/* Pagination Controls */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}