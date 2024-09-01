/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00598e', // Usado para elementos principales como encabezados, botones primarios, y enlaces.
        'secondary': '#0bb3a8', // Usado para acentos, botones secundarios, y elementos de éxito o confirmación.
        'lightGray': '#d3d3d3', // Usado para texto secundario, bordes de campos de formulario, y fondos de elementos secundarios.
        'darkGray': '#4f4f4f', // Usado para texto principal y elementos como iconografía secundaria.
      },
    },
  },
  plugins: [],
}
