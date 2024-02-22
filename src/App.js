// import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [transcationAmount, setTranscationAmount] = useState("");
  const [transcationType, setTranscatioType] = useState("deopsit");

  const handleTranscation = () => {
    const amount = parseFloat(transcationAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter valid ammount");
      return;
    }
    if (transcationType === "deposit") {
      setBalance(balance + amount);
    } else {
      if (balance < amount) {
        alert("instffecuent funds.");
        return;
      }
      setBalance(balance - amount);
    }
    setTranscationAmount("");
  };

  return (

    <div className="bank-app-container">
      <h1>Bank Application</h1>
      <div className="account-details">
        <h2>Account Balance: ${balance.toFixed(2)}</h2>
        <label>
          Transaction Type:
          <select
            value={transcationType}
            onChange={(e) => setTranscatioType(e.target.value)}
          >
            <option value="deposite">Deposite</option>
            <option value="withdraw">withdraw</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={transcationAmount}
            onChange={(e) => setTranscationAmount(e.target.value)}
          />
        </label>

        <button onClick={handleTranscation}>Submit</button>
      </div>
    </div>
  );
}

export default App;
