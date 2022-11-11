const staticAsseets = [
    '.',
    'index.html',
    'main.js',
    'image/icon-72x72.png',
    'image/icon-128x128.png',
    'image/icon-192x192.png',
    'image/03f08527927e3d6161179c3a58458963_xl.jpg',
    'image/3cbfd1dd909dae37fa3d1b6248c2b520de7a46e9.jpg',
    'css/bootstrap.min.css',
    'js/bootstrap.bundle.min.js'
]
//При изменении данных нужно изменить номер версии на другую, например site-static-v4 и т.д
const staticChaceName = 'site-static-v8'

//install, load cach
self.addEventListener('install', async evt=>{
    const cache = await caches.open(staticChaceName)
    await cache.addAll(staticAsseets)
    console.log('install')
})

//activate
self.addEventListener('activate', evt=>{
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticChaceName)
                .map(key => caches.delete(key)));
        }


        )
    )
    console.log('activate')
})

//fetch
self.addEventListener('fetch', evt=>{
    evt.respondWith(caches.match(evt.request).then(cachedResponce =>{
        return cachedResponce || fetch(evt.request)
    }))
    console.log('fetch')
})