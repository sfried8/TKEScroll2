// Configuration for your app
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = function (ctx) {
  return {
    // app plugins (/src/boot)
    boot: ['customComponents', 'routerAuthentication', 'gtm-boot'],
    css: ['app.styl'],
    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      chainWebpack(chain) {
        chain
          .plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QBtn',
        'QDrawer',
        'QHeader',
        'QIcon',
        'QInput',
        'QItem',
        'QItemLabel',
        'QItemSection',
        'QLayout',
        'QList',
        'QMenu',
        'QPage',
        'QPageContainer',
        'QPageScroller',
        'QPageSticky',
        'QSelect',
        'QSeparator',
        'QTab',
        'QTabPanel',
        'QTabPanels',
        'QTabs',
        'QToggle',
        'QToolbar',
        'QToolbarTitle',
      ],
      directives: ['Ripple', 'TouchPan'],
      // Quasar plugins
      plugins: ['Notify', 'LocalStorage', 'Loading', 'Dialog'],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // lang: 'de' // Quasar language
      config:
      {
        brand: {
          primary: "#AD2624",
          secondary: "#26A69A",
          accent: "#555",
          neutral: "#E0E1E2",
          positive: "#21BA45",
          negative: "#DB2828",
          info: "#31CCEC",
          warning: "#F2C037",
        }
      }
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false,
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: 'TKE Scroll',
        short_name: 'TKE Scroll',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#AD2624',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      },
    },
  };
};
