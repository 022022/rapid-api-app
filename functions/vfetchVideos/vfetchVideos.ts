import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (event, context) => {
  const youtubeApiRequest = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/search',
  });

  youtubeApiRequest.interceptors.request.use(
    (request) => {
      const key = process.env.REACT_APP_YOUTUBE_API_KEY;
      if(!key) throw new Error('Videos API key missing');

      const maxResults = 3;

      request.params['key'] = key;
      request.params['type'] = 'video';
      request.params['part'] = 'snippet';
      request.params['maxResults'] = maxResults;

      return request;
    }
  )

  const name = event.queryStringParameters?.name;

  const searchTermSport = name + ' exercise how to';

  const config = {params: {q: searchTermSport}};

  try {
    const data = await youtubeApiRequest.request(config);
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: data.data.items,
      }),
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        data: [],
      }),
    }
  }
}