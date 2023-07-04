import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

/*Read */
router.get("/", checkAuth, getFeedPosts);
router.get("/:userId/posts", checkAuth, getUserPosts);

/*Update */
router.patch("/:id/like", checkAuth, likePost);

export default router;
