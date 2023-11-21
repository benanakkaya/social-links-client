"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '@/redux/User/UserSlice'
import PreviewList from '@/components/PreviewList/PreviewList'

const PreviewPage = ({params}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(params.username))
    },[])


    return (
        <div className='h-full w-full p-3 container flex flex-col gap-8 items-center'>
            <div className='bg-primary h-2/5 absolute rounded-b-3xl left-0 top-0 right-0 -z-10'>
            </div>
            <PreviewList />
        </div>
    )
}

export default PreviewPage