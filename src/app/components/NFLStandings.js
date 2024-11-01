"use client";

import { useEffect, useState } from 'react';

const NFLStandings = () => {
  const [standings, setStandings] = useState([]);
  const [season, setSeason] = useState('2024');  // Default season
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);  // Reset any previous error
    try {
      const response = await fetch(`/api/nfl-standings?season=${season}`);
      const data = await response.json();

      if (!data || data.error) {
        throw new Error(data.error || 'Failed to load standings');
      }

      setStandings(data);
    } catch (error) {
      console.error('Error fetching NFL standings:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [season]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">NFL Season Standings</h2>

      <div className="flex justify-center mb-6">
        <label className="mr-4 font-semibold text-gray-700">Season:</label>
        <input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="border rounded-md p-2 mr-4 text-gray-800"
        />
        <button
          onClick={fetchStandings}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Fetch Standings
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-700">Loading standings...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">Error: {error}</p>
      ) : standings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-700 text-white border-b border-gray-400">
                <th className="px-6 py-3 text-left text-sm font-semibold">Team</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Wins</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Losses</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Ties</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Division</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100 text-gray-800" : "bg-white text-gray-800"}
                >
                  <td className="px-6 py-4 border-b border-gray-300">{team.Team}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{team.Wins}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{team.Losses}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{team.Ties}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{team.Division}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-700">No standings available for this season.</p>
      )}
    </div>
  );
};

export default NFLStandings;
