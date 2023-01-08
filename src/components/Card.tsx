import React from 'react';
import { Exercise } from '../types/types';


function Card({data}: {data: Exercise} ){
  return <>{data.type} </>
}

export default Card;