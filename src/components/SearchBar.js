"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SearchBar({ query }) {
  const [search, setSearch] = useState("Search Venora's Website");
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searches = [
    { search: "Venora's Projects", param: "venoras-projects" },
    { search: "Venora's Life", param: "life" },
    { search: "Why Hire Venora?", param: "why-hire-venora" },
  ];
  const path = usePathname();

  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);

  useEffect(() => {
    setShowSearch(false);
  }, [search, path]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearch(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-full gap-y-6 font-ropaSans ${
        path === "/" && "relative"
      }`}
      style={{ zIndex: 80 }}
    >
      {path === "/" && (
        <>
            {/* Move (Ven)oogle up */}
            <h2 className="text-white text-6xl lg:text-7xl xl:text-8xl absolute -top-28 lg:-top-36">
            (Ven)oogle
            </h2>
            {/* Move the subheader up along with (Ven)oogle */}
            <h3 className="text-accent-text text-md lg:text-lg xl:text-xl absolute -top-5 lg:-top-11 text-center w-full">
            Click the Search Bar and Explore the Trending Searches in the Bar Below!
            </h3>
        </>
        )}

      <div
        ref={dropdownRef} // Attach ref to the dropdown container
        className={`flex flex-col items-center shadow-lg ${
          (path !== "/" && "md:absolute w-full top-6 left-48 md:w-2/5 ") ||
          "absolute w-11/12 md:w-2/3 lg:w-2/5"
        } ${showSearch ? "rounded-3xl" : "rounded-full"} py-2 bg-accent-color`}
      >
        <div className="flex items-center w-full px-4">
          <div
            className="bg-no-repeat w-5 h-5 bg-cover"
            style={{
              backgroundImage: showSearch
                ? "url(icons/arrow.svg)"
                : "url(icons/search.svg)",
            }}
            onClick={() => setShowSearch(!showSearch)}
          />
          <div
            className={`flex-grow px-4 py-2 bg-accent-color focus:outline-none ${
              search === "Search (Ven)oogle" ? "text-accent-text" : "text-white"
            }`}
            onClick={() => setShowSearch(!showSearch)}
          >
            {(query && searches.find((item) => item.param === query)?.search) ||
              search}
          </div>

          <div className="flex flex-row justify-center items-center gap-x-2">
          <Link
            className="bg-no-repeat w-5 h-5 bg-cover cursor-pointer"
            href={"https://www.youtube.com/watch?v=KNtJGQkC-WI"}
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Improves security
            onMouseEnter={() => setTooltip2(!tooltip2)}
            onMouseLeave={() => setTooltip2(!tooltip2)}
            style={{ backgroundImage: "url(icons/microphone.svg)" }}
            />
            <Link
            className="bg-no-repeat w-5 h-5 bg-cover"
            href={"https://whip-cupboard-0a6.notion.site/academia-2e093b0aef214faba03a211e10c11aa4"}
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Improves security
            onMouseEnter={() => setTooltip(!tooltip)}
            onMouseLeave={() => setTooltip(!tooltip)}
            style={{ backgroundImage: "url(icons/calendar.svg)" }}
            />

            <div
              className={`bg-[#15131B] hidden md:${
                tooltip ? "block" : "hidden"
              } text-white absolute p-2 rounded-xl px-4 text-xs text-nowrap border border-accent-text border-opacity-40 top-12`}
            >
              link to my notion!
            </div>
            <div
              className={`bg-[#15131B] hidden md:${
                tooltip2 ? "block" : "hidden"
              } text-white absolute p-2 rounded-xl px-4 text-xs text-nowrap border border-accent-text border-opacity-40 top-12`}
            >
              my favorite song 🫶
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="w-full">
            <div className="border-b border-accent-text mx-4" />
            <h2 className="px-4 font-semibold text-md text-accent-text mt-2">
              Trending searches
            </h2>
            {searches.map((item, idx) => (
              <Link
                className="px-4 flex flex-row items-center w-full gap-x-2 text-[#E5DFFF] py-2 rounded-lg hover:bg-white hover:bg-opacity-5"
                href={`/search?q=${encodeURIComponent(item.param)}`}
                key={idx}
                onClick={() => {
                  setShowSearch(false); // Hide dropdown
                }}
              >
                <div
                  className="bg-no-repeat w-5 h-3 bg-cover"
                  style={{ backgroundImage: "url(icons/trending.svg)" }}
                />
                {item.search}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}