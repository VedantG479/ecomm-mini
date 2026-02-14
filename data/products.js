export let productsList = []

export function getProducts(){
    return fetch(`https://dummyjson.com/products?limit=20`)
            .then((response) => {
                if(!response.ok)    throw new Error('Something is wrong!')
                return response.json()
            })
            .then((data) => productsList = data.products)
}

export function getMatchingProduct(id){
    let matchingProduct
    productsList.forEach((product) => {
        if(product.id == id)    matchingProduct = product
    })
    return matchingProduct
}

/*0
: 
availabilityStatus
: 
"In Stock"
brand
: 
"Essence"
category
: 
"beauty"
description
: 
"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula."
dimensions
: 
{width: 15.14, height: 13.08, depth: 22.99}
discountPercentage
: 
10.48
id
: 
1
images
: 
['https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp']
meta
: 
{createdAt: '2025-04-30T09:41:02.053Z', updatedAt: '2025-04-30T09:41:02.053Z', barcode: '5784719087687', qrCode: 'https://cdn.dummyjson.com/public/qr-code.png'}
minimumOrderQuantity
: 
48
price
: 
9.99
rating
: 
2.56
returnPolicy
: 
"No return policy"
reviews
: 
(3) [{…}, {…}, {…}]
shippingInformation
: 
"Ships in 3-5 business days"
sku
: 
"BEA-ESS-ESS-001"
stock
: 
99
tags
: 
(2) ['beauty', 'mascara']
thumbnail
: 
"https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
title
: 
"Essence Mascara Lash Princess"
warrantyInformation
: 
"1 week warranty"
weight
: 
4 */

