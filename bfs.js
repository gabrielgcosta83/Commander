
const image = Map.MapArray;
let roadMap = createArray(Map.width, Map.height);
let visitedMap =  createArray(Map.width, Map.height);

for (let i = 0; i < Map.width; i++) {
    for (let j = 0; j < Map.width; j++) {
        visitedMap[i][j] = false;
    }
}

for (let i = 0; i < Map.MapArray.length ; i += 4 ) {
    const coord = indexToCoord(i, Map.width);
    const x = coord[0];
    const y = coord[1];
    const pixelColor = [Map.MapArray[i], Map.MapArray[i+1], Map.MapArray[i+2], Map.MapArray[i+3]];

    if (checkColor(pixelColor, roadColor)) {
        roadMap[x][y] = 1;
    } else { 
        roadMap[x][y] = 0;
    }
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

const C = Map.width;
const R = Map.height;
const startPoint = [308,863];
const endPoint = [473,894];

const rowQ = [];
const colQ = [];

let reachedEnd = false;

let nodeTable = [];

let dr = [1,-1,0,0,1,-1,1,-1];
let dc = [0,0,-1,1,1,-1,-1,1];

function solve() {
    rowQ.push(startPoint[0]);
    colQ.push(startPoint[1]);
    visitedMap[startPoint[0],startPoint[1]] = true;

    while ( rowQ.length > 0 ) {
        const r = rowQ[0];
        const c = colQ[0];
        rowQ.splice(0,1);
        colQ.splice(0,1);

        if (endPoint[0] == r && endPoint[1] == c) {
            reachedEnd = true;
            break;
        }
        explore_neighbors(r,c);
    }

        if (reachedEnd) {
            console.log("Solucao encontrada: ", endPoint);
            return;
        } else {
            console.log("Solucao nao encontrada");
            return;
        }
}

function explore_neighbors(r,c)  {
    for (let i = 0; i < 8 ; i++) {
        let rr = r + dr[i];
        let cc = c + dc[i];
        
        if (rr < 0 || cc < 0) {  continue }
        if (rr > R || cc > C) {  continue }

        if (visitedMap[rr][cc] == true ) { continue }  

        if (roadMap[rr][cc] == 0) { continue }

        addPointToTable([rr,cc],"yellow");
        rowQ.push(rr);
        colQ.push(cc);
        visitedMap[rr][cc] = true;
        nodeTable.push([rr,cc]);
    }
}









