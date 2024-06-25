
export let cart;

loadFromLocalStorage()

export function loadFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem('cart'))

  if (!cart) {
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }]
  }
}

// ---------function to save cart items into local storage----------

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}



// ---------------FUNCTION FOR ADD ITEMS TO CART------------

export function addToCart(productID) {
  let checkitem;
  cart.forEach(item => {
    if (productID === item.productId)
      checkitem = item;
  })
  if (checkitem) {
    checkitem.quantity += 1
  } else {
    cart.push({
      productId: productID,
      quantity: 1,
      deliveryOptionId: '1'
    })
  }
  saveToStorage()
}

// ------------remove cart item------------

export function removeCartItem(productId) {
  const newCartArray = [];

  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCartArray.push(cartItem)
    }
  })
  cart = newCartArray;

  saveToStorage()

}


export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}


// ---------------update delivery date when click on a option----------
export function updateDeliveryDate(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage()
}
