import Head from 'next/head'
import RegistrationForm from '../components/RegisterForm'
import styles from '@/styles/register.module.css'
import Image from 'next/image'

export default function RegisterPage() {
    return (
        <>
            <Head>
                <title>Register – Study Buddy</title>
            </Head>
            <main className={styles.registerLayout}>
                <div className={styles.leftPanel}>
                    <Image
                        src="/Buddy-7.png"
                        alt="Study Buddy Logo"
                        width={300}
                        height={300}
                        className={styles.logoImage}
                    />
                </div>
                <div className={styles.rightPanel}>
                    <RegistrationForm />
                </div>
            </main>
        </>
    )
}
