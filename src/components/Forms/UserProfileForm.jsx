"use client"
import { editProfile, setIsChanged } from '@/redux/User/UserSlice';
import React from 'react'
import { useDispatch } from 'react-redux'

const UserProfileForm = ({ userInformation, setErrors, errors }) => {

    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(editProfile(e.target))
        dispatch(setIsChanged(true));
        inputControl(e);
    }

    const inputControl = (e) => {
        if (e.target.name === "email") {
            if (e.target.value === "") {
                setErrors(prev => ({ ...prev, [e.target.name]: { valid: prev.email.valid, empty: true } }))
            }
            else {
                setErrors(prev => ({ ...prev, [e.target.name]: { valid: prev.email.valid, empty: false } }))
                var emailControl = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (!emailControl.test(e.target.value)) {
                    setErrors(prev => ({ ...prev, [e.target.name]: { valid: true, empty: prev.email.empty } }))
                } else {
                    setErrors(prev => ({ ...prev, [e.target.name]: { valid: false, empty: prev.email.empty } }))
                }
            }
        } else {
            if (e.target.value === "") {
                setErrors(prev => ({ ...prev, [e.target.name]: true }))
            } else {
                setErrors(prev => ({ ...prev, [e.target.name]: false }))
            }
        }
    }

    return (
        <div className='bg-[#FAFAFA] text-[#737373] rounded-lg px-3'>
            <form className='flex flex-col gap-6'>
                <label className='w-full grid grid-cols-4 gap-2 md:gap-5 items-center relative'>
                    <span className='col-span-4 md:col-span-1'>
                        First name
                    </span>
                    <input onBlur={(e) => inputControl(e)} onChange={(e) => handleChange(e)} name='firstName' placeholder='e.g. John' value={userInformation.firstName} type='text' className={`${errors.firstName ? "border-red-500" : "border-gray-200"} col-span-4 md:col-span-3 px-4 py-3 rounded-lg border`} />
                    {errors.firstName &&
                        <span className='absolute top-full mt-[5px] right-1 italic text-xs text-red-500'>
                            Please enter your first name!
                        </span>
                    }
                </label>
                <label className='w-full grid grid-cols-4 gap-2 md:gap-5 items-center relative'>
                    <span className='col-span-4 md:col-span-1'>
                        Last name
                    </span>
                    <input onBlur={(e) => inputControl(e)} onChange={(e) => handleChange(e)} name='lastName' placeholder='e.g. Doe' value={userInformation.lastName} type='text' className={`${errors.lastName ? "border-red-500" : "border-gray-200"} col-span-4 md:col-span-3 px-4 py-3 rounded-lg border`} />
                    {errors.lastName &&
                        <span className='absolute top-full mt-[5px] right-1 italic text-xs text-red-500'>
                            Please enter your last name!
                        </span>
                    }
                </label>
                <label className='w-full grid grid-cols-4 gap-2 md:gap-5 items-center relative'>
                    <span className='col-span-4 md:col-span-1'>
                        E-mail
                    </span>
                    <input onBlur={(e) => inputControl(e)} onChange={(e) => handleChange(e)} name='email' placeholder='e.g. name@mail.com' value={userInformation.email} type='email' className={`${(errors.email.valid || errors.email.empty) ? "border-red-500" : "border-gray-200"} col-span-4 md:col-span-3 px-4 py-3 rounded-lg border`} />
                    {(errors.email.valid || errors.email.empty) &&
                        <span className='absolute top-full mt-[5px] right-1 italic text-xs text-red-500'>
                            {errors.email.valid ?
                                "Please enter valid email!"
                                :
                                "Please enter a email!"
                            }
                        </span>
                    }
                </label>
                <label className='w-full grid grid-cols-4 gap-2 md:gap-5 items-center relative'>
                    <span className='col-span-4 md:col-span-1'>
                        Hidden Email
                    </span>
                    <span className='col-span-4 md:col-span-3 flex items-center'>
                    <input className='accent-primary w-4 h-4  ' onBlur={(e) => inputControl(e)} onChange={(e) => handleChange(e)} name='isHiddenEmail'  checked={userInformation.isHiddenEmail} type='checkbox'  />
                    </span>
                </label>
                <label className='w-full grid grid-cols-4 gap-2 md:gap-5 items-center relative'>
                    <span className='col-span-4 md:col-span-1'>
                        Profile Color
                    </span>
                    <input onBlur={(e) => inputControl(e)} onChange={(e) => handleChange(e)} name='profileColor'  value={userInformation.profileColor} type='color'  />
                </label>
            </form>
        </div>
    )
}

export default UserProfileForm