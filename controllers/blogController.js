//Model import
const Blog = require('../models/blogModel');

const blog_index = (req, res) => {
  Blog.find().sort({createdAt: -1})
    .then(blogs => {
      res.status(200).render('index', {title: 'All Blogs', blogs});
    })
    .catch(err => {
      res.status(400).render('404', {title: '404', errMsg: 'Some Error Occured!'});
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.status(200).render('details', {blog: result, title: 'Blog Details'})
    })
    .catch(err => res.status(404).render('404', {title: '404', errMsg: 'Blog is unavailable!'}));
}

const blog_create_get = (req, res) => {
  res.status(200).render('blogForm', {title: 'Create Blog', mode: 'create', blogData: {}});
}

const blog_create_post = (req, res) => {
  const newBlog = new Blog(req.body);
  newBlog.save()
    .then(data => res.send({redirect: '/blogs'}))
    .catch(err => res.status(404).render('404', {title: '404', errMsg: 'Can\'t Create blog! Some error occured!'}));
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(data => res.json({ redirect: '/blogs'}))
    .catch(err => res.status(404).render('404', {title: '404', errMsg: 'Blog Deletion Failed!'}));
}

const blog_edit_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(data => {
      res.status(200).render('blogForm', {title: 'Edit Blog', mode: 'edit', blogData: data})
    })
    .catch(err => res.status(404).render('404', {title: '404', errMsg: 'Some error occured!'}));
  
}

const blog_edit_put = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  Blog.findByIdAndUpdate({_id: id}, req.body, (err, data)=>{
    if(err){
      res.status(404).render('404', {title: '404', errMsg: 'Failed to update blog!'})
    }else{
      res.status(200).json({redirect: `/blogs/${data._id}`});
    }
  })
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_edit_get,
  blog_edit_put
}

