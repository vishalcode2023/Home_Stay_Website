import React from 'react'
import navbar from './navbar'
import Footer from '../components/Footer'

function touristpage() {
  return (
    <div>
      {navbar()}
      <div>touristpage</div>
      {Footer()}
    </div>
  )
}

export default touristpage