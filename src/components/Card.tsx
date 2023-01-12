import { Exercise } from '../types/types';
import { Link } from 'react-router-dom';


function Card({data}: {data: Exercise} ){
  return <Link to={`/exercise/${data.name}`}> {data.type} </Link>
}

export default Card;