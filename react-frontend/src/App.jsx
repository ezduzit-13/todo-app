
import React,{useEffect,useState} from 'react'
import './App.css'
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
      <Fetching userID = {userID}/> 
      <a href="/signout">sign out here</a>
      <br />

    </div>
  );
}

export default App;
