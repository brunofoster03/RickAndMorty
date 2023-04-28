import React from 'react'
import './About.css'

export default function About() {
  return (
    <>
      <div className='About-Div'>
        <div className='About-Information'>
          <div className='About-Image'><img src={require('../Images/MyImage.jpg')}/></div>
          <label>Bruno Francisco Foster</label>
          <label>Nací el 22 de Julio del año 2003 en la Ciudad Autónoma de Buenos Aires, Argentina. Estudié en una escuela técnica con orientación a computación, y me recibí en el 2022. Me gusta la programación y el mundo de la informática. Le pongo esmero a lo que hago y quiero llegar a ser un muy buen programador FullStack</label>
        </div> 
      </div>
    </>
  )
}
