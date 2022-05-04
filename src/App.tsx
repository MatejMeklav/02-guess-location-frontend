import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import EmailSent from './Pages/SignUp/EmailSent';
import EmailConfirmed from './Pages/SignUp/EmailConfirmed';
import LocationAdd from './Pages/Location/LocationAdd';
import ProfileSettings from './Pages/Profile/ProfileSettings';
import Profile from './Pages/Profile/Profile';
import Logout from './Pages/SignIn/Logout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/email" element={<EmailSent></EmailSent>}></Route>
      <Route path="/confirm-email/:token" element={<EmailConfirmed></EmailConfirmed>}></Route>
      <Route path="/create" element={<LocationAdd></LocationAdd>}></Route>
      <Route path="/settings" element={<ProfileSettings></ProfileSettings>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path='/logout' element={<Logout></Logout>}></Route>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
