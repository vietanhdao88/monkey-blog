export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
        secondFont: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#2EBAC1",
        grayDark: "#E7ECF3",
        purple: "#3A1097",
        additon: "#F3EDFF",
        grayScale: "#6B6B6B",
        grayScale2: "#B1B5C3",
      },
      borderRadius: {
        inherit: "inherit",
      },
    },
  },
  plugins: [],
};
