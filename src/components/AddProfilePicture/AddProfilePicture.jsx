"use client"
import { setNewProfilePicture } from '@/redux/User/UserSlice'
import React, { useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

const AddProfilePicture = () => {

    const dispatch = useDispatch();


    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    return (
        <label className='p-3 flex flex-col gap-2 md:flex-row md:items-center justify-between bg-[#FAFAFA] text-[#737373] rounded-lg'>
            <p className='flex-1'>
                Profile Picture
            </p>
            <div className='flex-1 flex flex-col md:flex-row items-center gap-4'>
                <input
                    id="image"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    ref={fileInputRef}
                    onChange={(e) => dispatch(setNewProfilePicture(e.target.files[0]))}
                    className='hidden' type='file' />
                <button onClick={handleClick} className='flex  flex-col items-center justify-center gap-3 h-48 w-48 text-lg text-primary bg-secondary rounded-2xl flex-2'>
                    <FaImage />
                    + Upload Image
                </button>
                <p className='text-xs flex-1'>
                    It is recommended that the image you choose should be in 1:1 ratio.
                </p>
            </div>
        </label>
    )
}

export default AddProfilePicture