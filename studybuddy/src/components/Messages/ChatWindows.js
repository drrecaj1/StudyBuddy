// src/components/Messages/ChatWindow.js
import { useState } from 'react';
import styles from '@/styles/Messages.module.css';

export default function ChatWindow({ selectedChat }) {
    const [message, setMessage] = useState('');
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [sentRequest, setSentRequest] = useState(false);

    // Message handling
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    // Schedule handling
    const handleScheduleClick = () => {
        setShowScheduleForm(!showScheduleForm);
    };

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        if (scheduleDate && scheduleTime) {
            console.log('Scheduling session for:', scheduleDate, scheduleTime);
            setShowScheduleForm(false);
            setSentRequest(true);
        }
    };

    const handleAcceptSession = () => {
        console.log('Session accepted');
        setSentRequest(false);
    };

    const handleDeclineSession = () => {
        console.log('Session declined');
        setSentRequest(false);
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        // Format as DD/MM/YYYY
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateString;
    };

    return (
        <div className={styles.chatWindow}>
            {selectedChat ? (
                <>
                    <div className={styles.chatHeader}>
                        <div className={styles.chatAvatar}></div>
                        <h3>{selectedChat.name || 'Study Buddy'}</h3>
                    </div>

                    <div className={styles.chatMessages}>
                        {/* Demo messages for visualization */}
                        <div className={`${styles.messageReceived} ${styles.message}`}>
                            <div className={styles.messageAvatar}></div>
                            <div className={styles.messageContent}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className={`${styles.messageSent} ${styles.message}`}>
                            <div className={styles.messageContent}>
                                <p>Lorem ipsum dolor sit amet?</p>
                            </div>
                            <div className={styles.messageAvatar} style={{ marginLeft: "10px", marginRight: "0" }}></div>
                        </div>

                        <div className={`${styles.messageReceived} ${styles.message}`}>
                            <div className={styles.messageAvatar}></div>
                            <div className={styles.messageContent}>
                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>

                        {/* Schedule form - Only show when triggered by + button */}
                        {showScheduleForm && (
                            <div className={`${styles.messageSent} ${styles.message}`}>
                                <div className={styles.scheduleForm}>
                                    <h4>Schedule a session</h4>
                                    <div className={styles.formGroup}>
                                        <label>
                                            <span>Date:</span>
                                            <input
                                                type="date"
                                                value={scheduleDate}
                                                onChange={(e) => setScheduleDate(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>
                                            <span>Time:</span>
                                            <input
                                                type="time"
                                                value={scheduleTime}
                                                onChange={(e) => setScheduleTime(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <button
                                        className={styles.sendButton}
                                        onClick={handleScheduleSubmit}
                                    >
                                        SEND
                                    </button>
                                </div>
                                <div className={styles.messageAvatar}></div>
                            </div>
                        )}

                        {/* Session request confirmation */}
                        {sentRequest && (
                            <div className={`${styles.messageReceived} ${styles.message}`}>
                                <div className={styles.messageAvatar}></div>
                                <div className={styles.sessionRequest}>
                                    <h4>Session Request</h4>
                                    <div className={styles.sessionDetails}>
                                        <div className={styles.detail}>
                                            <span>Date:</span> {formatDate(scheduleDate)}
                                        </div>
                                        <div className={styles.detail}>
                                            <span>Time:</span> {scheduleTime}
                                        </div>
                                    </div>
                                    <div className={styles.sessionActions}>
                                        <button
                                            className={styles.acceptButton}
                                            onClick={handleAcceptSession}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className={styles.declineButton}
                                            onClick={handleDeclineSession}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Message input */}
                    <form className={styles.messageForm} onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message..."
                        />
                        <button
                            type="button"
                            className={styles.sendIcon}
                            onClick={handleScheduleClick}
                        >
                            +
                        </button>
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