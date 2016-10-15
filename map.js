var layer;
function init() {
	var mapMinZoom = 0;
	var mapMaxZoom = 5;
	var map = L.map('map', {
		maxZoom: mapMaxZoom,
		minZoom: mapMinZoom,
		crs: L.CRS.Simple
	}).setView([0, 0], mapMaxZoom);

	var mapBounds = new L.LatLngBounds(
		map.unproject([0, 3840], mapMaxZoom),
		map.unproject([5888, 0], mapMaxZoom));
		
	map.fitBounds(mapBounds);
	layer = L.tileLayer('map/{z}/{x}/{y}.png', {
		minZoom: mapMinZoom, maxZoom: mapMaxZoom,
		bounds: mapBounds,
		attribution: 'Rendered with <a href="http://www.maptiler.com/">MapTiler</a>',
		noWrap: true,
		tms: false
	}).addTo(map);
	
	var marker = L.marker([-64.0625, 48.34375]).addTo(map);
	marker.bindPopup("Welcome to King's Landing!.").openPopup();
	
	var popup = L.popup();
	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}
	map.on('click', onMapClick);
}