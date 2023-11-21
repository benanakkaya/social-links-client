import RegisterForm from '@/components/Forms/RegisterForm'
import Logo from '@/components/Shared/Logo'
import React from 'react'

const RegisterPage = () => {


  return (
    <div className="h-screen flex flex-col items-center p-6 gap-8">
      <Logo />
      <RegisterForm />
    </div>
  )
}

export default RegisterPage