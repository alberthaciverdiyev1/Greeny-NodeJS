const Products = require('../../Models/Products');

const add = async (req, res) => {
    console.log(req.body);
    const { category_id, city_id, price, description, phone, contact_type, email, imageURL } = req.body;

    if (isNaN(price)) {
        return res.status(400).json({ error: 'Price must be a number' });
    }

    try {
        const createdProduct = await Products.create({
            category_id,
            city_id,
            price,
            description,
            phone,
            contact_type,
            email,
            imageURL,
        });

        return res.status(201).json(createdProduct);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    add
};
