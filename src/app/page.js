import Banner from "./components/tour/Banner/Banner";
import Fun from "./components/tour/Fun";
import Property from "./components/tour/Property/Property";

import { Roboto } from "next/font/google";
import TanguarHaorHouseboat from "./components/tour/TanguarHaorHouseboat";
import propertySummary from "@/services/tour/propertySummary";
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: 'Welcome to Bojra | Book Luxury Houseboats in Tanguar Haor',
  description: 'Book your dream houseboat experience in Sunamganj. Perfect for romantic getaways, group travel, and nature lovers.',
  keywords: [
    'Bojra Houseboat',
    'Tanguar Haor booking',
    'Houseboat Bangladesh',
    'Sunamganj travel deals',
    'Romantic getaway Bangladesh',
    'Boat stay',
    'Nature travel Bangladesh',
  ],
};

export default async function Home() {

  const locationId = 4;
  const result = await propertySummary(locationId);


  return (
    <main className={`${roboto.className}`}>


      {/* Banner section */}
      <div className="w-full pt-[36px] md:pt-[50px] relative z-10">
        <Banner />
      </div>

      {/* Main content wrapper */}
      <div className="py-[20px] md:py-10  rounded-lg">
        <div className="mt-[12px] md:mt-10 w-[100%] md:w-[80%] 2xl:w-[1440px] gap-5 lg:mx-auto">
          {/* Property list with visible overflow and z-index */}
          <div className=" lg:overflow-hidden">
            <Property  propertyData = {result}/>
          </div>
        </div>
      </div>
      <TanguarHaorHouseboat />
    </main>
  );
}
