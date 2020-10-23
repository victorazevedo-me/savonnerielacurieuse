<template>
	<div id="extended-nav">
		<div id="extended-nav-content">
			<div class="left-display">
				<div class="presentation-images">
					<img class="in" src="../images/nav/suggestion.jpg" />
				</div>
			</div>

			<div class="nav-liste">
				<li>
					<h3>Accueil</h3>
					<p>la savonnerie</p>
				</li>
				<li>
					<h3>Saponification</h3>
					<p>Création du savon Fanny</p>
					<p>La saponification</p>
				</li>
				<li>
					<h3>Savons</h3>
					<p>les savons doux</p>
					<p>le savon ménager César</p>
					<p>témoignages</p>
				</li>
				<li>
					<h3>Disponible</h3>
					<p>Boutiques, marchés & autre</p>
					<p>Evenements</p>
				</li>
				<li>
					<h3>Contact</h3>
					<p>Contacter la savonnière</p>
					<p>Foire aux Questions</p>
				</li>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { accueilSwipe } from '../scripts/accueilControl'
import {
	PageEventOrigin,
	SITEMAP,
	extendedNav,
	redirection
} from '../scripts/index'
export default Vue.extend({
	mounted: () => {
		//A changer (evidemment)
		const baseUrl =
			'https://raw.githubusercontent.com/victorazevedo-me/savonnerielacurieuse/master/src/images/nav/'
		const images = [
			'suggestion.jpg',
			'cure.jpg',
			'feuilles.jpg',
			'chignore.jpg',
			'chignore.jpg'
		]
		const navliste = document.querySelectorAll('.nav-liste li')!
		const presentation = document.querySelector('.presentation-images')!
		const leftDisplay = document.querySelector('.left-display')!
		let waitForAnimation = false
		let lastHover = 0
		let hoverTimeout = 0

		function selectionCategorie(li: Element, i: number) {
			if (lastHover !== i && images.length > i) {
				//
				//borders pour li
				li.classList.add('selected')
				navliste[lastHover].classList.remove('selected')

				//change anim, change last
				if (waitForAnimation) clearTimeout(hoverTimeout)
				lastHover = i
				waitForAnimation = true

				//changement de poster
				const currentPoster = presentation.querySelector('img')!
				const newPoster = document.createElement('img')!
				newPoster.src = baseUrl + images[i]
				currentPoster.classList.replace('in', 'out')

				hoverTimeout = setTimeout(() => {
					leftDisplay.className = 'left-display presente'

					currentPoster.remove()
					presentation.appendChild(newPoster)
					waitForAnimation = false

					setTimeout(() => newPoster.classList.add('in'), 50)
				}, 500)
			}
		}

		//initialisation des categories
		selectionCategorie(navliste[SITEMAP.indexes()[0]], SITEMAP.indexes()[0])

		//les clicks des titres
		document.querySelectorAll('.nav-liste h3').forEach((a, i) =>
			a.addEventListener('click', e => {
				//redirige
				redirection(PageEventOrigin.homepageScroll, i)

				//quitte le nav extended
				extendedNav.hide()
			})
		)

		//events de li
		navliste.forEach((li, i) => {
			li.querySelectorAll('p').forEach(p => {
				p.addEventListener('click', e => {
					let elem: any = p
					let counter = 0

					while (elem.tagName !== 'H3') {
						elem = elem.previousElementSibling
						counter += 1
					}

					//redirige
					redirection(PageEventOrigin.navSubCategory, i, counter)

					//quitte le nav extended
					extendedNav.hide()
				})
			})

			li.addEventListener('mouseover', () => {
				selectionCategorie(li, i)
			})
		})
	}
})
</script>
