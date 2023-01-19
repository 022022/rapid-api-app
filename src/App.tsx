import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ExerciseDetails from './pages/ExerciseDetails';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import useLocalStorage from './services/hooks/useLocalStorage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [myExercises, setMyExercises] = useLocalStorage('savedExercises', []);

	return (
		<>
			<div className='md:container md:mx-auto flex flex-col items-center'>
          <Routes>
            <Route path='/' element={<Main setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>} />
            <Route path='/exercise/:name' element={<ExerciseDetails setMyExercises={setMyExercises} myExercises={myExercises} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>


      </div>
		</>
	);
}

export default App;
