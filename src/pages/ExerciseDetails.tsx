import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

import Card from '../components/Card';
import Detail from '../components/Detail';
import Navigation from '../components/Navigation';
import Video from '../components/Video';
import fetchSearchData from '../services/fetchSearchData';
import fetchVideoData from '../services/fetchVideoData';
import { Exercise, VideoItem } from '../types/types';

function ExerciseDetails( {setMyExercises, myExercises}: { setMyExercises: (item: Exercise[]) => void, myExercises: Exercise[] }) {
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [currentExercise, setCurrentExercise] = useState<Exercise>();
	const [exerciseVideos, setExerciseVideos] = useState<VideoItem[]>([]);
	const [sameType, setSameType] = useState<Exercise[]>([]);
	const [sameMuscle, setSameMuscle] = useState<Exercise[]>([]);

	const { name } = useParams();

	const maxAdditionalCards = 3;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [name]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);

			const searchResult = await fetchSearchData({name: name});

			if (!searchResult.status || !searchResult.data.length) {
				setErrorMessage(
					'An error has occurred, we are working on it. Please try again later'
				);
			} else {
				const current = await searchResult.data.find(
					(item: Exercise) => item.name === name
				);

				const videosData = await fetchVideoData(name);
				setExerciseVideos(videosData);
				console.log(videosData);

				const sameMuscleResult = await fetchSearchData({muscle: current.muscle});
				const sameMuscle = await sameMuscleResult.data.filter(
					(item: Exercise, index: number) =>
						item.name !== current.name && index < maxAdditionalCards
				);
				setSameMuscle(sameMuscle);

				const sameTypeResult = await fetchSearchData({type: current.type});
				const sameType = await sameTypeResult.data.filter(
					(item: Exercise, index: number) =>
						item.name !== current.name && index < maxAdditionalCards
				);
				setSameType(sameType);

        setCurrentExercise(current);
			}

			setLoading(false);
		}

		fetchData();
	}, [name]);

  function addToSaved(){
    if(currentExercise){
      setMyExercises([...myExercises, currentExercise]);
    }
  }

	return (
		<>
			{loading ? (
				<div className='lds-dual-ring'></div>
			) : (
				<main className='flex flex-col gap-4 px-3.5 py-12 items-center w-full'>
					<Navigation />

					{errorMessage && <p>{errorMessage}</p>}

					{!errorMessage && (
						<>
							<Detail
								currentExercise={currentExercise}
                heros={exerciseVideos.length ?
                  [exerciseVideos[0].snippet.thumbnails.high.url,
                  exerciseVideos[1].snippet.thumbnails.high.url]
                  : []
                  }
							></Detail>

<button className="link link-secondary" onClick={addToSaved}>Add this exercise to MyExercises</button>


							{exerciseVideos?.length ? (
								<>
									<h2 className='font-medium leading-tight text-3xl my-3'>
										How to do it
									</h2>

									<div className='flex flex-wrap gap-8 justify-center'>
										{exerciseVideos?.map(
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

							{sameMuscle.length ? (
								<>
									<h2 className='font-medium leading-tight text-3xl mt-8 mb-5'>
										More {currentExercise?.muscle} exercises
									</h2>

									<div className='flex flex-wrap gap-8 justify-center'>
										{sameMuscle.map((item) => (
											<Card
												data={item}
												key={nanoid()}
											></Card>
										))}
									</div>
								</>
							) : null}

							{sameType.length ? (
								<>
									<h2 className='font-medium leading-tight text-3xl mt-8 mb-5'>
										{' '}
										More {currentExercise?.type} exercises
									</h2>

									<div className='flex flex-wrap gap-8 justify-center'>
										{sameType.map((item) => (
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
