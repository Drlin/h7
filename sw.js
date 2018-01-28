const cacheKey = new Date().toISOString()
const cacheWhitelist = [cacheKey]
const cacheFileList = global.serviceWorkerOption.assets

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheKey).then(function (cache) {
      return cache.addAll(cacheFileList);
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
        if (response) {
          return response
        }
        return fetch(event.request)
      }
    )
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // 删除缓存
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

