import React, { useState } from 'react';
import styles from '@/styles/Terms.module.css'; // Import the CSS module


export default function TermsAndConditionsPopup({ onAccept, onClose }) {

    const handleAcceptTerms = () => {
        if (onAccept) {
            onAccept();
        }
    };

    const handleClosePopup = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupBox}>
                <h2 className={styles.popupTitle}>
                    Study Buddy Terms & Conditions
                </h2>

                <div className={styles.termsContent}>
                    <p className={styles.termsParagraph}>
                        Welcome to Study Buddy! By accessing or using our application, you agree to be bound by these Terms and Conditions. Please read them carefully. If you do not agree to all the terms and conditions of this agreement, then you may not access the application or use any services.
                    </p>

                    <h3 className={styles.termsHeading}>1. Acceptance of Terms</h3>
                    <p className={styles.termsParagraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <h3 className={styles.termsHeading}>2. User Accounts</h3>
                    <p className={styles.termsParagraph}>
                        Nunc auctor, libero eu tincidunt tristique, purus nisi facilisis mi, vel facilisis nisi nisl vel nulla. Suspendisse potenti. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </p>

                    <h3 className={styles.termsHeading}>3. Content and Conduct</h3>
                    <p className={styles.termsParagraph}>
                        Curabitur eu massa in arcu consectetur ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eu mi in metus interdum scelerisque. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper et, sagittis quis, lorem. In dapibus augue non sapien.
                    </p>

                    <h3 className={styles.termsHeading}>4. Privacy Policy</h3>
                    <p className={styles.termsParagraph}>
                        Phasellus et nisl. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non est. Proin interdum mauris non ligula eu ante. Sed in lacus ut enim adipiscing aliquet. Nulla venenatis. In pede mi, aliquet sit amet, euismod in, auctor non, nunc.
                    </p>

                    <h3 className={styles.termsHeading}>5. Termination</h3>
                    <p className={styles.termsParagraph}>
                        Donec hendrerit. Phasellus at dolor in magna luctus pharetra. Proin in tellus sit amet nibh volutpat dictum. Integer ac leo. Sed tristique felis et metus. Donec non enim. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed ut massa eu lacus convallis varius.
                    </p>

                    <h3 className={styles.termsHeading}>6. Changes to Terms</h3>
                    <p className={styles.termsParagraph}>
                        Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac felis sit amet ligula pharetra condimentum. Nulla facilisi. Sed non arcu non odio egestas tristique. Nulla facilisi. Proin interdum mauris non ligula eu ante. Sed in lacus ut enim adipiscing aliquet. Nulla venenatis. In pede mi, aliquet sit amet, euismod in, auctor non, nunc.
                    </p>

                    <h3 className={styles.termsHeading}>7. Governing Law</h3>
                    <p className={styles.termsParagraph}>
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec non enim. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed ut massa eu lacus convallis varius.
                    </p>
                </div>

                <button
                    onClick={handleAcceptTerms}
                    className={styles.acceptButton}
                >
                    I Accept the Terms & Conditions
                </button>

                <button
                    onClick={handleClosePopup}
                    className={`${styles.reviewTermsButton} mt-4`} /* Re-use a button style, adjust margin */
                >
                    Close (Do not accept)
                </button>
            </div>
        </div>
    );
}
