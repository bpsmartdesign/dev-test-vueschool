import prose from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [prose],
  theme: {
    container: {
      center: true,
      size: {
        sm: "480px",
        md: "640px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1280px",
      },
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
};
