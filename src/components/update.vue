<template>
    
    <div>
        <h2>Contact</h2>
        <input type="text" v-model="json.contact.email">

        <h2>Disponible</h2>
        <h3>Boutiques</h3>
        <div class="update-liste">
            <div class="form-wrap" v-for="(bout, i) in json.disponible.boutique" :key="i">
                <input type="text" v-model="bout.nom" placeholder="nom">
                <input type="text" v-model="bout.adresse" placeholder="adresse">
                <input type="text" v-model="bout.infos" placeholder="infos">
                
                <div>
                    <button v-on:click="donneesNew(bout, i, 'boutique')">modifier</button>
                    <button v-on:click="donneesSuppr()" class="suppr">supprimer</button>
                </div>
            </div>
        </div>
    
        <h3>Marchés</h3>
        <div class="update-liste">
            <div class="form-wrap" v-for="(march, i) in json.disponible.marche" :key="i">
                <input type="text" v-model="march.nom" placeholder="Nom">
                <input type="text" v-model="march.coord" placeholder="adresse">
                <input type="text" v-model="march.activite" placeholder="heure d'activité">
                <input type="text" v-model="march.note" placeholder="note">
                <button>modifier</button>
            </div>
        </div>

        <h2>Foire aux Questions</h2>
        <input type="text" v-model="json.faq[0].question">

    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Json from '../scripts/database'
export default Vue.extend({
    data: () => ({
        json: Json,
        test: ''
    }),

    methods: {

        donneesNew: (input: any, index: number, cat: string) => {
            const response = JSON.parse(JSON.stringify(input))
        },

        donneesSuppr: (index: number, cat: string) => {
            console.log('supprimé')
        }
    },

    mounted: () => {
        console.log(Json)
    }
})
</script>
<style lang="scss">

    .update-liste {
        display: flex;
        flex-wrap: wrap;

    }

    .form-wrap {
        display: flex;
        flex-direction: column;
        margin: 1em 0;

        button {
            margin: 20px 0 0 40px;
            max-width: 120px;
            background-color: #ffdd80;

            &.suppr {
                background-color: lightcoral;
            }
        }

         input {
            max-width: 100%;
            padding: 5px 40px;
            opacity: .8;

            &:hover {
                opacity: 1;
            }
        }
    }

   

    input,
    button {
        font-size: 20px;
    }
</style>