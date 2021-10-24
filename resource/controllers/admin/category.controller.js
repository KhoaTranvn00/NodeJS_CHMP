const categories = require("../../models/category.model");

class Category {
	index(req, res, next) {
		categories
			.find({})
			.then((categories) => res.render("admin/category/index", { categories }))
			.catch((err) => console.log(err));
	}

	getAdd(req, res, next) {
		res.render("admin/category/add");
	}

	postAdd(req, res, next) {
		req.body.img = "/" + req.file.path.split("\\").slice(1).join("\\");
		categories
			.create(req.body)
			.then(() =>
				res.render("admin/category/add", {
					isSuccess: true,
					message: "Thêm danh mục thành công",
				})
			)
			.catch((err) => console.log(err));
	}

	delete(req, res, next) {
		categories
			.findByIdAndDelete(req.params.id)
			.then(() => {
				res.locals.message = "Xóa thành công";
				res.redirect("back");
			})
			.catch((err) => console.log(err));
	}

	getEdit(req, res, next) {
		const slug = req.params.slug;
		categories
			.findOne({ slug: slug })
			.then((category) => res.render("admin/category/edit", { category }))
			.catch((err) => console.log(err));
	}

	putEdit(req, res, next) {
		const id = req.params.id;
		req.body.img = "/" + req.file.path.split("\\").slice(1).join("\\");
		categories
			.findByIdAndUpdate(id, req.body, { new: true })
			.then((category) =>
				res.render("admin/category/edit", {
					category,
					isSuccess: true,
					message: "Sửa danh mục thành công",
				})
			)
			// .then(() => { res.redirect('back')})
			.catch((err) => console.log(err));
	}
}

module.exports = new Category();
