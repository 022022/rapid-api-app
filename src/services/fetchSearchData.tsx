import axios from 'axios';

async function fetchSearchData(url: string){
  const key = process.env.REACT_APP_RAPID_API_KEY;

  if(!key) throw new Error('API key missing')

  const config = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
  };

  try {
    const data = await axios.get(url, config);
    return await data.data;
  } catch (error) {
    console.log(error);
  }

}

export default fetchSearchData;