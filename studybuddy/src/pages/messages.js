import Head from 'next/head';
import { useState } from 'react';
import MessageList from '@/components/Messages/MessageList';
import ChatWindow from '@/components/Messages/ChatWindows';
import styles from '@/styles/Messages.module.css';
import Link from 'next/link';

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState(null);

    // Sample data for message previews
    const messages = [
        {
            id: 1,
            sender: 'Study Buddy',
            message: 'Welcome to study buddy! Enjoy being a study buddy and helping peers out!',
            timestamp: '10:34',
            unread: true
        },
        {
            id: 2,
            sender: 'Study Buddy',
            message: 'Welcome to study buddy! Enjoy being a study buddy and helping peers out!',
            timestamp: '10:34',
            unread: false
        },
        {
            id: 3,
            sender: 'Study Buddy',
            message: 'Welcome to study buddy! Enjoy being a study buddy and helping peers out!',
            timestamp: '10:34',
            unread: false
        },
        {
            id: 4,
            sender: 'Study Buddy',
            message: 'Welcome to study buddy! Enjoy being a study buddy and helping peers out!',
            timestamp: '10:34',
            unread: false
        },
        {
            id: 5,
            sender: 'Study Buddy',
            message: 'Welcome to study buddy! Enjoy being a study buddy and helping peers out!',
            timestamp: '10:34',
            unread: false
        },
    ];

    return (
        <>
            <Head>
                <title>My Messages – Study Buddy</title>
            </Head>
            <div className={styles.messagesContainer}>
                <header className={styles.header}>
                    <nav className={styles.nav}>
                        <ul>
                            <li>
                                <Link href="/dashboard" className={styles.navLink}>
                                    Home
                                </Link>
                            </li>
                            <li>Study Partners</li>
                            <li className={styles.active}>My Messages</li>
                            <li>My Profile</li>
                        </ul>
                    </nav>
                </header>

                <main className={styles.mainContent}>
                    <div className={styles.messagesWrapper}>
                        <MessageList
                            messages={messages}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                        />
                        <ChatWindow selectedChat={selectedChat} />
                    </div>
                </main>
            </div>
        </>
    );
}