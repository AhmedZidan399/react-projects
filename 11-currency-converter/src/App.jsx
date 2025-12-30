import { useState, useEffect } from "react";

export default function App() {
  // https://api.frankfurter.app/latest?amount=10&from=USD&to=EUR
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(0);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchData() {
        try {
          if (amount <= 0 || fromCurrency === toCurrency) {
            setResult(amount > 0 ? amount : 0);
            return;
          }
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
            { signal: controller.signal }
          );

          const data = await res.json();
          setResult(data.rates[toCurrency]);
        } catch (err) {
          if (err.name === "AbortError") return;
          console.error(err);
        }
      }

      fetchData();

      return function () {
        controller.abort();
      };
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div style={{ margin: "auto 20px" }}>
      <input
        type="number"
        min={0}
        value={amount > 0 ? amount : ""}
        onChange={(e) => setAmount(e.target.value)}
      />
      {/* from */}
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="AUD">AUD</option>
      </select>
      {/* to */}
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="AUD">AUD</option>
      </select>
      <div>Result: {result}</div>
    </div>
  );
}
