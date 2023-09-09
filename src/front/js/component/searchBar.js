import React, { useState, useEffect, useContext } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Product } from '../pages/product';
import { Context } from '../store/appContext';


export const SearchBar = () => {
    const {store, actions} = useContext(Context)
    const [text, setText] = useState('');
    const [data, setData] = useState(store.products);
    const [filtered, setFiltered] = useState([])
    const navigate = useNavigate();
    console.log(text);

    useEffect(() => {
        console.log(filtered)
    },[filtered])   

    // useEffect(() => { 
    // async function fetchSearchResults () {  //this is fetching the data for the input
    //     let info = [];
    //     const result = await fetch(process.env.BACKEND_URL + 'api/products');
    //     const data = await result.json();
    //     data.results.forEach(element => {
    //         info.push(element)      //pushing the data into the info array
    //     });

    //     setData(info)
    //     console.log(info, 'info')

    // }
    
    // fetchSearchResults()

    // }, [])

   console.log('data', store.products) 

   
   
    //fitler all names from the api object array that has the 'text' u typed 
   
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


    return(
    <div className='parentOfInput justify-content-end'>
    <form autoComplete='off'>
        <i class="fas fa-search me-2"></i>
        <input placeholder='search' type='text' value={text} onChange={(e) => filter(e.target.value) }></input>
    </form>
    
    <div className='searchDropdown' style={{width:filtered.length ? '-webkit-fill-available' : 0}}>
        {filtered.length ? filtered.map((item, index) => {
            return(
                <>
                {console.log(item)}

                <p onClick={() => {
                    if(url.includes('product')){
                        navigate(`/product/${item.id}`)
                    }
                }} >{item.title}</p>
                
                </>
            )
        }) : ''}
        
    </div>
    </div>
    )
}

// reduce function can be used instead of mapping and filter