import React, { useState } from 'react'
import { css } from '@emotion/react'
import Router from 'next/router'
import Layout from '../components/Layouts/Layout'
import { Form, Div, InputSubmit, Error } from '../components/ui/Form'

import firebase from '../firebase'

import useValidacion from '../hooks/useValidacion'
import validateCreateAccount from '../validation/createAccountValidation'

const STATE_INICIAL = {
  name: '',
  email: '',
  password: '',
}

const CreateAccount = () => {
  const [error, setError] = useState(false)

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validateCreateAccount, createAccount)

  const { name, email, password } = valores

  async function createAccount() {
    try {
      await firebase.createAccount(name, email, password)
      Router.push('/')
    } catch (error) {
      console.error('Error while creating user:', error.message)
      setError(error.message)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Create Account
          </h1>
          <Form
            onSubmit={handleSubmit}
            noValidate
          >
            <Div>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                type='text'
                placeholder='Your Name'
                name='name'
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Div>

            {errores.name && <Error>{errores.name}</Error>}

            <Div>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                placeholder='Your Email'
                name='email'
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Div>

            {errores.email && <Error>{errores.email}</Error>}

            <Div>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                placeholder='Your Password'
                name='password'
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Div>

            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error}</Error>}
            <InputSubmit
              type='submit'
              value='Create Account'
            />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default CreateAccount
