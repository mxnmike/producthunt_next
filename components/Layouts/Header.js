import Link from 'next/link'
import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Router from 'next/router'
import Navigation from './Navigation'
import Search from '../ui/Search'
import Button from '../ui/Button'
import useFirebase from '../../hooks/useFirebase'

const ContainerHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
`

const Header = () => {
  const { authUser } = useFirebase()

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <ContainerHeader>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href='/'>
            <Logo>P</Logo>
          </Link>

          <Search />

          <Navigation />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {authUser ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hello: {authUser.displayName}
              </p>
              <Button
                bgColor='true'
                onClick={() => {
                  firebase.signOut()
                  Router.push('/')
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href='/login'>
                <Button bgColor='true'>Login</Button>
              </Link>

              <Link href='/create-account'>
                <Button>Create Account</Button>
              </Link>
            </>
          )}
        </div>
      </ContainerHeader>
    </header>
  )
}

export default Header
