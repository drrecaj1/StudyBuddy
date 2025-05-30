import React, { useState } from 'react';
import styles from '../../styles/Profile.module.css';
import { saveProfile } from '../../utils/api';

export default function CurrentCourses({ courses = [] }) {
    const [editing, setEditing] = useState(false);
    const [courseInput, setCourseInput] = useState(courses.join(', '));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');

            const cleanedCourses = courseInput
                .split(',')
                .map((c) => c.trim())
                .filter((c) => c !== '');

            await saveProfile({ courses: cleanedCourses }, token);

            window.location.reload();
        } catch (err) {
            setError('Failed to update courses.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.sectionCard}>
            <h3>Current Courses</h3>

            {editing ? (
                <>
          <textarea
              className={styles.textarea}
              value={courseInput}
              onChange={(e) => setCourseInput(e.target.value)}
              placeholder="Enter courses separated by commas"
          />
                    {error && <p style={{ color: 'crimson' }}>{error}</p>}
                    <div style={{ marginTop: 10 }}>
                        <button className={styles.editButton} onClick={handleSave} disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button className={styles.editButton} onClick={() => setEditing(false)} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.coursesList}>
                        {courses.length > 0 ? (
                            courses.map((course, index) => (
                                <div key={index} className={styles.courseTag}>
                                    {course}
                                </div>
                            ))
                        ) : (
                            <p>No courses selected</p>
                        )}
                    </div>
                    <div className={styles.addMore} onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
                        <span>+</span> Add more courses
                    </div>
                </>
            )}
        </div>
    );
}