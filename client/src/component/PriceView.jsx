import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./PriceView.css";

function PriceView({ priceData }) {
  if (!priceData) {
    return <p>Loading...</p>; // Display loading if priceData is not available
  }

  return (
    <div className="price-view">
      <h2>Price View</h2>
      <h3>
        {priceData.base_currency} / {priceData.quote_currency}
      </h3>
      <p>Current Price: ${priceData.current_price}</p>
      <p>24h Change: {priceData.price_change_percentage_24h}%</p>
      <p>High 24h: ${priceData.high_24h}</p>
      <p>Low 24h: ${priceData.low_24h}</p>
      <p>
        Volume (24h): {priceData.volume_24h} {priceData.base_currency}
      </p>
      <p>Market Cap: ${priceData.market_cap}</p>
      <p>Last updated: {new Date(priceData.timestamp).toLocaleString()}</p>
    </div>
  );
}

// PropTypes validation for the priceData prop
PriceView.propTypes = {
  priceData: PropTypes.shape({
    base_currency: PropTypes.string.isRequired,
    quote_currency: PropTypes.string.isRequired,
    current_price: PropTypes.number.isRequired,
    price_change_percentage_24h: PropTypes.number.isRequired,
    high_24h: PropTypes.number.isRequired,
    low_24h: PropTypes.number.isRequired,
    volume_24h: PropTypes.number.isRequired,
    market_cap: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};

export default PriceView;
