import React, { useState, useEffect, useContext } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { Product } from '../pages/product';
import { Context } from '../store/appContext';
import { useRef } from 'react';





export const SearchBar = () => {
    const {store, actions} = useContext(Context)
    const [text, setText] = useState('');
    const [filtered, setFiltered] = useState([])
    const [theDefault, setTheDefault] = useState(true)
    const refInput = useRef(null)
    const [showDropdown , setShowDropdown] = useState(true)
    console.log(text);

    
    
    




     // Event listener to close the dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (refInput.current && !refInput.current.contains(event.target)) {
          setShowDropdown(false);
        }
      }

      const handleClickInside = (event) => {
        if(!refInput.current && refInput.current.contains(event.target)){
          setShowDropdown(true)
          filtered(text.length)
        }
      }
      
      


      if(document.addEventListener('mousedown', handleClickOutside))
      return () => {
        (setShowDropdown(false))
      };

      else if (document.addEventListener('mousedown', handleClickInside))
        return () => {
          setShowDropdown(true)
        };
    }, [showDropdown]);



    //fitler all names from the api object array that has the 'text' u typed
    //appContext has a fetch product function for all pages 
    
   
   const filter = (value) => {
        let filtered = store.products.filter(ProductTitle => {
        return ProductTitle.title.toLowerCase().includes(value.toLowerCase())
   })
        setText(value)
        if(value.length == 0){
            setShowDropdown(false)
        }
        setFiltered(filtered)
   }

   console.log('text', text)


    return(
    
    <>
    
    <div className='d-flex parentOfInput justify-content-center'  >
        <input placeholder='search' 
        className='w-100'
               type='text' ref={refInput} 
               value={text} 
               onChange={(e) => filter(e.target.value) } 
               onClick={() => setShowDropdown(true)} 
               id='search'></input>
    

    
    <div className='searchDropdown' >
        { showDropdown && text.length > 0 && filtered?.map((item, index) => {
            return(
                // <>
                // {console.log(item)}

                <Link to={`/products/${item.id}`} style={{textDecoration: 'none'}}>
                    <p className='dropResults' key = {index} ref={refInput} >
                    {item.title}
                    </p>
                </Link>
                
                //{/* </> */}
                )
        })}
        
    </div>
    </div> 
    </>
    )
}

// reduce function can be used instead of mapping and filter