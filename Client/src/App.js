import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav.jsx'
import axios from 'axios';
import {useState, useEffect} from 'react'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import About from './components/About/About.jsx'
import Detail from './components/Detail/Detail.jsx'
import PageError from './components/PageError/PageError.jsx'
import Form from './components/Form/Form.jsx'
import Favorites from './components/Favorites/Favorites';

function App() {
   const URL_BASE = 'https://be-a-rym.up.railway.app/api/character'
   const API_KEY = 'bec0b0fdb45d.275ed8bef7df2eb959b9'
   const location = useLocation().pathname
   const [characters, setCharacters] = useState([])
   const [charactersCount, setCharactersCount] = useState(0)
   const [loadingCharacter, setLoadingCharacter] = useState(false)
   useEffect(() => {
      fetch(`${URL_BASE}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
      })
   },[])
   useEffect(() => {
      fetch(`${URL_BASE}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
         setCharactersCount(data.info.count)
      })
   },[])
   const onSearch = async (id) => {
      if(characters.map(obj => +obj.id).includes(+id)) return alert('Personaje ya mostrado')
      if(id === '') return alert('ID inválido')
      setLoadingCharacter(true)
      try{
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
         if(data.id && data.name){
            setCharacters([...characters, data])
            setLoadingCharacter(false)
         }else{
            window.alert('¡No hay personajes con este ID!')
            setLoadingCharacter(false)
         }
         console.log(data)
      }catch (error){
         console.error(error)
         setLoadingCharacter(false)
         alert('Error con el ID')
      }
   }
   const onClose = (id) => {
      setCharacters(characters.filter(character => character.id !== id))
   }
   const addRandom = () => {
      let id = Math.floor(Math.random() * charactersCount) + 1
      if(characters.map(obj => obj.id).includes(id)) return addRandom()
      onSearch(id)
   }
   const [access, setAccess] = useState(false)
   const navigate = useNavigate()
   const login = async (userData) => {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      const { data } = await axios(URL + `?email=${email}&password=${password}`)
      const { access } = data
      setAccess(access)
      access && navigate('/home')
   }
   useEffect(() => {
      !access && navigate('/');
   }, [access]); 
   
   const logOut = () => {
      setAccess(false)
      // navigate('/')
   }

   const [visibleScroll, setVisibleScroll] = useState(true)
   useEffect(() => {
      let prevScrollPos = window.scrollY

      const handleScroll = () => {
         let currentScrollPos = window.scrollY
         let isVisible = currentScrollPos < 99
         // let isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 99;
         setVisibleScroll(isVisible)
         prevScrollPos = currentScrollPos
      }  
      window.onscroll = handleScroll
   }, [])

   return (
      <div className='App'>
         {location === '/' ? null : <Nav onSearch={onSearch} addRandom={addRandom} logOut={logOut} display={visibleScroll}/>}
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} loadingCharacter={loadingCharacter}/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='*' element={<PageError/>}/>
         </Routes>
      </div>
   );
}

export default App;
