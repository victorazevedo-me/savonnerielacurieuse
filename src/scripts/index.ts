import { openPage } from './pageControl';
import { accueilSwipe } from './accueilControl';
import Index from '../components/index.vue';

import Hammer from 'hammerjs';
import Vue from 'vue';


const SITEMAP = [{
    pathname: "/la-savonnerie",
    titre: "La savonnerie"
},{
    pathname: "/la-saponification",
    titre: "La saponification"
},{
    pathname: "/les-savons",
    titre: "Les savons"
},{
    pathname: "/ou-les-trouver",
    titre: "Où les trouver"
}
];

enum PageEventOrigin { initialisation, homepageScroll, headerLogo }

const getPageIndex = (): number => {

    let result = -1;

    SITEMAP.forEach((u, i) => {
        if (u.pathname === window.location.pathname) result = i
    })

    if (result < 0) {
        console.warn(Error('URL not in the list'))
        return 0
    } else {
        return result
    }
}

function accueilEvents() {

    //Object
    const Nav = {

        dom: document.querySelector('body > nav')!,
        centerLis: document.querySelectorAll('nav .center li'),

        changeCenterFocus: (i: number) => {  
            Nav.centerLis.forEach(n => n.classList.remove('active'))
            Nav.centerLis[i].classList.add('active')
        }
    };  

    const navButtons = () => {
        
        Nav.centerLis.forEach((elem, i) => {
    
            elem.addEventListener('click', function() {
    
                const currentPage = getPageIndex()
    
                if (currentPage !== i) {
                    redirection(PageEventOrigin.homepageScroll, i);
                    Nav.changeCenterFocus(i);
                }
            })
        });
    }

    const panningScroll = () => {
        const emcee = new Hammer(document.body!);
        const swipes = ["panleft", "panright"];
        let swipeMoves = {
            max: 100,
            now: 0
        }
        
        swipes.forEach(pan => {

            emcee.on(pan, () => {

                const currentIndex = getPageIndex()

                //pour eviter de swipe n'importe quand
                //à corriger en définissant finishposX - startposX
                if (swipeMoves.now < swipeMoves.max) {
                    swipeMoves.now += 1
                } else {

                    swipeMoves.now = 0

                    //deplace l'accueil droite et gauche
                    if (pan === "panleft" && currentIndex < 3) {
                        redirection(PageEventOrigin.homepageScroll, currentIndex + 1)
                    }

                    if (pan === "panright" && currentIndex > 0) {
                        redirection(PageEventOrigin.homepageScroll, currentIndex - 1)
                    }

                    Nav.changeCenterFocus(currentIndex);
                }
            })
        });
    }
    
    const hamburger = () => {
        const hamburger = document.querySelector('.hamburger')!;
        hamburger.addEventListener('click', () => {

            if (hamburger.classList.contains('clicked')) {
                hamburger.classList.remove('clicked')
            } else {
                //new Vue({el: "#extended-nav-content", template: '<ExtendedNav />', components: { ExtendedNav }})
                hamburger.classList.add('clicked')
            }
            
        })
    }

    const verticalScroll = () => {

        document.body.addEventListener('wheel', function(ev: any) {

            if (ev.wheelDelta < 0) {
            }
            else if (ev.wheelDelta > 0) {
            }
        })
    }
    
    const headerLogo = () => {
        const logo = document.querySelector('nav .logo')!;
        logo.addEventListener('click', () => {
            //Accueil.arrive(PageEventOrigin.headerLogo)
        })
    }
    
    //verticalScroll()
    navButtons()
    panningScroll()
    hamburger()
    //headerLogo()
}

function redirection(which: PageEventOrigin, index?: number) {

    if (which === PageEventOrigin.initialisation) {

        new Vue({el: "#contenu-accueil", template: '<Index />', components: { Index }});
        accueilEvents();

        if (window.location.pathname.length > 1) {
            const i = getPageIndex();
            accueilSwipe(SITEMAP[i].pathname, i);
            openPage(i)
        }
    }

    else if (which === PageEventOrigin.homepageScroll && typeof(index) === 'number') {

        const lastIndex = getPageIndex()
        window.history.pushState("localhost:1234", SITEMAP[index].titre, SITEMAP[index].pathname);
        accueilSwipe(SITEMAP[index].pathname, index, lastIndex);
        openPage(index);
    }

    else if (which === PageEventOrigin.headerLogo) {
        //appendPage()
    }
}

window.onload = function() {

    // directories control
    redirection(PageEventOrigin.initialisation)
}