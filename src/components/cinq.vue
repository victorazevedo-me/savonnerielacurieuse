<template>
	<section id="contenu-page" class="page cinq">
		<div class="contact-infos">
			<div>
				<div class="semi-titre">
					<div class="ballon"></div>
					<h2 id="contact">Contact</h2>
				</div>

				<div
					class="infos"
					@contextmenu.prevent="
						editing({ key: 0, item: contact, liste: contact })
					"
				>
					<h4>Adresse</h4>
					<p>Valérie Cartailler</p>
					<p>{{ contact.adresse[0] }}</p>
					<p>{{ contact.adresse[1] }}, {{ contact.adresse[2] }}</p>

					<br />

					<h4>Mail & tel</h4>
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
				<h2 id="foire-aux-questions">Foire aux Questions</h2>
			</div>

			<div class="faq-liste">
				<div
					v-for="(bloc, i) in faqs"
					:key="i"
					@contextmenu.prevent="
						editing({ key: i, item: bloc, liste: faqs })
					"
				>
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
import VueEditor from './editor.vue'
import json from '../scripts/database'
import Leaflet from 'leaflet'

export default Vue.extend({
	template: '<VueFooter/>',
	components: { VueFooter },

	data: () => ({
		contact: json.contact,
		faqs: json.faq
	}),

	methods: {
		editing: (args: any) => {
			const div = document.createElement('div')
			div.id = 'editor'
			document.querySelector('#contenu-page')!.appendChild(div)

			new Vue({
				el: '#editor',
				template: '<VueEditor :test="args" />',
				components: { VueEditor },
				data: () => ({
					args: args
				})
			})
		}
	},

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
