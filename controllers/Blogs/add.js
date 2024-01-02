const Blog = require('../../Models/Blogs');


const IndexPage = (req, res) => {
    res.render('Blogs/Add', { css: 'user-auth.css' });
}


const Add = (req, res) => {
    const image = req.files.image;
    image.mv('./assets/images/uploads/' + image.name);
    Blog.create({
        title: req.body.title,
        context: req.body.context,
        imageURL: image.name
    });
    res.redirect('/Blogs');
}


module.exports = {
    Add, IndexPage
};