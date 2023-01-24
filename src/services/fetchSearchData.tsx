import axios from 'axios';
import { ExerciseType, Muscle } from '../types/types';

const exercisesApiRequest = axios.create({
  baseURL: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
});

exercisesApiRequest.interceptors.request.use(
  (request) => {
    const key = process.env.REACT_APP_RAPID_API_KEY;
    if(!key) throw new Error('API key missing');

    request.method = 'GET';
    request.headers = {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
    return request;
  });

async function fetchSearchData(params: {[key: string]: string | Muscle | ExerciseType}){
  const config = {params: params};

  try {
    const response = await exercisesApiRequest.request(config);
    const data = await response.data;
    return {status: true, data: data};
  } catch (error) {
    return {status: false, data: []};
  }
}

export default fetchSearchData;