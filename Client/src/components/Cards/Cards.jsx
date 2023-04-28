import Card from '../Card/Card.jsx';
import './Cards.css'

export default function Cards({characters, onClose, loadingCharacter}) {
   return (
   <div className='Cards-Div'>
      {characters.map(character => {
         return <Card
         key={character.id}
         id={character.id}
         name={character.name}
         status={character.status}
         species={character.species}
         gender={character.gender}
         origin={character.origin.name}
         image={character.image}
         onClose={() => onClose(character.id)}
      />
      }
      )
   }
      {loadingCharacter ? <Card id='loading' name='Loading...' image={'../Images/loadingGif.gif'} onClose={() => onClose('loading')}/> : null}
   </div>
   );
}
