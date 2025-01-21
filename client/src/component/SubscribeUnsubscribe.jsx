import PropTypes from "prop-types"; // Import PropTypes for validation
import "./SubscribeUnsubscribe.css";

function SubscribeUnsubscribe({
  subscribedProducts,
  onSubscribe,
  onUnsubscribe,
}) {
  const products = ["BTC-USD", "ETH-USD", "XRP-USD", "LTC-USD"];

  return (
    <div className="sub-unsub-container">
      <h2>Subscribe/Unsubscribe</h2>
      {products.map((product) => (
        <div key={product}>
          <span className="products">{product}</span>
          <button
            className="subscribe-btn"
            onClick={() => onSubscribe(product)}
            disabled={subscribedProducts.includes(product)}
          >
            Subscribe
          </button>
          <button
            className="unsubscribe-btn"
            onClick={() => onUnsubscribe(product)}
            disabled={!subscribedProducts.includes(product)}
          >
            Unsubscribe
          </button>
        </div>
      ))}
    </div>
  );
}

// PropTypes validation for the component props
SubscribeUnsubscribe.propTypes = {
  // subscribedProducts should be an array of strings
  subscribedProducts: PropTypes.arrayOf(PropTypes.string).isRequired,

  // onSubscribe and onUnsubscribe should be functions
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
};

export default SubscribeUnsubscribe;
