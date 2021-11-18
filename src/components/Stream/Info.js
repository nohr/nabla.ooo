import React, { useState } from "react";
import '../../App.css'
import Draggable from "react-draggable";
import { Container } from "../UI/Theme";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'

const ContactForm = () => {
  const [status, setStatus] = useState("Send");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Send");
    let result = await response.json();
    alert(result.status);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" required />
      </div>
      <button type="submit">{status}</button>
    </form>
  );
};

function Info() {
  const snap = useSnapshot(state);
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante augue, iaculis sit amet sem nec, semper volutpat tellus. In egestas molestie diam, vel posuere eros consequat ut. Proin id ex dolor. Nullam enim est, accumsan sit amet leo vitae, vulputate blandit ligula. Integer scelerisque ex ut orci bibendum luctus. Nulla urna mauris, tincidunt non sem vel, posuere efficitur mauris. Etiam vel magna eget orci hendrerit convallis. Cras accumsan, odio sollicitudin condimentum bibendum, ipsum massa vehicula ligula, quis placerat nisl ipsum venenatis odio.";
  return (
    <div className="bigContainer">
      <div className="head">
        <Draggable position={snap.prtPosition} onStart={() => false}>
          <h1>info</h1>
        </Draggable>
      </div>
      <Container className="container">
        <p>aite@nabla.ooo</p>
        <ContactForm />
        <img src="https://global.yamaha-motor.com/design_technology/design/concept/motoroid/img/sec03_img05.jpg" alt="bike" />
        <div>{text}</div>
        <img src="https://global.yamaha-motor.com/design_technology/design/concept/motoroid/img/sec03_img05.jpg" alt="bike" />
        <div>{text}</div>
      </Container>
    </div>
  )
}

export default Info;
