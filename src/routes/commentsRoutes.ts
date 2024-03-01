import express from 'express';
import { createComment, getCommentsByBlogId } from '../controllers/commentController';
import { likeBlog } from '../controllers/likesController';
const { requireAuth, isAdmin } = require('../middleware/authmiddleware')

const router = express.Router();

// CREATE COMMENT
router.post("/blogs/:blogId/comments", createComment);

// LIST COMMENTS
router.get("/blogs/:blogId/comments", requireAuth, isAdmin, getCommentsByBlogId);


//liking a blog
router.post("/blogs/:blogId/like", likeBlog);


export default router;