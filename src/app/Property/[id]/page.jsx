// app/tour/[id]/page.jsx
import { notFound } from "next/navigation";
import getFacilities from "@/services/tour/getFacilities";
import getPropertyDetails from "@/services/tour/getPropertyDetails";
import { getPropertyImages } from "@/services/tour/getPropertyImages";
import getPropertyPackages from "@/services/tour/getPropertyPackages";
import getContactNumber from "@/services/tour/getContactNumber";
import TourPageClient from "./TourPageClient";

//
// ✅ DYNAMIC METADATA
//
export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const [details, facilities] = await Promise.all([
      getPropertyDetails(id),
      getFacilities(id),
    ]);


    const propertyName = facilities.property_name || "Tour Package";

   

    const keywords = [
      propertyName,
      "Tanguar Haor",
      "Ship",
      "Tour Package",
      "Travel Bangladesh",
    ];

    return {
      title: propertyName,
      description: `${propertyName} is a Tanguar Haor ship experience designed for nature lovers and adventure seekers.`,
      keywords,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Tour Page Error",
      description: "There was a problem loading this tour.",
      keywords: "Tour, Travel, Error",
    };
  }
}

//
// ✅ MAIN PAGE
//
export default async function TourPage({ params }) {
  const { id } = params;

  try {
    const [images, details, facilities, packages, contactNumber] = await Promise.all([
      getPropertyImages(id),
      getPropertyDetails(id),
      getFacilities(id),
      getPropertyPackages(id),
      getContactNumber(),
    ]);

    if (!details || details.length === 0) {
      notFound();
    }

    return (
      <TourPageClient
        propertyImages={images}
        propertyDetails={details}
        propertyFacilities={facilities}
        propertyPackages={packages}
        contactNumber={contactNumber}
        propertyId={id}
      />
    );
  } catch (error) {
    console.error("Error fetching property data:", error);
    notFound();
  }
}
