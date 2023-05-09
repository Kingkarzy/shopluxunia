import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { useRouter } from 'next/router';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import Spinners from './Spinners';
import {ReactSortable} from 'react-sortablejs';


function ProductForm( {
    _id, 
    title:existingTitle, 
    description:existingDescription, 
    price:existingPrice, 
    amount:existingAmount,
    images:existingImages, 
    category:existingCategory,
    properties:existingProductProperties,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [amount, setAmount] = useState(existingAmount || '');
    const [productProperties, setProductProperties] = useState(existingProductProperties || {});
    const [category, setCategory] = useState(existingCategory || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);

    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, [])

    //save and edit a product
    async function saveProduct(ev){
        ev.preventDefault();
        const data = {
                    title, 
                    description,
                    price, 
                    amount, 
                    images, 
                    category, 
                    properties:productProperties,}
        if(_id){
            //update
            await axios.put('/api/products', {...data, _id});
        }else{
            //create
            await  axios.post('/api/products', data );
        }
        setGoToProducts(true);
        }

    if (goToProducts){
        router.push('/products')
    }
    //upload
    async function uploadImages(ev){
        const files = ev.target?.files;
        if (files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data);
            //  console.log(res.data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(){
        setImages(images);
    }
    function setProductProp(propName, value){
        setProductProperties(prev => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        })
    }
    
    const propertiesToFill = [];
    if(categories.length > 0 && category){
        let categoryInfo = categories.find(({_id}) => _id === category);
        propertiesToFill.push(...categoryInfo.properties);
        while(categoryInfo?.parent?._id){
            const parentCat = categories.find(({_id}) => _id === categoryInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            categoryInfo = parentCat;
        }
    }

   return (
    <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input 
            type="text" 
            placeholder="product name"
            value={title} 
            onChange={ev => setTitle(ev.target.value)}
        />
        <label> Category   </label>
        <select value={category}
                onChange={ev => setCategory(ev.target.value)}>
          <option value="">Uncategorized</option>
          {categories.length > 0 && categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        {propertiesToFill.length > 0 && propertiesToFill.map(p => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <div>
              <select value={productProperties[p.name]}
                      onChange={ev =>
                        setProductProp(p.name,ev.target.value)
                      }
              >
                {p.values.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <label>
            Photos
        </label>
        
        <div className='mb-2 flex flex-wrap gap-1'>
        <ReactSortable 
           className='flex flex-wrap gap-1'
           list={images} 
           setList={updateImagesOrder}>

           {!!images?.length && images.map(link => (
              <div key={link} className="h-24 cursor-pointer bg-white p-3 shadow-sm rounded-sm border border-gray-200">
                <img src={link} alt="" className="rounded-lg" />
              </div>
           ))}
        </ReactSortable>
           {isUploading && (
            <div className="h-24 flex items-center">
                <Spinners />
            </div>
           )}
            <label 
                className='w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-lg bg-white shadow-sm border border-primary'>
                <UploadRoundedIcon/>
                <div>Add image</div>
                <input type="file" onChange={uploadImages} className="hidden" />
            </label>
        </div>

        <label>Description</label>
        <textarea 
            placeholder="description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}/>

        <label>Price (USD)</label>
        <input 
            type="number" 
            placeholder="price" 
            value={price}
            onChange={ev => setPrice(ev.target.value)}
        />

        <label>Amount</label>
        <input 
            type="number" 
            placeholder="amount" 
            value={amount}
            onChange={ev => setAmount(ev.target.value)}
        />
        
        <button
            type='submit' 
            className='btn-primary'>
                Save 
                <SaveRoundedIcon fontSize='small ml-1'/>
        </button>
    </form>
    )    
}

export default ProductForm