let interval;
let whiteAmount = 0;
let blueAmount = 255;
let increaseAmount = 4;
let beWhite = true;
let beBlack = false;
let beBlue = false;
let currentLink;
function contactHover(link) {
    currentLink = link;
    interval = setInterval("blueFlash()", 1);
}

function contactUnhover() {
    clearInterval(interval);
    whiteAmount = 0;
    blueAmount = 255;
    beWhite = true;
    beBlack = false;
    beBlue = false;
    currentLink.style.color = "#0000FF";
}

function blueFlash() {
    if (beWhite) {
        whiteAmount += increaseAmount;
        currentLink.style.color = "rgb(" + whiteAmount + ",  " + whiteAmount + ", 255)";
        if (whiteAmount == 128)
        {
            beWhite = false;
            beBlue = true;
        }
    }
    else if (beBlue && blueAmount == 255) {
        whiteAmount -= increaseAmount;
        currentLink.style.color = "rgb(" + whiteAmount + ",  " + whiteAmount + ", 255)";
        if (whiteAmount == 0)
        {
            beBlue = false;
            beBlack = true;
        }
    }
    else if (beBlack) {
        blueAmount -= increaseAmount;
        currentLink.style.color = "rgb(0, 0, " + blueAmount + ")";
        console.log(blueAmount);
        if (blueAmount == 127)
        {
            beBlue = true;
            beBlack = false;
        }
    }
    else if (beBlue && blueAmount != 255)
    {
        blueAmount += increaseAmount;
        currentLink.style.color = "rgb(0, 0, " + blueAmount + ")";
        if (blueAmount == 255)
        {
            beBlue = false;
            beWhite = true;
        }
    }
}