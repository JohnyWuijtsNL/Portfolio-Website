var canvas, ctx, canvasWidth, canvasHeight, sizeX, sizeY, panelOffSprite, panelOnSprite, panelOffSpriteLoaded, panelOnSpriteLoaded, neighbours;
var tileSize = 10;
tileSize = 50;
var field = []
var oldField = []
var scrollValue;
var isHovering = false;
var projectFont;
var projectsText;
var oldProjectsFont = 7;

window.onload = init;

window.addEventListener('scroll', function () {
    scrollValue = window.scrollY;
    document.getElementById('index-canvas').style.top = scrollValue * 0.5 + "px";
})

function init() {
    sizeX = Math.floor(window.innerWidth / tileSize);
    sizeY = Math.floor(window.innerHeight / tileSize) * 8;
    canvas = document.getElementById("index-canvas");
    ctx = canvas.getContext("2d");
    canvas.width = sizeX * tileSize;
    canvas.height = sizeY * tileSize;
    sizeX += 2;
    sizeY += 2;
    panelOffSprite = new Image();
    panelOffSprite.src = "img/panel-off.png";
    panelOffSprite.onload = function () {
        panelOffSpriteLoaded = true;
    }
    panelOnSprite = new Image();
    panelOnSprite.src = "img/panel-on.png";
    panelOnSprite.onload = function () {
        panelOnSpriteLoaded = true;
    }
    generateField()
    interval = setInterval(update, 100);

    projectsText = document.getElementById('projects');
}

function generateField() {
    for (var x = 0; x < sizeX; x++) {
        field[x] = [];
        oldField[x] = [];
        if (x == 0 || x == sizeX - 1) {
            for (var y = 0; y < sizeY; y++) {

                field[x][y] = false;
            }
        }
        else {
            for (var y = 0; y < sizeY; y++) {
                if (y == 0 || y == sizeY - 1) {

                    field[x][y] = false;
                }
                else {

                    field[x][y] = Math.random() > 0.85;
                }
            }
        }
    }
}

function draw() {
    for (var x = 0; x < sizeX; x++) {
        for (var y = 0; y < sizeY; y++) {
            oldField[x][y] = field[x][y];
        }
    }
    for (var x = 1; x < sizeX - 1; x++) {
        for (var y = 1; y < sizeY - 1; y++) {
            neighbours = 0;
            if (oldField[x - 1][y - 1]) { neighbours++; }
            if (oldField[x][y - 1]) { neighbours++; }
            if (oldField[x + 1][y - 1]) { neighbours++; }
            if (oldField[x - 1][y]) { neighbours++; }
            if (oldField[x + 1][y]) { neighbours++; }
            if (oldField[x - 1][y + 1]) { neighbours++; }
            if (oldField[x][y + 1]) { neighbours++; }
            if (oldField[x + 1][y + 1]) { neighbours++; }
            if (neighbours < 2) { field[x][y] = false; }
            if (neighbours == 3) { field[x][y] = true; }
            if (neighbours > 3) { field[x][y] = false; }
        }
    }

    for (x = 0; x < sizeX; ++x) {
        for (y = 0; y < sizeY; ++y) {
            if (field[x][y]) {
                ctx.drawImage(panelOnSprite, x * tileSize - tileSize, y * tileSize - tileSize, tileSize, tileSize);
            }
            else {
                ctx.drawImage(panelOffSprite, x * tileSize - tileSize, y * tileSize - tileSize, tileSize, tileSize);
            }
        }
    }

    for (x = 1; x < sizeX - 1; ++x) {
        for (y = 1; y < sizeY - 1; ++y) {
            if (Math.random() > 0.999) {
                field[x][y] = !field[x][y];
            }
        }
    }
}

function update() {
    if (panelOnSpriteLoaded && panelOffSpriteLoaded) {
        draw();
    }
    if (isHovering) {
        projectsText.style.color = generateColor();
        projectFont = oldProjectsFont;
        while (projectFont == oldProjectsFont) {
            projectFont = Math.floor(Math.random() * 17);
        }
        oldProjectsFont = projectFont;
        switch (projectFont) {
            case 0:
                projectsText.style.fontFamily = "'Courier New', Courier, monospace";
                break;
            case 1:
                projectsText.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
                break;
            case 2:
                projectsText.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
                break;
            case 3:
                projectsText.style.fontFamily = "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif";
                break;
            case 4:
                projectsText.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                break;
            case 5:
                projectsText.style.fontFamily = "'Times New Roman', Times, serif";
                break;
            case 6:
                projectsText.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
                break;
            case 7:
                projectsText.style.fontFamily = "Arial, Helvetica, sans-serif";
                break;
            case 8:
                projectsText.style.fontFamily = "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif";
                break;
            case 9:
                projectsText.style.fontFamily = "Georgia, 'Times New Roman', Times, serif";
                break;
            case 10:
                projectsText.style.fontFamily = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
                break;
            case 11:
                projectsText.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
                break;
            case 12:
                projectsText.style.fontFamily = "cursive";
                break;
            case 13:
                projectsText.style.fontFamily = "fantasy";
                break;
            case 14:
                projectsText.style.fontFamily = "monospace";
                break;
            case 15:
                projectsText.style.fontFamily = "sans-serif";
                break;
            case 16:
                projectsText.style.fontFamily = "serif";
                break;
        }
    }
    else {
        projectsText.style.color = "rgb(0, 0, 255)";
        projectsText.style.fontFamily = "inherit";
    }
}

function changeHover(hovering) {
    isHovering = hovering;
}

function generateColor() {
    var changingColor = Math.floor(Math.random() * 6);
    console.log(changingColor);
    switch (changingColor) {
        case 0:
            return "rgb(" + Math.floor(Math.random() * 256) + ", 0, 255)";
        case 1:
            return "rgb(0, " + Math.floor(Math.random() * 256) + ", 255)";
        case 2:
            return "rgb(0, 255, " + Math.floor(Math.random() * 256) + ")";
        case 3:
            return "rgb(" + Math.floor(Math.random() * 256) + ", 255, 0)";
        case 4:
            return "rgb(255, " + Math.floor(Math.random() * 256) + ", 0)";
        case 5:
            return "rgb(255, 0, " + Math.floor(Math.random() * 256) + ")";
    }

}