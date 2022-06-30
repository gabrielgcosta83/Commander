
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
    if (unit.isMoving == true) {
        drawUnitMoving(unit);
        let path = unit.movementPath;
        const nextStep = path.shift();
        console.log(path.length);
        if (path.length == 0) {
            unit.isMoving = false;
            showMsg("Unidade na nova posição");
            return;
        }

        switch (nextStep) {
            case (nextStep[0] > unit.coord[0] && nextStep[1] > unit.coord[1]): //diagonal direita para cima
                unit.coord[0] += unit.speed;
                unit.coord[1] += unit.speed;
                break;
            case (nextStep[0] < unit.coord[0] && nextStep[1] > unit.coord[1]): //diagonal esquerda para cima
                unit.coord[0] -= unit.speed;
                unit.coord[1] += unit.speed;    
                break;
            case (nextStep[0] > unit.coord[0] && nextStep[1] == unit.coord[1]): //direita
                unit.coord[0] += unit.speed;    
                break;
            case (nextStep[0] < unit.coord[0] && nextStep[1] == unit.coord[1]): //esquerda
                unit.coord[0] -= unit.speed;
                break;
            case (nextStep[0] > unit.coord[0] && nextStep[1] < unit.coord[1]): //diagonal direita para baixo
                unit.coord[0] += unit.speed;
                unit.coord[1] -= unit.speed;    
                break;
            case (nextStep[0] < unit.coord[0] && nextStep[1] < unit.coord[1]): //diagonal esquerda para baixo
                unit.coord[0] -= unit.speed;
                unit.coord[1] -= unit.speed;    
                break;
            case (nextStep[0] == unit.coord[0] && nextStep[1] > unit.coord[1]): //cima
                unit.coord[1] += unit.speed;    
                break;
            case (nextStep[0] == unit.coord[0] && nextStep[1] < unit.coord[1]): //baixo
                unit.coord[1] -= unit.speed;
                break;
            // case (nextStep[0] == unit.coord[0] && nextStep[1] == unit.coord[1]): //Chegou no destino
            //     unit.isMoving = false;
            //     showMsg("Unidade na nova posição");
        }
            


        // if (nextStep[0] > unit.coord[0] && nextStep[1] > unit.coord[1]) {
        //     unit.coord[0] += unit.speed;
        //     unit.coord[1] += unit.speed;
        // } 

        // if ()
        //importa o path e caminha até chegar no ponto final


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



