import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router';
import { Product } from '../pages/product';


export const SearchBar = () => {
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    console.log(text);


    useEffect(() => { 
    async function fetchProducts () {  //this is fetching the data for the input
        let info = [];
        const result = await fetch('https://fictional-space-meme-vgj9r5qpp4v26g4r-3001.app.github.dev/api/product');
        const data = await result.json();
        data.results.forEach(element => {
            info.push(element)      //pushing the data into the info array
        });

        setData(info)
        console.log(info, 'info')

    }
    
        fetchProducts()

    }, [])

   console.log('data', data) 
    //fitler all names from the api object array that has the 'text' u typed 
   let filtered = data.filter(ProductTitle => {
        return ProductTitle.title.includes(text)
   })

    return(
    <div className='parentOfInput justify-content-end'>
    <form autoComplete='off'>
        <i class="fas fa-search me-2"></i>
        <input placeholder='search' type='text' value={text} onChange={(e) => setText(e.target.value) }></input>
    </form>
    
    <div className='dropdown'>
        {text.length ? filtered.map((item, index) => {
            return(
                <>
                {console.log(item)}

                <p onClick={() => {
                    let url = item.url;
                    let id = item.uid
                    if(url.includes('people')){
                        navigate(`/CharacterDescription/${id}`)
                    }
                    if(url.includes('planets')){
                        navigate(`/PlanetDescription/${id}`)
                    }
                    if(url.includes('vehicles')){
                        navigate(`/VehicleDescription/${id}`)
                    }
                    if(url.includes('product')){
                        navigate('/product/' + index)
                    }
                }} >{item.name}</p>
                
                </>
            )
        }) : ''}
        
    </div>
    </div>
    )
}

// reduce function can be used instead of mapping and filter