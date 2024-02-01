import axios from 'axios';
import { useState } from 'react';
import './App.css';

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [pokeName, setPokeName] = useState('');
  const [pokeData, setPokeData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = 'https://localhost:7050/api/pokemon';
  const url = `${baseUrl}/${pokeName}`;
  const getPokemon = async () => {
    setLoading(true);
    const params = {
      name: pokeName,
    };
    try {
      const response = await axios.get(url, { params });
      const pokemon: Pokemon = response.data;
      setPokeData(pokemon);
    } catch (error) {
      setPokeData(null);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="content-container">
          <div className="content">
            <div className="title">
              <h2>Pokédex</h2>
            </div>

            <>
              <div>
                <p style={{ color: 'black' }}>
                  {loading ? 'Loading...' : pokeData ? `${pokeData.name}` : 'No pokemon found'}
                </p>
              </div>
              <div>
                <div className="image-container">
                  {loading ? null : <img src={pokeData?.url} alt="" />}
                </div>
              </div>
            </>

            <div className="submit-container">
              <input
                className="input"
                type="text"
                value={pokeName}
                onChange={(e) => setPokeName(e.target.value)}
              />
              <button className="button" onClick={getPokemon}>
                <p>Click</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
