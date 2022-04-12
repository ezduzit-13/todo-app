
import React,{useEffect,useState} from 'react'
import Fetching from './Components/Fetching'
import GetUser from './Components/GetUser'
import axios from 'axios'


function App() {
  const [userID,getUser] = useState(null)

  const url = 'http://localhost:8000/current-user/'
  useEffect(()=> {
    axios.get(url)
    .then(response=>{
      getUser(response.data)
      console.log(response.data)
    })

  }, [])
    
  
  return (
    <div>
       <a href="/signout" style={{
        color: '#5FFFA4',
      }}>Sign out </a>
      <br />
      <Fetching userID = {userID}/> 
    </div>
  );
}

export default App;
