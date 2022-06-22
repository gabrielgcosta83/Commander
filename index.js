const buttonMove = document.getElementById("button__move");
const buttonAdd = document.getElementById("button__add");

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
buttonMove.addEventListener("click", function(event) {
    showMsg("Clique na unidade que deseja mover")
    event.preventDefault();
    moveUnitToClick(Map.canvas);
});