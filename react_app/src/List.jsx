import React, {useState, useEffect} from 'react'



const List = ({getItems}) => {

  const [items, setItems] = useState([])

  useEffect(() => {
     setItems(getItems(10)) // if get items returns function
     console.log('setting items')

  }, [getItems])

//   useEffect(() => {
//     setItems(getItems)  // if get items returns values
//     console.log('setting items')

//  }, [getItems])


  return (
    <div>
        {
            items.map((item, index) => {
                return <p key={index}>{item}</p>
            })
        }
    </div>
  )
}

export default List

