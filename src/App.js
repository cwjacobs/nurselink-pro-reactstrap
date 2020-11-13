import React from 'react';
import Container from 'react-bootstrap/Container';

import { SignIn } from './signIn/SignIn';
import { Navigation } from './navigation/Navigation';
import { ClientArea } from './clientarea/ClientArea';
import { AdminArea } from './adminarea/AdminArea';
import './styles/App.css';

// const appName = "Medica360";
// const appName = "Nurse Link";
const { innerHeight } = window

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appHeight: 0,
      isSignedIn: false,
      isHome: true,
      isAdmin: false,
      signedInAccount: null,
      clickedAccount: null,
    };
  }

  componentDidMount = () => {
    this.setState({
      appHeight: innerHeight,
    })
  }

  setIsSignedIn = (value) => {
    this.setState({
      isSignedIn: value,
    })
  }

  setSignedInAccount = (value) => {
    this.setState({
      isSignedIn: true,
      signedInAccount: value,
    })
  }

  setClickedAccount = (account) => {
    this.setState({
      clickedAccount: account,
    })
  }

  setIsHome = () => {
    this.setState({
      isHome: true,
      isAdmin: false,
    })
  }

  setIsAdmin = () => {
    this.setState({
      isHome: false,
      isAdmin: true,
    })
  }

  render() {
    return (
      <Container id="appcontainer" fluid className="p-3 bg-dark app">
        {!this.state.isSignedIn && <div>
          <h1 className="header">Welcome To Medica360</h1>
          <SignIn setSignedInAccount={this.setSignedInAccount}></SignIn>
        </div>
        }
        {this.state.isSignedIn
          &&
          <>
            <Navigation setIsSignedIn={this.setIsSignedIn} setIsHome={this.setIsHome} setIsAdmin={this.setIsAdmin}></Navigation>
            {this.state.isHome && <div id="home">
              <ClientArea signedInAccount={this.state.signedInAccount} setClickedAccount={this.setClickedAccount}></ClientArea>
            </div>}
            {this.state.isAdmin && <div id="admin">
              <AdminArea signedInAccount={this.state.signedInAccount} setClickedAccount={this.setClickedAccount}></AdminArea>
            </div>}
          </>
        }
      </Container>
    );
  }
}

export { App };

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
