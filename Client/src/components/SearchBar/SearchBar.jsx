import {useState, useEffect} from 'react'
import './SearchBar.css'
import { useLocation } from 'react-router-dom'
export default function SearchBar(props) {
  const location = useLocation()
  const URL_BASE = 'https://be-a-rym.up.railway.app/api/character'
  const API_KEY = 'bec0b0fdb45d.275ed8bef7df2eb959b9'
   const [id, setId] = useState('')
   const [count, setCount] = useState({
      characters: 0,
      blocked: false
   })
   const handleChange = (event) => {
      setId(event.target.value)
      if(event.target.value > count.characters || event.target.value === '0'){
         setCount({
            ...count,
            blocked: true
         })
      }else{
         setCount({
            ...count,
            blocked: false
         })
      }
   }
   const preventE = (e) => {
      if (["e", ",", ".", "+", "-"].includes(e.key)) {
         e.preventDefault();
       }
   }
   useEffect(() => {
      fetch(`${URL_BASE}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
         setCount({
            ...count,
            characters: data.info.count
         })
      })
   },[])
   return (
      <div className='SearchBar-Div'>
         <input className={(location.pathname === '/home' ? 'SearchBar-Input' : 'SearchBar-Input-Disabled') + (count.blocked ? ' SearchBar-Input-Wrong' : '')} id='input' value={id} onKeyDown={preventE} onChange={handleChange} type='number' autoComplete='off' disabled={location.pathname !== '/home'}/>



         <button className={'SearchBar-Button ' + (location.pathname === '/home' ? (count.blocked ? 'SearchBar-Button-Wrong' : '') : 'SearchBar-Button-Disabled')} title={location.pathname === '/home' ? (count.blocked ? 'Invalid ID' : 'Add selected') : null} onClick={() => {props.onSearch(id); setId('')}} disabled={location.pathname !== '/home' || count.blocked || id === ''}><img src={require('../Images/plus.png')} /></button>
      </div>
   );
}