import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Missing token' });

    let user;
    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }

    try {
        const client = await clientPromise;
        const db = client.db('studybuddy');
        const users = db.collection('users');

        // Only include valid fields in update
        const updateFields = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (
                value !== undefined &&
                value !== null &&
                !(typeof value === 'string' && value.trim() === '')
            ) {
                // Ensure environment and availability are always arrays
                if (key === 'environment' || key === 'availability') {
                    if (Array.isArray(value)) {
                        updateFields[key] = value;
                    } else if (typeof value === 'string') {
                        // Convert single string to array
                        updateFields[key] = [value];
                    }
                } else {
                    updateFields[key] = value;
                }
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No valid fields to update' });
        }

        await users.updateOne(
            { _id: new ObjectId(user.userId) },
            { $set: updateFields }
        );

        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('❌ Update error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}