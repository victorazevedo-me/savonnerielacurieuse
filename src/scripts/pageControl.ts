export function dom(query: string) {
	return document.querySelector(query)
}

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
