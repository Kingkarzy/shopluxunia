import { useEffect, useState } from "react"
import styled from "styled-components"



const StyledCurrency =  styled.span`
    font-weight: inherit;
`

function Currency(props) {
    const [currency, setCurrency] = useState('');
    const [currencies, setCurrencies] = useState(['₦', '$', '¥', 'CA$', '£', '€', '₿', '₮']);

    useEffect(() => {
        setCurrency({...prev});
    }, [currency]);
  return (
    <StyledCurrency {...props}> {currency} </StyledCurrency>
  )
}

export default Currency