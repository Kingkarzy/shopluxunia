import React, { useContext, useEffect, useState } from 'react'
import Header from '@/components/Header'
import styled from 'styled-components'
import Center from '@/components/Center'
import Button from '@/components/Button'
import { CartContext } from '@/components/CartContext'
import axios from 'axios'
import Table from '@/components/Table'
import Input from "@/components/Input";
import {useFlutterwave,closePaymentModal} from "flutterwave-react-v3";

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr 0.7fr; 
    gap:40px;
    margin-top:40px; 
`
const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`
const ProductInfoCell = styled.td`
   padding: 10px 0;
   border-top: 1px solid rgba(0, 0, 0, .1)
`
const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display:flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    img{
        max-width: 80px;
        max-height:80px;
    }
`
const QuantityLabel = styled.span`
    padding: 0 3px;
    display: block;
`
const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;
const PaymentButton = styled.div`
    margin-top: 10px;
`


function CartPage() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        if (cartProducts.length > 0) {
          axios.post('/api/cart', {ids:cartProducts})
            .then(response => {
              setProducts(response.data);
            })
        } else {
          setProducts([]);
        }
      }, [cartProducts]);


    function moreOfThisProduct(id){
        addProduct(id);
    }
    function lessOfThisProduct(id){
        removeProduct(id);
    }
       

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
      }
    
    
    //FLUTTERWAVE PAYMENT 
       const config = {
        public_key: process.env.FLW_PUBLIC_KEY ?? "FLWPUBK_TEST-bef33f43394a34d5aff109965b84312f-X",
        tx_ref: Date.now(),
        amount: total ?? 0,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd,banktransfer',
        customer: {
            email: email ?? '',
            phone_number: phone ?? 0,
            name: name ?? '',
        },
        customizations: {
            title: 'Shopluxunia',
            description: 'Payment for items in cart',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };
    
    const handleFlutterPayment = useFlutterwave(config);


    async function afterPayment() {
        setPaid(true);
        setIsSuccess(true);
        clearCart();
        const response = await axios.post('/api/checkout', {
            name,email,phone,city,postalCode,streetAddress,country,paid,
            cartProducts,
        });
        console.log(response + "order updated");       
    }

       
    if (isSuccess) {
        return (
          <>
            <Header />
            <Center>
              <ColumnWrapper>
                <Box>
                  <h1>Thanks for your order!</h1>
                  <p>We will email you when your order will be sent.</p>
                </Box>
              </ColumnWrapper>
            </Center>
          </>
        );
      }

  return (
    <>
        <Header/>
        <Center>
            <ColumnWrapper>
                <Box>
                <h2>Cart</h2>
                    {!cartProducts?.length && (
                        <div> Your cart is empty</div>
                    )}  
                    {products?.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quatity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {products.map(product => (
                                <tr key={product._id}>
                                    <ProductInfoCell>
                                        <ProductImageBox>
                                            <img src={product.images[0]} alt='' />
                                        </ProductImageBox>
                                        {product.title}
                                    </ProductInfoCell>
                                    <td> 
                                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                        <QuantityLabel>
                                            {cartProducts.filter(id => id === product._id).length}
                                        </QuantityLabel>
                                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                    </td>
                                    <td>
                                    ₦ {cartProducts.filter(id => id === product._id).length * product.price}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>₦ {total} </td>
                            </tr>
                        </tbody>
                       
                        <Button onClick={clearCart}>
                         Empty cart
                        </Button>
                    </Table> 
                    
                    )}  
                               
                </Box>
                    {!!cartProducts?.length && (
                    <Box>
                        <h2>Order information</h2>
                            <Input type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={ev => setName(ev.target.value)} />
                            <Input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={ev => setEmail(ev.target.value)}/>
                            <Input type="number"
                                placeholder="Phone"
                                value={phone}
                                name="phone"
                                onChange={ev => setPhone(ev.target.value)}/>
                            <CityHolder>
                            <Input type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)}/>
                            <Input type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)}/>
                            </CityHolder>
                            <Input type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={ev => setStreetAddress(ev.target.value)}/>
                            <Input type="text"
                                placeholder="Country"
                                value={country}
                                name="country"
                                onChange={ev => setCountry(ev.target.value)}/>
                           
                            <PaymentButton>
                                <Button
                                    black
                                    block
                                    size='m'
                                    onClick={() =>
                                        handleFlutterPayment({
                                          callback: (response) => {
                                            console.log(response);
                                            if(response.status === "successful"){
                                                afterPayment();
                                            }
                                            closePaymentModal();
                                          },
                                          onClose: () => {},
                                        })
                                      }
                                >
                                    Continue to payment
                                </Button>
                            </PaymentButton>
                    </Box>
                )}
               
            </ColumnWrapper>
        </Center>
    </>
  )
}

export default CartPage