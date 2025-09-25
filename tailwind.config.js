/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Adicionando nossa paleta de cores personalizada
    colors: {
        brand: {
            greenDark: '#2A5B46',
            greenLight: '#6AB187',
            blue: '#87CEEB',
            yellow: '#FFC857',
        }
    },// Adicionando nossa fonte personalizada
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'], // Define Nunito como a fonte padrão
      }
    },
  },
  plugins: [],
}