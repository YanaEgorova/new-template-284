export const item = (product) => {

  return `
    <li class="item ">

      
  <div class="product__block js_product glass glass-m" id="${product.id}">

  <div class="product__block-inner">
  <div class="product__img-box">
    
     <img src="${product.image}" alt="" class="img">

    </div>
  
    <div class="product__text-box">
    <p class="product__name js_product-name">${product.name}</p>
    
      <span class="product__price">
      $${(product.price).toFixed(2)}
      </span>
      </div>
      <div class="product__btn-block">
      <a href="product-page.html?id=${product.id}" class="btn btn--first" style="margin: ${product.type == "ring" || product.type == "clothing" ? 'auto' : ''}">details</a>
    ${
      product.type == "ring" || product.type == "clothing" ? '' : '<button class="btn js_add-to-cart">buy</button>'
    }
    </div>
  
    </div>
     

 
    <svg class="product__block-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 325 100"><rect width="100%" height="100%" fill="var(--third-brand-color"></rect><g fill="#ffffff">
    <rect width="100%" height="40" fill="#ffffff"></rect>

    <rect x="0" width="14.2857%" height="86.63460387112548" rx="25"></rect>
      <rect x="28.5714285714%" width="14.2857%" height="95.85151312999575" rx="25"></rect>
      <rect x="57.1428571428%" width="14.2857%" height="74.62580282776004" rx="25"></rect>
      <rect x="85.7142857142%" width="14.2857%" height="81.60391393601566" rx="25"></rect>
  </g><g fill="var(--third-brand-color">
    <rect x="14.2857%" y="16.00661170715424" width="14.2857%" height="60" rx="25"></rect>
      <rect x="42.8571428571%" y="5.216672073062827" width="14.2857%" height="60" rx="25"></rect>
      <rect x="71.42857142849999%" y="16.722308802445887" width="14.2857%" height="60" rx="25"></rect>
  </g></svg>
</div>

  </li>
    `
}


