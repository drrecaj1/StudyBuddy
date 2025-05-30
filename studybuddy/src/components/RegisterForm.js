import { useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Step1BasicInfo from './steps/Step1BasicInfo'
import Step2StudyInfo from './steps/Step2StudyInfo'
import Step3StudyInterests from './steps/Step3StudyInterests'
import Step4UploadPhoto from './steps/Step4UploadPhoto'

export default function RegistrationForm() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        university: '',
        field: '',
        year: '',
        courses: '',
        interests: '',
        environment: '',
        availability: '',
        photo: null,
        termsAccepted: false, // <-- NEW: Add termsAccepted to formData
    })

    // Registration handler for final step
    const handleRegister = async () => {
        setIsSubmitting(true)
        try {
            // Ensure courses and interests are strings
            const courses = Array.isArray(formData.courses)
                ? formData.courses.join(',')
                : formData.courses;
            const interests = Array.isArray(formData.interests)
                ? formData.interests.join(',')
                : formData.interests;

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.name,
                    email: formData.email,
                    password: formData.password,
                    university: formData.university,
                    field: formData.field,
                    year: formData.year,
                    courses,
                    interests,
                    environment: formData.environment,
                    availability: formData.availability,
                    termsAccepted: formData.termsAccepted, // <-- NEW: Include termsAccepted
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Registration failed');
                return false;
            }

            // Show success message and redirect to login page
            alert('Registration successful! Redirecting to login page...');

            // Use Next.js router for better navigation
            setTimeout(() => {
                router.push('/login?registered=true');
            }, 1500);

            return true;
        } catch (err) {
            console.error('Registration error:', err);
            alert('Something went wrong during registration. Please try again.');
            return false;
        } finally {
            setIsSubmitting(false)
        }
    };

    // Step navigation
    const nextStep = async () => {
        setStep(prev => prev + 1);
    }

    const prevStep = () => setStep(prev => prev - 1)

    const updateForm = (fields) => {
        setFormData(prev => ({
            ...prev,
            ...fields,
        }))
    }

    // Called when user clicks Finish on Step 4
    const handleFinish = async () => {
        await handleRegister();
    }

    const steps = {
        1: <Step1BasicInfo next={nextStep} data={formData} update={updateForm} />,
        2: <Step2StudyInfo next={nextStep} back={prevStep} data={formData} update={updateForm} />,
        3: <Step3StudyInterests next={nextStep} back={prevStep} data={formData} update={updateForm} />,
        4: <Step4UploadPhoto
            back={prevStep}
            data={formData}
            update={updateForm}
            onFinish={handleFinish}
            isSubmitting={isSubmitting}
        />,
    }

    return (
        <div>
            <div className="form-header">
                <h2 className="form-title">
                    {step === 1 && "Become a Study Buddy"}
                    {step === 2 && `Welcome ${formData.name ? formData.name.split(' ')[0] : 'there'}!`}
                    {step === 3 && "Study Interests"}
                    {step === 4 && "Upload Your Photo"}
                </h2>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {steps[step]}
                    {step > 1 && (
                        <div className="step-dots">
                            {[2, 3, 4].map((s) => (
                                <span
                                    key={s}
                                    className={`dot ${step === s ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}