"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Header({ setShowMailer }) {
  const path = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [linkMenu, setLinkMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [textCopy, setIsCopy] = useState(false);
  const menuRef = useRef(null);
  const linkRef = useRef(null);
  const profileRef = useRef(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const displayQuery = query ? query : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("venora10@gmail.com");
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 4000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const externalLinks = [
    { text: "code", icon: "github.svg", url: "https://github.com/venoraf" },
    {
      text: "connect",
      icon: "linkedin.svg",
      url: "https://www.linkedin.com/in/venorafurtado/",
    },
    {
      text: "resume",
      icon: "resume1.png",
      url: "https://drive.google.com/file/d/1TqPuPXkIl13Ckovf_xVt6ekxZX0_svEm/view?usp=sharing",
      style: { width: '100px', height: '100px' },
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if the click is outside the menu, but not inside the linkRef or profileRef
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !linkRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setShowMenu(false);
        setProfileMenu(false);
        setLinkMenu(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("click", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className={`flex   ${
        path !== "/" ? "flex-col-reverse " : "flex-row"
      } gap-y-2 w-full md:flex-row justify-between items-center font-ropaSans text-accent-text p-4 ${
        (path !== "/" && "pt-8") || "pl-10"
      }  md:pl-16 relative`}
    >
      <div
        style={{ zIndex: 40 }}
        className={`flex ${
          path !== "/" ? "flex-col" : "flex-row"
        } w-full md:flex-row gap-x-5 items-center`}
      >
        {(path !== "/" && (
          <Link href="/" className="text-white text-2xl hidden md:block">
            (Ven)oogle
          </Link>
        )) || (
          <Link
            href="/about"
            className="cursor-pointer hover:opacity-70 transform transition-all duration-300 "
          >
            About
          </Link>
        )}

        {path !== "/" && <SearchBar query={displayQuery} />}
      </div>

      <div className="flex flex-row items-center justify-center gap-x-5">
        {path !== "/" && (
          <Link href="/" className={`text-white text-2xl block md:hidden`}>
            (Ven)oogle
          </Link>
        )}
        <div
          className="cursor-pointer hover:opacity-70 transform transition-all duration-300"
          onClick={() => setShowMailer(true)}
        >
          Gmail
        </div>

        <div
          onClick={() => {
            setLinkMenu(!linkMenu);
            profileMenu ? setShowMenu(true) : setShowMenu(!showMenu);
            setProfileMenu(false);
          }} // Toggle onClick
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            (linkMenu && "rounded-full  bg-white bg-opacity-20") ||
            "hover:bg-white hover:bg-opacity-10"
          } transform transition-all duration-300`}
          ref={linkRef}
        >
          <div
            className="bg-no-repeat w-6 h-6 bg-cover cursor-pointer"
            style={{ backgroundImage: "url(icons/menu.svg)" }}
          />
        </div>

        <div
          style={{ backgroundImage: "url(head-shot.png)" }}
          onClick={() => {
            setProfileMenu(!profileMenu);
            linkMenu ? setShowMenu(true) : setShowMenu(!showMenu);
            setLinkMenu(false);
          }}
          ref={profileRef}
          className="rounded-full bg-no-repeat bg-cover w-8 h-8 cursor-pointer"
        />

        {showMenu && (
          <div
            ref={menuRef}
            style={{ zIndex: 90 }}
            className={`absolute ${
              (linkMenu &&
                `grid grid-cols-3 right-5 ${
                  path !== "/"
                    ? "-bottom-[12rem] md:-bottom-[16.5rem]"
                    : "-bottom-[9rem]"
                }`) ||
              (profileMenu &&
                `flex flex-col right-5 ${
                  path !== "/"
                    ? "-bottom-[20.5rem] md:-bottom-[26rem]"
                    : " -bottom-[28.5rem]"
                }`)
            } bg-dark-purple-200 border border-[0.5rem]  border-accent-color  rounded-[1.5rem] p-6 gap-6`}
          >
            {linkMenu &&
            externalLinks.map((link, idx) => (
                <Link
                key={idx}
                href={link.url}
                className="flex flex-col items-center hover:bg-white hover:bg-opacity-5 px-4 py-2 rounded-lg"
                target="_blank" // Opens link in a new tab
                rel="noopener noreferrer" // Security measure
                >
                <div
                    className={`bg-no-repeat bg-cover w-12 h-12 ${
                    link.text === "resume" ? "rounded-lg" : ""
                    }`}
                    style={{ backgroundImage: `url(icons/${link.icon})` }}
                />
                <h2>{link.text}</h2>
                </Link>
            ))}


            {profileMenu && (
              <div
              className="flex flex-col w-full"
              >
              <div className="flex flex-row w-full gap-x-10 justify-end">
                <div className="flex flex-row">
                  <h2>venora10@gmail.com</h2>
                  <div
                    className="bg-no-repeat bg-cover w-5 h-5 cursor-pointer"
                    onClick={handleCopy}
                    style={{
                      backgroundImage: textCopy
                        ? "url(icons/copy-filled.svg)"
                        : "url(icons/copy.svg)",
                    }}
                  />
                </div>
                <div
                  className="bg-no-repeat bg-cover w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setProfileMenu(!profileMenu);
                    setShowMenu(!showMenu);
                  }}
                  style={{ backgroundImage: "url(icons/exit.svg)" }}
                />
              </div>
              <div className="flex flex-row w-full">
                <h2
                  className={`${
                    textCopy ? "visible" : "invisible"
                  } text-xs text-center w-full text-white mb-4`}
                >
                  email copied successfully!
                </h2>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div
                  style={{ backgroundImage: "url(head-shot.png)" }}
                  className="rounded-full bg-no-repeat bg-cover w-24 h-24 cursor-pointer"
                />
                <h2 className="text-xl">Hi, I'm Venora!</h2>
              </div>
              <div className="flex flex-col font-ropaSans-light text-md gap-y-5">
                <h2 className="text-center">
                  Welcome to my personal site 🩷
                </h2>
                <div className="flex flex-col">
                  <h2 className="text-sm text-white">HOW TO USE</h2>
                  <h2>
                    Explore my projects and journey using{" "}
                    <span className="italic text-pink-300">Search </span>
                  </h2>
                  <h2>
                    Send me a message using{" "}
                    <span className="italic text-pink-300">Gmail</span>{" "}
                  </h2>
                  <h2>
                    View more of my work using the{" "}
                    <span className="italic text-pink-300">Dot-Menu</span>
                  </h2>
                  <h2>
                    Learn more about me using the{" "}
                    <span className="italic text-pink-300">About Page</span>
                  </h2>
                </div>
                <Link
                  href="/about"
                  className="text-center text-white border border-white py-2 px-4 rounded-full hover:bg-white hover:text-dark-purple-100 transition-all duration-300"
                  onClick={() => {
                    setShowMenu(false); // Close the popup menu
                    setProfileMenu(false); // Close the profile menu
                  }}
                >
                  About Page
                </Link>
              </div>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
}