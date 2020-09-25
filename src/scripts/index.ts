import pageControl from './pageControl';
import fabricationScroll from './fabrication';



function openmenu() {

    // let isPageExpanded = false
    // const main = document.querySelector('main')!;

    // document.body.addEventListener('wheel', function(ev: any) {

    //     if (!isPageExpanded && ev.wheelDelta < 0) {

    //         fetch("./pages/01.html").then((response) => {
    //             response.text().then((data) => {

    //                 const section = document.createElement('section');

    //                 section.className = 'class un';
    //                 section.innerHTML = data
                    
    //                 main.appendChild(section)
    //                 console.log(data)
    //             })
    //         })
    //         isPageExpanded = true
    //         console.log('transition')
    //     }

    // })

}

function customCursor() {
    
    // const cursor = document.querySelector('#cursor')!;
    // const width = cursor.scrollWidth;

    // document.addEventListener('mousemove', (e) => {
    //     cursor.setAttribute('style', `top: ${e.pageY - width / 2}px; left: ${e.pageX - width / 2}px`)
    // })
}






function overlayPosition(overlay: string, targetElem: string, posY: number):void {

    const bodyTop = document.body.getBoundingClientRect().top;
    const elemTop = document.querySelector(targetElem)!.getBoundingClientRect().top;
    const overlayDOM = (<HTMLElement>document.querySelector(overlay));

    overlayDOM.style.top = `${(elemTop - bodyTop) + (posY - overlayDOM.offsetHeight / 2)}px`
}


window.onload = function() {

    if (window.location.pathname === "/index.html" ||
    window.location.pathname === "/") {
        pageControl()
        openmenu()
        //customCursor()
    }
    else if (window.location.pathname === "/page-02.html") {
        fabricationScroll()
        overlayPosition('.grosseballe', '.expliquation', 500)
    }
}