export function dom(query: string) {
	return document.querySelector(query)
}

export function bound(elem: Element) {
	return elem.getBoundingClientRect()
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
