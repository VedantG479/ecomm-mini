import { cart, clearCart, updateCart } from "./data/cart.js";
import { renderCart } from "./render/renderCart.js";
import { renderPayment, total } from "./render/renderPayment.js";

const couponMsg = document.querySelector('.coupon-message')
const couponInput = document.querySelector('.coupon-input')
const checkoutMsg = document.querySelector('.checkout-status')
const applyBtn = document.querySelector('.apply-btn')
const checkoutBtn = document.querySelector('.checkout-btn')

let discount = 0

renderCart()
renderPayment(discount)

document.addEventListener('click', (e) => {
    const updateQuantity = e.target.closest('.qty-btn')

    if(updateQuantity){
        const cardToUpdate= updateQuantity.closest('.cart-item')
        updateCart(cardToUpdate.dataset.id, updateQuantity.classList.contains('inc'))
        renderCart()
        renderPayment(discount)
    }
    else if(e.target == checkoutBtn)    checkout()
    else if(e.target == applyBtn){
        applyBtn.classList.add('hidden')
        checkoutBtn.classList.add('hidden')
        const coupon = couponInput.value.trim()

        if(!coupon){
            discount = 0
            renderPayment(discount)
            putCouponMessage('Enter valid coupon!')
        }
        else if(cart.length == 0){
            discount = 0
            renderPayment(discount)
            putCouponMessage('Nothing in cart!')
        }
        else{
            checkCoupon(coupon)
            .then((disc) => {
                discount = disc
                renderPayment(discount)
                putCouponMessage(`-${discount}% OFF Applied`)
            })
            .catch((msg) => {
                discount = 0
                renderPayment(discount)
                putCouponMessage(msg)
            })
        }
    }
})

function checkout(){
    applyBtn.classList.add('hidden')
    checkoutBtn.classList.add('hidden')

    if(cart.length == 0)    putCheckoutMessage('Empty cart')
    else{
        return new Promise(function(resolve, reject){
            setTimeout(() => {
                resolve(total)
            }, 1000)
        }).then((amount) => {
            return putCheckoutMessage(`Order Placed of ${amount}`)
        }).then(() => {
            discount = 0
            clearCart()
            renderCart()
            renderPayment(discount)
            couponInput.value = ''
        })
    }
}

function checkCoupon(coupon){
    return new Promise(function(resolve, reject){
        if(coupon == 'APPLY10') setTimeout(() => resolve(10), 1000)
        else if(coupon == 'APPLY20') setTimeout(() => resolve(20), 1000)
        else    setTimeout(() => reject('Invalid Coupon'), 1000)
    })
}

function putCouponMessage(msg){
    couponMsg.innerText = msg
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            couponMsg.innerText = ''
            resolve()
        }, 3000)
    }).then(() => {
        applyBtn.classList.remove('hidden')
        checkoutBtn.classList.remove('hidden')
    })
}

function putCheckoutMessage(msg){
    checkoutMsg.innerText = msg
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            checkoutMsg.innerText = ''
            resolve()
        }, 3000)
    }).then(() => {
        applyBtn.classList.remove('hidden')
        checkoutBtn.classList.remove('hidden')
    })
}
