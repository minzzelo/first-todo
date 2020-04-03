//Selector
const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const input = document.getElementById("input");

//Classes 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Date
const options = {weekday : "long", month:"long", day:"numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

//Clear local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

//Variables
let LIST, id;

let data = localStorage.getItem("TODO");

//check if data is not empty
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the UI
} else {
    //if data is empty
    LIST = [];
    id = 0;
}

//load items to the user interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//add to do
function addToDo(toDo, id, done, trash) {
    if(trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
        <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//add item to the list
document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        const toDo = input.value;

        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
            });

            //add item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
})


//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event) {
    const element = event.target; //return the clicked element inside
    const elementJob = element.attributes.job.value; //complete or delete
    if(elementJob == "complete") {
        completeToDo(element);
    }else if(elementJob == "delete") {
        removeToDo(element);
    }
    //add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
})