const CACHE_NAME ='haruy-cache-v8';
const ASCETS =[
    './',
    './index.html',
    'manifest.json',
    './img/logo.png',
    './img/logo2.png',
    './img/logo512.png', 
    './img/banner.png',
    './img/whatsapp.png'
];

//instala o sevidor woker e coloca os arquivosno Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
    console.log('Doces no cache!🧁');
        return cache.addAll(ASCETS);
})
);
});

//faz as requisiçãoes olharem para o cache primeiro
self.addEventListener('fetch', (event) => {
    event.respondWhith(
        caches.match(event.request).then((response)=> {
            return response || fetch(event.request);
        })
    );
});

//Remove caches antigos quando atualizar
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});