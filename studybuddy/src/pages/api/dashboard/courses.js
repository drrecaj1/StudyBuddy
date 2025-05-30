import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const client = await clientPromise;
        const db = client.db('studybuddy');
        const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });

        if (!user) return res.status(404).json({ message: 'User not found' });

        let courses = [];

        if (Array.isArray(user.courses)) {
            courses = user.courses;
        } else if (typeof user.courses === 'string') {
            courses = user.courses.split(',').map(c => c.trim());
        }

        return res.status(200).json({ courses });
    } catch (err) {
        console.error('Dashboard API error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}