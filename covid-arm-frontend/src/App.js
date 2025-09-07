import React, { useEffect, useState } from "react";

function App() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [weatherInput, setWeatherInput] = useState("");
  const [weatherOptions, setWeatherOptions] = useState([]);
  const [symptomInput, setSymptomInput] = useState("");
  const [symptomOptions, setSymptomOptions] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [reversePredictions, setReversePredictions] = useState([]);

  const [showButton, setShowButton] = useState(false);
  const [expanded, setExpanded] = useState(null); // 🔹 Track expanded card

  // Fetch rules from FastAPI
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rules")
      .then((res) => res.json())
      .then((data) => {
        setRules(data);
        setWeatherOptions(
          Array.from(new Set(data.map((r) => r.antecedents_str))).sort()
        );
        setSymptomOptions(
          Array.from(new Set(data.map((r) => r.consequents_str))).sort()
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rules:", err);
        setError("Failed to load rules");
        setLoading(false);
      });
  }, []);

  // Show Back to Top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWeatherPredict = () => {
    setPredictions(rules.filter((r) => r.antecedents_str === weatherInput));
  };

  const handleSymptomPredict = () => {
    setReversePredictions(
      rules.filter((r) => r.consequents_str === symptomInput)
    );
  };

  const filteredRules = rules.filter(
    (rule) =>
      rule.antecedents_str.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.consequents_str.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading">Loading rules...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#2563eb" }}>
        🌤️ Covid-19 Symptoms & Weather Conditions
      </h1>

      {/* Weather → Symptoms */}
      <div
        style={{
          margin: "20px auto",
          padding: "20px",
          maxWidth: "700px",
          background: "#f0f9ff",
          borderRadius: "12px",
        }}
      >
        <h2>Weather → Predict Symptoms</h2>
        <select
          value={weatherInput}
          onChange={(e) => setWeatherInput(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        >
          <option value="">-- Select Weather Condition --</option>
          {weatherOptions.map((w, idx) => (
            <option key={idx} value={w}>
              {w}
            </option>
          ))}
        </select>
        <button
          onClick={handleWeatherPredict}
          style={{
            padding: "10px 15px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Predict
        </button>

        {predictions.length > 0 && (
          <div style={{ marginTop: "15px" }}>
            <h3>Predicted Symptoms:</h3>
            <ul>
              {predictions.map((p, idx) => (
                <li key={idx}>
                  <strong>{p.consequents_str}</strong> (Confidence:{" "}
                  {(p.confidence * 100).toFixed(1)}%, Lift:{" "}
                  {p.lift.toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Symptoms → Weather */}
      <div
        style={{
          margin: "20px auto",
          padding: "20px",
          maxWidth: "700px",
          background: "#fef9c3",
          borderRadius: "12px",
        }}
      >
        <h2>Symptom → Predict Weather</h2>
        <select
          value={symptomInput}
          onChange={(e) => setSymptomInput(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        >
          <option value="">-- Select Symptom --</option>
          {symptomOptions.map((s, idx) => (
            <option key={idx} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={handleSymptomPredict}
          style={{
            padding: "10px 15px",
            backgroundColor: "#ca8a04",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Predict
        </button>

        {reversePredictions.length > 0 && (
          <div style={{ marginTop: "15px" }}>
            <h3>Predicted Weather:</h3>
            <ul>
              {reversePredictions.map((p, idx) => (
                <li key={idx}>
                  <strong>{p.antecedents_str}</strong> (Confidence:{" "}
                  {(p.confidence * 100).toFixed(1)}%, Lift:{" "}
                  {p.lift.toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Search All Rules */}
      <div
        style={{
          margin: "20px auto",
          padding: "20px",
          maxWidth: "700px",
          background: "#f1f5f9",
          borderRadius: "12px",
        }}
      >
        <h2>🔎 Search All Rules</h2>
        <input
          type="text"
          placeholder="Search by weather or symptom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* All Rules with collapsible cards */}
      <h2 style={{ marginTop: "30px", textAlign: "center" }}>📋 All Rules</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {filteredRules.map((rule, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() =>
              setExpanded(expanded === idx ? null : idx) // Toggle expand
            }
          >
            <h3 style={{ color: "#2563eb" }}>
              {rule.antecedents_str} → {rule.consequents_str}
            </h3>
            {expanded === idx && (
              <div style={{ marginTop: "10px" }}>
                <p>
                  <strong>Support:</strong>{" "}
                  {(rule.support * 100).toFixed(2)}%
                </p>
                <p>
                  <strong>Confidence:</strong>{" "}
                  {(rule.confidence * 100).toFixed(2)}%
                </p>
                <p>
                  <strong>Lift:</strong> {rule.lift.toFixed(2)}
                </p>
              </div>
            )}
            <p
              style={{
                marginTop: "10px",
                fontStyle: "italic",
                color: "#6b7280",
              }}
            >
              {expanded === idx ? "Click to collapse ▲" : "Click to expand ▼"}
            </p>
          </div>
        ))}
      </div>

      {/* Back to Top */}
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "18px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
