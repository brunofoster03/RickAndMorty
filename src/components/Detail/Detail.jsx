import React, {useState, useEffect} from 'react'
import './Detail.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';

export default function Detail() {
  const URL_BASE = 'https://be-a-rym.up.railway.app/api/character'
  const API_KEY = 'bec0b0fdb45d.275ed8bef7df2eb959b9'
  const [character, setCharacter] = useState({})
  let {id} = useParams()
  useEffect(() => {
    axios(`${URL_BASE}/${id}?key=${API_KEY}`).then(({ data }) => {
       if (data.name) {
          setCharacter(data);
       } else {
          window.alert('No hay personajes con ese ID');
       }
    });
    return setCharacter({});
 }, [id]);
 console.log(character)
  return (
     <div className='Detail-Div'>
      {Object.keys(character).length !== 0 ? (
         <>
          <div className='Detail-Information'>
            <div className='Detail-ID'>{character.id}</div>
            <div className='Detail-Image'><img src={character.image}/></div> 
            <div className='Detail-Detail Detail-Name'><span>Name: <span></span></span>{character.name}</div>
            <div className='Detail-Detail Detail-Status'><span>Status: </span>{character.status}</div>
            <div className='Detail-Detail Detail-Species'><span>Specie: </span>{character.species}</div>
            <div className='Detail-Detail Detail-Gender'><span>Gender: </span>{character.gender}</div>
            <div className='Detail-Detail Detail-Name'><span>Origin: </span>{character.origin.name}</div>
          </div>
        </>
        ) : ( 
          <div><Loading/></div>
        )}
     </div>
  )
}
