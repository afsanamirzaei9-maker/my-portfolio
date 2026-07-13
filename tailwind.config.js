/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{html,js,ts,jsx,tsx}", // مسیر پوشه کدهای شما
//     "./*.html"              // فایل‌های HTML در ریشه پروژه
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // شناسایی تمام کامپوننت‌های ری‌اکت
  ],
  theme: {
    extend: {
      fontFamily: {
        // اگر تگ html دارای کلاس font-sans باشد، این ترکیب خودکار اعمال می‌شود
        sans: ['var(--font-custom)', 'IranYekan', 'Montserrat', 'sans-serif'],
      },

    },
  },
  plugins: [],
}

