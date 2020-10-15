import Vue from 'vue'
import PageUpdate from '../components/update.vue'

window.onload = function() {
    new Vue({
        el: '#contenu',
        template: '<PageUpdate />',
        components: { PageUpdate }
    })
}