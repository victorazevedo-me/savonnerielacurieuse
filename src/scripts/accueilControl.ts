import SimpleParallax from 'simple-parallax-js'
import Reveal from 'scrollreveal'
import { dom } from '../scripts/pageControl'

export function accueilSwipe(u: string, i: number, lasti?: number) {
	let url = u.replace('/', '')

	function moveBackgrounds() {
		// init vals
		const wrapper = document.querySelector('.background-wrapper')!
		const current = wrapper.querySelector('.background-wrapper div')!
		const next = document.createElement('div')

		next.classList.add('background', url)
		current.classList.add('fadeout')
		wrapper.appendChild(next)

		document.body.style.overflowY = 'none'

		setTimeout(() => {
			current.remove()
			next.classList.add('front')
			document.body.style.overflowY = 'scroll'
		}, 1200)
	}

	function updateTitle() {
		const texts = [
			{
				titre: ['Savonnerie', 'La Curieuse'],
				soustitre: 'création de savons écologiques'
			},
			{ titre: ['la saponification', 'à froid'], soustitre: '' },
			{ titre: ['César et les', 'savons doux'], soustitre: '' },
			{ titre: ['Où les', 'trouver ?'], soustitre: '' },
			{ titre: ['Contact', '& faq'], soustitre: '' }
		]

		const soustitre = document.querySelector('.titre p')!

		function addText(): void {
			document.querySelectorAll('.titre h1 span')!.forEach((span, j) => {
				span.innerHTML = texts[i].titre[j]
			})
			soustitre.innerHTML = (texts[i].soustitre ? texts[i].soustitre : '')
		}

		Reveal().reveal('.titre', {
			origin: (lasti && lasti < i ? 'left' : 'right'),
			duration: 600,
			easing: 'ease-out',
			distance: '-100px'
		})

		addText()
	}

	moveBackgrounds()
	updateTitle()
}
