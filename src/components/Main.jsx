import React, { Component } from "react";

var text0 =
  "Studio Nabla is a multi-disciplinary art and design studio founded by Aite Eboigbe in 2017. <br>To view a work, scroll through the sidebar to the right, select a work, and then  mouse over the red border to scroll left or right. <br> <br> <span> If you would like to inquire about my services, feel free to contact me at <a href='mailto:info@studionabla.com'>info@studionabla.com</a>.";
var text1 = "";
var text2 = "";
var text3 = "";
var text4 = "";
var text5 = "";
var text6 = "";
var text7 = "";
var text8 = "";
var text9 = "";
var text10 = "";
var text11 = "";
var text12 = "";
var text13 = "";
var text14 = "";

function placeText(y) {
  var id = y.toString();
  var text = document.getElementById("text");
  var c1 = document.getElementById("c1");
  var c2 = document.getElementById("c2");
  var c3 = document.getElementById("c3");
  var c4 = document.getElementById("c4");
  var cap = document.querySelector(".caption");
  var main = document.querySelector(".Main");
  if (id === "0") {
    text.innerHTML = text0;
    cap.style.display = "none";
    c1.innerHTML = "";
    c2.innerHTML = "";
    c3.innerHTML = "";
    c4.innerHTML = "";
    text.style.content = "0";
    main.style.display = "block";
    var feed = document.getElementById(y);
    feed.style.display = "inline-block";
  } else {
    main.style.display = "block";
    cap.style.display = "block";
    if (id === "1") {
      text.innerHTML = text1;
      c1.innerHTML = "<span id ='capTitle'>Client</span><br> Nohri";
      c2.innerHTML = "<span id ='capTitle'>Year</span><br> 2019";
      c3.innerHTML = "<span id ='capTitle'>Team</span><br> A. Eboigbe";
      c4.innerHTML =
        "<span id ='capTitle'>Media</span><br> 3D Animation & Wordmark Design";
      text.style.content = "1";
    } else if (id === "2") {
      text.innerHTML = text2;
      c1.innerHTML = "";
      c2.innerHTML = "<span id ='capTitle'>Year</span><br> 2020";
      c3.innerHTML = "<span id ='capTitle'>Team</span><br> A. Eboigbe";
      c4.innerHTML =
        "<span id ='capTitle'>Media</span><br> 3D Modelling & Animation";
      text.style.content = "2";
    } else if (id === "3") {
      text.innerHTML = text3;
      c1.innerHTML = "<span id ='capTitle'>Title</span> <br> cyberShades";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br> 2020";
      c3.innerHTML = "<span id ='capTitle'>Team</span> <br> A. Eboigbe";
      c4.innerHTML =
        "<span id ='capTitle'>Media</span><br> 3D Modelling & Instagram Filter Creation";
      text.style.content = "3";
    } else if (id === "4") {
      text.innerHTML = text4;
      c1.innerHTML = "<span id ='capTitle'>Client</span><br> Tidal";
      c2.innerHTML = "<span id ='capTitle'>Year</span><br>  2016";
      c3.innerHTML =
        "<span id ='capTitle'>Team</span><br>  A. Eboigbe (implementation) & MeLo-X (direction)";
      c4.innerHTML = "<span id ='capTitle'>Media</span><br>  Sound Design";
      text.style.content = "4";
    } else if (id === "5") {
      text.innerHTML = text5;
      c1.innerHTML = "<span id ='capTitle'>Client</span> <br> Celine Clarke";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br>  2019";
      c3.innerHTML =
        "<span id ='capTitle'>Team</span> <br>  A. Eboigbe (direction & implementaion) & Celine Clarke (direction)";
      c4.innerHTML =
        "<span id ='capTitle'>Media</span> <br>  Sound Recording, Sound Design & Score";
      text.style.content = "5";
    } else if (id === "6") {
      text.innerHTML = text6;
      c1.innerHTML = "<span id ='capTitle'>Client</span> <br>  Nohri";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br>  2019";
      c3.innerHTML = "<span id ='capTitle'>Team</span> <br>  A. Eboigbe";
      c4.innerHTML =
        "<span id ='capTitle'>Media</span> <br>  Web Development & EP Artwork";
      text.style.content = "6";
    } else if (id === "7") {
      text.innerHTML = text7;
      c1.innerHTML = "<span id ='capTitle'>Client</span> <br>  Heat.wav";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br>  2017";
      c3.innerHTML = "<span id ='capTitle'>Team</span> <br>  A. Eboigbe";
      c4.innerHTML = "<span id ='capTitle'>Media</span> <br>  Wordmark Design";
      text.style.content = "7";
    } else if (id === "8") {
      text.innerHTML = text8;
      c1.innerHTML = "<span id ='capTitle'>Client</span> <br>  NXGN";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br>  2016";
      c3.innerHTML = "<span id ='capTitle'>Team</span> <br>  A. Eboigbe";
      c4.innerHTML =
        "<span id ='capTitle'>Media</span> <br>  Wordmark Design & Song Artwork";
      text.style.content = "8";
    } else if (id === "9") {
      text.innerHTML = text9;
      c1.innerHTML = "<span id ='capTitle'>Client</span> <br>  Nohri";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br>  2018";
      c3.innerHTML =
        "<span id ='capTitle'>Team</span> <br>  A. Eboigbe (direction & implementaion), Jheyda McGarrell (photography) & Kyle Castro (illustration)";
      c4.innerHTML = "<span id ='capTitle'>Media</span> <br> Album Artwork";
      text.style.content = "9";
    } else if (id === "10") {
      text.innerHTML = text10;
      c1.innerHTML = "<span id ='capTitle'>Client</span> <br>  Mia Gladstone";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br>  2018";
      c3.innerHTML =
        "<span id ='capTitle'>Team</span> <br>  A. Eboigbe (implementaion) & Mia Gladstone (direction)";
      c4.innerHTML = "<span id ='capTitle'>Media</span> <br>  Song Artwork";
      text.style.content = "10";
    } else if (id === "11") {
      text.innerHTML = text11;
      c1.innerHTML = "<span id ='capTitle'>Client</span> <br>  Nohri";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br>  2018";
      c3.innerHTML = "<span id ='capTitle'>Team</span> <br>  A. Eboigbe";
      c4.innerHTML = "<span id ='capTitle'>Media</span> <br>  Web Development";
      text.style.content = "11";
    } else if (id === "12") {
      text.innerHTML = text12;
      c1.innerHTML = "<span id ='capTitle'>Client</span> <br>  Aite Eboigbe";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br>  2019";
      c3.innerHTML = "<span id ='capTitle'>Team</span> <br>  A. Eboigbe";
      c4.innerHTML = "<span id ='capTitle'>Media</span> <br>  Web Development";
      text.style.content = "12";
    } else if (id === "13") {
      text.innerHTML = text13;
      c1.innerHTML = "<span id ='capTitle'>scroll</span> <br> down";
      c2.innerHTML = "<span id ='capTitle'></span>";
      c3.innerHTML = "";
      c4.innerHTML = "<span id ='capTitle'>stay</span> <br> safe";
      text.style.content = "13";
    } else if (id === "14") {
      text.innerHTML = text14;
      c1.innerHTML = "<span id ='capTitle'>Title</span> <br> cala";
      c2.innerHTML = "<span id ='capTitle'>Year</span> <br> 2020";
      c3.innerHTML = "<span id ='capTitle'>Team</span> <br> A. Eboigbe";
      c4.innerHTML = "<span id ='capTitle'>Media</span> <br> Type Design";
      text.style.content = "14";
    }
  }
}

class Main extends Component {
  state = {};
  render() {
    return (
      <div className="Main">
        <div className="textBox">
          <p id="text"></p>
        </div>
        <div className="caption">
          <div id="cap" style={{ display: "inline-grid" }}>
            <div id="c1" style={{ marginTop: 0 }}></div>
            <div id="c2"></div>
            <div id="c3"></div>
            <div id="c4" style={{ marginBottom: 0 }}></div>
          </div>
        </div>
        <div className="caption"></div>
      </div>
    );
  }
}

export default Main;
