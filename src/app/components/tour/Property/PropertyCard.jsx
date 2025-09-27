// components/PropertyCard.jsx
import Image from "next/image";
import Link from "next/link";
import IconShow from "@/services/tour/IconShow";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

export default function PropertyCard({ 
  property, 
  index, 
  contactNumber, 
  onCardClick 
}) {
  const handleClick = () => {
    onCardClick(index);
  };

  return (
    <div key={property.property_id} data-index={index} className="mb-5">
      <div className="shadow-custom flex flex-col lg:flex-row gap-5 pt-5 pl-5 pr-5 pb-0 rounded bg-white relative">
        {/* Discount Badge */}
        {property.discout && (
          <div className="absolute top-5 right-5 lg:top-5 lg:left-[315px] z-10 w-14 h-14 p-2 text-white text-center font-semibold text-sm bg-red-700 rounded-full flex items-center justify-center">
            {property.discout}
          </div>
        )}
        
        <div className="md:min-w-[400px] min-w-0 md:min-h-[300px] min-h-0 relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${property.main_img}`}
            alt={property.property_name}
            width={500}
            height={300}
            className="object-cover w-full md:w-[300px] md:h-[230px] h-[200px] mx-auto"
          />
        </div>

        <div className="flex flex-col w-full pr-4 pb-4">
          <Link
            href={`/Property/${property.property_id}`}
            className="cursor-pointer"
            onClick={handleClick}
          >
            <h1 className="font-heading font-semibold text-lg text-[#00026E]">
              {property.property_name}
            </h1>
          </Link>

          <h1 className="font-normal text-sm text-[#00026E] text-right md:mb-0 mb-[20px]">
            Starting from <br />
            <span className="font-bold text-lg text-blue-900">
              {(() => {
                const prices = property.property_uinit?.flatMap((unit) =>
                  unit.price?.map((priceObj) => priceObj.price)
                ) || [];
                return prices.length > 0
                  ? `${Math.min(...prices).toLocaleString()} TK`
                  : "N/A";
              })()}
            </span>
          </h1>

          {property.property_summaries && (
            <PropertySummaries 
              summaries={property.property_summaries} 
              contactNumber={contactNumber}
              onCardClick={handleClick}
              propertyId={property.property_id}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component for property summaries
function PropertySummaries({ summaries, contactNumber, onCardClick, propertyId }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-4">
        {summaries.slice(0, 1).map((summary) => (
          <SummaryItem key={summary.id} summary={summary} />
        ))}
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-4 w-full md:w-auto">
          {summaries.slice(1, 3).map((summary) => (
            <SummaryItem key={summary.id} summary={summary} />
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {summaries.slice(3, 4).map((summary) => (
          <SummaryItem key={summary.id} summary={summary} />
        ))}
      </div>
      <ActionButtons 
        contactNumber={contactNumber}
        onCardClick={onCardClick}
        propertyId={propertyId}
      />
    </div>
  );
}

function SummaryItem({ summary }) {
  return (
    <div className="flex items-center text-gray-700">
      <IconShow iconName={summary.icons.icon_name} />
      <span className="ml-2 text-sm text-gray-900">{summary.value}</span>
    </div>
  );
}

function ActionButtons({ contactNumber, onCardClick, propertyId }) {
  return (
    <div className="flex flex-row flex-wrap md:justify-between justify-start items-center gap-[5px] sm:gap-[25px]">
      <div className="flex">
        <div className="mr-[6px]">
          <Link
            href={`/Property/${propertyId}`}
            style={{
              background: "linear-gradient(90deg, #313881, #0678B4)",
            }}
            className="text-[11px] md:text-[14px] xl:text-[16px] h-[40px] sm:px-4 px-[5px] py-2 text-white font-semibold rounded-md"
            onClick={onCardClick}
          >
            See Details
          </Link>
        </div>
        <div>
          <Link
            href={`/Property/${propertyId}`}
            style={{
              background: "linear-gradient(90deg, #313881, #0678B4)",
            }}
            className="text-[11px] md:text-[14px] xl:text-[16px] h-[40px] sm:px-4 py-2 px-[5px] text-white font-semibold rounded-md"
            onClick={onCardClick}
          >
            Book Now
          </Link>
        </div>
      </div>
      
      <MobileContactButtons contactNumber={contactNumber} />
      <DesktopContactButtons contactNumber={contactNumber} />
    </div>
  );
}

function MobileContactButtons({ contactNumber }) {
  return (
    <>
      <div className="md:hidden block mt-[10px]">
        <a href={`tel:${contactNumber?.Phone}`} className="mr-[-1px] ml-0">
          <div className="phone-call md:w-[50px] md:h-[50px] w-[37px] h-[37px] ml-[15px]">
            <FaPhone className="i md:ml-[17px] md:mt-[17px] mt-[10px] ml-[10px]" />
          </div>
        </a>
      </div>
      <div className="md:hidden block mt-[10px]">
        <Link
          href={`https://wa.me/${contactNumber?.Phone}`}
          className="mx-[10px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="btn-whatsapp-pulse btn-whatsapp-pulse-border md:w-[50px] md:h-[50px] w-[36px] h-[36px] md:mt-[0px] mt-[-5px] ml-[15px]">
            <FaWhatsapp className="w-[25px] h-[25px] text-white" />
          </span>
        </Link>
      </div>
    </>
  );
}

function DesktopContactButtons({ contactNumber }) {
  return (
    <div className="md:block hidden">
      <div className="flex justify-start md:justify-start">
        <div className="flex items-center">
          <span className="text-black md:text-[16px] text-[14px] font-bold">
            For instant service:{" "}
          </span>
          <div className="mr-[5px] mt-[10px]">
            <a
              href={`tel:${contactNumber?.Phone}`}
              className="mx-[10px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="phone-call md:w-[50px] md:h-[50px] w-[36px] h-[36px] ml-[15px]">
                <FaPhone className="i md:ml-[17px] md:mt-[17px] mt-[8px] ml-[11px]" />
              </div>
            </a>
          </div>
          <div>
            <Link
              href={`https://wa.me/${contactNumber?.Phone}`}
              className="mx-[10px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-whatsapp-pulse btn-whatsapp-pulse-border md:w-[50px] md:h-[50px] w-[36px] h-[36px] md:mt-[0px] mt-[-5px]">
                <FaWhatsapp className="w-[25px] h-[25px] text-white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}