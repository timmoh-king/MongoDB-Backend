const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
mongoose.set("bufferTimeoutMS", 50000);

const api = supertest(app);

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "master DSA C programming language",
    author: "Clickate Academy",
    url: "https://clickateacademy/datastructures",
    likes: 10378,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("a blog can be deleted", async () => {
  await api.delete("/api/blogs/64b8f198cb05e9ddaf678150").expect(204);
}, 1000000);

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 1000000);

afterAll(async () => {
  await mongoose.connection.close();
});
