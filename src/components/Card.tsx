import { Exercise } from '../types/types';
import { Link } from 'react-router-dom';
import { beatifyString } from '../utils/stringUtils';

function Card( {data}: {data: Exercise} ){
  const urlName = data.name.includes('/') ? data.name.replaceAll("/", "%2f") : data.name;
  return <>
    <div className="card w-60 bg-base-100 shadow-xl border-zinc-400/25 border border-solid hover:border-dotted hover:backdrop-invert-0 hover:bg-white/5">
      <div className="card-body ">
      <div className="badge badge-secondary justify-start">{beatifyString(data.equipment)}</div>
        <h2 className="card-title pb-6">
          <Link className='text-left hover:text-white' to={`/exercise/${urlName}`}>{data.name}</Link>
        </h2>
        <div className="card-actions justify-start h-full content-end">
          <div className="badge badge-outline">{data.difficulty}</div>
          <div className="badge badge-outline">{data.type}</div>
          <div className="badge badge-outline">{data.muscle}</div>
        </div>
      </div>
    </div>
  </>

}

export default Card;
