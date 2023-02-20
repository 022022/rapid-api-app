import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Exercise, VideoItem } from '../../types/types';

interface ExerciseDetailsState {
	loading: boolean;
	errorMessage: string;
	currentExercise: Exercise | null,
	exerciseVideos: VideoItem[],
	sameType: Exercise[],
	sameMuscle: Exercise[],
};

const initialState: ExerciseDetailsState = {
	loading: false,
	errorMessage: '',
	currentExercise: null,
	exerciseVideos: [],
	sameType: [],
	sameMuscle: [],
};

export const ExerciseDetailsSlice = createSlice({
	name: 'exerciseDetails',
	initialState,
	reducers: {	},
  extraReducers: (builder) => {
    builder
    .addCase(fetchExerciseDetailsData.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
     })
    .addCase(fetchExerciseDetailsData.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.status){
          state.errorMessage = '';
        } else {
          state.errorMessage = 'An error has occurred, we are working on it. Please try again later';
        }
        state.currentExercise = action.payload.current;
        state.sameMuscle = [...action.payload.sameMuscle];
        state.sameType = [...action.payload.sameType];
        state.exerciseVideos = [...action.payload.videosData];
    });
  }
});

export const fetchExerciseDetailsData = createAsyncThunk<
    {status: boolean, current: Exercise | null, sameMuscle: Exercise[], sameType: Exercise[], videosData: VideoItem[]},
    {name: string}
    >(
  'exerciseDetails/fetchData',

  async ({name}) => {
    try{
      const exercise = await fetch(`/.netlify/functions/vfetchExerciseApi?name=${name}`);
      const mainExercise = await exercise.json();
      const current: Exercise = await mainExercise.data.find((item: Exercise) => item.name === name);

      const muscle = current.muscle;
      const type = current.type;

      const sameMuscleResponse = await fetch(`/.netlify/functions/vfetchExerciseApi?muscle=${muscle}`);
      const sameMuscleResult = await sameMuscleResponse.json();

      const sameMuscle = await sameMuscleResult.data.filter(
        (item: Exercise) =>
          item.name !== current.name);

      const sameTypeResponse = await fetch(`/.netlify/functions/vfetchExerciseApi?type=${type}`);
      const sameTypeResult = await sameTypeResponse.json();

      const sameType = await sameTypeResult.data.filter(
        (item: Exercise) =>
          item.name !== current.name);

      const videos = await fetch(`/.netlify/functions/vfetchVideos?name=${name}`);
      const videosData = await videos.json();

      return {
        status: mainExercise.status,
        current: current,
        sameMuscle: sameMuscle,
        sameType: sameType,
        videosData: videosData.data
      }
    } catch {
        return {
          status: false,
          current: null,
          sameMuscle: [],
          sameType: [],
          videosData: []
        }
    }

  }
);
