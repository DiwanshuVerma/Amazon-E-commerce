import { addToCart, cart, loadFromLocalStorage } from "../../data/cart.js";

describe('Test suit: addToCart', () => {

    it('adds an existing item in cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 3,
                name: 'testing'
            }])  //using JSON.stringify to convert item into string, bcz localstorage only supports strings
        })

        loadFromLocalStorage()

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(4)  // SEE I'VE INCREASE QUANTITY FROM 3 TO 4 BCZ IN ABOVE LINE I'VE ADDED SAME ITEM, WELL IT WORKING WELL
        expect(cart[0].name).toEqual('testing')

    })

    it('adds a new item to cart',()=>{
        /* as we know cart always have >2 existing items
         in it and we are expecting it equal to 1,
         so here we are creating a fake cart that have empty array
         --> this procces is called MOCKING the item */

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([])  //using JSON.stringify to convert item into string, bcz localstorage only supports strings
        })

        // console.log(localStorage.getItem('cart'))

        loadFromLocalStorage()

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        expect(cart[0].quantity).toEqual(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    })
})