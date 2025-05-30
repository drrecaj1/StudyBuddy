import clientPromise from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Missing or invalid token' });
    }

    let userData;
    try {
        userData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }

    const client = await clientPromise;
    const db = client.db('studybuddy');
    const userId = userData.userId;

    if (req.method === 'POST') {
        const {
            fullName,
            university,
            year,
            field,
            availability,
            courses,
            interests,
            environment,
        } = req.body;

        // Optional normalization (defensive coding)
        const normalizedAvailability = Array.isArray(availability)
            ? availability
            : typeof availability === 'string'
                ? availability.split(',').map((a) => a.trim())
                : [];

        const normalizedEnvironment = Array.isArray(environment)
            ? environment
            : typeof environment === 'string'
                ? environment.split(',').map((e) => e.trim())
                : [];

        try {
            await db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                {
                    $set: {
                        fullName,
                        university,
                        year,
                        field,
                        availability: normalizedAvailability,
                        courses,
                        interests,
                        environment: normalizedEnvironment,
                        updatedAt: new Date(),
                    },
                },
                { upsert: false }
            );

            return res.status(200).json({ message: 'Profile saved successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error saving profile' });
        }
    }

    if (req.method === 'GET') {
        try {
            const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

            if (!user) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'Error retrieving profile' });
        }
    }

    res.status(405).json({ message: 'Method not allowed' });
}
