/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./resources/**/*.{js,jsx,ts,tsx,vue}",
      "./resources/**/*.blade.php",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#3E5F44",
          secondary: "#6C8C73",
          third: "#BCA88D",
          background: "#F3F5F2",
          textPrimary: "#1E1E1E",
          textSecondary: "#5C6D5D",
        },
      },
    },
    plugins: [],
  };
  