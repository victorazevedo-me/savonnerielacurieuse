import Vue from 'vue'
import Page01 from '../components/page-un.vue'
import Page02 from '../components/page-deux.vue'
import Page03 from '../components/page-trois.vue'
import Page04 from '../components/page-quatre.vue'
import fabricationScroll from './fabrication'
import ScrollReveal from 'scrollreveal'
import SimpleParallax from 'simple-parallax-js'

const dom = (u: string) => document.querySelector(u)

function overlayPosition(
	overlay: string,
	targetElem: string,
	posY: number
): number {
	const bodyTop = document
		.querySelector('#contenu-page')!
		.getBoundingClientRect().top
	const elemTop = document.querySelector(targetElem)!.getBoundingClientRect()
		.top
	const overlayDOM = <HTMLElement>document.querySelector(overlay)

	const result = elemTop - bodyTop + (posY - overlayDOM.offsetHeight / 2)
	overlayDOM.style.top = `${result}px`

	return result
}

function page01(): void {
	ScrollReveal().reveal('.slc-description p', {
		duration: 1000,
		delay: 100
	})
	ScrollReveal().reveal('.pres-img', {
		duration: 1000,
		delay: 1000,
		distance: '-50px'
	})
}

function page02() {
	fabricationScroll()
	overlayPosition('.grosseballe', '.expliquation', 500)

	new SimpleParallax(dom('.grosseballe')!, {
		scale: 2,
		overflow: true
	})

	ScrollReveal().reveal('.semi-titre .ballon', {
		duration: 2000,
		scale: 0.8
	})
}

function page03() {
	overlayPosition('.en-parlent .grosseballe', '.en-parlent', 1000)

	const parallaxOptions = {
		delay: 0.6,
		scale: 1.6,
		overflow: true
	}

	const shadow = {
		delay: 0.2,
		scale: 1.3,
		overflow: true
	}

	new SimpleParallax(dom('.full-card .shadow')!, shadow)
	new SimpleParallax(dom('.savon-menager .grosseballe')!, parallaxOptions)
	new SimpleParallax(dom('.en-parlent .grosseballe')!, parallaxOptions)
}

export function openPage(i: number) {
	//append vue pages
	if (i === 0) {
		new Vue({
			el: '#contenu-page',
			template: '<Page01 />',
			components: { Page01 }
		})
		page01()
	} else if (i === 1) {
		new Vue({
			el: '#contenu-page',
			template: '<Page02 />',
			components: { Page02 }
		})
		page02()
	} else if (i === 2) {
		new Vue({
			el: '#contenu-page',
			template: '<Page03 />',
			components: { Page03 }
		})
		page03()
	} else if (i === 3) {
		new Vue({
			el: '#contenu-page',
			template: '<Page04 />',
			components: { Page04 }
		})
	}
}
