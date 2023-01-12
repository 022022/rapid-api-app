import { Exercise } from '../types/types';

function Detail({currentExercise}: {currentExercise: Exercise | undefined }){
  const message = currentExercise ? '' : 'Details for this exercise are not available';

  return <div className="justify-self-start py-12">
      <div className="gap-4 justify-start h-full content-end">
      <div className="badge badge-outline">{currentExercise?.difficulty}</div>
      <div className="badge badge-outline">{currentExercise?.equipment}</div>
      <div className="badge badge-outline">{currentExercise?.muscle}</div>
    </div>
      <h1>{ currentExercise?.name}</h1>
      { message  }
      { currentExercise?.instructions}
  </div>

}

export default Detail;