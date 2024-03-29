import React from "react";
// import { state } from '../UI/state'
// import { useSnapshot } from 'valtio'
import { OldCD } from "../../../../common/svg";
import { Header } from "../header/header";
import { Contact, Container, Email } from "../page.style";
import { CreatorMedal } from "../utils";

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

function Info(props) {
  return (
    <>
      <Header id="info" />
      <Container
        className="container info"
        ref={props.container}
        opacity={props.opacity}
        pointerEvents={props.pointerEvents}
        transition={props.transition}
      >
        <Contact>
          <OldCD />
          <h1>Aite Aigbe</h1>
          <Email>
            {/* <BySign byColor={AA[0]} byGradient={AA[1]}>AA</BySign> */}
            <CreatorMedal name="AA" />
            <h3>
              <span style={{ userSelect: "none" }}>:</span>
            </h3>
            <h3
              style={{ display: "inline-block", userSelect: "all !important" }}
            >{` ${`aite@nabla.ooo`}`}</h3>
          </Email>
        </Contact>
        {/* <ContactForm /> */}
      </Container>
    </>
  );
}

export default Info;
