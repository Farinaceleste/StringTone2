let productosEnCarrito = localStorage.getItem("productos-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML = " ";

        productosEnCarrito.forEach(producto => {
            if (producto.cantidad === 0) return;
            const div = document.createElement("div");
            div.classList.add("carrito-producto");

            div.innerHTML = `
    <div class="detalle-carrito">
                        <img class="carrito-producto-imagen" src="${producto.imagen}"
                            alt=${producto.titulo}>
                        <div class="carrito-producto-titulo">
                            <small>Titulo</small>
                            <h4>${producto.titulo}</h4>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id="${producto.id}"><i
                                class="bi bi-trash-fill"></i></button>
                    </div> `

            contenedorCarritoProductos.append(div);
        });

        
    actualizarBotonesEliminar();
    actualizarTotal();

    } else {

        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
  
    });

    if (!productosEnCarrito || productosEnCarrito.length === 0) {
        vaciarCarrito();
    }
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto eliminado",
        duration:1000,
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
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    const cantidad = e.currentTarget.cantidad;

    if (cantidad === 1) {
        productosEnCarrito.splice(index, 1);
    } else {
        productosEnCarrito[index].cantidad -= 1;
    }

    cargarProductosCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));


    if (!productosEnCarrito || productosEnCarrito.length === 0) {

        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
    }



    
}



botonVaciar.addEventListener ("click", vaciarCarrito);

function vaciarCarrito (){

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito()
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;

}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        title: "Compra realizada con exito!",
        icon: "success"
      });

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    


}