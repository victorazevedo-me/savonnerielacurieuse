
import { openPage, PageEventOrigin } from './pageControl';
import accueilSwipe from './accueilControl';


function customCursor() {
    
    // const cursor = document.querySelector('#cursor')!;
    // const width = cursor.scrollWidth;

    // document.addEventListener('mousemove', (e) => {
    //     cursor.setAttribute('style', `top: ${e.pageY - width / 2}px; left: ${e.pageX - width / 2}px`)
    // })
}


window.onload = function() {

    // directories control
    openPage(PageEventOrigin.initialisation)
    
    window.addEventListener('locationchange', function(){
        openPage(PageEventOrigin.initialisation)
    })
}