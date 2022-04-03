export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Coherent Brain Music',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
    },
    htmlAttrs: {
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/custom.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],
  target: 'static',


  tailwindcss: {
    jit: true,
    // add '~tailwind.config` alias
    exposeConfig: true,
  },

  auth: {
    plugins: [ '~/plugins/auth.js' ],
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.BASE_URL || 'http://localhost',
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
    credentials: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Coherent Brain Music',
      short_name: 'Coherent Brain Music',
      lang: 'en',
      background_color: '#1f2937',
      theme_color: '#5045e4'
    },
    meta: {
      name: 'Coherent Brain Music',
      author: 'Maciej Loch',
      mobileAppIOS: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
