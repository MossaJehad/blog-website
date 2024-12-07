import type {Config} from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";


const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "475px",
            },
            colors: {
                primary: {
                    "100": "#E3F2FD", // Light Sky Blue (for soft backgrounds)
                    DEFAULT: "#1565C0", // Deep Sky Blue (main branding color for buttons, links, and highlights)
                },
                secondary: {
                    "100": "#FFFDE7", // Light Pastel Yellow (for subtle highlights)
                    DEFAULT: "#F9A825", // Golden Yellow (for call-to-actions or important elements)
                },
                black: {
                    "100": "#4B5563", // Cool Gray (muted text or secondary content)
                    "200": "#1F2937", // Deep Charcoal Gray (main text color)
                    "300": "#9CA3AF", // Light Gray (subtle text or UI elements)
                    DEFAULT: "#000000", // Black
                },
                white: {
                    "100": "#F1F5F9", // Off-White (for soft backgrounds)
                    DEFAULT: "#FFFFFF", // Pure White
                },
                accent: {
                    "100": "#D1FAE5", // Mint Green (for hover effects or subtle accents)
                    DEFAULT: "#10B981", // Vibrant Green (for success messages or secondary buttons)
                },
                error: {
                    DEFAULT: "#EF4444", // Bright Red (for errors or warnings)
                },
                background: {
                    light: "#F9FAFB", // Light Grayish White (overall background)
                    dark: "#111827", // Deep Navy (for dark mode backgrounds)
                },
            },
            
            
            fontFamily: {
                "work-sans": ["var(--font-work-sans)"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                100: "2px 2px 0px 0px rgb(0, 0, 0)",
                200: "2px 2px 0px 2px rgb(0, 0, 0)",
                300: "2px 2px 0px 2px rgb(20, 50, 200)",
            },
        },
    },
    plugins: [animate, typography]
};

export default config;