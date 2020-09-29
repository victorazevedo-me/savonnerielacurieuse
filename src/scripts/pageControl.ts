import Vue from 'vue';
import Index from '../components/index.vue';
import Page01 from '../components/page-un.vue';
import Page02 from '../components/page-deux.vue';
import Page03 from '../components/page-trois.vue';
import Page04 from '../components/page-quatre.vue';
import fabricationScroll from './fabrication';

function overlayPosition(overlay: string, targetElem: string, posY: number):void {

    const bodyTop = document.body.getBoundingClientRect().top;
    const elemTop = document.querySelector(targetElem)!.getBoundingClientRect().top;
    const overlayDOM = (<HTMLElement>document.querySelector(overlay));

    overlayDOM.style.top = `${(elemTop - bodyTop) + (posY - overlayDOM.offsetHeight / 2)}px`
}

export enum PageEventOrigin { initialisation, homeScrollDown, pageScrollUp, headerLogo }

export function openPage(which: PageEventOrigin, index?: number) {

    const path = {
        
        pages: [{
            url: "/la-savonnerie",
            title: "La savonnerie",
            funcs: []
        },{
            url: "/la-saponification",
            title: "La saponification",
            funcs: [
                fabricationScroll,
                () => overlayPosition('.grosseballe', '.expliquation', 500)
            ]
        },{
            url: "/les-savons",
            title: "Les savons",
            funcs: [
                () => overlayPosition('.grosseballe', '.en-parlent', 500)
            ]
        },{
            url: "/ou-les-trouver",
            title: "Où les trouver",
            funcs: []
        }],

        homepage: {
            url: "/#",
            title: "Homepage",
            funcs: []
        }
    }

    const appendPage = (i?: number) => {

        //are pages
        if (typeof(i) === 'number') {

            //append vue pages
            if (i === 0) {
                new Vue({el: "#contenu-page", template: '<Page01 />', components: { Page01 }})
            } else if (i === 1) {
                new Vue({el: "#contenu-page", template: '<Page02 />', components: { Page02 }})
            } else if (i === 2) {
                new Vue({el: "#contenu-page", template: '<Page03 />', components: { Page03 }})
            } else if (i === 3) {
                new Vue({el: "#contenu-page", template: '<Page04 />', components: { Page04 }})
            }
            
            //call opening functions
            if (path.pages[i].funcs && path.pages[i].funcs?.length > 0) {
                path.pages[i].funcs.forEach(fcn => fcn())
            }
        }

        //is homepage
        else {        
            new Vue({el: "#contenu-accueil", template: '<Index />', components: { Index }})
        }
    }

    if (which === PageEventOrigin.initialisation) {

        let noPathMatch = true

        path.pages.forEach((p, i) => {
            if (window.location.pathname === p.url) {

                noPathMatch = false
                appendPage(i)

                //changeStyle.bodyOverflow(true)
                //changeStyle.nav.isHeader(true)
            }
        })

        if (noPathMatch) appendPage()
    }
    else if (which === PageEventOrigin.homeScrollDown) {
        appendPage(index)
    }
    else if (which === PageEventOrigin.headerLogo) {
        appendPage()
    }
}

export default openPage