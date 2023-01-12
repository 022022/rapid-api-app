import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

import Card from '../components/Card';
import Detail from '../components/Detail';
import Video from '../components/Video';
import fetchSearchData from '../services/fetchSearchData';
import fetchVideoData from '../services/fetchVideoData';
import { Exercise, ExerciseVideo } from '../types/types';

function ExerciseDetails(){
  const[currentExercise, setCurrentExercise] = useState<Exercise>();
  const[exerciseVideos, setExerciseVideos] = useState<ExerciseVideo>();
  const[sameEquip, setSameEquip] = useState<Exercise[]>([]);
  const[sameMuscle, setSameMuscle] = useState<Exercise[]>([]);

  const { name } = useParams();

  useEffect(()=> {
    async function fetchData(){
      const searchResult = await fetchSearchData(`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?name=${name}`)
      const current = await searchResult.find((item: Exercise) => item.name === name);

      setCurrentExercise(current);
      console.log('current', current);

      //const videosData = await fetchVideoData(name);
      //setExerciseVideos(videosData);
      //console.log(videosData);

      const sameMuscle = await fetchSearchData(`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${current.muscle}`)
      setSameMuscle(sameMuscle);
      console.log('sameMuscle', sameMuscle);

      const sameEquip = await fetchSearchData(`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${current.muscle}`)
      setSameEquip(sameEquip);
      console.log('sameEquip', sameEquip);
    }

    fetchData();

  }, [name]);



  return <>
  Exercise:
  <Detail currentExercise={currentExercise} ></Detail>

  How to do it

  <Video exerciseVideos={exerciseVideos}></Video>

  Exercises on the same muscle
  { sameMuscle.map((item) => <Card data={item} key={nanoid()}></Card> )}

  Exercises with the same equipment
  { sameEquip.map((item) => <Card data={item} key={nanoid()}></Card> )}

  </>
}

export default ExerciseDetails;