import React from 'react'
import axios from 'axios'

const Delete = (props) => {
  

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue
  }
  const csrftoken = getCookie('csrftoken')

  const handleSubmitDelete = (e) => {

    const delete_id = props.num.toString()

    let delete_url = 'http://localhost:8000/todo/task/' + delete_id + '/'

    axios.delete(
     delete_url,
     {headers: {'X-CSRFToken':csrftoken}}
    ).then(()=>console.log('delete successful'))
  }
  return (
    <div>
      <form onSubmit={handleSubmitDelete}>
        <input type="hidden" name="delete_item" value = {props.num}/>
        <button type = 'submit' className='delete-button'>Delete</button>
      </form>
    </div>
  )
}

export default Delete