import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import Card from '../components/Card';
import Detail from '../components/Detail';
import Video from '../components/Video';
import { SavedExercise, VideoItem } from '../types/types';

import { useAppSelector } from '../services/store/preTypedHooks';
import { useAppDispatch } from '../services/store/preTypedHooks';
import { fetchExerciseDetailsData } from '../services/store/exercisesSlice';

function ExerciseDetails( {setMyExercises, myExercises}: { setMyExercises: (item: SavedExercise[]) => void, myExercises: SavedExercise[] }) {
  const state = useAppSelector((state) => state.exerciseDetails);

  const dispatch = useAppDispatch();
  const { loading, errorMessage } = useAppSelector((state) => state.exerciseDetails);

  const { name } = useParams();

	const maxAdditionalCards = 3;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [name]);

	useEffect(() => {
    if(name){
      dispatch(fetchExerciseDetailsData({name: name}));
    }
	}, [name, dispatch]);

  function addToSaved(){
    if(state.currentExercise){
      let images;
      if(state.exerciseVideos?.length){
        images = [
          state.exerciseVideos[0].snippet.thumbnails.high.url,
          state.exerciseVideos[1].snippet.thumbnails.high.url
        ];
      } else {
        images = null;
      }

      const savedExercise: SavedExercise = {...state.currentExercise, images: images};
      setMyExercises([...myExercises, savedExercise]);
    }
  }

	return (
		<>
			{loading ? (
				<div className='lds-dual-ring'></div>
			) : (
				<main className='flex flex-col gap-4 px-3.5 py-12 items-center w-full'>


					{errorMessage && <p>{errorMessage}</p>}

					{!errorMessage &&  state.currentExercise && (
						<>
							<Detail></Detail>
              <button className="link link-primary" onClick={addToSaved}>Add this exercise to MyExercises</button>


							{state.exerciseVideos?.length ? (
								<>
									<h2 className='font-medium leading-tight text-3xl my-3 mt-10'>
										How to do it
									</h2>

									<div className='flex flex-wrap gap-8 justify-center'>
										{state.exerciseVideos?.map(
											(videoItem: VideoItem) => (
												<Video
													videoItem={videoItem}
													key={nanoid()}
												></Video>
											)
										)}
									</div>
								</>
							) : null}

							{state.sameMuscle.length ? (
								<>
									<h2 className='font-medium leading-tight text-3xl mt-10 mb-5 '>
										More {state.currentExercise?.muscle} exercises
									</h2>

									<div className='flex flex-wrap gap-8 justify-center'>
										{state.sameMuscle.map((item, index) => (
                      index <= maxAdditionalCards &&
                        <Card
												data={item}
												key={nanoid()}
											></Card>
										))}
									</div>
								</>
							) : null}

							{state.sameType.length ? (
								<>
									<h2 className='font-medium leading-tight text-3xl mt-10 mb-5 '>
										{' '}
										More {state.currentExercise?.type} exercises
									</h2>

									<div className='flex flex-wrap gap-8 justify-center'>
										{state.sameType.map((item, index) => (
                      index <= maxAdditionalCards &&
											<Card
												data={item}
												key={nanoid()}
											></Card>
										))}
									</div>
								</>
							) : null}
						</>
					)}
				</main>
			)}
		</>
	);
}

export default ExerciseDetails;
