export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vueant', ssr: true},
    { src: '@/plugins/vueelement', ssr: true},
  ],

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
    '@nuxtjs/auth',
    'nuxt-vuex-localstorage'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    //baseURL: 'http://localhost:9000/',
    baseURL: 'http://45.119.86.67:9000/',
  },
  auth: {
    plugins: ['~plugins/auth.js'],
    redirect: {
      login: '/dang-nhap',
      logout: '/dang-nhap',
      callback: '/',
      home: '/'
    },
    strategies: {
      local1: {
        _scheme: '~/customStragercy.js',
        endpoints: {
          login: {
            url: '/api/login',
            //url: 'http://45.119.86.67:10052/api/login',
            method: 'post',
            propertyName: 'result.token'
          },
          user: {
            url: '/api/info',
            //url: 'http://45.119.86.67:10052/api/info',
            method: 'get',
            propertyName: false
          }
        },
        // tokenRequired: true,
        // tokenType: '',
        // globalToken: true,
        // tokenName: 'Authorization'
      },
      facebook: {
        client_id: '125500524851715',
        userinfo_endpoint:
          'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      google: {
        client_id:
          '614868378782-960qbqauncc31815a67iv5a2f0btrrnk.apps.googleusercontent.com'
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
