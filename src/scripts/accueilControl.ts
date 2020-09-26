import Hammer from 'hammerjs';

export function accueilControl() {

    function moveBackgrounds(): void {

        // init vals
        const wrapper = document.querySelector('.backgrounds-wrapper')!;
        const aside = wrapper.querySelector('.aside')!;
        const current = wrapper.querySelector('.current')!;
        const bckgs = ['un', 'deux', 'trois', 'quatre'];

        aside.classList.add(bckgs[page.index]);
        current.classList.add('fadeout')

        // reset animation control
        setTimeout(() => {
            current.classList.remove('fadeout');
            current.classList.remove(bckgs[page.lastIndex]);
            
            current.classList.replace('current', "aside");
            aside.classList.replace('aside', 'current');
        }, 1200)

    }

    function updateTitle() {

        const texts = [
            {titre: ["Savonnerie", "La Curieuse"], soustitre: "création de savons écologiques"},
            {titre: ["la saponification", "à froid"], soustitre: ""},
            {titre: ["César et les", "savons doux"], soustitre: ""},
            {titre: ["Où les", "trouver ?"], soustitre: ""}
        ];

        const titre = document.querySelectorAll('.big div span')!;
        const soustitre = document.querySelector('.small div span')!;
        const spans = document.querySelectorAll('.titre span')!;
        
        const swipeAnim = (dom: Element) => {

            const duration = 1200;
            const animname = (page.lastIndex > page.index ? 'swipedRight' : 'swipedLeft');

            dom.classList.add(animname)

            setTimeout(() => {
                dom.classList.remove(animname)
            }, duration)
        }
    
        spans.forEach(span => {
            
            swipeAnim(span)

            setTimeout(() => {
                titre.forEach((span, i) => {span.innerHTML = texts[page.index].titre[i]})
                soustitre.innerHTML = texts[page.index].soustitre
            }, 600)
        })

        
    }

    let page = {

        noSwipe: false,
        isMoving: false,
        index: 0,
        lastIndex: 0,

        move: (newIndex: number) => {
            page.lastIndex = page.index;
            page.index = newIndex;
            page.isMoving = true

            moveBackgrounds()
            updateTitle()

            setTimeout(() => {page.isMoving = false; page.noSwipe = false}, 1200)
        }
    }

    document.querySelectorAll('nav .mini-nav li').forEach((elem, i) => {

        elem.addEventListener('click', function() {

            if (!page.isMoving && page.index !== i) {
                page.noSwipe = true
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

export default accueilControl