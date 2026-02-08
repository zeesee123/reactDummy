import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {useEffect} from 'react';
function App(){

  // useEffect(()=>{
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error:', error));
  // },[]);

  
function handleSubmit(e){
e.preventDefault();
console.log(username,email,password,confirmPassword);

if(username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
  alert('Please fill in all fields');
  return;

  }

if(password !== confirmPassword){
  alert('Passwords do not match');
  return;
}

}
    return(
    <>
    <BrowserRouter>
    
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomeGuest/>}/>
      <Route path="/about-us" element={<About/>}/>
      <Route path="/terms" element={<Terms/>}/>
    </Routes>

{/* navabar ends above */}

<div className="container">

   {/* <HomeGuest func={handleSubmit}/> */}
   {/* <About/> */}
</div>

<Footer/>
</BrowserRouter>
 
</>
)

}

export default App