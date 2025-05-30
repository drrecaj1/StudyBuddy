import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import ProfileInfo from '../components/Profile/ProfileInfo';
import CurrentCourses from '../components/Profile/CurrentCourses';
import StudyPreferences from '../components/Profile/StudyPreferences';
import MyBuddies from '../components/Profile/MyBuddies';
import styles from '../styles/Profile.module.css';
import { getProfile } from '@/utils/api';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('You must be logged in to view your profile.');
            return;
        }

        getProfile(token)
            .then((user) => {
                setUserData({
                    name: user.fullName || user.name || 'Unknown',
                    university: user.university || '',
                    year: user.year || user.academicYear || '',
                    field: user.field || '',
                    availability: user.availability || '',
                    courses: Array.isArray(user.courses)
                        ? user.courses
                        : (user.courses ? user.courses.split(',').map(c => c.trim()) : []),
                    preferences: {
                        availability: user.availability || '', // ✅ Add this
                        environment: Array.isArray(user.environment) ? user.environment : [],
                        interests: Array.isArray(user.interests)
                            ? user.interests
                            : (typeof user.interests === 'string' ? user.interests.split(',').map(i => i.trim()) : [])
                    }
                });
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load profile');
            });
    }, []);

    if (error) return <p className={styles.error}>{error}</p>;
    if (!userData) return <p className={styles.loading}>Loading profile...</p>;

    return (
        <div className={styles.container}>
            <Head>
                <title>My Profile | StudyBuddy</title>
                <meta name="description" content="Your profile on StudyBuddy" />
            </Head>

            <NavBar activeLink="My Profile" />

            <main className={styles.main}>
                <div className={styles.profileGrid}>
                    {/* Left column with profile info and courses */}
                    <div className={styles.leftColumn}>
                        <ProfileInfo user={userData} />
                        <CurrentCourses courses={userData.courses} />
                    </div>

                    {/* Right column with preferences and buddies */}
                    <div className={styles.rightColumn}>
                        <StudyPreferences preferences={userData.preferences} />
                        <MyBuddies />
                    </div>
                </div>
            </main>
        </div>
    );
}
