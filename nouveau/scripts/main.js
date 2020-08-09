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

function evenementScrolling() {

	const date = new Date
	const table = document.body.querySelector('table')
	const tdWidth = table.scrollWidth / 12
	const toScroll = tdWidth * (date.getMonth() + 1)

	table.scroll(toScroll, 0)
}

function parallax() {

	const footer = document.querySelector('footer');
	const footerwrap = footer.querySelector('.footerwrap');

	document.body.onscroll = function() {

		let scroll = window.scrollY;
		let topPixel = footer.offsetTop - footer.offsetHeight

		// if (scroll < accueil.parentElement.offsetHeight) {
		// 	accueil.style.transform = `translateY(${(scroll / 2)}px)`
		// }



		//arrive 2 fois au dessus du footer
			//aligne le wrap a 0,5x sa vitesse de scroll

		if (scroll > topPixel - footer.offsetHeight * 2) {
			footerwrap.style.transform = `translateY(-${(topPixel - scroll) / 2}px)`
		}
	}
}


//pas fini
function displaySections() {

	// const as = document.getElementsByClassName('link');
	// const sections = document.getElementsByTagName('section');


	// as[0].onclick = function() {

	// 	document.getElementById('saf').scrollIntoView({ 
	// 		behavior: 'smooth' 
	// 	});

	// 	sections[0].style.display = "block"
	// 	sections[1].style.display = "none"
	// 	sections[2].style.display = "none"
	// }
}



function changeVitrine(name) {

	const data = {
		muesli: {
			imgs: ["", "", "", ""],
			title: "Müesli",
			desc: "Gourmand et nourrissant, cet exfoliant aux fruits secs au léger parfum d'orange est enrichi au beurre de karité hydratant.",
			compo: "huile d'olive, huile de coco, beurre de karité, huile de tournesol partiellement saponifiés, eau, glycérine, amandes, flocons d'avoine, baies de goji, huiles essentielles d'orange et de sauge sclarée"
		},
		fanny: {
			imgs: ["", "", "", ""],
			title: "Fanny",
			desc: "Tout en douceur avec son macérât de calendula apaisant et son discret parfum de lavande. Pétales de calendula du jardin.",
			compo: "huile d'olive, huile de coco, beurre de karité, huile de tournesol partiellement saponifiés, eau, glycérine, macérât de calendula, huiles essentielles de lavandin et de litsée"
		},
		delice: {
			imgs: ["", "", "", ""],
			title: "Délice",
			desc: "5 huiles végétales, de la glycérine, du cacao, de l'eau et c'est tout ! Délice ne contient pas d'huiles essentielles. Hypoallergénique.",
			compo: "huile d'olive, huile de coco, beurre de karité, huile de tournesol partiellement saponifiés, eau, glycérine, beurre de cacao"
		},
		thecitron: {
			imgs: ["", "", "", ""],
			title: "Thé citron",
			desc: "Le savon shampoing au parfum vitaminé ! Enrichi à l'huile de jojoba et à l'argile ghassoul, il nettoie délicatement votre peau et offre vigueur et brillance à vos cheveux. Surgras 5%",
			compo: "huile d'olive, huile de coco, huile de ricin partiellement saponifiés, eau, glycérine, huile de jojoba, argile ghassoul, huiles essentielles de romarin et de litsée"
		},
		theromarin: {
			imgs: ["", "", "", ""],
			title: "Thé romarin",
			desc: "Comme son frère citronné, Thé romarin est enrichi à l'huile de jojoba et à l'argile ghassoul. Son parfum vif et frais promet quelques shampoings stimulants ! Surgras 5%",
			compo: "huile d'olive, huile de coco, huile de ricin, beurre de karité partiellement saponifiés, huile de ricin partiellement saponifiés, eau, glycérine, huile de jojoba, argile ghassoul, huile essentielle de romarin"
		},
		cesar: {
			imgs: ["", "", "", ""],
			title: "César",
			desc: "Nettoyant et dégraissant toutes surfaces, César est très apprécié pour faire la vaisselle, nettoyer la cuisinière et faire briller la robinetterie. Ce savon naturellement glycériné est idéal pour faire la lessive à la main et ses qualités détachantes préparent efficacement le linge avant son passage dans la machine à laver.",
			compo: "huile d'olive, huile de coco saponifiées, eau, glycérine, ...c'est tout !"
		}
	}

	const toDisplay = id('savonToDisplay')
	const title = toDisplay.querySelector('h3')
	const desc = toDisplay.querySelector('.desc')
	const compo = toDisplay.querySelector('.compo')

	console.log(data[name])

	title.innerText = data[name].title
	desc.innerText = data[name].desc
	compo.innerText = "Composition: " + data[name].compo
}












window.onload = function() {
	
	id("mail").innerText = window.atob("c2F2b25uZXJpZWxhY3VyaWV1c2VAZ21haWwuY29t");
	//if (!id('olscript')) map()
	//evenementScrolling()
	fabricationScroll()
	parallax()
	displaySections()



	const vitrine = document.getElementsByClassName('vitrine')[0];
	const vitrineOverlay = vitrine.querySelector('.overlay');
	const savons = document.body.querySelectorAll('.savon');

	savons.forEach(item => {

		item.onmouseup = function(e) {

			vitrineOverlay.style.top = (e.clientY - 100) + "px"
			vitrineOverlay.style.left = (e.clientX - 100) + "px"
			vitrine.className = "vitrine active"
			changeVitrine(item.id)
		}
	})
	
	vitrine.querySelector('button').onclick = function() {
		vitrine.className = 'vitrine'
	}


	const strip = document.getElementsByClassName('strip')[0]
	const stripContent = strip.querySelectorAll('div')

	stripContent.forEach(item => {
		item.onclick = function() {

			if (this.className === "active") {
				this.className = ""
			} else {
				stripContent.forEach(e => {e.className = ""})
				this.className = "active"
			}
		}
	})
}