
export function fabricationScroll() {
    
    
    //init consts
    const etapdesc = document.getElementById('etape-desc')!;
    const imgwrap = document.getElementById('imgwrap')!;
    const allimgs = document.querySelectorAll('#imgwrap img')!;
    const maxcount = allimgs.length;
    let count = 0
    let lastcount = 0
    
    
    function imgscroll() {
    
        let width = imgwrap.children[0].clientWidth
        let margin = imgwrap.offsetWidth * .06 // a changer si la marge des img change
        let toscroll = (width + margin) * count
    
        //scroll
        imgwrap.style.transform = `translateX(${-toscroll}px)`;
    
        //focus
        imgwrap.children[count].className = "focused"
        imgwrap.children[lastcount].className = ""
    }
    
    function setMaxDescHeight() {
    
        let maxHeight = 0
    
        document.querySelectorAll('#etape-desc p').forEach(item => {
        if (item.clientHeight > maxHeight)
            maxHeight = item.clientHeight
        })
    
        etapdesc.style.height = maxHeight + "px"
    }
    
    function descScroll() {
    
        const parafs = etapdesc.querySelectorAll('p')
    
        parafs[lastcount].style.opacity = "0"
        parafs[lastcount].style.zIndex = "4"
        parafs[count].style.opacity = "1"
        parafs[count].style.zIndex = "5"
    }
    
    
    function defileControl(next: boolean) {
    
        //suivant ou non ?
        //si length-1 alors oui, sinon precedent ?
        //si >0 alors oui 
    
        lastcount = count
        count += (next && count < (maxcount - 1) ? 1 : (!next && count > 0 ? -1 : 0))
    
        imgscroll()
        descScroll()
    }
    
    
    //défile auto par defaut
    let autoDefil = setInterval(function() {
        defileControl(true)
    }, 8000)
    
    allimgs.forEach(item => {
    
        item.addEventListener('click', function() {
    
            clearInterval(autoDefil)
            document.querySelector('#timer .inner')?.setAttribute('class', "inner hidden");
    
            let voisin = item.nextElementSibling || false;
            defileControl(voisin && voisin.className === "focused" ? false : true)
        })
    })
    
    //initial functions
    setMaxDescHeight()
}

export default fabricationScroll