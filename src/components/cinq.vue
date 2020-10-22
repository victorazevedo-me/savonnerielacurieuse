<template>
	<section id="contenu-page" class="page cinq">
		<div class="contact-infos">
			<div>
				<div class="semi-titre">
					<div class="ballon"></div>
					<h2>Contact</h2>
				</div>

				<div class="infos">
					<p>Valérie Cartailler</p>
					<p>{{ contact.adresse[0] }}</p>
					<p>{{ contact.adresse[1] }}, {{ contact.adresse[2] }}</p>

					<br />

					<p>{{ contact.email }}</p>
					<p>{{ contact.telephone }}</p>

					<div class="gelule"></div>
				</div>
			</div>

			<div id="map"></div>
		</div>

		<div class="faq">
			<div class="semi-titre">
				<div class="ballon"></div>
				<h2>Foire aux Questions</h2>
			</div>

			<div class="faq-liste">
				<div v-for="(bloc, i) in faqs" :key="i">
					<h3>{{ bloc.question }}</h3>
					<p>{{ bloc.reponse }}</p>
				</div>
			</div>
		</div>

		<VueFooter />
	</section>
</template>

<script lang="ts">
import Vue from 'vue'
import VueFooter from './footer.vue'
import json from '../scripts/database'
import Leaflet from 'leaflet'

// import ScrollReveal from 'scrollreveal'
// import SimpleParallax from 'simple-parallax-js'

export default Vue.extend({
	template: '<VueFooter/>',
	components: { VueFooter },

	data: () => ({
		contact: json.contact,
		faqs: json.faq
	}),

	mounted: () => {
		const parallaxOptions = {
			scale: 1.5,
			transition: 'linear'
		}

		document.querySelectorAll('.faq-liste > div')!.forEach((div, i) => {
			if (i % 2) {
				//marche pas
				//new SimpleParallax(div, parallaxOptions)
			}
		})

		let mymap = Leaflet.map('map').setView([45.785593, 3.59944], 16)

		Leaflet.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
			{
				attribution: '',
				maxZoom: 20,
				tileSize: 512,
				zoomOffset: -1,
				id: 'fugiquafos/ckgkje6ab06v61amqvp5f6l0q',
				accessToken:
					'pk.eyJ1IjoiZnVnaXF1YWZvcyIsImEiOiJja2draXZ0dWgwN3V4MnRwY2p5dm14cGNtIn0.0YVwfkWa_dJMOzib6PhG8w'
			}
		).addTo(mymap)

		let marker = Leaflet.marker([45.785593, 3.59944]).addTo(mymap)
	}
})
</script>
<style lang="scss">
@import url('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');
</style>
