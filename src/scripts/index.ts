import { openPage, PageEventOrigin } from './pageControl';

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
}