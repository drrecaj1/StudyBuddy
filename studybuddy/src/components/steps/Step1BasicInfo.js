import { useState, useEffect } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import TermsAndConditionsPopup from '.././TermsAndConditionsPopup';


export default function Step1BasicInfo({ next, data, update }) {
    const [rules, setRules] = useState({})
    const [confirmError, setConfirmError] = useState(null)
    const [touched, setTouched] = useState({})
    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const [termsError, setTermsError] = useState(null);

    const validatePassword = (password) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password)
        }
    }

    useEffect(() => {
        if (touched.password) {
            setRules(validatePassword(data.password || ''))
        }

        if (touched.confirmPassword) {
            setConfirmError(
                data.password !== data.confirmPassword ? 'Passwords do not match.' : null
            )
        }
    }, [data.password, data.confirmPassword, touched])

    const handleChange = (e) => {
        const { name, value } = e.target
        update({ [name]: value })
        setTouched((prev) => ({ ...prev, [name]: true }))
    }

    // Function to handle terms acceptance from the popup
    const handleTermsAcceptance = () => {
        update({ termsAccepted: true }); // Update formData with terms accepted
        setShowTermsPopup(false); // Close the popup
        setTermsError(null); // Clear any previous terms error
    };

    // Function to handle closing the popup WITHOUT accepting terms
    const handleCloseTermsPopup = () => {
        update({ termsAccepted: false }); // Explicitly set termsAccepted to false
        setShowTermsPopup(false); // Close the popup
        // The error will now only show on submit if not accepted
    };

    // Handler for the checkbox itself
    const handleCheckboxChange = (e) => {
        update({ termsAccepted: e.target.checked });
        // Clear error immediately if checked, otherwise it will be set on submit
        if (e.target.checked) {
            setTermsError(null);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        const passRules = validatePassword(data.password || '')
        const allValid = Object.values(passRules).every(Boolean)
        const confirmValid = data.password === data.confirmPassword
        const termsAccepted = data.termsAccepted;

        if (allValid && confirmValid && termsAccepted) {
            next()
        } else {
            setTouched({ password: true, confirmPassword: true })
            setRules(passRules)
            setConfirmError(confirmValid ? null : 'Passwords do not match.')

            // ONLY set termsError here if terms are not accepted
            if (!termsAccepted) {
                setTermsError('You must accept the terms & conditions.');
            } else {
                setTermsError(null); // Clear if it was previously set and now accepted
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="auth-form">
                <label className="form-label">
                    Full Name:
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="form-label">
                    E-mail:
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="form-label">
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </label>

                {touched.password && (
                    <ul className="form-errors">
                        <li style={{ color: rules.length ? 'green' : 'crimson' }}>
                            {rules.length ? <FaCheckCircle /> : <FaTimesCircle />} Password must be at least 8 characters.
                        </li>
                        <li style={{ color: rules.uppercase ? 'green' : 'crimson' }}>
                            {rules.uppercase ? <FaCheckCircle /> : <FaTimesCircle />} Must include at least one uppercase letter.
                        </li>
                        <li style={{ color: rules.number ? 'green' : 'crimson' }}>
                            {rules.number ? <FaCheckCircle /> : <FaTimesCircle />} Must include at least one number.
                        </li>
                    </ul>
                )}

                <label className="form-label">
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                {touched.confirmPassword && confirmError && (
                    <div className="form-errors">
                        <p style={{ color: 'crimson' }}>{confirmError}</p>
                    </div>
                )}

                <div className="terms">
                    <input
                        id="terms"
                        type="checkbox"
                        checked={data.termsAccepted}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms">
                        I accept the <a href="#" onClick={(e) => { e.preventDefault(); setShowTermsPopup(true); }}>terms & conditions</a>.
                    </label>
                    {termsError && ( // This error will only show if termsError state is not null
                        <p style={{ color: 'crimson', marginTop: '0.5rem' }}>{termsError}</p>
                    )}
                </div>

                <button type="submit">Next</button>
            </form>

            {/* Render the Terms and Conditions Popup */}
            {showTermsPopup && (
                <TermsAndConditionsPopup
                    onAccept={handleTermsAcceptance}
                    onClose={handleCloseTermsPopup}
                />
            )}
        </>
    )
}
