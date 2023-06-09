import express from "express";
import {
    getTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTaskByDate
} from "../controllers/Task.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/task', verifyUser, getTask);
router.get('/task/:id', verifyUser, getTaskById);
router.get('/taskdate',  verifyUser, getTaskByDate);
router.post('/task', verifyUser, createTask);
router.patch('/task/:id', verifyUser, updateTask);
router.delete('/task/:id', verifyUser, deleteTask);



export default router;