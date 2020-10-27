<template>
	<div id="editor">
		<div class="window">
			<div>
				<button>&times;</button>
			</div>

			<div class="inputs">
				<input
					v-for="(elem, i) in test.item"
					:key="i"
					type="text"
					placeholder="Texte à écrire"
					v-model="listeItem[i]"
				/>
			</div>

			<div class="options">
				<button class="suppr">supprimer</button>
				<button class="modif">mettre à jour</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	props: ['test'],

	data: function() {
		return {
			listeItem: this.test.item
		}
	},

	methods: {}
})
</script>

<style lang="scss" scoped>
#editor {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 8;
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: brightness(0.4);

	input,
	button {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: 20px;
	}

	.window {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: white;
		border-radius: 20px;
		padding: 2em;

		.inputs {
			display: flex;
			flex-direction: column;
			margin: 1em;
			width: 80%;

			input {
				border: 1px solid #ddd;
				border-radius: 1em;
				padding: 5px 20px;
				margin: 1em 0;
			}
		}

		.options {
			button {
				margin: 0 1em;
				padding: 5px;
				min-width: 200px;
				border: 1px solid #111;

				&.suppr {
					color: hsl(357, 75%, 51%);
					border: 1px solid hsl(357, 75%, 51%);
				}
				&.modif {
				}
			}
		}
	}
}
</style>
