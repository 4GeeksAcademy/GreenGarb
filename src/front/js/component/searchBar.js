import React, { useState, useEffect, useContext } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { Product } from '../pages/product';
import { Context } from '../store/appContext';




export const SearchBar = () => {
    const {store, actions} = useContext(Context)
    const [text, setText] = useState('');
    const [data, setData] = useState(store.products);
    const [filtered, setFiltered] = useState([])
    const navigate = useNavigate();
    console.log(text);


   
    //fitler all names from the api object array that has the 'text' u typed
    //appContext has a fetch product function for all pages 
   
   const filter = (value) => {
        let filtered = store.products.filter(ProductTitle => {
        return ProductTitle.title.toLowerCase().includes(value.toLowerCase())
   })
        setText(value)
        if(value.length == 0){
            setFiltered([])
        }
        setFiltered(filtered)
   }

   console.log('text', text)


    return(
    <div className='parentOfInput justify-content-end'>
    <form className='d-flex' autoComplete='off'>
        <input placeholder='search' type='text' value={text} onChange={(e) => filter(e.target.value) }></input>
    </form>
    
    <div className='searchDropdown' style={{width:filtered.length ? '-webkit-fill-available' : 0}}>
        {filtered.length ? filtered.map((item, index) => {
            return(
                <>
                {console.log(item)}

                <Link to={`/products/${item.id}`} style={{textDecoration: 'none'}}>
                    <p className='dropResults'>
                    {item.title}
                    </p>
                </Link>
                
                </>
                )
        }) : ''}
        
    </div>
    </div>
    )
}

// reduce function can be used instead of mapping and filter