import React from 'react';
import styles from '../../styles/StudyPartners.module.css';

export default function StudyPartnerCard({ partner }) {
    return (
        <div className={styles.partnerCard}>
            <div className={styles.profilePic}></div>
            <h3 className={styles.partnerName}>{partner.name}</h3>
            <p className={styles.partnerCourses}>{partner.courses.join(', ')}</p>
            <p className={styles.partnerAvailability}>Available: {partner.availability}</p>
            <button className={styles.connectButton}>Connect</button>
        </div>
    );
}