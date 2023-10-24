// CLICK PARA ABRIR CARRITO DESDE TIENDA 


const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener("click", () => {
	containerCartProducts.classList.toggle('hidden-cart');
});



//----------------------------------------------------------------------------------------------


const rowProduct = document.querySelector(".row.product");
const productsList = document.querySelector (".contenedor-item")

let allProducts = [];

productsList.addEventListener('click', e => {

	if (e.target.classList.contains('btn-add-cart'));
	const Product = e.target.parentElement;

	const infoProduct = {
		quantity: 1,
		title: Product.querySelector('h4').textContent,
		price: Product.querySelector('span').textContent
	}



	console.log (infoProduct);
})

