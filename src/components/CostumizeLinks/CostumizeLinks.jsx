"use client"
import { addLink } from '@/redux/User/UserSlice';
import React from 'react'
import { useDispatch } from 'react-redux'

const CostumizeLinks = () => {

    const dispatch = useDispatch();

    const handleNewLink = () => {
        dispatch(addLink())
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <h3 className="text-3xl font-bold">
                Customize your links
            </h3>
            <p className="text-gray-400">
                Add/edit/remove links below and then share all your profiles with the world!
            </p>
            <button onClick={handleNewLink} className="w-full py-2 rounded-lg border-[2px] border-primary font-bold text-primary">
                + Add New Link
            </button>
        </div>
    )
}

export default CostumizeLinks