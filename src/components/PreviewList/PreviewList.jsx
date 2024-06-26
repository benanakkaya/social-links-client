import Image from 'next/image'
import React from 'react'
import { MdEmail } from 'react-icons/md'
import LinkItem from '../MobileMockup/components/LinkItem'
import { platforms } from '../LinkList/LinkList'
import defaultPP from "../../../public/default_pp.png"

const PreviewList = ({userInformation}) => {

  return (
    <div style={{borderColor:userInformation.profileColor}} className='w-full md:w-2/3 bg-white rounded-lg flex flex-col gap-4 items-center p-6     md:p-8 border-2 '>
                <Image className='rounded-full w-32 h-32' alt={userInformation.username} width={360} height={360} src={userInformation.profilePicture ? userInformation.profilePicture : defaultPP} />
                <div className='w-full flex items-center justify-center font-bold text-xl'>
                    {userInformation.firstName}
                    {" "}
                    {userInformation.lastName}
                </div>
                {!userInformation.isHiddenEmail && 
                <div className='w-full flex items-center justify-center gap-1 font-bold text-sm'>
                    <MdEmail />
                    {userInformation.email}
                </div>
                }
                <ul className=' flex flex-col items-center gap-[20px] w-full px-4 md:px-8'>
                    {userInformation.links.map((item, index) => (
                        <LinkItem key={index} platforms={platforms} item={item} />
                    ))}
                </ul>
            </div>
  )
}

export default PreviewList