import { configureStore } from '@reduxjs/toolkit';
import { ExerciseSearchSlice } from './exerciseSearchSlice';
import { ExerciseDetailsSlice } from './exercisesSlice';

export const store = configureStore({
  reducer: {
    exerciseDetails : ExerciseDetailsSlice.reducer,
    exercisesSearch : ExerciseSearchSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;