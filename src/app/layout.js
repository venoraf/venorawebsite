"use client";
import Header from "@/components/Header";
import "./globals.css"; // Your global styles
import { Roboto, Ropa_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Mailer from "@/components/Mailer";
import { useState, Suspense } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto", // Optional for CSS variable
});

const ropaSans = Ropa_Sans({
  subsets: ["latin"],
  weight: ["400"], // Ropa Sans has fewer weight options
  style: ["normal", "italic"],
  variable: "--font-ropa-sans", // Optional for CSS variable
});

export default function RootLayout({ children }) {
  const [isExpand, setIsExpand] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en" className={`${ropaSans.variable} bg-dark-purple-100`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icon.ico" type="image/x-icon" sizes="500x500" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>venoogle</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TRZSNGGH');
        `,
          }}
        ></script>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8RG9NY419T"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-8RG9NY419T');`,
          }}
        ></script>

        <meta property="og:title" content="Venoogle" />
        <meta property="og:description" content="everything you'll ever need" />
        <meta property="og:image" content="/Banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Venoogle" />
        <meta name="twitter:description" content="Venora Furtado's Archive" />
        <meta name="twitter:image" content="/Banner.png" />
      </head>
      <body className="flex flex-col min-h-screen relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRZSNGGH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header setShowMailer={setIsOpen} />
        </Suspense>

        <main className="flex-grow flex">
          <div className="w-full">
            <Suspense fallback={<div>Loading Body...</div>}>
              {children}
            </Suspense>
          </div>
        </main>

        {isOpen && (
          <Suspense fallback={<div>Loading Mailer...</div>}>
            <div
              className={`${
                isExpand
                  ? "fixed inset-0 bg-gray-900 bg-opacity-70 z-40 flex items-center justify-center"
                  : "fixed inset-0 bg-gray-900 bg-opacity-7 flex items-center justify-center md:block  md:bg-transparent md:inset-auto md:bottom-0 md:right-0 shadow-2xl"
              } `}
              style={{ zIndex: 100 }}
            >
              <Mailer
                isExpand={isExpand}
                isOpen={isOpen}
                setIsExpand={setIsExpand}
                setIsOpen={setIsOpen}
              />
            </div>
          </Suspense>
        )}

        <Footer />
      </body>
    </html>
  );
}
