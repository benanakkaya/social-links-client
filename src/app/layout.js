import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from '@/redux/StoreProvider'
import { useAuth } from '@/hooks/auth'
import Login from '@/components/Login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Links',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children,params }) {


  const { isLoginned, userInformation } = await useAuth.fromServer();

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider preloadedState={{ user: { isLoginned, userInformation } }}>
          <ToastContainer />
              {children}
        </StoreProvider>
      </body>
    </html>
  )
}