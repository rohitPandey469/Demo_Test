import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const BACKEND_URL = "https://demo-test-1ayi.onrender.com"
// 'https://your-backend-url/bfhl'

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("Handle SUbmit called")
    try {
      const parsedData = JSON.parse(jsonInput);
      console.log(parsedData)
      const res = await axios.post(`${BACKEND_URL}/bfhl`, parsedData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input or server error');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div className="response">
        {selectedOptions.includes('Alphabets') && response.alphabets.length > 0 && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && response.numbers.length > 0 && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest alphabet') && response.highest_alphabet.length > 0 && (
          <div>
            <h3>Highest Alphabet:</h3>
            <p>{response.highest_alphabet}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='AppWrap'>
      <div className="App">
      <h1>Your Roll Number</h1>
      <div className = "wrap">
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON like { "data": ["A","C","z"] }'
      />
      <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Select what to display:</h2>
          <label>
            <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
            Alphabets
          </label>
          <label>
            <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
            Numbers
          </label>
          <label>
            <input type="checkbox" value="Highest alphabet" onChange={handleOptionChange} />
            Highest Alphabet
          </label>
        </div>
      )}
      {renderResponse()}
    </div>
    </div>
  );
}

export default App;
