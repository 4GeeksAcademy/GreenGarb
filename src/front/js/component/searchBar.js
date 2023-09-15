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
    const refInput = useRef()
    console.log(text);

    const Inputstyles = {
      input: 'searchBar',
      inputFocus: 'inputFocus',
      query: 'query',
      typeahead: 'typeAhead',
      clearButton: 'clearButton',
      listbox: 'listBox',
      groupHeading: 'groupHeading',
      item: 'dropItem',
      highlightedItem: 'highlightedItem'
    }

    // the variable above inside the function have given classname for css


    const maxItems = 8


    const listbox = {
      // displayField: 'title',
      searchType: 'startswith',
      data: ['Peach', 'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Prune']
    }
   
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
    
    <>
    {/* <form className='parentOfInput justify-content-end' autoComplete='off'>
    <div className='d-flex w-100'  >
        <input placeholder='search' type='text' ref={refInput} value={text} onChange={(e) => filter(e.target.value) } id='search'></input>
    </div>
    </form> */}

    <Turnstone
      styles={Inputstyles}
      debounceWait={250}
      id="search"
      listbox={listbox}
      listboxIsImmutable={true}
      matchText={true}
      maxItems={maxItems}
      name="search"
      autoFocus={true}
      noItemsMessage="Not Found"
      placeholder="Search Products"
      typeahead={true}
      clearButton={true} />


    
    {/* <div className='searchDropdown' style={{width:filtered.length ? '-webkit-fill-available' : 0}}>
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
        }) : `$('#search').value('')`}
        
    </div> */}
    </>
    )
}

// reduce function can be used instead of mapping and filter