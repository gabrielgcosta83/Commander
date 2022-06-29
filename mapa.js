
let unitTable = [];
let pointTable = [];
let img = document.getElementById("map_img");
const roadColor = [0,0,0,255];

CanvasMap.start();
updateAllMap();
showMsg("Adicione Unidades");

function updateAllMap() {
    CanvasMap.clear();
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
    CanvasMap.context.fillStyle = unit.team;
    CanvasMap.context.fillRect(unit.coord[0] - (unit.size/2), unit.coord[1] - (unit.size/2), 20, 20);
}

function drawPoint(coord,color) {
    CanvasMap.context.fillStyle = color;
    CanvasMap.context.fillRect(coord[0], coord[1], 1, 1);
}

function drawUnitMoving(unit) {
    CanvasMap.context.strokeStyle = "white"
    CanvasMap.context.strokeRect(unit.coord[0] - (unit.size/2), unit.coord[1] - (unit.size/2), 20, 20);
    CanvasMap.context.beginPath();
    CanvasMap.context.moveTo(unit.coord[0] , unit.coord[1]);
    CanvasMap.context.lineTo(unit.destCoord[0], unit.destCoord[1]);
    CanvasMap.context.stroke();
}

function drawUnitSelected(unit) {
    if (unit.isSelected == true) {
        CanvasMap.context.strokeStyle = "white";
        CanvasMap.context.strokeRect(unit.coord[0] - (unit.size/2), unit.coord[1] - (unit.size/2), 20, 20);
    }
}
    
function testRoad(coord) {
    const color = getRGB(coord);
    return (checkColor(color, roadColor))
}


function moveUnit(unit) {
    if (unit.isMovingX == true) {
        drawUnitMoving(unit);

        //importa o path e caminha até chegar no ponto final


        // if (unit.coord[0] > unit.destCoord[0] && testRoad([(unit.coord[0] - unit.speed),unit.coord[1]])) { unit.coord[0] = unit.coord[0] - unit.speed; }
        // if (unit.coord[0] > unit.destCoord[0]) {
        //     if (testRoad([(unit.coord[0] - unit.speed),unit.coord[1]])) {
        //         unit.coord[0] = unit.coord[0] - unit.speed;
        //     } else if (testRoad([(unit.coord[0] + unit.speed),unit.coord[1]])) {
        //         unit.coord[0] = unit.coord[0] + unit.speed;
        //     }
        // }
        // // if (unit.coord[0] < unit.destCoord[0] && testRoad([(unit.coord[0] + unit.speed),unit.coord[1]])) { unit.coord[0] = unit.coord[0] + unit.speed; }
        // if (unit.coord[0] < unit.destCoord[0]) {
        //     if (testRoad([(unit.coord[0] + unit.speed),unit.coord[1]])) {
        //         unit.coord[0] = unit.coord[0] + unit.speed;
        //     } else if (testRoad([(unit.coord[0] - unit.speed),unit.coord[1]])) {
        //         unit.coord[0] = unit.coord[0] - unit.speed;
        //     }
        // }
        // if (unit.coord[0] == unit.destCoord[0] && unit.isMovingY == true) { unit.isMovingX = false; }
        // if (unit.coord[0] == unit.destCoord[0] && unit.isMovingY == false) { 
        //     unit.isMovingX = false; 
        //     showMsg("Unidade na nova posição");
        // }
    }
    if (unit.isMovingY == true) {
        drawUnitMoving(unit);
        if (unit.coord[1] > unit.destCoord[1]) {
            if (testRoad([unit.coord[0],(unit.coord[1] - unit.speed)])) {
                unit.coord[1] = unit.coord[1] - unit.speed;
            } else if (testRoad([unit.coord[0],(unit.coord[1] + unit.speed)])) {
                unit.coord[1] = unit.coord[1] + unit.speed;
            }
        }
        // if (unit.coord[1] < unit.destCoord[1] && testRoad([unit.coord[0],(unit.coord[1] + unit.speed)])) { unit.coord[1] = unit.coord[1] + unit.speed; }
        if (unit.coord[1] < unit.destCoord[1]) {
            if (testRoad([unit.coord[0],(unit.coord[1] + unit.speed)])) {
                unit.coord[1] = unit.coord[1] + unit.speed;
            } else if (testRoad([unit.coord[0],(unit.coord[1] - unit.speed)])) {
                unit.coord[1] = unit.coord[1] - unit.speed;
            }
        }
        if (unit.coord[1] == unit.destCoord[1] && unit.isMovingX == true) { unit.isMovingY = false; }
        if (unit.coord[1] == unit.destCoord[1] && unit.isMovingX == false) { 
            unit.isMovingY = false;
            showMsg("Unidade na nova posição");
        }
    }
}



