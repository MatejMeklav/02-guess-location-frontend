import { Link } from 'react-router-dom'
export default function SignInForm() {
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log("submited");
    console.log(document.forms[0])
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
      <button className="sign-up-form-btn">SIGN IN</button>
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
