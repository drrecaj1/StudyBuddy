import { useRef, useState, useEffect } from 'react'
import { FaCamera } from 'react-icons/fa'

export default function Step4UploadPhoto({ back, data, update, onFinish, isSubmitting }) {
    const fileInputRef = useRef()
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (data.photo) {
            const file = data.photo
            const url = typeof file === 'string' ? file : URL.createObjectURL(file)
            setPreview(url)
            return () => {
                if (typeof file !== 'string') {
                    URL.revokeObjectURL(url)
                }
            }
        }
    }, [data.photo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onFinish && !isSubmitting) {
            await onFinish();
        }
    }

    const handleFileChange = (e) => {
        if (isSubmitting) return;
        const file = e.target.files[0]
        if (file) {
            update({ photo: file })
        }
    }

    const handleFileClick = () => {
        if (!isSubmitting) {
            fileInputRef.current.click()
        }
    }

    return (
        <form className="auth-form photo-upload-form" onSubmit={handleSubmit}>
            <p className="form-subtitle">
                Upload a photo to complete your profile. This helps other study buddies recognize you.
            </p>
            <div className="photo-upload">
                <div
                    className="photo-icon-wrapper"
                    onClick={handleFileClick}
                    style={{
                        opacity: isSubmitting ? 0.6 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className="profile-preview" />
                    ) : (
                        <FaCamera size={50} />
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    disabled={isSubmitting}
                />
                <p
                    className="upload-link"
                    onClick={handleFileClick}
                    style={{
                        opacity: isSubmitting ? 0.6 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? 'Processing...' : 'Upload from device'}
                </p>
            </div>

            {isSubmitting && (
                <div style={{
                    textAlign: 'center',
                    color: '#007bff',
                    fontSize: '14px',
                    margin: '1rem 0'
                }}>
                    Creating your account...
                </div>
            )}

            <div className="form-nav">
                <button
                    type="button"
                    onClick={back}
                    disabled={isSubmitting}
                    style={{
                        opacity: isSubmitting ? 0.6 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        opacity: isSubmitting ? 0.8 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? 'Finishing...' : 'Finish'}
                </button>
            </div>
        </form>
    )
}