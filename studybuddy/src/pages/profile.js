import React from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import ProfileInfo from '../components/Profile/ProfileInfo';
import CurrentCourses from '../components/Profile/CurrentCourses';
import StudyPreferences from '../components/Profile/StudyPreferences';
import MyBuddies from '../components/Profile/MyBuddies';
import styles from '../styles/Profile.module.css';

export default function Profile() {
    // Mock user data
    const userData = {
        name: 'Sarah Williamson',
        university: 'Prague City University',
        year: 'Sophomore',
        courses: [
            'MATH204 Calculus II',
            'CS101 Intro to Programming',
            'HIST101 World History'
        ],
        preferences: {
            environment: {
                onCampus: true,
                online: false,
                groupSetting: true,
                oneOnOne: false
            },
            interests: ['Computer Science', 'Mathematics', 'Physics', 'History']
        }
    };

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