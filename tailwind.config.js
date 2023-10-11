/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        secondary: "#B397FD",
        third: "#722796",
        bar: "#20223780",
        gray: "#d3d3d3",
        contrast: "#EDB90C",
        contrastblack: "#293556",
        bgcontrastpurple: "#440099",
      },
      boxShadow: {
        "3xl": "2px 2px 12px 0 rgba(0, 0, 0, 0.58)",
      },
    },
  },
  plugins: [],
};
