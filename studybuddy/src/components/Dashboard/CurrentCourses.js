import styles from '@/styles/Dashboard.module.css';

export default function CurrentCourses() {
    const courses = [
        { name: "CS101 - Intro to Programming", buddies: 8 },
        { name: "MATH204 - Calculus II", buddies: 6 },
        { name: "HIST101 - World History", buddies: 4 },
    ];

    return (
        <div className={styles.courses}>
            <h3>Your Current Courses</h3>
            <ul>
                {courses.map((course, i) => (
                    <li key={i}>
                        <span>{course.name}</span>
                        <span>{course.buddies} potential buddies</span>
                    </li>
                ))}
            </ul>
            <button>View all</button>
        </div>
    );
}
