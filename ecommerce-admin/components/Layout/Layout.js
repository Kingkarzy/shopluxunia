import Nav from "@/components/Navbar/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from "react";
import Logo from "../logo";


export default function Layout({children}) {
  const [showNav, setShowNav] = useState(false);

  const { data: session } = useSession()
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center ">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg"> Login with Google </button>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-bgGray min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button 
          onClick={() => setShowNav(true)}>
          <MenuRoundedIcon fontSize='medium'/>
        </button>
        <div className="flex grow justify-center mr-6">
        <Logo />
        </div>  
      </div>
      <div className="bg-bgGray min-h-screen flex">
        <Nav show={showNav}/>
        <div className=" flex-grow p-4">
          {children}
        </div> 
      </div>
    </div>

   
  )
}
