import React from 'react'
import {
  Container,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { RiVideoUploadFill } from 'react-icons/ri'
import useToken from '../App/useToken'
import PropTypes from 'prop-types';

export default function Nav() {
  const { token } = useToken()

  const signout = () => {
    localStorage.removeItem('token')
  }
  return (
    <Container>
      <Navbar expand='lg' variant='light' bg='light'>
        <Container>
          <Navbar.Brand href='/'>VideoSr</Navbar.Brand>
          <Form className='d-flex'>
            <FormControl
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-primary'>Search</Button>
          </Form>
          <Link to='/upload'> <RiVideoUploadFill /> </Link>
          {token
            ? (
              <NavDropdown title={token.user.email} id='basic-nav-dropdown'>
                <NavDropdown.Item href='#'>My videos</NavDropdown.Item>
                <NavDropdown.Item href='/' onClick={signout}>Sign out</NavDropdown.Item>
              </NavDropdown>
              )
            : (
              <Link className='btn btn-outline-primary' role='button' to='/login'>
                Sign In
              </Link>
              )}
        </Container>
      </Navbar>
    </Container>
  )
}

Nav.propTypes = {
  setToken: PropTypes.func
}
