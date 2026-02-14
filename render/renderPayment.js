import { cart } from "../data/cart.js"

const totalPayment = document.querySelector('.totals')

export function renderPayment(discountPercent = 0){
    let subTotal = 0
    cart.forEach((item) => {
        const {quantity, price} = item
        subTotal += quantity*price
    })

    let discount = (discountPercent/100)*subTotal
    let total = (subTotal - discount)

    totalPayment.innerHTML = `<p>Subtotal <span class="subtotal">$${subTotal.toFixed(2)}</span></p>
        <p>Discount <span class="discount">$${discount.toFixed(2)}</span></p>
        <p class="total-line">Total <span class="total">$${total.toFixed(2)}</span></p>`
}