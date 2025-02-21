import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "https://bajaj-finserv-cyan.vercel.app/bfhl"; // Replace with actual backend URL

  // Handle API Request
  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedData = JSON.parse(inputData);

      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format. Must contain a 'data' array.");
      }

      const response = await axios.post(API_URL, parsedData);
      setResponseData(response.data);
    } catch (err) {
      setError(err.message);
      setResponseData(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">BFHL Challenge</h1>
        
        {/* Textarea Input */}
        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          placeholder='Enter JSON (e.g. { "data": ["A", "1", "B"] })'
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {/* Error Message */}
        {error && <p className="mt-3 text-red-600 font-semibold text-center">{error}</p>}

        {/* Response Section */}
        {responseData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Response:</h2>

            {/* Dropdown Filter */}
            <select
              multiple
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions).map(o => o.value);
                setSelectedFilters(options);
              }}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highest_alphabet">Highest Alphabet</option>
            </select>

            {/* Display Filtered Response */}
            <pre className="mt-3 p-3 bg-white border border-gray-200 rounded-md overflow-auto text-sm text-gray-800">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(responseData).filter(([key]) => selectedFilters.includes(key))
                ), null, 2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
