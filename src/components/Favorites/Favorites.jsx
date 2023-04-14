import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import './Favorites.css'
import { orderCards, filterCards, mountFavs } from '../../redux/actions'

const Favorites = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(mountFavs(allCharacters))
    },[])
    let myFavorites = useSelector(state => state.myFavorites)
    const allCharacters = useSelector(state => state.allCharacters)
    const [aux, setAux] = useState(false)
    const [optionActive, setOptionActive] = useState({
        Order: null,
        Gender: 'All',
    })
    const handleOrder = (option) => {
        setAux(!aux)
        setOptionActive({
            ...optionActive,
            Order: option
        })
        
        dispatch(orderCards(option))
    }
    const handleFilter = (gender) => {
        if(gender === optionActive.Gender){
            setOptionActive({
                ...optionActive,
                Gender: 'All'
            })
            gender = 'All'
        }else{
            setOptionActive({
                ...optionActive,
                Gender: gender
            })
        }
        dispatch(filterCards(gender))
    }
    return (
    <>  
        <div className='Favorites-Select'>
            <div className='Favorites-Select-Order'>
                <button className={optionActive.Order === 'A' ? 'Favorites-SelectedOption' : ''} onClick={() => handleOrder('A')} title='Ascending Order'><img src={require('../Images/AscendingOrder.png')}/></button>
                <button className={optionActive.Order === 'D' ? 'Favorites-SelectedOption' : ''} onClick={() => handleOrder('D')} title='Descending Order'><img src={require('../Images/DescendingOrder.png')}/></button>
            </div>
            <div className='Favorites-Select-Gender'>
                <button className={optionActive.Gender === 'Male' ? 'Favorites-SelectedOption' : ''} onClick={() => handleFilter('Male')} title='Male'><img src={require('../Images/MaleGender.png')}/></button>
                <button className={optionActive.Gender === 'Female' ? 'Favorites-SelectedOption' : ''} onClick={() => handleFilter('Female')} title='Female'><img src={require('../Images/FemaleGender.png')}/></button>
                <button className={optionActive.Gender === 'Genderless' ? 'Favorites-SelectedOption' : ''} onClick={() => handleFilter('Genderless')} title='Genderless'><img src={require('../Images/Genderless.png')}/></button>
                <button className={optionActive.Gender === 'unknown' ? 'Favorites-SelectedOption' : ''} onClick={() => handleFilter('unknown')} title='Unknown'><img src={require('../Images/UnknownGender.png')}/></button>
            </div>
        </div>
        <div className='Favorites-Div'>
            {myFavorites?.map(character => {
                return (
                <Card
                    image={character?.image}
                    name={character?.name}
                    id={character?.id}
                    key={character?.id}
                    gender={character?.gender}
                />
                )
            })}
        </div>
    </>
  )
}

export default Favorites