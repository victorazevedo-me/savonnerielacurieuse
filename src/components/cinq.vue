<template>
    <section id="contenu-page" class="page cinq">
        

        <div class="contact-infos">

            <div class="semi-titre">
                <div class="ballon"></div>
                <h2>Contact</h2>
            </div>

            <div>
                <p>{{ contact.adresse }}</p>
                <p>{{ contact.email }}</p>
                <p>{{ contact.telephone }}</p>
            </div>
        </div>
        
        <div class="faq">
            <div class="semi-titre">
                <div class="ballon"></div>
                <h2>Foire aux Questions</h2>
            </div>

            <div class="faq-liste">
                <div v-for="(bloc, i) in faqs" :key="i">
                    <h3>{{ bloc.question }}</h3>
                    <p>{{ bloc.reponse }}</p>
                </div>
            </div>
        </div>

        <VueFooter />
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import VueFooter from './footer.vue'
import json from '../scripts/database'
export default Vue.extend({

    template: '<VueFooter/>',
	components: { VueFooter },

    data: () => ({
        contact: json.contact,
        faqs: json.faq
    })
})
</script>