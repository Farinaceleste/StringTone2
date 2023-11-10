let productos = [];

fetch("../js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    });

//mostrar productos en tienda, sin html

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const contadorProductos = document.querySelector("#contador-productos");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalle">
            <h6 class="titulo-item">${producto.titulo}</h6>
            <span class="precio-item">$${producto.precio}</span>
            <button class="boton-item btn-add-cart producto-agregar" id="${producto.id}">AGREGAR</button>
        </div>
        `
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton)
        } else {
            cargarProductos(productos);
        }
    })
})

function actualizarBotonesAgregar () {
    
    
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener ("click", agregarAlCarrito);

    });


}

let productosenCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-carrito")

 

if (productosEnCarritoLS) {
    productosenCarrito = JSON.parse (productosEnCarritoLS);
    actualizarContador();
} else {
    productosenCarrito =[];
}

function agregarAlCarrito (e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to left, #000000, #9d0208)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find (producto => producto.id === idBoton);
   
    if (productosenCarrito.some(producto => producto.id === idBoton)) {
        const index = productosenCarrito.findIndex(producto => producto.id === idBoton)
        productosenCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad=1;
        productosenCarrito.push(productoAgregado);
    }
    
    actualizarContador();

    localStorage.setItem("productos-carrito", JSON.stringify(productosenCarrito))
}

function actualizarContador (){
    let nuevoContador = productosenCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); 
    contadorProductos.innerText = nuevoContador;
}

