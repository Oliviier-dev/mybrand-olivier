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



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Log in with email and password to obtain authentication token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for accessing protected endpoints.
 *       400:
 *         description: Bad request. Invalid email or password provided.
 *       401:
 *         description: Unauthorized. Email or password is incorrect.
 *       500:
 *         description: Internal server error. Failed to log in.
 * 
 *       security:
 *       - jwtAuth: []   # Use the defined security scheme "jwtAuth"
 */


router.post(
    "/login",
    schemaValidator("/login"),
    authController.login_post,
    (req: Request, res: Response) => {
      return res.send("Logged in successfully");
    }
);

router.post('/logout', authController.logout);

module.exports = router;