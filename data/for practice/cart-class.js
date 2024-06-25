
class Cart {
    
        cartItems; //public property
        #localStorageKey //private property

        constructor(Key){
            this.#localStorageKey = Key
            this.loadFromLocalStorage()
        }

        loadFromLocalStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))

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
        };

        // ---------function to save cart items into local storage----------

        saveToStorage() {
            localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
        };

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
        };

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

        };

        updateQuantity(productId, newQuantity) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.quantity = newQuantity;

            this.saveToStorage();
        };

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


//instead of this commented setup code we can use constructor

const cartOop = new Cart('cart-oop')
// cartOop.localStorageKey = 'cart-oop'
// cartOop.loadFromLocalStorage()

const cartBs = new Cart('cart-bs')
// cartBs.localStorageKey = 'cart-Bs'
// cartBs.loadFromLocalStorage()

console.log(cartOop)
console.log(cartBs)


// cartOop and cartBs are the instance of Cart class
//to check this
console.log(cartBs instanceof Cart)
console.log(cartOop instanceof Cart)
