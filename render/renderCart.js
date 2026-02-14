import { cart } from "../data/cart.js"

const cartItems = document.querySelector('.cart-items')

export function renderCart(){
    let cartHTML = ''
    cart.forEach((item) => {
        const {id, title, quantity, price} = item
        cartHTML += `<div class="cart-item" data-id="${id}">
                        <div class="item-info">
                        <div class="item-name">${title}</div>
                        <div class="item-price">$${price}</div>
                        </div>

                        <div class="qty-controls">
                        <button class="qty-btn dec">−</button>
                        <span>${quantity}</span>
                        <button class="qty-btn inc">+</button>
                        </div>
                    </div>`
    })
    cartItems.innerHTML = cartHTML
}