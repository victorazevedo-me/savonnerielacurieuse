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

            <div class="calendrier">

                <div
                    class="item"
                    v-bind:key='item.nom'
                    v-for='item in events'>

                    <h3>{{ item.mois }}</h3>
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
            boutiques: json.disponible.boutique,
            marches: json.disponible.marche,
            events: json.events,
            contact: json.contact
        })
    })

</script>