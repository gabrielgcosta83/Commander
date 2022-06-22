
let unitTable = [];


// Canvas
let Map = {
    canvas : document.getElementById("mapa__area"),
    start : function() {
        this.canvas.width = 768;
        this.canvas.height = 768;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateAllMap, 100);
    },
    clear : function() {
        this.context.fillStyle = "darkgreen";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
}

Map.start();
updateAllMap();
showMsg("Adicione Unidades");

function updateAllMap() {
    Map.clear();
    if (unitTable.length > 0) {
        unitUpdate();
    }
}

function unitUpdate() {
    unitTable.forEach(unit => {
        drawUnit(unit);
        drawUnitSelected(unit)
        moveUnit(unit);
    })
}

function drawUnit(unit) {
    Map.context.fillStyle = unit.team;
    Map.context.fillRect(unit.coord[0], unit.coord[1], 20, 20);
}

function drawUnitMoving(unit) {
    Map.context.strokeStyle = "white"
    Map.context.strokeRect(unit.coord[0], unit.coord[1], 20, 20);
    Map.context.beginPath();
    Map.context.moveTo((unit.coord[0] + 10) , (unit.coord[1] + 10));
    Map.context.lineTo((unit.destCoord[0] + 10), (unit.destCoord[1] + 10));
    Map.context.stroke();
}

function drawUnitSelected(unit) {
    if (unit.isSelected == true) {
        Map.context.strokeStyle = "white";
        Map.context.strokeRect(unit.coord[0], unit.coord[1], 20, 20);
    }
}
    

function moveUnit(unit) {
    if (unit.isMovingX == true) {
        drawUnitMoving(unit);
        if (unit.coord[0] > unit.destCoord[0]) { unit.coord[0] = unit.coord[0] - unit.speed; }
        if (unit.coord[0] < unit.destCoord[0]) { unit.coord[0] = unit.coord[0] + unit.speed; }
        if (unit.coord[0] == unit.destCoord[0] && unit.isMovingY == true) { unit.isMovingX = false; }
        if (unit.coord[0] == unit.destCoord[0] && unit.isMovingY == false) { 
            unit.isMovingX = false; 
            showMsg("Unidade na nova posição");
        }
    }
    if (unit.isMovingY == true) {
        drawUnitMoving(unit);
        if (unit.coord[1] > unit.destCoord[1]) { unit.coord[1] = unit.coord[1] - unit.speed; }
        if (unit.coord[1] < unit.destCoord[1]) { unit.coord[1] = unit.coord[1] + unit.speed; }
        if (unit.coord[1] == unit.destCoord[1] && unit.isMovingX == true) { unit.isMovingY = false; }
        if (unit.coord[1] == unit.destCoord[1] && unit.isMovingX == false) { 
            unit.isMovingY = false;
            showMsg("Unidade na nova posição");
        }
    }
}



