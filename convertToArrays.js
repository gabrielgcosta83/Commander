
 //Cria arrays 2D
 function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

//Cria Matriz de Falsos
function createfalseMap(width, height) {
        let falseMap = createArray(width,height);

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
            falseMap[i][j] = false;
            }
        }
        
        return falseMap;
}

//Cria matriz binária para estradas
function createRoadMap(width, falseMap) {
    for (let i = 0; i < CanvasMap.MapArray.length ; i += 4 ) { //Percorre cada pixel da ImageData do Mapa
        //Define a coordenada do Mapa
        const coord = indexToCoord(i, width); 
        const x = coord[0];
        const y = coord[1];

        // Encontra cor da coordenada
        const pixelColor = [CanvasMap.MapArray[i], CanvasMap.MapArray[i+1], CanvasMap.MapArray[i+2], CanvasMap.MapArray[i+3]];
    
        // Se for uma estrada, marca como 1
        if (checkColor(pixelColor, roadColor)) {
            falseMap[x][y] = 1;
        }
        
        return falseMap; //retorna mapa com estradas
    }  
}

