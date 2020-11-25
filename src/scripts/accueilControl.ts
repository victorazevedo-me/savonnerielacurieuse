import images from '../images/accueil/*.jpg'
import anime from 'animejs'
import { $, setCss } from '../scripts/pageControl'

export function accueilSwipe(i: number) {
	const texts = [
		[['Savonnerie', 'La Curieuse'], ['création de savons écologiques']],
		[['la saponification', 'à froid'], ['']],
		[['César et les', 'savons doux'], ['']],
		[['Où les', 'trouver ?'], ['']],
		[['Contact', '& faq'], ['']]
	]

	const titreH1 = $('.titre h1')
	const titreP = $('.titre p')
	const titre = $('.titre')
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

	const newtitre = document.createElement('h1')
	const newsoustitre = document.createElement('p')

	//add text
	newtitre.innerHTML = texts[i][0].reduce((a, b) => `${a}<br />${b}`)
	newsoustitre.innerHTML = texts[i][1][0]

	//add animations
	const getDirection = (): number => {
		const html = titreH1!.innerHTML
		const stripped = html.replace(/<[^>]*>?/gm, ',')
		const array = stripped?.split(',')
		let res = 0

		for (let j in texts) {
			if (array[0] === texts[j][0][0]) {
				res = +j
			}
		}

		return res > i ? 1 : -1
	}
	const direction = getDirection()
	const moves = {
		out: 100 * direction,
		in: 100 * -direction
	}

	anime({
		targets: [titreH1, titreP],
		opacity: [{ value: 0, duration: 400, easing: 'linear' }],
		translateX: [
			{
				value: moves.out,
				duration: 600,
				easing: 'linear'
			}
		],

		complete() {
			//set new elements
			titreH1?.remove()
			titreP?.remove()

			titre?.appendChild(newtitre)
			titre?.appendChild(newsoustitre)

			anime({
				targets: [newtitre, newsoustitre],
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
						value: moves.in,
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
