const jwt = require("jsonwebtoken");

const users = require("../../models/user.model");
const products = require("../../models/product.model");
const bands = require("../../models/band.model");
const categories = require("../../models/category.model");

class user {
	async index(req, res, next) {
		let productsQuery = products.find({}).populate("band");

		// arranged case
		if (req.query.hasOwnProperty("_sort")) {
			productsQuery = productsQuery.sort({
				[req.query.filed]: req.query.type,
			});
		}
		const filter = req.query.filed || "";

		// paginaiton
		const page = parseInt(req.query.page) || 1;
		const perPage = 20;
		const start = (page - 1) * perPage;
		const end = page * perPage;
		productsQuery = productsQuery.skip(start).limit(perPage);

		// get data
		const [bandsData, categoriesData, productsData, totalRows] =
			await Promise.all([
				bands.find({}),
				categories.find({}),
				productsQuery,
				products.countDocuments(),
			]);

		const totalPages = Math.ceil(totalRows / perPage);

		res.render("user/index", {
			productsData,
			bandsData,
			categoriesData,
			filter,
			pagination: {
				page: page,
				totalRows: totalRows,
				totalPages: totalPages,
			},
		});
	}

	async productDetail(req, res, next) {
		try {
			const slug = req.params.slug;
			const productCurrent = await products
				.findOne({ slug: slug })
				.populate("band")
				.populate("category");
			const [
				bandsData,
				categoriesData,
				productsBand,
				productsCategory,
				productsCategoryBestSell,
			] = await Promise.all([
				bands.find({}),
				categories.find({}),
				products
					.find({ band: productCurrent.band })
					.populate("band")
					.populate("category"),
				products
					.find({ category: productCurrent.category })
					.populate("band")
					.populate("category"),
				products
					.find({ category: productCurrent.category })
					.sort({ sold: "desc" })
					.limit(5)
					.populate("band")
					.populate("category"),
			]);
			const message = req.query.isAdd ? "Thêm vào giỏ hàng thàng công" : "";
			res.render("user/productDetail", {
				productCurrent,
				bandsData,
				categoriesData,
				productsBand,
				productsCategory,
				productsCategoryBestSell,
				message,
			});
		} catch (error) {
			console.log(error);
			res.json("loi sv product detail");
		}
	}

	async search(req, res, next) {
		const query = req.query.q;

		// Pagination
		const page = parseInt(req.params.page) || 1;
		const perPage = 20;
		const skip = (page - 1) * perPage;

		const [bandsData, categoriesData, productsData, totalRows] =
			await Promise.all([
				bands.find({}),
				categories.find({}),
				products
					.find({ name: { $regex: ".*" + query + ".*" } })
					.skip(skip)
					.limit(perPage)
					.populate("band"),
				products.countDocuments({ name: { $regex: ".*" + query + ".*" } }),
			]);

		const totalPages = Math.ceil(totalRows / perPage);

		res.render("user/index", {
			productsData,
			bandsData,
			categoriesData,
			pagination: {
				page,
				totalRows,
				totalPages,
			},
		});
	}

	async productCategory(req, res, next) {
		const slug = req.params.slug;
		const category = await categories.findOne({ slug: slug });

		let productsQuery = products
			.find({ category: category._id })
			.populate("band");

		// arranged case
		if (req.query.hasOwnProperty("_sort")) {
			productsQuery = productsQuery.sort({
				[req.query.filed]: req.query.type,
			});
		}
		const filter = req.query.filed || "";

		// pagination
		const page = parseInt(req.query.page) || 1;
		const perPage = 20;
		const skip = (page - 1) * perPage;
		productsQuery = productsQuery.skip(skip).limit(perPage);

		// get data
		const [bandsData, categoriesData, productsData, totalRows] =
			await Promise.all([
				bands.find({}),
				categories.find({}),
				productsQuery,
				products.countDocuments({ category: category._id }),
			]);

		const totalPages = Math.ceil(totalRows / perPage);

		res.render("user/index", {
			productsData,
			bandsData,
			categoriesData,
			filter,
			pagination: {
				page,
				totalRows,
				totalPages,
			},
		});
	}

	async productBand(req, res, next) {
		const slug = req.params.slug;
		const band = await bands.findOne({ slug: slug });

		let productsQuery = products.find({ band: band._id }).populate("band");

		// arranged case
		if (req.query.hasOwnProperty("_sort")) {
			productsQuery = productsQuery.sort({
				[req.query.filed]: req.query.type,
			});
		}
		const filter = req.query.filed || "";

		// pagination
		const page = parseInt(req.query.page) || 1;
		const perPage = 20;
		const skip = (page - 1) * perPage;
		productsQuery = productsQuery.skip(skip).limit(perPage);

		// get data
		const [bandsData, categoriesData, productsData, totalRows] =
			await Promise.all([
				bands.find({}),
				categories.find({}),
				productsQuery,
				products.countDocuments({ band: band._id }),
			]);

		const totalPages = Math.ceil(totalRows / perPage);

		res.render("user/index", {
			productsData,
			bandsData,
			categoriesData,
			filter,
			pagination: {
				page: page,
				totalRows: totalRows,
				totalPages: totalPages,
			},
		});
	}
}

module.exports = new user();
