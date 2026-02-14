import { addToCart, getCartTotal, updateCart } from "./data/cart.js";
import { getProducts, productsList } from "./data/products.js";
import { renderProducts, updateProduct, updateProductQuantity} from "./render/renderProducts.js";

updateCartCount()
getProducts()
  .then(() => {
    renderProducts(productsList)
  })
  .catch((err) => showError(err))

document.addEventListener('click', (e) => {
    const addToCartButton = e.target.closest('.add-btn')
    const updateQuantity = e.target.closest('.qty-btn')

    if(addToCartButton){
        const cardToAdd = addToCartButton.closest('.product-card')
        addToCart(cardToAdd.dataset.id)
        updateProduct(cardToAdd.dataset.id, 1)
        updateCartCount()
    }
    else if(updateQuantity){
        const cardToUpdate= updateQuantity.closest('.product-card')
        let newQuantity = updateCart(cardToUpdate.dataset.id, updateQuantity.classList.contains('inc'))
        updateProductQuantity(cardToUpdate.dataset.id, newQuantity)
        updateCartCount()
    }
})

function updateCartCount(){
    const cartCount = document.querySelector('.cart-count').innerText = getCartTotal()
}

function showError(err){
    const errorText = document.querySelector('.error-text')
    errorText.classList.remove('hidden')
    errorText.innerText = `Failed to load products : ${err.message}`
}
