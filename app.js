const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const productos = [
    {
    id: 1,    
    nombre: "arena",
    precio: 5000,
    img:
    "./assets/img/arena.jpg",
    cantidad: 1,

},
    {
    id: 2,
    nombre: "cemento",
    precio: 1600,
    img: 
    "./assets/img/cemento.webp",
    cantidad: 1,
 },
    {
    id: 3,
    nombre: "cal", 
    precio: 800,
    img:
    "./assets/img/cal.jpg",
    cantidad: 1,
},
    {
    id:4,
    nombre: "ladrillos",
    precio: 300,
    img:
    "./assets/img/ladrillo.jpg",
    cantidad: 1,
 },

];
let carrito = JSON.parse(localStorage.getItem("carrito"))|| []

productos.forEach((product)=>{
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;
    
shopContent.append(content);

let comprar = document.createElement("button")
comprar.innerText = "comprar";
comprar.className = "comprar";

content.append(comprar);

comprar.addEventListener("click", () =>{

const repeat = carrito.some((repeatProduct)=> repeatProduct.id === product.id);


if (repeat) {
    carrito.map((prod) => {
    if (prod.id === product.id) {
        prod.cantidad++;
    }
    });
} else {
carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
    });
}
    console.log(carrito);
    console.log(carrito.length);
    carritoCounter();
    saveLocal();
});
});
const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito))
};

const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Ambos campos son obligatorios...');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
    //console.log(nameCity.value);
    //console.log(nameCountry.value);
})

function callAPI(city, country){
    const apiId = '1b85dd7cc6415e969574b08776351064';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            //console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);

    /* console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon); */
}

function showError(message){
    //console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}