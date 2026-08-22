import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import FileInput from "../components/shared/form/FileInput"
import Input from "../components/shared/form/Input"
import Button from "../components/shared/Button"
import HorizontalDivider from "../components/shared/HorizontalDivider"
import ConfirmDeletePopup from "../components/shared/ConfirmDeletePopup"

import ConfirmationScreen from "../components/shared/ConfirmationScreen"

import { useAuth } from "../context/authContext"

export default function EditProfileScreen() {
    const { user, logout, deleteAccount } = useAuth()

    const [formData, setFormData] = useState({
        profilePhoto: user.profilePhoto,
        name: user.name,
        surname: user.surname
    })
    const [errors, setErrors] = useState({})
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

    const navigate = useNavigate()

    return (
        <>
            {isConfirmationOpen
                ? <ConfirmationScreen 
                    iconVariant="success"
                    icon={CheckmarkCircle02Icon}
                    title="Account Deleted"
                    message="Your account and all associated data have been permanently removed. We're sorry to see you go."
                    buttonText="Get started"
                    buttonDestination="/"
                    onClose={() => {
                        setIsConfirmationOpen(false)
                        logout()
                    }}
                />
                : <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-y-auto">
                    <div className="px-5 pt-5">
                        <HugeiconsIcon 
                            icon={ArrowLeft02Icon} 
                            size={24} 
                            strokeWidth={1.5} 
                            className="cursor-pointer text-espresso"
                            onClick={() => navigate(-1)}
                        />
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
                                    onChange=""
                                    errorMessage=""
                                />
        
                                <div className="flex items-center gap-3">
                                    <Input 
                                        id="name"
                                        label="Name"
                                        placeholder="Ellison"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                        errorMessage=""
                                    />
        
                                    <Input 
                                        id="surname"
                                        label="Surname"
                                        placeholder="Elliot"
                                        value={formData.surname}
                                        onChange={(e) => setFormData(prev => ({...prev, surname: e.target.value}))}
                                        errorMessage=""
                                    />
                                </div>
                            </div>
        
                            <Button
                                onClick=""
                                className="mt-7"
                            >
                                <span>Save</span>
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
        
                        {isConfirmPopupOpen &&
                            <ConfirmDeletePopup 
                                cancel={() => setIsConfirmPopupOpen(false)}
                                delete_={() => {
                                    deleteAccount()
                                    setIsConfirmationOpen(true)
                                }}
                                message="This action cannot be undone once confirmed."
                            />
                        }
                    </div>
                </div>
            }
        </>
    )
}