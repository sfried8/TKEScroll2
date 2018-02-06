"use strict";
var precacheConfig = [
    [
      "app.d0019acf93cd55b13e03e0a56847c992.css",
      "d383c1e54537de89e4b212ab7ba67b6c"
    ],
    ["index.html", "c9add31dc3d861d5c60353f90168315e"],
    ["js/app.js", "952e10ce722e802e142870ad895b0671"],
    ["js/manifest.js", "b65a835c53d55b7b88efde515cfbd010"],
    ["js/vendor.js", "7b9671c80f959e1141674299dcd72aad"],
    ["statics/icons/favicon.png", "da2b422e2895b9b9c1782a71b6be9d63"],
    ["statics/manifest.json", "ae10664f4d3a921479e6d4868ae0cdf5"],
    ["statics/quasar-logo.png", "3020c8ac2c2872dec7741e5948520093"]
  ],
  cacheName =
    "sw-precache-v3-my-quasar-app-" +
    (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, n) {
    var t = new URL(e);
    return "/" === t.pathname.slice(-1) && (t.pathname += n), t.toString();
  },
  cleanResponse = function(e) {
    return e.redirected
      ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(n) {
          return new Response(n, {
            headers: e.headers,
            status: e.status,
            statusText: e.statusText
          });
        })
      : Promise.resolve(e);
  },
  createCacheKey = function(e, n, t, r) {
    var a = new URL(e);
    return (
      (r && a.pathname.match(r)) ||
        (a.search +=
          (a.search ? "&" : "") +
          encodeURIComponent(n) +
          "=" +
          encodeURIComponent(t)),
      a.toString()
    );
  },
  isPathWhitelisted = function(e, n) {
    if (0 === e.length) return !0;
    var t = new URL(n).pathname;
    return e.some(function(e) {
      return t.match(e);
    });
  },
  stripIgnoredUrlParameters = function(e, n) {
    var t = new URL(e);
    return (
      (t.hash = ""),
      (t.search = t.search
        .slice(1)
        .split("&")
        .map(function(e) {
          return e.split("=");
        })
        .filter(function(e) {
          return n.every(function(n) {
            return !n.test(e[0]);
          });
        })
        .map(function(e) {
          return e.join("=");
        })
        .join("&")),
      t.toString()
    );
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var n = e[0],
        t = e[1],
        r = new URL(n, self.location),
        a = createCacheKey(r, hashParamName, t, !1);
      return [r.toString(), a];
    })
  );

function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url;
      });
    })
    .then(function(e) {
      return new Set(e);
    });
}
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(e) {
        return setOfCachedUrls(e).then(function(n) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(t) {
              if (!n.has(t)) {
                var r = new Request(t, {
                  credentials: "same-origin"
                });
                return fetch(r).then(function(n) {
                  if (!n.ok)
                    throw new Error(
                      "Request for " +
                        t +
                        " returned a response with status " +
                        n.status
                    );
                  return cleanResponse(n).then(function(n) {
                    return e.put(t, n);
                  });
                });
              }
            })
          );
        });
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
}),
  self.addEventListener("activate", function(e) {
    var n = new Set(urlsToCacheKeys.values());
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(e) {
          return e.keys().then(function(t) {
            return Promise.all(
              t.map(function(t) {
                if (!n.has(t.url)) return e.delete(t);
              })
            );
          });
        })
        .then(function() {
          return self.clients.claim();
        })
    );
  }),
  self.addEventListener("fetch", function(e) {
    if ("GET" === e.request.method) {
      var n,
        t = stripIgnoredUrlParameters(
          e.request.url,
          ignoreUrlParametersMatching
        ),
        r = "index.html";
      (n = urlsToCacheKeys.has(t)) ||
        ((t = addDirectoryIndex(t, r)), (n = urlsToCacheKeys.has(t)));
      0,
        n &&
          e.respondWith(
            caches
              .open(cacheName)
              .then(function(e) {
                return e.match(urlsToCacheKeys.get(t)).then(function(e) {
                  if (e) return e;
                  throw Error(
                    "The cached response that was expected is missing."
                  );
                });
              })
              .catch(function(n) {
                return (
                  console.warn(
                    'Couldn\'t serve response for "%s" from cache: %O',
                    e.request.url,
                    n
                  ),
                  fetch(e.request)
                );
              })
          );
    }
  });
