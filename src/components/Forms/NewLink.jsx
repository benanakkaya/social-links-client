"use client"
import React, { useEffect, useState } from 'react'
import { BiDownArrowAlt } from "react-icons/bi"
import { RiDragMove2Fill } from "react-icons/ri"
import { FaLink } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { deleteLink, editLink } from '@/redux/User/UserSlice'

const NewLink = ({ platforms, item, index, activeLink, setActiveLink,provided }) => {

    const [listVisible, setListVisible] = useState(false);

    const [error,setError] = useState(false);

    const [platform, setPlatform] = useState(platforms[0])

    const dispatch = useDispatch();

    const onClickPlatforms = () => {
        setListVisible(prev => !prev)
        setActiveLink(index)
    }

    const handlePlatforms = (platform) => {
        setPlatform(platform)
        dispatch(editLink({ platform: platform.name, link: item.link, index }))
    }

    const handleDeleteLink = (index) => {
        dispatch(deleteLink(index))
    }

    const handleLink = (e, index) => {
        dispatch(editLink({ platform: platform.name, link: e.target.value, index }))
        urlControl()
    }

    useEffect(() => {
        const platform = platforms.find(platform => platform.name === item.platform);
        setPlatform(platform)
    }, [item])

    const urlControl = () => {
        const urlControl = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

        if(urlControl.test(item.link)){
            setError(false);
        }else{
            setError(true);
        }
    }


    return (
        <li {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef}  className="bg-[#FAFAFA] text-[#737373] rounded-lg py-6 px-3 flex flex-col gap-4">
            <div className="flex items-center w-full justify-between">
                <span className="flex items-center gap-1 font-bold">
                    <RiDragMove2Fill  className="text-lg cursor-pointer" /> Link #{index + 1}
                </span>
                <button onClick={() => handleDeleteLink(index)} className='text-sm'>
                    Remove
                </button>
            </div>
            <label className="flex flex-col gap-2 text-xs">
                Platform
                <div onClick={onClickPlatforms} className="relative flex text-sm cursor-pointer items-center justify-between w-full px-3 py-2 bg-white rounded-lg">
                    <span className="flex items-center gap-2">
                        {platform.icon}
                        {platform.name}
                    </span>
                    <BiDownArrowAlt />
                    {listVisible && activeLink === index &&
                        <ul className="absolute bg-white flex flex-col gap-2 max-h-[195px] z-20 left-0 right-0 top-full mt-2 overflow-auto rounded-lg">
                            {platforms.map(platform => (
                                <li key={platform.name} onClick={() => handlePlatforms(platform)} className="flex items-center gap-2 px-3 py-2">
                                    {platform.icon}
                                    {platform.name}
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            </label>
            <label className="flex flex-col gap-2 text-xs">
                Link
                <div className={`${error ? "border-red-500": "border-transparent"} border px-3 py-2 bg-white flex items-center gap-2 text-sm rounded-lg relative`}>
                    <FaLink />
                    <input onBlur={urlControl} value={item.link} onChange={(e) => handleLink(e, index)} placeholder={error ? '' :'e.g. https://www.twitter.com/elonmusk'} type="text" className={`flex-1 outline-none`} />
                    {error && 
                    <span className='absolute  top-full right-0 mt-[5px] italic text-xs text-red-500'>
                        Please enter valid url!
                    </span>
                    }
                </div>
            </label>
        </li>
    )
}

export default NewLink