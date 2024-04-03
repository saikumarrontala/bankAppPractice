import "./BankApp.css";
import React, { useState } from "react";
const TRANACTIONS_TYPES = {
  deposit: "DEPOSIT",
  withdraw: "WITHDRAW",
};
const BankApp = () => {
  const [balance, setBalance] = useState(0);
  const [transcationAmount, setTranscationAmount] = useState(10);
  const [transcationType, setTranscatioType] = useState(
    TRANACTIONS_TYPES.deposit
  );

  const handleTranscation = () => {
    const amount = parseFloat(transcationAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter valid ammount");
      return;
    }
    if (transcationType === TRANACTIONS_TYPES.deposit) {
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
        <label className="transactiontype">
          Transaction Type:{transcationType}
          <select
            value={transcationType}
            onChange={(e) => setTranscatioType(e.target.value)}
          >
            <option value="">Select</option>
            <option value={TRANACTIONS_TYPES.deposit}>Deposit</option>
            <option value={TRANACTIONS_TYPES.withdraw}>Withdraw</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={transcationAmount}
            onChange={(args) =>
              setTranscationAmount(parseInt(args.target.value))
            }
          />
        </label>

        <button onClick={handleTranscation}>Submit</button>
      </div>
    </div>
  );
};

export default BankApp;
