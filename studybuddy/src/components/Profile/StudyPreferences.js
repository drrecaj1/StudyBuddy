import React, { useState } from 'react';
import styles from '../../styles/Profile.module.css';
import { saveProfile } from '../../utils/api';

export default function StudyPreferences({ preferences }) {
    const [editingEnv, setEditingEnv] = useState(false);
    const [editingAvail, setEditingAvail] = useState(false);

    const [availability, setAvailability] = useState(
        Array.isArray(preferences.availability)
            ? preferences.availability
            : typeof preferences.availability === 'string'
                ? preferences.availability.split(',').map(s => s.trim()).filter(Boolean)
                : []
    );

    const [environment, setEnvironment] = useState(
        Array.isArray(preferences.environment)
            ? preferences.environment
            : []
    );

    const [interests, setInterests] = useState(Array.isArray(preferences?.interests) ? preferences.interests : []);
    const [showInterestInput, setShowInterestInput] = useState(false);
    const [newInterest, setNewInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSaveAvailability = async () => {
        setLoading(true);
        try {
            await saveProfile({ availability }, localStorage.getItem('token'));
            window.location.reload();
        } catch {
            setError('Failed to update availability');
        } finally {
            setLoading(false);
            setEditingAvail(false);
        }
    };

    const handleSaveEnvironment = async () => {
        setLoading(true);
        try {
            await saveProfile({ environment }, localStorage.getItem('token'));
            window.location.reload();
        } catch {
            setError('Failed to update environment');
        } finally {
            setLoading(false);
            setEditingEnv(false);
        }
    };

    const handleAddInterest = async () => {
        if (!newInterest.trim()) return;
        setLoading(true);
        try {
            const updated = [...interests, newInterest.trim()];
            await saveProfile({ interests: updated }, localStorage.getItem('token'));
            window.location.reload();
        } catch {
            setError('Failed to update interests');
        } finally {
            setLoading(false);
            setNewInterest('');
            setShowInterestInput(false);
        }
    };

    return (
        <div className={styles.sectionCard}>
            <h2>Study Preferences</h2>
            <div className={styles.preferencesGrid}>

                {/* Availability */}
                <div className={styles.preferenceSection}>
                    <h3>Study Availability</h3>
                    {['Morning', 'Afternoon', 'Evening'].map((slot) => (
                        <div key={slot} className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                id={slot}
                                checked={availability.includes(slot)}
                                disabled={!editingAvail}
                                onChange={(e) => {
                                    const updated = e.target.checked
                                        ? [...availability, slot]
                                        : availability.filter((a) => a !== slot);
                                    setAvailability(updated);
                                }}
                            />
                            <label htmlFor={slot}>{slot}</label>
                        </div>
                    ))}
                    {editingAvail ? (
                        <>
                            <button className={styles.editButton} onClick={handleSaveAvailability}>Save</button>
                            <button className={styles.editButton} onClick={() => setEditingAvail(false)}>Cancel</button>
                        </>
                    ) : (
                        <button className={styles.editButton} onClick={() => setEditingAvail(true)}>Edit</button>
                    )}
                </div>

                {/* Study Environment */}
                <div className={styles.preferenceSection}>
                    <h3>Study Environment</h3>
                    {['on-campus', 'online', 'group-setting', 'one-to-one'].map((option) => (
                        <div key={option} className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                id={option}
                                checked={environment.includes(option)}
                                disabled={!editingEnv}
                                onChange={(e) => {
                                    const updated = e.target.checked
                                        ? [...environment, option]
                                        : environment.filter((env) => env !== option);
                                    setEnvironment(updated);
                                }}
                            />
                            <label htmlFor={option}>
                                {{
                                    'on-campus': 'On Campus',
                                    'online': 'Online',
                                    'group-setting': 'Group Setting',
                                    'one-to-one': 'One-on-One'
                                }[option]}
                            </label>
                        </div>
                    ))}
                    {editingEnv ? (
                        <>
                            <button className={styles.editButton} onClick={handleSaveEnvironment}>Save</button>
                            <button className={styles.editButton} onClick={() => setEditingEnv(false)}>Cancel</button>
                        </>
                    ) : (
                        <button className={styles.editButton} onClick={() => setEditingEnv(true)}>Edit</button>
                    )}
                </div>

                {/* Interests */}
                <div className={styles.preferenceSection}>
                    <h3>Study Interests</h3>
                    <div className={styles.interestsContainer}>
                        {interests.map((interest, index) => (
                            <div key={index} className={styles.interestTag}>{interest}</div>
                        ))}
                    </div>
                    {showInterestInput ? (
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                className={styles.input}
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                                placeholder="e.g. AI"
                            />
                            <div style={{ marginTop: 10 }}>
                                <button className={styles.editButton} onClick={handleAddInterest} disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button className={styles.editButton} onClick={() => setShowInterestInput(false)} disabled={loading}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.addMore}>
                            <span style={{ cursor: 'pointer' }} onClick={() => setShowInterestInput(true)}>
                                + Add more interests
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}