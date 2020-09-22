const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let datos = null;
let tipo = "";

//Se traen los datos
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    datos = data;
  });

let renderMain = () => {
  console.log(tipo);
  console.log(datos);
};

let btnBurgers = document.getElementById("burgers");
btnBurgers.addEventListener("click", () => {
  tipo = "Burguers";
  renderMain();
});

let btnTacos = document.getElementById("tacos");
btnBurgers.addEventListener("click", () => {
  tipo = "Tacos";
  renderMain();
});

let btnSalads = document.getElementById("salads");
btnBurgers.addEventListener("click", () => {
  renderMain(datos, "Salads");
});

let btnDesserts = document.getElementById("desserts");
btnBurgers.addEventListener("click", () => {
  tipo = "Desserts";
  renderMain(datos);
});

let btnDrinks = document.getElementById("drinks");
btnBurgers.addEventListener("click", () => {
  tipo = "Drinks and Sides";
  renderMain(datos);
});

//Se carga el main
