
class Unit {
    constructor(coord, team) {
        this.id = unitTable.length;
        this.size = 20;
        this.coord = coord;
        this.team = team;
        this.speed = 1;
        this.isMovingX = false;
        this.isMovingY = false;
        this.isSelected = false;
        this.destCoord = [];
    }

    setAdjCoord(newCoord) { // Corrige coordenadas do clique
        this.coord = [(newCoord[0] - (this.UnitSize / 2)),(newCoord[1] - (this.UnitSize / 2))]
    }

    addToTable() { // Carrega unidade na tabela
        unitTable.push(this);
        showMsg("Unidade adicionada")
    }

    movement(destCoord) { // Verifica se posicao de destino é diferente da posição de origem isMoving
        if (destCoord[0] != this.coord[0]) {
            this.isMovingX = true;
            this.destCoord[0] = destCoord[0];
            showMsg("Movendo Unidade...");
        }
        if (destCoord[1] != this.coord[1]) {
            this.isMovingY = true;
            this.destCoord[1] = destCoord[1];
            showMsg("Movendo Unidade...");
        }
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

function addUnitToTable(coord, team) {
    let id = unitTable.length;
    const unit = {
            id: id, 
            coord: coord,
            team: team
        }
    unitTable.push(unit);
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
        const newCoord = [pos.offsetX, pos.offsetY];
        unitTable.forEach(unit => {
            if (checkCoordUnit(newCoord,unit)) {
                showMsg("Clique na posição que deseja mover")
                unit.isSelected = true;
                mapa.addEventListener("click", function(pos) {
                    const destCoord = [pos.offsetX, pos.offsetY];
                    const isRoad = checkRoad(destCoord);
                    if (isRoad == null) {
                        showErrorMsg("As unidades só se movem em estradas");     
                        unit.isSelected = false;                
                    } else {
                        unit.movement(destCoord);
                        unit.isSelected = false;
                    }           
              }, { once: true })
            } else {
              showErrorMsg("Você deve clicar em uma unidade");
            }
        });
    }, { once: true })
}

function testButtonClick(mapa) {
    mapa.addEventListener("click", function (pos) {
        const newCoord = [pos.offsetX, pos.offsetY];
        checkRoad(newCoord);
    }, { once: true })
}

//Ajusta coordenada ao centro da unidade
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
    const pixelColor = [ Map.MapArray[(Map.width * coord[1] + coord[0]) * 4],
        Map.MapArray[(Map.width*coord[1] + coord[0]) * 4 + 1],
        Map.MapArray[(Map.width*coord[1] + coord[0]) * 4 + 2], 
        255 ];
    
    return pixelColor;
}

//Verifica se PixelColor == TestColor
function checkColor(pixelColor, testColor) {
    if (
        pixelColor[0] == testColor[0] &&
        pixelColor[1] == testColor[1] &&
        pixelColor[2] == testColor[2] &&
        pixelColor[3] == testColor[3] 
    ) { return true }
    else { return false } 
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
    const rectImageData = Map.context.getImageData(coord[0], coord[1], distance, distance).data;

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
    const roadColor = [0,0,0,255];
    const roadCoord = findColor(coord, roadColor, 10);
    // addPointToTable(roadCoord, "yellow");
    return roadCoord;
}
