const dom = (query: string) => document.querySelector(query)

function isScrolledIntoView(query: string) {
	const element = document.querySelector(query)

	if (element) {
		const rect = element.getBoundingClientRect()
		return rect.top >= 0 && rect.bottom <= window.innerHeight
	} else {
		throw Error(query + ' not found')
	}
}

export function fabricationScroll() {
	//init consts
	const etapdesc = document.getElementById('etape-desc')!
	const allimgs = document.querySelectorAll('#imgwrap img')!
	let lastcount = 0
	let wait = false

	function scroll(count: number) {
		const imgwrap = document.getElementById('imgwrap')

		if (imgwrap) {
			let width = imgwrap.children[0].clientWidth
			let margin = 40
			let toscroll = (width + margin) * count

			//scroll
			imgwrap.style.transform = `translateX(${-toscroll}px)`

			//focus
			imgwrap.children[count].className = 'focused'
			imgwrap.children[lastcount].className = ''

			//description
			const parafs = etapdesc.querySelectorAll('p')
			parafs[lastcount].setAttribute('style', 'opacity: 0; z-index: 4')
			parafs[count].setAttribute('style', 'opacity: 1; z-index: 5')

			//
			lastcount = count
			setTimeout(() => (wait = false), 1000)
		} else {
			autoDefil.kill()
		}
	}

	function setMaxDescHeight() {
		let maxHeight = 0

		document.querySelectorAll('#etape-desc p').forEach(item => {
			if (item.clientHeight > maxHeight) maxHeight = item.clientHeight
		})

		etapdesc.style.height = maxHeight + 'px'
	}

	const autoDefil = {
		id: 0,
		time: 8000,

		start: () => {
			//apply .inner animation
			dom('#timer .inner')?.animate(
				[{ width: '0px' }, { width: '100%' }],
				{
					duration: autoDefil.time,
					easing: 'linear',
					iterations: allimgs.length
				}
			)

			//then scroll with interval
			autoDefil.id = setInterval(function() {
				if (lastcount < allimgs.length - 1) {
					scroll(lastcount + 1)
				}
			}, autoDefil.time)
		},

		kill: () => {
			clearInterval(autoDefil.id)
			dom('#timer')?.classList.add('hidden')
		}
	}

	//initial functions
	setMaxDescHeight()

	//défile auto par defaut
	let stopScroll = false
	dom('#contenu-page.deux')?.addEventListener('wheel', () => {
		if (isScrolledIntoView('#imgwrap') && !stopScroll) {
			autoDefil.start()
			stopScroll = true
		}
	})

	//click events
	allimgs.forEach((item, i) => {
		item.addEventListener('click', function() {
			autoDefil.kill()

			//anim wait
			//& upper bound
			if (!wait && i < allimgs.length - 1) {
				//appuie sur image principale = avance
				scroll(lastcount === i ? i + 1 : i)
				wait = true
			}
		})
	})
}

export default fabricationScroll
