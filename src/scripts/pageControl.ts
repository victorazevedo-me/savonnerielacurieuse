import Vue from 'vue'
import Page01 from '../components/page-un.vue'
import Page02 from '../components/page-deux.vue'
import Page03 from '../components/page-trois.vue'
import Page04 from '../components/page-quatre.vue'

// function overlayPosition(
// 	overlay: string,
// 	targetElem: string,
// 	posY: number
// ): number {
// 	const bodyTop = document
// 		.querySelector('#contenu-page')!
// 		.getBoundingClientRect().top
// 	const elemTop = document.querySelector(targetElem)!.getBoundingClientRect()
// 		.top
// 	const overlayDOM = <HTMLElement>document.querySelector(overlay)

// 	const result = elemTop - bodyTop + (posY - overlayDOM.offsetHeight / 2)
// 	overlayDOM.style.top = `${result}px`

// 	return result
// }

export function openPage(i: number) {
	//append vue pages
	if (i === 0) {
		new Vue({
			el: '#contenu-page',
			template: '<Page01 />',
			components: { Page01 }
		})
	} else if (i === 1) {
		new Vue({
			el: '#contenu-page',
			template: '<Page02 />',
			components: { Page02 }
		})
	} else if (i === 2) {
		new Vue({
			el: '#contenu-page',
			template: '<Page03 />',
			components: { Page03 }
		})
	} else if (i === 3) {
		new Vue({
			el: '#contenu-page',
			template: '<Page04 />',
			components: { Page04 }
		})
	}
}
