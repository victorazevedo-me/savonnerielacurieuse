import fabricationScroll from './fabrication';
import Hammer from 'hammerjs';


function openmenu() {

    // const page = window.location.pathname
    // document.body.addEventListener('wheel', function(ev: any) {

    //     if (ev.wheelDelta < 0) {
    //         console.log('transition')
    //     }

    // })

}

type Directions = {
    left?: string;
    right?: string;
}

function moveBackgrounds(which : ("left" | "right")): void {

    // deux: "current, aside"
    // panleft -> choose right
    // panright -> choose left

    // init vals
    const wrapper = document.querySelector('.backgrounds-wrapper')!;
    const current = wrapper.querySelector('.current')!;
    const index = parseInt(wrapper.id);

    // init aside params
    const bckgs = ['un', 'deux', 'trois', 'quatre']

    // swipe must be in backgrounds length bounds
    if (which === "left" && index < (bckgs.length - 1) || which !== "left" && index > 0) { // createAside
        const aside = document.createElement("div");

        // update style & wrapper id
        if (which === "left") {
            wrapper.id = (index + 1).toString()
            aside.style.position = "100%"
            aside.className = "background aside " + bckgs[index + 1]

        } else {
            wrapper.id = (index - 1).toString(),
            aside.style.position = "-100%"
            aside.className = "background aside " + bckgs[index - 1]
        } wrapper.insertBefore(aside, current);

        // isMoving pour controler animations
        isMoving = true

        // apply animation
        aside.style.animation = (which === "left" ? "SlideLeft 1s" : "SlideRight 1s");

        // reset animation controle
        setTimeout(() => {
            current.remove()
            aside.className = "background current " + bckgs[parseInt(wrapper.id)]
            isMoving = false
        }, 1000)
    }
}


function swipes(dir? : Directions): void {

    const mc = new Hammer(document.body !);

    const addEvent = (which : ("left" | "right"), url? : string) => {

        const pan = "pan" + which
        mc.on(pan, function(e) {

            if (!isMoving && e.type === pan) {
                moveBackgrounds(which)
                // window.location.assign(url)
            }
        })
    };

    addEvent("left")
    addEvent("right")
}


const page = window.location.pathname;
let isMoving = false;

swipes()

if (page === "/page-02.html") {
    fabricationScroll()
}
