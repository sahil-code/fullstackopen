import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LogoutButton from './LogoutButton'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Navigation = (props) => {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/users">Users</Nav.Link>
            {!props.user &&
              <Nav.Link as={Link} to="/login">Log In / Create Account</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
        {props.user && <div className="justify-content-end"><LogoutButton /></div>}
      </Container>
    </Navbar>
  )
}

export default connect((state) => ({ user: state.user }), null)(Navigation)
