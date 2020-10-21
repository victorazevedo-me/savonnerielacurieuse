<template>
    
    <div id="extended-nav" class="visible">

        <div id="extended-nav-content">
    
            <div class="left-display">
                <div class="presentation-images">
                    <img class="in" src="../images/nav/suggestion.jpg">
                </div>
            </div>

            <div class="nav-liste">
                <li>
                    <h3><a href="/">Accueil</a></h3>
                    <p><a href="/a-propos/">la savonnerie</a></p>
                </li>
                <li>
                    <h3><a href="/saponification/">Saponification</a></h3>
                    <p><a href="/saponification/creation">Création du savon Fanny</a></p>
                    <p><a href="/saponification/sap">La saponification</a></p>
                </li>
                <li>
                    <h3><a href="/savons/">Savons</a></h3>
                    <p><a href="/savons/doux/">les savons doux</a></p>
                    <p><a href="/savons/menager/">le savon ménager César</a></p>
                </li>
                <li>
                    <h3><a href="/disponible/">Disponible</a></h3>
                    <p><a href="/disponible/boutiques">Boutiques, marchés & autre</a></p>
                    <p><a href="/disponible/evenements">Evenements</a></p>
                </li>
                <li>
                    <h3><a href="/contact/">Contact</a></h3>
                    <p><a href="/contact/#">Contacter la savonnière</a></p>
                    <p><a href="/faq">Foire aux Questions</a></p>
                </li>
            </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
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
		]
		const navliste = document.querySelectorAll('.nav-liste li')!
		const presentation = document.querySelector('.presentation-images')!
		const leftDisplay = document.querySelector('.left-display')!
		let waitForAnimation = false
		let lastHover = 0
		let hoverTimeout = 0

		navliste.forEach((li, i) => {
			li.addEventListener('mouseover', () => {
				
				if (lastHover !== i && images.length > i) {
					if (waitForAnimation) {
						clearTimeout(hoverTimeout)
					}

					lastHover = i
					waitForAnimation = true

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
			})
		})
	},
})
</script>