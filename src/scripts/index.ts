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
import { dom, bound } from './pageControl'

export const SITEMAP = {
	data: [
		['/', 'la-savonnerie'],
		['saponification', 'creation-savon', 'la-saponification'],
		['savons', 'savons-doux', 'savon-menager', 'temoignages'],
		['ou-les-trouver', 'boutiques-marches', 'evenements'],
		['contact-faq', 'contact', 'foire-aux-questions']
	],

	len: () => SITEMAP.data.length,

	indexes: () => {
		const path = window.location.pathname.replace('/', '')
		let result = [0, 0]

		SITEMAP.data.forEach((row, i) => {
			for (let j in row) {
				if (path.includes(row[+j])) result = [i, +j]
			}
		})

		return result
	},

	pushState: (pathArray: number[]) => {
		window.history.replaceState(
			{},
			'',
			SITEMAP.data[pathArray[0]][pathArray[1]]
		)
	}
}

export enum PageEventOrigin {
	initialisation,
	homepageScroll,
	navSubCategory
}

export const extendedNav = {
	show: () => {
		const ext = dom('#extended-nav')!
		const hamburger = dom('.hamburger')!

		ext.classList.add('visible')
		ext.setAttribute('style', 'z-index: 9')
		dom('.hamburger')!.classList.add('clicked')
	},

	hide: () => {
		const ext = dom('#extended-nav')!
		ext.classList.remove('visible')
		setTimeout(() => ext.setAttribute('style', 'z-index: -1'), 500)
		dom('.hamburger')!.classList.remove('clicked')
	}
}

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

		//pour eviter de swipe n'importe quand
		//à corriger en définissant finishposX - startposX

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
	newIndex: number = 0,
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
				mounted: () => mountCallback()
			})
		}
	}

	const [main, inner] = SITEMAP.indexes()

	if (which === PageEventOrigin.initialisation) {
		openPage()
		openPage(main)
	} else {
		SITEMAP.pushState([newIndex, newInner])
		accueilSwipe(newIndex, main)
		openPage(newIndex, () => {
			window.scrollTo(0, 0)

			//si c'est un sous-titre, scroll jusqu'a
			if (which === PageEventOrigin.navSubCategory) {
				const innerTitre = dom('#' + SITEMAP.data[newIndex][newInner])
				const scroll = bound(innerTitre!).y || 0
				window.scrollTo(0, scroll - 100)
			}
		})
	}
}

window.onload = function() {
	redirection(PageEventOrigin.initialisation)
}
