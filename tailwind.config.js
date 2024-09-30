/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#BEF8FF",
        midLightBlue: "#7EB0CC",
        darkBlue: "#37657F",
        subtleBlue: "#5F757F",

        lavender: {
          DEFAULT: "#E6E6FA", // You can adjust this to the specific lavender shade you need
          dark: "#CBC3E3", // Darker shade
          light: "#F4F3FB", // Lighter shade
        },
      },
      fontFamily: {
        sans: ["Open Sauce", "Lato", "sans-serif"], // Setting typography
        heading: ['"Open Sans"', "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      }),
      boxShadow: {
        "text-sm": "1px 1px 2px rgba(0, 0, 0, 0.5)",
        "text-md": "2px 2px 4px rgba(0, 0, 0, 0.6)",
        "text-lg": "3px 3px 6px rgba(0, 0, 0, 0.7)",
        "text-xl": "4px 4px 8px rgba(0, 0, 0, 0.8)",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // New scrolling keyframes
        scrollUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "10%": { transform: "translateY(0)", opacity: "1" },
          "90%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        //
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        gradient: "animatedgradient 6s ease infinite alternate",
        // New scrolling animation
        scrollUp: "scrollUp 6s ease-in-out infinite",
      },
      backgroundSize: {
        "200%": "200%",
      },
    },
  },
  plugins: [],
};
