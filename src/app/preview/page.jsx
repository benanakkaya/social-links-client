"use client"
import PreviewHeader from '@/components/PreviewHeader/PreviewHeader'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { getUser } from '@/redux/User/UserSlice'
import PreviewList from '@/components/PreviewList/PreviewList'

const PreviewPage = () => {

    const pathname = usePathname();

    const dispatch = useDispatch();

    const { userInformation } = useSelector(state => state.user);

    useEffect(() => {
        if (userInformation.username) {
          dispatch(getUser(userInformation.username))
        }
      }, [pathname])

    return (
        <div className=' h-full w-full p-3 container flex flex-col gap-8 items-center'>
            <div style={{backgroundColor:userInformation.profileColor}} className='bg-primary h-2/5 absolute rounded-b-3xl left-0 top-0 right-0 -z-10'>
            </div>
            <PreviewHeader username={userInformation.username} />
            <PreviewList userInformation={userInformation} />
        </div>
    )
}

export default PreviewPage