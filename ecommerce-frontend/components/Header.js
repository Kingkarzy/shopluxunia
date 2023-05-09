import Link from 'next/link'
import React, { useContext } from 'react'
import styled from 'styled-components';
import Center from './Center';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from './CartContext';

const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    color:#fff;
    text-decoration:none;
    font-size:1.2rem;
`;

const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
    padding:20px 0;
`;
const StyledNav = styled.nav`
    display:inline-flex;
    gap:15px;
`
const NavLink = styled(Link)`
    color: #aaa;
    text-decoration: none;
    padding:0;
`
const LinkItem = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    gap:2px
`


function Header() {
    const {cartProducts} = useContext(CartContext)
  return (
    <StyledHeader>
        <Center>
        <Wrapper>
            <Logo href={'/'}>Shopluxunia</Logo>
            <StyledNav>
                <NavLink href={'/'}>
                    <LinkItem>
                        <HomeRoundedIcon fontSize='small'/>
                        <div>Home</div>
                    </LinkItem>
                </NavLink>
                <NavLink href={'/products'}>
                    <LinkItem>
                        <FormatListBulletedRoundedIcon fontSize='small'/>
                        <div>All products</div>
                    </LinkItem>
                </NavLink>
                <NavLink href={'/categories'}>
                    <LinkItem>
                        <CategoryRoundedIcon fontSize='small'/>
                        <div>Category</div>
                    </LinkItem>
                </NavLink>
                <NavLink href={'/account'}>
                    <LinkItem>
                        <ManageAccountsRoundedIcon fontSize='small'/>
                        <div>Account</div>
                    </LinkItem>
                </NavLink>
                <NavLink href={'/cart'}>
                    <LinkItem>
                        <ShoppingCartIcon fontSize='small'/>
                        <div>Cart ({cartProducts.length})</div> 
                    </LinkItem>
                </NavLink>
            </StyledNav>
        </Wrapper>
        </Center>
    </StyledHeader>
  )
}

export default Header