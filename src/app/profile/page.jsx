"use client"
import AddProfilePicture from '@/components/AddProfilePicture/AddProfilePicture'
import UserProfileForm from '@/components/Forms/UserProfileForm'
import Header from '@/components/Header/Header'
import MobileMockup from '@/components/MobileMockup/MobileMockup'
import uploadImage from '@/hooks/imageUpload'
import { editProfile, getUser, setIsChanged, setNewProfilePicture, setUserInformation, updateUserDetails } from '@/redux/User/UserSlice'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const ProfilePage = () => {

    const pathname = usePathname();

    const dispatch = useDispatch();

    const { userInformation, newProfilePicture, buttonStatus, isChanged, backupInformation } = useSelector(state => state.user)

    const [errors, setErrors] = useState({ firstName: false, lastName: false, email: { empty: false, valid: false } })

    const handleSubmit = async () => {
        if (newProfilePicture) {
            const ppLink = await uploadImage(newProfilePicture);
            dispatch(editProfile({ name: "profilePicture", value: ppLink }))
            dispatch(setNewProfilePicture(null));
        }
        dispatch(updateUserDetails());
        dispatch(setIsChanged(false));
    }

    const handleDiscardChanges = () => {
        dispatch(setUserInformation(backupInformation));
        dispatch(setIsChanged(false));
        setErrors({ firstName: false, lastName: false, email: { empty: false, valid: false } })
    }

    useEffect(() => {
        if (userInformation.username) {
            dispatch(getUser(userInformation.username))
        }
    }, [pathname])

    return (
        <div className="w-full flex flex-col gap-6 container p-3">
            <Header pathname={pathname} />
            <div className="grid grid-cols-3 gap-6">
                <MobileMockup />
                <div className="col-span-3 md:col-span-2 bg-white p-6 rounded-lg flex flex-col gap-8">
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="text-3xl font-bold">
                            Profile Details
                        </h3>
                        <p className="text-gray-400">
                            Add your details to create a personal touch to your profile.
                        </p>
                    </div>
                    <AddProfilePicture />
                    <UserProfileForm errors={errors} setErrors={setErrors} userInformation={userInformation} />
                    <div className='p-3 flex items-center gap-4 justify-end'>
                        {isChanged === true &&
                            <button onClick={handleDiscardChanges} className={`bg-opacity-100 flex items-center justify-center gap-1 w-full md:w-32 bg-gray-600 text-white rounded-lg px-5 py-2 font-bold`}>
                                Discard
                            </button>
                        }
                        <button disabled={(errors.firstName || errors.lastName || errors.email.empty || errors.email.valid) || (buttonStatus === false) === true} onClick={handleSubmit} className={`${(errors.firstName || errors.lastName || errors.email.empty || errors.email.valid) || (buttonStatus === false) === true ? 'bg-opacity-50' : ""} flex items-center justify-center gap-1 bg-primary text-white rounded-lg w-full md:w-32 py-2 font-bold`}>
                            {buttonStatus === false &&
                                <AiOutlineLoading3Quarters className="animate-spin " />
                            }
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage