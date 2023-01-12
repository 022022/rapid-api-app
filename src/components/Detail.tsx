import { Exercise } from '../types/types';

function Detail({currentExercise}: {currentExercise: Exercise | undefined }){
  const message = currentExercise ? '' : 'Details for this exercise are not available'
  return <>
  { message  }
  { currentExercise?.instructions}
  </>

}

export default Detail;