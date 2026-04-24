import { LogIn, ShoppingCart, User } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {

const navigate = useNavigate()
const isAuth = false;
const logoutHandler = () => { 
    alert("Logged out")
 }

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur'>
      <div className='container mx-auto flex flex-col items-center justify-between px-6 py-4 sm:flex-row'>
        <div className='cursor-pointer' onClick={() => navigate('/')}>logo here</div>
        <ul className='flex items-center justify-center space-x-6'>
          <li className='cursor-pointer' onClick={() => navigate("/")}>Home</li>
          <li className='cursor-pointer' onClick={() => navigate("/products")}>Products</li>
          <li className='relative cursor-pointer' onClick={() => navigate("/cart")}><ShoppingCart/>
            <span className='absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[12px] font-bold text-white'>5</span>
          </li>
          <li className='cursor-pointer'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {isAuth ? <User/> : <LogIn/>}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {!isAuth ? <DropdownMenuItem onClick={() => navigate('/login')}> Login </DropdownMenuItem> : <>
                  <DropdownMenuItem> Your Orders </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                </>}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <ModeToggle/>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
