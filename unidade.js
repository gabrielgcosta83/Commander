
class Unit {
    constructor(coord, team) {
        this.id = unitTable.length;
        this.size = 20;
        this.coord = coord;
        this.team = team;
        this.speed = 1;
        this.isMoving = false;
        this.isMovingY = false;
        this.isSelected = false;
        this.destCoord = [];
        this.movementPath = [];
    }

    setAdjCoord(newCoord) { // Corrige coordenadas do clique
        this.coord = [(newCoord[0] - (this.UnitSize / 2)),(newCoord[1] - (this.UnitSize / 2))]
    }

    addToTable() { // Carrega unidade na tabela
        unitTable.push(this);
        showMsg("Unidade adicionada")
    }

    movement(destCoord) { // Verifica se posicao de destino é diferente da posição de origem isMoving
        if (destCoord != this.coord) {
            this.isMoving = true;
        }       
        // if (destCoord[0] != this.coord[0]) {
        //     this.isMovingX = true;
        //     this.destCoord[0] = destCoord[0];
        //     showMsg("Movendo Unidade...");
        // }
        // if (destCoord[1] != this.coord[1]) {
        //     this.isMovingY = true;
        //     this.destCoord[1] = destCoord[1];
        //     showMsg("Movendo Unidade...");
        // }
    }

    setPath(path) {
        this.movementPath = path;
    }        
}

//Adiciona unidade no mapa
function addUnitToClick(mapa) { 
    mapa.addEventListener("click", function (pos) {
        const coord = [pos.offsetX, pos.offsetY];
        const team = teamSelected();
        if (team == null) {
            showErrorMsg("Voce deve selecionar um time");
            return;
        } else {
            const finalCoord = checkRoad(coord);
            if (finalCoord == null) {
                showErrorMsg("A unidade deve estar em uma estrada");
                return;
            }
            else {
            const unit = new Unit(finalCoord,team);
            unit.addToTable();
            }
        }
        
    }, { once: true });
}

function teamSelected() {
    const checkboxes = document.querySelectorAll('input[name="team"]:checked')
    if (checkboxes.length === 0) {
        return null;
    } else { 
        const team = document.querySelector('input[name="team"]:checked').value;
        return team;
    }
}

function addPointToTable(coord,color) {
    const point = {
        coord: coord,
        color: color
    }
    
    pointTable.push(point);
}

function moveUnitToClick(mapa) {
    mapa.addEventListener("click", function (pos) {
        const newCoord = [pos.offsetX, pos.offsetY]; // determina posição do Click
        
        unitTable.forEach(unit => {
            if (!checkCoordUnit(newCoord,unit)) { // verifica se clicou em uma unidade
                showErrorMsg("Você deve clicar em uma unidade");
                return;
            } else { // Se clicou na unidade
                showMsg("Clique na posição que deseja mover")
                unit.isSelected = true;
                mapa.addEventListener("click", function(pos) { 
                    const destCoord = [pos.offsetX, pos.offsetY]; // Determina o click da nova posicao
                    const isRoad = checkRoad(destCoord); // Verifica se é uma estrada
                    if (isRoad == null) {
                        showErrorMsg("As unidades só se movem em estradas");     
                        unit.selected = false;                    

                    // Se for estrada, encontra e define menor caminho e inicia o movimento.
                    } else {
                        const path = getPath(unit.coord, destCoord);
                        if (path == null) {
                            showErrorMsg("Nenhum caminho encontrado")
                        }
                        else {
                            unit.movement(destCoord);
                            unit.setPath(path);
                            unit.selected = false;
                        }
                    }           
              }, { once: true })
            }
        });
    }, { once: true })
}

// function testButtonClick(mapa) {
//     mapa.addEventListener("click", function (pos) {
//         const newCoord = [pos.offsetX, pos.offsetY];
//         checkRoad(newCoord);
//     }, { once: true })
// }

//Ajusta centro da unidade ao click
function adjCoord(coord,size) {
    const adjCoord = [coord[0] - (size / 2), coord[1] - (size / 2)];
    return adjCoord;
}


//Verifica se existe unidade na coordenada
function checkCoordUnit(coord,unit) {
     if ((coord[0] >= (unit.coord[0]-10)) && (coord[0] <= (unit.coord[0]+10)) && (coord[1] >= (unit.coord[1]-10)) && (coord[1] <= (unit.coord[1]+10)))
        return true;
    else
        return false; 
}


//retorna corRGB do Mapa em coord
function getRGB(coord) {
    const index = coordToIndex(coord, 1109);
    const pixelColor = [CanvasMap.MapArray[index], CanvasMap.MapArray[index + 1], CanvasMap.MapArray[index + 2], CanvasMap.MapArray[index + 3]];
    return pixelColor;
}

//Verifica se PixelColor == TestColor
function checkColor(pixelColor, testColor) {
    if (
        pixelColor[0] == testColor[0] &&
        pixelColor[1] == testColor[1] &&
        pixelColor[2] == testColor[2] &&
        pixelColor[3] == testColor[3] 
    ) return true 
    else  return false 
}

//Transforma de Coord para indice ImageData para Coord
function coordToIndex(coord, width) {
    const index = (width * coord[1] + coord[0]) * 4;
    
    return index
}

//Transforma de indice da ImageData para Coord
function indexToCoord(index, width) {
    const x = (index / 4) % width;
    const y = Math.floor((index / 4) / width);    

    return [x,y]
}

// buscar posicao mais proxima com a cor Test em um retangulo distance
function findColor(coord, testColor, distance) {
    
    //constroi array do ret
    const rectImageData = CanvasMap.context.getImageData(coord[0], coord[1], distance, distance).data;

    //encontra index da cor
    const rectMatchColorIndex = rectImageData.findIndex(findColorIndex);

    function findColorIndex(value, index, ImageData) {
        return ( ImageData[index] == testColor[0] &&
        ImageData[index + 1] == testColor[1] &&
        ImageData[index + 2] == testColor[2] &&
        ImageData[index + 3] == testColor[3] )
    }
    
    if (rectMatchColorIndex == -1) {
        return null;
    }

    //converte de index para coordenadas no retangulo
    const rectMatchColorCoord = indexToCoord(rectMatchColorIndex, distance);
    
    //soma as coordenadas encontradas as iniciais
    const coordMatchColor = [coord[0] + rectMatchColorCoord[0], coord[1] + rectMatchColorCoord[1]];

    return coordMatchColor;
}

function checkRoad(coord) {
    // addPointToTable(coord,"red");
    const roadCoord = findColor(coord, roadColor, 10);
    // addPointToTable(roadCoord, "yellow");
    return roadCoord;
}
