import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from '@/redux/StoreProvider'
import { useAuth } from '@/hooks/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import store from '@/redux/store'
import { setUserInformation } from '@/redux/User/UserSlice'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Links',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {


  const { isLoginned, userInformation } = await useAuth.fromServer();

  store.dispatch(setUserInformation(userInformation));

  return (
    <html lang="en">
      <body style={{backgroundColor: "#EEE"}} className={inter.className}>
        <StoreProvider preloadedState={{ user: { isLoginned, userInformation } }}>
          <ToastContainer />
              {children}
        </StoreProvider>
      </body>
    </html>
  )
}
