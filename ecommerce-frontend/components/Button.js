import React from 'react'
import styled, {css} from 'styled-components'
import { primary } from '@/lib/colors';

export const ButtonStyle = css`
  border:0;
  padding:5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display:inline-flex;
  align-items: center;
  text-decoration:none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  ${props => props.white && !props.outline && css`
    background-color: #fff
    color:#000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color:#fff;
    border: 1px solid #fff;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    color:#5542F6;
    border: 1px solid ${primary};
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    color:#fff;
    border: 1px solid ${primary};
  `}
  ${props => props.black && !props.outline && css`
    background-color:#000;
    color:#fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color:#000;
    border: 1px solid #000;
  `}
  ${props => props.block && css`
    display:block;
    width:100%;
  `}
  ${props => props.size === 'l' && css`
      font-size:1rem;
      padding:10px 20px;
  `}
  ${props => props.size === 'm' && css`
    font-size:.8rem;
    padding:10px 20px;
  `}
`;
const StyledButton = styled.button`
   ${ButtonStyle}
`;

function Button({children, ...rest}) {
  return (
    <StyledButton {...rest}>
        {children}
    </StyledButton>
  )
}

export default Button