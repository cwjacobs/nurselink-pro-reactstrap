import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './SignIn.css';

const SignIn = (props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  return (
    <Jumbotron className="jumbo">
      <div className="login-form mx-auto">
        <h1 style={{ marginBottom: 0.5 + 'em' }}>Sign In</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              Use of this workstation falls under the Medica360 Code of Conduct Policy and your acceptance of that policy.
                </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type={isShowPassword ? "text" : "password"} placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Show Password" onClick={handleShowPassword} />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </div>
    </Jumbotron>
  );
}

export { SignIn };

// render() {
//   return (
//     <Container fluid className="p-3">
//       <Jumbotron className="jumbo">
//         <h1 className="header">Welcome To Medica360</h1>
//         <ExampleToast>
//           We now have Toasts
//         <span role="img" aria-label="tada">
//             🎉
//         </span>
//         </ExampleToast>
//       </Jumbotron>
//     </Container>
//   );
// }

// const ExampleToast = ({ children }) => {
//   const [show, toggleShow] = useState(true);

//   return (
//     <>
//       {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
//       <Toast show={show} onClose={() => toggleShow(false)}>
//         <Toast.Header>
//           <strong className="mr-auto">React-Bootstrap</strong>
//         </Toast.Header>
//         <Toast.Body>{children}</Toast.Body>
//       </Toast>
//     </>
//   );
// }
