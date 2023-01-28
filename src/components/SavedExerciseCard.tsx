import { nanoid } from 'nanoid';
import { SavedExercise } from '../types/types';

function SavedExerciseCard( {data}: {data: SavedExercise} ){
  return <div className="card bg-base-100 shadow-xl">
          <h2 className="card-title">{data.name}  </h2>
          <figure>
            <div className='flex xs:gap-0 sm:gap-4 flex-wrap '>
              <img className="w-60" alt={data.name} src={
                data.images[0]
              }/>
              <img className="w-60" alt={data.name} src={
                data.images[1]
              }/>
            </div>
          </figure>
          <div className="card-body">
            <div className="card-actions justify-start h-full content-end">
              <div className="badge badge-outline">{data.difficulty}</div>
              <div className="badge badge-outline">{data.type}</div>
              <div className="badge badge-outline">{data.muscle}</div>
            </div>

            <ul className="text-left">
              { data.instructions && data.instructions?.split('. ').map((item) => <li key={nanoid()}>{item}</li>) }
            </ul>
          </div>
        </div>
}

export default SavedExerciseCard;