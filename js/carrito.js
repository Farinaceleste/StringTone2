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
const productsList = document.querySelector(".contenedor-item")

let allProducts = [];
const valortotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {

	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h4').textContent,
			price: product.querySelector('span').textContent
		}

		allProducts = [...allProducts, infoProduct]

		showHTML();
	}
})

// funcion para mostrar productos en carrito

const showHTML = () => {

	rowProduct.innerHTML = '';

	allProducts.forEach(product => {	
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');
		containerProduct.innerHTML = `

		<div class="cart-product">
		<div class="info-cart-product">
			<span class="cantidad-producto-carrito">${product.quantity}</span>
			<p class="titulo-producto-carrito">${product.title}</p>
			<span class="precio-producto-carrito">${product.price}</span>
			<div><i class="bi bi-x-lg container-cart-icon"></i></div>
		</div>
	</div>
		
	<div class="count-products">
		<span id="contador-productos">0</span>
	</div>
</div>
<div class="container-cart-products hidden-cart hidden">
<div class="row-product">
	`
		rowProduct.append(containerProduct);

		total =
			total.parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = TotalOfProducts;
};