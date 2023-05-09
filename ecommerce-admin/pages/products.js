import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout/Layout'
import Link from 'next/link'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    })
  }, []);
  return (
    <Layout>
        <Link className='btn-primary' href={'/products/newproduct'}>
          Add new product <AddRoundedIcon/>
        </Link>
        <table className="basic mt-2 ">
          <thead>
            <tr>
              <td>Product name</td>
              <td>Available</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.amount}</td>
                <td>                  
                  <Link href={'/products/editProduct/'+product._id}
                    className='btn-default'
                  >
                    <BorderColorRoundedIcon fontSize='small'/>
                    Edit
                  </Link>
                  <Link 
                   href={'/products/deleteProduct/'+product._id}
                   className='btn-red'
                   >
                    <DeleteRoundedIcon fontSize='small'/>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </Layout>
  )
}

export default Products