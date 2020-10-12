<template>
	<section id="contenu-page" class="page trois">
		<div id="savons-doux" class="savons-doux">
			<!-- <div class="semi-titre">
				<div class="ballon"></div>
				<h2>Les savons doux</h2>
			</div> -->

			<div class="liste-savons">
				<h3
					v-bind:key="item.title"
					v-for="item in savons"
					v-on:click="(e) => apply(item, e)"
				>
					{{ item.title }}
				</h3>
			</div>
			<div class="full-card">
				<div class="nom">
					<h3>{{ savonToDisplay.title }}</h3>
					<p class="shadow">{{ savonToDisplay.title }}</p>
				</div>
				<div class="slideshow">
					<img
						src="https://savonnerielacurieuse.com/images/savons/theromarin.jpg"
					/>
					<img
						src="https://savonnerielacurieuse.com/images/savons/theromarin.jpg"
					/>
					<img
						src="https://savonnerielacurieuse.com/images/savons/theromarin.jpg"
					/>
				</div>
				<div class="bottom">
					<p class="description">{{ savonToDisplay.desc }}</p>
					<p class="composition">
						Composition: {{ savonToDisplay.compo }}
					</p>
				</div>
			</div>
		</div>

		<div id="savon-menager" class="savon-menager">
			<!-- <div class="semi-titre">
				<div class="ballon"></div>
				<h2>Le savon ménager César</h2>
			</div> -->

			<div class="deux-colonnes">
				<div class="full-card">
					<div class="nom">
						<h3>César</h3>
						<p class="shadow">César</p>
					</div>
					<div class="slideshow">
						<img
							src="https://savonnerielacurieuse.com/images/savons/cesar.jpg"
						/>
						<img
							src="https://savonnerielacurieuse.com/images/savons/cesar.jpg"
						/>
						<img
							src="https://savonnerielacurieuse.com/images/savons/cesar.jpg"
						/>
					</div>
					<div class="bottom">
						<p class="description">{{ savons.cesar.desc }}</p>
						<p class="composition">
							Composition: {{ savons.cesar.compo }}
						</p>
					</div>
				</div>

				<div class="recette-lessive">
					<h3>Lessive liquide: la recette</h3>
					<p>
						50g de César râpé dans un saladier avec la râpe à
						fromage
					</p>
					<p>
						1,5L d'eau très chaude (la bouilloire fera le travail) à
						verser sur les copeaux de César. Il est possible
						d'allonger la lessive de 0.5L supplémentaire sans nuire
						à son efficacité.
					</p>
					<p>
						2 cuillères arasées de Cristaux de soude (carbonate de
						sodium, vendu au rayon droguerie ou lessive) à ajouter
						au mélange avant qu'il ne refroidisse. On pense à mettre
						ses gants de vaisselle pour manipuler les Cristaux de
						soude.
					</p>
					<p>
						Et pour les textiles délicats (laine, soie, etc.), il
						suffira de réaliser cette lessive sans les cristaux de
						soude.
					</p>
				</div>
			</div>

			<div class="grosseballe"></div>
		</div>

		<div id="en-parlent" class="en-parlent">
			<div class="semi-titre">
				<div class="ballon"></div>
				<h2>Les savonnés en parlent</h2>
			</div>

			<div class="liste">
				<div
					class="citation"
					v-bind:key="item.nom"
					v-for="item in temoignages"
				>
					<p class="contenu">"{{ item.citation }}"</p>
					<p class="nom">{{ item.credit }}</p>
				</div>
			</div>

			<div class="grosseballe"></div>
		</div>

		<VueFooter />
	</section>
</template>
<script lang="ts">
import Vue from 'vue'
import VueFooter from './footer.vue'
import json from '../scripts/database'
import ScrollReveal from 'scrollreveal'
import SimpleParallax from 'simple-parallax-js'
import {
	dom,
	isScrolledIntoView,
	overlayPosition,
} from '../scripts/pageControl'

export default Vue.extend({
	template: '<VueFooter/>',
	components: { VueFooter },
	data: () => ({
		temoignages: json.temoignages,
		savons: json.savons,
		savonToDisplay: json.savons.muesli,
		lastSavon: document.querySelector('.liste-savons h3'),
	}),

	methods: {
		apply: function (item: JSON, e: any) {
			//class toggle
			if (this.lastSavon) {
				this.lastSavon.classList.toggle('selected')
			}
			e.target.classList.toggle('selected')
			this.$data.lastSavon = e.target

			//change display
			this.$data.savonToDisplay = item
		},
	},

	mounted: function () {
		overlayPosition('.en-parlent .grosseballe', '.en-parlent', 1200)

		const parallaxOptions = {
			delay: 0.6,
			scale: 1.6,
			transition: 'cubic-bezier(0.19, 1, 0.22, 1)',
			overflow: true,
		}

		new SimpleParallax(dom('.savons-doux .full-card .shadow')!, parallaxOptions)
		new SimpleParallax(dom('.savon-menager .full-card .shadow')!, parallaxOptions)
		new SimpleParallax(dom('.savon-menager .grosseballe')!, parallaxOptions)
		new SimpleParallax(dom('.en-parlent .grosseballe')!, parallaxOptions)
	},
})
</script>