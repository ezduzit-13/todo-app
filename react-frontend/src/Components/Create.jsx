import React,{useState,useEffect} from 'react'

const Create = (props) => {
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
    return cookieValue;
}
const csrftoken = getCookie('csrftoken')
  const [content,setContent] = useState('')
  const url = 'http://localhost:8000/task/'
  const handleSubmit = (e) => {
    const blog = {
        title: content,
        user_id: props.userID,

    }
    console.log(blog)
    fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json', "X-CSRFToken": csrftoken },
      body: JSON.stringify(blog)

    }).then(()=>{
      console.log('new blog added')
    })

  }



  return (props.trigger) ? (
    <div>
      Create a New To-Do
      <form onSubmit = {handleSubmit}>
        <input onChange = {(e) => setContent(e.target.value)} type="text"  name = 'title' className='input-field'/>
        <br />
        <button type="submit" className='submit-button'>Submit</button>
      </form>
    </div>
  ) : ''
}
export default Create



