import { nanoid } from 'nanoid';
import { SavedExercise } from '../types/types';

function SavedExerciseCard( {data, setMyExercises, myExercises}: {data: SavedExercise, setMyExercises: (item: SavedExercise[]) => void, myExercises: SavedExercise[] } ){
  function deleteFromSaved(){
    const newMyExercises = myExercises.filter((item) => item.instructions !== data.instructions);
    setMyExercises(newMyExercises)
  }

  return <>

  <div className='group collapse collapse-arrow border-b hover:border-primary'>
				<input type='checkbox' />
				<div className='collapse-title text-xl font-medium group-hover:text-primary'>
          <h2 className='card-title m-0 group-hover:text-primary'>{data.name} </h2>
				</div>
				<div className='collapse-content'>

        {data.images &&
            <div className='flex xs:gap-0 sm:gap-4 flex-wrap px-5 sm:px-0'>
              <img
                className='w-60'
                alt={data.name}
                src={data.images[0]}
              />
              <img
                className='w-60'
                alt={data.name}
                src={data.images[1]}
              />
            </div>
          }
          <div className='card-body'>
            <div className='card-actions justify-start h-full content-end'>
              <div className='badge badge-outline'>
                {data.difficulty}
              </div>
              <div className='badge badge-outline'>{data.type}</div>
              <div className='badge badge-outline'>{data.muscle}</div>
            </div>

            <ul className='text-left'>
              {data.instructions &&
                data.instructions
                  ?.split('. ')
                  .map((item) => <li key={nanoid()}>{item}</li>)}
            </ul>
          </div>
          <button className='link' onClick={deleteFromSaved}>Remove from Saved Exercises</button>
				</div>

			</div>
  </>
}

export default SavedExerciseCard;