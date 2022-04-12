import React,{useState,useEffect} from 'react'
import Update from './Update'
import Create from './Create'
import Delete from './Delete'
import axios from 'axios'
import './style-fetching.css'


const Fetching = (props) => {
  const [list,getList] = useState(null)
  const [update, getUpdate] = useState(false)
  const [create, getCreate] = useState (false)
  const [number,getNumber] = useState(null)

  const url = 'http://localhost:8000/user-post/'+props.userID

  useEffect(()=>{
    axios.get(url)
    .then(response=>{
      console.log('fetching api...')
      console.log(response.data,'response data <<<<<<<')
      getList(response.data)
    })
  },[url])





  if(list){
    return(
    <div>       
        <table>

            {list.map(list=>{
              //.map in order to iterate through list
              return(
                //Idea one, create form. make on submit action 
              <tr>
                <td>{list.title}</td>
                <td>
                  <button onClick={()=>{getUpdate(() => true); getNumber(()=>list.id)}}>update</button>
                </td>
                <td><Delete num = {list.id}/></td>
              </tr> 
              )
            })}
        </table>
        <button onClick = {()=>getCreate(()=>true)}>New To-Do</button>
        <br />
        <Create trigger = {create} userID = {props.userID}/>

        <Update trigger = {update} num_id = {number}/>


    </div>
    
    )
}
  return(
    <div>

    </div>
  )
}
export default Fetching

