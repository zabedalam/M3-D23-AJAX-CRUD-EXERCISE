const url = "https://strive-school-testing-apis.herokuapp.com/api/product/";

window.onload = async () => {
  await loadProducts();
};

loadProducts = async () => {
  let products = await getProducts();
  console.log("PRODUCTS", products);
  document.querySelector("#productColumn").innerHTML =
    "<ul class='list-group'>" +
    products
      .map(
        product => `<li class="list-group-item">
      <div class="col-md-6>
  <img src="${product.imageUrl}" style="width:100%">
  <p>${product.name} - ${product.price}</p>
  <input type="button" class="btn btn-danger" value="X" onclick="deleteRow('${product._id}')" />
      </div>
      `
      )
      .join("") +
    " </ul>";
};

getProducts = async () => {
  let username = "user20";
  let password = "Y2cJZ38UPMmnPdAW";
  let token = btoa(username + ":" + password);
  let response = await fetch(url, {
    headers: {
      Authorization: "Basic " + token
    }
  });
  return await response.json();
};
handleSubmit = async () => {
  event.preventDefault();
  let myProduct = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    price: document.querySelector("#price").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#avatar").value
  };

  console.log("MyProduct", JSON.stringify(myProduct));
  let response = await createProduct(myProduct);
  console.log(response);
  if (response) {
    await loadProducts();
  } else {
    alert("The product was not saved");
  }
};

createProduct = async product => {
  let username = "user20";
  let password = "Y2cJZ38UPMmnPdAW";
  let token = btoa(username + ":" + password);
  let resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      Authorization: "Basic " + token,
      "Content-type": "application/json"
    }
  });

  return resp;
};

deleteProduct = async id => {
  let username = "user20";
  let password = "Y2cJZ38UPMmnPdAW";
  let token = btoa(username + ":" + password);
  let reponse = await fetch(url + id, {
    method: "DELETE",
    headers: {
      Authorization: "Basic " + token
    }
  });
  return reponse;
};

deleteRow = async id => {
  let button = event.currentTarget;
  let success = await deleteProduct(id);

  if (success) {
    var li = button.closest(".list-group-item");
    li.parentElement.removeChild(li);
  } else {
    alert("Something went worng!Please try later");
  }
};
