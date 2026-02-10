/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./App.{js,jsx,ts,tsx}" // חשוב אם יש לך קובץ כזה בשורש
    ],
    presets:[require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#030012',
                secondary: '#151312',
                light: {
                    100: '#D6C6FF',
                    200: '#A8B5DB',
                    300: '#9CA4AB',
                },
                dark:{
                    100: '#1a3d2f',
                    200:'#071b00',
                    300:'#074100'
                },
                accent: '#AB8BFF',
            }
        },
    },
    plugins: [],
}

