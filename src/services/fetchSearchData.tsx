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
    const response = await axios.get(url, config);
    const data = await response.data;
    return {status: true, data: data};
  } catch (error) {
    return {status: false, data: []};
  }

}

export default fetchSearchData;