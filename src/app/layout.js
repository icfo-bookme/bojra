import Footer from "./components/shared/Footer/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { SearchProvider } from "@/SearchContext";
import { PaginationProvider } from "@/services/tour/usePagination";
import BookMeHeader from "./components/shared/BookMeHeader/BookmeHeader";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// SEO metadata object
export const metadata = {
  title: "Bojra - Best Houseboat of Tanguar Haor",
  description:
    "Discover Tanguar Haor (টাঙ্গুয়ার হাওর) with the best houseboats like Bojra Houseboat (বজরা হাউজবোট), the best houseboat of Tanguar Haor and best houseboat in Tanguar Haor. Explore luxury houseboats, compare Tanguar haor houseboat price, book Tanguar Haor boat rent, and enjoy premium houseboat tours with Tanguar haor tour package.",
  keywords:
    "Tanguar Haor, Best houseboat of Tanguar Haor, Best houseboat in Tanguar Haor, Luxury Houseboat, Tanguar haor houseboat price, টাঙ্গুয়ার হাওর, Bojra houseboat, Tanguar Haor boat rent, Tanguar haor tour package, Premium houseboat, বজরা হাউজবোট",
  metadataBase: new URL("https://www.bojraboat.com"),
  robots: "index, follow",
  openGraph: {
    title: "Bojra - Best Houseboat of Tanguar Haor",
    description:
      "Book the best luxury houseboat for your Tanguar Haor tour. Bojra offers premium experiences with comfort and convenience.Discover Tanguar Haor and enjoy a unique stay on the best houseboat of Tanguar Haor, like the luxurious Bojra houseboat or other premium houseboats, while exploring Tanguar Haor boat rent options, comparing Tanguar haor houseboat price, and booking a full Tanguar haor tour package to experience the true beauty of টাঙ্গুয়ার হাওর aboard a বজরা হাউজবোট, the best houseboat in Tanguar Haor.",
    url: "https://www.bojraboat.com",
    siteName: "Bojra Tours",
    type: "website",
   
  },
  
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" data-theme="white">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />

    

        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16756605497"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N5SZNHZP');
          `}
        </Script>
      </head>

      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N5SZNHZP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <PaginationProvider>
          <SearchProvider>
            <div className="bg-white">
              <main>
                <BookMeHeader />
                <div className="min-h-[100vh] py-[20px]">{children}</div>
                <Footer />
              </main>
            </div>
          </SearchProvider>
        </PaginationProvider>
      </body>
    </html>
  );
}
