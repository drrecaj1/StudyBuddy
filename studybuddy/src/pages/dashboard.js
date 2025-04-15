
import DashboardStats from "@/components/Dashboard/DashboardStats";
import StudyBuddySuggestions from "@/components/Dashboard/StudyBuddySuggestions";
import CurrentCourses from "@/components/Dashboard/CurrentCourses";
import UpcomingSessions from "@/components/Dashboard/UpcomingSessions";
import RecentMessages from "@/components/Dashboard/RecentMessages";
import styles from '@/styles/Dashboard.module.css';
import Link from 'next/link';



export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <ul>
                        <li className={styles.active}>Home</li>
                        <li>Study Partners</li>
                        <li>
                            <Link href="/messages" className={styles.navLink}>
                                My Messages
                            </Link><
                        /li>
                        <li>Calendar</li>
                    </ul>
                </nav>
                <div className={styles.profile}>
                    <span>My Profile</span>
                    <span className={styles.gear}>⚙️</span>
                </div>
            </header>

            <main className={styles.mainContent}>
                <DashboardStats />
                <div className={styles.studySection}>
                    <StudyBuddySuggestions />
                    <RecentMessages />
                </div>
                <div className={styles.bottomSection}>
                    <CurrentCourses />
                    <UpcomingSessions />
                </div>
            </main>
        </div>
    );
}
