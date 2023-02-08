import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ExerciseDetails from './pages/ExerciseDetails';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound';
import SavedExercises from './pages/SavedExercises';
import useLocalStorage from './services/hooks/useLocalStorage';

function App() {
  const [myExercises, setMyExercises] = useLocalStorage('savedExercises', []);

	return (
		<>
    <Navigation />
			<div className='md:container md:mx-auto flex flex-col items-center'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/exercise/:name' element={<ExerciseDetails setMyExercises={setMyExercises} myExercises={myExercises} />} />
            <Route path='/saved' element={<SavedExercises setMyExercises={setMyExercises} myExercises={myExercises}/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>


      </div>
		</>
	);
}

export default App;
