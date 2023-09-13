import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [keyword, setKeyword] = useState('');
  const [joke, setJoke] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Joke Generator';
  }, []);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const generateJoke = async () => {
    try {
      setError('');
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          prompt: `Tell me a joke about ${keyword}`,
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      console.log(response.data);
      setJoke(response.data.choices[0].text);
    } catch (err) {
      console.log(err.message);
      setError('Error fetching joke. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Joke Generator</h1>
      <input
        type="text"
        placeholder="Enter a keyword"
        value={keyword}
        onChange={handleInputChange}
      />
      <button onClick={generateJoke}>Generate Joke</button>
      {error && <p className="error">{error}</p>}
      {joke && <p>{joke}</p>}
    </div>
  );
}

export default App;
