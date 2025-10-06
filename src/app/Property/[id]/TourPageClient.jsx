// app/tour/[id]/TourPageClient.jsx
"use client";
import { useEffect, useState, useRef } from "react";
import ContactForm from "@/app/components/tour/ContactForm/ContactForm";
import { getPropertyImages } from "@/services/tour/getPropertyImages";
import ImageCarousel from "@/app/components/ImageCarousel/ImageCarousel";
import { IoLocation } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto } from "next/font/google";
import AccordionBookMe from "@/services/tour/Accordion";
import PackageCarousel from "@/app/components/packageCarousel/packageCarousel";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function TourPageClient({ 
  propertyImages, 
  propertyDetails, 
  propertyFacilities, 
  propertyPackages, 
  contactNumber,
  propertyId 
}) {
  const [isFixed, setIsFixed] = useState(false);
  const accordionRef = useRef(null);
  const [accordionWidth, setAccordionWidth] = useState("auto");

  console.log(propertyDetails);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerHeight = 80; 
      if (scrollY > headerHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate the width of the Accordion section
  useEffect(() => {
    if (accordionRef.current) {
      const width = accordionRef.current.offsetWidth;
      setAccordionWidth(`${width}px`);
    }
  }, [isFixed]);

  console.log(propertyPackages);

  return (
    <div>
      <div className={`${roboto.className} pt-[80px] bg-[#EBF0F4] pb-[20px] md:pb-[200px] `}>
        <div className="container w-[98%] md:w-[85%] mx-auto">
          <div className="grid-cols-1 rounded gap-8 lg:grid pr-1 pt-1">
            {/* Property Details */}
            <div className="col-span-1 p-2">
              {propertyDetails?.length === 0 ? (
                <div>Loading...</div>
              ) : (
                propertyDetails?.map((property, index) => (
                  <div key={index}>
                    <h2 className={`font-heading text-xl text-blue-900 font-bold`}>
                      {property?.property_name}
                    </h2>
                    <p className="flex text-black items-center">
                      <strong>
                        <IoLocation />
                      </strong>{" "}
                      {property.address}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Image Carousel */}
            <div>
              {propertyImages?.length > 0 ? (
                <ImageCarousel propertyImages={propertyImages} />
              ) : (
                <div className="flex bg-gray-200 h-96 justify-center w-full items-center">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}
            </div>
          </div>

          {/* Packages Section */}
          <div className="my-[30px]">
            <h1 className={`font-heading text-blue-700 text-[32px] font-bold my-[32px]`}>
              Packages:
            </h1>
            <PackageCarousel
              propertyPackages={propertyPackages} 
              contactNumber={contactNumber}
            />
          </div>

          {/* Sticky Accordion Section */}
          <div className="bg-white p-[15px] rounded-lg top-[80px]">
            <div className="">
              <div className="w-full">
                <div className="grid-cols-3 rounded gap-10 lg:grid">
                  <div className="col-span-2">
                    <AccordionBookMe facilities={propertyFacilities} />
                  </div>

                  <div className="col-span-1 p-[10px] rounded-lg shadow-lg">
                    <div>
                      <h1 className={`font-heading text-base shadow-2xl bg-white font-bold text-blue-900 md:mt-0 mt-[15px]`}>
                        Get consultancy/Get a call
                      </h1>
                      <ContactForm 
                        category={"tour"} 
                        propertyDetails={propertyDetails[0]?.property_name} 
                        headline={""} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add padding to prevent overlapping */}
          {isFixed && (
            <div style={{ height: accordionRef.current?.offsetHeight }} />
          )}
        </div>
        {/* Toast container*/}
        <ToastContainer />
      </div>
    </div>
  );
}