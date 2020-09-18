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
				src: 'images/marker.png'
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
				zoom: 13,
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

function main() {

	//affiche la carte
	if (!id('olscript')) map()
}

window.onload = main;