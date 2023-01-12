import { useState } from 'react';
import { nanoid } from 'nanoid';
import Card from '../components/Card';
import fetchSearchData from '../services/fetchSearchData';
import { Exercise } from '../types/types';

function Main(){

  const [searchTerm, setSearchTerm] = useState('');

  const [searchResults, setSearchResults] = useState([]);


  const search = async () => {
    const data = await fetchSearchData(`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?name=${searchTerm}`);
    setSearchResults(data);
    console.log(data);
  }

  return <main className='prose flex flex-col items-center gap-3.5 px-3.5 py-12 text-center'>

    <h1>Search exercises</h1>
    <p >Search for exercise name or body part (like "sit-up" or "leg")</p>

    <input type="text"
      placeholder="Start here"
      className="input input-bordered input-accent w-full max-w-xs"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}/>
    <button onClick={search} className="btn btn-accent">
      Search
    </button>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-max" >
      { searchResults.map((item: Exercise) => <Card data={item} key={nanoid()}></Card>) }
    </div>


  </main>
}

export default Main;