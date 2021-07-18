import React from "react";
import SvgNabla from './svg';
import "./App.css";
import "./components/scroll.js";
import Slider from "./components/Work";
import Feed from "./components/Feed";
import Main from "./components/Main";
import Footer from "./components/Footer";

// HTML 
const Header = () =>{
 return (
     <header>
         <div className='logo' >
         <SvgNabla title="nabla" fill='#a1a1a1'  />
         </div>
            <div></div>
         <ul>
           <li>
             <a href="https://nablaooo.gumroad.com/" target="_blank">Store</a>
           </li>
           <li>
             <a href="/" >Contact</a>
           </li>
           <li>
             <a href="/" >About</a>
           </li>
         </ul>
     </header>
 );
};

function UI() {
  return (
      <>
      <Header />
    <div className="bigContainer">
      <div className="container">
        <Main />
        <Slider />
        <Feed />
      </div>
      <Footer />
    </div>
    </>
  );
}

export default UI;