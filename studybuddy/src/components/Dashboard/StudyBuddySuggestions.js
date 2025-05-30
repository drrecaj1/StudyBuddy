// src/components/Dashboard/StudyBuddySuggestions.js

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Dashboard.module.css';

export default function StudyBuddySuggestions() {
    const [buddies, setBuddies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();
    const cardsPerView = 2; // Show 2 cards at a time

    useEffect(() => {
        async function fetchBuddies() {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/buddies');
                const data = await res.json();
                let userId = null;
                if (token) {
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        userId = payload.userId;
                    } catch { /* Handle potential decoding errors */ }
                }
                const filtered = (data.buddies || []).filter(buddy => buddy._id !== userId);
                setBuddies(filtered);
            } catch (err) {
                console.error("Failed to fetch buddies:", err);
                setBuddies([]);
            }
        }
        fetchBuddies();
    }, []);

    const handleConnect = (buddy) => {
        const id = buddy._id || buddy.email;
        router.push(`/messages?partnerId=${id}`);
    };

    const canScrollLeft = currentIndex > 0;
    const canScrollRight = currentIndex < buddies.length - cardsPerView;

    const scrollLeft = () => {
        if (canScrollLeft) {
            setCurrentIndex(currentIndex - cardsPerView);
        }
    };

    const scrollRight = () => {
        if (canScrollRight) {
            setCurrentIndex(currentIndex + cardsPerView);
        }
    };

    // Get the current cards to display
    const getCurrentCards = () => {
        return buddies.slice(currentIndex, currentIndex + cardsPerView);
    };

    const needsNavigation = buddies.length > cardsPerView;

    return (
        <div className={styles.studyTogether}>
            <h2>Study Together</h2>
            <p>Add the suggested study buddies that best match your profile.</p>

            <div className={styles.carouselContainer}>
                <div className={styles.carouselContent}>
                    {buddies.length > 0 ? (
                        getCurrentCards().map((buddy, i) => (
                            <div key={currentIndex + i} className={styles.buddyCard}>
                                <div className={styles.avatar}>
                                    {buddy.fullName ? buddy.fullName.charAt(0).toUpperCase() : '?'}
                                </div>
                                <h3>{buddy.fullName || buddy.name}</h3>
                                <p className={styles.buddyCourses}>
                                    Courses: {Array.isArray(buddy.courses) ? buddy.courses.join(', ') : buddy.courses}
                                </p>
                                <p className={styles.buddyAvailability}>
                                    Available: {buddy.environment}
                                </p>
                                <button className={styles.connectBtn} onClick={() => handleConnect(buddy)}>
                                    Connect
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noBuddiesMessage}>No study buddy suggestions found at the moment.</p>
                    )}
                </div>

                {needsNavigation && (
                    <div className={styles.carouselNavigation}>
                        <button
                            className={`${styles.navButton} ${styles.navLeft}`}
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                        >
                            <span>‹</span>
                        </button>
                        <div className={styles.pageIndicator}>
                            {Math.ceil(buddies.length / cardsPerView) > 1 && (
                                <span>
                                    {Math.floor(currentIndex / cardsPerView) + 1} / {Math.ceil(buddies.length / cardsPerView)}
                                </span>
                            )}
                        </div>
                        <button
                            className={`${styles.navButton} ${styles.navRight}`}
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                        >
                            <span>›</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}