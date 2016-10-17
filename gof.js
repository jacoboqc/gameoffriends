function init() {
	var layer;
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

	foafNS = "http://xmlns.com/foaf/0.1/";
	geoNS = "http://www.w3.org/2003/01/geo/wgs84_pos#";
	rdf = new RDF();
	rdf.getRDFURL("gof.rdf", callback);
	function callback() {
		groupName = rdf.Match(null, null, foafNS + "name", "House Lannister");
		lat = rdf.getSingleObject(null , groupName[0].subject, geoNS + "lat", null);
		lon = rdf.getSingleObject(null , groupName[0].subject, geoNS + "long", null);
		var marker = L.marker([lat, lon]).addTo(map);
		marker.bindPopup("Tyrion Lannister is here.");
	}
}