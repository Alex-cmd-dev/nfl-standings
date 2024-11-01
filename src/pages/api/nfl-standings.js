import axios from 'axios';

export default async function handler(req, res) {
  const { season } = req.query;

  console.log('Season:', season);  // Log season parameter for debugging
  console.log('API Key:', process.env.SPORTSDATA_API_KEY);  // Log API key to check if it’s loaded

  if (!season) {
    return res.status(400).json({ error: 'Missing season parameter' });
  }

  try {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/Standings/${season}?key=${process.env.SPORTSDATA_API_KEY}`;
    console.log('Request URL:', url);  // Log the request URL for debugging

    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching NFL standings:', error);
    res.status(500).json({ error: 'Error fetching NFL standings' });
  }
}
