import Vue from 'vue'
import Page01 from '../components/page-un.vue'
import Page02 from '../components/page-deux.vue'
import Page03 from '../components/page-trois.vue'
import Page04 from '../components/page-quatre.vue'
import fabricationScroll from './fabrication'
import ScrollReveal from 'scrollreveal'
import SimpleParallax from 'simple-parallax-js'

const dom = (u: string) => document.querySelector(u)

const parallaxOptions = {
	delay: 0.6,
	scale: 1.6,
	transition: 'cubic-bezier(0.19, 1, 0.22, 1)',
	overflow: true
}

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

export function openPage(i: number) {
	//append vue pages
	if (i === 0) {
		new Vue({
			el: '#contenu-page',
			template: '<Page01 />',
			components: { Page01 }
		})

		ScrollReveal().reveal('.slc-description p', {
			duration: 1000,
			delay: 100
		})
		ScrollReveal().reveal('.pres-img', {
			duration: 1000,
			delay: 1000,
			distance: '-20px'
		})
	} else if (i === 1) {
		new Vue({
			el: '#contenu-page',
			template: '<Page02 />',
			components: { Page02 }
		})

		fabricationScroll()
		overlayPosition('.grosseballe', '.expliquation', 500)

		new SimpleParallax(dom('.grosseballe')!, parallaxOptions)

		ScrollReveal().reveal('.semi-titre .ballon', {
			duration: 2000,
			scale: 0.8
		})
	} else if (i === 2) {
		new Vue({
			el: '#contenu-page',
			template: '<Page03 />',
			components: { Page03 }
		})
		overlayPosition('.en-parlent .grosseballe', '.en-parlent', 1000)

		new SimpleParallax(dom('.full-card .shadow')!, parallaxOptions)
		new SimpleParallax(dom('.savon-menager .grosseballe')!, parallaxOptions)
		new SimpleParallax(dom('.en-parlent .grosseballe')!, parallaxOptions)
	} else if (i === 3) {
		new Vue({
			el: '#contenu-page',
			template: '<Page04 />',
			components: { Page04 }
		})
	}
}
