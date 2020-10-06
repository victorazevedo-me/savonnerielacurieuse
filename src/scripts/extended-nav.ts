export function navDisplayedImage(): void {
	//A changer (evidemment)

	const baseUrl =
		'https://raw.githubusercontent.com/victorazevedo-me/savonnerielacurieuse/master/src/images/nav/'
	const images = [
		'suggestion.jpg',
		'cure.jpg',
		'feuilles.jpg',
		'chignore.jpg'
	]
	const navliste = document.querySelectorAll('.nav-liste li')!
	const presentation = document.querySelector('.presentation-images')!
	const leftDisplay = document.querySelector('.left-display')!
	let waitForAnimation = false
	let lastHover = 0
	let hoverTimeout = 0

	navliste.forEach((li, i) => {
		li.addEventListener('mouseover', () => {
			if (lastHover !== i && images.length > i) {
				if (waitForAnimation) {
					clearTimeout(hoverTimeout)
				}

				lastHover = i
				waitForAnimation = true

				const currentPoster = presentation.querySelector('img')!
				const newPoster = document.createElement('img')!
				newPoster.src = baseUrl + images[i]

				currentPoster.classList.replace('in', 'out')

				hoverTimeout = setTimeout(() => {
					leftDisplay.className = 'left-display presente'

					currentPoster.remove()
					presentation.appendChild(newPoster)
					waitForAnimation = false

					setTimeout(() => newPoster.classList.add('in'), 50)
				}, 500)
			} else if (lastHover !== i && i === 4) {
				lastHover = i
				presentation
					.querySelector('img')!
					.classList.replace('in', 'out')

				setTimeout(() => {
					leftDisplay.className = 'left-display contacte'

					document
						.querySelectorAll('.contact-infos div p')
						.forEach(p =>
							setTimeout(() => p.classList.add('in'), 200)
						)
				}, 500)
			}
		})
	})
}
