"use client"
import { loginSubmit } from '@/redux/User/UserSlice'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import * as yup from "yup"

const LoginForm = () => {

    const dispatch = useDispatch();

    const { isLoginned, buttonStatus } = useSelector(state => state.user);

    const router = useRouter();

    useEffect(() => {
        if (isLoginned) {
            router.push("/")
        }
    }, [isLoginned])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            dispatch(loginSubmit(values));
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .email("Please enter a valid e-mail")
                .required("Please enter your email address!"),
            password: yup.string().required("Please enter your password!"),
        }),
    });



    return (
        <div className='p-8 bg-white flex flex-col gap-6 rounded-lg'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-xl font-bold'>
                    Login
                </h2>
                <p className='text-sm'>
                    Add your details below to get back into the app
                </p>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                <label className='flex flex-col gap-2 text-sm'>
                    Email address
                    <div className='flex items-center px-2 py-1 gap-2 rounded-lg ring-[2px] ring-gray-200 focus-within:ring-primary text-base'>
                        <HiOutlineMail />
                        <input name='email' onChange={formik.handleChange} type='text' placeholder='e.g name@mail.com' className='flex-1 outline-none' />
                    </div>
                </label>
                <label className='flex flex-col gap-2 text-sm'>
                    Password
                    <div className='flex items-center px-2 py-1 gap-2 rounded-lg ring-[2px] ring-gray-200 focus-within:ring-primary text-base'>
                        <HiOutlineKey />
                        <input name='password' onChange={formik.handleChange} type='password' placeholder='●●●●●●' className='flex-1 outline-none' />
                    </div>
                </label>
                <button type='submit' disabled={buttonStatus === false ? true : false} className={`${buttonStatus === false ? "bg-opacity-50" : ""} flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-primary text-white font-bold`}>
                    {buttonStatus === false &&
                        <AiOutlineLoading3Quarters className="animate-spin " />
                    }
                    Login
                </button>
            </form>
            <div className='w-full flex items-center justify-center gap-2 text-sm'>
                Don't have an account?
                <Link href="/register" className='text-primary'>
                    Create account
                </Link>
            </div>
        </div>
    )
}

export default LoginForm