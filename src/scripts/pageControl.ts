import Vue from 'vue';
import Index from '../components/index.vue';
import Page01 from '../components/page-un.vue';
import Page02 from '../components/page-deux.vue';
import Page03 from '../components/page-trois.vue';
import Page04 from '../components/page-quatre.vue';
import fabricationScroll from './fabrication';
import Hammer from 'hammerjs';
import accueilSwipe from './accueilControl';

function overlayPosition(overlay: string, targetElem: string, posY: number):void {

    const bodyTop = document.querySelector('#contenu-page')!.getBoundingClientRect().top;
    const elemTop = document.querySelector(targetElem)!.getBoundingClientRect().top;
    const overlayDOM = (<HTMLElement>document.querySelector(overlay));

    overlayDOM.style.top = `${(elemTop - bodyTop) + (posY - overlayDOM.offsetHeight / 2)}px`
}

function events() {

    const paths = [{
        url: "/la-savonnerie",
        title: "La savonnerie"
    },{
        url: "/la-saponification",
        title: "La saponification"
    },{
        url: "/les-savons",
        title: "Les savons"
    },{
        url: "/ou-les-trouver",
        title: "Où les trouver"
    }];

    //Object
    const Accueil = {

        hasLeft: false,
        noSwipe: false,
        isMoving: false,
        index: 0,
        lastIndex: 0,

        swipes: (newIndex: number) => {

            if (!Accueil.isMoving) {

                Accueil.isMoving = true;
                Accueil.lastIndex = Accueil.index;
                Accueil.index = newIndex;

                window.history.pushState("localhost:1234", paths[Accueil.index].title, paths[Accueil.index].url);

                accueilSwipe(paths[Accueil.index].url, Accueil.index, Accueil.lastIndex);
                openPage(PageEventOrigin.homepageScroll, Accueil.index);
        
                setTimeout(() => {Accueil.isMoving = false; Accueil.noSwipe = false}, 1200)
            }
        }
    }

    //Object
    const Nav = {

        dom: document.querySelector('body > nav')!,
        centerLis: document.querySelectorAll('nav .center li'),

        changeCenterFocus: (i?: number) => {
            Nav.centerLis[Accueil.lastIndex].classList.remove('active');
            Nav.centerLis[i ? i : Accueil.index].classList.add('active');
        }
    }



      //scroll events
      document.body.addEventListener('wheel', function(ev: any) {

        if (ev.wheelDelta < 0) {
        }
        else if (Accueil.hasLeft && ev.wheelDelta > 0) {
        }
    })

    //nav buttons event
    Nav.centerLis.forEach((elem, i) => {

        elem.addEventListener('click', function() {

            if (Accueil.index !== i) {

                Accueil.noSwipe = true
                Accueil.swipes(i)
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

            //pour eviter de swipe n'importe quand
            //à corriger en définissant finishposX - startposX
            if (swipeMoves.now < swipeMoves.max) {
                swipeMoves.now += 1
            } else {

                swipeMoves.now = 0

                //deplace l'accueil droite et gauche
                if (pan === "panleft" && Accueil.index < 3) {
                    Accueil.swipes(Accueil.index + 1)
                }

                if (pan === "panright" && Accueil.index > 0) {
                    Accueil.swipes(Accueil.index - 1)
                }

                Nav.changeCenterFocus(Accueil.index);
            }
        })
    });

    //menu events
    const hamburger = document.querySelector('.hamburger')!;
    hamburger.addEventListener('click', () => {

        if (hamburger.classList.contains('clicked')) {
            //document.getElementById('#extended-nav-content')?.innerHTML = "";
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

export enum PageEventOrigin { initialisation, homepageScroll, headerLogo }

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
                () => overlayPosition('.en-parlent .grosseballe', '.en-parlent', 1000)
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
            new Vue({el: "#contenu-accueil", template: '<Index />', components: { Index }});
            events()
        }
    }

    if (which === PageEventOrigin.initialisation) {

        path.pages.forEach((p, i) => {
            if (window.location.pathname === p.url) {
                appendPage(i)
            }
        })

        appendPage()
    }
    else if (which === PageEventOrigin.homepageScroll) {
        appendPage(index)
    }
    else if (which === PageEventOrigin.headerLogo) {
        //appendPage()
    }
}

export default openPage