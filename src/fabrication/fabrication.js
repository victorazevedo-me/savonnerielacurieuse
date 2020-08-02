
//toute les fct pour fabrication
function fabricationScroll() {

    //init consts
    const etapdesc = document.getElementById('etape-desc');
    const imgwrap = document.getElementById('imgwrap');
    const allimgs = imgwrap.querySelectorAll('img');
    const maxcount = imgwrap.querySelectorAll('img').length
    let count = 0
    let lastcount = 0


    function imgscroll() {

        let width = imgwrap.children[0].offsetWidth
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

        etapdesc.querySelectorAll('p').forEach(item => {
        if (item.offsetHeight > maxHeight)
            maxHeight = item.offsetHeight
        })

        etapdesc.style.height = maxHeight + "px"
    }

    function descScroll() {

        const parafs = etapdesc.querySelectorAll('p')

        parafs[lastcount].style.opacity = 0
        parafs[lastcount].style.zIndex = 4
        parafs[count].style.opacity = 1
        parafs[count].style.zIndex = 5
    }

    //a factoriser
    function doEvent(is) {

        lastcount = count

        if (is === "next" && count < maxcount - 1) {
            count += 1
            imgscroll()
            descScroll()
        }
        else if (is === "previous" && count > 0) {
            count -= 1
            imgscroll()
            descScroll()
        }
    }

    //events

    allimgs.forEach((item, index) => {

        item.onclick = function() {

            if (this.nextElementSibling && this.nextElementSibling.className === "focused") {
                doEvent('previous') 
            }
            else {
                doEvent('next')
            }
        }
    })

    //initial functions
    setMaxDescHeight()
}


window.onload = function() {
    fabricationScroll()
}
