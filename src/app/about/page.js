import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col w-full md:flex-row-reverse h-full items-center gap-x-10 gap-y-10 justify-center pb-10 md:pb-0">
      {/* Text Section */}
      <div className="flex flex-col font-ropaSans w-4/5 md:w-2/5 lg:w-1/3 font-bold text-md text-white gap-y-4">
      <h3
          className="text-black-700 text-sm uppercase tracking-wide"
          style={{
            // fontFamily: "'Georgia', serif", // Match the font style
            fontWeight: 700, // Adjust to match the lighter serif look
          }}
        >
          Software Developer
        </h3>
        <h1 className="text-5xl font-extrabold text-white relative">
          Venora Furtado
          <span
            className="absolute inset-0 -z-10 text-black-500 opacity-10 font-bold text-8xl"
            style={{ top: "0", left: "-5%", transform: "translateY(-50%)" }}
          >
            V  E  N  O  R  A
          </span>
        </h1>
        <p className="mt-4">
          Hello!! Nice to meet you! :)
        </p>
        <p className="mt-4">
          My name is Venora Furtado and I study Computer Science with a minor
          in Music Technology and Psychology. I enjoy creating compelling user
          experiences using my knowledge in programming and web development.
          Blending both aesthetics and functionality - I focus on making the
          experience enjoyable.
        </p>
        <p className="mt-4">
          Besides web development, I'm enthusiastic about the advancements in
          AI, VR, and XR and their potential applications! On my off hours, I
          love gaming, analyzing fashion trends, playing chess, reading, making
          music, and cuddling with my cat.
        </p>
        <Link
          href="/search?q=venoras-projects"
          className="border border-[#eec2cf] flex items-center justify-center rounded-md p-4 mt-6 bg-[#59182c] hover:bg-[#eec2cf] text-white hover:text-white transition-all duration-300"
        >
          Discover My Projects
        </Link>
      </div>

      {/* Image Section */}
      <div className="flex md:flex-col-reverse items-center justify-start gap-x-2 md:gap-y-2">
        <div
          className="bg-no-repeat bg-contain w-132 h-132 md:w-96 md:h-24 bg-left"
          style={{ backgroundImage: `url("programming-ability.png")` }}
        />
        <div
          className="bg-no-repeat bg-cover w-128 h-128 md:w-96 md:h-96 bg-center"
          style={{ backgroundImage: `url("head-shot.png")` }}
        />
      </div>
    </div>
  );
}
