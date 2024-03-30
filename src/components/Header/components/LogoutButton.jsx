"use client"
import { setLogout } from '@/redux/User/UserSlice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { GrLogout } from 'react-icons/gr'
import { useDispatch } from 'react-redux'

const LogoutButton = () => {

    const dispatch = useDispatch();

    const router = useRouter();

    const handleClick = () => {
        dispatch(setLogout());
        router.push("/login")
    }

    return (
        <button onClick={handleClick} className={`flex items-center gap-2 text-lg px-3 py-2 rounded-lg text-red-600`}>
            <GrLogout />
            <span className='hidden md:block'>
                Logout
            </span>
        </button>
    )
}

export default LogoutButton