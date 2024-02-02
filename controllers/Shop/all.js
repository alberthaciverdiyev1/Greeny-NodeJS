const Products = require('../../Models/Products')
const index = async (req, res) => {
    try {
       await Products.find({}).sort({ $natural: -1 }).then((products => {
            res.render('Shop/index', { products: products });
        }))
    } catch (error) {
        return res.status(404)
    }
}

module.exports = {
    index
};