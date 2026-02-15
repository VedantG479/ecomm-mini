import { addToCart, getCartTotal, updateCart } from "./data/cart.js";
import { getProducts } from "./data/products.js";
import { renderProducts, updateProduct, updateProductQuantity} from "./render/renderProducts.js";

let isLoading = false
updateCartCount()
renderPage()

function renderPage(newAdded = false){
    isLoading = true
    getProducts()
      .then((productsList) => {
        renderProducts(productsList, newAdded)
      })
      .catch((err) => showError(err))
      .finally(() => isLoading = false)
}

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

window.addEventListener('scroll', () => {
    if(isLoading)   return
    const nearBottom =  window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if(nearBottom)    renderPage(true)
});

function updateCartCount(){
    const cartCount = document.querySelector('.cart-count').innerText = getCartTotal()
}

function showError(err){
    const errorText = document.querySelector('.error-text')
    errorText.classList.remove('hidden')
    errorText.innerText = `Failed to load products : ${err.message}`
}
