import anime from 'animejs'
import { $, $$ } from '../scripts/pageControl'

export function accueilSwipe(i: number) {
	const texts = [
		[['Savonnerie', 'La Curieuse'], ['création de savons écologiques']],
		[['la saponification', 'à froid'], ['']],
		[['César et les', 'savons doux'], ['']],
		[['Où les', 'trouver ?'], ['']],
		[['Contact', '& faq'], ['']]
	]

	function findLastIndex() {
		const html = $('.titre h1')!.innerHTML
		const stripped = html.replace(/<[^>]*>?/gm, ',')
		const array = stripped?.split(',')

		texts.map((t, i) => {
			if (array[0] === t[0][0]) return i
		})

		return 0
	}

	function moveBackgrounds() {
		// init vals
		const wrapper = $('.background-wrapper')!
		const current = $('.background-wrapper div')!
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
		const titre = document.createElement('h1')
		const soustitre = document.createElement('p')

		//add text
		titre.innerHTML = texts[i][0].reduce(
			(a, b) => `${a}<br />${b}` //add line break
		)
		soustitre.innerHTML = texts[i][1][0]

		//add animations
		anime({
			targets: [titre, soustitre],
			opacity: [
				{ value: 0, duration: 0 },
				{
					value: 1,
					duration: 500,
					easing: 'linear'
				}
			],
			translateX: [
				{
					value: findLastIndex() < i ? 50 : -50,
					duration: 0,
					delay: 0
				},
				{
					value: 0,
					duration: 2000,
					easing: 'easeOutElastic'
				}
			],
			delay: anime.stagger(500)
		})

		//set new elements
		$('.titre h1')?.remove()
		$('.titre p')?.remove()

		$('.titre')?.appendChild(titre)
		$('.titre')?.appendChild(soustitre)
	}

	moveBackgrounds()
	updateTitle()
}
