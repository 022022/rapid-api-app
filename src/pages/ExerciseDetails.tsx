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
import { Exercise, ExerciseVideo } from '../types/types';

function ExerciseDetails() {
	const [currentExercise, setCurrentExercise] = useState<Exercise>();
	const [exerciseVideos, setExerciseVideos] = useState<ExerciseVideo>();
	const [sameEquip, setSameEquip] = useState<Exercise[]>([]);
	const [sameMuscle, setSameMuscle] = useState<Exercise[]>([]);

	const { name } = useParams();

  const maxAdditionalCards = 4;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

	useEffect(() => {
		async function fetchData() {
			const searchResult = await fetchSearchData(
				`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?name=${name}`
			);
			const current = await searchResult.find((item: Exercise) => item.name === name);

			setCurrentExercise(current);
			console.log('current', current);

			//const videosData = await fetchVideoData(name);
			//setExerciseVideos(videosData);
			//console.log(videosData);

			const sameMuscleResult = await fetchSearchData(
				`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${current.muscle}`
			);
      const sameMuscle = await sameMuscleResult.filter((item: Exercise, index: number) => index < maxAdditionalCards);
			setSameMuscle(sameMuscle);
			console.log('sameMuscle', sameMuscle);

			const sameEquipResult = await fetchSearchData(
				`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${current.muscle}`
			);
      const sameEquip = await sameEquipResult.filter((item: Exercise, index: number) => index < maxAdditionalCards);
			setSameEquip(sameEquip);
			console.log('sameEquip', sameEquip);
		}

		fetchData();
	}, [name]);

	return (
		<main className='prose flex flex-col gap-4 px-3.5 py-12 items-center'>
			<Navigation />
			<Detail currentExercise={currentExercise}></Detail>

			<h2>How to do it</h2>
			<Video exerciseVideos={exerciseVideos}></Video>

			<h2>More {currentExercise?.muscle} exercises</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-max'>
				{sameMuscle.map((item) => (
					<Card data={item} key={nanoid()}></Card>
				))}
			</div>

			<h2> More {currentExercise?.equipment} exercises</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-max'>
				{sameEquip.map((item) => (
					<Card data={item} key={nanoid()}></Card>
				))}
			</div>
		</main>
	);
}

export default ExerciseDetails;
