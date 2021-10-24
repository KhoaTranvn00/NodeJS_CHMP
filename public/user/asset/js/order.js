// Add btn add to cart
const orderDeleteForm = $(".form-delete-order");
const orderDeleteBtn = $$(".js-btn-delete-order");

orderDeleteBtn.forEach((item, index) => {
	item.addEventListener("click", () => {
		orderDeleteForm.action = `/order/${item.dataset.id}?_method=DELETE`;
		orderDeleteForm.submit();
	});
});

btnAddCartBuy.addEventListener("click", () => {
	orderDeleteForm.action = `/cart/updateCartBuy?_method=PATCH`;
	orderDeleteForm.submit();
});
