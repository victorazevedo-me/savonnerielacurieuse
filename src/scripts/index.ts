import { openPage } from './pageControl'
import { accueilSwipe } from './accueilControl'
import { navDisplayedImage } from './extended-nav'
import Index from '../components/index.vue'
import ExtendedNav from '../components/nav.vue'
import Hammer from 'hammerjs'
import Vue from 'vue'

const SITEMAP = [
	{
		pathname: '/la-savonnerie',
		titre: 'La savonnerie'
	},
	{
		pathname: '/la-saponification',
		titre: 'La saponification'
	},
	{
		pathname: '/les-savons',
		titre: 'Les savons'
	},
	{
		pathname: '/ou-les-trouver',
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
		const hamburger = document.querySelector('.hamburger')!
		hamburger.addEventListener('click', () => {
			if (hamburger.classList.contains('clicked')) {
				hamburger.classList.remove('clicked')
			} else {
				new Vue({
					el: '#extended-nav',
					template: '<ExtendedNav />',
					components: { ExtendedNav }
				})
				document
					.querySelector('#extended-nav')
					?.classList.toggle('visible')
				hamburger.classList.add('clicked')
				navDisplayedImage()
			}
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
