import styles from '@/styles/Dashboard.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function RecentMessages() {
    const [recentMessages, setRecentMessages] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchRecent() {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('/api/messages/history', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    // Only show latest 3
                    setRecentMessages(data.chats.slice(0, 3));
                } else {
                    console.error('Failed to load recent messages:', data.message);
                }
            } catch (err) {
                console.error('Network error:', err);
            }
        }

        fetchRecent();
    }, []);

    const openChat = (id) => {
        router.push(`/messages?partnerId=${id}`);
    };

    return (
        <div className={styles.messages}>
            <h3>Recent Messages</h3>
            {recentMessages.length === 0 ? (
                <p className={styles.messageText}>No recent messages.</p>
            ) : (
                recentMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className={styles.messageItem}
                        onClick={() => openChat(msg.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.messageIcon}>
                            <span>👤</span>
                        </div>
                        <div className={styles.messageContent}>
                            <div className={styles.messageHeader}>
                                <span className={styles.messageSender}>{msg.sender}</span>
                                <span className={styles.timestamp}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <p className={styles.messageText}>
                                {msg.message.length > 40
                                    ? msg.message.slice(0, 40) + '...'
                                    : msg.message}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}