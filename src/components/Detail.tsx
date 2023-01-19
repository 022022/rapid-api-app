import { nanoid } from 'nanoid';
import { Exercise } from '../types/types';

function Detail({currentExercise, heros}: {
    currentExercise: Exercise | undefined,
    heros: (string | undefined)[],
  }){
  const message = currentExercise?.instructions ? '' : 'Sorry, detailed explanations for this exercise are not available for now';

  const instructions = currentExercise?.instructions.split('. ');

  return <div className="justify-self-start prose">
    { currentExercise &&
    <>
      <div className="flex flex-wrap gap-4 h-full content-end py-12">
          <div className="badge badge-outline">{currentExercise?.difficulty}</div>
          <div className="badge badge-outline">{currentExercise?.equipment}</div>
          <div className="badge badge-outline">{currentExercise?.muscle}</div>
          <div className="badge badge-outline">{currentExercise?.type}</div>
      </div>
      <h1>{ currentExercise?.name}</h1>

      { heros.length ?
        <div className='flex xs:gap-0 sm:gap-4 flex-wrap '>
          { heros[0] && <img className="w-60" alt={currentExercise?.name} src={heros[0]}/> }
          { heros[1] && <img className="w-60" alt={currentExercise?.name} src={heros[1]}/> }
        </div>
      : null}

      { message ||
      <ul>
          { instructions && instructions.map((item) => <li key={nanoid()}>{item}</li>) }
      </ul>
      }

    </>
    }
  </div>

}

export default Detail;