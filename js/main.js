


// CLICK PARA ABRIR CARRITO DESDE TIENDA 


const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener("click", () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

//----------------------------------------------------------------------------------------------


const rowProduct = document.querySelector(".row-product");
const productsList = document.querySelector(".contenedor-item")

let allProducts = [];
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', (e) => {

	if (e.target.classList.contains('btn-add-cart')) {

		Toastify({
			text: "Producto Agregado",
			className: "info",
			style: {
				background: "linear-gradient(to left, #000000, #772e25)",
			}
		}).showToast();

		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h4').textContent,
			price: product.querySelector('span').textContent

		}

		const exits = allProducts.some(product => product.title === infoProduct.title);

		if (exits) {

			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product
				} else {
					return product
				}
			})
			allProducts = [...products]
		} else {
			allProducts = [...allProducts, infoProduct]

			localStorage.setItem("productos-en-carrito", JSON.stringify(allProducts));


		}

		showHTML();

	}


})

rowProduct.addEventListener('click', (e) => {

	Toastify({
		text: "Producto eliminado",
		className: "info",
		style: {
			background: "linear-gradient(to left, #000000, #772e25)",
		}
	}).showToast();

	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement
		const title = product.querySelector('p').textContent

		allProducts = allProducts.filter(product => product.title !== title)

		localStorage.setItem("productos-en-carrito", JSON.stringify(allProducts));

	}

	console.log(allProducts)
	showHTML();
})


// funcion para mostrar productos en carrito

const showHTML = () => {

	if (!allProducts.length) {
		containerCartProducts.innerHTML =
			`
		<p class="cart-empty">El carrito está vacío</p>
		`
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');
		containerProduct.innerHTML = `

		<div class="info-cart-product">
		<span class="cantidad-producto-carrito">${product.quantity}</span>
		<p class="titulo-producto-carrito">${product.title}</p>
		<span class="precio-producto-carrito">${product.price}</span>
	</div>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="icon-close"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>

	`
		rowProduct.append(containerProduct);

		total = total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;



	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;

};


// FILTRAR PRODUCTOS

const botonesCategorias = document.querySelectorAll(".boton-categoria");


botonesCategorias.forEach(boton => {
	boton.addEventListener("click", (e) => {

		botonesCategorias.forEach(boton => boton.classList.remove("active"));
		e.currentTarget.classList.add("active");



	})

})

