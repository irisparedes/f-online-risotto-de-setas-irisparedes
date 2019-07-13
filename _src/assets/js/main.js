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
  });
