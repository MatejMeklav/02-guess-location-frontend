import { useState } from 'react';
import { Link } from 'react-router-dom'
import { url } from '../../Config/variables';
import ButtonGreen from '../ButtonGreen'
import axios from 'axios';

export default function SignInForm() {

  const[email, setEmail] = useState("");
  const[password, setPasword] = useState("");
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log("submited");
    var {email, password} =document.forms[0];
    console.log(email.value);
    axios
      .post(url + 'signup', {

        email: email.value,
        password: password.value,
      })
      .then(response => { 
        console.log(response.data);
        localStorage.setItem("key", response.data.key)
      })
      .catch(error => {
          console.log(error.response)
      });
    event.preventDefault();
}
return (
  <div id='login-form' className='sign-up-form-container'>
    <div className='upper-container'>
      <h3>Sign in</h3>
      <p>Welcome back to Geotagger. We are glad that you are back.</p>
    </div>
    <div className="form">
   <form onSubmit={handleSubmit}>
     <div className="input-container">
       <label><span>Email</span></label>
       <input className="sign-up-form-input" type="text" name="email" />
     </div>
     <div className="input-container">
        <label><span>Password</span></label>
        <input className="sign-up-form-input" type="password" name="password" />
      </div>
      <ButtonGreen page = {true}></ButtonGreen>
   </form>
   <nav className='lower-part'>
         <p>Do you want to create an account?</p>
        <Link to = '/signup'>
        Sign up
        </Link>
         
      </nav>
 </div>
  </div>
)
}
