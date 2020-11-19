<template>
	<div id="editor">
		<div class="window">
			<div class="fermer">
				<button @click="cancelAndReset">&times;</button>
			</div>

			<div
				class="inputs"
				v-for="(elem, i) in test.item"
				:key="i"
				ref="inputs"
				:placeholder="i"
			>
				<h4>{{ i }}</h4>
				<textarea v-model="listeItem[i]"></textarea>
			</div>

			<div class="options">
				<button class="suppr" @click="suppr">supprimer</button>
				<button class="new" @click="newElement">nouveau</button>
				<button class="modif" @click="submit">mettre à jour</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	props: ['test'],

	data() {
		return {
			backup: {},
			listeItem: this.test.item,
			parent: this.test.liste
		}
	},

	created() {
		this.backup = { ...this.listeItem }
	},

	methods: {
		closeEditor() {
			document.querySelector('#editor')!.remove()
		},

		cancelAndReset: function() {
			Object.assign(this.listeItem, this.backup)
			this.closeEditor()
		},

		submit() {
			this.closeEditor()
		},

		suppr() {
			console.log()
			this.$data.parent.pop(this.listeItem)
		},

		newElement() {
			this.$data.parent.push(this.listeItem)
			console.log(this.$data)
		}
	}
})
</script>

<style lang="scss" scoped>
#editor {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 12;
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: brightness(0.3);

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
		padding: 1em;

		.fermer {
			width: 100%;
			text-align: right;
			button {
				font-size: 30px;
			}
		}

		.inputs {
			display: flex;
			flex-direction: column;
			margin: 10px 40px;
			width: calc(100% - 80px);

			h4 {
				margin: 0;
				text-transform: capitalize;
			}

			textarea {
				font-size: 16px;
				resize: vertical;
				border: none;
				padding: 10px;
			}
		}

		.options {
			padding: 1em;

			button {
				margin: 0 1em;
				padding: 5px 20px;
				font-size: 16px;

				&.suppr {
					background: hsl(357, 75%, 51%);
					color: white;
				}
				&.new {
					background: hsl(187, 71%, 34%);
					color: white;
				}
				&.modif {
					background: hsl(128, 71%, 34%);
					color: white;
				}
			}
		}
	}
}
</style>
