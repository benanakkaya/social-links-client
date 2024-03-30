"use client"
import React from 'react'
import { getUser } from '@/redux/User/UserSlice'
import store from '@/redux/store'
import PreviewList from '@/components/PreviewList/PreviewList'
import Link from 'next/link'
import { FaUserSlash } from 'react-icons/fa'

const PreviewPage = async ({ params }) => {


    await store.dispatch(getUser(params.username))

    const { userInformation } = store.getState().user;


    return (
        <div className='h-full w-full p-3 container flex flex-col gap-8 items-center'>
            <div style={{ backgroundColor: userInformation.id ? userInformation.profileColor : "#633CFF" }} className={`h-2/5 absolute rounded-b-3xl left-0 top-0 right-0 -z-10`}>
            </div>
            {userInformation.id ?
                <PreviewList userInformation={userInformation} />
                :
                <div className='flex flex-col items-center gap-4 my-10 text-white'>

                    <FaUserSlash className='text-5xl' />
                    <strong className='text-lg'>
                        User not found!
                    </strong>
                    <Link href="/" className='px-2 py-1 rounded-lg border-[1px]  border-white  font-bold'>
                        Go To Homepage
                    </Link>
                </div>
            }
        </div>
    )
}

export default PreviewPage