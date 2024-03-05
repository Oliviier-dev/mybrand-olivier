import express, { Request, Response, NextFunction } from 'express';
import Blog from '../models/blogs';
const { requireAuth, isAdmin } = require('../middleware/authmiddleware');
import schemaValidator from "../middleware/schemaValidator";

const router = express.Router();

/**
 * @swagger
 * /api/blog/blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs.
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the blog.
 *                   title:
 *                     type: string
 *                     description: The title of the blog.
 *                   snippet:
 *                     type: string
 *                     description: A short snippet or summary of the blog.
 *                   category:
 *                     type: string
 *                     description: The category of the blog.
 *                   imageUrl:
 *                     type: string
 *                     description: The URL of the image associated with the blog.
 *                   author:
 *                     type: string
 *                     description: The author of the blog.
 *                   body:
 *                     type: string
 *                     description: The main content or body of the blog.
 *                   likes:
 *                     type: array
 *                     description: An array of user IDs who liked the blog.
 *                     items:
 *                       type: string
 *                   comments:
 *                     type: array
 *                     description: An array of comment IDs associated with the blog.
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the blog was created.
 */

// Get a list of blogs from the db
router.get('/blogs', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await Blog.find({}).populate("comments");
        res.send(blogs);
    } catch (err) {
        next(err);
    }
});


//get a single blog
router.get('/blogs/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        //console.log(req.params);
        const blog = await Blog.findById(req.params.id).populate("comments");
        res.send(blog);
    } catch (err) {
        next(err);
    }
});

// Add a new blog to the db
router.post('/createnew', schemaValidator("/blog/createnew"), requireAuth, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await Blog.create(req.body);
        res.send(blog);
    } catch (err) {
        console.error('Error creating blog:', err);
        next(err);
    }
});




/**
 * @swagger
 * /api/blog/createnew:
 *   post:
 *     summary: Create a new blog
 *     description: Create a new blog post and add it to the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog.
 *               snippet:
 *                 type: string
 *                 description: A short snippet or summary of the blog.
 *               category:
 *                 type: string
 *                 description: The category of the blog.
 *               imageUrl:
 *                 type: string
 *                 description: The URL of the image associated with the blog.
 *               author:
 *                 type: string
 *                 description: The author of the blog.
 *               body:
 *                 type: string
 *                 description: The main content or body of the blog.
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the blog.
 *                 title:
 *                   type: string
 *                   description: The title of the blog.
 *                 snippet:
 *                   type: string
 *                   description: A short snippet or summary of the blog.
 *                 category:
 *                   type: string
 *                   description: The category of the blog.
 *                 imageUrl:
 *                   type: string
 *                   description: The URL of the image associated with the blog.
 *                 author:
 *                   type: string
 *                   description: The author of the blog.
 *                 body:
 *                   type: string
 *                   description: The main content or body of the blog.
 *                 likes:
 *                   type: array
 *                   description: An array of user IDs who liked the blog.
 *                   items:
 *                     type: string
 *                 comments:
 *                   type: array
 *                   description: An array of comment IDs associated with the blog.
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the blog was created.
 *       400:
 *         description: Bad request. Invalid data provided.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       403:
 *         description: Forbidden. User is not authorized to create a blog.
 *       500:
 *         description: Internal server error. Failed to create the blog.
 */



// Update a blog in the db
router.put('/blogs/:id', requireAuth, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Blog.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const updatedBlog = await Blog.findOne({ _id: req.params.id });
        res.send(updatedBlog);
    } catch (err) {
        next(err);
    }
});

// Delete a blog from the db
router.delete('/blogs/:id', requireAuth, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete({ _id: req.params.id });
        res.send(deletedBlog);
    } catch (err) {
        next(err);
    }
});

export default router;