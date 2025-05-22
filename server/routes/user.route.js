import express from 'express';
import { test, deleteUser, updateUser, getUser, getAllUsers, getUserByUsername, getUserGroups } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.get('/', getAllUsers);
//router.get('/:username', getUserByUsername);
router.get('/:id', getUser);
router.get('/:id/groups', verifyToken, getUserGroups);

export default router;