import React from 'react'
import Link from 'next/link'
import StoreIcon from '@mui/icons-material/Store';

function Logo() {
  return (
    <Link href={'/'} className="flex gap-1">
        <span> <StoreIcon/> </span>
        <span>Shopluxunia AdminPanel</span>
    </Link>
  )
}

export default Logo