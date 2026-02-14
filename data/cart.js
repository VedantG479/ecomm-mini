import { updateProduct, updateProductQuantity } from "../render/renderProducts.js"
import { getMatchingProduct } from "./products.js"

export let cart = JSON.parse(localStorage.getItem('cart')) || []

export function addToCart(idToAdd){
    let product = getMatchingProduct(idToAdd)
    const {id, title, price} = product
    cart.push({
        id, 
        title, 
        price, 
        quantity: 1
    })
    updateProduct(idToAdd, 1)
    saveToStorage()
}

export function updateCart(idToUpdate, toIncrease){
    let newQuantity
    cart.forEach((item) => {
        if(item.id == idToUpdate){
            if(toIncrease)  item.quantity = Math.min(9, ++item.quantity)
            else    item.quantity--
            
            newQuantity = item.quantity
        }
    })

    updateProductQuantity(idToUpdate, newQuantity)
    if(newQuantity == 0)    removeFromCart(idToUpdate)
    saveToStorage()
}

function removeFromCart(id){
    let newCart = []
    cart.forEach((item) => {
        if(item.id != id)   newCart.push(item)
    })
    cart = newCart
}

export function getCartTotal(){
    let total = 0
    cart.forEach((item) => {
        total += item.quantity
    })
    return total
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}