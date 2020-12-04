module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'Sans-serif'],
      'mono': ['Major Mono Display', 'monospace']
    },
    extend: {
      colors: {
        "main-color": "#00eeff",
        "back": "#0e111f"
      }
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    width: ['responsive', 'hover', 'focus', 'group-hover'],
    padding: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
