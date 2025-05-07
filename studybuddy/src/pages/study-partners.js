import React, { useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import StudyPartnerCard from '../components/StudyPartners/StudyPartnerCard';
import FilterBar from '../components/StudyPartners/FilterBar';
import Pagination from '../components/StudyPartners/Pagination';
import styles from '../styles/StudyPartners.module.css';

export default function StudyPartners() {
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data for study partners
    const studyPartners = Array(16).fill().map((_, index) => ({
        id: index + 1,
        name: 'Jane W.',
        courses: ['CS101', 'MATH204'],
        availability: 'Mon, Wed PM'
    }));

    const partnersPerPage = 8;
    const totalPages = Math.ceil(studyPartners.length / partnersPerPage);

    const displayedPartners = studyPartners.slice(
        (currentPage - 1) * partnersPerPage,
        currentPage * partnersPerPage
    );

    return (
        <div className={styles.container}>
            <Head>
                <title>Study Partners | StudyBuddy</title>
                <meta name="description" content="Find study partners for your courses" />
            </Head>

            <NavBar activeLink="Study Partners" />

            <main className={styles.main}>
                <FilterBar />

                <div className={styles.partnersGrid}>
                    {displayedPartners.map(partner => (
                        <StudyPartnerCard key={partner.id} partner={partner} />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </main>
        </div>
    );
}
