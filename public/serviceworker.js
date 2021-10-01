const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Opened cache");
			return cache.addAll(urlsToCache);
		})
	);
});

// Listen for requests
self.addEventListener("fetch", (event) => {
	event.respondWith(
		// Match all requests
		caches.match(event.request).then(() => {
			// Fetch the new requests. If it cannot fetch the data then we load the offline file
			return fetch(event.request).catch(() => caches.match("offline.html"));
		})
	);
});

// Activate the SW
self.addEventListener("activate", (event) => {
	// Used to remove older versions of cache and keeping only the latest version
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						// Delete older versions of cache
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
