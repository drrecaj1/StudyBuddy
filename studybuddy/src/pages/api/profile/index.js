import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
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

        const foundUser = await users.findOne(
            { _id: new ObjectId(user.userId) },
            { projection: { password: 0 } } // exclude password from result
        );

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(foundUser);
    } catch (error) {
        console.error('❌ Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}