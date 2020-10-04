const CACHE_NAME = 'firstpwa';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/menu.html',
	'/pages/restoran.html',
	'/pages/contact.html',
	'/css/materialize.min.css',
	'/css/materialize.css',
	'/css/style.css',
	'/js/materialize.min.js',
	'/img/baladojengkol.png',
	'/img/ikankuwebakarmadu.png',
	'/img/ikansiamsambalbawang.png',
	'/img/Rendang.png',
	'/img/Lamun Ombak.png',
	'/img/Garuda.png',
	'/img/Nasi Kapau.png',
	'/img/Sederhana.png',
	'/img/padang.png',
	'/path/to/icon.png',
	'/path/to/icon-192x192.png',
	'/manifest.json',
	'/firebaserc',
	'/firebase.json',
	'/js/nav.js',
	'/js/script.js',
	'https://fonts.googleapis.com/css?family=Roboto&display=swap',
	'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}

			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});
