// components/Dashboard/CurrentCourses.js
import styles from '@/styles/Dashboard.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CurrentCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        async function fetchCourses() {
            try {
                const res = await fetch('/api/dashboard/courses', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                console.log('📦 Dashboard courses response:', data.courses);
                if (res.ok && data.courses) {
                    setCourses(data.courses);
                }
            } catch (err) {
                console.error('Failed to fetch courses:', err);
            }
        }

        fetchCourses();
    }, []);

    return (
        <div className={styles.courses}>
            <h3>Your Current Courses</h3>
            <ul className={styles.courseList}>
                {courses.length === 0 ? (
                    <li className={styles.courseItem}>No courses selected</li>
                ) : (
                    courses.map((course, i) => (
                        <li key={i} className={styles.courseItem}>
                            <span className={styles.courseTitle}>{course}</span>
                            <span className={styles.buddyCount}>Potential buddies TBD</span>
                        </li>
                    ))
                )}
            </ul>
            <button className={styles.viewAllBtn}>
                <Link href="/profile" className={styles.linkInsideButton}>View All</Link>
            </button>
        </div>
    );
}