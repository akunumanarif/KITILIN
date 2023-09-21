// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [elementToClick, setElementToClick] = useState('');
  const [elementToCopy, setElementToCopy] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const startAutomation = async () => {
    if (!url || !elementToClick || !elementToCopy) {
      alert('Please provide all necessary inputs.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/automate', {
        url,
        elementToClick,
        elementToCopy
      });

      if (response.data && response.data.copiedText) {
        setCopiedText(response.data.copiedText);
      } else {
        alert('Error occurred during automation.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Error occurred during automation.');
    }
  };

  return (
    <div className="container">
      <h1>Swagger API Tester</h1>

      <label htmlFor="urlInput">Swagger API URL:</label>
      <input
        type="text"
        id="urlInput"
        placeholder="Enter Swagger API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <label htmlFor="elementToClickInput">Element to Click:</label>
      <input
        type="text"
        id="elementToClickInput"
        placeholder="CSS Selector of Element to Click"
        value={elementToClick}
        onChange={(e) => setElementToClick(e.target.value)}
      />

      <label htmlFor="elementToCopyInput">Element to Copy:</label>
      <input
        type="text"
        id="elementToCopyInput"
        placeholder="CSS Selector of Element to Copy"
        value={elementToCopy}
        onChange={(e) => setElementToCopy(e.target.value)}
      />

      <button onClick={startAutomation}>Start Automation</button>

      {copiedText && (
        <div id="results">
          <h2>Results</h2>
          <table id="resultsTable">
            <thead>
              <tr>
                <th>Copied Text</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{copiedText}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
