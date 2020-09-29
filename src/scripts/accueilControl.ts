
export function accueilSwipe(u: string, i: number, lasti: number) {

    let url = u.replace('/', '');

    function moveBackgrounds(): void {

        // init vals
        const wrapper = document.querySelector('.background-wrapper')!;
        const current = wrapper.querySelector('.background-wrapper div')!;
        const next = document.createElement('div');
    
        next.classList.add('background', url);
        current.classList.add('fadeout');
        wrapper.appendChild(next);

        document.body.style.overflowY = 'none';

        setTimeout(() => {
            current.remove()
            next.classList.add('front');
            document.body.style.overflowY = 'scroll';
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
            const animname = (lasti > i ? 'swipedRight' : 'swipedLeft');

            dom.classList.add(animname)

            setTimeout(() => {
                dom.classList.remove(animname)
            }, duration)
        }
    
        spans.forEach(span => {
            
            swipeAnim(span)

            setTimeout(() => {
                titre.forEach((span, j) => {span.innerHTML = texts[i].titre[j]})
                soustitre.innerHTML = texts[i].soustitre
            }, 600)
        })
    }

    moveBackgrounds();
    updateTitle();
}

export default accueilSwipe