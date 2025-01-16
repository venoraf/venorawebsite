/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": { 100: "#ab5c74", 200: "#211E2E", 300: "#6e142f" },
        "accent-text": "#fbf2e0",
        "accent-color": "#9E5D82",
        "search-blue": "#b9cff0",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        ropaSans: ["var(--font-ropa-sans)", "sans-serif"],
      },
      backgroundImage: {
        'custom-gradient': "radial-gradient(circle, #eda8c6 0%, rgba(131,90,150,1) 100%)",
        'soft-peach-pink': "linear-gradient(90deg, rgba(255,200,180,1) 0%, #ffa0aa 100%)",
      },
    },
  },
  plugins: [],
};
