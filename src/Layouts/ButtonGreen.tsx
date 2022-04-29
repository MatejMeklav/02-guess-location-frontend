import React from 'react'
import { useParams } from 'react-router';

interface Props {
    page: boolean;
  }


const ButtonGreen: React.FC<Props>= (props:Props) => {

  return (
    <button className="green-btn">{props.page ? 'Sign in' : 'Sign up'}</button>
  )
}

export default ButtonGreen;

