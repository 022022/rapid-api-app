import { Routes, Route } from 'react-router-dom';
import ExerciseDetails from './pages/ExerciseDetails';

import Main from './pages/Main';
import NotFound from './pages/NotFound';

function App() {

	return (
		<>
			<div className='md:container md:mx-auto flex flex-col items-center'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/exercise/:name' element={<ExerciseDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>


      </div>
		</>
	);
}

export default App;
