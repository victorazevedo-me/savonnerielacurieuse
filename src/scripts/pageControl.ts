import { accueilSwipe } from '../scripts/accueilControl'
import Nav from '../components/nav.vue'
import Index from '../components/index.vue'
import Page01 from '../components/un.vue'
import Page02 from '../components/deux.vue'
import Page03 from '../components/trois.vue'
import Page04 from '../components/quatre.vue'
import Page05 from '../components/cinq.vue'
import Vue from 'vue'

export const $ = (g: string) => document.querySelector(g)
export const $$ = (g: string) => document.querySelectorAll(g)

export const setCss = (dom: Element, attr: string) =>
	dom.setAttribute('style', attr)

export function bound(elem: Element) {
	if (elem) {
		return elem.getBoundingClientRect()
	} else {
		throw Error(elem + ' does not exist')
	}
}

export function isScrolledIntoView(query: string) {
	const element = document.querySelector(query)

	if (element) {
		return (
			bound(element).top >= 0 &&
			bound(element).bottom <= window.innerHeight
		)
	} else {
		throw Error(query + ' not found')
	}
}

export function overlayPosition(overlay: string, target: string, posY: number) {
	const contenuElem = document.querySelector('#contenu-page')!
	const targetElem = document.querySelector(target)
	const overlayElem = <HTMLElement>document.querySelector(overlay)

	if (targetElem && overlayElem) {
		const result =
			bound(targetElem).top -
			bound(contenuElem).top +
			(posY - overlayElem.offsetHeight / 2)
		overlayElem.style.top = `${result}px`
		return result
	} else {
		throw Error('Target or Overlay not found')
	}
}

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

	pushState: (arr: number[]) => {
		window.history.pushState({}, '', SITEMAP.data[arr[0]][arr[1]])
	}
}

export enum PageEventOrigin {
	initialisation,
	homepageScroll,
	navSubCategory
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
				components: { Index }
			})
			new Vue({
				el: '#nav',
				template: '<Nav />',
				components: { Nav }
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

		if (inn > 0) {
			const titre = $(`#${SITEMAP.data[out][inn]}`)!
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
		openPage(newMain, () => {
			window.scrollTo(0, 0)
			accueilSwipe(newMain)
			if (which === PageEventOrigin.navSubCategory) {
				subCat()
			}
		})
	}
}
