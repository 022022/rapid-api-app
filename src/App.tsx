import React from 'react';
import Navigation from './components/Navigation';

function App(){
  return (
    <>
      <div className="md:container md:mx-auto bg-gray-800">
        <h1 className="text-zinc-100">
          Hello world!
        </h1>
        <Navigation />
      </div>
    </>
  )
}

export default App;