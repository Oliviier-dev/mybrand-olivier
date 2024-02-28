import { Request, Response } from 'express';
import Comment from '../models/comments';
import Blog from '../models/blogs';

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        const { name, comment } = req.body;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        //const commentedBlog = await Blog.findById(blogId).populate("comments");

        const newComment = await Comment.create({ name, comment, blog: blogId });

        // Push the new comment directly into the comments array of the blog
        blog.comments.push(newComment);

        await blog.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get comments for a specific blog
export const getCommentsByBlogId = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ blog: blogId });
        if (!comments) {
            return res.status(404).json({ message: "No comments found for this blog" });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
