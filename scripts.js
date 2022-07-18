
// =============================> READ operation
let table = document.getElementById("productsContainer");
let products = [];
if (localStorage.getItem("products"))
  products = JSON.parse(localStorage.getItem("products"));

for (let product of products) {
  table.innerHTML += `
    <tr>
        <td>${product.name}</td>
        <td>${product.price}$</td>
        <td>${product.discount}%</td>
        <td>${product.total}$</td>
        <td>${product.category}</td>
        <td>${product.amount}</td>
        <td>
            <img src="./icons/edit.png" alt="edit icon" onClick="updateFunc(${+product.id})"/>
            <img src="./icons/delete.png" alt="delete icon" onClick="deleteFunc(${+product.id})"/>
        </td>
    </tr>`;
}




// =============================> CREATE operation
let nameInp = document.getElementById("nameInp");
let priceInp = document.getElementById("priceInp");
let discInp = document.getElementById("discInp");
let amountInp = document.getElementById("amountInp");
let catoInp = document.getElementById("catoInp");
let addBtn = document.getElementById("addBtn");
let editBtn = document.getElementById("editBtn");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    nameInp.value != "" &&
    priceInp.value != "" &&
    discInp.value != "" &&
    catoInp.value != "" &&
    amountInp.value != ""
  ) {
    // calc the total
    let total = Math.round(
      +priceInp.value - (+priceInp.value / 100) * +discInp.value
    );

    // to generate a uniqe id
    function generateID() {
      function rnd(n) {
        return Math.floor(Math.random() * n);
      }
      const chars = "0123456789";
      let id = "";
      for (let i = 0; i < 16; i++) id += chars[rnd(chars.length)];
      return +id;
    }
    // create a new product
    let newProduct = {
      id: generateID(),
      total: total,
      name: nameInp.value,
      price: +priceInp.value,
      discount: +discInp.value,
      amount: +amountInp.value,
      category: catoInp.value,
    };
    // add the new product to the array
    products.push(newProduct);
    // add the array to local storage
    localStorage.setItem("products", JSON.stringify(products));
    // reload
    window.location.reload();
  }
});

// =============================> DELETE operation
// to get the index of deleted element
function indexOfDeleted(id) {
  return (index = products.indexOf(
    products.find((e) => {
      if (e.id == id) return e;
    })
  ));
}
function deleteFunc(id) {
  // get the element by ID
  const index = indexOfDeleted(id);
  // remove it from array
  products.splice(index, 1);
  // update local storage
  localStorage.setItem("products", JSON.stringify(products));
  // reload
  window.location.reload();
}




// =============================> UPDATE operation
function updateFunc(id) {
  // disbale edit button
  document.querySelectorAll("tr td img:first-child").forEach((e) => {
    e.style.pointerEvents = "none";
  });
  // get the element by ID
  const index = indexOfDeleted(id);
  const e = products[index];
  // put data in inputs
  nameInp.value = e.name;
  priceInp.value = e.price;
  discInp.value = e.discount;
  catoInp.value = e.category;
  amountInp.value = e.amount;
  // change title to edit
  document.querySelectorAll("aside .titles h1").forEach((e) => {
    e.style.transform = "translateY(-60px)";
  });
  // change button to update button
  addBtn.style.transform = "translateY(-70px)";
  editBtn.style.transform = "translateY(-70px)";
  // update action
  editBtn.addEventListener("click", (el) => {
    el.preventDefault();
    if (
      nameInp.value != "" &&
      priceInp.value != "" &&
      discInp.value != "" &&
      catoInp.value != "" &&
      amountInp.value != ""
    ) {
      // calc a new total
      let total = Math.round(
        +priceInp.value - (+priceInp.value / 100) * +discInp.value
      );
      // change element values
      products[index].name = nameInp.value;
      products[index].price = +priceInp.value;
      products[index].amount = +amountInp.value;
      products[index].category = catoInp.value;
      products[index].discount = +discInp.value;
      products[index].total = total;
      // update local storage
      localStorage.setItem("products", JSON.stringify(products));
      // reload
      window.location.reload();
    }
  });
}




// =============================> SEARCH operation
let searchBtn = document.getElementById("searchBtn");
let searchInp = document.getElementById("searchInp");
let closeSearch = document.getElementById("close-search");
let searchResult = document.getElementById("searchResult");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInp.value != "") {
    // set search word
    searchResult.innerHTML = `
    <p>Search result for <span>"${searchInp.value}"</p>
    `;
    // get filtered elements
    let filteredArr = products.filter((e) => {
      return e.name.toLowerCase().includes(searchInp.value.toLowerCase());
    });
    // display filtered elements
    table.innerHTML = "";
    if (filteredArr.length) {
      for (let product of filteredArr) {
        table.innerHTML += `
              <tr>
                  <td>${product.name}</td>
                  <td>${product.price}$</td>
                  <td>${product.discount}%</td>
                  <td>${product.total}$</td>
                  <td>${product.category}</td>
                  <td>${product.amount}</td>
                  <td>
                      <img src="./icons/edit.png" alt="edit icon" onClick="updateFunc(${+product.id})"/>
                      <img src="./icons/delete.png" alt="delete icon" onClick="deleteFunc(${+product.id})"/>
                  </td>
              </tr>`;
      }
    } else {
      table.innerHTML = `<h1 class="not-found">Not Found</h1>`;
    }
  }
});
closeSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInp.value != "") {
    // remove search word
    searchResult.innerHTML = "";
    searchInp.value = "";
    // display all products
    table.innerHTML = "";
    for (let product of products) {
      table.innerHTML += `
              <tr>
                  <td>${product.name}</td>
                  <td>${product.price}$</td>
                  <td>${product.discount}%</td>
                  <td>${product.total}$</td>
                  <td>${product.category}</td>
                  <td>${product.amount}</td>
                  <td>
                      <img src="./icons/edit.png" alt="edit icon" onClick="updateFunc(${+product.id})"/>
                      <img src="./icons/delete.png" alt="delete icon" onClick="deleteFunc(${+product.id})"/>
                  </td>
              </tr>`;
    }
  }
});
