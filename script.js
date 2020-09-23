const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let datos = null;
let tipo = "Burguers";
let numItems = 0;

let listaItemsSC = new Map();

//Se traen los datos
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    datos = data;
    renderMain();
  });

//Se carga/actualiza el main
let renderMain = () => {
  console.clear();
  let strMain = "";
  datos.map((item) => {
    if (item.name == tipo) {
      item.products.map((prod, index) => {
        strMain += `<div class = "col-3">
        <div style="margin-bottom: 3%" class="card" style="width: 18rem;">
        <img src="${prod.image}" class="card-img-top" alt="Photo">
        <div class="card-body">
          <h5 class="card-title">${prod.name}</h5>
          <p class="card-text">${prod.description}</p>
          <p class="card-text"><strong>$${prod.price}</strong></p>
          <button id="${
            index + ":" + tipo
          }" type="button" class="btn btn-secondary">Add to car</button>
        </div>
      </div>
      </div>`;
      });
      document.getElementById("titleItem").innerHTML = tipo;
      document.getElementById("main").innerHTML =
        `<div class="row">` + strMain + "</div>";
      item.products.map((prod, index) => {
        document
          .getElementById(index + ":" + tipo)
          .addEventListener("click", () => {
            renderShoppingCart(index + ":" + tipo);
          });
      });
    }
  });
};

let btnBurgers = document.getElementById("burgers");
btnBurgers.addEventListener("click", () => {
  tipo = "Burguers";
  renderMain();
});

let btnTacos = document.getElementById("tacos");
btnTacos.addEventListener("click", () => {
  tipo = "Tacos";
  renderMain();
});

let btnSalads = document.getElementById("salads");
btnSalads.addEventListener("click", () => {
  tipo = "Salads";
  renderMain();
});

let btnDesserts = document.getElementById("desserts");
btnDesserts.addEventListener("click", () => {
  tipo = "Desserts";
  renderMain();
});

let btnDrinks = document.getElementById("drinks");
btnDrinks.addEventListener("click", () => {
  tipo = "Drinks and Sides";
  renderMain();
});

//Se actualiza el carro de compras
let renderShoppingCart = (id) => {
  numItems++;
  document.getElementById("numItemSC").innerHTML = numItems + " items";
  //Se agrega el elemento al hash
  if (!listaItemsSC.has(id)) {
    listaItemsSC.set(id, 1);
  } else {
    let qt = listaItemsSC.get(id);
    qt++;
    listaItemsSC.set(id, qt);
  }
};

//Se muestra el total
document.getElementById("imgShoppingCart").addEventListener("click", () => {
  displayTotalSCItems();
});

let displayTotalSCItems = () => {
  if (numItems != 0) {
    let totalSum = 0;
    document.getElementById("main").innerHTML = "";
    document.getElementById("titleItem").innerHTML = "Order detail";
    let tableStriped = `<table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Qty.</th>
        <th scope="col">Name</th>
        <th scope="col">Unit price</th>
        <th scope="col">Amount</th>
      </tr>
    </thead>
    <tbody>`;
    let finTableStriped = `</tbody>
    </table>
    <br/>
    <div>
    <p class="justify-content-start" id="total"></p>
    <div class="d-flex flex-row-reverse" style="margin-top:-5%;">
      <button style="margin-left:1%;" id="confirm" type="button" class="btn btn-light">Confirm order</button>
      <button data-toggle="modal" data-target="#modal" id="cancel" type="button" class="btn btn-danger">Cancel</button>
    </div>
  </div>`;
    let tableBody = "";
    let itemCount = 0;
    for (let key of listaItemsSC.keys()) {
      for (let i = 0; i < datos.length; i++) {
        let id = key.split(":")[0];
        let categorie = key.split(":")[1];
        if (categorie == datos[i].name) {
          for (let j = 0; j < datos[i].products.length; j++) {
            if (id == j) {
              itemCount++;
              actProduct = datos[i].products[j];
              let amount = actProduct.price * listaItemsSC.get(key);
              totalSum += amount;
              //Se crea la table-striped
              tableBody += `
                <tr>
                  <th scope="row">${itemCount}</th>
                  <td>${listaItemsSC.get(key)}</td>
                  <td>${actProduct.name}</td>
                  <td>${actProduct.price}</td>
                  <td>${amount}</td>
                </tr>`;
            }
          }
        }
      }
    }
    //Se inserta el resultado
    document.getElementById("main").innerHTML =
      tableStriped + tableBody + finTableStriped;
    document.getElementById("total").innerHTML =
      "<strong>Total: $" + totalSum.toFixed(2) + "</strong>";
  }

  //Confirmar orden
  document.getElementById("confirm").addEventListener("click", () => {
    let elementArray = [];

    let counter = 0;
    for (let key of listaItemsSC.keys()) {
      let id = key.split(":")[0];
      let cate = key.split(":")[1];
      for (let i = 0; i < datos.length; i++) {
        if (cate == datos[i].name) {
          for (let j = 0; j < datos[i].products.length; j++) {
            if (id == j) {
              counter++;
              let newElement = {
                item: counter,
                quantity: listaItemsSC.get(key),
                name: datos[i].products[j].name,
                unitPrice: datos[i].products[j].price,
              };
              elementArray.push(newElement);
            }
          }
        }
      }
    }

    console.log(elementArray);
  });
};

// Llamar al modal para cancelar
document.getElementById("cancelOrder").addEventListener("click", () => {
  tipo = "Burguers";
  renderMain();
  numItems = 0;
  listaItemsSC = new Map();
  document.getElementById("numItemSC").innerHTML = "0 items";
});
