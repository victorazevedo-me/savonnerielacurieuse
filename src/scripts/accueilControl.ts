import Reveal from 'scrollreveal'
import { dom } from '../scripts/pageControl'

export function accueilSwipe(i: number, lasti?: number) {
	function moveBackgrounds() {
		// init vals
		const wrapper = document.querySelector('.background-wrapper')!
		const current = wrapper.querySelector('.background-wrapper div')!
		const next = document.createElement('div')

		next.classList.add('background', 'bg' + i)
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
			[['Savonnerie', 'La Curieuse'], ['création de savons écologiques']],
			[['la saponification', 'à froid'], ['']],
			[['César et les', 'savons doux'], ['']],
			[['Où les', 'trouver ?'], ['']],
			[['Contact', '& faq'], ['']]
		]

		//for 'above' & 'below' titles
		//add title & subtitle
		dom('.titre h1')!.innerHTML = texts[i][0].reduce(
			(a, b) => `${a}<br />${b}` //add line break
		)
		dom('.titre p')!.innerHTML = texts[i][1][0]

		Reveal().reveal('.titre', {
			origin: lasti && lasti < i ? 'left' : 'right',
			duration: 600,
			easing: 'ease-out',
			distance: '-100px'
		})
	}

	moveBackgrounds()
	updateTitle()
}
