import PropTypes from "prop-types"; // Import PropTypes for validation
import "./MatchView.css";

function MatchView({ matchData }) {
  if (!matchData) {
    return <p>Loading...</p>; // Fallback if no data is passed
  }

  return (
    <div className="match-view">
      <h2>Match View</h2>
      <h3>Trade ID: {matchData.trade_id}</h3>
      <p>
        {matchData.base_currency} / {matchData.quote_currency}
      </p>
      <p>Price: ${matchData.price}</p>
      <p>
        Size: {matchData.size} {matchData.base_currency}
      </p>
      <p>Side: {matchData.side}</p>
      <p>Buyer ID: {matchData.buyer_id}</p>
      <p>Seller ID: {matchData.seller_id}</p>
      <p>Order ID: {matchData.order_id}</p>
      <p>Matched Order ID: {matchData.matched_order_id}</p>
      <p>Timestamp: {new Date(matchData.timestamp).toLocaleString()}</p>
    </div>
  );
}

// PropTypes validation for the matchData prop
MatchView.propTypes = {
  matchData: PropTypes.shape({
    trade_id: PropTypes.number.isRequired,
    base_currency: PropTypes.string.isRequired,
    quote_currency: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    side: PropTypes.string.isRequired,
    buyer_id: PropTypes.string.isRequired,
    seller_id: PropTypes.string.isRequired,
    order_id: PropTypes.string.isRequired,
    matched_order_id: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};

export default MatchView;
