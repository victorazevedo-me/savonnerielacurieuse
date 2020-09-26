<template>
    <section id="contenu-page" class="page quatre">

        <div class="semi-titre">
            <div class="ballon"></div>
            <h2>Boutiques, marchés & autre</h2>
        </div>

        <div class="deux-colonnes">

            <div class="left">

                <h3>Les Boutiques</h3>
                
                <div id="vue-boutiques">
                    <boutique-item
                        
                        v-for="item in boutiques"
                        :key="item.nom"
                        :nom="item.nom"
                        :adresse="item.adresse"
                    ></boutique-item>
                </div>

            </div>

            <div class="right">

                <div>
                    <h3>Les marchés</h3>

                    <div id="vue-marches">
                        <marche-item
                            v-for="item in marches"
                            :key="item.nom"
                            :nom="item.nom"
                            :coord="item.coord"
                            :activite="item.activite"
                            :note="item.note"
                        ></marche-item>
                    </div>
                </div>

                <div>
                    <h3>Directement à la savonnerie</h3>
                
                    <div class="item">
                        <p>assurez vous de la disponibilité de la savonnerie 24h à l'avance</p>
                    </div>
                
                    <div class="item contact">
                        <p>Valérie Cartailler</p>
                        <p>rue du Château 63120 Vollore-Ville</p>
                        <p>savonnerielacurieuse@gmail.com</p>
                        <p>06 43 69 39 67</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="semi-titre">
            <div class="ballon"></div>
            <h2 id="evenements">Evénements 2020</h2>
        </div>

        <div class="calendrier">

            <div class="item">
                <h3>août</h3>
                <p>samedi 18 & dimanche 19</p>
                <p><strong>Blabla bla</strong></p>
                <p>place du Bio, Bioville 33000</p>
            </div>

            <div class="item">
                <h3>août</h3>
                <p>samedi 18 & dimanche 19</p>
                <p><strong>Blabla bla</strong></p>
                <p>place du Bio, Bioville 33000</p>
            </div>

            <div class="item">
                <h3>août</h3>
                <p>samedi 18 & dimanche 19</p>
                <p><strong>Blabla bla</strong></p>
                <p>place du Bio, Bioville 33000</p>
            </div>

            <div class="item">
                <h3>août</h3>
                <p>samedi 18 & dimanche 19</p>
                <p><strong>Blabla bla</strong></p>
                <p>place du Bio, Bioville 33000</p>
            </div>

            <div class="item">
                <h3>août</h3>
                <p>samedi 18 & dimanche 19</p>
                <p><strong>Blabla bla</strong></p>
                <p>place du Bio, Bioville 33000</p>
            </div>

        </div>
        <VueFooter />
    </section>
</template>
<script lang="ts">

    import Vue from 'vue';
    import VueFooter from './footer.vue';
    import '../scripts/disponible';

    export default Vue.extend({
        template: '<VueFooter/>',
        components: { VueFooter }
    })
</script>