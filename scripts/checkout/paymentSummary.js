import { products } from '../../data/products.js'
import { cart } from '../../data/cart.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js'
import {formatCurrency} from '../utils/money.js'

export function renderPaymentSummary() {
    const productPrice = document.querySelector('.item-rate')
    const shippingPrice = document.querySelector('.Shipping-rate')
    const beforeTaxPrice = document.querySelector('.before-tax-rate')

    let calculateProductPrice = 0
    let calculateShippingPrice = 0
    
    let matchingItem;
    cart.forEach(cartItem => {

        products.forEach(product => {
            if (product.id === cartItem.productId) {
                matchingItem = product
            }
        })
        if (cartItem.quantity > 1) {
            let mul = 1
            for (let i = 1; i <= cartItem.quantity; i++) {
                mul = i
            }
            calculateProductPrice += (matchingItem.priceCents * mul)
        } else
            calculateProductPrice += (matchingItem.priceCents)


        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        calculateShippingPrice += deliveryOption.priceCents
    })


    productPrice.innerHTML = `$${formatCurrency(calculateProductPrice)}`
    const productPriceCents = parseFloat(productPrice.innerHTML.slice(1))
    
    shippingPrice.innerHTML = `$${formatCurrency(calculateShippingPrice)}`
    const shippingPriceCents = parseFloat(shippingPrice.innerHTML.slice(1))

    const beforeTaxTotal = productPriceCents + shippingPriceCents
    beforeTaxPrice.innerHTML = `$${(beforeTaxTotal).toFixed(2)}`

    const TaxPriceCents = formatCurrency(beforeTaxTotal * 10)
    
    document.querySelector('.tax-rate')
      .innerHTML = `$${TaxPriceCents}`

    const priceAfterTax = parseFloat(beforeTaxTotal) + parseFloat(TaxPriceCents)

    document.querySelector('.total-rate')
     .innerHTML = `$${(priceAfterTax).toFixed(2)}`

}

