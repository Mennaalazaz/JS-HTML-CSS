// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById('grocery');
const submitBtn  = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** FUNCTIONS **********

function createListItem(id, value) {
        // create the article element with data-id attribute
        const element = document.createElement('article');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);

        // add it to class 'grocery-item' and embed the HTML code
        element.classList.add("grocery-item");
        element.innerHTML = `
                <p class="title">${value}</p>
                <div class="button-container">
                    <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="delete-btn">
                    <i class="fas fa-trash"></i>
                    </button>
                </div>`;

        // add event listeners to both buttons;
        const deleteBtn = element.querySelector('.delete-btn');
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector('.edit-btn'); 
        editBtn.addEventListener("click", editItem);

        // append child
        list.appendChild(element);
}

// this function will be triggered when submitting the form
function addItem(e){ 

    // prevent default behavior on submitting the form
    e.preventDefault();

    // Get entered text input as value and make a unique id 
    const value = grocery.value;
    const id = new Date().getTime().toString();

    // Case when value!='' and we are not editing
    if(value && !editFlag){
        
        createListItem(id,value)

        // display alert
        displayAlert("item added to the list", "success");

        // show container
        container.classList.add("show-container");

        setBackToDefault();

        // set local storage
        addToLocalStorage(id, value);
    }
    // Case when value!='' and we are editing
    else if(value && editFlag){

        // update the element title use the new one (editElement assigned during editItem() )
        editElement.innerHTML = value;

        displayAlert("value changed", "success");

        // edit  local storage
        editLocalStorage(editID, value);

        setBackToDefault();
    }   
    // Case when value===''
    else{
        displayAlert("please enter value", "danger");
    }
}


function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // removing the alert after 1 sec
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// this function to reset every thing as the text-input and the submitBtn (it might be changed to 'edit' on triggering the editItem function)
function setBackToDefault() {
    grocery.value='';
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// this function is to get the element , its title and its id
function editItem(e) {
    // moving from e (edit button) to grocery-item class
    const element = e.currentTarget.parentElement.parentElement;
    // moving from e (edit button) to title class
    editElement = e.currentTarget.parentElement.previousElementSibling;

    // set form value with the old title to edit
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;

    // change the submitBtn text to 'edit' instead of 'submit'
    submitBtn.textContent = "edit";
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);

    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");

    setBackToDefault();

    // remove from local storage
    removeFromLocalStorage(id);
}

// this function will be triggered when clicking clearBtn
function clearItems(){

    // get all items with class '.grocery-item'
    const items = document.querySelectorAll(".grocery-item");

    // if the array is not empty , loop on them and remove from list class
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    };

    // hide the container now , as It is useless (no items to show and no need to show clear list button now)
    container.classList.remove('show-container');

    // Display alert message as list is empty (styled as danger message)
    displayAlert("empty list", "danger");

    setBackToDefault();

    // empty the localStorage
    localStorage.removeItem("list");

}

// ****** LOCAL STORAGE **********
// localStorage is a built-in browser storage that lets you save key–value data directly in the user’s browser —
//  and it stays there even after the page is reloaded or the browser is closed.

function addToLocalStorage(id, value) {
    const groceryItem  = {id ,value};
    let items = getLocalStorage();
    items.push(groceryItem ); // add the groceryItem  to the array 
    localStorage.setItem("list", JSON.stringify(items)); // set for list(the key) the new array (the value)
}

// return items if list not empty else return empty array
function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    // update the items use only elements with id not equal to desired deleted one
    items = items.filter(function(item){
        return item.id!==id;
    });

    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, new_value) {
    let items = getLocalStorage();

    items = items.map(function (item) {
        if (item.id === id) {
        item.value = new_value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// ****** SETUP ITEMS **********
// this function to show previously added items once DOMContentLoaded
function setupItems() {
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach(function (item) {
        createListItem(item.id, item.value);
        });
        container.classList.add("show-container");
    }
}