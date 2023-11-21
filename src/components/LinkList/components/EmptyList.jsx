import React from 'react'
import emptySVG from "../../../../public/illustration-empty.svg"
import Image from 'next/image'

const EmptyList = () => {
    return (
        <div className='w-full h-full flex items-center justify-center gap-2 flex-col'>
            <Image src={emptySVG} alt="empty" />
            <h3 className='text-3xl font-bold'>
                Let's get you started
            </h3>
            <p className='text-center'>
                Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!
            </p>
        </div>
    )
}

export default EmptyList