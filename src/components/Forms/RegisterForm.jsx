"use client"
import { registerSubmit } from '@/redux/User/UserSlice'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { HiOutlineKey, HiOutlineMail, HiUser } from "react-icons/hi"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import * as yup from "yup"

const RegisterForm = () => {


    const dispatch = useDispatch();

    const {isLoginned,buttonStatus} = useSelector(state => state.user);

    const router = useRouter();

    useEffect(() => {
        if(isLoginned) {
            router.push("/")
        }
    },[isLoginned])
    
    const formik = useFormik({
        initialValues:{
            username: "",
            email: "",
            password: "",
            rePassword: ""
        },
        onSubmit: (values) => {
            dispatch(registerSubmit(values));
        },
        validationSchema: yup.object().shape({
            username: yup.string().required("Please enter a username!").min(3,"Username cannot be less than 3 characters").max(10,"Username cannot be more than 10 characters"),
            email: yup
              .string()
              .email("Please enter a valid e-mail")
              .required("Please enter your email address!"),
            password: yup.string().required("Please enter your password!").min(8,"Password must be at least 8 characters!"),
            rePassword: yup.string().required("Please enter re-password!").oneOf([yup.ref("password")], "Passwords don't match!"),
          }),
    })

    return (
        <div className='p-8 bg-white flex flex-col gap-6 rounded-lg lg:w-1/3 '>
            <div className='flex flex-col gap-4'>
                <h2 className='text-xl font-bold'>
                    Register
                </h2>
                <p className='text-sm'>
                    Let's get you started sharing your links!
                </p>
            </div>
            <form className='flex flex-col gap-6' onSubmit={formik.handleSubmit}>
                <label className='relative flex flex-col gap-2 text-sm'>
                    Username
                    <div className='flex items-center px-2 py-1 gap-2 rounded-lg ring-[2px] ring-gray-200 focus-within:ring-primary text-base'>
                        <HiUser />
                        <input type='text' onBlur={formik.handleBlur} onChange={formik.handleChange} name='username'  placeholder='e.g name' className='outline-none flex-1' />
                        {(formik.errors.username && formik.touched.username ) && 
                        <span className='absolute text-xs text-red-500 top-full right-0 mt-[6px]'>
                            {formik.errors.username}
                        </span>
                        }
                    </div>
                </label>
                <label className='relative flex flex-col gap-2 text-sm'>
                    Email address
                    <div className='flex items-center px-2 py-1 gap-2 rounded-lg ring-[2px] ring-gray-200 focus-within:ring-primary text-base'>
                        <HiOutlineMail />
                        <input type='text' onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' placeholder='e.g name@mail.com' className='outline-none flex-1' />
                        {(formik.errors.email && formik.touched.email ) && 
                        <span className='absolute text-xs text-red-500 top-full right-0 mt-[6px]'>
                            {formik.errors.email}
                        </span>
                        }
                    </div>
                </label>
                <label className='relative flex flex-col gap-2 text-sm'>
                    Password
                    <div className='flex items-center px-2 py-1 gap-2 rounded-lg ring-[2px] ring-gray-200 focus-within:ring-primary text-base'>
                        <HiOutlineKey />
                        <input type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' placeholder='At least 8 characters' className='outline-none flex-1' />
                        {(formik.errors.password && formik.touched.password ) && 
                        <span className='absolute text-xs text-red-500 top-full right-0 mt-[6px]'>
                            {formik.errors.password}
                        </span>
                        }
                    </div>
                </label>
                <label className='relative flex flex-col gap-2 text-sm'>
                    Confirm password
                    <div className='flex items-center px-2 py-1 gap-2 rounded-lg ring-[2px] ring-gray-200 focus-within:ring-primary text-base'>
                        <HiOutlineKey />
                        <input type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} name='rePassword' placeholder='At least 8 characters' className='outline-none flex-1' />
                        {(formik.errors.rePassword && formik.touched.rePassword ) && 
                        <span className='absolute text-xs text-red-500 top-full right-0 mt-[6px]'>
                            {formik.errors.rePassword}
                        </span>
                        }
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
                Already have an account?
                <Link href="/" className='text-primary'>
                    Login
                </Link>
            </div>
        </div>
    )
}

export default RegisterForm