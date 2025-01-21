import { useEffect, useState } from "react";
import "./App.css";
// import WebSocketComponent from "./component/WebSocketComponent";
import SubscribeUnsubscribe from "./component/SubscribeUnsubscribe";
import SystemStatus from "./component/SystemStatus";
import PriceView from "./component/PriceView";
import MatchView from "./component/MatchView";

// Hardcoded price data for demonstration purposes
const priceViewdata = {
  base_currency: "BTC",
  quote_currency: "USD",
  current_price: 43000.75,
  price_change_percentage_24h: 3.21,
  high_24h: 43500.5,
  low_24h: 42000.0,
  volume_24h: 1200.55,
  market_cap: 815000000.0,
  timestamp: "2025-01-21T12:00:00Z",
};

// Hardcoded match data for demonstration purposes
const matchViewData = {
  trade_id: 12345678,
  base_currency: "BTC",
  quote_currency: "USD",
  price: 43000.75,
  size: 0.5,
  side: "buy",
  timestamp: "2025-01-21T11:59:00Z",
  buyer_id: "user_001",
  seller_id: "user_002",
  order_id: "order_12345",
  matched_order_id: "order_54321",
};

function App() {
  // State to store price data, initialized with hardcoded data
  const [priceData, setPriceData] = useState(priceViewdata);

  // State to store match data, initialized with hardcoded data
  const [matches, setMatches] = useState(matchViewData);

  // State to manage subscribed products for WebSocket
  const [subscribedProducts, setSubscribedProducts] = useState([]);

  useEffect(() => {
    // Open WebSocket connection to the backend
    const ws = new WebSocket("ws://localhost:5000");

    // When WebSocket connection opens, log a message
    ws.onopen = () => {
      console.log("Connected to backend");
    };

    // When a message is received from the WebSocket, handle it
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // If the message is of type 'snapshot' or 'l2update', update the price data
      if (data.type === "snapshot" || data.type === "l2update") {
        setPriceData((prevData) => [...prevData, data]);
      }
      // If the message is of type 'match', update the match data
      else if (data.type === "match") {
        setMatches((prevMatches) => [...prevMatches, data]);
      }
    };

    // When WebSocket connection is closed, log a message
    ws.onclose = () => {
      console.log("Disconnected from backend");
    };

    // Clean up WebSocket connection when component unmounts
    return () => ws.close();
  }, []);

  // Function to handle subscribing to a product
  const handleSubscribe = (product) => {
    // Add the product to the subscribed products list
    setSubscribedProducts([...subscribedProducts, product]);

    // Create a new WebSocket connection to send subscribe message
    const ws = new WebSocket("ws://localhost:5000");
    ws.onopen = () => {
      // Send a subscribe message with the selected product
      ws.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: [product],
        })
      );
    };
  };

  // Function to handle unsubscribing from a product
  const handleUnsubscribe = (product) => {
    // Remove the product from the subscribed products list
    setSubscribedProducts(subscribedProducts.filter((p) => p !== product));

    // Create a new WebSocket connection to send unsubscribe message
    const ws = new WebSocket("ws://localhost:5000");
    ws.onopen = () => {
      // Send an unsubscribe message with the selected product
      ws.send(
        JSON.stringify({
          type: "unsubscribe",
          product_ids: [product],
        })
      );
    };
  };

  return (
    <div className="App">
      <h1>Coinbase Pro WebSocket Client</h1>
      <div className="component-container">
        {/* Component for subscribing and unsubscribing to products */}
        <SubscribeUnsubscribe
          subscribedProducts={subscribedProducts}
          onSubscribe={handleSubscribe}
          onUnsubscribe={handleUnsubscribe}
        />

        {subscribedProducts.length > 0 && (
          <div className="viewscontainer">
            {/* Component to display system status (e.g., subscribed products)  */}
            <SystemStatus systemStatus={subscribedProducts} />

            {/* Display price data (using hardcoded data for demo)this will be table rows now showing column */}
            <PriceView priceData={priceData} />

            {/* Display trade match data (using hardcoded data for demo) */}
            <MatchView matchData={matches} />
          </div>
        )}
        {<h5>No active statuses, Please click Subscribe </h5>}
      </div>
    </div>
  );
}

export default App;
