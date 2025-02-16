module.exports = {
  presets: [require("@spartan-ng/brain/hlm-tailwind-preset")],
  content: ["./src/**/*.{html,ts}", "./libs/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        customPrimary: "#006f72",
        customBackground: "#fff",
        customAccent: "#f97316",
        customSecondaryBackground: "#4f8a8b",
        customError: "#ef4444",
        customSuccess: "#10b981",
        customTextDarkest: "#333333", // Original color
        customTextLighter1: "#666666", // Slightly lighter
        customTextLighter2: "#808080", // Lighter version
        customTextLighter3: "#999999", // Very light gray
        customTextLighter4: "#b3b3b3", // Even lighter
        customTextLighter5: "#cccccc", // Almost light gray
        customTextLighter6: "#dcdcdc", // Almost light gray
      },
    },
  },
  plugins: [],
};
