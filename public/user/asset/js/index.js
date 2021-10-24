const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// onclick modal
const message = $(".message");
message.addEventListener("click", () => {
	message.classList.add("d-none");
});
