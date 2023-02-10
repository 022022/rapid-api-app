import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { Difficulty, ExerciseType, Muscle } from '../../types/types';
import { renderWithProviders } from '../../utils/testUtils';
import ExerciseDetails from './ExerciseDetails';

describe('Exercise Details', () => {
  global.scrollTo = jest.fn();

  it('renders success', async () => {
    const successState = {
      exerciseDetails: {
        loading: false,
        errorMessage: '',
        currentExercise: {name: 'Biceps curl to shoulder press', type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.beginner, instructions: '' },
        exerciseVideos: [],
        sameType: [],
        sameMuscle: [],
      },
      exercisesSearch: {
        searchTerm: '',
        loading: false,
        errorMessage: '',
        searchResults: null,
      }
    };

    renderWithProviders(<ExerciseDetails setMyExercises={jest.fn()} myExercises={[]}/>, { preloadedState: successState });
    expect(await screen.findByText(/Biceps curl to shoulder press/i)).toBeInTheDocument();
    expect(await screen.findByText(/Sorry, detailed explanations for this exercise are not available for now/i)).toBeInTheDocument();
  });

  it('renders error', async () => {
    const errorState = {
      exerciseDetails: {
        loading: false,
        errorMessage: 'test error message',
        currentExercise: null,
        exerciseVideos: [],
        sameType: [],
        sameMuscle: [],
      },
      exercisesSearch: {
        searchTerm: '',
        loading: false,
        errorMessage: '',
        searchResults: null,
      }
    }

    renderWithProviders(<ExerciseDetails setMyExercises={jest.fn()} myExercises={[]}/>, { preloadedState: errorState });
    expect(await screen.findByText(/test error message/i)).toBeInTheDocument();
  });
});