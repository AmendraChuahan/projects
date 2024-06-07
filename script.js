async function fetchStockData(symbol) {
    const apiKey = 'YOUR_API_KEY';  // Replace with your Alpha Vantage API key
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
    const data = await response.json();
    return data["Global Quote"];
  }
  
  async function displayStockData(symbol) {
    const stock = await fetchStockData(symbol);
    const stocksDiv = document.getElementById("stocks");
    stocksDiv.innerHTML = ''; // Clear any existing data
  
    if (stock) {
      const stockDiv = document.createElement("div");
      stockDiv.className = "stock";
      stockDiv.innerHTML = `
        <h3>${stock["01. symbol"]}</h3>
        <p>Price: $${parseFloat(stock["05. price"]).toFixed(2)}</p>
        <p>Change: ${parseFloat(stock["09. change"]).toFixed(2)} (${stock["10. change percent"]})</p>
      `;
      stocksDiv.appendChild(stockDiv);
    } else {
      stocksDiv.innerHTML = `<p>Stock data not found. Please check the symbol and try again.</p>`;
    }
  }
  
  function searchStock() {
    const symbol = document.getElementById("stockSymbol").value.toUpperCase().trim();
    if (symbol) {
      displayStockData(symbol);
    } else {
      alert('Please enter a stock symbol');
    }
  }
  