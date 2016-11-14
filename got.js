var characters = ["Aemon_Targaryen","Aerys_II_Targaryen","Arya_Stark","Benjen_Stark","Brandon_Stark","Bran_Stark","Brienne_of_Tarth","Catelyn_Stark","Cersei_Lannister","Daenerys_Targaryen", "Drogo","Eddar_Stark","Jaime_Lannister","Joanna_Lannister","Joffrey_Baratheon","Jon_Snow","Loras_Tyrell","Lyanna_Stark","Mace_Tyrell","Margaery_Tyrell","Melisandre","Myrcella_Baratheon","Olenna_Tyrell","Ramsay_Bolton","Renly_Baratheon","Rhaegar_Targaryen","Rhaenys_Targaryen","Rickard_Stark","Rickon_Stark","Robert_Baratheon","Rob_Stark","Sansa_Stark","Shireen_Baratheon","Stannis_Baratheon","Tommen_Baratheon","Tyrion_Lannister","Tywin_Lannister","Viserys_Targaryen"]

function drawMap() {
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
		minZoom: mapMinZoom,
		maxZoom: mapMaxZoom,
		bounds: mapBounds,
		attribution: 'Rendered with <a href="http://www.maptiler.com/">MapTiler</a>',
		noWrap: true,
		tms: false
	}).addTo(map);
	
	var xmlhttp = new XMLHttpRequest();
	var markers = L.markerClusterGroup();
	var i;
	for (i = 0; i < characters.length; i++) {
		xmlhttp.open("GET", "info/rdf/" + characters[i] + ".rdf", false);
		xmlhttp.send();
		xmlDoc = xmlhttp.responseXML;
		var ubicacion = xmlDoc.getElementsByTagName("based_near")[0];
		
		var img = atributo(xmlDoc.getElementsByTagName("img")[0], "resource").value;

		var lat = atributo(ubicacion, "lat").value;
		var lon = atributo(ubicacion, "long").value;
		markers.addLayer(L.marker([lat, lon]).bindPopup("<img src=" + img  +" width='50' height='70'>"
			+ "</p><a href=\"http://localhost:8080/game-of-thrones/info?character=" + characters[i] + "\">" + characters[i].replace("_", " ") + "</a>"));
	}
	map.addLayer(markers);
}

function atributo(nodo, nombre){
	var atributos = nodo.attributes;
	var name = "";
	for (i=0; i < atributos.length; i++){
		name = atributos[i].name.substring(atributos[i].name.indexOf(":") + 1);	
		if (name == nombre)
			return atributos[i];
	}
	return "";
}