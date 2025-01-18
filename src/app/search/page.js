"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import projects from "../../data/projects.json";
import experiences from "../../data/experience.json";
import life from "../../data/life.json";
import whyHire from "../../data/why.json";

export default function Search() {
  const [isHover, setIsHover] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const project = searchParams.get("p");
  const [selectedSearch, setSelectedSearch] = useState(
    project === "meetmidway"
      ? projects.find((proj) => proj.alias === "meetmidway")
      : ""
  );
  const displayQuery = query ? query : "";
  const displayData =
    (displayQuery == "venoras-projects" && [...projects]?.reverse()) ||
    (displayQuery == "experience" && experiences) ||
    (displayQuery == "life" && [...life]?.reverse()) ||
    (displayQuery == "why-hire-venora" && whyHire) ||
    [];

  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(project === "meetmidway" ? true : false);
  const learning = [
    "Rust"
  ];
  const languages = [
    "Python",
    "Java",
    "C",
    "C#",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "Sqlite",
    "GraphQL",
  ];
  const technologies = [
    "React JS",
    "Nodejs",
    "Next JS",
    "Flask",
    "Django",
    "Tailwind CSS",
    "Postgres",
    "AWS",
    "pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
  ];

  useEffect(() => {
    if (project) {
      const params = new URLSearchParams(searchParams); // Clone the existing searchParams
      params.delete("p"); // Remove 'p' parameter

      // Update the URL without refreshing the page
      router.replace(`?${params.toString()}`, { shallow: true });
    }
  }, [project, searchParams, router]);

  const handleSelect = (data) => {
    setIsOpen(true);
    setSelectedSearch(data);
  };

  const SearchItem = ({ data }) => {
    return (
      <div
        className="font-ropaSans flex flex-row gap-x-2"
        style={{ zIndex: 10 }}
      >
        <div className="w-4/5">
          <div className="flex flex-row items-center gap-x-4">
            <div className="bg-dark-purple-300 rounded-full w-8 h-8 flex items-center justify-center">
              <div
                className="bg-no-repeat bg-cover w-5 h-5"
                style={{ backgroundImage: `url(icons/key.svg)` }}
              />
            </div>
            <div className="font-light leading-tight">
              <h2>{data.title}</h2>
              <h2 className="opacity-75 text-sm">{data.timeline}</h2>
            </div>
          </div>
          <h2
            className="text-search-blue text-xl hover:underline cursor-pointer"
            onClick={() => handleSelect(data)}
          >
            {data.headline}
          </h2>
          <h2 className="text-white opacity-50">{data.searchDescription}</h2>
        </div>

        <div
          className="bg-no-repeat bg-cover w-24 h-24 rounded-md"
          style={{ backgroundImage: `url(search-img/${data.alias}-icon.png)` }}
        />
      </div>
    );
  };

  const SearchItemOpen = ({ data }) => {
    return (
      <div>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 flex items-center justify-center">
          <div
            className={`p-2 flex flex-col items-center h-4/5 w-11/12 md:w-4/5 lg:w-3/5 bg-accent-color rounded-lg shadow-lg border-2 border-pink-800 z-50 transform transition-transform duration-300 ease-in-out`}
          >
            <div className="flex row w-full justify-end mb-2">
            <div
              className="bg-no-repeat bg-cover w-6 h-6 cursor-pointer transform transition-transform duration-100 hover:scale-110 hover:red-500"
              style={{ 
                backgroundImage: "url(icons/exit.svg)",
                backgroundColor: "transparent" // Ensures default background is transparent
              }}
              onClick={() => setIsOpen(false)}
            />

            </div>
  
            <div
              className="relative w-5/6 h-5/6 md:h-4/5 rounded-lg bg-no-repeat bg-cover bg-center border-2 border-stone-400 overflow-hidden"
              style={{
                backgroundImage: data.image
                  ? `url(search-img/${data.alias}-banner.png)`
                  : "url(default-background.png)", // Default background
              }}
            >
              {data.video ? (
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg border border-stone-700"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src={`search-videos/${data.alias}-banner.mp4`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : data.pptx ? (
                <iframe
                  src={data.pptx}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  frameBorder="0" 
                  allowFullScreen
                  title="Google Slides Slideshow"
                ></iframe>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                
              </div>
            )}
          </div>
  
            {data.audio && (
              <div className="mt-4 w-full flex justify-center">
                <audio
                  className="w-5/6 md:w-4/6 rounded-lg"
                  controls
                >
                  <source src={`search-audio/${data.audio}`} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            )}
  
            <div className="flex flex-col w-full items-center justify-start h-3/5 p-4 gap-y-2 relative">
              <h2 className="w-full text-2xl">{data.title}</h2>
              <div className="flex flex-row w-full gap-x-2">
                {displayQuery === "venoras-projects" &&
                  data.links.map((link, idx) => (
                    <Link
                      className={`flex flex-row py-1.5 px-3 text-sm font-medium text-center items-center gap-x-2 rounded border border-stone-700 transform transition-all duration-300 ${
                        link.name == "github"
                          ? "bg-dark-purple-300 hover:bg-[#4D456E] border-dark-purple-300 flex-row-reverse"
                          : "bg-white text-dark-purple-100 hover:bg-stone-200 hover:text-dark-purple-300"
                      }`}
                      key={idx}
                      href={link.link}
                      target={"_blank"}
                    >
                      <h2>{link.name}</h2>
                      <div
                        className={`bg-no-repeat bg-cover ${
                          link.name == "video" ? "w-6 h-6" : "w-4 h-4"
                        }`}
                        style={{
                          backgroundImage: `url(icons/${link.url})`,
                        }}
                      />
                    </Link>
                  ))}
              </div>
  
              <div
                className="relative w-full h-full overflow-y-scroll overflow-x-hidden text-wrap scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="font-thin">{data.longDescription}</div>
              </div>
  
              <div className="flex flex-row w-full gap-x-2">
                {data.type == "project" &&
                  data.tech.map((stack, idx) => (
                    <div
                      key={idx}
                      className="bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                    >
                      {stack}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  
  return (
    <div className="flex flex-col w-full h-full text-white font-ropaSans">
      <div className="flex flex-col w-full relative ">
        <div className="border borber-b border-[0.05rem] border-white border-opacity-10" />
        <div className="w-full flex flex-row gap-x-20 py-10">
          <div className="flex flex-col gap-y-4 px-4 md:w-1/2  lg:pl-48">
            {(displayQuery !== "why-hire-venora" &&
              displayData?.map((data, idx) => (
                <div key={idx}>
                  <SearchItem data={data} />
                </div>
              ))) || (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-x-2 items-center">
                  <div
                    className="bg-no-repeat bg-cover w-4 h-5"
                    style={{ backgroundImage: "url(icons/star.svg)" }}
                  />
                  <h2>AI Overview</h2>
                </div>

                <div
                  className={`flex flex-col gap-y-3 relative ${
                    showMore ? "h-auto" : "h-40 overflow-y-hidden"
                  }`}
                >
                  {!showMore && (
                    <>
                      <h2>
                        <span className="bg-[#735B95] py-1">
                          I transform virtual environments.
                        </span>
                      </h2>
                      <h2 className="">
                        <span className="bg-[#735B95]  py-1">
                        Seeking global opportunities to specialize in emerging
                        technologies and apply my skills in developing software and 
                        refining my design thinking
                        </span>
                      </h2>
                    </>
                  )}

                  <h2>
                  Ever since I started exploring programming, I’ve been driven by a passion to use my technical 
                  expertise to create innovative solutions that positively impact the world around me. 
                  My background in computer science, combined with my leadership experience and creativity, 
                  has enabled me to deliver impactful results and exceed expectations.
                  </h2>

                  <h2>
                  In every role, I’ve sought opportunities to make a tangible difference. 
                  During my time at Broadridge, I contributed to developing a dark pool tracker
                  that optimized performance by streamlining data aggregation and analysis, 
                  enabling clients to gain real-time insights into trading activity and improve confidence in decision-making. 
                  Additionally, at Johnson & Johnson, I spearheaded the creation of a new design system in React JS, 
                  standardizing and programming UI components, ultimately improving the consistency and scalability of their digital products.
                  Through my leadership in Rutgers' 
                  Blueprint club, I facilitated workshops and mentorship programs, 
                  empowering younger students to pursue careers in technology and building a strong community of support. 
                  </h2>

                  <h2>
                  My technical projects, such as my game development explorations, 
                  have demonstrated my ability to apply technical skills like ReactJS, C#, 
                  and NextJS to real-world problems. I’ve also shared my knowledge as a teacher, 
                  guiding over 120 students in mastering core computer science principles and inspiring 
                  the next generation of programmers.
                  </h2>

                  <h2>
                  While my technical experiences are diverse, I deeply value opportunities 
                  to broaden my perspective by engaging with global communities and exploring 
                  emerging technologies. I am eager to continue leveraging my software development 
                  expertise, project management skills, and creative problem-solving to address complex 
                  challenges and create innovative solutions that improve lives.
                  </h2>

                  {!showMore && (
                    <div className="bg-gradient-to-t from-dark-purple-300 via-dark-purple-200 via-dark-purple-100 to-transparent absolute -bottom-6 h-10 w-full" />
                  )}
                </div>

                {!showMore && (
                  <div className="flex flex-col justify-end bg-gradient-to-t from-dark-purple-300 to-transparent md:px-48  absolute left-0 w-full h-28 -bottom-8">
                    <div
                      onClick={() => setShowMore(!showMore)}
                      className="mt-3 py-3 border border-accent-color w-full rounded-full md:w-2/3 lg:w-2/5 bg-dark-purple-200 flex items-center justify-center hover:bg-[#322C48] gap-x-2 cursor-pointer"
                    >
                      <h2>Show More</h2>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 9L12 15L6 9" stroke="#C48DF6" />
                      </svg>
                    </div>

                    <div className="border borber-b border-[0.05rem] border-accent-text border-opacity-50 w-full mt-3" />
                  </div>
                )}
              </div>
            )}
          </div>

          {displayQuery !== "why-hire-venora" && (
            <div className="hidden w-1/3 p-2 h-[36rem] border-[0.05rem] border-white border-opacity-30 shadow-xl rounded-lg md:flex flex-col gap-y-3 ">
              <img
                src={
                  displayQuery == "life"
                    ? "search-img/life.jpeg"
                    : "https://github-readme-stats.vercel.app/api/top-langs/?username=venoraf&layout=donut&theme=radical"

                }
                alt="venoraf"
                className="w-full h-[19rem] rounded-t-lg"
              />

              {(displayQuery == "venoras-projects" && (
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      learning
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {learning.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      languages
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {languages.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      Frameworks & Libraries
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {technologies.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )) || (
                <div className="flex flex-col gap-y-3 p-2">
                  <h2 className="text-xl">"Lead a life worth telling"</h2>
                  <h2 className="opacity-70 text-lg">
                    This is one of my favourite quotes of all times as it
                    continually motivates me to seek out unqiue, spontaneous
                    experiences to increase my wordly exposure.
                  </h2>
                  <h2 className="opacity-70 text-lg">
                    The following is an archive of memorable experiences where I
                    leave my comfort zone to experience something new.
                  </h2>
                </div>
              )}
            </div>
          )}
        </div>

        {isOpen && <SearchItemOpen data={selectedSearch} />}
      </div>

      {displayQuery == "why-hire-venora" && !showMore && (
        <div className="pl-10 md:pl-48 pt-16 flex flex-col gap-y-2">
          <h2 className="text-sm">
            Your search - <span className="font-bold">Why Hire Venora?</span> -
            did not match any documents
          </h2>
          <h2 className="text-sm">Suggestions:</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Did you mean to search "Venora Has Been Hired!"?
            </li>
            <li>Contact Venora (venora10@gmail.com) to learn more!</li>
          </ul>
        </div>
      )}
    </div>
  );
}