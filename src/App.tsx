import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Exercise from './pages/Excercise';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

function App() {
	return (
		<>
			<div className='md:container md:mx-auto bg-gray-800'>
				<Navigation />
			</div>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/exercise/:id' element={<Exercise />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
