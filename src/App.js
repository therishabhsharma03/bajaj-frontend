import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; // Import the CSS file

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    document.title = "21BCE11053";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse({});
    setLoading(true); // Set loading to true

    try {
      console.log("Submitting:", jsonInput);

      const parsedInput = JSON.parse(jsonInput);
      console.log("Parsed Input:", parsedInput);

      if (!parsedInput.data) throw new Error("Invalid JSON structure");

      const res = await axios.post("https://bajaj-backend-f195.onrender.com/bfhl", parsedInput);

      console.log("Response:", res.data);

      setResponse(res.data);
    } catch (err) {
      console.error("Error:", err);
      setError("Invalid JSON input or server error");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="App">
      <h1>JSON Input Form</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data": ["A","1","b"]}'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {loading && <div className="loading">Backend is loading...</div>}
      {error && <div className="error">{error}</div>}
      {response && Object.keys(response).length > 0 && (
        <div className="response-container">
          <h3>Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
