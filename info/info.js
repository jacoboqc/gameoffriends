function init(){	

	var nombre_fichero = function () {
		return decodeURIComponent((new RegExp('[?|&]' + 'character' + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
	}();

	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","rdf/" + nombre_fichero + ".rdf", false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;

	var name=busca_nodo("firstName").textContent;
	var lastname=busca_nodo("lastName").textContent;
	var title=busca_nodo("title").textContent;
	var gender=busca_nodo("gender").textContent;
	var im=busca_nodo("img");
	var attr=atributo(im,"resource");
	var img=attr.value;
	var alias=busca_nodo("alias").textContent;
	var situation=busca_nodo("estado_sentimental").textContent;
	var color_pelo=busca_nodo("color_pelo").textContent;
	var estado_fisico=busca_nodo("estado_fisico").textContent;
	var causa_muerte="";
	var nombre_persona_responsable="";
	var apellido_persona_responsable="";
	var muerte=busca_nodo("muerte");
	if(muerte!=null){
		var causa_muerte=busca_hijo(muerte,"causa").textContent;
		var responsable=busca_hijo(muerte,"responsable");
		var persona_responsable=busca_hijo(responsable,"Persona");
		var nombre_persona_responsable=busca_hijo(persona_responsable,"firstName").textContent;
		var apellido_persona_responsable=busca_hijo(persona_responsable,"lastName").textContent;
	}
	var grupo=busca_nodo("grupo");
	var nombre_grupo=busca_hijo(grupo,"name").textContent;
	var ubicacion=busca_hijo(grupo,"ubicacion");
	var nombre_ubicacion=busca_hijo(ubicacion,"nombre").textContent;

	document.getElementById('name').innerHTML ="<p>" + "Name: " + name +" "+ lastname +"</p>";
	document.getElementById('title').innerHTML ="<p>" + "Title: " + title +  "</p>";
	document.getElementById('gender').innerHTML ="<p>" + "Genre: " + gender +  "</p>";
	document.getElementById('img').innerHTML ="<p>" + "<img src="+img+" width='500' height='700'>" +"</p>";
	document.getElementById('alias').innerHTML ="<p>" + "Also known as: " + alias +"</p>";
	document.getElementById('estado').innerHTML ="<p>" + "Spousal state: " + situation +  "</p>";
	document.getElementById('color_pelo').innerHTML ="<p>" + "Hair's color: " + color_pelo +  "</p>";
	document.getElementById('estado_fisico').innerHTML ="<p>" + "Status: " + estado_fisico +  "</p>";
	if(muerte!=null){
		document.getElementById('causa_muerte').innerHTML ="<p>" + "Death: " + causa_muerte +  "</p>";
		document.getElementById('nombre_responsable_muerte').innerHTML ="<p>" + "Name of the murderer: " + nombre_persona_responsable + " " +apellido_persona_responsable+"</p>";			
	}
	document.getElementById('nombre_grupo').innerHTML ="<p>" + "Name of the group: " + nombre_grupo +  "</p>";
	document.getElementById('ubicacion_grupo').innerHTML ="<p>" + "Name of the ubication: " + nombre_ubicacion +  "</p>";
}

function busca_nodo(nombre){
	return xmlDoc.getElementsByTagName(nombre)[0];
}

function busca_hijo(nodo_padre,nodo_hijo){
	var i=0;
	var hijos=nodo_padre.childNodes;		
	for(i=0;i<hijos.length;i++){
		if(nombre_nodo(hijos[i])==nodo_hijo)
			return hijos[i];
	}
	return "";
}

function nombre_nodo(nodo){
	var name_node=nodo.nodeName;
	var nombre=name_node.substring(name_node.indexOf(":")+1);
	return nombre;
}

function atributo(nodo,nombre){
	var atributos=nodo.attributes;
	var name="";
	for(i=0;i<atributos.length;i++){
		name=atributos[i].name.substring(atributos[i].name.indexOf(":")+1);	
		if(name==nombre)
			return atributos[i];
	}
	return "";
}