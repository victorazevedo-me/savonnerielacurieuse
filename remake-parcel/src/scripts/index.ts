
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
    left: string;
    right: string;
}

 function swipes(dir: Directions): void {

    const accueil = document.body!;
    const mc = new Hammer(accueil);

    const addEvent = (which: ("left" | "right")) => {

        const pan = "pan" + which
        mc.on(pan, function(e) {

            if (dir[which].length > 0 && e.type === pan) 
                window.location.assign(dir[which])
        })
    }
    
    addEvent("left")
    addEvent("right")
 }







const page = window.location.pathname

if (page === "/index.html") {
    swipes({
        left: "./accueil-02.html",
        right: ""
    })
}
else if (page === "/accueil-02.html") {
    swipes({
        left: "./accueil-03.html",
        right: "./index.html"
    })
}
else if (page === "/accueil-03.html") {
    swipes({
        left: "./accueil-04.html",
        right: "./accueil-02.html"
    })
}
else if (page === "/accueil-04.html") {
    swipes({
        left: "",
        right: "./accueil-03.html"
    })
}
else if (page === "/page-02.html") {
    fabricationScroll()
}
    
