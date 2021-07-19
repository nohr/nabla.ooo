import React from "react";

import "./App.css";
// import "./components/scroll.js"
import Panel from "./components/Panel";
import Feed from "./components/Feed";


// HTML 
const Header = () =>{
 return (
     <header>
            <div></div>
        
     </header>
 );
};

function UI() {
  return (
      <>
      <Header />
    <div className="bigContainer">
      <div className="container">
        <Panel />
        <Feed />
      </div>
    </div>
    </>
  );
}

export default UI;