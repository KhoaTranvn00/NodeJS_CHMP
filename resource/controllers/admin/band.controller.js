const bands = require("../../models/band.model");

class Band {
	index(req, res, next) {
		bands
			.find({})
			.then((bands) => res.render("admin/band/index", { bands }))
			.catch((err) => console.log(err));
	}

	getAdd(req, res, next) {
		res.render("admin/band/add");
	}

	postAdd(req, res, next) {
		req.body.img = "/" + req.file.path.split("\\").slice(1).join("\\");
		bands
			.create(req.body)
			.then(() =>
				res.render("admin/band/add", {
					isSuccess: true,
					message: "Thêm thương hiệu thành công",
				})
			)
			.catch((err) => console.log(err));
	}

	delete(req, res, next) {
		bands
			.findByIdAndDelete(req.params.id)
			.then(() => {
				res.locals.message = "Xóa thành công";
				res.redirect("back");
			})
			.catch((err) => console.log(err));
	}

	getEdit(req, res, next) {
		const slug = req.params.slug;
		bands
			.findOne({ slug: slug })
			.then((band) => res.render("admin/band/edit", { band }))
			.catch((err) => console.log(err));
	}

	putEdit(req, res, next) {
		const id = req.params.id;
		req.body.img = "/" + req.file.path.split("\\").slice(1).join("\\");
		bands
			.findByIdAndUpdate(id, req.body, { new: true })
			.then((band) =>
				res.render("admin/band/edit", {
					band,
					isSuccess: true,
					message: "Sửa thương hiệu thành công",
				})
			)
			// .then(() => { res.redirect('back')})
			.catch((err) => console.log(err));
	}
}

module.exports = new Band();
