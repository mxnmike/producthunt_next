import React, { useState, useContext } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import Layout from '../components/Layouts/Layout'
import { Form, Div, InputSubmit, Error } from '../components/ui/Form'
import Spinner from '../components/ui/Spinner'
import useFirebase from '../hooks/useFirebase'

import useValidacion from '../hooks/useValidacion'
import validateCreateProduct from '../validation/createProductValidation'

const STATE_INICIAL = {
  name: '',
  company: '',
  image: '',
  url: '',
  description: '',
}

const NewProduct = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    valores,
    setValores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validateCreateProduct, createNewProduct)

  const { name, description, image, url, company } = valores

  const router = useRouter()

  const { authUser, firebase } = useFirebase()

  async function createNewProduct() {
    setLoading(true)
    try {
      if (!authUser) {
        return router.push('/login')
      }

      const product = {
        name,
        company,
        url,
        description,
        votes: 0,
        comments: [],
        createdAt: Date.now(),
      }

      await firebase.createNewObject('Products', product)
    } catch (error) {
      console.error('Error while creating product:', error.message)
      setError(error.message)
    } finally {
      setLoading(false)
      setValores(STATE_INICIAL)
    }
  }

  // const handleImageUpload = async e => {
  //   setLoading(true)
  //   try {
  //     const urlImage = await firebase.handleImageUpload(e)
  //     console.log('image available at:', urlImage)
  //   } catch (error) {
  //     setError(error.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Layout>
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              Create New Product
            </h1>
            <Form
              onSubmit={e => {
                setLoading(true)
                handleSubmit(e)
              }}
              noValidate
            >
              <fieldset>
                <legend>General Product Information</legend>
                <Div>
                  <label htmlFor='name'>Name</label>
                  <input
                    id='name'
                    type='text'
                    placeholder='Product Name'
                    name='name'
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Div>

                {errores.name && <Error>{errores.name}</Error>}

                <Div>
                  <label htmlFor='company'>Company</label>
                  <input
                    id='company'
                    type='text'
                    placeholder='Company Name'
                    name='company'
                    value={company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Div>

                {errores.company && <Error>{errores.company}</Error>}

                {/*<Div>
                  <label htmlFor='image'>Product Image</label>
                  <input
                    accept='image/*'
                    id='image'
                    type='file'
                    name='image'
                    // onChange={handleImageUpload}
                  />
            </Div>*/}

                {errores.image && <Error>{errores.image}</Error>}

                <Div>
                  <label htmlFor='url'>Product URL</label>
                  <input
                    id='url'
                    type='text'
                    placeholder='Product URL'
                    name='url'
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Div>

                {errores.url && <Error>{errores.url}</Error>}
              </fieldset>
              <fieldset>
                <legend> About your Product</legend>

                <Div>
                  <label htmlFor='description'>Product Description</label>
                  <textarea
                    id='description'
                    name='description'
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Div>

                {errores.description && <Error>{errores.description}</Error>}
              </fieldset>

              {error && <Error>{error}</Error>}
              <InputSubmit
                type='submit'
                value='Register Product'
                bgColor='true'
                // disabled
              />
            </Form>
          </>
        </Layout>
      )}
    </div>
  )
}

export default NewProduct
