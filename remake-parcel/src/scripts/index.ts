
import fabricationScroll from './fabrication';

const page = window.location.pathname
document.body.addEventListener('wheel', function(ev: any) {

    if (ev.wheelDelta < 0) {
        console.log('transition')
    }

})
    
if (page === "/page-02.html")
    fabricationScroll()
