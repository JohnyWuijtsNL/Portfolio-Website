var canvas, ctx, canvasWidth, canvasHeight, sizeX, sizeY, panelOffSprite, panelOnSprite, panelOffSpriteLoaded, panelOnSpriteLoaded, neighbours;
var tileSize = 10;
tileSize = 38;
var field = []
var oldField = []

window.onload = init;

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
                ctx.drawImage(panelOnSprite, x * tileSize - tileSize, y * tileSize - tileSize);
            }
            else {
                ctx.drawImage(panelOffSprite, x * tileSize - tileSize, y * tileSize - tileSize);
            }
        }
    }

    for (x = 0; x < sizeX; ++x) {
        for (y = 0; y < sizeY; ++y) {
            if (Math.random() > 0.999)
            {
              field[x][y] = !field[x][y];
            }
        }
    }
}

function update() {
    if (panelOnSpriteLoaded && panelOffSpriteLoaded) {
        draw();
    }
}