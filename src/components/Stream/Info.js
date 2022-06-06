import React from "react";
import '../../App.css'
import { Container } from "./Page";
// import { state } from '../UI/state'
// import { useSnapshot } from 'valtio'
import styled from "styled-components"
import { Header, OldCD } from "../UI/svg";
import { AA, BySign } from "../UI/search";

// const ContactForm = () => {
//   const [status, setStatus] = useState("Send");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("Sending...");
//     const { name, email, message } = e.target.elements;
//     let details = {
//       name: name.value,
//       email: email.value,
//       message: message.value,
//     };
//     let response = await fetch("http://localhost:5000/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(details),
//     });
//     setStatus("Send");
//     let result = await response.json();
//     alert(result.status);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" required />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" required />
//       </div>
//       <div>
//         <label htmlFor="message">Message:</label>
//         <textarea id="message" required />
//       </div>
//       <button type="submit">{status}</button>
//     </form>
//   );
// };

const Contact = styled.div`
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
   display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;

    .oldNabla{
      fill: ${props => props.theme.panelColor};
      padding-bottom: 100px;
      overflow: visible;
      /* position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-60%); */
    }
`
const Email = styled.div`
  display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
 `

function Info(props) {
  return (
    <>
      <Header id='info' />
      <Container className="container info"
        opacity={props.opacity}
        pointerEvents={props.pointerEvents}
        transition={props.transition}
      >
        <Contact>
          <OldCD />
          <h1>Aite Aigbe</h1>
          <Email>
            <BySign byColor={AA[0]} byGradient={AA[1]} >AA</BySign><h3>:</h3><h3 style={{ display: 'inline-block' }}
            >{` ${`aite@nabla.ooo`}`}</h3>
          </Email>
        </Contact>
        {/* <ContactForm /> */}
      </Container>
    </>
  )
}

export default Info;
