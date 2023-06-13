import {getLocalStorageItem, getCartFulfillment} from './local-storage.js';
import {tableRowTemplate} from './templates/table-row-template.js';
// import {minAmount} from './calculate-total.js';
// import {maxAmount} from './calculate-total.js';
const cartSpan = document.querySelector('.js_cart__span');
const tableRow = document.querySelector('.js_table-row');
const totalQuantity = document.querySelector('.js_total-quantity');
const totalPrice = document.querySelectorAll('.js_total-price');
const emptyMessage = document.querySelector('.js_empty-cart');
const table = document.querySelector('.js_product-table');
const totalField = document.querySelector('#totalField');
const cartField = document.querySelector('#cartField');


window.onload = function() {
   if(cartSpan) {
      cartSpan.textContent = setAmountToCartSpan();
   }
   if(tableRow && getLocalStorageItem().length > 0) {
      shopPageFunctional();
   }
   if(document.querySelector('.js_prod__amount-span')) {
      const incrementAndDecrementSpan = document.querySelector('.js_prod__amount-span');
      if(Number(incrementAndDecrementSpan.textContent) > 1) {
         const lessBtn = document.querySelector('.js_prod__btn-less');
         lessBtn.classList.remove('disable-btn');
         console.log('lessBtn', lessBtn)
      }
   }


};



function shopPageFunctional() {
   hideEmptyMessage();
   const dataArray = getLocalStorageItem();
   cartField.value = JSON.stringify(getCartFulfillment());
   
   let total = 0;
   let productTotal;
   let nutraAmount;
   dataArray.forEach(product => {
      if(product.type == 'nutra'){
        
        productTotal = 0;
        nutraAmount = product.quantity;
        let overflow = false;

        if(nutraAmount > product.nutraRange.length){
          productTotal = Number((product.nutraRange[(product.quantity-1) % product.nutraRange.length]).toFixed(2));
          if(product.quantity % product.nutraRange.length != 0){
              nutraAmount = nutraAmount - ((product.quantity) % product.nutraRange.length);
          }else{
              nutraAmount = nutraAmount - product.nutraRange.length;
          }
          overflow = true;
        }else{
          productTotal = product.nutraRange[(product.quantity-1)];
        }

        while(nutraAmount >= product.nutraRange.length && overflow){ 
          productTotal += Number((product.nutraRange[(nutraAmount-1) % product.nutraRange.length]).toFixed(2));
          nutraAmount = nutraAmount - product.nutraRange.length;
        }
        
      }else{
        productTotal = Number((product.quantity * product.price).toFixed(2));
      }
      total = total + productTotal;
      tableRow.insertAdjacentHTML('afterend', tableRowTemplate(product));
   });
   totalQuantity.textContent = setAmountToCartSpan();
   [...totalPrice].forEach(totalPrice => {
      totalPrice.textContent = `$${total.toFixed(2)}`;
      totalField.value = total.toFixed(2);
   })
   
   const removeBtns = document.querySelectorAll('.js_remove-product');
   removeBtns.forEach(btn => {
      btn.addEventListener('click', removeItem);
   }) 
}

function removeItem(e) {

  const btn = e.currentTarget;
  const parent = btn.closest('.js_remove-product-parent');
  const productId = parent.getAttribute('id');
  if(cartSpan) {
   cartSpan.textContent = setAmountToCartSpan();
}
  const updatedCart = getLocalStorageItem().filter(product => product.id !== productId);
  window.localStorage.setItem('cart', JSON.stringify(updatedCart));
  let total = 0;
  getLocalStorageItem().forEach(product => {
   const productTotal = Number((product.quantity * product.price).toFixed(2));
   total = total + productTotal;
  })

  totalQuantity.textContent = setAmountToCartSpan();
  [...totalPrice].forEach(totalPrice => {
   totalPrice.textContent = `$${total.toFixed(2)}`;
})
  
  parent.remove();
  if(updatedCart.length === 0) {
      showEmptyMessage();
  }


}

function showEmptyMessage() {
   emptyMessage.classList.remove('hidden');
   table.classList.add('hidden');
}
function hideEmptyMessage() {
   emptyMessage.classList.add('hidden');
   table.classList.remove('hidden');
}

export function setAmountToCartSpan() {
   let sum = 0;
   const dataArray = getLocalStorageItem();
   dataArray.forEach(product => {
      if(product.quantity) {
         sum += product.quantity;
      }
   });
   return sum;
}
