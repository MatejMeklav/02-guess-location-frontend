import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonSignin() {
  return (
    <Link className='sign-in-btn' to={'/signin'}>
        Sign in
    </Link>
  )
}
