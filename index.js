const buttonMove = document.getElementById("button__move");
const buttonAdd = document.getElementById("button__add");

// Canvas
let Map = {
    canvas : document.getElementById("mapa__area"),
    start : function() {
        this.canvas.width = 1109;
        this.canvas.height = 1109;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateAllMap, 100);
    },
    clear : function() {
        // this.context.fillStyle = "darkgreen";
        // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

//Clica para Adicionar Unidade
buttonAdd.addEventListener("click", function(event) {  
    event.preventDefault();
    showMsg("Clique na posição desejada")
    addUnitToClick(Map.canvas);
});

 //Clica para Mover Unidade
// buttonMove.addEventListener("click", function(event) {
//     showMsg("Clique na unidade que deseja mover")
//     event.preventDefault();
//     moveUnitToClick(Map.canvas);
// });

Map.canvas.addEventListener("click",function(event) {
    event.preventDefault();
    moveUnitToClick(Map.canvas);
})