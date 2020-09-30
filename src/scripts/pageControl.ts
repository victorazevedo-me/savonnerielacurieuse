import Vue from 'vue';
import Index from '../components/index.vue';
import Page01 from '../components/page-un.vue';
import Page02 from '../components/page-deux.vue';
import Page03 from '../components/page-trois.vue';
import Page04 from '../components/page-quatre.vue';
import fabricationScroll from './fabrication';
import Hammer from 'hammerjs';
import accueilSwipe from './accueilControl';

export enum PageEventOrigin { initialisation, homepageScroll, headerLogo }

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

function overlayPosition(overlay: string, targetElem: string, posY: number):void {

    const bodyTop = document.querySelector('#contenu-page')!.getBoundingClientRect().top;
    const elemTop = document.querySelector(targetElem)!.getBoundingClientRect().top;
    const overlayDOM = (<HTMLElement>document.querySelector(overlay));

    overlayDOM.style.top = `${(elemTop - bodyTop) + (posY - overlayDOM.offsetHeight / 2)}px`
}




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






function events() {

    //Object
    const Accueil = {

        hasLeft: false,
        noSwipe: false,
        isMoving: false,

        swipes: (index: number) => {

            if (!Accueil.isMoving) {

                Accueil.isMoving = true;
                const lastIndex = getPageIndex()

                window.history.pushState("localhost:1234", SITEMAP[index].titre, SITEMAP[index].pathname);

                accueilSwipe(SITEMAP[index].pathname, index, lastIndex);
                openPage(PageEventOrigin.homepageScroll, index);
        
                setTimeout(() => Accueil.isMoving = false, 1200)
            }
        }
    }

    //Object
    const Nav = {

        dom: document.querySelector('body > nav')!,
        centerLis: document.querySelectorAll('nav .center li'),

        changeCenterFocus: (i: number) => {  
            Nav.centerLis.forEach(n => n.classList.remove('active'))
            Nav.centerLis[i].classList.add('active')
        }
    }



      //scroll events
      document.body.addEventListener('wheel', function(ev: any) {

        if (ev.wheelDelta < 0) {}
        else if (Accueil.hasLeft && ev.wheelDelta > 0) {}
    })

    //nav buttons event
    Nav.centerLis.forEach((elem, i) => {

        elem.addEventListener('click', function() {

            const currentPage = getPageIndex()

            if (currentPage !== i) {
                Accueil.swipes(i);
                Nav.changeCenterFocus(i);
            }
        })
    })

    //panning events
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
                    Accueil.swipes(currentIndex + 1)
                }

                if (pan === "panright" && currentIndex > 0) {
                    Accueil.swipes(currentIndex - 1)
                }

                Nav.changeCenterFocus(currentIndex);
            }
        })
    });

    //menu events
    const hamburger = document.querySelector('.hamburger')!;
    hamburger.addEventListener('click', () => {

        if (hamburger.classList.contains('clicked')) {
            hamburger.classList.remove('clicked')
        } else {
            //new Vue({el: "#extended-nav-content", template: '<ExtendedNav />', components: { ExtendedNav }})
            hamburger.classList.add('clicked')
        }
        
    })


    //logo event
    const logo = document.querySelector('nav .logo')!;
    logo.addEventListener('click', () => {
        //Accueil.arrive(PageEventOrigin.headerLogo)
    })
}

export function openPage(which: PageEventOrigin, index?: number) {

    const appendPage = (i?: number) => {

        //are pages
        if (typeof(i) === 'number') {

            //append vue pages
            if (i === 0) {
                new Vue({el: "#contenu-page", template: '<Page01 />', components: { Page01 }})

            } else if (i === 1) {

                new Vue({el: "#contenu-page", template: '<Page02 />', components: { Page02 }})
                fabricationScroll()
                overlayPosition(
                    '.grosseballe', 
                    '.expliquation', 
                    500)

            } else if (i === 2) {

                new Vue({el: "#contenu-page", template: '<Page03 />', components: { Page03 }})
                overlayPosition(
                    '.en-parlent .grosseballe',
                    '.en-parlent',
                    1000)

            } else if (i === 3) {
                new Vue({el: "#contenu-page", template: '<Page04 />', components: { Page04 }})
            }
        }
    }

    if (which === PageEventOrigin.initialisation) {

        new Vue({el: "#contenu-accueil", template: '<Index />', components: { Index }});
        events();

        if (window.location.pathname.length > 1) {
            const i = getPageIndex();
            accueilSwipe(SITEMAP[i].pathname, i);
            appendPage(i)
        }
    }
    else if (which === PageEventOrigin.homepageScroll) {
        appendPage(index)
    }
    else if (which === PageEventOrigin.headerLogo) {
        //appendPage()
    }
}

