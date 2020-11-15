<template>
	<section id="contenu-page" class="page trois">
		<div id="savons-doux" class="savons-doux">
			<div class="semi-titre">
				<div class="ballon"></div>
				<h2>Les savons doux</h2>
			</div>

			<div class="savons-wrapper">
				<div class="liste-savons">
					<div
						v-bind:key="item.title"
						v-for="item in savons"
						@click="changeCardContent(item)"
					>
						<img
							src="../images/icons/apple-touch-icon.png"
							alt="temp-icon"
							draggable="false"
						/>
						<h4>{{ item.title }}</h4>
					</div>
				</div>
				<div class="full-card">
					<div class="close">
						&times;
					</div>

					<div class="nom">
						<h3>{{ savonToDisplay.title }}</h3>
					</div>

					<div class="images-desc">
						<div class="images">
							<img
								src="../images/icons/apple-touch-icon.png"
								alt="temp-icon"
							/>
							<img
								src="../images/icons/apple-touch-icon.png"
								alt="temp-icon"
							/>
						</div>

						<div class="desc">
							<p>{{ savonToDisplay.desc }}</p>
						</div>
					</div>

					<div class="compo">
						<p>Composition: {{ savonToDisplay.compo }}</p>
					</div>
				</div>
			</div>
		</div>

		<div id="savon-menager" class="savon-menager">
			<div class="semi-titre">
				<div class="ballon"></div>
				<h2>Le savon ménager César</h2>
			</div>

			<div class="deux-colonnes">
				<div class="full-card">
					<div class="images-desc">
						<div class="images">
							<img
								src="../images/icons/apple-touch-icon.png"
								alt="temp-icon"
							/>
							<img
								src="../images/icons/apple-touch-icon.png"
								alt="temp-icon"
							/>
						</div>

						<div class="desc">
							<p>{{ savons.cesar.desc }}</p>
						</div>
					</div>

					<div class="compo">
						<p>Composition: {{ savons.cesar.compo }}</p>
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
				<h2 id="temoignages">Les savonnés en parlent</h2>
			</div>

			<div class="liste">
				<div
					class="citation"
					:key="i"
					v-for="(item, i) in temoignages"
					@contextmenu.prevent="
						editing({ key: i, item: item, liste: temoignages })
					"
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
import anime, { AnimeAnimParams, AnimeCallBack } from 'animejs'
import VueEditor from './editor.vue'
import VueFooter from './footer.vue'
import json from '../scripts/database'
import ScrollReveal from 'scrollreveal'
import SimpleParallax from 'simple-parallax-js'
import { $, isScrolledIntoView, overlayPosition } from '../scripts/pageControl'

export default Vue.extend({
	components: { VueFooter },
	data: () => ({
		temoignages: json.temoignages,
		savons: json.savons,
		savonToDisplay: json.savons.muesli
	}),

	methods: {
		changeCardContent(item: JSON) {
			this.$data.savonToDisplay = item
		},

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

	mounted: function() {
		//
		//etape découpe l'anim en 4
		//1 toggle vers full-card
		//2 fait rien
		//3 toggle vers liste-savons
		//4 reset le compteur

		let etapes = 0

		const toggler = () => $('.savons-wrapper')!.classList.toggle('selected')

		const liste = anime({
			targets: '.liste-savons div',
			easing: 'linear',
			direction: 'alternate',
			delay: anime.stagger(50),
			duration: 300,
			opacity: 0,
			changeComplete(anim: AnimeAnimParams) {
				etapes++
				anim.pause()

				if (etapes === 1) {
					full.restart()
					toggler()
				}

				if (etapes === 4) {
					etapes = 0
				}
			}
		})
		const full = anime({
			targets: '.savons-wrapper .full-card',
			translateY: '-25px',
			opacity: 1,
			direction: 'alternate',
			easing: 'easeInOutCubic',
			duration: 500,
			delay: 100,
			changeComplete(anim: AnimeAnimParams) {
				etapes++
				anim.pause()

				if (etapes === 3) {
					toggler()
					liste.play()
				}
			}
		})

		//init anim
		liste.pause()
		full.pause()

		//clic la liste, lance anim part I
		document.querySelectorAll('.liste-savons > div').forEach(el => {
			if (el instanceof HTMLElement) el.onclick = () => liste.play()
		})

		//clic la croix, lance anim part II
		document
			.querySelector('.full-card .close')!
			.addEventListener('click', () => full.play())

		const parallaxOptions = {
			delay: 0.6,
			scale: 1.6,
			transition: 'cubic-bezier(0.19, 1, 0.22, 1)',
			overflow: true
		}

		overlayPosition('.en-parlent .grosseballe', '.en-parlent', 900)
		new SimpleParallax($('.savon-menager .grosseballe')!, parallaxOptions)
		new SimpleParallax($('.en-parlent .grosseballe')!, parallaxOptions)
	}
})
</script>
