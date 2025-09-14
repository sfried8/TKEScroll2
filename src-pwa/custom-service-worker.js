


import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'



self.skipWaiting()
clientsClaim()



// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)



cleanupOutdatedCaches()



// Non-SSR fallbacks to index.html
// Production SSR fallbacks to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
    registerRoute(
        new NavigationRoute(
            createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
            { denylist: [new RegExp(process.env.PWA_SERVICE_WORKER_REGEX), /workbox-(.)*\.js$/] }
        )
    )
}