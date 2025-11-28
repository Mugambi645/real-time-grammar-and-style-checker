/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a8a' },
        error: { 500: '#ef4444', 600: '#dc2626' },
        success: { 500: '#10b981' },
      },
    },
  },
  plugins: [],
}

