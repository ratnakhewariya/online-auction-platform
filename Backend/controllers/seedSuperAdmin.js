// Import necessary modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Import the SuperAdmin model (adjust the path if needed)
import userSchema from '../models/userSchema.js';

// Function to seed the Super Admin user
async function seedSuperAdmin() {
    try {
        // Retrieve the database URI from the environment variables
        const dbURI = process.env.DATABASE_URI;

        if (!dbURI) {
            throw new Error('DATABASE_URI is not defined in your .env file');
        }

        // Connect to MongoDB
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Check if a Super Admin already exists
        const existingAdmin = await userSchema.findOne({ role: 'superadmin' });
        if (existingAdmin) {
            console.log('Super Admin already exists');
        } else {
            // Create a new Super Admin user
            const superAdmin = new SuperAdmin({
                username: 'superadmin', // Set your desired username
                password: 'yourpassword', // Replace with a hashed password
                role: 'superadmin', // Ensure the role matches your application logic
            });

            // Save the Super Admin to the database
            await superAdmin.save();
            console.log('Super Admin created successfully');
        }

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error creating Super Admin:', error);

        // Disconnect from MongoDB in case of error
        mongoose.disconnect();
    }
}

// Run the seeding function
seedSuperAdmin();
