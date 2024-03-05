
//selectores
const actionName = document.querySelector(".name");
const actionPrice = document.querySelector(".price");
const actionQuantity = document.querySelector(".quantity");
const actionButton = document.querySelector(".action-button");
const actionList = document.querySelector(".action-list");

//event listeners
document.addEventListener("DOMContentLoaded", getactions);
actionButton.addEventListener("click", addaction);
actionList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filteraction);

function obtenerFechaEnFormato() {
  const fechaActual = new Date();

  const dia = ("0" + fechaActual.getDate()).slice(-2);
  const mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  const anio = fechaActual.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${anio}`;
  return fechaFormateada;
}

//functions
function addaction(event) {
  //Prevent form submited
  event.preventDefault();
  //action div
  const actionDiv = document.createElement("div");
  actionDiv.classList.add("action");

  //create action object
  const action = {
    name: actionName.value,
    date: obtenerFechaEnFormato(),
    price: actionPrice.value,
    quantity: actionQuantity.value,
    total: actionPrice.value * actionQuantity.value,
  };

  //Create LI
  const newAction = document.createElement("li");
  newAction.innerText = action.name;
  newAction.classList.add("action-item");
  actionDiv.appendChild(newAction);

  const newDate = document.createElement("li");
  newDate.innerText = action.date;
  newDate.classList.add("action-item");
  actionDiv.appendChild(newDate);

  const newPrice = document.createElement("li");
  newPrice.innerText = action.price;
  newPrice.classList.add("action-item");
  actionDiv.appendChild(newPrice);

  const newQuantity = document.createElement("li");
  newQuantity.innerText = action.quantity;
  newQuantity.classList.add("action-item");
  actionDiv.appendChild(newQuantity);

  const newTotal = document.createElement("li");
  newTotal.innerText = action.total;
  newTotal.classList.add("action-item");
  actionDiv.appendChild(newTotal);

  //Add action to local
  saveLocalactions(action);

  //Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  actionDiv.appendChild(trashButton);
  //Append to list
  actionList.appendChild(actionDiv);
  //Clear input
  actionName.value = "";
  actionPrice.value = "";
  actionQuantity.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //Delete action
  if (item.classList[0] === "trash-btn") {
    const action = item.parentElement;
    //Animation
    action.classList.add("fall");
    removeLocalactions(action);
    action.addEventListener("transitionend", function () {
      action.remove();
    });
  }
  //Check mar
  if (item.classList[0] === "complete-btn") {
    const action = item.parentElement;
    action.classList.toggle("completed");
  }
}

function saveLocalactions(action) {
  //Check
  let actions;
  if (localStorage.getItem("actions") === null) {
    actions = [];
  } else {
    actions = JSON.parse(localStorage.getItem("actions"));
  }

  actions.push(action);
  localStorage.setItem("actions", JSON.stringify(actions));
}

function getactions() {
  let actions;
  if (localStorage.getItem("actions") === null) {
    actions = [];
  } else {
    actions = JSON.parse(localStorage.getItem("actions"));
  }

  actions.forEach(function (action) {
    //action div
    const actionDiv = document.createElement("div");
    actionDiv.classList.add("action");
    //Create LI
    const newAction = document.createElement("li");
    newAction.innerText = action.name;
    newAction.classList.add("action-item");
    actionDiv.appendChild(newAction);

    const newDate = document.createElement("li");
    newDate.innerText = action.date;
    newDate.classList.add("action-item");
    actionDiv.appendChild(newDate);

    const newPrice = document.createElement("li");
    newPrice.innerText = action.price;
    newPrice.classList.add("action-item");
    actionDiv.appendChild(newPrice);

    const newQuantity = document.createElement("li");
    newQuantity.innerText = action.quantity;
    newQuantity.classList.add("action-item");
    actionDiv.appendChild(newQuantity);

    const newTotal = document.createElement("li");
    newTotal.innerText = action.total;
    newTotal.classList.add("action-item");
    actionDiv.appendChild(newTotal);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    actionDiv.appendChild(trashButton);
    //Append to list
    actionList.appendChild(actionDiv);
  });
}

function removeLocalactions(action) {
  //Check
  let actions;
  if (localStorage.getItem("actions") === null) {
    actions = [];
  } else {
    actions = JSON.parse(localStorage.getItem("actions"));
  }
  const actionIndex = action.children[0].innerText;
  actions.splice(actions.indexOf(actionIndex), 1);
  localStorage.setItem("actions", JSON.stringify(actions));
}
