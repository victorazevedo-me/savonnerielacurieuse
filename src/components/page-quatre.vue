<template>
    <section id="contenu-page" class="page quatre">

        <div>
            <div class="semi-titre">
                <div class="ballon"></div>
                <h2>Boutiques, marchés & autre</h2>
            </div>

            <div class="deux-colonnes">

                <div class="left">

                    <h3>Les Boutiques</h3>
                    
                    <div id="vue-boutiques">
                        <div class="item"
                            v-bind:key='item.nom'
                            v-for='item in boutiques'>

                            <h4>{{ item.nom }}</h4>
                            <p>{{ item.adresse }}</p>
                        </div>
                    </div>
                </div>

                <div class="right">

                    <div>
                        <h3>Les marchés</h3>

                        <div id="vue-marches">
                            <div 
                            class="item"
                            v-bind:key='item.nom'
                            v-for='item in marches'>

                                <h4>{{ item.nom }}</h4>
                                <p>{{ item.coord }}, {{ item.activite }}</p>
                                <p><small>{{ item.note }}</small></p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Directement à la savonnerie</h3>
                    
                        <div class="item">
                            <p>assurez vous de la disponibilité de la savonnerie 24h à l'avance</p>
                        </div>
                    
                        <div class="item contact">
                            <p>Valérie Cartailler</p>
                            <p>{{ contact.adresse }}</p>
                            <p>{{ contact.email }}</p>
                            <p>{{ contact.telephone }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>

            <div class="semi-titre">
                <div class="ballon"></div>
                <h2 id="evenements">Evénements</h2>
            </div>

            <div class="filters">
                <button v-bind:key='mois.indexOf(m)'
                v-for='m in mois' v-on:click='showMonths(mois.indexOf(m), m)'>{{ m }}</button>
            </div>

            <div class="calendrier" v-if='shouldShowMonths'>

                <div
                    class="item"
                    v-bind:key='item.nom'
                    v-for='item in events'>

                    <p>{{ item.date }}</p>
                    <p>{{ item.horaire }}</p>
                    <p><strong>{{ item.nom }}</strong></p>
                    <p>{{ item.coord }}</p>
                    <p>{{ item.note }}</p>
                </div>
            </div>
        </div>

        <VueFooter />

    </section>
</template>
<script lang="ts">

    import Vue from 'vue';
    import VueFooter from './footer.vue';
    import json from '../scripts/database';

    export default Vue.extend({

        template: '<VueFooter/>',
        components: { VueFooter },

        data: () => ({
            shouldShowMonths: false,
            boutiques: json.disponible.boutique,
            marches: json.disponible.marche,
            events: [{}],
            contact: json.contact,
            mois: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
        }),

        methods: {

            setActiveButton: (index: number) => {
                const buttons = document.querySelectorAll('.filters button')
                
                buttons.forEach((button, i) => {

                    if (i === index) {
                        button.classList.add('selected')
                    } else {
                        button.classList.remove('selected')
                    }
                })
            },

            showMonths: function(index: number, m: string) {

                this.setActiveButton(index)

                let eventsToShow = []

                for (let event of json.events) {
                    if (event.mois === m.toLowerCase()) {
                        eventsToShow.push(event)
                    }
                }
                
                if (eventsToShow.length > 0) {
                    this.events = eventsToShow
                    this.shouldShowMonths = true
                } else {
                    this.shouldShowMonths = false
                }

                console.log(this.shouldShowMonths)
            }
        },

        mounted: function() {
            //init clickable months

            const d = new Date
            this.setActiveButton(d.getMonth())

        }
    })

</script>