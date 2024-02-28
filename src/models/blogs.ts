import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Create and export Blog model
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;