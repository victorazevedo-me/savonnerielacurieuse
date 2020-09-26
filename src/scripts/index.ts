import pageControl from './pageControl';
import fabricationScroll from './fabrication';
import Vue from '../../node_modules/vue/dist/vue.common.dev.js';
import Page01 from '../components/page.vue';
Vue.config.productionTip = false


function openmenu() {

    let isPageExpanded = false
    const main = document.querySelector('main')!;

    document.body.addEventListener('wheel', function(ev: any) {

        if (!isPageExpanded && ev.wheelDelta < 0) {

            isPageExpanded = true
            document.querySelector('#transition-overlay')?.classList.add('animate');

            setTimeout(() => {
                new Vue({
                    el: "#contenu-page",
                    template: '<Page01/>',
                    components: { Page01 }
                })

                document.body.style.overflowY = "auto"
            }, 1000)
        }

    })

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

    if (window.location.pathname === "/index.html" ||
    window.location.pathname === "/") {
        pageControl()
        openmenu()
        //customCursor()
    }
    else if (window.location.pathname === "/page-02.html") {
        fabricationScroll()
        overlayPosition('.grosseballe', '.expliquation', 500)
    }
}