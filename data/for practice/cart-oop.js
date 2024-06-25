
function Cart(key) {
    const cart = {      
        cartItems: undefined,

        loadFromLocalStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(key))

            if (!this.cartItems) {
                this.cartItems = [{
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
        },

        // ---------function to save cart items into local storage----------

        saveToStorage() {
            localStorage.setItem(key, JSON.stringify(this.cartItems))
        },

        // ---------------FUNCTION FOR ADD ITEMS TO CART------------

        addToCart(productID) {
            let checkitem;
            this.cartItems.forEach(item => {
                if (productID === item.productId)
                    checkitem = item;
            })
            if (checkitem) {
                checkitem.quantity += 1
            } else {
                this.cartItems.push({
                    productId: productID,
                    quantity: 1,
                    deliveryOptionId: '1'
                })
            }
            this.saveToStorage()
        },

        // ------------remove cart item------------

        removeCartItem(productId) {
            const newCartArray = [];

            this.cartItems.forEach(cartItem => {
                if (cartItem.productId !== productId) {
                    newCartArray.push(cartItem)
                }
            })
            cart = newCartArray;

            this.saveToStorage()

        },

        updateQuantity(productId, newQuantity) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.quantity = newQuantity;

            this.saveToStorage();
        },

        // ---------------update delivery date when click on a option----------

        updateDeliveryDate(productId, deliveryOptionId) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage()
        }

    }
    return cart
}


const cartOop = Cart('cart-oop')
cartOop.loadFromLocalStorage()
cartOop.addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9')
cartOop.addToCart('58b4fc92-e98c-42aa-8c55-b6b79996769a')


const cartBs = Cart('cart-bs')
cartBs.loadFromLocalStorage()

// console.log(cartOop)
// console.log(cartBs)




// cartOop.loadFromLocalSto rage()
// cartBs.addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53')

// ----------ADD TO CART-------

// const addCartBtns = document.querySelectorAll(".add-to-cart-button")







