<template>
<section id="contenu-page" class="page un">
    <div class="deux-colonnes">
        <div class="slc-description">
            <div class="semi-titre">
                <div class="ballon"></div>
                <h2>La savonnerie</h2>
            </div>

            <div>
                <p>Motivée par le désir de faire partager au plus grand nombre les bienfaits d'un savon doux et écologique, je crée en mars 2016 la savonnerie La Curieuse.</p>
                <p>C'est à Vollore-Ville au cœur du parc régional Livradois-Forez que j'ai choisi de créer des savons surgras à partir du procédé de saponification à froid.</p>
            </div>
        </div>

        <div>
            <img src="../images/accueil/louise-knight.jpg">
        </div>
    </div>

    <VueFooter/>
</section>
</template>
<script lang="ts">

import Vue from 'vue';
import VueFooter from './footer.vue';

export default Vue.extend({
    template: '<VueFooter/>',
    components: { VueFooter }
})
</script>