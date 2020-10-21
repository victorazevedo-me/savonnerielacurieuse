<template>
	<section id="contenu-page" class="page un">
		<div class="deux-colonnes">
			<div class="slc-description">
				<div class="semi-titre">
					<div class="ballon"></div>
					<h2>La savonnerie</h2>
				</div>

				<div>
					<p>
						Motivée par le désir de faire partager au plus grand
						nombre les bienfaits d'un savon doux et écologique, je
						crée en mars 2016 la savonnerie La Curieuse.
					</p>
					<p>
						C'est à Vollore-Ville au cœur du parc régional
						Livradois-Forez que j'ai choisi de créer des savons
						surgras à partir du procédé de saponification à froid.
					</p>
				</div>
			</div>

			<div>
				<img
					class="pres-img"
					src="../images/accueil/louise-knight.jpg"
				/>
			</div>
		</div>

		<VueFooter />
	</section>
</template>
<script lang="ts">
import Vue from 'vue'
import VueFooter from './footer.vue'
import ScrollReveal from 'scrollreveal'

export default Vue.extend({
	template: '<VueFooter/>',
	components: { VueFooter },
	mounted: function() {
		ScrollReveal().reveal('.slc-description p', {
			duration: 1000,
			delay: 100
		})
		ScrollReveal().reveal('.pres-img', {
			duration: 1000,
			delay: 1000,
			distance: '-20px',
			afterReveal: () => {
				document.querySelector('footer')!.style.display = 'block'
				ScrollReveal().reveal('footer', {
					duration: 1000,
					delay: 1000
				})
			}
		})
	}
})
</script>
