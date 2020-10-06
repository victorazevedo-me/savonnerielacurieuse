<template>
	<section id="contenu-page" class="page trois">
		<div id="savons-doux" class="savons-doux">
			<div class="semi-titre">
				<!-- <div class="ballon"></div> -->
				<h2>Les savons doux</h2>
			</div>

			<div class="deux-colonnes">
				<div class="liste-savons">
					<h3 v-bind:key="item.nom" v-for="item in savons">
						{{ item.title }}
					</h3>
				</div>
				<div class="full-card">
					<div class="nom">
						<h3>Délice</h3>
						<p class="shadow">Délice</p>
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
						<p class="description">
							5 huiles végétales, de la glycérine, du cacao, de
							l'eau et c'est tout ! Délice ne contient pas
							d'huiles essentielles. Hypoallergénique. Surgras 8%
						</p>
						<p class="composition">
							Composition: huile d'olive, huile de coco, beurre de
							karité, huile de tournesol partiellement saponifiés,
							eau, glycérine, beurre de cacao
						</p>
					</div>
				</div>
			</div>
		</div>

		<div id="savon-menager" class="savon-menager">
			<div class="semi-titre">
				<!-- <div class="ballon"></div> -->
				<h2>Le savon ménager César</h2>
			</div>

			<div class="deux-colonnes">
				<div class="sav-card">
					<div>
						<img
							src="https://savonnerielacurieuse.com/images/savons/theromarin.jpg"
						/>
					</div>
					<h3>Savon</h3>
					<p>Sous-titre savon</p>
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

export default Vue.extend({
	template: '<VueFooter/>',
	components: { VueFooter },
	data: () => ({
		temoignages: json.temoignages,
		savons: json.savons,
	}),
})
</script>