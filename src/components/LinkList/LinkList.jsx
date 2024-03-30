"use client"
import React, { useState } from 'react'
import { FaInstagram, FaPinterest, FaSpotify, FaTwitch, FaVk, FaTwitter, FaYoutube, FaLinkedin, FaReddit, FaSkype, FaFacebook } from "react-icons/fa"
import NewLink from '../Forms/NewLink'
import { useSelector } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { setIsChanged, swapLinks } from '@/redux/User/UserSlice'
import EmptyList from './components/EmptyList'

export const platforms = [
    {
        id: 1,
        name: "Twitter",
        bgcolor: "bg-[#1da1f2]",
        textcolor: "text-[#ffffff]",
        icon: <FaTwitter />
    },
    {
        id: 2,
        name: "Youtube",
        bgcolor: "bg-[#ff0000]",
        textcolor: "text-[#ffffff]",
        icon: <FaYoutube />
    },
    {
        id: 3,
        name: "Instagram",
        bgcolor: "bg-[#c32aa3]",
        textcolor: "text-[#ffffff]",
        icon: <FaInstagram />
    },
    {
        id: 4,
        name: "Linkedin",
        bgcolor: "bg-[#0a66c2]",
        textcolor: "text-[#ffffff]",
        icon: <FaLinkedin />
    },
    {
        id: 5,
        name: "Pinterest",
        bgcolor: "bg-[#bd081c]",
        textcolor: "text-[#ffffff]",
        icon: <FaPinterest />
    },
    {
        id: 6,
        name: "Reddit",
        bgcolor: "bg-[#ff4500]",
        textcolor: "text-[#ffffff]",
        icon: <FaReddit />
    },
    {
        id: 7,
        name: "Twitch",
        bgcolor: "bg-[#9146ff]",
        textcolor: "text-[#f0f0ff]",
        icon: <FaTwitch />
    },
    {
        id: 8,
        name: "Spotify",
        bgcolor: "bg-[#1ed760]",
        textcolor: "text-[#ffffff]",
        icon: <FaSpotify />
    },
    {
        id: 9,
        name: "Skype",
        bgcolor: "bg-[#00aff0]",
        textcolor: "text-[#ffffff]",
        icon: <FaSkype />
    },
    {
        id: 10,
        name: "VK",
        bgcolor: "bg-[#4a76a8]",
        textcolor: "text-[#edeef0]",
        icon: <FaVk />
    },
    {
        id: 11,
        name: "Facebook",
        bgcolor: "bg-[#316FF6]",
        textcolor: "text-[#edeef0]",
        icon: <FaFacebook />
    },
]

const LinkList = () => {

    const [activeLink, setActiveLink] = useState(null);

    const { userInformation } = useSelector(state => state.user)

    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        const links = [...userInformation.links];
        const [removedItem] = links.splice(result.source.index, 1)
        links.splice(result.destination?.index, 0, removedItem);
        dispatch(swapLinks(links))
        dispatch(setIsChanged(true));
    }

    return (
        <div className='flex-1 overflow-y-auto'>
            {userInformation.links?.length > 0 ?
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId={userInformation.id}>
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col flex-1 gap-4 w-full  links">
                                {userInformation.links?.map((item, index) => (
                                    <Draggable key={item._id ? item._id : "1"} draggableId={item._id ? item._id : "1"} index={index}>
                                        {(provided) => (
                                            <NewLink setIsChanged={setIsChanged} provided={provided} activeLink={activeLink} setActiveLink={setActiveLink} platforms={platforms} item={item} index={index} />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                :
                <EmptyList />
            }
        </div>
    )
}

export default LinkList