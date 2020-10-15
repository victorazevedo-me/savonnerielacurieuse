import { accueilSwipe } from './accueilControl'
import Index from '../components/index.vue'
import ExtendedNav from '../components/nav.vue'
import Page01 from '../components/un.vue'
import Page02 from '../components/deux.vue'
import Page03 from '../components/trois.vue'
import Page04 from '../components/quatre.vue'
import Hammer from 'hammerjs'
import Vue from 'vue'

const SITEMAP = [
	{
		pathname: '/savonnerie',
		titre: 'La savonnerie'
	},
	{
		pathname: '/saponification',
		titre: 'La saponification'
	},
	{
		pathname: '/savons',
		titre: 'Les savons'
	},
	{
		pathname: '/disponible',
		titre: 'Où les trouver'
	}
]

enum PageEventOrigin {
	initialisation,
	homepageScroll,
	headerLogo
}

function getPageIndex(): number {
	let result = -1

	SITEMAP.forEach((u, i) => {
		if (u.pathname === window.location.pathname) result = i
	})

	if (result < 0) {
		console.warn('getPageIndex defaulted to 0')
		return 0
	} else {
		return result
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

	//Object
	const Nav = {
		dom: document.querySelector('body > nav')!,
		centerLis: document.querySelectorAll('nav .center li'),

		changeCenterFocus: (i: number) => {
			Nav.centerLis.forEach(n => n.classList.remove('active'))
			Nav.centerLis[i].classList.add('active')
		}
	}

	const navButtons = () => {
		Nav.centerLis.forEach((elem, i) => {
			elem.addEventListener('click', function() {
				//only do animation if not playing

				const currentPage = getPageIndex()

				if (anim.state === AnimationIs.Finished && currentPage !== i) {
					anim.wait()
					redirection(PageEventOrigin.homepageScroll, i)
					Nav.changeCenterFocus(i)
				}
			})
		})
	}

	const panningScroll = () => {
		const emcee = new Hammer(
			<HTMLScriptElement>document.querySelector('.accueil')!
		)
		const swipes = ['panleft', 'panright']

		//pour eviter de swipe n'importe quand
		//à corriger en définissant finishposX - startposX

		swipes.forEach(pan => {
			emcee.on(pan, () => {
				//only do animation if not playing
				if (anim.state === AnimationIs.Finished) {
					const currentIndex = getPageIndex()

					const applyPan = (i: number) => {
						anim.wait()
						redirection(PageEventOrigin.homepageScroll, i)
						Nav.changeCenterFocus(i)
					}

					//deplace l'accueil droite et gauche
					if (pan === 'panleft' && currentIndex < 3) {
						applyPan(currentIndex + 1)
					}

					if (pan === 'panright' && currentIndex > 0) {
						applyPan(currentIndex - 1)
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
					components: { ExtendedNav }
				})
			}

			hamburger.classList.toggle('clicked')
		})
	}

	const verticalScroll = () => {
		document.body.addEventListener('wheel', function(ev: any) {
			if (ev.wheelDelta < 0) {
			} else if (ev.wheelDelta > 0) {
			}
		})
	}

	const headerLogo = () => {
		const logo = document.querySelector('nav .logo')!
		logo.addEventListener('click', () => {
			//Accueil.arrive(PageEventOrigin.headerLogo)
		})
	}

	const customCursor = () => {
		const cursor = document.querySelector('#cursor')!
		const width = cursor.scrollWidth
		document.addEventListener('mousemove', e => {
			cursor.setAttribute(
				'style',
				`top: ${e.pageY - width / 2}px; left: ${e.pageX - width / 2}px`
			)
		})
	}

	//customCursor()
	//verticalScroll()
	navButtons()
	panningScroll()
	hamburger()
	//headerLogo()
}

function redirection(which: PageEventOrigin, index?: number) {
	function openPage(i: number) {
		const pages = [Page01, Page02, Page03, Page04]
		const IndexedPage = pages[i]

		new Vue({
			el: '#contenu-page',
			template: '<IndexedPage />',
			components: { IndexedPage }
		})
	}

	if (which === PageEventOrigin.initialisation) {
		new Vue({
			el: '#contenu-accueil',
			template: '<Index />',
			components: { Index }
		})
		accueilEvents()

		if (window.location.pathname.length > 1) {
			const i = getPageIndex()
			accueilSwipe(SITEMAP[i].pathname, i)
			openPage(i)
		} else {
			openPage(0)
		}
	} else if (
		which === PageEventOrigin.homepageScroll &&
		typeof index === 'number'
	) {
		const lastIndex = getPageIndex()
		window.history.pushState(
			'localhost:1234',
			SITEMAP[index].titre,
			SITEMAP[index].pathname
		)
		accueilSwipe(SITEMAP[index].pathname, index, lastIndex)
		openPage(index)
	} else if (which === PageEventOrigin.headerLogo) {
	}
}

window.onload = function() {
	// directories control
	redirection(PageEventOrigin.initialisation)
}
