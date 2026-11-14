import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { fontFamily: { sans: ["var(--font-inter)", "sans-serif"] }, colors: { paper: "#FAFAF7", sage: "#EEF3EF", deep: "#1F4E5A", terracotta: "#C97B5A", ink: "#1E2A2E" }, borderRadius: { card: "1.25rem" }, boxShadow: { soft: "0 16px 50px rgba(31,78,90,.08)" } } },
  plugins: [],
};
export default config;
