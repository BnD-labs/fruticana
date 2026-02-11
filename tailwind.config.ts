import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: "#ff6b35",
                    pink: "#f72585",
                    purple: "#7209b7",
                },
            },
            fontFamily: {
                outfit: ["var(--font-outfit)", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in",
                "slide-up": "slideUp 0.6s ease-out",
                glow: "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(255, 107, 53, 0.5)" },
                    "100%": { boxShadow: "0 0 20px rgba(255, 107, 53, 0.8)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
