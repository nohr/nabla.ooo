import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        ©2017-2021 nabla ltd.
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script
          type="text/javascript"
          src="./components/jquery.mousewheel.min.js"
        ></script>
      </footer>
    );
  }
}

export default Footer;
