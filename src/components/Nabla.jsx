import React, { Component } from "react";
import logo from "../logo.svg";
import "./nabla.css";

class Nabla extends Component {
  state = {};
  render() {
    return (
      <div id="nabla-logo ">
        <button id="nabla">
          <img id="logo" src={logo} alt="" />
        </button>
      </div>
    );
  }
}

export default Nabla;
