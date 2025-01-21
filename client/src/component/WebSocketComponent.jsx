import { useEffect, useState } from "react";

function WebSocketComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://ws-feed-public.sandbox.exchange.coinbase.com"
    );
    //need this for auth
    ws.onopen = () => {
      console.log("WebSocket connected");
      const subscribeMessage = {
        type: "subscribe",
        product_ids: ["BTC-USD", "ETH-USD", "XRP-USD", "LTC-USD"],
        channels: ["level2", "matches"],
      };
      ws.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Data</h2>
      {messages.map((message, index) => (
        <div key={index}>{JSON.stringify(message)}</div>
      ))}
    </div>
  );
}

export default WebSocketComponent;
