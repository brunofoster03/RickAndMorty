const initialState = {
    myFavorites: [],
    allCharacters: []
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_FAV': 
            return {
                ...state,
                allCharacters: [...state.allCharacters, action.payload],
                myFavorites: [...state.myFavorites, action.payload]
            }
        case 'REMOVE_FAV':
            return {
                ...state,
                allCharacters: state.allCharacters.filter(character => character.id !== action.payload),
                myFavorites: state.myFavorites.filter(character => character.id !== action.payload)
            }
        case 'FILTER':
            return {
                ...state,
                myFavorites: (action.payload === 'All' ? state.allCharacters : state.allCharacters.filter(character => character.gender === action.payload))
            }
        case 'ORDER':
            return {
                ...state,
                myFavorites: state.myFavorites.sort((a, b) => {
                    if(action.payload === 'A'){
                        return a.id - b.id
                    }
                    if(action.payload === 'D'){
                        return b.id - a.id
                    }
                })
            }
        case 'MOUNT_FAVS':
            return {
                ...state,
                myFavorites: action.payload
            }
        default: {
            return {...state}
        }
    }
}


export default reducer;