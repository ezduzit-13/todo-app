import React from 'react'
import axios from 'axios'

const GetUser = () => {
  function handleClick(e){
    e.preventDefault()
    const url = 'http://localhost:8000/current-user/'

    axios.get(url)
    .then(response=>{
      console.log('fetching api...')
      console.log(response.data)
    })
  }

  return (
    <div>
      <button onClick={handleClick}>get user</button>
    </div>
  )
}

export default GetUser