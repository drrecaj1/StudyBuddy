// src/components/Messages/ChatWindow.js
import { useState } from 'react';
import styles from '@/styles/Messages.module.css';

export default function ChatWindow({ selectedChat }) {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    return (
        <div className={styles.chatWindow}>
            {selectedChat ? (
                <>
                    <div className={styles.chatHeader}>
                        <div className={styles.chatAvatar}></div>
                        <h3>Study Buddy</h3>
                    </div>
                    <div className={styles.chatMessages}>
                        {/* Chat messages would go here */}
                        <div className={styles.message}>
                            <p>This is where the chat messages will appear.</p>
                        </div>
                    </div>
                    <form className={styles.messageForm} onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </>
            ) : (
                <div className={styles.emptyChatState}>
                    <h2>Your messages</h2>
                    <p>Click on a chat to start messaging.</p>
                </div>
            )}
        </div>
    );
}