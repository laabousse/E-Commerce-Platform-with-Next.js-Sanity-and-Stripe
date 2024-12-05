/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      animation: {
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-subtle":
          "pulse-subtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glitch: "glitch 2s infinite alternate",
        "gradient-x": "gradient-x 15s ease infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        glitch: {
          "0%": {
            transform: "translate(0)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          "5%": {
            transform: "translate(-5px, -5px)",
            clipPath: "polygon(0 20%, 100% 20%, 100% 100%, 0% 100%)",
          },
          "10%": {
            transform: "translate(-10px, 5px)",
            clipPath: "polygon(0 40%, 100% 40%, 100% 60%, 0% 60%)",
          },
          "15%": {
            transform: "translate(5px, -10px)",
            clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0% 80%)",
          },
          "20%": {
            transform: "translate(-10px, 10px)",
            clipPath: "polygon(0 80%, 100% 80%, 100% 100%, 0% 100%)",
          },
          "25%": { transform: "translate(10px, -5px)" },
          "30%": { transform: "translate(-10px, 0px)" },
          "35%": { transform: "translate(0)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  variants: {
    extend: {
      animation: ["motion-reduce"],
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
