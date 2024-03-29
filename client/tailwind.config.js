/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens:{
'xs': '320px',
'sm': '640px',
'md': '768px',
'lg': '1024px',
'xl': '1280px',
    },
    extend: {
      gridTemplateColumns: {
        "auto-sm": "repeat(auto-fit,minmax(230px,1fr))",
        "auto-md": "repeat(auto-fit,minmax(300px,1fr))",
      },
      padding: {
        xs: "5px",
        sm: "10px",
        md: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
      gap: {
        xs: "1rem",
        sm: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "5rem",
      },
      boxShadow: {
        sm: " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        xl: "  rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        xxl: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      },
      borderColor: {
        light: "#cbd5e1",
        default: "#cbd5e1",
        dark: "#94a3b8",
      },
      borderWidth: {
        sm: "1px",
        md: "2px",
        lg: "3px",
        xl: "4px",
      },
      colors: {
        orange: {
          light: "#fb923c",
          dark: "#f97316",
        },
        black: {
          default: "#1e293b",
          dark: "#020617",
          light: "#475569",
        },
        gray: {
          default: "#9ca3af",
          dark: "#6b7280",
          light: "#d1d5db",
        },
        blue: {
          light: "#0ea5e9",
          dark: "#0891b2",
        },
        green: {
          light: "#22c55e",
          dark: "#059669",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
