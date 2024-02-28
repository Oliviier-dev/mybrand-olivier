import express from 'express';
import { createComment, getCommentsByBlogId } from '../controllers/commentController';

const router = express.Router();

// CREATE COMMENT
router.post("/blogs/:blogId/comments", createComment);

// LIST COMMENTS
router.get("/blogs/:blogId/comments", getCommentsByBlogId);

export default router;