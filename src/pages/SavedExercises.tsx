import { nanoid } from 'nanoid';
import SavedExerciseCard from '../components/SavedExerciseCard';
import { SavedExercise } from '../types/types';

function SavedExercises( {setMyExercises, myExercises}: { setMyExercises: (item: SavedExercise[]) => void, myExercises: SavedExercise[] } ){
  if(!myExercises.length){
    <p>You have no saved exercises for now</p>
  }

  return <div className='prose flex flex-col px-3.5 py-12 text-center'>

    <h1>My Saved Exercises</h1>
    {!myExercises.length ? <p>You have no saved exercises for now</p> : '' }
    {myExercises.map(
      (item: SavedExercise) => <SavedExerciseCard data={item} key={nanoid()} setMyExercises={setMyExercises} myExercises={myExercises}></SavedExerciseCard>
    )}
  </div>
}


export default SavedExercises;