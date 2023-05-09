import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Logo from '../logo';

function Nav({show}) {
    const inactiveLink = 'flex gap-1 p-1';
    const activeLink = inactiveLink+' bg-highlight text-primary rounded-sm';
    const inactiveIcon = 'w-6 h-6';
    const activeIcon = inactiveIcon+' fill-text'
    const router = useRouter();
    const {pathname} = router;

    async function logout(){
        await router.push('/');
        await signOut();
    }

  return (
    <aside className={(show ? 'left-0' : '-left-full') +
     " top-0 text-gray-900 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"}>
        <div className="mb-4 mr-4">
              <Logo />
        </div>
      
        <nav className='flex flex-col gap-2'>
            <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
            <HomeRoundedIcon className={pathname.includes('/') ? activeIcon : inactiveIcon}/>
                Dashboard
            </Link>
            <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
            <Inventory2RoundedIcon className={pathname.includes('/products') ? activeIcon : inactiveIcon}/>
                Products
            </Link>
            <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
            <FormatListBulletedRoundedIcon className={pathname.includes('/categories') ? activeIcon : inactiveIcon}/>
                Categories
            </Link>
            <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
            <ViewListRoundedIcon className={pathname.includes('/orders') ? activeIcon : inactiveIcon}/>
                Orders
            </Link>
            <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
            <SettingsIcon className={pathname.includes('/settings') ? activeIcon : inactiveIcon}/>
                Settings
            </Link>
            <button 
            onClick={() => logout()}
            className={inactiveLink}>
            <LogoutRoundedIcon/>
                Logout
            </button>
        </nav>

    </aside>
  )
}

export default Nav