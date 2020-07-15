
const id = elem => document.getElementById(elem)

//toute les fct pour fabrication
function fabricationScroll() {

//init consts
const firstimg = id('imgwrap').querySelector('img')
const maxcount = id('imgwrap').querySelectorAll('img').length
let count = 0

//scroll les images suivant leur res
function imgscroll(is) {

    const margin = parseInt(firstimg.style.marginLeft) || 0
    let width = firstimg.offsetWidth

    if (is === "next") width = -width

    firstimg.style.marginLeft = (margin + width) + "px"
}

function setMaxDescHeight() {

    let maxHeight = 0

    id('etape-desc').querySelectorAll('p').forEach(item => {
    if (item.offsetHeight > maxHeight)
        maxHeight = item.offsetHeight
    })

    id('etape-desc').style.height = maxHeight + "px"
}

function descScroll(is) {

    //in/decrement displayed counter
    id('etape-count').innerText = count + 1

    const parafs = id('etape-desc').querySelectorAll('p')
    const lastcount = (is === "next" ? count - 1 : count + 1)

    parafs[lastcount].style.opacity = 0
    parafs[lastcount].style.zIndex = 4
    parafs[count].style.opacity = 1
    parafs[count].style.zIndex = 5
}

//next
id('fabr-next').onclick = function() {

    if (count < maxcount - 1) {
    count += 1
    imgscroll('next')
    descScroll('next')
    }
}

//previous
id('fabr-prev').onclick = function() {

    if (count > 0) {
    count -= 1
    imgscroll('previous')
    descScroll('previous')
    }
}

//initial functions
setMaxDescHeight()
}


window.onload = function() {
fabricationScroll()
}
