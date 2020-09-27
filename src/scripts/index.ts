import Vue from 'vue';
import Hammer from 'hammerjs';
import { openPage, PageEventOrigin } from './pageControl';
import acceuilControl from './accueilControl';

function customCursor() {
    
    // const cursor = document.querySelector('#cursor')!;
    // const width = cursor.scrollWidth;

    // document.addEventListener('mousemove', (e) => {
    //     cursor.setAttribute('style', `top: ${e.pageY - width / 2}px; left: ${e.pageX - width / 2}px`)
    // })
}


window.onload = function() {

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

        leave: (origin: PageEventOrigin.homeScrollDown) => {
            Accueil.hasLeft = true
            openPage(origin, Accueil.index)
        },

        arrive: (origin: PageEventOrigin.pageScrollUp | PageEventOrigin.headerLogo) => {
            Accueil.hasLeft = false
            openPage(origin)
            Accueil.swipes(Accueil.index)
        },

        swipes: (newIndex: number) => {

            if (!Accueil.isMoving) {

                Accueil.isMoving = true;
                Accueil.lastIndex = Accueil.index;
                Accueil.index = newIndex;

                window.history.pushState("localhost:1234", paths[Accueil.index].title, paths[Accueil.index].url)

                acceuilControl(Accueil)
        
                setTimeout(() => {Accueil.isMoving = false; Accueil.noSwipe = false}, 1200)
            }
        }
    }

    //Object
    const Nav = {

        dom: document.querySelector('body > nav')!,
        centerLis: document.querySelectorAll('nav .center li'),
    
        show: () => Nav.dom.classList.add('show'),
        hide: () => Nav.dom.classList.remove('show'),

        changeCenterFocus: (i?: number) => {
            Nav.centerLis[Accueil.lastIndex].classList.remove('active');
            Nav.centerLis[i ? i : Accueil.index].classList.add('active');
        }
    }

    //scroll events
    document.body.addEventListener('wheel', function(ev: any) {

        if (ev.wheelDelta < 0) {

            if (!Accueil.hasLeft) {
                Accueil.leave(PageEventOrigin.homeScrollDown)
            } else {
                Nav.hide()
            }
        }
        else if (Accueil.hasLeft && ev.wheelDelta > 0) {
            Nav.show()
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
    
    swipes.forEach(pan => {
        emcee.on(pan, () => {

            //deplace l'accueil droite et gauche
            if (pan === "panleft" && Accueil.index < 3) {
                Accueil.swipes(Accueil.index + 1)
            }

            if (pan === "panright" && Accueil.index > 0) {
                Accueil.swipes(Accueil.index - 1)
            }

            Nav.changeCenterFocus(Accueil.index);
        })
    });

    //menu events
    const hamburger = document.querySelector('.hamburger')!;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('clicked')
    })


    //logo event
    const logo = document.querySelector('nav .logo')!;
    logo.addEventListener('click', () => {
        Accueil.arrive(PageEventOrigin.headerLogo)
    })


    // directories control
    openPage(PageEventOrigin.initialisation)
    
    window.addEventListener('locationchange', function(){
        openPage(PageEventOrigin.initialisation)
    })
}