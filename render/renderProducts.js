import { cart } from "../data/cart.js"

const productsGrid = document.querySelector('.products-grid')

export function renderProducts(productsList){
    let productsGridHTML = ''
    productsList.forEach((product) => {
        const {id, thumbnail, title, price} = product

        productsGridHTML += `<div class="product-card product-${id}" data-id=${id}>
                                <img src="${thumbnail}" class="product-image" />

                                <div class="product-title">${title}</div>
                                <div class="product-price">$${price}</div>

                                <button class="add-btn">Add to Cart</button>

                                <div class="qty-controls hidden">
                                    <button class="qty-btn dec">−</button>
                                    <span class="qty-number"></span>
                                    <button class="qty-btn inc">+</button>
                                </div>
                            </div>`
    })
    productsGrid.innerHTML = productsGridHTML

    cart.forEach((item) => {
        updateProduct(item.id, item.quantity)
    })
}

export function updateProduct(productId, quantity){
    const productCard = document.querySelector(`.product-${productId}`)

    productCard.querySelector('.add-btn').classList.toggle('hidden')
    productCard.querySelector('.qty-controls').classList.toggle('hidden')
    productCard.querySelector('.qty-number').innerText = `Added: ${quantity}`  
}

export function updateProductQuantity(productId, newQuantity){
    const productCard = document.querySelector(`.product-${productId}`)
    if(newQuantity == 0){
        updateProduct(productId, newQuantity)
        return
    }
    productCard.querySelector('.qty-number').innerText = `Added: ${newQuantity}`  
}