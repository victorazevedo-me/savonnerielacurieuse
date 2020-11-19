<template>
	<section id="contenu-accueil">
		<div class="background-wrapper">
			<div class="background savonnerie front"></div>
		</div>

		<div class="accueil">
			<div class="titre">
				<h1>Savonnerie<br />La Curieuse</h1>
				<p>création de savons écologiques</p>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	methods: {
		backgroundParallax() {
			window.addEventListener('scroll', function(ev) {
				const bg = document.querySelector('.background.front')!
				const windowY = document.body.getBoundingClientRect().y * -1

				bg.setAttribute(
					'style',
					`transform: translateY(-${(windowY / 1.8).toFixed(1)}px)`
				)
			})
		}
	}
})
</script>
