import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';
import Budget from '../models/budgetModel.js';

// Get all users 
export const getAllUsers = async (req, res) => {
    try {
        const filter = {};

        // Filter by role if provided
        if (req.query.role) {
            filter.role = req.query.role;
        }

        // Filter by active status if provided
        if (req.query.isActive !== undefined) {
            filter.isActive = req.query.isActive === 'true';
        }

        const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

        res.json({
            success: true,
            data: {
                users: users,
                total: users.length
            },
            message: 'Users retrieved successfully'
        });

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};

// Deactivate user
export const deactivateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { reason } = req.body;

        //  Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        if (userId === req.userId) {
            return res.status(400).json({
                error: 'Invalid action',
                message: 'You cannot deactivate your own account'
            });
        }

        // Require reason
        if (!reason || !reason.trim()) {
            return res.status(400).json({
                message: "Deactivation reason is required"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: 'Not found',
                message: 'User not found'
            });
        }

        user.isActive = false;
        user.deactivatedAt = new Date();
        user.deactivationReason = reason;

        await user.save();

        console.log(`✓ User deactivated: ${user.email}`);

        res.json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    isActive: user.isActive,
                    deactivatedAt: user.deactivatedAt,
                    deactivationReason: user.deactivationReason
                }
            },
            message: 'User deactivated successfully'
        });

    } catch (error) {
        console.error('Deactivate user error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};

// Activate user
export const activateUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        if (userId === req.userId) {
            return res.status(400).json({
                message: "You cannot modify your own account"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: 'Not found',
                message: 'User not found'
            });
        }

        user.isActive = true;
        user.deactivatedAt = null;
        user.deactivationReason = null;

        await user.save();

        console.log(`✓ User activated: ${user.email}`);

        res.json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    isActive: user.isActive
                }
            },
            message: 'User activated successfully'
        });

    } catch (error) {
        console.error('Activate user error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};

// Delete user permanently
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (userId === req.userId) {
            return res.status(400).json({
                error: 'Invalid action',
                message: 'You cannot delete your own account'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: 'Not found',
                message: 'User not found'
            });
        }

        // Delete all user data
        await Transaction.deleteMany({ userId: userId });
        await Budget.deleteMany({ userId: userId });
        await User.findByIdAndDelete(userId);

        console.log(`✓ User permanently deleted: ${user.email}`);

        res.json({
            success: true,
            data: {
                deletedUserId: userId,
                email: user.email
            },
            message: 'User and all associated data deleted permanently'
        });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};

// Get statistics
export const getStatistics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const inactiveUsers = await User.countDocuments({ isActive: false });
        const adminCount = await User.countDocuments({ role: 'admin' });

        const statistics = {
            users: {
                total: totalUsers,
                active: activeUsers,
                inactive: inactiveUsers,
                admins: adminCount
            },
        };

        res.json({
            success: true,
            data: statistics,
            message: 'Statistics retrieved successfully'
        });

    } catch (error) {
        console.error('Get statistics error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};

// Get user details
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                error: 'Not found',
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: { user },
            message: 'User details retrieved successfully'
        });

    } catch (error) {
        console.error('Get user details error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};

