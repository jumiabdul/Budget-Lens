import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { getStatistics, getAllUsers, getUserDetails, deactivateUser, activateUser, deleteUser } from "../controllers/adminController.js"

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Apply admin check to all routes
router.use(isAdmin);

// Get dashboard statistics
router.get('/statistics', getStatistics);

// Get all users 
router.get('/users', getAllUsers);

// Get user details
router.get('/users/:userId/details', getUserDetails);

// Deactivate user
router.put('/users/:userId/deactivate', deactivateUser);

// Activate user
router.put('/users/:userId/activate', activateUser);

// Delete user permanently
router.delete('/users/:userId', deleteUser);

export default router;

