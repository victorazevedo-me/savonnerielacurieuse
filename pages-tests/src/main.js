//id shorthand
const id=(a)=>document.getElementById(a);

function map() {

	function displayMap() {

		id('mapText').style.opacity = "0";

		let iconFeature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform([3.59948, 45.78557], 'EPSG:4326', 'EPSG:3857')),
			name: 'Savonnerie La Curieuse'
		});
		let iconStyle = new ol.style.Style({
			image: new ol.style.Icon(({
				anchor: [0.5, 46],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				src: 'src/marker.png'
			}))
		});
		iconFeature.setStyle(iconStyle);
		let vectorSource = new ol.source.Vector({
			features: [iconFeature]
		});
		let vectorLayer = new ol.layer.Vector({
			source: vectorSource
		});
		let tpr = 3;
		let map = new ol.Map({
			layers: [new ol.layer.Tile({
				source: new ol.source.OSM()
			}), vectorLayer],
			target: 'map',
			controls: ol.control.defaults().extend([new ol.control.FullScreen()]),
			view: new ol.View({
				center: ol.proj.transform([3.59948, 45.78557], 'EPSG:4326', 'EPSG:3857'),
				tilePixelRatio: tpr,
				zoom: 12,
				minZoom: 2,
				maxZoom: 18
			})
		})
	}

	const head = document.getElementsByTagName('head')[0];

	//add openlayers script to head
	let olscript = document.createElement('script');
	olscript.src = 'https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/ol.js';
	olscript.id = "olscript";
	head.appendChild(olscript);

	document.getElementById('olscript').onload = displayMap;
}

function images() {

	//site imgs
	const imgs = document.getElementsByTagName("img");
	let datasrc;

	for (i of imgs) {

		datasrc = i.getAttribute("data-src");
		if (datasrc !== null) i.src = datasrc;
	}

	//site background images
	const banners = [{id: "saf", src: "images/categorie/fabrication.jpg"},
		{id: "savons", src: "images/categorie/suggestion.jpg"},
		{id: "ouTrouver", src: "images/categorie/stand.jpg"},
		{id: "contact", src: "images/categorie/volloreville.jpg"},
		{id: "apropos", src: "banniere_printemps_2.jpg"}];

	for (b of banners) {
		id(b.id).style.backgroundImage = `url(${b.src})`;
	}
}

function evenementScrolling() {

	const date = new Date
	const table = document.querySelector('table')
	const tdWidth = table.scrollWidth / 12
	const toScroll = tdWidth * (date.getMonth() + 1)

	table.scroll(toScroll, 0)
}

function main() {

	//on scroll les evenements
	evenementScrolling()

	//Une technique un peu fancy pour ajouter l'adresse email
	id("mail").innerText = window.atob("c2F2b25uZXJpZWxhY3VyaWV1c2VAZ21haWwuY29t");

	//affiche la carte
	if (!id('olscript')) map()

	//affiche les images
	images();
}

window.onload = main;

//google analytics
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)},ga.l=+new Date,ga("create","UA-XXXXX-Y","auto"),ga("send","pageview");
