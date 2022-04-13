import React,{useState,useEffect} from 'react'

// get list.id in order to call the api
// show a form when triggered

const Update = (props) => {
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
  const handleUpdate = (e) => {
    console.log('updating...')
    let new_words = e.target[0].value

    let new_post = {
      id : props.currentID,
      title: new_words,
      user_id: props.userID
    }

    let url = 'http://localhost:8000/todo/task/' + props.currentID + '/'
    fetch(url, {
      method: 'PUT',
      headers: {'Content-type': 'application/json', 'X-CSRFToken':csrftoken},
      body: JSON.stringify(new_post)
    }).then(()=>{
      console.log('blog updated')
    })

  }

  return (props.trigger) ? (
    <div>
      Update to Do
      <form onSubmit = {handleUpdate}>
        <input type="text"  name = 'title' className='input-field'/>
        <br />
        <button type="submit" id = 'submit' className='submit-button'>Submit</button>
      </form>
    </div>
)
   : ''
}

export default Update

/*
First you need to create the button, make it console.log something so you know it exists. 
Get a hidden field which will be the list id. 
make this submit thingy also make the form show up

*/