import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonSignUp() {
  return (
    <Link className='sign-up-btn' to={'/signup'}>Sign up</Link>
  )
}
