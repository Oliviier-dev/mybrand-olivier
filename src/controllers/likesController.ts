import { Request, Response } from 'express';
import { Like } from '../models/likes';
import Blog from '../models/blogs';
const jwt = require('jsonwebtoken');
import dotenv from "dotenv";


// CONFIGURE DOTENV
dotenv.config();

export const likeBlog = async (req:Request, res:Response) => {

    try {
        const { blogId } = req.params;
        const token = req.cookies.jwt;
    
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, Please Log in" });
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('Decoded Token:', decodedToken);
        const userId = decodedToken.id;
    
        const blog = await Blog.findById(blogId);
    
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
    
        // Check if the user has already liked the blog
        const existingLike = await Like.findOne({ blogId, userId });
    
        if (existingLike) {
            // If user has already liked the blog, remove the like
            await existingLike.deleteOne({ _id: existingLike._id });
    
            // Remove the like from the blog's likes array
            blog.likes = blog.likes.filter(like => like.toString() !== existingLike._id.toString());
            
            await blog.save();
    
            return res.status(200).json({ message: "Blog unliked successfully" });
        } else {
            // If user has not liked the blog yet, create a new like
            const newLike = await Like.create({ blogId, userId });
    
            // Push the new like directly into the likes array of the blog
            blog.likes.push(newLike._id);
    
            await blog.save();
    
            return res.status(200).json({ message: "Blog liked successfully" });
        }
        
    } catch (error:any) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error("Error liking blog:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}