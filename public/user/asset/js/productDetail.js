// picture product list
const imgsDetail = $$(".product-detail__img");
const imgBg = $(".product-detail__bg");

imgsDetail.forEach((item) => {
	item.addEventListener("click", () => {
		let imgActive = $(".product-detail__img-detail img.active");
		console.log(`"url(\"${item.getAttribute("src")}\")"`);
		imgBg.style.backgroundImage = `url('${item.getAttribute("src")}')`;
		console.log(imgBg.style.backgroundImage);
		imgActive.classList.remove("active");
		item.classList.add("active");
	});
});

// product list band
const controlBandRight = $(
	".product-img__control-band.product-img__control--right"
);
const controlBandLeft = $(
	".product-img__control-band.product-img__control--left"
);
const productListBand = $(".product-list--band .row.sm-gutter");
let indexBand = 0;

controlBandRight.addEventListener("click", () => {
	indexBand++;
	productListBand.style.transform = `translateX(${-indexBand * 100}%)`;
});

controlBandLeft.addEventListener("click", () => {
	indexBand--;
	productListBand.style.transform = `translateX(${-indexBand * 100}%)`;
});

// product list category
const controlCategoryRight = $(
	".product-img__control-category.product-img__control--right"
);
const controlCategoryLeft = $(
	".product-img__control-category.product-img__control--left"
);
const productListCategory = $(".product-list--category .row.sm-gutter");
let indexCategory = 0;

controlCategoryRight.addEventListener("click", () => {
	indexCategory++;
	productListCategory.style.transform = `translateX(${-indexCategory * 100}%)`;
});

controlCategoryLeft.addEventListener("click", () => {
	indexCategory--;
	productListCategory.style.transform = `translateX(${-indexCategory * 100}%)`;
});

// Add btn add to cart
const productForm = $(".product-form");
const btnAddCart = $(".btn--add-cart");
const btnAddCartBuy = $(".btn--buy");

btnAddCart.addEventListener("click", () => {
	productForm.action = `/cart/add/${btnAddCart.dataset.id}?_method=PATCH`;
	productForm.submit();
});

btnAddCartBuy.addEventListener("click", () => {
	productForm.action = `/cart/add/buy/${btnAddCart.dataset.id}?_method=PATCH`;
	productForm.submit();
});
