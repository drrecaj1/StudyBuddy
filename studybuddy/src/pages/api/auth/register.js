import clientPromise from '../../../lib/mongodb';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {
        fullName,
        email,
        password,
        university,
        field,
        year,
        courses,
        interests,
        environment,
        availability,
        termsAccepted,
    } = req.body;


    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Password validation
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must include at least one uppercase letter.' });
    }

    if (!/[0-9]/.test(password)) {
        return res.status(400).json({ message: 'Password must include at least one number.' });
    }

    // Terms and Conditions acceptance validation
    if (typeof termsAccepted !== 'boolean' || !termsAccepted) {
        return res.status(400).json({ message: 'Terms and conditions must be accepted.' });
    }
    // --- End of Validation ---

    try {
        const client = await clientPromise;
        const db = client.db('studybuddy');

        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            // Changed status to 409 Conflict as it's more semantically correct for existing resources
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Hash password with 12 salt rounds (standard practice)
        const hashedPassword = await hash(password, 12);


        const processedCourses = Array.isArray(courses)
            ? courses
            : typeof courses === 'string' && courses.trim() !== ''
                ? courses.split(',').map(c => c.trim())
                : [];

        const processedInterests = Array.isArray(interests)
            ? interests
            : typeof interests === 'string' && interests.trim() !== ''
                ? interests.split(',').map(i => i.trim())
                : [];


        const processedEnvironment = Array.isArray(environment)
            ? environment
            : typeof environment === 'string' && environment.trim() !== ''
                ? [environment.trim()] // Wrap single string in an array
                : []; // If not a string or empty, default to empty array

        const processedAvailability = Array.isArray(availability)
            ? availability
            : typeof availability === 'string' && availability.trim() !== ''
                ? [availability.trim()] // Wrap single string in an array
                : [];

        // Store all registration fields in the user document
        const result = await db.collection('users').insertOne({
            fullName,
            email,
            password: hashedPassword,
            university: university || '',
            field: field || '',
            year: year || '',
            courses: processedCourses,
            interests: processedInterests,
            environment: processedEnvironment, // This is where the error was pointing
            availability: processedAvailability,
            termsAccepted,
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}