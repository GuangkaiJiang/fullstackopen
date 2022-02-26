import React from 'react'

const Filter = (props) => {
  return (
    <div>
        filter shown with: <input value={props.filter} onChange={props.handleFilter}/>
    </div>
  )
}

export default Filter