import { addToCart, getCartTotal, updateCart } from "./data/cart.js";
import { getProducts, productsList } from "./data/products.js";
import { renderProducts} from "./render/renderProducts.js";

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
        updateCartCount()
    }
    else if(updateQuantity){
        const cardToUpdate= updateQuantity.closest('.product-card')
        updateCart(cardToUpdate.dataset.id, updateQuantity.classList.contains('inc'))
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
