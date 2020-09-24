import pageControl from './pageControl';

function openmenu() {

    // const page = window.location.pathname
    // document.body.addEventListener('wheel', function(ev: any) {

    //     if (ev.wheelDelta < 0) {
    //         console.log('transition')
    //     }

    // })

}

function customCursor() {
    
    const cursor = document.querySelector('#cursor')!;
    const width = cursor.scrollWidth;

    document.addEventListener('mousemove', (e) => {
        cursor.setAttribute('style', `top: ${e.pageY - width / 2}px; left: ${e.pageX - width / 2}px`)
    })
}


window.onload = function() {
    pageControl()
    //customCursor()
}