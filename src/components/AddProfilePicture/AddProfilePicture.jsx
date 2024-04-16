"use client"
import { setIsChanged, setNewProfilePicture } from '@/redux/User/UserSlice'
import React, { useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

const AddProfilePicture = () => {

    const dispatch = useDispatch();


    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleChange = (e) => {
        dispatch(setNewProfilePicture(e.target.files[0]));
        dispatch(setIsChanged(true));
    }

    return (
        <label className='px-3 grid grid-cols-4 gap-2 md:gap-5 md:flex-row md:items-center justify-between bg-[#FAFAFA] text-[#737373] rounded-lg'>
            <p className='col-span-4 md:col-span-1'>
                Profile Picture
            </p>
            <div className='col-span-4 md:col-span-3 flex flex-col md:flex-row items-center gap-4'>
                <input
                    id="image"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    ref={fileInputRef}
                    onChange={(e) => handleChange(e)}
                    className='hidden' type='file' />
                <button onClick={handleClick} className='flex  flex-col items-center justify-center gap-3 w-full h-48 text-lg text-primary bg-secondary rounded-2xl flex-2'>
                    <FaImage />
                    Click to add a photo   <br/>
                    <span className='text-xs italic text-gray-400'>
                    (It is recommended that the image is 1:1)
                </span> 
                </button>
                
            </div>
        </label>
    )
}

export default AddProfilePicture