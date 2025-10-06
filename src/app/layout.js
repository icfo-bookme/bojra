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

export const metadata = {
  title: 'Bojra - The House Boat',
  description: 'Luxury houseboat in Tanguar Haor. Discover the Best Houseboats – A Luxurious Floating Experience in Nature.',
  keywords: [
    'Tanguar Haor',
    'Luxury Houseboat',
    'Bojra',
    'Sunamganj Travel',
    'Eco Tourism Bangladesh',
    'Houseboat Booking',
    'Bangladesh Travel',
  ],
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
