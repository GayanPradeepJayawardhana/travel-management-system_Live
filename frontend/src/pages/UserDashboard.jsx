import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await API.get("/bookings/user");
        setBookings(res.data);
      } catch (err) {
        setError("Failed to fetch your bookings.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel booking
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await API.put(`/bookings/${bookingId}/cancel`);
      // Remove cancelled booking from list completely
      setBookings((prev) =>
        prev.filter((b) => b._id !== bookingId)
      );
      alert("Booking cancelled successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name}! 👋</h2>
        <p>Your Travel Bookings</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>You haven't booked any packages yet.</p>
          <a href="/" className="btn btn-primary">Browse Packages</a>
        </div>
      ) : (
        <div className="bookings-container">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <div className="booking-header">
                <h3>{b.package?.title}</h3>
                <span className={`status status-${b.status?.toLowerCase()}`}>
                  {b.status}
                </span>
              </div>
              <div className="booking-details">
                <p><strong>Location:</strong> {b.package?.location}</p>
                <p><strong>Price:</strong> ${b.package?.price}</p>
                <p><strong>Booked on:</strong> {new Date(b.createdAt).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => handleCancel(b._id)}
                className="btn btn-danger"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;