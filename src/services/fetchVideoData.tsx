import axios from 'axios';

async function fetchVideoData(searchTerm: string | undefined){
  const key = process.env.REACT_APP_YOUTUBE_API_KEY;
  if(!key) throw new Error('Videos API key missing');
  if(!searchTerm) throw new Error('search word missing');
  const maxResults = 3;

  const searchTermSport = searchTerm + ' exercise';

  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${maxResults}&q=${searchTermSport}`;

  try {
    const data = await axios.get(url);
    return await data.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchVideoData;