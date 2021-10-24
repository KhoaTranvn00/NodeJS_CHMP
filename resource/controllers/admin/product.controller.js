const products = require("../../models/product.model");
const bands = require("../../models/band.model");
const categories = require("../../models/category.model");

class Product {
	async index(req, res, next) {
		try {
			// Filter sort
			let productsQuery = products.find({});
			const field = req.query.field;
			const type = req.query.type;
			let icon;
			switch (type) {
				case "-1":
					icon = "fa-sort-down";
					break;
				case "1":
					icon = "fa-sort-up";
					break;
				default:
					icon = "fa-sort";
			}
			if (req.query.hasOwnProperty("_sort")) {
				productsQuery = productsQuery.sort({
					[field]: type,
				});
			}

			// Pagination
			const page = parseInt(req.query.page) || 1;
			const perPage = 10;
			const skip = (page - 1) * perPage;
			const productsQueryData = productsQuery.skip(skip).limit(perPage);

			const [productsData, totalRows] = await Promise.all([
				productsQueryData.populate("category").populate("band"),
				products.countDocuments(),
			]);

			const totalPages = Math.ceil(totalRows / perPage);
			res.render("admin/product/index", {
				productsData,
				sort: {
					field,
					type,
					icon,
				},
				pagination: {
					page,
					perPage,
					totalRows,
					totalPages,
				},
			});
		} catch (error) {
			console.log(error);
			res.json("loi admin/product/index");
		}
	}

	async search(req, res, next) {
		try {
			// Filter sort
			const query = req.query.q;
			let productsQuery = products.find({
				name: { $regex: ".*" + query + ".*" },
			});
			const field = req.query.field;
			const type = req.query.type;
			let icon;
			switch (type) {
				case "-1":
					icon = "fa-sort-down";
					break;
				case "1":
					icon = "fa-sort-up";
					break;
				default:
					icon = "fa-sort";
			}
			if (req.query.hasOwnProperty("_sort")) {
				productsQuery = productsQuery.sort({
					[field]: type,
				});
			}

			// Pagination
			const page = parseInt(req.query.page) || 1;
			const perPage = 10;
			const skip = (page - 1) * perPage;
			const productsQueryData = productsQuery.skip(skip).limit(perPage);

			const [productsData, totalRows] = await Promise.all([
				productsQueryData.populate("category").populate("band"),
				products.countDocuments({ name: { $regex: ".*" + query + ".*" } }),
			]);

			const totalPages = Math.ceil(totalRows / perPage);
			res.render("admin/product/index", {
				productsData,
				sort: {
					field,
					type,
					icon,
				},
				pagination: {
					page,
					perPage,
					totalRows,
					totalPages,
				},
			});
		} catch (error) {
			console.log(error);
			res.json("loi admin/product/index");
		}
	}

	async getAdd(req, res, next) {
		const bandsData = await bands.find({});
		const categoriesData = await categories.find({});

		res.render("admin/product/add", { bandsData, categoriesData });
	}

	postAdd(req, res, next) {
		req.body.img = [];
		req.files.forEach((file) => {
			req.body.img.push("/" + file.path.split("\\").slice(1).join("/"));
		});
		products
			.create(req.body)
			.then(async () => {
				const bandsData = await bands.find({});
				const categoriesData = await categories.find({});
				res.render("admin/product/add", {
					bandsData,
					categoriesData,
					isSuccess: true,
					message: "Thêm sản phẩm thành công",
				});
			})
			.catch((err) => console.log(err));
	}

	delete(req, res, next) {
		products
			.findByIdAndDelete(req.params.id)
			.then(() => {
				res.locals.message = "Xóa thành công";
				res.redirect("back");
			})
			.catch((err) => console.log(err));
	}

	async getEdit(req, res, next) {
		const slug = req.params.slug;
		const bandsData = await bands.find({});
		const categoriesData = await categories.find({});
		products
			.findOne({ slug: slug })
			.then((product) =>
				res.render("admin/product/edit", { product, bandsData, categoriesData })
			)
			.catch((err) => console.log(err));
	}

	async putEdit(req, res, next) {
		const id = req.params.id;
		const productEdit = await products.findById(id);
		res.sold = productEdit.sold;
		req.body.img = [];
		req.files.forEach((file) => {
			req.body.img.push("/" + file.path.split("\\").slice(1).join("/"));
		});
		products
			.findByIdAndUpdate(id, req.body, { new: true })
			.then(async (product) => {
				const bandsData = await bands.find({});
				const categoriesData = await categories.find({});
				res.render("admin/product/edit", {
					product,
					bandsData,
					categoriesData,
					isSuccess: true,
					message: "Sửa sản phẩm thành công",
				});
			})
			.catch((err) => console.log(err));
	}

	detail(req, res, next) {
		const slug = req.params.slug;
		products
			.findOne({ slug: slug })
			.then((product) => res.json(product))
			.catch((err) => console.log(err));
	}
}

module.exports = new Product();
