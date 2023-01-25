import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Exercise} from '../../types/types';
import fetchSearchData from '../fetchSearchData';

interface ExerciseSearchState {
  searchTerm: string;
	loading: boolean;
	errorMessage: string;
	searchResults: Exercise[] | null,
};

const initialState: ExerciseSearchState = {
  searchTerm: '',
	loading: false,
	errorMessage: '',
	searchResults: null,
};

export const ExerciseSearchSlice = createSlice({
	name: 'exerciseSearch',
	initialState,
	reducers: {
    setSearchTerm(state, action){
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchExerciseSearchData.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
        state.searchResults = null;
     })
    .addCase(fetchExerciseSearchData.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.errorMessage;
        state.searchResults = action.payload.searchResults;
    });
  }
});


export const { setSearchTerm } = ExerciseSearchSlice.actions;

export const fetchExerciseSearchData = createAsyncThunk
  <{errorMessage: string, searchResults: Exercise[]}, {name: string} >
  (
  'exerciseSearch/fetchData',
  async ({name}) => {
    const data = await fetchSearchData({name});
    let errorMessage = '';

    if(!data.status){
      errorMessage = 'An error has occurred, we are working on it. Please try again later';
    }

    return {
      errorMessage: errorMessage,
      searchResults: data.data,
    }
  }
)
