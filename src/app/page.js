import Banner from "./components/tour/Banner/Banner";
import Fun from "./components/tour/Fun";
import Property from "./components/tour/Property/Property";

import { Roboto } from "next/font/google";
import TanguarHaorHouseboat from "./components/tour/TanguarHaorHouseboat";
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  
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
            <Property />
          </div>
        </div>
      </div>
      <TanguarHaorHouseboat/>
    </main>
  );
}
