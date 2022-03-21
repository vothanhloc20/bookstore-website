import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: 'true',
  target: 'server',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  head: {
    titleTemplate: '%s - BOOKSKY STORE',
    title: 'BOOKSKY STORE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'description',
        content:
          'It is a long established fact that a reader will be distracted by the readable content It is a long established fact that a reader will be distracted by the readable content.',
      },
      {
        name: 'keywords',
        content: 'booksky, authors, category',
      },
      {
        property: 'og:image',
        content: 'https://bookstore-website-five.vercel.app/bookstore.jpg',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://bookstore-website-five.vercel.app/bookstore.jpg',
      },
      { property: 'og:type', content: 'website' },
      {
        nae: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/api.js',
    },
    {
      src: '~/plugins/mask.js',
      ssr: true,
    },
    {
      src: '~/plugins/sweet-alert.js',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
  },

  proxy: {
    '/api': {
      target:
        'https://bookstore-website-26e92-default-rtdb.asia-southeast1.firebasedatabase.app/',
      pathRewrite: {
        '^/api': '',
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Quicksand',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
