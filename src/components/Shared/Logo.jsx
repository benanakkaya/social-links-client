import React from 'react'
import Link from "next/link";
import {GiQuillInk} from "react-icons/gi"

const Logo = () => {
    return (
        <Link href="/" className="text-xl md:text-2xl flex items-center gap-2 py-4 px-8 font-bold ">
            <GiQuillInk className="text-primary text-3xl" /> 
            <span className='text-primary'>
            Social Links
            </span>
        </Link>
    )
}

export default Logo