

//init consts
const etapdesc = document.getElementById('etape-desc')! as HTMLElement;
const innerTimer = document.querySelector('#timer .inner')! as HTMLParagraphElement;
const imgwrap = document.getElementById('imgwrap')! as HTMLElement;
const allimgs = imgwrap.querySelectorAll('img')!;
const maxcount = imgwrap.querySelectorAll('img').length;
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

    item.onclick = function() {

        clearInterval(autoDefil)
        innerTimer.style.opacity = "0";

        let voisin = item.nextElementSibling || false;
        defileControl(voisin && voisin.className === "focused" ? false : true)
    }
})

//initial functions
setMaxDescHeight()
