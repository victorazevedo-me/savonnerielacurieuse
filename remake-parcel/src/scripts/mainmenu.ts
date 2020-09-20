import Vue from 'vue/dist/vue.esm.js';

Vue.component('main-menu', {
    template: `
    <div class="main-menu" v-if="seen">
        <a href="./index.html"><button>fermer</button></a>
        
        <div class="contenu">
            <ul>
                <li><a href="./index.html"><h2>Accueil</h2></a></li>
                <li><a href="./page-01.html">la savonnerie</a></li>
            </ul>
            <ul>
                <li><a href="./accueil-02.html"><h2>La saponification à froid</h2></a></li>
                <li><a href="./page-02.html">la saponification à froid</a></li>
            </ul>
            <ul>
                <li><a href="./accueil-03.html"><h2>César et les savons doux</h2></a></li>
                <li><a href="./accueil-03.html">les savons doux</a></li>
                <li><a href="./accueil-03.html">le savon ménager César</a></li>
            </ul>
            <ul>
                <li><a href="./accueil-04.html"><h2>Où les trouver ?</h2></a></li>
                <li><a href="./page-04.html">Boutiques & marchés</a></li>
                <li><a href="./page-04.html#evenements">Evenements</a></li>
            </ul>
            <ul>
                <li><a href="#"><h2>Contact</h2></a></li>
            </ul>
        </div>
    </div>`,
    props: ['seen']
})

new Vue({
    el: '#nav',
    data: {
        display: () => {
            console.log(this)
        }
    }
})