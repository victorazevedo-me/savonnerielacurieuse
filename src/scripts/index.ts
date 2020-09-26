import acceuilControl from './accueilControl';
import fabricationScroll from './fabrication';
import Vue from 'vue';
import Page01 from '../components/page-un.vue';
import Page02 from '../components/page-deux.vue';
import Page03 from '../components/page-trois.vue';
import Page04 from '../components/page-quatre.vue';
Vue.config.productionTip = false


function openPage(which: number) {

    const params = [
        {url: "/la-savonnerie", title: "La savonnerie"},
        {url: "/la-saponification", title: "La saponifiaction"},
        {url: "/les-savons", title: "Les savons"},
        {url: "/ou-les-trouver", title: "Où les trouver"},
    ]

    const main = document.querySelector('main')!;
    document.querySelector('#transition-overlay')?.classList.add('animate');

    setTimeout(() => {

        window.history.pushState("localhost:1234", params[which].title, params[which].url);

        if (which === 0) {
            new Vue({el: "#contenu-page", template: '<Page01 />', components: { Page01 }})
        } else if (which === 1) {
            new Vue({el: "#contenu-page", template: '<Page02 />', components: { Page02 }})
        } else if (which === 2) {
            new Vue({el: "#contenu-page", template: '<Page03 />', components: { Page03 }})
        } else if (which === 3) {
            new Vue({el: "#contenu-page", template: '<Page04 />', components: { Page04 }})
        }

        document.body.style.overflowY = "auto"
    }, 1000)
}

function customCursor() {
    
    // const cursor = document.querySelector('#cursor')!;
    // const width = cursor.scrollWidth;

    // document.addEventListener('mousemove', (e) => {
    //     cursor.setAttribute('style', `top: ${e.pageY - width / 2}px; left: ${e.pageX - width / 2}px`)
    // })
}

function overlayPosition(overlay: string, targetElem: string, posY: number):void {

    const bodyTop = document.body.getBoundingClientRect().top;
    const elemTop = document.querySelector(targetElem)!.getBoundingClientRect().top;
    const overlayDOM = (<HTMLElement>document.querySelector(overlay));

    overlayDOM.style.top = `${(elemTop - bodyTop) + (posY - overlayDOM.offsetHeight / 2)}px`
}

window.onload = function() {

    let isPageExpanded = false

    // if (window.location.pathname === "/index.html" ||
    // window.location.pathname === "/") {

        acceuilControl()

        document.body.addEventListener('wheel', function(ev: any) {

            if (!isPageExpanded && ev.wheelDelta < 0) {
                isPageExpanded = true
                openPage(2)
            }
        })
        
    // }
    if (window.location.pathname === "/la-saponification") {
        fabricationScroll()
        overlayPosition('.grosseballe', '.expliquation', 500)
    }
    else if (window.location.pathname === "/la-savonnerie") {
        openPage(2)
    }
}