import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import styles from '@/styles/login.module.css' // 👈 import CSS module

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('Logging in with', email, password)
    }

    const handleGoogleLogin = () => {
        console.log('Google login triggered')
    }

    return (
        <div className={styles.floatingBox}> {/* ✅ use module */}
            <form onSubmit={handleLogin} className="auth-form">
                <h2 className="form-title">WELCOME BACK</h2>

                <label className="form-label">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label className="form-label">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <div className={styles.loginLinks}> {/* ✅ use styles.loginLinks */}
                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit">Login</button>

                <div className={styles.divider}>or</div> {/* ✅ correct styles */}

                <button
                    type="button"
                    className={styles.googleLogin} // ✅ use styles.googleLogin
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle size={20} style={{ marginRight: '8px' }} />
                    Sign in with Google
                </button>
            </form>
        </div>
    )
}

