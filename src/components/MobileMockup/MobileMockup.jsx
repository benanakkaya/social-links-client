"use client"
import React, { useEffect, useState } from 'react'
import { platforms } from '../LinkList/LinkList'
import { useSelector } from 'react-redux'
import LinkItem from './components/LinkItem'


const MobileMockup = () => {

    const [preview, setPreview] = useState(null);

    const { userInformation, newProfilePicture } = useSelector(state => state.user);

    const readImage = () => {
        if (newProfilePicture) {
            const reader = new FileReader();
            reader.readAsDataURL(newProfilePicture);
            reader.onload = () => {
                setPreview(reader.result)
            }
        }
    }

    useEffect(() => {
        if (userInformation.profilePicture) {
            setPreview(null)
        }
        readImage();
    }, [newProfilePicture, userInformation])


    return (
        <div className="col-span-3 md:col-span-1 bg-white p-8 rounded-lg">
            <div className="w-full h-full relative flex items-center justify-center bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632">
                    <path
                        stroke="#737373"
                        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z" />
                    <path fill="#fff"
                        stroke="#737373"
                        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z" />
                    {(userInformation.profilePicture || preview) ?
                        <foreignObject x="29" y="70" width="250" height="100">
                            <div className='w-full flex items-center justify-center'>
                                {preview ?
                                    <img src={preview} alt="preview" className='rounded-full w-[96px] h-[96px]' />
                                    :
                                    <img src={userInformation.profilePicture} alt="preview" className='rounded-full w-[96px] h-[96px]' />
                                }
                            </div>
                        </foreignObject>
                        :
                        <circle cx="153.5" cy="112" r="48" fill="#EEE" />
                    }
                    {(userInformation.firstName || userInformation.lastName) ?
                        <foreignObject x="29" y="185" width="250" height="20">
                            <span className='w-full flex flex-rwap items-center justify-center gap-2 text-sm font-bold'>
                                {userInformation.firstName}{" "}{userInformation.lastName}
                            </span>
                        </foreignObject>
                        :
                        <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
                    }
                    {userInformation.email ?
                        <foreignObject x="29" y="214" width="250" height="20">
                            <span className='w-full flex items-center justify-center gap-2 text-xs'>
                                {userInformation.email}
                            </span>
                        </foreignObject>
                        :
                        <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
                    }
                    {userInformation.links.length === 0 ?
                        <>
                            <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" />
                            <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
                            <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
                            <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
                            <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" />
                        </>
                        :
                        <foreignObject className='no-scrollbar flex items-center justify-center overflow-auto' y="278" height="300" width="250" x="29">
                            <ul className=' flex flex-col items-center gap-[20px] overflow-auto '>
                                {userInformation.links.map((item, index) => (
                                    <LinkItem key={index} platforms={platforms} item={item} />
                                ))}
                            </ul>
                        </foreignObject>
                    }
                </svg>
            </div>
        </div>
    )
}

export default MobileMockup