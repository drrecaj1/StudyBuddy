import styles from '@/styles/Dashboard.module.css';

export default function StudyBuddySuggestions() {
    const buddies = [
        { name: "Jane W.", courses: "CS101, MATH204", availability: "Mon, Wed PM" },
        { name: "Arya S.", courses: "CS101, PHYS203", availability: "Tue, Thu AM" },
        { name: "Lisa G.", courses: "MATH204, HIST101", availability: "Weekends" },
    ];

    return (
        <div className={styles.studyTogether}>
            <h2>Study Together</h2>
            <p>Add the suggested study buddies that best match your profile.</p>
            <div className={styles.buddyCards}>
                {buddies.map((buddy, i) => (
                    <div key={i} className={styles.buddyCard}>
                        <div className={styles.avatar}></div>
                        <h3>{buddy.name}</h3>
                        <p>{buddy.courses}</p>
                        <p>Available: {buddy.availability}</p>
                        <button>Connect</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
