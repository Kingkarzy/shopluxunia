import Layout from '@/components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { withSwal } from 'react-sweetalert2';

function CategoriesPage({swal}) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState([]);

    useEffect(() => {
       fetchCategories();
    }, []);

    function fetchCategories(){
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }
    async function saveCategory(ev){
       ev.preventDefault();
       const data = {
        name, 
        parentCategory, 
        properties:properties.map(p => ({
            name:p.name, 
            values:p.values.split(','),
        })),
        };

       if(editedCategory){
        data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
       }else{
            await axios.post('/api/categories', data);
       }
       
       setName('');
       setParentCategory(''); 
       setProperties([]);
       fetchCategories();
    }
    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);  
        setProperties(category.properties.map(({name,values}) => ({
                name, 
                values:values.join(',')
            })));      
    }
    function deleteCategory(category){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete', 
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then( async result => {
            console.log({result});
            if(result.isConfirmed){
                const {_id} = category;
                await axios.delete('/api/categories?_id='+_id);
                fetchCategories();
            }
        });
    }
    function addProperty(){
        setProperties(prev => {
            return [...prev, {name:'', values:''}]
        });
    }
    function handlePropertyNameChange(index, property, newName){
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }
    function handlePropertyValuesChange(index, property, newValue){
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValue;
            return properties;
        });
    }
    function removeProperty(indexToRemove){
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            })
        });
    }

  return (
    <Layout>
        <h1>Categories</h1>
         <label>
            {editedCategory ? 
                `Edit category ${editedCategory.name}` : 
                'Create category'}
        </label> 
         <form onSubmit={saveCategory} className="">
         <div className="flex gap-1">
            <input 
                className=''
                type="text" 
                value={name}
                onChange={ev => setName(ev.target.value)}
                placeholder={'Category name'} 
                />
            <select className='' 
                value={parentCategory}
                onChange={ev => setParentCategory(ev.target.value)}>
                    <option value= "nil">No parent category</option>
                   
                    {categories.length > 0 && categories.map(category => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                    ))}
            </select>
         </div>
         <div className="mb-2">
            <label className="block">Properties</label>
            <button 
                onClick={addProperty}
                type="button" 
                className="btn-default text-sm mb-2"
                >
                Add new property
            </button>
            {properties.length > 0 && properties.map((property, index) => (
                <div className="flex gap-1 mb-2">
                    <input 
                        type="text" 
                        className="mb-0" 
                        value={property.name}
                        onChange={ev => 
                            handlePropertyNameChange(
                                index, 
                                property, 
                                ev.target.value)}
                        placeholder='property name (example: color)' />
                    <input 
                        type="text" 
                        className="mb-0"
                        onChange={ev => 
                            handlePropertyValuesChange(
                                index, 
                                property, 
                                ev.target.value)}
                        value={property.values}
                        placeholder='values, comma seperated'/>

                        <button 
                            onClick={() => removeProperty(index)}
                            className='btn-red'>
                                Remove
                        </button>
                </div>
            ))}
         </div>
         <div className="flex gap-1">
         {editedCategory && (
            <button 
                onClick={() => {
                    setEditedCategory(null); 
                    setName('');
                    setParentCategory('');
                    setProperties([]);
                }} 
                className='btn-red'>
                Cancel
            </button>
         )}
             <button
                type={'submit'}
                className='btn-primary py-1'
            >Save</button>
         </div>                         
        </form>
        {!editedCategory && (
             <table className='basic mt-4'>
             <thead>
                 <tr>
                     <td>Category name</td>
                     <td>Parent Category</td>
                     <td></td>
                 </tr>
             </thead>
             <tbody>
                 {categories.length > 0 && categories.map(category => (
                 <tr key={category._id}>
                     <td>{category.name}</td>
                     <td>{category?.parent?.name}</td>
                     <td>                  
                     <button 
                         className='btn-default mr-1'
                         onClick={() => editCategory(category)}
                     >
                         <BorderColorRoundedIcon fontSize='small'/>
                         Edit
                     </button>
                     <button  className='btn-red'
                     onClick={() => deleteCategory(category)}
                     >
                         <DeleteRoundedIcon fontSize='small'/>
                         Delete
                     </button>
                 </td>
                 </tr>
                 ))}
             </tbody>
         </table>
        )}      
    </Layout> 
  )
}

export default withSwal(({swal}, ref) => (
    <CategoriesPage swal={swal}/>
));