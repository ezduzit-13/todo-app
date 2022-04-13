
import React,{useEffect,useState} from 'react'
import Fetching from './Components/Fetching'
import axios from 'axios'
import NavBar from './Components/NavBar'


function App() {
  const [userID,getUser] = useState(null)

  const url = 'http://localhost:8000/todo/current-user/'
  useEffect(()=> {
    axios.get(url)
    .then(response=>{
      getUser(response.data)
      console.log(response.data)
    })

  }, [])
    
  
  return (
    <>
      <NavBar />
      <br />
       <a href="/todo/signout" style={{
        color: '#5FFFA4',
      }}>Sign out </a>
      <br />
      <Fetching userID = {userID}/> 
    </>
  );
}

export default App;
