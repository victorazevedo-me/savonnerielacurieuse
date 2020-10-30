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
				<h3 id="creation-savon">Création du savon Fanny</h3>

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
					<h3 id="la-saponification">La saponification</h3>
					<p>
						La saponification est la réaction chimique qui
						transforme :
						<span
							>huile &#43; soude &#8594; savon &#43;
							glycérine</span
						>
						Il ne reste aucune trace de soude dans un savon "fini".
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
import fabrication from '../scripts/fabrication'
import {
	dom,
	isScrolledIntoView,
	overlayPosition
} from '../scripts/pageControl'

export default Vue.extend({
	template: '<VueFooter/>',
	components: { VueFooter },

	mounted: function() {
		overlayPosition('.grosseballe', '.expliquation', 500)

		new SimpleParallax(dom('.grosseballe')!, {
			delay: 0.6,
			scale: 1.6,
			transition: 'cubic-bezier(0.19, 1, 0.22, 1)',
			overflow: true
		})

		ScrollReveal().reveal('.semi-titre .ballon', {
			duration: 2000,
			scale: 0.8
		})

		fabrication()
	}
})
</script>
