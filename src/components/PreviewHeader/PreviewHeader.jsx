"use client"
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify';
import { useUrl } from 'nextjs-current-url';

const PreviewHeader = ({username}) => {

    const { href: currentUrl, pathname, host } = useUrl() ?? {};


    const handleShare = () => {
        navigator.clipboard.writeText(`${host}/${username}`);
        toast.info("Your share link has been copied!",{position:'bottom-right'})
    }

  return (
    <div className='flex items-center justify-between bg-white rounded-lg w-full px-6 py-2 '>
            <Link href="/" className="border border-primary rounded-lg text-primary font-bold px-3 py-2">
                Back to Editor
            </Link>
            <button onClick={handleShare} className='px-3 py-2 bg-primary rounded-lg text-white hover:bg-opacity-70'>
                Share Link
            </button>
        </div>
  )
}

export default PreviewHeader

