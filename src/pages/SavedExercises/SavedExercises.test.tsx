import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SavedExercises from './SavedExercises';
import { Difficulty, ExerciseType, Muscle } from '../../types/types';
import userEvent from '@testing-library/user-event';

describe('Saved Exercises', () => {
  it('renders empty page', () => {
    render(<SavedExercises setMyExercises={jest.fn()} myExercises={[]} />)
    expect(screen.getByText(/You have no saved exercises for now/i)).toBeInTheDocument();
  });

  it('renders exercises from props', () => {
    const testMyExercises = [
      {name: 'Biceps curl to shoulder press', images: [], type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.beginner, instructions: '' },
      {name: 'Alternating incline dumbbell biceps curl', images: [], type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.intermediate, instructions: '' },
      {name: 'Seated dumbbell biceps curl', images: [], type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.intermediate, instructions: '' },
    ];
    render(<SavedExercises setMyExercises={jest.fn()} myExercises={testMyExercises} />)
    expect(screen.getByText(/Biceps curl to shoulder press/i)).toBeInTheDocument();
    expect(screen.getByText(/Alternating incline dumbbell biceps curl/i)).toBeInTheDocument();
    expect(screen.getByText(/Seated dumbbell biceps curl/i)).toBeInTheDocument();
  });

  it('calls remove exercise function', () => {
    const testMyExercises = [
      {name: 'Biceps curl to shoulder press', images: [], type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.beginner, instructions: '' },
      {name: 'Alternating incline dumbbell biceps curl', images: [], type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.intermediate, instructions: '' },
      {name: 'Seated dumbbell biceps curl', images: [], type: ExerciseType.strength, muscle: Muscle.biceps, equipment: 'dumbbell', difficulty: Difficulty.intermediate, instructions: '' },
    ];

    const mockSetMyExercises = jest.fn();
    render(<SavedExercises setMyExercises={mockSetMyExercises} myExercises={testMyExercises} />)

    const removeButtons = screen.getAllByRole('button', { name: /Remove from Saved Exercises/i })
    userEvent.click(removeButtons[0]);

    expect(mockSetMyExercises).toHaveBeenCalled();
  })
})