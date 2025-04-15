import styles from '@/styles/Dashboard.module.css';

export default function RecentMessages() {
    return (
        <div className={styles.messages}>
            <h3>Recent Messages</h3>
            <div className={styles.messageItem}>
                <div className={styles.messageIcon}>👤</div>
                <div className={styles.messageText}>
                    <p><strong>Study Buddy</strong></p>
                    <p>Welcome to Study Buddy! Enjoy being part of the community.</p>
                </div>
                <span className={styles.timestamp}>10:34</span>
            </div>
        </div>
    );
}
