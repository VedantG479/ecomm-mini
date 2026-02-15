export let productsList = []

let limit = 30, skip = 0, isLoading = false, total = 0

export function getProducts(){
    if(isLoading || (total && skip >= total))   return Promise.resolve(productsList)

    isLoading = true
    return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            .then((response) => {
                if(!response.ok)    throw new Error('Something is wrong!')
                return response.json()
            })
            .then((data) => {
                productsList = [...productsList, ...data.products]
                skip += limit
                total = data.total
                isLoading = false
                return productsList
            })
            .catch(() => isLoading = false)
}

export function getMatchingProduct(id){
    let matchingProduct
    productsList.forEach((product) => {
        if(product.id == id)    matchingProduct = product
    })
    return matchingProduct
}