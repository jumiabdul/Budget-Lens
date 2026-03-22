import User from '../models/userModel.js';

/** Checks if authenticated user has admin role */

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'User account not found'
            });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'You do not have permission to access this resource. Admin access required.'
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                error: 'Account inactive',
                message: 'Your account has been deactivated'
            });
        }

        req.userRole = user.role;
        next();

    } catch (error) {
        console.error('Admin check error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};
