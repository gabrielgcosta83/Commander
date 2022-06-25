
class Unit {
    constructor(coord, team) {
        this.id = unitTable.length;
        this.UnitSize = 20;
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

    movement(destCoord) { // Verifica se posicao de destino é diferente da posição de origem e ajusta variavel
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

function addUnitToClick(mapa) { //Adiciona unidade no mapa
    mapa.addEventListener("click", function (pos) {
        const coord = adjCoord([pos.offsetX, pos.offsetY],20);
        const team = teamSelected();
        if (team == null) {
            showErrorMsg("Voce deve selecionar um time");
            return;
        } else {
            let unit = new Unit(coord,team);
            checkRoad(coord,team);
            unit.addToTable();
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

function moveUnitToClick(mapa) {
    mapa.addEventListener("click", function (pos) {
        const newCoord = adjCoord([pos.offsetX, pos.offsetY],20);
        unitTable.forEach(unit => {
            if (checkCoord(newCoord,unit)) {
                showMsg("Clique na posição que deseja mover")
                unit.isSelected = true;
                mapa.addEventListener("click", function(pos) {
                    const destCoord = adjCoord([pos.offsetX, pos.offsetY],20);
                    unit.movement(destCoord);
                    unit.isSelected = false;
              }, { once: true })
            } else {
              showErrorMsg("Você deve clicar em uma unidade");
            }
        });
    }, { once: true })
}

function testButtonClick(mapa) {
    mapa.addEventListener("click", function (pos) {
        const newCoord = adjCoord([pos.offsetX, pos.offsetY],20);
        console.log(getRGB(newCoord));
    }, { once: true })
}

function adjCoord(coord,size) {
    const adjCoord = [coord[0] - (size / 2), coord[1] - (size / 2)];
    return adjCoord;
}

function checkCoord(coord,unit) {
     if ((coord[0] >= (unit.coord[0]-10)) && (coord[0] <= (unit.coord[0]+10)) && (coord[1] >= (unit.coord[1]-10)) && (coord[1] <= (unit.coord[1]+10)))
        return true;
    else
        return false; 
}

function getRGB(coord) {
    //buscar estrada em um raio de 5 pixel
    // const MapArray = Map.MapArray;
    MapArray = Map.context.getImageData(0,0,Map.width,Map.height).data;
    const pixelColor = [ MapArray[(Map.width * coord[1] + coord[0]) * 4],
        MapArray[(Map.width*coord[1] + coord[0]) * 4 + 1],
        MapArray[(Map.width*coord[1] + coord[0]) * 4 + 2], 
        255 ];
    
    return pixelColor;
}

function checkRoad(coord) {
    const pixelColor = getRGB(coord);
    const roadColor = [0,0,0,255];
    console.log(pixelColor,roadColor)
    if (pixelColor == roadColor) {
        console.log("Unidade na estrada")
    } else {
        console.log("Unidada fora da estrada")
    }
    // estrada = pixel da coord na cor marrom
    // se coord estiver na estrada 
    //     true
    // senao 
    //     false
        
}