import axios from 'axios';

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

async function fetchVideoData(searchTerm?: string){
  const searchTermSport = searchTerm + ' exercise';

  const config = {params: {q: searchTermSport}};

  try {
    const data = await youtubeApiRequest.request(config);
    return await data.data.items;
  } catch (error) {
    return [];
  }
}

export default fetchVideoData;