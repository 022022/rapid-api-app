import { nanoid } from 'nanoid';
import Card from '../components/Card';
import { Exercise } from '../types/types';
import { useAppDispatch, useAppSelector } from '../services/store/preTypedHooks';
import { fetchExerciseSearchData, setSearchTerm } from '../services/store/exerciseSearchSlice';

function Main(){
  const state = useAppSelector((state) => state.exercisesSearch);
  const dispatch = useAppDispatch();
  const { loading, errorMessage } = useAppSelector((state) => state.exercisesSearch);

  const search = async () => {
    dispatch(fetchExerciseSearchData({ name: state.searchTerm }))
  }

  return <main className='prose flex flex-col items-center gap-3.5 px-3.5 py-12 text-center'>

    <h1>Search exercises</h1>
    <p>Search for exercise name or body part (like <button className='link link-accent'
        onClick={() => dispatch(setSearchTerm('sit-up'))}>sit-up</button> or <button className='link link-accent'
        onClick={() => dispatch(setSearchTerm('barbell'))}>barbell</button>
    )</p>

    <input type="text"
      placeholder="Start here"
      className="input input-bordered input-accent w-full max-w-xs"
      value={state.searchTerm}
      onChange={(e) => dispatch(setSearchTerm(e.target.value.toLowerCase()))}/>
    <button onClick={search} className="btn btn-accent">
      Search
    </button>

    { errorMessage && <p>{errorMessage}</p> }

    { loading && <div className='lds-dual-ring'></div> }

    { !errorMessage && state.searchResults && !state.searchResults.length ? <p>Sorry, nothing found</p> : null }

    { state.searchResults && state.searchResults.length ?
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-max" >
      {state.searchResults.map((item: Exercise) => <Card data={item} key={nanoid()}></Card>)}
      </div>
     : null
    }

  </main>
}

export default Main;