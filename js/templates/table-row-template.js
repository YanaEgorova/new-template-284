export const tableRowTemplate = (product) => {
  return `
<tr id="${product.id}" class="js_remove-product-parent">
<td class="text">
<p>${product.name} ${product.ringSize ? "(Size " + product.ringSize + ")" : product.clothingSize ? "(Size " + product.clothingSize + ")" : ""}</p>
</td>

<td class="text">
<p>${product.quantity}</p>
</td>
<td class="text">
<p>${`$${(product.price).toFixed(2)}`}</p>
</td>
<td class="text">
<p>$0.00</p>
</td>
<td class="text">$${product.type == 'nutra' ? calcPrice(product) : (product.quantity * product.price).toFixed(2)}</td>
<td>
<button class="orders__close-btn js_remove-product"></button>
</td>
</tr>
`
}

const calcPrice = (product) => {
let productTotal = 0;
  let nutraAmount = product.quantity;
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

return productTotal.toFixed(2);
}