import './Card.css'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../../redux/actions';
import { useState, useEffect } from 'react';

const Card = ({ image, onClose, id, name, gender}) => {
   const location = useLocation()
   const [isFav, setIsFav] = useState(false)
   const dispatch = useDispatch()
   const myFavorites = useSelector(state => state.allCharacters)
   const handleFavorite = () => {
      if(isFav){
         setIsFav(false)
         dispatch(removeFav(id))
      }else{
         setIsFav(true)
         dispatch(addFav({image, id, name, gender}))
      }
   }
   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);
   return (
      <div className='Card-Div'>
         <img className='Card-Img' src={image} alt='' />
         {location.pathname === '/home' ? <button className='Card-Button' onClick={onClose}>✘</button> : null}
         <Link to={`${name !== 'Loading...' ? `/detail/${id}` : '/home'} `}>
            <h2 className='Card-H2' id='Card-H2-1'>{name}</h2>
         </Link>
         {name !== 'Loading...' ? <button className='Card-Favorite' onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button> : null}
      </div>
   );
}

export default Card