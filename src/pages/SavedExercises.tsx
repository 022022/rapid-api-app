import { nanoid } from 'nanoid';
import Card from '../components/Card';
import useLocalStorage from '../services/hooks/useLocalStorage';
import { Exercise } from '../types/types';

function SavedExercises(){
  const [myExercises, setMyExercises] = useLocalStorage('savedExercises', []);
  return <div className='prose flex flex-col items-center gap-3.5 px-3.5 py-12 text-center'>

    <h1>My Saved Exercises</h1>
    {myExercises.map((item: Exercise) => <Card data={item} key={nanoid()}></Card>)}
  </div>
}


export default SavedExercises;