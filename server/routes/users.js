import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/users.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

/*Read user */
router.get("/:id", checkAuth, getUser);
router.get("/:id/friends", checkAuth, getUserFriends);

/*Update user */
router.patch("/:id/:friendId", checkAuth, addRemoveFriends);

export default router;
