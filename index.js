const url = "https://strive-school-testing-apis.herokuapp.com/api/product/"

window.onload = async () => {
    let username = 'user20'
    let password = 'Y2cJZ38UPMmnPdAW'
    let token = btoa(username + ":" + password)

    let response = await fetch(url, {

        headers: {

            "Authorization": "Basic " + token
        }
    })
    let jsonRes = await response.json();
    console.log(jsonRes)

    document.querySelector("#productColumn").innerHTML = jsonRes.map(product => `
    <div class="col-md-6>
<img src="${product.imageUrl}" style="width:100%">
<p>${product.name} - ${product.price}</p>
    </div>
    `).join("")
}

// window.onload = async () => {
//     let products = await createProduct();
//     console.log("Products", products)
// }
// window.onload = async () => {
//     let products = await getProduct()
//     console.log("Products", products)
//     let productsColumn = document.querySelector("#productColumn")
//     if (products.length > 0) {
//         productsColumn.innerHTML = products
//             .map(product => `
//         <div class="col-md-6">
//         <img src="${product.imageUrl}" style="width:100%">
//          <p>${product.name} - ${product.price}</p>
//         </div>
//         `).join("")
//     } else {
//         currentEventsDiv.innerText = "Please create new product"
//     }
// }

getProduct = async (id) => {
    let response = await fetch(url + id);
    return await response.json();
}
handleSubmit = async () => {
    event.preventDefault();
    let myProduct = {
        name: document.querySelector("#name").value,
        description: document.querySelector("#description").value,
        price: document.querySelector("#price").value,
        brand: document.querySelector("#brand").value,
        imageUrl: document.querySelector("#avatar").value
    }
    console.log("MyProduct", myProduct);
    let response = await createProduct(myProduct)
    // console.log(response)
    if (response.ok) {
        alert("The product saved Successfully")
    } else {
        alert("The product was not saved")
    }
}
createProduct = async (product) => {
    let username = 'user20'
    let password = 'Y2cJZ38UPMmnPdAW'
    let token = btoa(username + ":" + password)
    let resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Authorization": "Basic " + token,
            "Content-type": "application/json"
        }
    })
    let jsonRes = await resp.json()
    // console.log(jsonRes)

}