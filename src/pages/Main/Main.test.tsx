import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Difficulty, ExerciseType, Muscle } from '../../types/types';
import { renderWithProviders } from '../../utils/testUtils';
import Main from './Main';

describe('Main', () => {
  it('opens', async () => {
    renderWithProviders(<Main />);
    const searchField = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /Search/i })

    expect(searchField).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('sends request, gets response and renders empty results', async () => {
    renderWithProviders(<Main />);
    const searchField = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /Search/i })

    expect(screen.queryByText(/Sorry, nothing found/i)).not.toBeInTheDocument();

    userEvent.type(searchField, 'Test search input');
    userEvent.click(searchButton);

    expect(await screen.findByText(/Sorry, nothing found/i)).toBeInTheDocument();
  });


  it('renders error', async () => {
    const errorState = {
      exerciseDetails: {
        loading: false,
        errorMessage: '',
        currentExercise: null,
        exerciseVideos: [],
        sameType: [],
        sameMuscle: [],
      },
      exercisesSearch: {
        searchTerm: '',
        loading: false,
        errorMessage: 'test error message',
        searchResults: null,
      }
    }

    renderWithProviders(<Main />, { preloadedState: errorState });

    expect(screen.getByText(/test error message/i)).toBeInTheDocument();
  });


  it('renders exercise data', async () => {
    const successState = {
      exerciseDetails: {
        loading: false,
        errorMessage: '',
        currentExercise: null,
        exerciseVideos: [],
        sameType: [],
        sameMuscle: [],
      },
      exercisesSearch: {
        searchTerm: 'biceps',
        loading: false,
        errorMessage: '',
        searchResults: [
          {name: 'Biceps curl to shoulder press', type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.beginner, instructions: '' },
          {name: 'Alternating incline dumbbell biceps curl', type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.intermediate, instructions: '' },
          {name: 'Seated dumbbell biceps curl', type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.intermediate, instructions: '' },
        ],
      }
    }

    renderWithProviders(<Main />, { preloadedState: successState });

    expect(screen.queryByText(/Sorry, nothing found/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Biceps curl to shoulder press/i)).toBeInTheDocument();
    expect(screen.getByText(/Alternating incline dumbbell biceps curl/i)).toBeInTheDocument();
    expect(screen.getByText(/Seated dumbbell biceps curl/i)).toBeInTheDocument();
  });

});