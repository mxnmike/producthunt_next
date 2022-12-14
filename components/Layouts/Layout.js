import React from 'react'
import { Global, css } from '@emotion/react'
import Head from 'next/head'
import Header from './Header'

const Layout = props => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --gray: #3d3d3d;
            --gray2: #6f6f6f;
            --gray3: #e1e1e1;
            --orange: #da552f;
          }

          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }

          *,
          *::before,
          *:after {
            box-sizing: inherit;
          }

          body {
            font-size: 1.6rem;
            line-height: 1.5;
            font-family: 'PT Sans', sans-serif;
          }

          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }

          h1,
          h2 {
            font-family: 'Roboto Slab', serif;
            font-weight: 700;
          }

          h3 {
            font-family: 'PT Sans', sans-serif;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          a {
            text-decoration: none;
          }
        `}
      />
      <Head>
        <title>Product Hunt Firebase and Next.js</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU='
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto+Slab:400,700&display=swap'
          rel='stylesheet'
        />
        <link
          href='/static/css/app.css'
          rel='stylesheet'
        />
        <link
          href='/static/css/spinner.css'
          rel='stylesheet'
        />
      </Head>
      <Header />
      <main>{props.children}</main>
    </>
  )
}

export default Layout
