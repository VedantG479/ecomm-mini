import { cart, updateCart } from "./data/cart.js";
import { renderCart } from "./render/renderCart.js";
import { renderPayment } from "./render/renderPayment.js";

const couponMsg = document.querySelector('.coupon-message')
let timerId 

renderCart()
renderPayment()
document.addEventListener('click', (e) => {
    const updateQuantity = e.target.closest('.qty-btn')

    if(updateQuantity){
        const cardToUpdate= updateQuantity.closest('.cart-item')
        updateCart(cardToUpdate.dataset.id, updateQuantity.classList.contains('inc'))
        renderCart()
        renderPayment()
    }
})

document.querySelector('.checkout-btn').addEventListener('click', () => {
    //checkout
})

document.querySelector('.apply-btn').addEventListener('click', () => {
    const coupon = document.querySelector('.coupon-input').value.trim()

    if(!coupon){
        renderPayment()
        putCouponMessage('Enter valid coupon!')
    }
    else if(cart.length == 0){
        renderPayment()
        putCouponMessage('Nothing in cart!')
    }
    else{
    document.querySelector('.apply-btn').classList.add('hidden')
    couponMsg.innerText = ''
        checkCoupon(coupon)
          .then((discount) => {
            renderPayment(discount)
            putCouponMessage(`-${discount}% OFF`)
          })
          .catch((msg) => {
            renderPayment()
            putCouponMessage(msg)
          })
    }
})

function checkCoupon(coupon){
    return new Promise(function(resolve, reject){
        if(coupon == 'APPLY10') setTimeout(() => resolve(10), 5000)
        else if(coupon == 'APPLY20') setTimeout(() => resolve(20), 5000)
        else    setTimeout(() => reject('Invalid Coupon'), 5000)
    })
}

function putCouponMessage(msg){
    document.querySelector('.apply-btn').classList.remove('hidden')
    
    couponMsg.innerText = msg
    if(timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
        couponMsg.innerText = ''
    }, 5000)
}
