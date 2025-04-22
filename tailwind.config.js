/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'], 
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        russo: ['Russo One', 'sans-serif'],
        audiowide: ['Audiowide', 'sans-serif'],
        'press-start': ['Press Start 2P', 'cursive'],
        bangers: ['Bangers', 'cursive'],
        exo2: ['Exo 2', 'sans-serif'],
        zilla: ['Zilla Slab', 'serif'],
        sarpanch: ['Sarpanch', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
