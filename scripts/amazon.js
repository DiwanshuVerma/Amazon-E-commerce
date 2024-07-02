
import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { totalItems } from './checkout/orderSummary.js';


loadProducts(renderProductsHtml);

function renderProductsHtml() {

  let productHtml = ''

  products.forEach((product) => {
    productHtml += `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
        </div>

        <div class="product-name">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="${product.getRatings()}">
        <div class="product-rating-count">
        ${product.rating.count}
        </div>
        </div>

        <strong class="product-price">
          ${product.getPrice()}
        </strong>

        <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        ${product.extraInfoHtml()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary"
        data-product-id="${product.id}"
        data-product-name="${product.name}">
        Add to Cart
        </button>
  </div>
    `
  })

  document.querySelector(".js-product-container").innerHTML = productHtml


  // ----------TOGGLE MENU BAR-------

  let menu = document.querySelector(".right-part");
  document.querySelector(".fa-bars").addEventListener('click', () => {
    menu.classList.toggle('active')
  })

  // ------------PUSHING ITEMS TO CART------------

  document.querySelectorAll(".add-to-cart-button").forEach((btn => {
    btn.addEventListener('click', () => {
      const productID = btn.dataset.productId

      addToCart(productID)
      updateCartQuantity();
      
      totalItems()
    })
  }))


  // ------------------FUNCTON FOR PRODUCTS QUANTITY-------------

  let countItems = 0;
  cart.forEach(cartItem => {
    countItems += cartItem.quantity
  })
  const cartCounts = document.querySelector(".cart-count")
  cartCounts.innerHTML = countItems;

  function updateCartQuantity() {
    let increaseQuantity = 0

    cart.forEach(item => {
      increaseQuantity += item.quantity
      cartCounts.innerHTML = increaseQuantity
    })
  }
}