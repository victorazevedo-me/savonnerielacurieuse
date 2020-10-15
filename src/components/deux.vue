<template>
	<section id="contenu-page" class="page deux">
		<div class="sap-description">
			<div class="semi-titre">
				<div class="ballon"></div>
				<h2>La saponification à froid</h2>
			</div>

			<p class="introduction">
				Cette méthode de fabrication artisanale garantit la présence de
				glycérine dans le savon et permet de conserver une grande partie
				des propriétés bienfaisantes des huiles, beurres et huiles
				essentielles utilisés. C'est une méthode écologique dont le
				procédé de fabrication est sobre en énergie.
			</p>
		</div>

		<div class="deux-colonnes">
			<div class="fabrication">
				<h3>Création du savon Fanny</h3>

				<div id="imgwrap">
					<img
						src="../images/fabrication/bain_mari.jpg"
						alt="bain mari"
						draggable="false"
						class="focused"
					/>
					<img
						src="../images/fabrication/pesee.jpg"
						alt="pesee"
						draggable="false"
					/>
					<img
						src="../images/fabrication/melange.jpg"
						alt="melange"
						draggable="false"
					/>
					<img
						src="../images/fabrication/surgraissage.jpg"
						alt="surgraissage"
						draggable="false"
					/>
					<img
						src="../images/fabrication/mixeur.jpg"
						alt="mixeur"
						draggable="false"
					/>
					<img
						src="../images/fabrication/petales.jpg"
						alt="petales"
						draggable="false"
					/>
					<img
						src="../images/fabrication/coulee.jpg"
						alt="coulee"
						draggable="false"
					/>
					<img
						src="../images/fabrication/deco.jpg"
						alt="deco"
						draggable="false"
					/>
					<img
						src="../images/fabrication/decoupe.jpg"
						alt="decoupe"
						draggable="false"
					/>
					<img
						src="../images/fabrication/armoire.jpg"
						alt="armoire"
						draggable="false"
					/>
				</div>

				<div id="timer">
					<div class="inner"></div>
				</div>

				<div class="fabr-text">
					<div id="etape-desc">
						<p>
							Les beurres de coco et de karité fondent doucement
							au bain-marie. Température: 35°C - 40°C.
						</p>
						<p>
							En attendant, je pèse les huiles essentielles et le
							macérât de calendula qui sera ajouté en
							surgraissage.
						</p>
						<p>
							J'incorpore la solution de soude préparée en amont
							avec les huiles et les beurres fondus. Le processus
							de saponification commence.
						</p>
						<p>Méthode ancestrale d'accord, mais avec mixeur.</p>
						<p>
							La pâte épaissit et forme une trace. C'est le moment
							d'ajouter les huiles essentielles et le macérât.
						</p>
						<p>
							Après un dernier tour de mixeur j'ajoute quelques
							pétales de calendula pour faire joli !
						</p>
						<p>La pâte est coulée dans le grand moule chemisé.</p>
						<p>
							Quelques pétales de plus ! Le moule sera ensuite
							isolé thermiquement pendant 24 à 48h.
						</p>
						<p>
							Le pain de savon est démoulé puis coupé en tranches.
						</p>
						<p>
							Ils sècheront durant 4 à 6 semaines dans l'armoire
							de cure.
						</p>
					</div>
				</div>
			</div>

			<div class="expliquation">
				<div>
					<h3>La saponification</h3>
					<p>
						La saponification est la réaction chimique qui
						transforme : huile + soude => savon + glycérine Il ne
						reste aucune trace de soude dans un savon "fini".
					</p>
				</div>

				<div>
					<h3>Le surgras</h3>
					<p>
						En cours de fabrication, j'enrichis mes savons d'huiles
						aux vertus apaisantes, régénérantes, et nourrissantes.
						Ces huiles, ajoutées aux corps gras déjà saponifiés
						viennent sur-graisser le savon. Un savon surgras est un
						savon qui ne se contente pas de laver, il permet aussi
						au film hydrolipidique de la peau de se restaurer plus
						rapidement.
					</p>
				</div>

				<div class="grosseballe"></div>
			</div>
		</div>

		<VueFooter />
	</section>
</template>
<script lang="ts">
import Vue from 'vue'
import VueFooter from './footer.vue'
import ScrollReveal from 'scrollreveal'
import SimpleParallax from 'simple-parallax-js'
import {
	dom,
	isScrolledIntoView,
	overlayPosition,
} from '../scripts/pageControl'

export default Vue.extend({
	template: '<VueFooter/>',
	components: { VueFooter },

	mounted: function () {
		overlayPosition('.grosseballe', '.expliquation', 500)

		new SimpleParallax(dom('.grosseballe')!, {
			delay: 0.6,
			scale: 1.6,
			transition: 'cubic-bezier(0.19, 1, 0.22, 1)',
			overflow: true,
		})

		ScrollReveal().reveal('.semi-titre .ballon', {
			duration: 2000,
			scale: 0.8,
		})

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
				parafs[lastcount].setAttribute(
					'style',
					'opacity: 0; z-index: 4'
				)
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

			document.querySelectorAll('#etape-desc p').forEach((item) => {
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
						iterations: allimgs.length,
					}
				)

				//then scroll with interval
				autoDefil.id = setInterval(function () {
					if (lastcount < allimgs.length - 1) {
						scroll(lastcount + 1)
					}
				}, autoDefil.time)
			},

			kill: () => {
				clearInterval(autoDefil.id)
				dom('#timer')?.classList.add('hidden')
			},
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
			item.addEventListener('click', function () {
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
	},
})
</script>