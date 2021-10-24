// Add btn add to cart
const productForm = $(".form-update-cart");
const btnAddCart = $(".btn--update-cart");
const btnAddCartBuy = $(".btn--update-cart-buy");

btnAddCart.addEventListener("click", () => {
	productForm.action = `/cart/updateCart?_method=PATCH`;
	productForm.submit();
});

btnAddCartBuy.addEventListener("click", () => {
	productForm.action = `/cart/updateCartBuy?_method=PATCH`;
	productForm.submit();
});

// input quantity changed
const itemPrice = $$(".item-price");
const inputQuantity = $$(".item-input");
const itemTotal = $$(".item-total");
inputQuantity.forEach((input, index) => {
	input.addEventListener("change", (e) => {
		input.value = e.target.value;
		const total =
			parseInt(e.target.value) * parseInt(itemPrice[index].dataset.price);
		console.log(parseInt(e.target.value));
		console.log(parseInt(itemPrice[index].dataset.price));
		console.log(total);
		itemTotal[index].innerHTML = total.toLocaleString() + "đ";
	});
});

// On click Xoa
const itemDelete = $$(".item-delete");
const formDelete = $(".form-delete-product");
itemDelete.forEach((item, index) => {
	item.addEventListener("click", () => {
		formDelete.action = `/cart/delete/${item.dataset.id}?_method=PATCH`;
		formDelete.submit();
	});
});

// item-active onchange
// const itemActive = $$('.item-active')
// itemActive.forEach((item, index) => {

// })
