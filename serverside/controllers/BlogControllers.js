const BlogModel = require("../models/BlogModel");

module.exports.getBlogs = async (req, res) => {
  const blogs = await BlogModel.find();
  res.send(blogs);
};

module.exports.saveBlog = (req, res) => {
  const { blog, title, author } = req.body;

  BlogModel.create({ blog, title, author })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateBlog = (req, res) => {
  const { id } = req.params;
  const { blog, title, author } = req.body;

  BlogModel.findByIdAndUpdate(id, { blog, title, author })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteBlog = (req, res) => {
  const { id } = req.params;

  BlogModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
