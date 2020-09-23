import Hammer from 'hammerjs';

export function pageControl() {

    function moveBackgrounds(panLeft: boolean): void {

        // init vals
        const wrapper = document.querySelector('.backgrounds-wrapper')!;
        const current = wrapper.querySelector('.current')!;
        const aside = document.createElement("div");
        const bckgs = ['un', 'deux', 'trois', 'quatre']
        
        // update style & wrapper id
        aside.style.position = panLeft ? "100%" : "-100%"
        aside.className = `background aside ${bckgs[page.index]}`
        
        wrapper.insertBefore(aside, current);

        // apply animation
        aside.style.animation = (panLeft ? "SlideLeft 1s" : "SlideRight 1s");

        // reset animation controle
        setTimeout(() => {
            current.remove()
            aside.className = `background current ${bckgs[page.index]}`
            page.isMoving = false
        }, 1000)    
    }

    function updateTitle() {

        const texts = [
            {titre: "Savonnerie<br />La Curieuse", soustitre: "création de savons écologiques"},
            {titre: "la saponification<br />à froid", soustitre: ""},
            {titre: "César et les<br />savons doux", soustitre: ""},
            {titre: "Où les<br />trouver ?", soustitre: ""}
        ];

        const titreDOM = document.querySelector('.titre ')!;
        const elems = {
            titre: titreDOM.querySelector('h1')!,
            soustitre: titreDOM.querySelector('p')!
        }

        titreDOM.className = "titre animating";

        setTimeout(() => {
            elems.titre.innerHTML = texts[page.index].titre
            elems.soustitre.innerHTML = texts[page.index].soustitre
            titreDOM.className = "titre"
        }, 800)
    }

    function moveDots(panLeft: boolean) {

        const dotsDOM = document.querySelectorAll('nav .dots button');

        dotsDOM[page.index].className = "active";
        dotsDOM[page.index + (panLeft ? -1 : 1)].className = "";
    }

    let page = {
        isMoving: false,
        index: 0
    }

    const emcee = new Hammer(document.body!);

    emcee.on(`panleft`, (e) => {

        if (!page.isMoving && page.index < 3) {

            page.isMoving = true;
            page.index += 1;
            moveBackgrounds(true)
            moveDots(true)
            updateTitle()

            console.log(page.index)
        }
    })

    emcee.on(`panright`, (e) => {

        if (!page.isMoving && page.index > 0) {

            page.isMoving = true;
            page.index -= 1;
            moveBackgrounds(false)
            moveDots(false)
            updateTitle()

            console.log(page.index)
        }
    })
}

export default pageControl