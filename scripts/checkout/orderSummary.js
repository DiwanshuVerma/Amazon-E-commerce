import { cart, removeCartItem, updateQuantity, updateDeliveryDate } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary} from './paymentSummary.js'
import { formatCurrency } from '../utils/money.js';

// --------TOTAL ITEMS DISPLAY ON HEADER & in price summary------------
const itemQuantity = document.querySelectorAll(".item-quantity")

export function totalItems() {
    let countItems = 0;
    cart.forEach(cartItem => {
        countItems += cartItem.quantity
    });
    itemQuantity.forEach(item => {
        if (item) {
            item.innerHTML = countItems;
        }
    })
}
export function renderOrderSummary() {
    let showCartItem = '';

    cart.forEach(cartItem => {
        const productId = cartItem.productId;
        
        const matchingItem = getProduct(productId)

        const deliveryOptionId = cartItem.deliveryOptionId

        const deliveryOption = getDeliveryOption(deliveryOptionId)
        

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        showCartItem += `
        <div class="item-col js-item-col-${matchingItem.id}">
            <div class="item">
                <div class="deliver-date">
                    <p>Delivery date: <span class="delv-date">${dateString}</span></p>
                </div>

                <div class="item-details">
                    <div class="about-item">
                        <div class="image">
                            <img src="${matchingItem.image}" alt="">
                        </div>
                        <div class="name-price">
                            <p class="item-name">${matchingItem.name}</p>
                            <p class="price">$${formatCurrency(matchingItem.priceCents)}</p>
                            <div class="item-updation">
                                <p>
                                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                                </p>
                                <button class="update" id="${matchingItem.id}">
                                    Update
                                </button>

                                <div class="update-item" id="${matchingItem.id}">
                                    <input class="updateInput js-quantity-input-${matchingItem.id}" type="text">
                                    <span class="saveBtn" data-product-id="${matchingItem.id}">Save</span>
                                </div>
                                <button class="delete" data-product-id="${matchingItem.id}">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="delivery-option">
                <p>Choose a delivery option:</p>
                ${deliveryOptionsHTML(matchingItem, cartItem)}
            </div>
        </div>
    `;
    });

    // ---------------Showing generated HTML in cart-------------
    const cartHTML = document.querySelector(".js-cart-html");

    if (cartHTML) {
        cartHTML.innerHTML = showCartItem;
    }



    // ------------Showing Delivery Options-----------
    function deliveryOptionsHTML(matchingItem, cartItem) {
        let showHtml = '';

        deliveryOptions.forEach(option => {
            const today = dayjs();
            const deliveryDate = today.add(option.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)}`;
            const isChecked = option.id === cartItem.deliveryOptionId;

            showHtml += `
                <div class="input js-delivery-input"
                  data-product-id="${matchingItem.id}"
                  data-option-id="${option.id}"
                  data-delivery-charge="${priceString}">
                    <input 
                        ${isChecked ? 'checked' : ''} 
                        type="radio" 
                        name="delivery-option-${matchingItem.id}" 
                        value="${option.id}"
                        class="input-${option}">
                    <div class="label">
                        <label><span class="delv-date">${dateString}</span></label>
                        <label class="shipping-rate">${priceString} - Shipping</label>
                    </div>
                </div>
                `;
        });

        return showHtml;
    }



    totalItems();

    // --------------Deleting item-------------
    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            removeCartItem(productId);

            const container = document.querySelector(`.js-item-col-${productId}`);
            if (container) container.remove();

            totalItems();
            renderPaymentSummary()
        });
    });

    // --------------Updating item-------------

    document.querySelectorAll(".update").forEach(updateBtn => {
        updateBtn.addEventListener('click', () => {
            updateBtn.style.display = "none";

            let upBtn; // Declare upBtn outside the loop

            document.querySelectorAll(".update-item").forEach(btn => {
                if (updateBtn.id === btn.id) {
                    upBtn = btn; // Assign the value to upBtn
                    upBtn.style.display = "block";
                }
            });

            document.querySelectorAll(".saveBtn").forEach(saveBtn => {
                // Remove existing event listeners
                const newSaveBtn = saveBtn.cloneNode(true);
                saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

                newSaveBtn.addEventListener('click', () => {
                    const productId = newSaveBtn.dataset.productId;
                    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
                    let newQuantity = Number(quantityInput.value);

                    if (newQuantity <= 0 || isNaN(newQuantity)) {
                        alert("Enter Quantity Above 0");
                    } else {
                        updateQuantity(productId, newQuantity);
                        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
                        quantityLabel.innerHTML = newQuantity;
                        totalItems();
                    }

                    if (productId === updateBtn.id) {
                        upBtn.style.display = "none";
                        updateBtn.style.display = "block";
                    }

                    quantityInput.value = '';
                    renderPaymentSummary()
                });
            });
        });
    });

    // Add event listeners to radio buttons for changing delivery options
    document.querySelectorAll(".delivery-option input[type='radio']").forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selectedOptionId = event.target.value;
            const productId = event.target.name.split('-')[2];

            const cartItem = cart.find(item => item.productId === productId);
            if (cartItem) {
                cartItem.deliveryOptionId = selectedOptionId;
                saveToStorage();
            }
        });
    });


    document.querySelectorAll(".js-delivery-input").
        forEach(input => {
            input.addEventListener('click', () => {
                const productId = input.dataset.productId
                const optionId = input.dataset.optionId
                const charge = input.dataset.deliveryCharge
                

                updateDeliveryDate(productId, optionId)
                renderOrderSummary()
                renderPaymentSummary()
            })
        })

}


// export { renderOrderSummary, totalItems }
