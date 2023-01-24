import { nanoid } from 'nanoid';
import { useAppSelector } from '../services/store/preTypedHooks';

function Detail(){
  const state = useAppSelector((state) => state.exerciseDetails);
  const message = state.currentExercise?.instructions ? ''
  : 'Sorry, detailed explanations for this exercise are not available for now';

  return <div className="justify-self-start prose">
    { state.currentExercise &&
    <>
      <div className="flex flex-wrap gap-4 h-full content-end py-12">
          <div className="badge badge-outline">{state.currentExercise?.difficulty}</div>
          <div className="badge badge-outline">{state.currentExercise?.equipment}</div>
          <div className="badge badge-outline">{state.currentExercise?.muscle}</div>
          <div className="badge badge-outline">{state.currentExercise?.type}</div>
      </div>
      <h1>{ state.currentExercise?.name}</h1>

      { state.exerciseVideos.length ?
        <div className='flex xs:gap-0 sm:gap-4 flex-wrap '>
            <img className="w-60" alt={state.currentExercise?.name} src={
              state.exerciseVideos[0] &&
              state.exerciseVideos[0].snippet.thumbnails.high.url
            }/>
            <img className="w-60" alt={state.currentExercise?.name} src={
              state.exerciseVideos[1] &&
              state.exerciseVideos[1].snippet.thumbnails.high.url
            }/>
        </div>
      : null }

      { message ||
      <ul>
          { state.currentExercise?.instructions && state.currentExercise?.instructions?.split('. ').map((item) => <li key={nanoid()}>{item}</li>) }
      </ul>
      }

    </>
    }
  </div>

}

export default Detail;