import React from 'react'
import { Link } from 'react-router-dom'
import ButtonGreen from '../ButtonGreen';


export default function SignUpForm() {

  const handleSubmit = (event: { preventDefault: () => void; }) => {
      console.log("submited");
      console.log(document.forms[0])
      event.preventDefault();
  }
  return (
    <div className='sign-up-form-container'>
      <div className='upper-container'>
        <h3>Sign Up</h3>
        <p>Your name will appear on posts and your public profle.</p>
        <img src={require('../Images/ProfileLogo.png')} alt='google maps'></img>
      </div>
      <div className="form">
     <form onSubmit={handleSubmit}>
       <div className="input-container">
         <label><span>Email</span></label>
         <input className="sign-up-form-input" type="text" name="email" />
       </div>
       <div className='input-container-name'>
          <div className="input-container">
            <label><span>First Name</span></label>
            <input className="sign-up-form-input" type="text" name="firstName" />
          </div>
          <div className="input-container">
            <label><span>LastName</span></label>
            <input className="sign-up-form-input" type="text" name="lastName" />
          </div>
       </div>
       <div className="input-container">
          <label><span>Password</span></label>
          <input className="sign-up-form-input" type="password" name="confirmPassword" />
          <img id='toggle' src={require('../Images/visibleEye.png')} alt='eye' ></img>
        </div>
        <div className="input-container">
          <label><span>Confirm password</span></label>
          <input className="sign-up-form-input" type="password" name="confirmPassword" />
          <img src={require('../Images/visibleEye.png')} alt='eye' ></img>
        </div>
        <ButtonGreen page = {false}></ButtonGreen>
     </form>
     <nav className='lower-part'>
           <p>Already have an account?</p>
          <Link to = '/signin'>
          Sign in
          </Link>
           
        </nav>
   </div>
    </div>
  )
}