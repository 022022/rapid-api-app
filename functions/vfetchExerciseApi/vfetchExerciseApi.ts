import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (event, context) => {
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

  let params = {}
  if(event.queryStringParameters?.name) params = {name : event.queryStringParameters?.name}
  if(event.queryStringParameters?.muscle) params = {muscle : event.queryStringParameters?.muscle}
  if(event.queryStringParameters?.type) params = {type : event.queryStringParameters?.type}

  const config = {params: params};
  console.log(config);

  try {
    const response = await exercisesApiRequest.request(config);
    const data = await response.data;
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        data: data,
      }),
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 404,
      body: JSON.stringify({
        status: false,
        data: [],
      }),
    }
  }
}
