import { configureStore } from '@reduxjs/toolkit';
import { ExerciseDetailsSlice } from './exercisesSlice';

export const store = configureStore({
  reducer: {
    exerciseDetails : ExerciseDetailsSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;