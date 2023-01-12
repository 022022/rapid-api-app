async function fetchVideoData(searchTerm: string | undefined){
  const key = process.env.REACT_APP_YOUTUBE_API_KEY;
  if(!key) throw new Error('Videos API key missing');
  if(!searchTerm) throw new Error('search word missing');
  const maxResults = 5;

  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${maxResults}&q=${searchTerm}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export default fetchVideoData;