
import fabricationScroll from './fabrication';
import './disponible';
import './mainmenu';

window.onload = function() {

    const page = window.location.pathname
    
    if (page === "/page-02.html") {
        fabricationScroll()
    }
}
