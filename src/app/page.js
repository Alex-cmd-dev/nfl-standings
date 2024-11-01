import NFLStandings from './components/NFLStandings';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">NFL Standings</h1>
      <NFLStandings />
    </div>
  );
}
