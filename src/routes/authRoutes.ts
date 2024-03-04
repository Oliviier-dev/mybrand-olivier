import { Router, Request, Response } from "express";
const authController = require('../controllers/authController');
import schemaValidator from "../middleware/schemaValidator";

const router = Router();

// router.get('/signup', authController.signup_get);
// router.post('/signup', authController.signup_post);
// router.get('/login', authController.login_get);
// router.post('/login', authController.login_post);
// router.post('/logout', authController.logout);

router.post(
    "/signup",
    schemaValidator("/signup"),
    authController.signup_post,
    (req: Request, res: Response) => {
      return res.send("Sign up complete");
    }
);

router.post(
    "/login",
    schemaValidator("/signup"),
    authController.login_post,
    (req: Request, res: Response) => {
      return res.send("Logged in successfully");
    }
);

router.post('/logout', authController.logout);

module.exports = router;