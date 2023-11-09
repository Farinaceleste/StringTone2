// ARRAY PRODUCTOS 

const productos = [
    {
        id: "instrumento-01",
        titulo: "Aerodyne Special Telecaster",
        imagen: "../images/aerodyne-special-telecaster.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 210000
    },
    {
        id: "instrumento-02",
        titulo: "American Professional Jazzmaster",
        imagen: "../images/american-professional-jazzmaster.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 165000
    },
    {
        id: "instrumento-03",
        titulo: "Jaguar Bass Limited Edition",
        imagen: "../images/bajo-jaguar-ed-limitada.jpg",
        categoria: {
            nombre: "Bajos",
            id: "bajos"
        },
        precio: 420000
    },
    {
        id: "instrumento-04",
        titulo: "Flea Jazz Bass",
        imagen: "../images/flea-jazz-bass.jpg",
        categoria: {
            nombre: "Bajos",
            id: "bajos"
        },
        precio: 315000
    },
    {
        id: "instrumento-05",
        titulo: "Troy Sanders Bass",
        imagen: "../images/troy-sanders-bajo.jpg",
        categoria: {
            nombre: "Bajos",
            id: "bajos"
        },
        precio: 190000
    },
    {
        id: "instrumento-06",
        titulo: "American Bass",
        imagen: "../images/american-performer-bass.jpg",
        categoria: {
            nombre: "Bajos",
            id: "bajos"
        },
        precio: 190000
    },
    {
        id: "instrumento-07",
        titulo: "American Mustang",
        imagen: "../images/american-performer-mustang.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 550000
    },
    {
        id: "instrumento-08",
        titulo: "American Stratocaster",
        imagen: "../images/american-profesional-stratocaster.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 450000
    },
    {
        id: "instrumento-09",
        titulo: "American Telecaster",
        imagen: "../images/american-profesional-telecaster.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 690000
    },
    {
        id: "instrumento-10",
        titulo: "American Ultra Jazzmaster",
        imagen: "../images/american-ultra-jazzmaster.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 880000
    },
    {
        id: "instrumento-11",
        titulo: "Malibu Special",
        imagen: "../images/malibu-especial.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 225000
    },
    {
        id: "instrumento-12",
        titulo: "NewPorter Player",
        imagen: "../images/newporter-player.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 150000
    },
    {
        id: "instrumento-13",
        titulo: "Tim Armstrong Hellcat",
        imagen: "../images/tim-armstrong-hellcat.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 183000
    },
    {
        id: "guitarra-14",
        titulo: "Sonoran Mini with Bag",
        imagen: "../images/sonoran-mini-with-bag.jpg",
        categoria: {
            nombre: "Guitarras",
            id: "guitarras"
        },
        precio: 175000
    }

]

//mostrar productos en tienda, sin html

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const contadorProductos = document.querySelector("#contador-productos");

function cargarProductos(productosElegidos, productos) {

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
cargarProductos(productos)

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

