import express from "express";
import {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    changePassword
} from "../controllers/Users.js"

import { verifyUser , adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly,getUsersById);
router.post('/users',createUsers);
router.patch('/users/:id', verifyUser, adminOnly,updateUsers);
router.delete('/users/:id', verifyUser, adminOnly,deleteUsers);
router.patch('/change-password/:id', verifyUser, changePassword);

export default router;