import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Card from '../components/Card';
import fetchSearchData from '../services/fetchSearchData';

function Main(){

  const [searchTerm, setSearchTerm] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const search = async () => {
    const data = await fetchSearchData(searchTerm);
    setSearchResults(data);
    console.log(data);
  }

  return <>
    <h1>Search</h1>
    <input type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-600 rounded-md text-sm
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
    <button onClick={search} className="w-40 bg-amber-600 hover:bg-amber-400 active:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-900 ...">
      Search
    </button>

    { searchResults.map((item) => <Card data={item} key={nanoid()}></Card>) }
  </>
}

export default Main;