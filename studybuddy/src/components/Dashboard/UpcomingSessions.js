import styles from '@/styles/Dashboard.module.css';


export default function UpcomingSessions() {
    return (
        <div className={styles.sessions}>
            <h3>Upcoming Study Sessions</h3>
            <div className={styles.noSessions}>No upcoming sessions.</div>
            <button>Schedule a session</button>
        </div>
    );
}
