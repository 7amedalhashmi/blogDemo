const { Router } = require("express");

const { getBlogs, saveBlog, updateBlog, deleteBlog } = require("../controllers/BlogControllers")

const router = Router();

router.get("/get", getBlogs);
router.post("/save", saveBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;