const Products = require('../../Models/Products');
const cloudinary = require('cloudinary').v2


const addIndex = (req, res) => {
    res.render('Shop/add');
}

// const add = async (req, res) => {

//     const result = await cloudinary.uploader.upload(
//         req.files.image.tempFilePath,
//         {
//             use_filename: true,
//             folder: 'GREENY'
//         }
//     )
//     console.log("RESULT:", result);
//     const data = {
//         // category_id: req.body.category_id,
//         title: req.body.title,
//         // city_id: req.body.city_id,
//         price: req.body.price,
//         description: req.body.description,
//         phone: req.body.phone,
//         contact_type: req.body.contact_type,
//         email: req.body.email,
//         imageURL: req.body.imageURL
//     };

//     // const data = {
//     //     // category_id: 1, // Replace with an actual category ID
//     //     title: 'Example Product', // Replace with an actual product title
//     //     name: 'Albert', // Replace with an actual product title
//     //     // city_id: 2, // Replace with an actual city ID
//     //     price: 25.99, // Replace with an actual product price
//     //     description: 'This is an example product description.', // Replace with an actual product description
//     //     phone: '123-456-7890', // Replace with an actual phone number
//     //     contact_type: 'email', // Replace with 'phone' or 'email' based on your needs
//     //     email: 'example@email.com', // Replace with an actual email address
//     //     imageURL: 'https://example.com/image.jpg' // Replace with an actual image URL
//     // };


//     if (isNaN(data.price)) {
//         return res.status(400).json({ error: 'Price must be a number' });
//     }

//     try {
//         await Products.create(data);

//         return res.status(201).json({ success: true, message: 'Product created successfully' });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const add = async (req, res) => {
    console.log(req.files.image);
    try {
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: 'GREENY'
            }
        );
        console.log("RESULT:", result);

        const data = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            phone: req.body.phone,
            contact_type: req.body.contact_type,
            email: req.body.email,
            imageURL: result.secure_url // Update this line to use the secure_url from the Cloudinary response
        };

        if (isNaN(data.price)) {
            return res.status(400).json({ error: 'Price must be a number' });
        }

        await Products.create(data);

        return res.status(201).json({ success: true, message: 'Product created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};


module.exports = {
    add, addIndex
};
