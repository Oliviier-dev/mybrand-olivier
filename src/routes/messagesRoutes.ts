import express, { Request, Response, NextFunction } from 'express';
import Message from '../models/usermessages';
const { requireAuth, isAdmin } = require('../middleware/authmiddleware')

const router = express.Router();

// Get a list of messages from the db
router.get('/usermessages', requireAuth , isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await Message.find({});
        res.send(messages);
    } catch (err) {
        next(err);
    }
});

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
        // Return a 401 Unauthorized response if authentication fails
        res.status(401).json({ error: 'Unauthorized: Please log in.' });
});

// Add a new message to the db
router.post('/contactme', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await Message.create(req.body);
        res.send(messages);
    } catch (err) {
        next(err);
    }
});

// Delete a message from the db
router.delete('/usermessages/:id', requireAuth, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete({ _id: req.params.id });
        res.send(deletedMessage);
    } catch (err) {
        next(err);
    }
});

export default router;