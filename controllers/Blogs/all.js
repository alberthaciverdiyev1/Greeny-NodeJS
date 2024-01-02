const Blog = require('../../Models/Blogs');



const indexPage = (req, res) => {
    Blog.find({}).sort({$natural: -1})
    .then((blogs) => {
      blogs.forEach(blog => {
        const date = new Date(blog.createdAt);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options).toUpperCase();
        blog.date = formattedDate;
      });
      res.render('Blogs/index', { blogs: blogs });
    })
}
const Details = (req, res) => {
    Blog.findById(req.params.id)
    .then((x) => {
      const date = new Date(x.createdAt);
      const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const formattedDate = date.toLocaleString('en-US', options).toUpperCase();
      x.date = formattedDate;
      res.render('Blogs/details', { css: 'blog-details', details: x });
    })
}
module.exports = {
    indexPage,Details
  };