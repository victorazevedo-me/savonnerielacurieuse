export function fabricationScroll() {
	//init consts
	const etapdesc = document.getElementById('etape-desc')!
	const allimgs = document.querySelectorAll('#imgwrap img')!
	let lastcount = 0
	let wait = false

	function scroll(count: number) {
		const imgwrap = document.getElementById('imgwrap')!
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

		start: () => {
			autoDefil.id = setInterval(function() {
				if (lastcount < allimgs.length - 1) {
					scroll(lastcount + 1)
				} else {
					autoDefil.kill()
				}
			}, 8000)
		},

		kill: () => {
			clearInterval(autoDefil.id)
			document.querySelector('#timer')?.classList.add('hidden')
		}
	}

	//initial functions
	setMaxDescHeight()

	//défile auto par defaut
	autoDefil.start()

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
