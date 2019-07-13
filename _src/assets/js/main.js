'use strict';
console.log("pruebaaaa");
const nameRecipe = document.querySelector('.main-title');
const listIngredients = document.querySelector('.list-ingredients');
const buttonSelect = document.querySelector('.button-select');
const buttonRemove = document.querySelector('.button-unselect');
const numberItems = document.querySelector('.number-items');
const subtotal = document.querySelector('.subtotal');
const delivery = document.querySelector('.delivery');
const total = document.querySelector('.total');
const submitPurchaseButton = document.querySelector('.submit-purchase-button');
const submitPurchaseAmount = document.querySelector('.submit-purchase-amount');
let recipeData;
let ingredients;
let checkboxList;
let inputQuantityList;
let itemPriceList;
let counterIngredients;
let counterSubtotal;
let counterDeliveryCharges;
let counterTotal = 0;

//Fetch data from Server

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(response => {
    return response.json();
  })
  .then(response => {
    recipeData = response.recipe;
    ingredients = recipeData.ingredients;
    printArticles();
  });

//Print list of articles

function printArticles(){
  nameRecipe.innerHTML = recipeData.name;
  ingredients.map((ingredient, index) => {
    //Creating list
    const newItem = document.createElement('li');
    newItem.classList.add('listItem');
    newItem.classList.add('list-group-item');
    newItem.classList.add('d-flex');
    newItem.classList.add('align-items-center');
    newItem.classList.add('row');
    newItem.classList.add('p-1');
    newItem.setAttribute('id', index);
    //Creating checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('col-1');
    checkboxContainer.classList.add('d-flex');
    checkboxContainer.classList.add('justify-content-center');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = 'true';
    checkbox.setAttribute('name', 'ingredient');
    checkbox.classList.add('checkbox-ingredient');
    checkbox.addEventListener('change');
    checkbox.setAttribute('id', index);
    checkboxContainer.appendChild(checkbox);

    //Creating input quantity

    const counterData = document.createElement('input');
    counterData.type = 'number';
    counterData.setAttribute('name', 'quantity-ingredient');
    counterData.setAttribute('name', 'quantity-ingredient');
    counterData.addEventListener('keyup');
    counterData.addEventListener('change');
    counterData.classList.add('counter-data');
    counterData.classList.add('d-flex');
    counterData.classList.add('text-center');
    counterData.classList.add('col-1');
    counterData.classList.add('border');
    counterData.classList.add('p-0');
    counterData.value = ingredient.items;
    counterData.setAttribute('id', index);

  });
}
