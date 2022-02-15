import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { GoogleLogin } from 'react-google-login'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Spinner from '../components/layout/Spinner'
import { login, register } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [
    history,
    userInfo,
    redirect,
    error,
    dispatch
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <FormContainer>
        {message && (
          <Message variant='danger' classN='alert-wide'>
            {message}
          </Message>
        )}
        {!loginSuccess && error && (
          <Message variant='danger' classN='alert-wide'>
            {error}
          </Message>
        )}
        {loading && <Spinner />}
        <h2>כניסה</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>כתובת דוא"ל</Form.Label>
            <Form.Control
              type='email'
              placeholder='דוא"ל'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>סיסמה</Form.Label>
            <Form.Control
              type='password'
              placeholder='סיסמה'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className='btn-brand' type='submit'>
            כניסה
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            לקוח חדש?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              הרשמה
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default LoginScreen
