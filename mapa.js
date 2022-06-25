
let unitTable = [];
let pointTable = [];
let img = document.getElementById("map_img");

Map.start();
updateAllMap();
showMsg("Adicione Unidades");

function updateAllMap() {
    Map.clear();
    if (unitTable.length > 0) {
        unitUpdate();
    }
    if (pointTable.length > 0) {
        pointUpdate();
    }
}

function unitUpdate() {
    unitTable.forEach(unit => {
        drawUnit(unit);
        drawUnitSelected(unit)
        moveUnit(unit);
    })
}

function pointUpdate() {
    pointTable.forEach(point => {
        drawPoint(point.coord,point.color);
    })
}

function drawUnit(unit) {
    Map.context.fillStyle = unit.team;
    Map.context.fillRect(unit.coord[0] - (unit.size/2), unit.coord[1] - (unit.size/2), 20, 20);
}

function drawPoint(coord,color) {
    Map.context.fillStyle = color;
    Map.context.fillRect(coord[0], coord[1], 5, 5);
}

function drawUnitMoving(unit) {
    Map.context.strokeStyle = "white"
    Map.context.strokeRect(unit.coord[0] - (unit.size/2), unit.coord[1] - (unit.size/2), 20, 20);
    Map.context.beginPath();
    Map.context.moveTo(unit.coord[0] , unit.coord[1]);
    Map.context.lineTo(unit.destCoord[0], unit.destCoord[1]);
    Map.context.stroke();
}

function drawUnitSelected(unit) {
    if (unit.isSelected == true) {
        Map.context.strokeStyle = "white";
        Map.context.strokeRect(unit.coord[0] - (unit.size/2), unit.coord[1] - (unit.size/2), 20, 20);
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



