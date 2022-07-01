
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
    let coord = [];
    CanvasMap.context.strokeStyle = "yellow"
    CanvasMap.context.strokeRect(unit.coord[0] - (unit.size/2), unit.coord[1] - (unit.size/2), 20, 20);
    CanvasMap.context.beginPath();
    CanvasMap.context.moveTo(unit.coord[0] , unit.coord[1]);
    for (let i = 0; i < unit.movementPath.length ; i++) {
        coord = unit.movementPath[i];
        CanvasMap.context.lineTo(coord[0], coord[1]);
    }
    CanvasMap.context.stroke();    
}

function drawUnitSelected(unit) {
    if (unit.isSelected == true) {
        CanvasMap.context.strokeStyle = "white";
        CanvasMap.context.strokeRect(unit.coord[0] - (unit.size/2), unit.coord[1] - (unit.size/2), 20, 20);
    }
}
    
// function testRoad(coord) {
//     const color = getRGB(coord);
//     return (checkColor(color, roadColor))
// }


function moveUnit(unit) {

    //Otimizar, basta fazer a unidade caminhar ao proximo indice do path. Em caso speed != 1, pula x indices.
    if (unit.isMoving == true) {
        drawUnitMoving(unit);
        let path = unit.movementPath;
        const nextStep = path.shift();
        if (path.length == 0) {
            unit.isMoving = false;
            showMsg("Unidade na nova posição");
            return;
        } else {
            if (nextStep[0] > unit.coord[0] && nextStep[1] > unit.coord[1]) { //diagonal direita para baixo
                unit.coord[0] += unit.speed;
                unit.coord[1] += unit.speed;
                return
            }
            if (nextStep[0] < unit.coord[0] && nextStep[1] > unit.coord[1]) { //diagonal esquerda para baixo
                unit.coord[0] -= unit.speed;
                unit.coord[1] += unit.speed;    
                return
            }
            if (nextStep[0] > unit.coord[0] && nextStep[1] == unit.coord[1]){ //direita
                unit.coord[0] += unit.speed;    
                return
            }
            if (nextStep[0] < unit.coord[0] && nextStep[1] == unit.coord[1]){ //esquerda
                unit.coord[0] -= unit.speed;
                return
            }
            if (nextStep[0] > unit.coord[0] && nextStep[1] < unit.coord[1]){ //diagonal direita para cima
                unit.coord[0] += unit.speed;
                unit.coord[1] -= unit.speed;    
                return
            }
            if (nextStep[0] < unit.coord[0] && nextStep[1] < unit.coord[1]){ //diagonal esquerda para cima
                unit.coord[0] -= unit.speed;
                unit.coord[1] -= unit.speed;    
                return
            }
            if (nextStep[0] == unit.coord[0] && nextStep[1] > unit.coord[1]){ //cima
                unit.coord[1] += unit.speed;    
                return
            }
            if (nextStep[0] == unit.coord[0] && nextStep[1] < unit.coord[1]){ //baixo
                unit.coord[1] -= unit.speed;
                return
            }
        }
    }
}


