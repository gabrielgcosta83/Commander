const buttonMove = document.getElementById("button__move");
const buttonAdd = document.getElementById("button__add");

// Canvas
let CanvasMap = {
    canvas : document.getElementById("mapa__area"),
    width : 1109,
    height : 1109,
    MapArray: [],
    
    start : function() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.context.drawImage(img,0,0);
        this.MapArray = this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;
        this.interval = setInterval(updateAllMap, 100);
    },
    clear : function() {
        this.context.drawImage(img,0,0);
    },
}


//Mostra mensagens
function showMsg(msg) {
    let error_msg = document.querySelector("#error_msg");
    error_msg.setAttribute("style", "color: black");
    error_msg.textContent = msg;
}

function showErrorMsg(errorMsg) {
    let error_msg = document.querySelector("#error_msg");
    error_msg.setAttribute("style", "color: red");
    error_msg.textContent = errorMsg;
}

function showCoordMsg(coordMsg) {
    let coord_msg = document.querySelector("#coord_msg");
    coord_msg.setAttribute("style", "color: blue");
    coord_msg.textContent = coordMsg;
}

//Clica para Adicionar Unidade
buttonAdd.addEventListener("click", function(event) {  
    event.preventDefault();
    showMsg("Clique na posição desejada")
    addUnitToClick(CanvasMap.canvas);
});

// //  Clica para Mover Unidade
// buttonMove.addEventListener("click", function(event) {
//     event.preventDefault();
//     showMsg("Clique na unidade que deseja mover")
// });

CanvasMap.canvas.addEventListener("click",MapClickSelect);

function MapClickSelect(event) {
    event.preventDefault();
    const newCoord = [pos.offsetX, pos.offsetY];
    moveUnitToClick(newCoord);
}

CanvasMap.canvas.addEventListener("mousemove", function(event) {
    let pixelColor = getRGB([event.offsetX, event.offsetY]);
    showCoordMsg(event.offsetX + "," + event.offsetY + ";" + pixelColor);
})