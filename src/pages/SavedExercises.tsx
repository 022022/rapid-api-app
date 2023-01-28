import { nanoid } from 'nanoid';
import SavedExerciseCard from '../components/SavedExerciseCard';
import useLocalStorage from '../services/hooks/useLocalStorage';
import { SavedExercise } from '../types/types';

function SavedExercises(){
  const [myExercises, setMyExercises] = useLocalStorage('savedExercises', []);
  return <div className='prose flex flex-col gap-3.5 px-3.5 py-12 text-center'>

    <h1>My Saved Exercises</h1>
    {myExercises.map((item: SavedExercise) => <SavedExerciseCard data={item} key={nanoid()}></SavedExerciseCard>)}
  </div>
}


export default SavedExercises;