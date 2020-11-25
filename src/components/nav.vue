<template>
	<nav id="nav">
		<div id="simple">
			<ul class="quicknav">
				<li
					v-for="(titre, i) in this.quickNav"
					:key="i"
					@click="redirect(i)"
				>
					{{ titre }}
				</li>
			</ul>
			<div class="hamburger">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div id="extended">
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
	</nav>
</template>
<script lang="ts">
import Vue from 'vue'
import navImgs from '../images/nav/*.jpg'
import {
	$,
	$$,
	setCss,
	PageEventOrigin,
	SITEMAP,
	redirection
} from '../scripts/pageControl'

export default Vue.extend({
	data: () => ({
		quickNav: [
			'accueil',
			'saponification',
			'savons',
			'disponible',
			'contact'
		],
		isExtended: false,
		isAnimating: false,
		belowAccueil: false,
		navTimeout: 0
	}),

	methods: {
		toggleAnimState(duration: number) {
			this.$data.isAnimating = true
			setTimeout(() => (this.$data.isAnimating = false), duration)
		},

		redirect(id: number, inner = 0) {
			if (!this.isAnimating) {
				redirection(
					inner === 0
						? PageEventOrigin.homepageScroll
						: PageEventOrigin.navSubCategory,
					id,
					inner
				)
				this.toggleAnimState(1200)
			}
		},

		changeHamburgerColor() {
			const isExtended = this.$data.isExtended
			const belowAccueil = this.$data.belowAccueil
			const color = isExtended || !belowAccueil ? '#fff' : '#111'

			$$('.hamburger span')!.forEach(e =>
				setCss(e, 'background-color:' + color)
			)
		},

		quickNavScrollDisplay() {
			const dom = $('.quicknav')!
			const currentScroll = window.pageYOffset
			const top = currentScroll === 0
			const bottom =
				currentScroll + 100 >
				document.body.clientHeight - window.innerHeight

			dom.className = 'quicknav ' + (bottom ? 'bottom' : '')
			setCss(dom, 'opacity:' + (top || bottom ? 1 : 0))
		},

		toggleExtended() {
			const ext = $('#extended')!
			const isExt = $('nav')!.classList.toggle('extended')

			clearTimeout(this.$data.navTimeout)

			this.$data.navTimeout = setTimeout(
				() =>
					setCss(ext, `visibility: ${isExt ? 'visible' : 'hidden'}`),
				isExt ? 0 : 1000
			)

			this.isExtended = isExt
			this.changeHamburgerColor()
		},

		extended() {
			//A changer (evidemment)
			const images = [
				navImgs.suggestion,
				navImgs.cure,
				navImgs.feuilles,
				navImgs.chignore,
				navImgs.chignore
			]
			const navliste = $$('.nav-liste li')!
			const presentation = $('.presentation-images')!
			const leftDisplay = $('.left-display')!
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

					//si pas mobile
					if (
						!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
							navigator.userAgent
						)
					) {
						//changement de poster
						const currentPoster = presentation.querySelector('img')!
						const newPoster = document.createElement('img')!
						newPoster.src = images[i]
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
			}

			//initialisation des categories
			selectionCategorie(
				navliste[SITEMAP.indexes()[0]],
				SITEMAP.indexes()[0]
			)

			//les clicks des titres
			$$('.nav-liste h3').forEach((a, i) =>
				a.addEventListener('click', e => {
					this.redirect(i)
					this.toggleExtended()
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
						this.redirect(i, counter)
						this.toggleExtended()
					})
				})

				li.addEventListener('mouseover', () => {
					selectionCategorie(li, i)
				})
			})
		}
	},

	mounted() {
		this.extended()

		window.addEventListener('scroll', e => {
			this.belowAccueil =
				$('#contenu-accueil')!.clientHeight - 100 < window.pageYOffset

			this.changeHamburgerColor()
			this.quickNavScrollDisplay()
		})

		$('.hamburger')!.addEventListener('click', e => {
			this.toggleExtended()
		})
	}
})
</script>
