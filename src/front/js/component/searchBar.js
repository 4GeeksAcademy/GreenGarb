import React, { useState, useEffect, useContext } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { Product } from '../pages/product';
import { Context } from '../store/appContext';
import { useRef } from 'react';
import Turnstone from 'turnstone'





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
        document.removeEventListener('mousedown', handleClickOutside);
      };

      else if (document.addEventListener('mousedown', handleClickInside))
        return () => {
          document.addEventListener('mousedown', handleClickInside)
        };
    }, [showDropdown]);
    


    
  


    const handleItemClick = (item) => {
      // Handle the item selection here (e.g., navigate to a page or perform an action)
      console.log(`Selected item: ${item}`);
      // Close the dropdown
      setShowDropdown(false);
      // Clear the search input
      setText('');
    };


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
   
    <div className='d-flex parentOfInput justify-content-end'  >
        <input placeholder='search' 
               type='text' ref={refInput} 
               value={text} 
               onChange={(e) => filter(e.target.value) } 
               onClick={() => showDropdown(true)} 
               id='search'></input>
    </div> 

    
    <div className='searchDropdown' style={{width:filtered.length ? '-webkit-fill-available' : 0}}>
        { showDropdown && filtered?.length && filtered?.map((item, index) => {
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
        })}
        
    </div>
    </>
    )
}

// reduce function can be used instead of mapping and filter