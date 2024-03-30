import React from 'react'
import { HiLink, HiUserCircle } from 'react-icons/hi'
import Link from 'next/link'
import { FiEye } from "react-icons/fi"
import { GiQuillInk } from 'react-icons/gi'
import LogoutButton from './components/LogoutButton'

const Header = ({ pathname }) => {

    return (
        <div className='flex items-center justify-between bg-white rounded-lg w-full px-3 md:px-6 py-1 md:py-2'>
            <Link href="/" className="text-xl md:text-2xl flex items-center gap-2 py-4 px-8 font-bold ">
                <GiQuillInk className="text-primary text-3xl" />
                <span className='hidden md:block text-primary'>
                    Social Links
                </span>
            </Link>
            <nav className='flex h-full items-center gap-4 text-gray-400'>
                <Link href="/" className={`${pathname === "/" ? "bg-secondary text-primary" : "bg-transparent"} flex items-center gap-2 text-lg px-3 py-2 rounded-lg`}>
                    <HiLink />
                    <span className='hidden md:block'>
                        Links
                    </span>
                </Link>
                <Link href="/profile" className={`${pathname === "/profile" ? "bg-secondary text-primary" : "bg-transparent"} flex items-center gap-2 text-lg px-3 py-2 rounded-lg`}>
                    <HiUserCircle />
                    <span className='hidden md:block'>
                        Profile
                    </span>
                </Link>
                <LogoutButton />
            </nav>
            <Link href="/preview" className='px-3 py-2 border flex items-center gap-2 border-primary text-lg rounded-lg text-primary font-bold'>
                <FiEye className="" />
                <span className='hidden md:block'>
                    Preview
                </span>
            </Link>
        </div>
    )
}

export default Header