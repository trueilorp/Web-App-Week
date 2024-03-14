/*
const/let title = document.querySelector('h1') --> seleziona l'elemento con una query che cerca h1
document.querySelector()
const title = document.querySelector('h1');
title.innerHTML();
addEventListener: ascolta un evento su un elemento
*/

// Creo una chiave per il local storage
const STORAGE_KEY = '__bool_todo__'; //per salvare la sessione, quando ricarico la pagina rimane sempre li

const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

let activities = []

const storage = localStorage.getItem(STORAGE_KEY);
if(storage){
    activities = JSON.parse(storage);
}

// # FUNZIONI
showContent();

button.addEventListener('click', function () {
    const newActivity = inputField.value.trim(); //trim: toglie gli spazi prima e dopo una stringa
    if(newActivity.length > 0){ //per evitare che aggiunga attività vuote
        addActivity(newActivity);
    }
});

function makeCheckClickable(){
    //Cerca tutti i check e fa si che siano cliccabili
    const checks = document.querySelectorAll('.todo-check'); //ogni check ha la classe todo-check
    checks.forEach(function(check, index){
        check.addEventListener('click', function(){
            activities.splice(index,1); // Rimuovo l'elemento dalla lista
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities)); // Aggiorno il local storage
            showContent();// Aggiorna la lista in pagina
        });
    });
}

function addActivity(newActivity){
    activities.push(newActivity);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));// Aggiorno anche lo storage
    showContent();
    inputField.value = '';
}

function showContent() {
    todoList.innerText = '';
    emptyListMessage.innerText = '';
    if (activities.length > 0) {
        activities.forEach(function (activity) {
            todoList.innerHTML +=  //concatenazione 
                `<li class="todo-item">
                <div class="todo-check">
                    <img src="images/checklist.png" alt="">
                </div>
                <p class="todo-text"> ${activity} </p>
            </li>
            `;
        });
    makeCheckClickable();

    } else {
        emptyListMessage.innerText = 'Sembra che non ci siano attività';
    }
}


