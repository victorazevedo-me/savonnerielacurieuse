import images from '../images/accueil/*.jpg'
import anime from 'animejs'
import { $, $$, setCss } from '../scripts/pageControl'

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

	const wrapper = $('.background-wrapper')!
	const current = $('.background-wrapper div')!
	const next = document.createElement('div')
	const imagesArray = [
		images.accueil,
		images.saponification,
		images.savons,
		images.disponible,
		images.contact
	]

	const img = new Image()
	img.onload = () => {
		anime({
			targets: current,
			opacity: 0,
			duration: 1200,
			easing: 'easeInOutCubic'
		})
		next.classList.add('background')
		setCss(next, `background-image: url(${imagesArray[i]})`)
		wrapper.appendChild(next)

		setTimeout(() => {
			current.remove()
			next.classList.add('front')
		}, 1200)
	}

	img.src = imagesArray[i]
	if (img.complete) img.addEventListener('load', () => {})

	const titre = document.createElement('h1')
	const soustitre = document.createElement('p')

	//add text
	titre.innerHTML = texts[i][0].reduce(
		(a, b) => `${a}<br />${b}` //add line break
	)
	soustitre.innerHTML = texts[i][1][0]

	//add animations
	const dir = findLastIndex() < i ? 50 : -50

	anime({
		targets: ['.titre h1', '.titre p'],
		opacity: [{ value: 0, duration: 400, easing: 'linear' }],
		translateX: [
			{
				value: -50,
				duration: 1200,
				easing: 'easeOutCubic'
			}
		],

		complete() {
			//set new elements
			$('.titre h1')?.remove()
			$('.titre p')?.remove()

			$('.titre')?.appendChild(titre)
			$('.titre')?.appendChild(soustitre)

			anime({
				targets: [titre, soustitre],
				opacity: [
					{ value: 0, duration: 0, delay: 0 },
					{
						value: 1,
						duration: 500,
						easing: 'linear',
						delay: anime.stagger(400)
					}
				],
				translateX: [
					{
						value: dir,
						duration: 0,
						delay: 0
					},
					{
						value: 0,
						duration: 2000,
						easing: 'easeOutElastic',
						delay: anime.stagger(400)
					}
				]
			})
		}
	})
}
