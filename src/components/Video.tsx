import { ExerciseVideo } from '../types/types';

function Video({exerciseVideos}: {exerciseVideos: ExerciseVideo | undefined}){
  return <>{exerciseVideos?.items[0].snippet.description}</>

}

export default Video;