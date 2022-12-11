import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import useFirebase from '../../hooks/useFirebase.js'

const Nav = styled.nav`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: 'PT Sans', sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`
const Navigation = () => {
  const { authUser } = useFirebase()
  return (
    <Nav>
      <Link href='/'>Home</Link>
      <Link href='/populars'>Populars</Link>
      {authUser && <Link href='/new-product'>New Product</Link>}
    </Nav>
  )
}

export default Navigation
