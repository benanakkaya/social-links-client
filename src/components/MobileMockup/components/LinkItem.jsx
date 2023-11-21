"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const LinkItem = ({platforms,item}) => {

    const [platform,setPlatform] = useState({textcolor:"",bgcolor:"",icon:"",name:""});

    useEffect(() => {
        const platform = platforms.find((platform) => platform.name === item.platform)
        setPlatform(platform)
    },[item])

  return (
    <li className='w-full'>
      <Link href={item.link} target='_blank' className={`h-[44px] w-full flex items-center justify-center gap-3 rounded-lg ${platform.bgcolor} ${platform.textcolor} `}>
        {platform.icon}
        {platform.name}
        </Link>
    </li>
  )
}

export default LinkItem