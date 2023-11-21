import LoginForm from '@/components/Forms/LoginForm'
import Logo from '@/components/Shared/Logo'
import React from 'react'

const Login = () => {


    return (
        <div className="w-full flex flex-col gap-6 container p-3">
            <div className="h-screen flex flex-col items-center p-6 gap-8">
                <Logo />
                <LoginForm />
            </div>
        </div>
    )
}

export default Login