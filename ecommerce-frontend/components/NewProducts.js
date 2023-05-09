import React from 'react'
import styled from 'styled-components'
import Center from '@/components/Center'
import ProductBox from '@/components/ProductBox'

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap:20px;
`
const Title = styled.h2`
  font-size:2rem;
  margin:30px 0 20px;
  font-weight:normal;

`

function NewProducts({products}) {
  return (
   <Center>
      <Title>New Arrivals</Title>
       <ProductGrid>
        {products?.length > 0 && products.map(product => (
          <div key={product._id}>          
            <ProductBox {...product}/>
          </div>
        ))}
      </ProductGrid>
   </Center>
  
  );
}

export default NewProducts