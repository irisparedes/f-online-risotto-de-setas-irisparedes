'use strict';

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
    //Create list
    const newItem = document.createElement('li');
    newItem.classList.add('listItem','list-group-item', 'd-flex', 'align-items-center', 'row', 'p-1' );
    newItem.setAttribute('id', index);
    //Create checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('col-1', 'd-flex', 'justify-content-center');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('name', 'ingredient');
    checkbox.classList.add('checkbox-ingredient');
    checkbox.addEventListener('change', handleCheckbox);
    checkbox.setAttribute('id', index);
    checkboxContainer.appendChild(checkbox);

    //Create input quantity
    const counterData = document.createElement('input');
    counterData.type = 'number';
    counterData.setAttribute('name', 'quantity-ingredient');
    counterData.addEventListener('keyup', handleInputQuantity);
    counterData.addEventListener('change', handleInputQuantity);
    counterData.classList.add('counter-data','d-flex', 'text-center','col-1', 'border', 'p-0');
    counterData.value = ingredient.items;
    counterData.setAttribute('id', index);
    //Create product data
    const ingredientDataContainer = document.createElement('div');
    ingredientDataContainer.classList.add('ingredient-data-container');
    ingredientDataContainer.classList.add('col-8');

    const nameIngredient = document.createElement('p');
    nameIngredient.classList.add('m-0', 'font-weight-bold');
    nameIngredient.innerHTML = ingredient.product;

    const brandIngredient = document.createElement('p');
    brandIngredient.classList.add('m-0', 'text-secondary', 'small');
    brandIngredient.innerHTML = ingredient.brand || '';

    const quantityIngredient = document.createElement('p');
    quantityIngredient.classList.add('m-0', 'small');
    quantityIngredient.innerHTML = ingredient.quantity;
    //Create price
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container', 'col-2', 'd-flex', 'justify-content-center', 'align-self-center');

    const priceIngredient = document.createElement('p');
    priceIngredient.classList.add('price-item', 'text-success', 'font-weight-bold');
    priceIngredient.innerHTML = ingredient.price + '€';
    priceContainer.appendChild(priceIngredient);
    //Put elements inside anothers
    ingredientDataContainer.append(nameIngredient, brandIngredient, quantityIngredient);
    newItem.append(checkboxContainer, counterData, ingredientDataContainer, priceContainer);
    listIngredients.appendChild(newItem);
  });
  checkboxList = document.querySelectorAll('.checkbox-ingredient');
  inputQuantityList = document.querySelectorAll('.counter-data');
  itemPriceList = document.querySelectorAll('.price-item');
  updatePurchaseData();
}

//Update purchase data when you select ingredient(s)

function updatePurchaseData(){
  counterIngredients = 0;
  counterSubtotal = 0;
  counterTotal = 0;
  for(let i = 0; i < ingredients.length; i++){
    const numberItems = parseInt(ingredients[i].items);
    counterIngredients += numberItems;
    const priceIngredient = ingredients[i].price * numberItems;
    itemPriceList[i].innerHTML = Math.round(priceIngredient*100)/100 + '€';
    counterSubtotal += priceIngredient;
  }
  if(counterIngredients === 0){
    counterDeliveryCharges = 0;
  } else {
    counterDeliveryCharges = 7;
  }
  counterTotal = counterSubtotal + counterDeliveryCharges;
  numberItems.innerHTML = counterIngredients;
  subtotal.innerHTML = Math.round(counterSubtotal*100)/100 + ' €';
  delivery.innerHTML = counterDeliveryCharges + ' €';
  total.innerHTML = Math.round(counterTotal*100)/100 + ' €';
  submitPurchaseAmount.innerHTML = Math.round(counterTotal*100)/100 + ' €';
}

//Handle checkbox

function handleCheckbox(e){
  const target = e.target;
  const id = e.target.id;
  if(target.checked === false){
    ingredients[id].items = 0;
    inputQuantityList[id].value = ingredients[id].items;
  } else {
    ingredients[id].items = 1;
    inputQuantityList[id].value = ingredients[id].items;
  }
  updatePurchaseData();
}

//Handle input quantity

function handleInputQuantity(e){
  const value = e.target.value;
  const id = e.target.id;
  if(value === ''){
    ingredients[id].items = 0;
    checkboxList[id].checked = false;
  } else{
    ingredients[id].items = value;
    checkboxList[id].checked = true;
  }
  updatePurchaseData();
}

//Function select all ingredients button

function addAllIngredients(){
  for(let i = 0; i < checkboxList.length; i++){
    ingredients[i].items = 1;
    inputQuantityList[i].value = ingredients[i].items;
  }
  updatePurchaseData();
}

//Function remove all ingredients button

function removeAllIngredients(){
  for(let i = 0; i < checkboxList.length; i++){
    ingredients[i].items = 0;
    inputQuantityList[i].value = ingredients[i].items;
  }
  updatePurchaseData();
}

//Submit message

function submitPurchase(){
  if(counterTotal > 0){
    console.log(ingredients);
    alert('Gracias por su compra');
  } else {
    alert('No ha seleccionado ningún producto. Por favor, seleccione algún producto');
  }
}

buttonSelect.addEventListener('click', addAllIngredients);
buttonRemove.addEventListener('click', removeAllIngredients);
submitPurchaseButton.addEventListener('click', submitPurchase);
