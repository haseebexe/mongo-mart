import { LogIn, ShoppingCart, User } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

const Navbar = () => {

const navigate = useNavigate()
const isAuth = false;
const logoutHandler = () => { 
    alert("Logged out")
 }

  return (
    <div>
        <nav className='z-50 sticky top-0 bg-background/50 border-b backdrop-blur' >
        <div className='container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between ' >
            <div>logo here</div>
            <ul className='flex justify-center items-center space-x-6' >
                <li className='cursor-pointer' onClick={() =>  navigate("/") } >Home</li>
                <li className='cursor-pointer' onClick={() =>  navigate("/products") } >Products</li>
                <li className='cursor-pointer relative' onClick={() =>  navigate("/cart") } ><ShoppingCart/>
                    <span className='bg-red-500 text-[12px] font-bold flex justify-center items-center text-white rounded-full w-5 h-5 absolute -top-3 -right-3' >5</span>
                </li>
                <li className='cursor-pointer' >
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                {isAuth? <User/> : <LogIn/>}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                { !isAuth ? <DropdownMenuItem onClick={() => navigate('/login')} > Login </DropdownMenuItem> : <> 
                                    <DropdownMenuItem> Your Orders </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutHandler} >Logout</DropdownMenuItem>
                                    </>
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                     </li>
            </ul>
             </div>
        </nav>
    </div>
  )
}

export default Navbar