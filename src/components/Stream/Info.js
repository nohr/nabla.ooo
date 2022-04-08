import React from "react";
import '../../App.css'
import { Container } from "../UI/style";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import useDocumentTitle from "../UI/documentTitle";
import { Header, OldCD } from "../UI/svg";

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

function Info() {
  useDocumentTitle("Info @ Nabla");
  const snap = useSnapshot(state);

  return (
    <>
      <Header id='info' />
      <Container className="container info">
        <OldCD />
        <p>aite@nabla.ooo</p>
        {/* <ContactForm /> */}
      </Container>
    </>
  )
}

export default Info;
