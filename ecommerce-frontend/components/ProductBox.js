import React, { useContext } from 'react'
import styled from 'styled-components'
import Button from './Button'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import Link from "next/link";
import { CartContext } from './CartContext';

const ProductWrapper = styled.div`

`

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding:20px;
    height:120px;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 10px;
    img{
        max-width: 100%;
        max-height:80px;
    }
`

const Title = styled(Link)`
    font-weight: normal;
    font-size:0.9rem;
    margin:0;
    color: inherit;
    text-decoration:none;
`
const ProductInfoBox = styled.div`
    margin-top: 5px;
`
const PriceRow = styled.div`
    display: flex;
    align-items:center;
    justify-content:space-between;
    margin-top: 2px;
    gap:10px;
`
const Price = styled.div`
    font-size:1.3rem;
    font-weight:600;
`

function ProductBox({_id, title, description, price, images}) {
    const url = '/product/'+_id;
    const {addProduct} = useContext(CartContext);
    return (
    <ProductWrapper>
        <WhiteBox href={url}>
            <div>
                <img src={images[0]} alt=''/>
            </div>
        </WhiteBox>
        <ProductInfoBox >
            <Title href={url}> {title}</Title>
            <PriceRow>
                <Price>
                ₦{price}
                </Price>
                <Button onClick={() => addProduct(_id)} primary outline>
                    Add to cart
                </Button>
            </PriceRow>
        </ProductInfoBox>
    </ProductWrapper>
   
  )
}

export default ProductBox