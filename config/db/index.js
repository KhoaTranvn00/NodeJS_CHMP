const mongoose = require("mongoose");

async function connect() {
	try {
		await mongoose.connect(
			// "mongodb://localhost:27017/CHMP",
			"mongodb+srv://anhkhoacttv:05012000@cluster0.gtkea.mongodb.net/TodoList?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
			}
		);
		console.log("Connect Successfully!!");
	} catch (error) {
		console.log("Connect Fail!!!!!!!!", error);
	}
}

module.exports = { connect };
