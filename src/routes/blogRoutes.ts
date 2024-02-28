import express, { Request, Response, NextFunction } from 'express';
import Blog from '../models/blogs';

const router = express.Router();

// Get a list of blogs from the db
router.get('/blogs', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await Blog.find({});
        res.send(blogs);
    } catch (err) {
        next(err);
    }
});

// Add a new blog to the db
router.post('/createnew', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await Blog.create(req.body);
        res.send(blog);
    } catch (err) {
        next(err);
    }
});

// Update a blog in the db
router.put('/blogs/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Blog.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const updatedBlog = await Blog.findOne({ _id: req.params.id });
        res.send(updatedBlog);
    } catch (err) {
        next(err);
    }
});

// Delete a blog from the db
router.delete('/blogs/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete({ _id: req.params.id });
        res.send(deletedBlog);
    } catch (err) {
        next(err);
    }
});

export default router;