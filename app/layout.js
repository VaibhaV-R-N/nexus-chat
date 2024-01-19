import { Ubuntu } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Background from '@/components/Background'
import StoreProvider from '@/reduxStore/StoreProvider'
import MuiThemeProvider from '@/components/MuiThemeProvider'
import MuiDrawer from '@/components/MuiDrawer'
import SocketProvider from '@/context/SocketProvider'
import Username from '@/components/Username'
import Notification from '@/components/Notification'
const ubuntu = Ubuntu({ subsets: ['latin'],weight:["300","400","500","700"] })

export const metadata = {
  title: 'Nexus Chat - Seamless Communication with Public and Private Rooms',
  description: 'Join Nexus Chat, your go-to platform for engaging online conversations. Experience the camaraderie of our lively public room or create your private enclave for more intimate discussions. With Nexus Chat, your digital communication experience is elevated to a new level. Join us now and connect with others in a secure and customizable environment.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <StoreProvider>
    <SocketProvider>
    <MuiThemeProvider>
    
      <body className={ubuntu.className}>
      <Background/>
        <Navbar/>
        <MuiDrawer/>
        <Notification/>
        <Username/>
        {children}
        </body>
    </MuiThemeProvider>
    </SocketProvider>
    </StoreProvider>
    </html>
  )
}
