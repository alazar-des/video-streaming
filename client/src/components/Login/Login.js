import React, { useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types';

export default function Login ({ setToken }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    setLoading(true)
    axios({
      method: 'post',
      data: {
        email: email,
        password: password
      },
      url: 'http://localhost:4000/login'
    }).then(res => {
      if (res.data.token) {
        setToken(res.data)
        setLoading(false)
        navigate('/')
      } else {
        setError('Username or password is wrong. Try Again')
        setLoading(false)
      }
    }).catch(() => {
      setError('Username or password is wrong. Try Again')
        setLoading(false)
    })
  }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={login}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group id='password' className='mt-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button disabled={loading} className='w-100 mt-3' type='submit'>
                Log In
              </Button>
            </Form>

          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </Container>
  )
}

Login.propTypes = {
  setToken: PropTypes.func
}
