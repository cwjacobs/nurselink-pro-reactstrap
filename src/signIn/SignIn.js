import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { firebaseLogin, getNurseLinkAcct } from '../conn/nlFirestore'

import './SignIn.css';

const SignIn = (props) => {
  const [email, setEmail] = useState("holderman.john@gmail.com");
  const [password, setPassword] = useState("firebase");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    firebaseLogin(email, password)
      .then(() => {
        let key = email;
        getNurseLinkAcct(key)
          .then((result) => {
            props.setSignedInAccount(result);
            // alert(`Authenticated account: ${result.acctInfo.key} ${result.acctInfo.firstName} ${result.acctInfo.lastName} ${result.acctInfo.phoneNumber}`);
          })
          .catch((e) => {
            alert(`No Account for signed in user has been found: ${e}`);
          })
      })
      .catch((e) => {
        alert(`Sign In credentials ${e} do not match our records`);
      })
  }

  return (
    <Jumbotron className="bg-info jumbo">
      <div className="signin-form mx-auto">
        <h1 style={{ marginBottom: 0.5 + 'em' }}>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { handleEmailChange(e) }} />
            <Form.Text className="text-muted">
              Use of this workstation falls under the Medica360 Code of Conduct Policy and your acceptance of that policy.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type={isShowPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => { handlePasswordChange(e) }} />
          </Form.Group>
          <Form.Group className="info" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Show Password" onClick={handleShowPassword} />
          </Form.Group>
          <Row>
            <Col xs={4}>
              <Button variant="outline-info" className="signin-button" style={{ paddingLeft: "2vw", paddingRight: "2vw" }} type="submit" disabled={isLoggingIn}>Submit</Button>
            </Col>
            {isLoggingIn && <Spinner variant="info" className="signin-button" animation="border" size="md" />}
          </Row>
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
