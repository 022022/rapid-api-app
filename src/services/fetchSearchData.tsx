async function fetchSearchData(url: string){
  const key = process.env.REACT_APP_RAPID_API_KEY;

  if(!key) throw new Error('API key missing')

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

export default fetchSearchData;