import { nanoid } from 'nanoid';
import { Exercise } from '../types/types';

function Detail({currentExercise}: {currentExercise: Exercise | undefined }){
  const message = currentExercise ? '' : 'Details for this exercise are not available';

  const instructions = currentExercise?.instructions.split('. ');

  return <div className="justify-self-start ">
    <div className="flex gap-4 h-full content-end py-12">
        <div className="badge badge-outline">{currentExercise?.difficulty}</div>
        <div className="badge badge-outline">{currentExercise?.equipment}</div>
        <div className="badge badge-outline">{currentExercise?.muscle}</div>
        <div className="badge badge-outline">{currentExercise?.type}</div>
    </div>
      <h1 className="">{ currentExercise?.name}</h1>
      { message  }
      <ul>
          { instructions?.map((item) => <li key={nanoid()}>{item}</li>) }
      </ul>

  </div>

}

export default Detail;