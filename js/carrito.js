const btnCart = document.querySelector('#container-cart-icon');
const containerCartProducts = document.querySelector(
	'#container-cart-products'
);

btnCart.addEventListener("click", () => {
	containerCartProducts.classList.toggle('hidden-cart');
});







// const cartProductos =document.querySelector('#carrito-productos');

// const agregarProducto =document.querySelector('#btn-add-cart');
// const productoCarrito =document.querySelector("#items");




// productoCarrito.addEventListener ('click', e => {

// console.log (e.target);

// })

