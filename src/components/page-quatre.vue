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
                    <button 
                        v-bind:key='mois.indexOf(m)'
                        v-for='m in mois'
                        v-on:click='showMonth(mois.indexOf(m))'>
                        {{ m }}
                    </button>
            </div>

        
            <div class="calendrier" v-if='shouldShowMonths'>
                <div
                    class="item"
                    v-bind:key='item.nom'
                    v-for='item in events'>

                    <p>{{ item.date }}</p>
                    <p>{{ item.horaire }}</p>
                    <p><strong>{{ item.nom }}</strong></p>
                    <p class="cal-coord">{{ item.coord }}</p>
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
            mois: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'decembre']
        }),

        methods: {

            setActiveButton: (index: number) => {
                //toggles off all, on only one

                document.querySelectorAll('.filters button')
                .forEach((button, i) => (i === index ?
                    button.classList.add('selected') :
                    button.classList.remove('selected')))
            },

            showMonth: function(index: number) {

                this.setActiveButton(index)
                let eventsToShow = []
                const m = this.$data.mois[index]

                //add events if month corresponds
                for (let event of json.events)
                    event.mois === m ? eventsToShow.push(event) : ''

                if (eventsToShow.length > 0) {
                    this.events = eventsToShow
                } else {

                    if (m === 'janvier' || m === 'février') {
                        this.events = [{nom: "La savonniere se repose en " + m}]
                    } else {
                        this.events = [{nom: "Pas d'événements en " + m, coord: "seulement les marchés habituels"}]
                    }
                }

                this.shouldShowMonths = true
            }
        },

        mounted: function() {
            //set default month to be shown
            const index = (new Date).getMonth()
            this.setActiveButton(index)
            this.showMonth(index)

            //accentuates months with events
            document.querySelectorAll('.filters button')
            .forEach((button, i) => {
                for (let event of json.events)
                    event.mois !== this.$data.mois[i] ? '' : button.classList.add('hasEvents')
            })
        }
    })

</script>