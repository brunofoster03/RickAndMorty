import React from 'react'
import './Loading.css'

export default function Loading() {
  return (
    <>
        <div className='Loading-Div'>
            <div className='Loading-Message'>Cargando...</div>      
            <img src={require('../Images/loadingGif.gif')}/>
        </div>
    </>
  )
}
