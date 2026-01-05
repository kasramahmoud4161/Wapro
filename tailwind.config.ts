import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // اتصال متغیرهای CSS به کلاس‌های Tailwind
        border: "var(--glass-border)",
        input: "var(--glass-bg)",
        ring: "var(--primary-green)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary-green)",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#262626",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#a3a3a3",
        },
        accent: {
          DEFAULT: "var(--glass-bg)",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // انیمیشن‌های سفارشی که در CSS تعریف کردیم، اینجا هم معرفی می‌کنیم
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite linear",
        "tilt": "tilt 5s infinite linear",
      },
    },
  },
  plugins: [],
};
export default config;