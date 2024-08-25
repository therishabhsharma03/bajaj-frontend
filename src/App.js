import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; // Import the CSS file
// Function to validate JSON format
const isValidJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState({});
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "21BCE11053";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse({});
    setLoading(true);

    try {
      console.log("Submitting:", jsonInput);

      // Validate JSON format
      if (!isValidJson(jsonInput)) {
        throw new Error("Invalid JSON format");
      }

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
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setFilters(value);
  };

  const renderFilteredResponse = () => {
    return (
      <div>
        {filters.includes("Numbers") && (
          <div>Numbers: {response.numbers?.join(", ")}</div>
        )}
        {filters.includes("Alphabets") && (
          <div>Alphabets: {response.alphabets?.join(", ")}</div>
        )}
        {filters.includes("Highest lowercase alphabet") && (
          <div>
            Highest lowercase alphabet: {response.highest_lowercase_alphabet?.join(", ")}
          </div>
        )}
      </div>
    );
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
          placeholder={`{
  "data": ["A", "C", "Z", "c", "i"]
}`}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {loading && (
        <div className="loading">
          <div className="loader"></div>
          Backend is loading... It may take up to a minute to start the backend service.
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {response && Object.keys(response).length > 0 && (
        <div className="response-container">
          <h3>Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <label>Multi Filter</label>
          <select multiple={true} onChange={handleFilterChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <h3>Filtered Response</h3>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
