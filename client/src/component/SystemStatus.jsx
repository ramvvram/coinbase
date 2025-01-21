import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./SystemStatus.css";

function SystemStatus({ systemStatus }) {
  return (
    <div className="system-status">
      <h3>System Status</h3>
      {systemStatus.length > 0 && <h4>Your Subscribed Status</h4>}{" "}
      {/* Only show this if there are statuses */}
      <ul className="status-list">
        {systemStatus.length > 0 ? (
          systemStatus.map((status, index) => (
            <li className="status-item" key={index}>
              {status}
            </li>
          ))
        ) : (
          <li>No active statuses</li> // Fallback when no system status is available
        )}
      </ul>
    </div>
  );
}

// PropTypes validation for the component props
SystemStatus.propTypes = {
  systemStatus: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure systemStatus is an array of strings
};

export default SystemStatus;
