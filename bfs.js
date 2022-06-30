function getPath(startCoord, endCoord) {
    let visitedMap = createfalseMap(CanvasMap.width, CanvasMap.height); // cria matriz de visitados
    let roadMap = createRoadMap(CanvasMap.width, CanvasMap.height); // cria matriz de estradas
    
    const dr = [1,-1,0,0,1,-1,1,-1]; // direções pra cima, pra baixo e diagonais
    const dc = [0,0,-1,1,1,-1,-1,1];
    

    const rowQ = []; // Variaveis do queue
    const colQ = [];
    let history = new Map(); // Historico do passo a passo

    //Adiciona primeiro ponto ao queue
    rowQ.push(startCoord[0]);
    colQ.push(startCoord[1]);
    
    //Define primeiro ponto como visitado
    visitedMap[startCoord[0]][startCoord[1]] = true;

    //Define primeiro ponto na lista de passos
    history.set(startCoord.toString(),null);
    
    //Inicia a rodar o queue
    while ( rowQ.length > 0 ) {
        //Define coordenadas do queue
        let r = rowQ[0]; 
        let c = colQ[0];
    
        //Retira do queue
        rowQ.shift();
        colQ.shift();
    
        //Verifica se chegou no ponto final
        if (endCoord[0] == r && endCoord[1] == c) {
            let path = [];
            while (r != startCoord[0] || c != startCoord[1]) { //Percorre o historico do ultimo ao primeiro ponto
                let coord = [r,c];
                path.push(coord);
                let prevCoord = history.get(coord.toString());
                r = prevCoord[0];
                c = prevCoord[1];
                }
    
            return path.reverse() // retorna o caminho encontrado
            }
    
            explore_neighbors(r,c,roadMap);
        }
    
    
    //Mapeia coordenadas adjacentes e adiciona ao queue
    function explore_neighbors(r,c,roadMap)  {
         for (let i = 0; i < 8 ; i++) {
            let rr = r + dr[i];
            let cc = c + dc[i];
            
            // Verifica se está dentro do mapa
            if (rr < 0 || cc < 0) { continue }
            if (rr >= CanvasMap.height || cc >= CanvasMap.width) { continue }
            
            if (visitedMap[rr][cc] == true ) { continue }  // verifica se o ponto ja foi visitado
    
            if (roadMap[rr][cc] == 0) { continue } // verifica se é estrada
    
            //Adiciona ao queue, marca como visitado e adiciona no Map de Historico
            rowQ.push(rr);
            colQ.push(cc);
            visitedMap[rr][cc] = true;
            history.set([rr,cc].toString(),[r,c]);
            }
    }

}



// //Calcula o caminho mais curto e retorna o path
// function bfs(startCoord, endCoord) {
//     //Adiciona primeiro ponto ao queue
//     rowQ.push(startCoord[0]);
//     colQ.push(startCoord[1]);

//     //Define primeiro ponto como visitado
//     visitedMap[startCoord[0],startCoord[1]] = true;

//     console.log(startCoord.toString());
//     console.log(history);
//     //Define primeiro ponto na lista de passos
//     history.set(startCoord.toString(),null);

//     //Inicia a rodar o queue
//     while ( rowQ.length > 0 ) {
//         //Define coordenadas do queue
//         let r = rowQ[0]; 
//         let c = colQ[0];

//         //Retira do queue
//         rowQ.shift();
//         colQ.shift();

//         //Verifica se chegou no ponto final
//         if (endCoord[0] == r && endCoord[1] == c) {
//             let path = [];
//             while ([r] != startCoord[0] && c != startCoord[1]) { //Percorre o historico do ultimo ao primeiro ponto
//                 path.push([r,c]);
//                 let coord = [r,c];
//                 let prevCoord = history.get(coord.toString());
//                 r = prevCoord[0];
//                 c = prevCoord[1];
//             }

//             return path.reverse() // retorna o caminho encontrado
//         }

//         explore_neighbors(r,c,roadMap);
//     }

//     return null;
// }

// //Mapeia coordenadas adjacentes e adiciona ao queue
// function explore_neighbors(r,c,roadMap)  {
//     const dr = [1,-1,0,0,1,-1,1,-1]; // direções pra cima, pra baixo e diagonais
//     const dc = [0,0,-1,1,1,-1,-1,1];

//     for (let i = 0; i < 8 ; i++) {
//         let rr = r + dr[i];
//         let cc = c + dc[i];
        
//         // Verifica se está dentro do mapa
//         if (rr < 0 || cc < 0) continue
//         if (rr > CanvasMap.height || cc > CanvasMap.width) continue

//         if (visitedMap[rr][cc] == true ) { continue }  // verifica se o ponto ja foi visitado

//         if (roadMap[rr][cc] == 0) { continue } // verifica se é estrada

//         //Adiciona ao queue, marca como visitado e adiciona no Map de Historico
//         rowQ.push(rr);
//         colQ.push(cc);
//         visitedMap[rr][cc] = true;
//         history.set([rr,cc].toString(),[r,c]);
//         }
// }









