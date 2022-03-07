import React, { useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigate = useNavigate();

  const register = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
    setError('password donot match');
    } else {
      axios({
        method: 'post',
        data: {
          email: email,
          password: password
        },
        url: 'http://localhost:4000/signup',
        }).then(res => {
          if (res.data.success) {
            setError("");
            navigate('/login');
          } else {
            setError("Signedup unsuccessful");
          }
        });
      }
    }

    return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={register}>
            <Form.Group id="email" className="mt-2">
              <Form.Label>Email</Form.Label>
            <Form.Control type="email" required onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
            <Form.Control type="password" required onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group id="password-confirm" className="mt-2">
              <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" required onChange={e => setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  </Container>
  )
}
