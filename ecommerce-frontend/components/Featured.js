import React, { useContext } from 'react'
import Center from './Center'
import styled from 'styled-components'
import Button from './Button'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ButtonLink from './ButtonLink'
import { CartContext } from './CartContext';

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size:3rem;
`
const Desc = styled.p`
    color:#aaa;
    font-size:.8rem;
`
const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap:40px;
    img{
        max-width:100%;
    }
`;
const Column = styled.div`
   display:flex;
   align-items:center; 
` 
const ButtonWrapper = styled.div`
    display:flex;
    gap:10px;
    margin-top: 35px;
`

function Featured({product}) {
    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart() {
        addProduct(product._id);
    }
  return (
    <Bg>
        <Center>
            <ColumnWrapper>
                <Column>
                   <div>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.description}
                    </Desc>
                    <ButtonWrapper>
                        <ButtonLink href={'/products/'+product._id} outline={1} white={1} size="l">Read more</ButtonLink>
                        <Button white size="l" onClick={addFeaturedToCart}>
                            <AddShoppingCartRoundedIcon fontSize='small'/>
                            Add to cart
                        </Button>
                    </ButtonWrapper>
                   </div>
                </Column>

                <Column>
                    <img 
                        src='https://pngimg.com/uploads/iphone_14/iphone_14_PNG14.png'
                        alt=''
                    />
                </Column>
            </ColumnWrapper>
        </Center>
    </Bg>
  )
}

export default Featured