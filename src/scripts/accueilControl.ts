
function customCursor() {
    
    // const cursor = document.querySelector('#cursor')!;
    // const width = cursor.scrollWidth;

    // document.addEventListener('mousemove', (e) => {
    //     cursor.setAttribute('style', `top: ${e.pageY - width / 2}px; left: ${e.pageX - width / 2}px`)
    // })
}

export function accueilSwipe(u: string, i: number, lasti?: number) {

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

        const soustitre = document.querySelector('.small div span')!;
        const spans = document.querySelectorAll('.titre span')!;
        
        const swipeAnim = (dom: Element, duration: number) => {

            const animname = (typeof(lasti) !== "number" ? 'init' : (lasti > i ? 'swipedRight' : 'swipedLeft'));
            dom.classList.add(animname)
        
            return new Promise(resolve => {
                setTimeout(() => {
                    dom.classList.remove(animname)
                    resolve(true)
                }, duration);
            });
        }        

        function addText(): void {

            document.querySelectorAll('.big div span')!.forEach((span, j) => {
                span.innerHTML = texts[i].titre[j]
            })
            soustitre.innerHTML = texts[i].soustitre
        }
    
        spans.forEach(span => {

            if (typeof(lasti) === 'number') {
                swipeAnim(span, 1200).then((r) => console.log(r))
                setTimeout(addText, 600)
            } else {
                swipeAnim(span, 600)
                addText()
            }
        })
    }

    moveBackgrounds();
    updateTitle();
}