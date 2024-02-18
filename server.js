const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Post model
const Post = mongoose.model('Post', {
  title: String,
  content: String,
});

// Routes
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.json(post);
});

app.get('/api/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
