import propertySummary from "@/services/tour/propertySummary";
import Banner from "./components/tour/Banner/Banner";
import Property from "./components/tour/Property/Property";
import TanguarHaorHouseboat from "./components/tour/TanguarHaorHouseboat";
import { Roboto } from "next/font/google";
import PropertyList from "./components/tour/Property/Property";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });


export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch data directly in the server component
  let bannerData = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel-slider/destination/4`,
      {
        cache: "no-store", 
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    bannerData = await response.json();
  } catch (error) {
    console.error("Error fetching banner data:", error);
  }
const result = await propertySummary(4);
  return (
    <main className={`${roboto.className}`}>
      {/* Banner Section */}
      <div className="w-full pt-[36px] md:pt-[50px] relative z-10">
        <Banner terms={bannerData} />
      </div>

      {/* Main Content Wrapper */}
      <div className="py-[20px] md:py-10 rounded-lg">
        <div className="mt-[12px] md:mt-10 w-[100%] md:w-[80%] 2xl:w-[1440px] gap-5 lg:mx-auto">
          {/* Property List */}
          <div className="lg:overflow-hidden">
             <PropertyList initialData={result} id= {4}/>
          </div>
        </div>
      </div>

      <TanguarHaorHouseboat />
    </main>
  );
}
