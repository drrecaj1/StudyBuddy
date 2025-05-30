// pages/api/messages/history.js
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Missing token' });

    let currentUser;
    try {
        currentUser = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }

    const client = await clientPromise;
    const db = client.db('studybuddy');
    const userId = currentUser.userId;

    const messages = await db.collection('messages')
        .find({
            $or: [
                { senderId: userId },
                { recipientId: userId }
            ]
        })
        .sort({ createdAt: -1 })
        .toArray();

    const chatMap = new Map();

    for (const msg of messages) {
        const partnerId = msg.senderId === userId ? msg.recipientId : msg.senderId;

        if (!chatMap.has(partnerId)) {
            chatMap.set(partnerId, {
                id: partnerId,
                message: msg.text,
                timestamp: msg.createdAt.toISOString()
            });
        }
    }

    const chats = await Promise.all(
        Array.from(chatMap.entries()).map(async ([partnerId, info]) => {
            let partnerName = partnerId;
            try {
                const user = await db.collection('users').findOne({ _id: new ObjectId(partnerId) });

                if (user?.fullName || user?.name) {
                    partnerName = user.fullName || user.name;
                }
            } catch (err) {
                console.error(`❌ Failed to fetch user ${partnerId}:`, err);
            }

            return {
                id: partnerId,
                sender: partnerName,
                message: info.message,
                timestamp: info.timestamp,
                unread: false
            };
        })
    );

    res.status(200).json({ chats });
}