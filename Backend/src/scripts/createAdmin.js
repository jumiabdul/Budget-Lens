import mongoose from 'mongoose';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
    try {
        // Connect to Database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');

        // Check if admin exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log(' Admin already exists!');
            console.log(`Email: ${adminExists.email}`);
            process.exit(0);
        }

        // Create admin user
        const admin = new User({
            name: 'Admin',
            email: 'admin@budgetlens.com',
            password: 'AdminPassword123!',
            role: 'admin',
            isActive: true
        });

        await admin.save();
        console.log('✓ Admin user created successfully!');
        console.log(`Email: ${admin.email}`);
        console.log(`Password: AdminPassword123! (Change this immediately!)`);
        console.log('\n⚠️ IMPORTANT: Change the admin password after first login!');

        process.exit(0);

    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();

