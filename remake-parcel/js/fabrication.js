"use strict";
exports.__esModule = true;
//toute les fct pour fabrication
function fabricationScroll() {
    //init consts
    var etapdesc = document.getElementById('etape-desc');
    var innerTimer = document.querySelector('#timer .inner');
    var imgwrap = document.getElementById('imgwrap');
    var allimgs = imgwrap.querySelectorAll('img');
    var maxcount = imgwrap.querySelectorAll('img').length;
    var count = 0;
    var lastcount = 0;
    function imgscroll() {
        var width = imgwrap.children[0].offsetWidth;
        var margin = imgwrap.offsetWidth * .06; // a changer si la marge des img change
        var toscroll = (width + margin) * count;
        //scroll
        imgwrap.style.transform = "translateX(" + -toscroll + "px)";
        //focus
        imgwrap.children[count].className = "focused";
        imgwrap.children[lastcount].className = "";
    }
    function setMaxDescHeight() {
        var maxHeight = 0;
        etapdesc.querySelectorAll('p').forEach(function (item) {
            if (item.offsetHeight > maxHeight)
                maxHeight = item.offsetHeight;
        });
        etapdesc.style.height = maxHeight + "px";
    }
    function descScroll() {
        var parafs = etapdesc.querySelectorAll('p');
        parafs[lastcount].style.opacity = "0";
        parafs[lastcount].style.zIndex = "4";
        parafs[count].style.opacity = "1";
        parafs[count].style.zIndex = "5";
    }
    function defileControl(next) {
        //suivant ou non ?
        //si length-1 alors oui, sinon precedent ?
        //si >0 alors oui 
        lastcount = count;
        count += (next && count < maxcount - 1 ? 1 : (count > 0 ? -1 : 0));
        imgscroll();
        descScroll();
    }
    //défile auto par defaut
    var autoDefil = setInterval(function () {
        defileControl(true);
    }, 8000);
    allimgs.forEach(function (item) {
        item.onclick = function () {
            clearInterval(autoDefil);
            innerTimer.style.opacity = "0";
            var voisin = item.nextElementSibling || false;
            defileControl(voisin && voisin.className === "focused" ? false : true);
        };
    });
    //initial functions
    setMaxDescHeight();
}
exports["default"] = fabricationScroll;
