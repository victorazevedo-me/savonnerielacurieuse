import Hammer from 'hammerjs';

export function pageControl() {

    function moveBackgrounds(): void {

        // init vals
        const wrapper = document.querySelector('.backgrounds-wrapper')!;
        const current = wrapper.querySelector('.current')!;
        const aside = document.createElement("div");
        const bckgs = ['un', 'deux', 'trois', 'quatre']

        const params = (page.lastIndex < page.index ? {
            pos: "100%",
            anim: "SlideLeft 1s"
        } : {
            pos: "-100%",
            anim: "SlideRight 1s"
        })

        aside.style.position = params.pos
        aside.style.animation = params.anim;
        aside.className = `background aside ${bckgs[page.index]}`

        wrapper.insertBefore(aside, current);

        // reset animation control
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

    function moveDots() {

        const dotsDOM = document.querySelectorAll('nav .dots button');

        dotsDOM[page.index].className = "active";
        dotsDOM[page.lastIndex].className = "";
    }

    let page = {

        isMoving: false,
        index: 0,
        lastIndex: 0,

        move: (newIndex: number) => {
            page.lastIndex = page.index;
            page.index = newIndex;
            page.isMoving = true

            moveBackgrounds()
            moveDots()
            updateTitle()
        }
    }

    //dots menu buttons
    const dots = document.querySelectorAll('nav .dots button');
    dots.forEach((elem, i) => {

        elem.addEventListener('click', function() {

            if (!page.isMoving && page.index !== i) {
                let panLeft = (page.index < i)
                page.move(i)
            }
        })
    }) 

    //panning events
    const emcee = new Hammer(document.body!);
    const swipes = ["panleft", "panright"];

    swipes.forEach(pan => {

        emcee.on(pan, () => {

            if (!page.isMoving) {

                if (pan === "panleft" && page.index < 3) {
                    page.move(page.index + 1)
                }

                if (pan === "panright" && page.index > 0) {
                    page.move(page.index - 1)
                }
            }
        })
    })
}

export default pageControl