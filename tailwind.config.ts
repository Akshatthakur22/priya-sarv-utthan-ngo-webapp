import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Nunito", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        // Keep existing brand for backward compatibility
        brand: {
          DEFAULT: "#0f766e",
          light: "#14b8a6",
          dark: "#0a4f49"
        },

        // Semantic design tokens (warm, hopeful NGO palette)
        // Primary: inviting amber for CTAs
        primary: {
          DEFAULT: "#F59E0B", // amber-500
          light: "#FDE68A",   // amber-200
          dark: "#D97706"     // amber-600
        },

        // Accents: coral & peach for friendly highlights
        accent: {
          coral: {
            DEFAULT: "#FF7F6A",
            light: "#FFD1C7",
            dark: "#E26754"
          },
          peach: {
            DEFAULT: "#F9D6BF",
            light: "#FFF1E6",
            dark: "#E7BFA5"
          }
        },

        // Support tones: gentle green (growth/trust) and soft blue (secondary)
        support: {
          green: {
            DEFAULT: "#22C55E", // green-500
            light: "#86EFAC",   // green-300
            dark: "#16A34A"     // green-600
          },
          blue: {
            DEFAULT: "#93C5FD", // blue-300
            light: "#DBEAFE",   // blue-100
            dark: "#60A5FA"     // blue-400
          }
        },

        // Surfaces: cream and off-white backgrounds to avoid stark white
        surface: {
          cream: "#FFFBEB",   // amber-50
          offwhite: "#FFF7ED", // orange-50
          paper: "#FDFCF7"
        },

        // Neutrals: warmer text and muted tones for readability
        neutral: {
          ink: "#0F172A",   // slate-900-ish
          body: "#1F2937",  // slate-800-ish
          muted: "#64748B"  // slate-500/600
        }
      }
    }
  },
  plugins: []
};

export default config;
