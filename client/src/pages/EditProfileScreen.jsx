import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import FileInput from "../components/shared/form/FileInput"
import Input from "../components/shared/form/Input"
import Button from "../components/shared/Button"
import HorizontalDivider from "../components/shared/HorizontalDivider"
import ConfirmDeletePopup from "../components/shared/ConfirmDeletePopup"
import { useAuth } from "../context/authContext"
import Modal from "../components/shared/Modal"

export default function EditProfileScreen() {
    const { user, updateProfile, updateProfilePhoto, requestDeleteAccount } = useAuth()

    const initalPp = useRef(user.profilePhoto)
    const [pp, setPp] = useState(user.profilePhoto)

    const initialFormData = useRef({
        name: user.name,
        surname: user.surname
    })
    const [formData, setFormData] = useState({
        name: user.name,
        surname: user.surname
    })

    const hasChanges = 
        Object.keys(initialFormData.current).some(key => formData[key] !== initialFormData.current[key]) ||
        pp !== initalPp.current

    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
    const [sending, setSending] = useState(false)
    const navigate = useNavigate()

    async function handleRequestDeleteAccount() {
        setSending(true)

        try {
            await requestDeleteAccount(token)
            navigate("/edit-profile/delete-account/check-email")
        } catch (error) {
            console.error(error)
        } finally {
            setSending(false)
            setIsConfirmPopupOpen(false)
        }
    }

    async function handleUpdate() {
        setErrors({})
        if (!hasChanges) return

        const token = localStorage.getItem("token")

        try {
            setSaving(true)

            await updateProfilePhoto(token, pp)
            initalPp.current = pp

            await updateProfile(token, formData)
            initialFormData.current = { ...formData }
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="px-5 pt-5">
                <button 
                    disabled={saving}
                >
                    <HugeiconsIcon 
                        icon={ArrowLeft02Icon} 
                        size={24} 
                        strokeWidth={1.5} 
                        className={saving ? "cursor-not-allowed text-taupe" : "cursor-pointer text-taupe hover:text-espresso transition-all duration-300"}
                        onClick={() => navigate(-1)}
                    />

                </button>
            </div>

            <div className="mt-6 px-5">
                <div className="text-center">
                    <h1 className="h1 text-espresso">Edit profile</h1>
                </div>

                <div className="mt-7">
                    <div className="flex flex-col gap-5">
                        <FileInput 
                            id="profile-image"
                            label="Profile image"
                            placeholder="Tap to change the profile photo"
                            onChange={file => setPp(file)}
                            errorMessage={errors.profilePhoto}
                            className="aspect-1/1 rounded-full"
                        />

                        <div className="flex items-center gap-3">
                            <Input 
                                id="name"
                                label="Name"
                                placeholder="Ellison"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                errorMessage={errors.name}
                            />

                            <Input 
                                id="surname"
                                label="Surname"
                                placeholder="Elliot"
                                value={formData.surname}
                                onChange={(e) => setFormData(prev => ({...prev, surname: e.target.value}))}
                                errorMessage={errors.surname}
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleUpdate}
                        className="mt-7"
                        disabled={!hasChanges || saving}
                    >
                        <span>{saving ? "Saving" : "Save"}</span>
                    </Button>
                </div>

                <HorizontalDivider className="mt-7" />

                <div className="mt-6 flex flex-col gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/edit-profile/change-email")}
                    >
                        <span>Change email address</span>
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/edit-profile/change-password")}
                    >
                        <span>Change password</span>
                    </Button>

                </div>

                <p 
                    className="text-body-sm text-red mt-7 mb-10 text-center cursor-pointer"
                    onClick={() => setIsConfirmPopupOpen(true)}
                >
                    Request delete account
                </p>

                {sending &&
                    <Modal>
                        <p className="text-espresso h3 text-center">Sending...</p>
                    </Modal>
                }

                {(!sending && isConfirmPopupOpen) &&
                    <ConfirmDeletePopup 
                        cancel={() => setIsConfirmPopupOpen(false)}
                        delete_={handleRequestDeleteAccount}
                        message="We will sent a confirmation link to your email. Click the link to permanently delete your account."
                    />
                }
            </div>
        </div>
    )
}