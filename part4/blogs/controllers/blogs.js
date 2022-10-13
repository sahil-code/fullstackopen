const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;

  const blog = new Blog({
    ...request.body,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const blogToReturn = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(201).json(blogToReturn);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blogDeleted = await Blog.findById(request.params.id);

    if (user._id.toString() != blogDeleted.user.toString()) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { comments: [request.body.comment, ...blog.comments] },
    { new: true }
  ).populate("user", { username: 1, name: 1 });
  response.status(200).json(updatedBlog);
});

blogsRouter.put("/:id/like", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const likedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: blog.likes + 1 },
    { new: true }
  ).populate("user", { username: 1, name: 1 });
  response.status(200).json(likedBlog);

});

module.exports = blogsRouter;
