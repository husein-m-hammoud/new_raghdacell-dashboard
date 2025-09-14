/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Pink: "#A2081F",
                // Purple: "#61396E",
                Pink: "var(--primary-color)",
                Purple: "var(--secondary-color)",
            },
            zIndex: {
                999: "999",
            },
        },
    },
    plugins: [],
};