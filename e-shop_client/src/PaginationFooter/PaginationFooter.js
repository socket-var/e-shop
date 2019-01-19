import React from 'react'

const PaginationFooter = (props) => {
  const buttons = []
  
  for (let index = 0; index < props.num_records; index++) {
    buttons.push(<input type="submit" value={index+1} key={index+1}/>)
  }

  return (
    <div>
      {buttons}
    </div>
  )
}

export default PaginationFooter
