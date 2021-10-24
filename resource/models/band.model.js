const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const BandSchema = new Schema({
    name: { type: String},
    desc: { type: String},
    img: { type: String},
    slug: { type: String, slug: "name", unique: true}
})

module.exports = mongoose.model('band', BandSchema)
