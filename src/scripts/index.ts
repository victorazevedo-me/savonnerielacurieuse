import { accueilSwipe } from './accueilControl'
import Index from '../components/index.vue'
import ExtendedNav from '../components/nav.vue'
import Page01 from '../components/un.vue'
import Page02 from '../components/deux.vue'
import Page03 from '../components/trois.vue'
import Page04 from '../components/quatre.vue'
import Page05 from '../components/cinq.vue'
import Hammer from 'hammerjs'
import Vue from 'vue'
import {
	dom,
	bound,
	SITEMAP,
	PageEventOrigin,
	extendedNav
} from './pageControl'

function accueilEvents() {
	enum AnimationIs {
		Playing,
		Finished
	}

	const anim = {
		state: AnimationIs.Finished,

		wait: () => {
			anim.state = AnimationIs.Playing
			setTimeout(() => {
				anim.state = AnimationIs.Finished
			}, 1300)
		}
	}

	const panningScroll = () => {
		const swipes = ['panleft', 'panright']
		const emcee = new Hammer(
			<HTMLScriptElement>document.querySelector('.accueil')!
		)

		swipes.forEach(pan => {
			emcee.on(pan, () => {
				//only do animation if not playing
				if (anim.state === AnimationIs.Finished) {
					const [main, innerI] = SITEMAP.indexes()

					const applyPan = (i: number) => {
						anim.wait()
						redirection(PageEventOrigin.homepageScroll, i)
					}

					//deplace l'accueil droite et gauche
					if (pan === 'panleft' && main < SITEMAP.len() - 1) {
						applyPan(main + 1)
					}

					if (pan === 'panright' && main > 0) {
						applyPan(main - 1)
					}
				}
			})
		})
	}

	const hamburger = () => {
		const extendedDom = document.querySelector('#extended-nav')!
		const hamburger = document.querySelector('.hamburger')!

		//tres pas beau
		hamburger.addEventListener('click', () => {
			if (
				extendedDom.innerHTML === '' &&
				!hamburger.classList.contains('clicked')
			) {
				new Vue({
					el: '#extended-nav',
					template: '<ExtendedNav />',
					components: { ExtendedNav },
					mounted: () => {
						setTimeout(() => extendedNav.show(), 100)
					}
				})
			} else {
				//puts nav behind after fadeout
				extendedNav.hide()
			}
		})
	}

	panningScroll()
	hamburger()
}

export function redirection(
	which: PageEventOrigin,
	newMain: number = 0,
	newInner: number = 0
) {
	function openPage(i?: number, mountCallback: Function = () => {}) {
		if (i === undefined) {
			new Vue({
				el: '#contenu-accueil',
				template: '<Index />',
				components: { Index },
				mounted: () => {
					accueilEvents()
					accueilSwipe(main)
				}
			})
		} else {
			const pages = [Page01, Page02, Page03, Page04, Page05]
			const IndexedPage = pages[i]

			new Vue({
				el: '#contenu-page',
				template: '<IndexedPage />',
				components: { IndexedPage },
				mounted: () => {
					mountCallback()
				}
			})
		}
	}

	function subCat() {
		window.scrollTo(0, 0)

		const out = which === PageEventOrigin.initialisation ? main : newMain
		const inn = which === PageEventOrigin.initialisation ? inner : newInner
		const dir = SITEMAP.data[out][inn]

		if (inn > 0) {
			const titre = dom(`#` + SITEMAP.data[out][inn])!
			const scroll = bound(titre).y
			window.scrollBy({ left: 0, top: scroll - 100, behavior: 'smooth' })
		}
	}

	const [main, inner] = SITEMAP.indexes()

	if (which === PageEventOrigin.initialisation) {
		openPage()
		openPage(main, subCat)
	} else {
		SITEMAP.pushState([newMain, newInner])
		accueilSwipe(newMain, main)
		openPage(newMain, () => {
			window.scrollTo(0, 0)
			//si c'est un sous-titre, scroll jusqu'a
			if (which === PageEventOrigin.navSubCategory) {
				subCat()
			}
		})
	}
}

window.onload = function() {
	redirection(PageEventOrigin.initialisation)
}
