<template>
	<section id="contenu-page" class="page quatre">
		<div>
			<div class="semi-titre">
				<div class="ballon"></div>
				<h2 id="boutiques-marches">Boutiques, marchés & autre</h2>
			</div>

			<div class="deux-colonnes">
				<div class="left">
					<h3>Boutiques</h3>

					<div id="vue-boutiques">
						<div
							class="item"
							v-bind:key="i"
							v-for="(item, i) in boutiques"
							@contextmenu.prevent="
								editing({
									key: i,
									item: item,
									liste: boutiques
								})
							"
						>
							<h4>{{ item.nom }}</h4>
							<p>{{ item.adresse }}</p>
						</div>
					</div>
				</div>

				<div class="right">
					<div>
						<h3>Marchés</h3>

						<div id="vue-marches">
							<div
								class="item"
								v-bind:key="i"
								v-for="(item, i) in marches"
								@contextmenu.prevent="
									editing({
										key: i,
										item: item,
										liste: marches
									})
								"
							>
								<h4>{{ item.nom }}</h4>
								<p>{{ item.coord }}, {{ item.activite }}</p>
								<p>{{ item.note }}</p>
							</div>
						</div>
					</div>

					<div id="vue-savonnerie">
						<h3>A la savonnerie</h3>

						<div class="item">
							<h4>
								Assurez vous de la disponibilité de la
								savonnière 24h à l'avance
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div>
			<div class="semi-titre">
				<div class="ballon"></div>
				<h2 id="evenements">Evénements</h2>
			</div>

			<div class="filters">
				<button
					v-bind:key="mois.indexOf(m)"
					v-for="m in mois"
					v-on:click="showMonth(mois.indexOf(m))"
				>
					{{ m }}
				</button>
			</div>

			<div class="calendrier" v-if="shouldShowMonths">
				<div
					class="item"
					v-bind:key="i"
					v-for="(item, i) in events"
					@contextmenu.prevent="
						editing({ key: i, item: item, liste: events })
					"
				>
					<p class="titre-event">
						<strong>{{ item.nom }}</strong>
					</p>
					<p>{{ item.date }}</p>
					<p>{{ item.horaire }}</p>
					<p>{{ item.coord }}</p>
					<p>{{ item.note }}</p>
				</div>
			</div>
		</div>

		<VueFooter />
		<div id="editor" />
	</section>
</template>
<script lang="ts">
import Vue from 'vue'
import VueFooter from './footer.vue'
import VueEditor from './editor.vue'
import json from '../scripts/database'
import ScrollReveal from 'scrollreveal'
import SimpleParallax from 'simple-parallax-js'

export default Vue.extend({
	template: '<VueFooter/>',
	components: { VueFooter },

	data: () => ({
		shouldShowMonths: false,
		boutiques: json.disponible.boutique,
		marches: json.disponible.marche,
		events: [{}],
		contact: json.contact,
		mois: [
			'janvier',
			'février',
			'mars',
			'avril',
			'mai',
			'juin',
			'juillet',
			'août',
			'septembre',
			'octobre',
			'novembre',
			'decembre'
		]
	}),

	methods: {
		editing(args: any) {
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
		},

		setActiveButton: (index: number) => {
			//toggles off all, on only one

			document
				.querySelectorAll('.filters button')
				.forEach((button, i) =>
					i === index
						? button.classList.add('selected')
						: button.classList.remove('selected')
				)
		},

		showMonth: function(index: number) {
			this.setActiveButton(index)
			let eventsToShow = []
			const m = this.$data.mois[index]

			//add events if month corresponds
			for (let event of json.events)
				event.mois === m ? eventsToShow.push(event) : ''

			if (eventsToShow.length > 0) {
				this.events = eventsToShow
			} else {
				if (m === 'janvier' || m === 'février') {
					this.events = [{ nom: 'La savonniere se repose en ' + m }]
				} else {
					this.events = [
						{
							nom: "Pas d'événements en " + m,
							coord: 'seulement les marchés habituels'
						}
					]
				}
			}

			this.shouldShowMonths = true
		}
	},

	mounted: function() {
		//set default month to be shown
		const index = new Date().getMonth()
		this.setActiveButton(index)
		this.showMonth(index)

		//accentuates months with events
		document.querySelectorAll('.filters button').forEach((button, i) => {
			for (let event of json.events)
				event.mois !== this.$data.mois[i]
					? ''
					: button.classList.add('hasEvents')
		})

		//animation + transitions
		const revealOptions = { duration: 1000, interval: 50 }
		ScrollReveal().reveal('#vue-boutiques .item', revealOptions)
		ScrollReveal().reveal('#vue-marches .item', revealOptions)
		ScrollReveal().reveal('#vue-savonnerie .item', revealOptions)
		ScrollReveal().reveal('.filters button', revealOptions)
	}
})
</script>
